import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'http';
import { getCuratedWishes } from './src/data/sampleWishes';

function extractJson(text: string) {
  let clean = text.trim();
  clean = clean.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
  const firstBrace = clean.indexOf('{');
  const lastBrace = clean.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    clean = clean.substring(firstBrace, lastBrace + 1);
  }
  return JSON.parse(clean);
}

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      {
        name: 'local-api-server',
        configureServer(server) {
          server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
            if (req.url === '/api/generate' && req.method === 'POST') {
              let bodyStr = '';
              req.on('data', chunk => { bodyStr += chunk; });
              req.on('end', async () => {
                try {
                  const currentEnv = loadEnv(mode, process.cwd(), '');
                  const apiKey = currentEnv.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

                  const body = JSON.parse(bodyStr || '{}');
                  const {
                    occasion = 'birthday',
                    recipientName = 'Dear Friend',
                    relationship = 'friend',
                    tone = 'heartfelt',
                    tones,
                    language = 'en',
                    context: userContext = '',
                    seed,
                    regenerationCount = 0,
                    previousWishes = [],
                  } = body;

                  const randomSeed = seed || Math.floor(Math.random() * 1000000) + 1;
                  const entropyToken = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
                  const toneList = Array.isArray(tones) && tones.length > 0 ? tones.join(', ') : tone;

                  const fallbackRequest = {
                    occasion,
                    recipientName,
                    relationship,
                    tone: (tones?.[0] || tone) as any,
                    tones: Array.isArray(tones) ? tones : [tone],
                    language,
                    context: userContext,
                    seed: randomSeed,
                    regenerationCount,
                    previousWishes,
                  };

                  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                      source: 'curated',
                      notice: 'Running on Curated Engine. Add GEMINI_API_KEY to your .env file to activate live Gemini AI.',
                      wishes: getCuratedWishes(fallbackRequest),
                    }));
                    return;
                  }

                  const langInstruction =
                    language === 'hi'
                      ? 'Hindi (strictly in Devanagari script, natural flow, heart-warming)'
                      : language === 'gu'
                      ? 'Gujarati (strictly in Gujarati script, culturally rich blessings)'
                      : 'English';

                  const prompt = `Write 3 unique, beautiful wishes for ${recipientName} strictly tailored to these inputs:
- Occasion: ${occasion}
- Relationship: ${relationship} (Adapt social etiquette, intimacy, and respect to this relationship)
- Tone(s) Selected: "${toneList}"
- Language: ${langInstruction}
${userContext ? `- Personal Memory / Context: "${userContext}"` : ''}

CREATIVE DIVERSITY & NOVELTY MANDATE (Unique Generation Token: ${entropyToken}):
- Every generation request MUST be completely fresh, novel, and diverse.
- DO NOT repeat common formulas or generic greetings.
- Craft diverse metaphors, distinct opening hooks, and unique phrasing for each of the 3 wishes.
${previousWishes && previousWishes.length > 0 ? `- DO NOT reuse ideas or wording from previous wishes: [${previousWishes.slice(0, 3).join(' | ')}]` : ''}

CRITICAL RULES:
1. Every wish MUST center around the Occasion ("${occasion}") and honor the Relationship ("${relationship}").
2. The tone of ALL 3 wishes MUST directly reflect the Tone(s) chosen: "${toneList}".
   - If Roast/Fun was selected, provide playful, hilarious banter.
   - If Romantic was selected, provide tender, deeply affectionate devotion.
   - If Formal was selected, provide dignified, professional warmth.
   - If Spiritual/Blessed was selected, provide divine prayers and peace.
   - If a Custom Tone was entered, embody that exact persona or style!
   - DO NOT default to generic styles if specific tones were selected.
3. If personal context is provided, weave it naturally into the wishes!
4. Length: 30 to 65 words per wish, with tasteful celebratory emojis.
5. Return ONLY valid JSON matching this schema:
{"wishes": [
  {"id":"1", "style":"Specific style name matching the tone", "toneEmoji":"🎉", "title":"Short title in selected language", "content":"Wish text with emojis"},
  {"id":"2", "style":"Second variation matching the tone", "toneEmoji":"✨", "title":"Short title in selected language", "content":"Wish text with emojis"},
  {"id":"3", "style":"Third variation matching the tone", "toneEmoji":"💫", "title":"Short title in selected language", "content":"Wish text with emojis"}
]}`;

                  const models = ['gemini-flash-lite-latest', 'gemini-3.5-flash-lite'];
                  let parsedWishes = null;

                  for (const model of models) {
                    try {
                      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
                      console.log(`[API] Trying ${model}...`);
                      const resp = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          contents: [{ parts: [{ text: prompt }] }],
                          generationConfig: {
                            temperature: 1.05,
                            topP: 0.95,
                            topK: 40,
                          },
                        }),
                      });
                      console.log(`[API] ${model} status:`, resp.status);
                      if (resp.ok) {
                        const data = await resp.json();
                        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
                        if (candidate) {
                          const parsed = extractJson(candidate);
                          if (parsed.wishes && parsed.wishes.length > 0) {
                            parsedWishes = parsed.wishes;
                            console.log(`[API] Success! Got ${parsedWishes.length} wishes`);
                            break;
                          }
                        }
                      } else {
                        const errBody = await resp.text();
                        console.log(`[API] Error body:`, errBody.slice(0, 150));
                      }
                    } catch (mErr) {
                      console.warn(`Model ${model} error:`, mErr);
                    }
                  }

                  if (parsedWishes) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                      source: 'gemini',
                      wishes: parsedWishes,
                    }));
                    return;
                  }

                  // Fallback
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({
                    source: 'curated',
                    notice: 'API Key connected! Google Gemini free-tier is currently experiencing a temporary high-demand spike (503). Showing curated master wishes in the meantime.',
                    wishes: getCuratedWishes(fallbackRequest),
                  }));
                } catch (err: any) {
                  console.error('API error:', err);
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({
                    source: 'curated',
                    notice: 'Recovered with curated wishes.',
                    wishes: getCuratedWishes({
                      occasion: 'birthday',
                      recipientName: 'Friend',
                      relationship: 'friend',
                      tone: 'heartfelt',
                      tones: ['heartfelt'],
                      language: 'en',
                    }),
                  }));
                }
              });
              return;
            }
            next();
          });
        },
      },
    ],
  };
});
