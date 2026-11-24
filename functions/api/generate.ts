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

    if (!apiKey) {
      // Graceful fallback to curated engine if no API key is configured
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

    // Call Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const systemPrompt = `You are an elite, emotionally articulate, culturally nuanced greetings writer and poet specializing in English, Hindi, and Gujarati celebrations.
Craft exactly 3 distinct, beautifully written wishes for the following recipient:
- Occasion: ${occasion}
- Recipient Name: ${recipientName}
- Relationship to sender: ${relationship}
- Primary Requested Tone: ${tone}
- Language: ${language === 'hi' ? 'Hindi (Devanagari script)' : language === 'gu' ? 'Gujarati (Gujarati script)' : 'English'}
- Extra Memory / Context: ${userContext || 'None'}

REQUIREMENTS:
1. Provide 3 completely distinct styles/angles:
   - Card 1: Warm, emotional, deeply heartfelt.
   - Card 2: Clever, witty, smiling, playful banter.
   - Card 3: Poetic, lyrical, or inspirational (for Hindi, include an authentic shayari/doha feel; for Gujarati, culturally rich warmth; for English, poetic cadence).
2. For Hindi and Gujarati, strictly write in their respective native scripts (Devanagari / Gujarati script). Do NOT use robotic translation. Use genuine vernacular phrasing, idioms, and emotional resonance.
3. Keep each wish between 30 and 80 words. Perfect length for messaging on WhatsApp or greeting cards.
4. Output MUST be valid JSON matching this exact structure:
{
  "wishes": [
    {
      "id": "wish-1",
      "style": "Heartfelt & Classic",
      "toneEmoji": "💖",
      "title": "Title in selected language",
      "content": "Full wish text with warm emojis..."
    },
    {
      "id": "wish-2",
      "style": "Playful & Witty",
      "toneEmoji": "😄",
      "title": "Title in selected language",
      "content": "Full wish text with smiling emojis..."
    },
    {
      "id": "wish-3",
      "style": "Poetic & Expressive",
      "toneEmoji": "🪶",
      "title": "Title in selected language",
      "content": "Full wish text..."
    }
  ]
}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: systemPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.85,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error('Gemini API Error:', errText);
      return new Response(
        JSON.stringify({
          source: 'curated',
          notice: 'Gemini API temporary limit reached. Using curated fallback.',
          wishes: generateCuratedFallback(recipientName, occasion, language),
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    const geminiData: any = await geminiResponse.json();
    const candidateText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('Empty response from Gemini');
    }

    const parsed = JSON.parse(candidateText);

    return new Response(
      JSON.stringify({
        source: 'gemini',
        wishes: parsed.wishes || [],
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
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
