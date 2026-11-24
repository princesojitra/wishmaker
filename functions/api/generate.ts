// Cloudflare Pages Functions & Worker API Handler
// Endpoint: POST /api/generate

import { getCuratedWishes } from '../../src/data/sampleWishes';

interface WishRequestBody {
  occasion: string;
  recipientName: string;
  relationship?: string;
  tone?: string;
  tones?: string[];
  language?: 'en' | 'hi' | 'gu';
  context?: string;
  seed?: number;
  regenerationCount?: number;
  previousWishes?: string[];
}

interface Env {
  GEMINI_API_KEY?: string;
}

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

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;
    const body: WishRequestBody = await request.json();

    const {
      occasion = 'birthday',
      recipientName = 'Dear Friend',
      relationship = 'friend',
      tone = 'heartfelt',
      tones = [],
      language = 'en',
      context: userContext = '',
      seed,
      regenerationCount = 0,
      previousWishes = [],
    } = body;

    const toneList = Array.isArray(tones) && tones.length > 0 ? tones.join(', ') : tone;

    const apiKey = env.GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : undefined);

    const fallbackRequest = {
      occasion,
      recipientName,
      relationship,
      tone: (tones[0] || tone) as any,
      tones,
      language,
      context: userContext,
      seed,
      regenerationCount,
      previousWishes,
    };

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return new Response(
        JSON.stringify({
          source: 'curated',
          notice: 'Running on Curated Engine. Add GEMINI_API_KEY to your Cloudflare environment secrets for real-time dynamic Gemini AI generation.',
          wishes: getCuratedWishes(fallbackRequest),
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const isRegen = (regenerationCount || 0) > 0;
    const regenInstruction = isRegen
      ? `
REGENERATION MANDATE (Cycle #${regenerationCount}, Unique Seed: ${seed || Math.random()}):
- The user clicked "Regenerate" to see completely DIFFERENT wishes.
- You MUST provide 3 completely fresh, novel creative angles with different metaphors, vocabulary, and openings!
- DO NOT repeat or paraphrase ideas from previous wishes: [${previousWishes.slice(0, 3).join(' | ')}].
`
      : '';

    const systemPrompt = `You are an elite, empathetic, and culturally nuanced greeting writer and poet.
Write 3 completely unique, beautifully phrased wishes strictly tailored to the user's specific selections:

INPUTS:
- Occasion: "${occasion}"
- Recipient: "${recipientName}"
- Relationship to sender: "${relationship}" (Adapt social etiquette, intimacy, and respect to this relationship).
- Tone(s) Selected: "${toneList}"
- Language: ${language === 'hi' ? 'Hindi (STRICTLY in authentic Devanagari script, natural flow, heartwarming)' : language === 'gu' ? 'Gujarati (STRICTLY in authentic Gujarati script, culturally rich blessings)' : 'English'}
- Extra Memory / Context: "${userContext || 'None'}"
${regenInstruction}

CRITICAL INSTRUCTIONS:
1. Every wish MUST center around the Occasion ("${occasion}") and honor the Relationship ("${relationship}").
2. The tone of ALL 3 wishes MUST directly embody the requested Tone(s): "${toneList}".
   - If Roast/Fun was selected, provide playful, hilarious banter.
   - If Romantic was selected, provide tender, deeply affectionate devotion.
   - If Formal was selected, provide dignified, professional warmth.
   - If Spiritual/Blessed was selected, provide divine prayers and peace.
   - If a Custom Tone was entered, embody that exact persona or style!
   - DO NOT default to generic styles if specific tones were selected.
3. If extra memory/context is provided ("${userContext}"), weave it directly into the wishes!
4. Length: 30 to 65 words per wish, with tasteful celebratory emojis.
5. You MUST return ONLY a valid JSON object matching this schema:
{
  "wishes": [
    {
      "id": "wish-1",
      "style": "Specific style name matching the tone (e.g. ${toneList})",
      "toneEmoji": "Emoji matching this mood",
      "title": "Short title in selected language",
      "content": "Full wish text..."
    },
    {
      "id": "wish-2",
      "style": "Second variation matching the tone",
      "toneEmoji": "Emoji matching this mood",
      "title": "Short title in selected language",
      "content": "Full wish text..."
    },
    {
      "id": "wish-3",
      "style": "Third variation matching the tone",
      "toneEmoji": "Emoji matching this mood",
      "title": "Short title in selected language",
      "content": "Full wish text..."
    }
  ]
}`;

    const models = ['gemini-flash-lite-latest', 'gemini-3.5-flash-lite'];

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const geminiResponse = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: {
              temperature: isRegen ? 1.05 : 0.95,
              topP: 0.95,
            },
          }),
        });

        if (geminiResponse.ok) {
          const geminiData: any = await geminiResponse.json();
          const candidateText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            const parsed = extractJson(candidateText);
            if (parsed.wishes && parsed.wishes.length > 0) {
              return new Response(
                JSON.stringify({
                  source: 'gemini',
                  wishes: parsed.wishes,
                }),
                {
                  headers: { 'Content-Type': 'application/json' },
                }
              );
            }
          }
        }
      } catch (err) {
        console.warn(`Model ${model} error:`, err);
      }
    }

    return new Response(
      JSON.stringify({
        source: 'curated',
        notice: 'Gemini temporary high demand. Showing curated wishes.',
        wishes: getCuratedWishes(fallbackRequest),
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('API Handler Error:', error);
    return new Response(
      JSON.stringify({
        source: 'curated',
        notice: 'Recovered with curated master wishes.',
        wishes: getCuratedWishes({
          occasion: 'birthday',
          recipientName: 'Friend',
          relationship: 'friend',
          tone: 'heartfelt',
          tones: ['heartfelt'],
          language: 'en',
          regenerationCount: 1,
        }),
        error: error.message,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
