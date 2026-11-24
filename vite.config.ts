import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'http';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

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
                  const body = JSON.parse(bodyStr || '{}');
                  const {
                    occasion = 'birthday',
                    recipientName = 'Dear Friend',
                    relationship = 'friend',
                    tone = 'heartfelt',
                    language = 'en',
                    context: userContext = '',
                  } = body;

                  if (!apiKey) {
                    // Send curated response if no key
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                      source: 'curated',
                      notice: 'Running on Curated Engine. Add GEMINI_API_KEY to your .env file to activate live Gemini AI.',
                      wishes: getDevCuratedWishes(recipientName, occasion, language),
                    }));
                    return;
                  }

                  // Live Gemini API Call
                  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
                  const prompt = `You are a world-class greeting generator and poet.
Write 3 distinct, beautiful wishes:
Occasion: ${occasion}
Recipient: ${recipientName}
Relationship: ${relationship}
Tone: ${tone}
Language: ${language === 'hi' ? 'Hindi (Devanagari script)' : language === 'gu' ? 'Gujarati (Gujarati script)' : 'English'}
Context: ${userContext || 'None'}

REQUIREMENTS:
1. Card 1: Warm, heartfelt, emotional.
2. Card 2: Playful, witty, humorous banter.
3. Card 3: Poetic, inspiring, or lyrical (shayari style for Hindi).
4. Strictly use native scripts for Hindi and Gujarati.
5. Return JSON in this format:
{
  "wishes": [
    { "id": "wish-1", "style": "Heartfelt & Classic", "toneEmoji": "💖", "title": "Title here", "content": "Text here" },
    { "id": "wish-2", "style": "Playful & Witty", "toneEmoji": "😄", "title": "Title here", "content": "Text here" },
    { "id": "wish-3", "style": "Poetic & Expressive", "toneEmoji": "🪶", "title": "Title here", "content": "Text here" }
  ]
}`;

                  const resp = await fetch(geminiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      contents: [{ parts: [{ text: prompt }] }],
                      generationConfig: {
                        temperature: 0.85,
                        responseMimeType: 'application/json',
                      },
                    }),
                  });

                  if (!resp.ok) {
                    console.error('Gemini API call failed with status:', resp.status);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                      source: 'curated',
                      notice: 'Gemini API limit or error. Showing curated wishes.',
                      wishes: getDevCuratedWishes(recipientName, occasion, language),
                    }));
                    return;
                  }

                  const data = await resp.json();
                  const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
                  const parsed = JSON.parse(candidate);

                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({
                    source: 'gemini',
                    wishes: parsed.wishes,
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
