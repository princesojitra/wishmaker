import { Wish, WishRequest } from '../types/wish';

export function getCuratedWishes(req: WishRequest): Wish[] {
  const name = req.recipientName.trim() || 'My Dear';
  const lang = req.language;
  const occasion = req.occasion;

  if (lang === 'gu') {
    return [
      {
        id: 'curated-gu-1',
        style: 'હાર્દિક અને સ્નેહપૂર્ણ',
        toneEmoji: '💖',
        title: 'અઢળક સ્નેહ અને શુભેચ્છાઓ',
        content: `વહાલા ${name}, આ ખાસ અવસરે તમારા જીવનમાં સુખ, શાંતિ, ઉત્તમ સ્વાસ્થ્ય અને અખૂટ સમૃદ્ધિ હંમેશા બની રહે એવી અંતઃકરણપૂર્વકની શુભકામનાઓ! તમારું દરેક સ્વપ્ન સાકાર થાય અને તમારા ચહેરા પરનું સુંદર સ્મિત કાયમ ખીલેલું રહે. 🌸✨`,
      },
      {
        id: 'curated-gu-2',
        style: 'રમુજી અને મજેદાર',
        toneEmoji: '😄',
        title: 'જલસા કરો અને સ્મિત રાખો!',
        content: `અરે ${name}! ઉંમર ભલે એક વર્ષ વધે કે કેલેન્ડર બદલાય, તમારો વટ અને સ્વેગ હંમેશા એવો ને એવો જ રહેવો જોઈએ! આજે પાર્ટી તો બનવી જ જોઈએ! જિંદગીના દરેક પળને પૂરા ઉત્સાહથી માણો અને જલસા કરો! 🥳🎉`,
      },
      {
        id: 'curated-gu-3',
        style: 'કાવ્યાત્મક અને પ્રેરણાદાયી',
        toneEmoji: '🪶',
        title: 'જીવનની સુંદર સફર',
        content: `${name}, સમયની દરેક ક્ષણ તમારા માટે ખુશીઓની સુવાસ લઈને આવે, દરેક સવાર નવી આશા આપે અને દરેક સાંજ સફળતાનો સંતોષ આપે. જીવનના આ સુંદર પંથે તમને ઈશ્વરના અનંત આશીર્વાદ મળતા રહે. 🙏💫`,
      },
    ];
  }

  if (lang === 'hi') {
    return [
      {
        id: 'curated-hi-1',
        style: 'दिल से व आत्मीय',
        toneEmoji: '💖',
        title: 'सच्चे दिल से ढेरों शुभकामनाएं',
        content: `प्रिय ${name}, इस पावन और खास अवसर पर आपको ढेर सारा प्यार और दिल की गहराइयों से अनंत मंगलकामनाएं! ईश्वर करे आपका आने वाला हर दिन सुख, समृद्धि और अच्छी सेहत की सौगात लेकर आए। आपका जीवन सदा मुस्कुराहटों से महकता रहे। 🌺✨`,
      },
      {
        id: 'curated-hi-2',
        style: 'मस्ती और मुस्कान',
        toneEmoji: '😄',
        title: 'जश्न और धमाल का दिन!',
        content: `अरे हमारे प्यारे ${name}! साल बीतते रहेंगे लेकिन आपका अंदाज और हमारी यह शानदार बॉन्डिंग हमेशा ऐसी ही जिंदादिल रहनी चाहिए। आज के दिन कोई काम नहीं, सिर्फ जश्न, मिठाई और ढेर सारी खुशियां! पार्टी कब दे रहे हो? 🥳🎂`,
      },
      {
        id: 'curated-hi-3',
        style: 'शायराना व गहराई भरा',
        toneEmoji: '🪶',
        title: 'दुआओं का खूबसूरत तोहफा',
        content: `खुशियों की महक से महके हर एक पल तुम्हारा,\nसितारों की रौशनी से रोशन हो मुकद्दर तुम्हारा।\nदुआ है रब से ${name}, कामयाबी कदम चूमे हर मोड़ पर,\nऔर कभी कम न हो यह मासूम सा तबस्सुम तुम्हारा। 🌟✍️`,
      },
    ];
  }

  // English default
  const occasionTitles: Record<string, string> = {
    birthday: 'Birthday',
    anniversary: 'Anniversary',
    festival: 'Festive Season',
    wedding: 'Wedding',
    promotion: 'Career Milestone',
    new_year: 'New Year',
    friendship: 'Special Day',
    gratitude: 'Day of Thanks',
  };

  const occName = occasionTitles[occasion] || 'Celebration';

  return [
    {
      id: 'curated-en-1',
      style: 'Heartfelt & Deep',
      toneEmoji: '💖',
      title: 'Warmest Wishes from the Heart',
      content: `Dearest ${name}, on this wonderful ${occName}, I want you to know how deeply you are cherished. May your journey ahead be blessed with radiant health, lasting peace, and countless reasons to smile. You bring so much light into the world—may today reflect all that joy right back to you! ✨🌿`,
    },
    {
      id: 'curated-en-2',
      style: 'Witty & High Spirits',
      toneEmoji: '😄',
      title: 'Cheers to Leveling Up!',
      content: `Happy ${occName}, ${name}! You're like a vintage bottle of wine or that classic favorite playlist—only getting better with time (and slightly louder)! Wishing you zero stress, extra cake, and a celebration as legendary as you are. Let the good times roll! 🥂🎉`,
    },
    {
      id: 'curated-en-3',
      style: 'Poetic & Inspiring',
      toneEmoji: '🪶',
      title: 'A Constellation of Dreams',
      content: `May every step you take unfold into a tapestry of wonder, ${name}. As you mark this ${occName}, may the horizon whisper promises of triumph, love, and courage. Keep shining with that untamed brilliance that inspires everyone around you. 🌟💫`,
    },
  ];
}
