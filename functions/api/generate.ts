// Cloudflare Pages Functions Handler
// Endpoint: POST /api/generate

interface WishRequestBody {
  occasion: string;
  recipientName: string;
  relationship?: string;
  tone?: string;
  language?: 'en' | 'hi' | 'gu';
  context?: string;
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
      language = 'en',
      context: userContext = '',
    } = body;

    const apiKey = env.GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : undefined);

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return new Response(
        JSON.stringify({
          source: 'curated',
          notice: 'Running on Curated Engine. Add GEMINI_API_KEY to your Cloudflare environment secrets for real-time dynamic Gemini AI generation.',
          wishes: generateCuratedFallback(recipientName, occasion, language),
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const systemPrompt = `You are an elite, empathetic, and culturally nuanced greeting writer and poet.
Create 3 completely unique, beautifully phrased wishes for:
- Occasion: ${occasion}
- Recipient Name: ${recipientName}
- Relationship to sender: ${relationship}
- Tone requested: ${tone}
- Language: ${language === 'hi' ? 'Hindi (strictly in Devanagari script, natural flow, heartwarming)' : language === 'gu' ? 'Gujarati (strictly in Gujarati script, culturally rich blessings)' : 'English'}
- Extra Memory / Context: ${userContext || 'None'}

REQUIREMENTS:
1. Card 1 Style: "Heartfelt & Warm" (Deep emotion, genuine blessings)
2. Card 2 Style: "Witty & Fun" (Playful banter, clever smile)
3. Card 3 Style: "Poetic & Expressive" (Lyrical, shayari style in Hindi, inspiring rhythm)
4. Keep each wish between 30 and 70 words, formatted with relevant celebratory emojis.
5. You MUST return ONLY a valid JSON object matching this schema:
{
  "wishes": [
    {
      "id": "wish-1",
      "style": "Heartfelt & Warm",
      "toneEmoji": "💖",
      "title": "Short title in selected language",
      "content": "Full wish text..."
    },
    {
      "id": "wish-2",
      "style": "Witty & Fun",
      "toneEmoji": "😄",
      "title": "Short title in selected language",
      "content": "Full wish text..."
    },
    {
      "id": "wish-3",
      "style": "Poetic & Expressive",
      "toneEmoji": "🪶",
      "title": "Short title in selected language",
      "content": "Full wish text..."
    }
  ]
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const geminiResponse = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
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
        console.warn(`Attempt ${attempt} error:`, err);
      }
    }

    return new Response(
      JSON.stringify({
        source: 'curated',
        notice: 'Gemini temporary high demand. Showing curated wishes.',
        wishes: generateCuratedFallback(recipientName, occasion, language),
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('API Handler Error:', error);
    return new Response(
      JSON.stringify({
        source: 'curated',
        notice: 'Recovered with curated master wishes.',
        wishes: generateCuratedFallback('Friend', 'celebration', 'en'),
        error: error.message,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

function generateCuratedFallback(name: string, _occasion: string, language: string) {
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
