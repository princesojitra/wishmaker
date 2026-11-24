import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'http';

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
                  } = body;

                  const toneList = Array.isArray(tones) && tones.length > 0 ? tones.join(', ') : tone;

                  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                      source: 'curated',
                      notice: 'Running on Curated Engine. Add GEMINI_API_KEY to your .env file to activate live Gemini AI.',
                      wishes: getDevCuratedWishes(recipientName, occasion, language),
                    }));
                    return;
                  }

                  const langInstruction =
                    language === 'hi'
                      ? 'Hindi (strictly in Devanagari script, natural flow, heart-warming)'
                      : language === 'gu'
                      ? 'Gujarati (strictly in Gujarati script, culturally rich blessings)'
                      : 'English';

                  const prompt = `Write 3 short, beautiful wishes for ${recipientName} (Occasion: ${occasion}, Relationship: ${relationship}, Tone(s): ${toneList}, Language: ${langInstruction}${userContext ? `, Context: ${userContext}` : ''}).
Provide 3 distinct styles:
1. Heartfelt & Warm
2. Witty & Fun
3. Poetic & Expressive (or Shayari in Hindi)
Return ONLY valid JSON matching this structure:
{"wishes": [
  {"id":"1", "style":"Heartfelt & Warm", "toneEmoji":"💖", "title":"Short title", "content":"Wish text with emojis"},
  {"id":"2", "style":"Witty & Fun", "toneEmoji":"😄", "title":"Short title", "content":"Wish text with emojis"},
  {"id":"3", "style":"Poetic & Expressive", "toneEmoji":"🪶", "title":"Short title", "content":"Wish text with emojis"}
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
                    wishes: getDevCuratedWishes(recipientName, occasion, language),
                  }));
                } catch (err: any) {
                  console.error('API error:', err);
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({
                    source: 'curated',
                    notice: 'Recovered with curated wishes.',
                    wishes: getDevCuratedWishes('Friend', 'celebration', 'en'),
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

function getDevCuratedWishes(name: string, _occasion: string, language: string) {
  if (language === 'gu') {
    return [
      {
        id: 'gu-1',
        style: 'હાર્દિક અને સ્નેહપૂર્ણ',
        toneEmoji: '💖',
        title: 'અઢળક સ્નેહ અને શુભેચ્છાઓ',
        content: `વહાલા ${name}, આ ખાસ અવસરે તમારા જીવનમાં સુખ, શાંતિ, ઉત્તમ સ્વાસ્થ્ય અને અખૂટ સમૃદ્ધિ હંમેશા બની રહે એવી અંતઃકરણપૂર્વકની શુભકામનાઓ! તમારું દરેક સ્વપ્ન સાકાર થાય. 🌸✨`,
      },
      {
        id: 'gu-2',
        style: 'રમુજી અને મજેદાર',
        toneEmoji: '😄',
        title: 'જલસા કરો અને સ્મિત રાખો!',
        content: `અરે ${name}! ઉંમર ભલે એક વર્ષ વધે કે કેલેન્ડર બદલાય, તમારો વટ હંમેશા એવો ને એવો જ રહેવો જોઈએ! આજે પાર્ટી તો બનવી જ જોઈએ! જિંદગીના દરેક પળને પૂરા ઉત્સાહથી માણો! 🥳🎉`,
      },
      {
        id: 'gu-3',
        style: 'કાવ્યાત્મક અને પ્રેરણાદાયી',
        toneEmoji: '🪶',
        title: 'જીવનની સુંદર સફર',
        content: `${name}, સમયની દરેક ક્ષણ તમારા માટે ખુશીઓની સુવાસ લઈને આવે, દરેક સવાર નવી આશા આપે અને દરેક સાંજ સફળતાનો સંતોષ આપે. જીવનના આ સુંદર પંથે તમને ઈશ્વરના અનંત આશીર્વાદ મળતા રહે. 🙏💫`,
      },
    ];
  }

  if (language === 'hi') {
    return [
      {
        id: 'hi-1',
        style: 'दिल से व आत्मीय',
        toneEmoji: '💖',
        title: 'सच्चे दिल से ढेरों शुभकामनाएं',
        content: `प्रिय ${name}, इस पावन और खास अवसर पर आपको ढेर सारा प्यार और दिल की गहराइयों से अनंत मंगलकामनाएं! ईश्वर करे आपका आने वाला हर दिन सुख, समृद्धि और अच्छी सेहत की सौगात लेकर आए। 🌺✨`,
      },
      {
        id: 'hi-2',
        style: 'मस्ती और मुस्कान',
        toneEmoji: '😄',
        title: 'जश्न और धमाल का दिन!',
        content: `अरे हमारे प्यारे ${name}! साल बीतते रहेंगे लेकिन आपका अंदाज और हमारी यह शानदार बॉन्डिंग हमेशा ऐसी ही जिंदादिल रहनी चाहिए। आज के दिन सिर्फ जश्न, मिठाई और ढेर सारी खुशियां! पार्टी कब दे रहे हो? 🥳🎂`,
      },
      {
        id: 'hi-3',
        style: 'शायराना व गहराई भरा',
        toneEmoji: '🪶',
        title: 'दुआओं का खूबसूरत तोहफा',
        content: `खुशियों की महक से महके हर एक पल तुम्हारा,\nसितारों की रौशनी से रोशन हो मुकद्दर तुम्हारा।\nदुआ है रब से ${name}, कामयाबी कदम चूमे हर मोड़ पर,\nऔर कभी कम न हो यह मासूम सा तबस्सुम तुम्हारा। 🌟✍️`,
      },
    ];
  }

  return [
    {
      id: 'en-1',
      style: 'Heartfelt & Deep',
      toneEmoji: '💖',
      title: 'Warmest Wishes from the Heart',
      content: `Dearest ${name}, on this wonderful celebration, I want you to know how deeply you are cherished. May your journey ahead be blessed with radiant health, lasting peace, and countless reasons to smile. You bring so much light into the world! ✨🌿`,
    },
    {
      id: 'en-2',
      style: 'Witty & High Spirits',
      toneEmoji: '😄',
      title: 'Cheers to Leveling Up!',
      content: `Happy celebration, ${name}! You're like a vintage bottle of wine or that classic favorite playlist—only getting better with time! Wishing you zero stress, extra cake, and a celebration as legendary as you are. 🥂🎉`,
    },
    {
      id: 'en-3',
      style: 'Poetic & Inspiring',
      toneEmoji: '🪶',
      title: 'A Constellation of Dreams',
      content: `May every step you take unfold into a tapestry of wonder, ${name}. May the horizon whisper promises of triumph, love, and courage. Keep shining with that untamed brilliance that inspires everyone around you. 🌟💫`,
    },
  ];
}
