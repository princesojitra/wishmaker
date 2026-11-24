import { Wish, WishRequest } from '../types/wish';

interface OccasionDetails {
  titleEn: string;
  titleHi: string;
  titleGu: string;
  emoji: string;
  themeEn: string;
  themeHi: string;
  themeGu: string;
}

const OCCASION_META: Record<string, OccasionDetails> = {
  birthday: {
    titleEn: 'Birthday',
    titleHi: 'जन्मदिन',
    titleGu: 'જન્મદિવસ',
    emoji: '🎂',
    themeEn: 'another fabulous year of life, growth, and joy',
    themeHi: 'जीवन के एक और शानदार व खुशहाल वर्ष की शुरुआत',
    themeGu: 'જીવનના વધુ એક સુંદર અને ખુશહાલ વર્ષની ઉજવણી',
  },
  diwali: {
    titleEn: 'Diwali & Festive Season',
    titleHi: 'दीपावली व पावन पर्व',
    titleGu: 'દિવાળી અને પર્વ',
    emoji: '🪔',
    themeEn: 'radiant lights, prosperity, and divine joy',
    themeHi: 'दीपों की रोशनी, सुख-समृद्धि और मंगलकारी आशीर्वाद',
    themeGu: 'દીવાઓનો પ્રકાશ, સુખ-શાંતિ અને સમૃદ્ધિની વર્ષા',
  },
  anniversary: {
    titleEn: 'Anniversary',
    titleHi: 'सालगिरह',
    titleGu: 'લગ્ન વર્ષગાંઠ',
    emoji: '🥂',
    themeEn: 'enduring love, shared memories, and lifelong partnership',
    themeHi: 'सच्चे प्रेम, आपसी विश्वास और अटूट दांपत्य जीवन',
    themeGu: 'અતૂટ સ્નેહ, પરસ્પર સાથ અને સુખી દાંપત્ય જીવન',
  },
  wedding: {
    titleEn: 'Wedding Day',
    titleHi: 'विवाह संस्कार',
    titleGu: 'લગ્નોત્સવ',
    emoji: '💍',
    themeEn: 'the sacred union of two hearts and a lifetime of happiness',
    themeHi: 'दो दिलों का पावन संगम और जीवनभर का खूबसूरत साथ',
    themeGu: 'બે હૃદયોનું પવિત્ર મિલન અને આજીવન પ્રેમની સફર',
  },
  promotion: {
    titleEn: 'Career Promotion',
    titleHi: 'पदोन्नति व सफलता',
    titleGu: 'બઢતી અને નવી સિદ્ધિ',
    emoji: '🚀',
    themeEn: 'well-deserved success, leadership, and conquering new heights',
    themeHi: 'कड़ी मेहनत की जीत, नई जिम्मेदारी और बुलंदियों की उड़ान',
    themeGu: 'સખત પરિશ્રમનું ફળ, નેતૃત્વ અને નવી ઊંચાઈઓનું શિખર',
  },
  graduation: {
    titleEn: 'Graduation',
    titleHi: 'दीक्षांत व स्नातक',
    titleGu: 'પદવીદાન અને સ્નાતક',
    emoji: '🎓',
    themeEn: 'academic excellence and stepping into an exciting future',
    themeHi: 'विद्या व प्रतिभा की विजय और नए सुनहरे भविष्य की शुरुआत',
    themeGu: 'અભ્યાસની શાનદાર સફળતા અને ઉજ્જવળ ભવિષ્યની નવી શરૂઆત',
  },
  housewarming: {
    titleEn: 'Housewarming',
    titleHi: 'गृह प्रवेश',
    titleGu: 'ગૃહ પ્રવેશ / વાસ્તુ',
    emoji: '🏡',
    themeEn: 'new beginnings, warm hearth, and a home filled with laughter',
    themeHi: 'नए आशियाने में सुख, शांति, समृद्धि और खुशियों का बसेरा',
    themeGu: 'નવા ઘરમાં શાંતિ, લક્ષ્મીજીનો વાસ અને હાસ્યથી ગૂંજતી ક્ષણો',
  },
  baby_shower: {
    titleEn: 'Baby Shower',
    titleHi: 'गोद भराई व नन्हे कदम',
    titleGu: 'સીમંત સંસ્કાર અને વધામણી',
    emoji: '👶',
    themeEn: 'welcoming a precious miracle with infinite love and blessings',
    themeHi: 'नन्हे फरिश्ते का आगमन और जीवन में वात्सल्य का नया सवेरा',
    themeGu: 'નાનકડા વ્હાલસોયા ફુલનું આગમન અને મમતાની નવી શરૂઆત',
  },
  retirement: {
    titleEn: 'Retirement Milestone',
    titleHi: 'सेवानिवृत्ति व स्वर्णिम समय',
    titleGu: 'નિવૃત્તિ વંદના',
    emoji: '🌅',
    themeEn: 'an honorable career and the freedom to pursue cherished passions',
    themeHi: 'शानदार सेवा यात्रा की पूर्णता और सुकून भरी नई जिंदगी',
    themeGu: 'યાદગાર સેવાકાર્યની સંતોષકારક પૂર્ણાહુતિ અને આનંદમય નિવૃત્તિ',
  },
  get_well: {
    titleEn: 'Speedy Recovery',
    titleHi: 'शीघ्र स्वास्थ्य लाभ',
    titleGu: 'ઝડપી સ્વાસ્થ્ય લાભ',
    emoji: '🌿',
    themeEn: 'healing strength, renewed vitality, and rapid recovery',
    themeHi: 'शीघ्र आरोग्य, सकारात्मक ऊर्जा और उत्तम स्वास्थ्य',
    themeGu: 'ઝડપી સાજાપણું, અખૂટ મનોબળ અને તંદુરસ્ત આરોગ્ય',
  },
  new_year: {
    titleEn: 'New Year',
    titleHi: 'नववर्ष',
    titleGu: 'નવું વર્ષ / સાલ મુબારક',
    emoji: '✨',
    themeEn: 'fresh 365-day journey of opportunities, peace, and abundance',
    themeHi: '365 नए सुनहरे अवसरों, नई उमंग और अनंत खुशियों का वर्ष',
    themeGu: 'નવા ૩૬૫ દિવસોમાં પ્રગતિ, સ્નેહ અને સમૃદ્ધિની નવી આશા',
  },
};

function getSalutation(name: string, rel: string, lang: string): string {
  if (lang === 'hi') {
    switch (rel) {
      case 'parents': return `आदरणीय ${name} जी`;
      case 'mentor': return `परम आदरणीय ${name} जी`;
      case 'partner': return `मेरे प्यारे ${name}`;
      case 'best_friend':
      case 'friend': return `प्रिय ${name}`;
      case 'sibling': return `प्यारे ${name}`;
      case 'colleague': return `प्रिय ${name} जी`;
      default: return `प्रिय ${name}`;
    }
  }

  if (lang === 'gu') {
    switch (rel) {
      case 'parents': return `આદરણીય ${name}`;
      case 'mentor': return `પૂજ્ય ${name}`;
      case 'partner': return `મારા વહાલા ${name}`;
      case 'best_friend':
      case 'friend': return `વહાલા મિત્ર ${name}`;
      case 'sibling': return `વહાલા ${name}`;
      case 'colleague': return `સ્નેહી ${name}`;
      default: return `વહાલા ${name}`;
    }
  }

  // English
  switch (rel) {
    case 'parents': return `Dearest ${name}`;
    case 'mentor': return `Respected ${name}`;
    case 'partner': return `My Dearest ${name}`;
    case 'best_friend': return `Hey ${name}`;
    case 'sibling': return `Dear ${name}`;
    case 'colleague': return `Dear ${name}`;
    default: return `Dear ${name}`;
  }
}

export function getCuratedWishes(req: WishRequest): Wish[] {
  const name = req.recipientName?.trim() || 'My Friend';
  const rawOcc = req.occasion?.toLowerCase() || 'birthday';
  const lang = req.language || 'en';
  const rel = req.relationship || 'friend';
  const tones = Array.isArray(req.tones) && req.tones.length > 0 ? req.tones : [req.tone || 'heartfelt'];
  const context = req.context?.trim() || '';

  const meta = OCCASION_META[rawOcc] || {
    titleEn: req.occasion || 'Special Celebration',
    titleHi: req.occasion || 'खास अवसर',
    titleGu: req.occasion || 'ખાસ પ્રસંગ',
    emoji: '🎉',
    themeEn: `celebrating ${req.occasion}`,
    themeHi: `${req.occasion} का यह पावन अवसर`,
    themeGu: `${req.occasion} નો આ રૂડો અવસર`,
  };

  const salutation = getSalutation(name, rel, lang);
  const isRoast = tones.some((t) => t.includes('roast') || t.includes('teas'));
  const isRomantic = tones.some((t) => t.includes('romantic') || t.includes('love'));
  const isFormal = tones.some((t) => t.includes('formal') || t.includes('prof'));
  const isBlessed = tones.some((t) => t.includes('bless') || t.includes('spirit'));
  const isInspirational = tones.some((t) => t.includes('insp') || t.includes('motivat'));
  const isShort = tones.some((t) => t.includes('short') || t.includes('punch'));
  const isCustom = tones.some((t) => t.includes('custom') || (!['heartfelt', 'witty', 'poetic', 'inspirational', 'romantic', 'roast', 'formal', 'short', 'nostalgic', 'blessed'].includes(t)));

  const customToneName = isCustom ? tones.find((t) => t !== 'custom') || 'Bespoke Style' : '';

  // -------------------------------------------------------------
  // GUJARATI ENGINE
  // -------------------------------------------------------------
  if (lang === 'gu') {
    if (isCustom) {
      return [
        {
          id: 'w-gu-1',
          style: `${customToneName || 'કસ્ટમ અંદાજ'}`,
          toneEmoji: '✍️',
          title: `${customToneName ? `અંદાજ: ${customToneName}` : 'ખાસ કસ્ટમ શુભેચ્છા'}`,
          content: `${salutation}, ${meta.titleGu} ના આ ખાસ પ્રસંગે તમારા માટે ખાસ શૈલીમાં: જીવનમાં હંમેશા નવી ઉર્જા, ઉત્સાહ અને આનંદ બની રહે એવી હૃદયપૂર્વકની કામના! ${context ? `(${context})` : ''} 🌟✨`,
        },
        {
          id: 'w-gu-2',
          style: 'અનોખી પ્રેરણા',
          toneEmoji: '💫',
          title: 'તમારી આગવી ઓળખ',
          content: `વહાલા ${name}, તમારું વ્યક્તિત્વ હંમેશા અનોખું અને પ્રેરણાદાયી રહ્યું છે. ${meta.titleGu} નો આ રૂડો અવસર તમારા માટે સફળતાના નવા દ્વાર ખોલે એવી પ્રાર્થના! 🎉🌸`,
        },
        {
          id: 'w-gu-3',
          style: 'યાદગાર પળો',
          toneEmoji: '🪶',
          title: 'અવિસ્મરણીય સફર',
          content: `${salutation}, તમારા દરેક સપના પૂરા થાય અને આવનારા દિવસોમાં દરેક પળ ઉત્સવ સમાન બની રહે. ખૂબ ખૂબ અભિનંદન! 🙏🥂`,
        },
      ];
    }
    if (isRoast) {
      return [
        {
          id: 'w-gu-1',
          style: 'હળવી મસ્તી અને મજાક',
          toneEmoji: '😈',
          title: `પાર્ટી તો બનવી જ જોઈએ!`,
          content: `${salutation}, ${meta.titleGu} ના આ રૂડા અવસરે તમને ઘણી બધી શુભેચ્છાઓ! ઉંમર ભલે એક વર્ષ વધે કે અનુભવ, તમારો વટ એવો ને એવો જ રહેવો જોઈએ. હવે બહુ બહાના ન કાઢતા, પાર્ટી ક્યારે આપો છો? ${context ? `(ખાસ કરીને: ${context} વાળી ટ્રીટ બાકી છે!)` : ''} 🥳🍕`,
        },
        {
          id: 'w-gu-2',
          style: 'તોફાની ટ્વિસ્ટ',
          toneEmoji: '😜',
          title: 'ઓરિજિનલ સ્વેગ!',
          content: `અરે વાહ ${name}! આજના આ ખાસ દિવસે તમારા ચહેરા પર આવી જ મોટી સ્માઈલ રહેવી જોઈએ. દુનિયા ભલે ગમે તેટલી સિરિયસ થઈ જાય, તમારો મસ્તમૌલા અંદાજ ક્યારેય ના બદલાવો જોઈએ! જલસા કરો અને મજા માણો! 🎉🎈`,
        },
        {
          id: 'w-gu-3',
          style: 'પ્રેમાળ કટાક્ષ',
          toneEmoji: '😄',
          title: 'હંમેશા સુપરહિટ રહો',
          content: `${salutation}, તમારા જેવા સજ્જન મિત્ર મળવા એ પણ નસીબની વાત છે—જે હંમેશા બધાને હસાવતા રહે છે! આ ${meta.titleGu} પર ઈશ્વર તમને અખૂટ ધીરજ આપે અને અમને સહન કરવાની શક્તિ આપે! 🥂✨`,
        },
      ];
    }

    if (isRomantic) {
      return [
        {
          id: 'w-gu-1',
          style: 'અંતરનો સ્નેહ',
          toneEmoji: '🌹',
          title: 'મારા હૃદયના ધબકારા',
          content: `${salutation}, ${meta.titleGu} ના આ મંગલ અવસરે હું ઈશ્વરનો આભાર માનું છું કે તમે મારા જીવનમાં છો. તમારી સાથે વિતાવેલી દરેક ક્ષણ અણમોલ છે. તમારો સાથ એ જ મારી દુનિયા છે. ${context ? `(${context})` : ''} અનંત પ્રેમ! 💖💫`,
        },
        {
          id: 'w-gu-2',
          style: 'મીઠો સાથ',
          toneEmoji: '✨',
          title: 'હંમેશા તમારી સાથે',
          content: `વહાલા ${name}, તમે મારા જીવનનું સૌથી સુંદર સપનું છો જે હકીકત બન્યું છે. આજના દિવસે મારી એક જ પ્રાર્થના છે કે આપણો આ પવિત્ર સ્નેહ સદાય અકબંધ રહે. તમે હંમેશા ખુશ રહો! 🌸💍`,
        },
        {
          id: 'w-gu-3',
          style: 'કાવ્યાત્મક પ્રેમ',
          toneEmoji: '🪶',
          title: 'અતૂટ બંધન',
          content: `તમારા સ્મિતમાં મારી આખી દુનિયા સમાયેલી છે, ${name}. ${meta.titleGu} ની આ ક્ષણો આપણા પ્રેમને વધુ ગાઢ બનાવે અને આપણું આવનારું ભવિષ્ય પ્રેમ અને શાંતિથી છલકાઈ જાય. ❤️🥂`,
        },
      ];
    }

    if (isFormal) {
      return [
        {
          id: 'w-gu-1',
          style: 'ઔપચારિક અને ગૌરવપૂર્ણ',
          toneEmoji: '👔',
          title: 'સાદર અભિનંદન',
          content: `${salutation}, ${meta.titleGu} ના આ મહત્વપૂર્ણ અવસરે આપને હૃદયપૂર્વક અભિનંદન અને ઉત્તમ શુભેચ્છાઓ. આપની કર્તવ્યનિષ્ઠા અને પરિશ્રમ હંમેશા પ્રેરણારૂપ રહ્યા છે. આપનું ભવિષ્ય વધુ ઉજ્જવળ બને એવી કામના. ${context ? `(${context})` : ''} 🌟🙏`,
        },
        {
          id: 'w-gu-2',
          style: 'શુભ આશીર્વાદ અને માન',
          toneEmoji: '🤝',
          title: 'ઉત્કૃષ્ટ સફળતાની કામના',
          content: `${salutation}, આ વિશેષ ઉપલક્ષ્ય પર આપને તથા આપના પરિવારને ખૂબ ખૂબ વધામણી. ઈશ્વર આપને દીર્ઘાયુષ્ય, ઉત્તમ સ્વાસ્થ્ય અને અખૂટ યશ પ્રદાન કરે. આપ દરેક ક્ષેત્રે નવી સિદ્ધિઓ હાંસલ કરો. 💐✨`,
        },
        {
          id: 'w-gu-3',
          style: 'સન્માનપૂર્ણ શુભેચ્છા',
          toneEmoji: '📜',
          title: 'ગૌરવશાળી સફર',
          content: `${salutation}, આપની પ્રેરણાદાયી જીવનયાત્રામાં ${meta.titleGu} નો આ દિવસ સુવર્ણ પ્રકરણ સમાન રહે. આપ હંમેશા સ્વસ્થ, પ્રસન્ન અને સફળ રહો એવી અંતઃકરણની શુભકામનાઓ. 🌿🏛️`,
        },
      ];
    }

    // Default Gujarati (Occasion-tailored + Heartfelt / Poetic / Witty)
    return [
      {
        id: 'w-gu-1',
        style: 'હાર્દિક અને સ્નેહસભર',
        toneEmoji: '💖',
        title: `${meta.titleGu} ની અંતરંગ શુભેચ્છાઓ`,
        content: `${salutation}, ${meta.titleGu} ના આ મંગલમય અવસરે આપના જીવનમાં સુખ, શાંતિ, સદ્ભાવના અને અખૂટ સમૃદ્ધિની વર્ષા થાય એવી હૃદયપૂર્વકની શુભકામનાઓ! ${context ? `વિશેષ સ્મરણ: ${context}!` : ''} આપનું દરેક સ્વપ્ન સાકાર થાય. 🌸✨`,
      },
      {
        id: 'w-gu-2',
        style: 'મનોરંજક અને ઉત્સાહી',
        toneEmoji: '😄',
        title: 'જલસા અને ધૂમધામ!',
        content: `અરે ${name}! ${meta.titleGu} નો આ પાવન દિવસ ખૂબ ઉત્સાહ અને આનંદ સાથે ઉજવજો. ઈશ્વર આપના ચહેરા પરનું સ્મિત સદાય ખીલેલું રાખે અને જીવનનો દરેક પળ યાદગાર બને. ખૂબ ખૂબ વધામણી! 🥳🎉`,
      },
      {
        id: 'w-gu-3',
        style: 'કાવ્યાત્મક આશીર્વાદ',
        toneEmoji: '🪶',
        title: 'દુઆઓની સુવાસ',
        content: `સમયની દરેક ક્ષણ આપના માટે ખુશીઓની મહેક લઈને આવે, ${salutation}. ${meta.titleGu} નો આ પંથ આપના માટે નવી આશાઓ અને સફળતાના શિખરો સર કરવાનો માર્ગ મોકળો કરે. ઈશ્વરના અનંત આશીર્વાદ આપની સાથે રહે. 🙏💫`,
      },
    ];
  }

  // -------------------------------------------------------------
  // HINDI ENGINE
  // -------------------------------------------------------------
  if (lang === 'hi') {
    if (isCustom) {
      return [
        {
          id: 'w-hi-1',
          style: `${customToneName || 'कस्टम अंदाज़'}`,
          toneEmoji: '✍️',
          title: `${customToneName ? `अंदाज़: ${customToneName}` : 'खास कस्टम शुभकामना'}`,
          content: `${salutation}, ${meta.titleHi} के इस शानदार अवसर पर आपके लिए खास अंदाज़ में: ईश्वर करे आपका जीवन सदा खुशियों, उमंग और नई सफलताओं से महकता रहे। ${context ? `(विशेष: ${context})` : ''} 🌟✨`,
        },
        {
          id: 'w-hi-2',
          style: 'विशिष्ट व यादगार',
          toneEmoji: '💫',
          title: 'आपकी अनूठी शख्सियत',
          content: `प्रिय ${name}, आपकी जिंदादिली और यह खास अंदाज हर महफिल में जान डाल देता है। ${meta.titleHi} की इस पावन घड़ी में आपको अनंत प्यार और शुभकामनाएं! 🎉🌺`,
        },
        {
          id: 'w-hi-3',
          style: 'दिल से व आत्मीय',
          toneEmoji: '🪶',
          title: 'सपनों की नई उड़ान',
          content: `${salutation}, रब करे आपकी हर ख्वाहिश मुकम्मल हो और आने वाला हर दिन आपके लिए नई उम्मीदें लेकर आए। बहुत-बहुत बधाई! 🙏🥂`,
        },
      ];
    }
    if (isRoast) {
      return [
        {
          id: 'w-hi-1',
          style: 'दोस्ताना रोस्ट व मस्ती',
          toneEmoji: '😈',
          title: 'पार्टी कब दे रहे हो भाई?',
          content: `${salutation}, ${meta.titleHi} के इस शानदार मौके पर बहुत-बहुत बधाई! उम्र और समझ में से कुछ तो बढ़ रहा है, यही बड़ी बात है। अब ज्यादा बहाने मत बनाना, ट्रीट का इंतजार पूरी टोली कर रही है! ${context ? `(खासकर: ${context}!)` : ''} 🥳🍕`,
        },
        {
          id: 'w-hi-2',
          style: 'हंसोड़ व जिंदादिल',
          toneEmoji: '😜',
          title: 'स्वैग हमेशा 100%!',
          content: `अरे हमारे प्यारे ${name}! दुनिया चाहे कितनी भी गंभीर हो जाए, आपका यह बिंदास और मस्तमौला अंदाज कभी नहीं बदलना चाहिए। ${meta.titleHi} का जश्न ऐसा मने कि पड़ोसी भी आकर नाचने लगें! मुस्कुराते रहो और मस्त रहो! 🎉🎈`,
        },
        {
          id: 'w-hi-3',
          style: 'प्यारी सी खिंचाई',
          toneEmoji: '😄',
          title: 'सदा सलामत रहे यह बॉन्डिंग',
          content: `${salutation}, आपके जैसा अनमोल साथी पाना भी किसी किस्मत से कम नहीं—जिसे देखकर दिन की सारी थकान गायब हो जाती है। ईश्वर से दुआ है कि आपकी अक्ल और हमारी सहनशीलता दोनों सलामत रहे! 🥂✨`,
        },
      ];
    }

    if (isRomantic) {
      return [
        {
          id: 'w-hi-1',
          style: 'दिल से व रूमानी',
          toneEmoji: '🌹',
          title: 'मेरी जिंदगी की सबसे खूबसूरत दास्तान',
          content: `${salutation}, ${meta.titleHi} के इस हसीन मौके पर मैं रब का शुक्रिया अदा करता हूँ कि तुम मेरी तकदीर में हो। तुम्हारी एक मुस्कान मेरे पूरे जहां को रोशन कर देती है। ${context ? `(${context})` : ''} तुम हमेशा ऐसे ही मुस्कुराते रहो, ढेर सारा प्यार! 💖💫`,
        },
        {
          id: 'w-hi-2',
          style: 'शायराना मोहब्बत',
          toneEmoji: '🪶',
          title: 'दुआओं में तुम्हारा नाम',
          content: `तेरे होने से ही गुलशन है मेरे ख्वाबों का,\nतू ही हासिल है मेरी जिंदगी के हिसाबों का।\n${meta.titleHi} मुबारक हो मेरी जान, रब करे हमारा यह रिश्ता जन्मों-जन्मों तक यूं ही महकता रहे। ❤️✨`,
        },
        {
          id: 'w-hi-3',
          style: 'सच्चा समर्पण',
          toneEmoji: '✨',
          title: 'ताउम्र का खूबसूरत साथ',
          content: `${salutation}, जिंदगी के इस सफर में तुम्हारा हाथ थामे चलना ही मेरी सबसे बड़ी खुशी है। ${meta.titleHi} का यह दिन हमारे रिश्ते में और मिठास घोल दे। आई लव यू! 🌸💍`,
        },
      ];
    }

    if (isFormal) {
      return [
        {
          id: 'w-hi-1',
          style: 'औपचारिक व गरिमामयी',
          toneEmoji: '👔',
          title: 'हार्दिक बधाई एवं मंगलकामनाएं',
          content: `${salutation}, ${meta.titleHi} के इस गौरवशाली अवसर पर आपको हार्दिक बधाई व शुभकामनाएं प्रेषित करता हूँ। आपकी कर्तव्यनिष्ठा, दूरदर्शिता और परिश्रम सदैव हम सभी के लिए प्रेरणादायी रहे हैं। ${context ? `(${context})` : ''} आप निरंतर सफलता के नए आयाम स्थापित करें। 🌟🙏`,
        },
        {
          id: 'w-hi-2',
          style: 'सादर शुभकामना',
          toneEmoji: '🤝',
          title: 'उत्कृष्ट भविष्य की कामना',
          content: `${salutation}, इस शुभ अवसर पर ईश्वर से प्रार्थना है कि वे आपको उत्तम स्वास्थ्य, दीर्घायु और अपार सुख-समृद्धि प्रदान करें। आपके मार्गदर्शन में आगे का मार्ग और भी आलोकित हो। सादर वंदन। 💐🏛️`,
        },
        {
          id: 'w-hi-3',
          style: 'आदरपूर्ण संदेश',
          toneEmoji: '📜',
          title: 'यश व कीर्ति की कामना',
          content: `${salutation}, ${meta.titleHi} का यह पावन दिन आपके जीवन में नई ऊर्जा और प्रसन्नता का संचार करे। आपका सानिध्य सदैव हमें संबल देता है। ईश्वर की कृपा आप पर सदा बनी रहे। 🌿✨`,
        },
      ];
    }

    // Default Hindi (Occasion-tailored + Heartfelt / Witty / Poetic)
    return [
      {
        id: 'w-hi-1',
        style: 'दिल से व आत्मीय',
        toneEmoji: '💖',
        title: `${meta.titleHi} की हार्दिक शुभकामनाएं`,
        content: `${salutation}, ${meta.titleHi} के इस मंगलकारी अवसर पर आपको दिल की गहराइयों से अनंत शुभकामनाएं! ईश्वर करे आने वाला हर दिन आपके जीवन में सुख, समृद्धि और अच्छी सेहत की सौगात लेकर आए। ${context ? `(विशेष संस्मरण: ${context}!)` : ''} 🌺✨`,
      },
      {
        id: 'w-hi-2',
        style: 'मस्ती और उमंग',
        toneEmoji: '😄',
        title: 'जश्न और खुशियों की बौछार!',
        content: `अरे हमारे प्यारे ${name}! ${meta.titleHi} का यह पावन पर्व आपके जीवन में नई उमंग और ढेर सारी खुशियां भर दे। आज का दिन सिर्फ मुस्कुराहटों, मीठी बातों और जश्न का है। ढेर सारी बधाइयां! 🥳🎉`,
      },
      {
        id: 'w-hi-3',
        style: 'शायराना व गहराई भरा',
        toneEmoji: '🪶',
        title: 'दुआओं का खूबसूरत तोहफा',
        content: `खुशियों की महक से महके हर एक पल तुम्हारा,\nसितारों की रौशनी से रोशन हो मुकद्दर तुम्हारा।\nदुआ है रब से ${salutation}, ${meta.titleHi} के इस पावन मोड़ पर,\nकभी कम न हो यह मासूम सा तबस्सुम तुम्हारा। 🌟✍️`,
      },
    ];
  }

  // -------------------------------------------------------------
  // ENGLISH ENGINE
  // -------------------------------------------------------------
  if (isCustom) {
    return [
      {
        id: 'w-en-1',
        style: `${customToneName || 'Bespoke Custom Style'}`,
        toneEmoji: '✍️',
        title: `${customToneName ? `Style: ${customToneName}` : 'Custom Crafted Wish'}`,
        content: `${salutation}, crafting this special wish for ${meta.titleEn} in your signature tone: may this celebration ignite vibrant new energy, triumph, and laughter in everything you do! ${context ? `(Honoring: ${context}) ` : ''}Keep shining brilliantly! 🌟✨`,
      },
      {
        id: 'w-en-2',
        style: 'Signature Persona',
        toneEmoji: '💫',
        title: 'Uniquely Yours',
        content: `To ${name}: there is nobody quite like you! On this memorable ${meta.titleEn}, embrace every ounce of your unique magic. May the horizon deliver the grandest adventures and joy! 🥂🎉`,
      },
      {
        id: 'w-en-3',
        style: 'Memorable Tribute',
        toneEmoji: '🪶',
        title: 'An Unforgettable Chapter',
        content: `${salutation}, may this ${meta.titleEn} stand out as a golden chapter in your journey. Wishing you boundless health, peace of mind, and legendary celebrations. Cheers! 🙏🎈`,
      },
    ];
  }

  if (isRoast) {
    return [
      {
        id: 'w-en-1',
        style: 'Playful Banter',
        toneEmoji: '😈',
        title: 'Aging Like Fine Milk!',
        content: `${salutation}, huge congratulations on ${meta.titleEn}! Another year older, wiser... well, at least older! Don't worry, your secrets are always safe with me (mostly because my memory is failing too). ${context ? `Raising a toast to: ${context}! ` : ''}Now where is the party?! 🍕🥂`,
      },
      {
        id: 'w-en-2',
        style: 'Cheeky Teasing',
        toneEmoji: '😜',
        title: 'Leveling Up with Style',
        content: `Happy ${meta.titleEn}, ${name}! You're like that favorite vintage vinyl—a little scratched, highly dramatic, but still undeniably iconic. Never change your crazy self! Here's to making even more dubious life choices together! 🎉🔥`,
      },
      {
        id: 'w-en-3',
        style: 'Sarcastic & Sweet',
        toneEmoji: '😄',
        title: 'Tolerating You is My Superpower',
        content: `${salutation}, on this ${meta.titleEn}, I wanted to remind you of my unconditional patience for putting up with you. May your coffee be strong, your Wi-Fi swift, and your celebration legendary. Cheers! 🥂🎈`,
      },
    ];
  }

  if (isRomantic) {
    return [
      {
        id: 'w-en-1',
        style: 'Heartfelt Romance',
        toneEmoji: '🌹',
        title: 'My Whole Heart',
        content: `${salutation}, celebrating ${meta.titleEn} with you is the greatest privilege of my life. You make every ordinary day feel like poetry and every dream feel within reach. ${context ? `Remembering: ${context}. ` : ''}I love you more than words could ever convey. Happy ${meta.titleEn}! 💖✨`,
      },
      {
        id: 'w-en-2',
        style: 'Tender Devotion',
        toneEmoji: '✨',
        title: 'Forever By Your Side',
        content: `My dearest ${name}, your laughter is my sanctuary and your love is my greatest compass. On this special ${meta.titleEn}, I promise to keep choosing you, loving you, and laughing with you through every chapter ahead. 🌸💍`,
      },
      {
        id: 'w-en-3',
        style: 'Poetic Love',
        toneEmoji: '🪶',
        title: 'Our Beautiful Constellation',
        content: `Every second spent loving you feels like holding stars, ${name}. May this ${meta.titleEn} wrap you in all the tenderness you shower upon my world. Forever yours, now and always. ❤️🥂`,
      },
    ];
  }

  if (isFormal) {
    return [
      {
        id: 'w-en-1',
        style: 'Distinguished & Warm',
        toneEmoji: '👔',
        title: 'Warmest Compliments & Congratulations',
        content: `${salutation}, please accept my sincere congratulations on this momentous ${meta.titleEn}. Your steadfast dedication, integrity, and visionary leadership continue to be an inspiration to everyone around you. ${context ? `Honoring: ${context}. ` : ''}Wishing you continued distinction and triumph. 🌟🏛️`,
      },
      {
        id: 'w-en-2',
        style: 'Professional Warmth',
        toneEmoji: '🤝',
        title: 'Wishing You Continued Distinction',
        content: `${salutation}, on the occasion of ${meta.titleEn}, I extend my warmest regards to you and your family. May this milestone usher in greater fulfillment, robust health, and enduring prosperity in all your endeavors. 💐✨`,
      },
      {
        id: 'w-en-3',
        style: 'Gracious & Dignified',
        toneEmoji: '📜',
        title: 'A Tribute to Excellence',
        content: `${salutation}, marking this ${meta.titleEn} is a celebration of both character and exceptional dedication. It is an honor to collaborate with you. Wishing you abundant success and joyous celebrations ahead. 🌿🙏`,
      },
    ];
  }

  if (isBlessed) {
    return [
      {
        id: 'w-en-1',
        style: 'Spiritual Peace',
        toneEmoji: '🙏',
        title: 'Divine Blessings & Serenity',
        content: `${salutation}, on this blessed ${meta.titleEn}, may the Almighty illuminate your path with divine grace, peace, and abundance. May your heart always feel sheltered by love and your days overflow with gratitude. ${context ? `(${context}) ` : ''}Stay blessed always. 🕊️✨`,
      },
      {
        id: 'w-en-2',
        style: 'Sacred Prayers',
        toneEmoji: '🌿',
        title: 'Light, Health & Protection',
        content: `Dear ${name}, praying that this ${meta.titleEn} brings heavenly joy into your home. May every challenge transform into a stepping stone of wisdom, and may tranquility accompany you wherever you go. 🌸🙏`,
      },
      {
        id: 'w-en-3',
        style: 'Grace & Gratitude',
        toneEmoji: '💫',
        title: 'Surrounded by Heaven’s Favor',
        content: `${salutation}, sending heartfelt prayers for your health, prosperity, and spiritual joy. May the year ahead reflect the beauty of your kind soul and the blessings you so generously share with others. 🌟🤍`,
      },
    ];
  }

  if (isInspirational) {
    return [
      {
        id: 'w-en-1',
        style: 'Bold & Empowering',
        toneEmoji: '🚀',
        title: 'Conquer Your Next Horizon',
        content: `${salutation}, ${meta.titleEn} is not just another milestone—it is proof of your relentless courage, resilience, and brilliance! ${context ? `Remembering ${context}—` : ''}keep dreaming audaciously and climbing higher. The summit is yours! 🔥🌟`,
      },
      {
        id: 'w-en-2',
        style: 'Uplifting Drive',
        toneEmoji: '⚡',
        title: 'Unstoppable Momentum',
        content: `To ${name}: you carry within you the sparks that ignite revolutions. On this ${meta.titleEn}, embrace every ounce of your unique power. Your best chapters are still being written! 🏔️✨`,
      },
      {
        id: 'w-en-3',
        style: 'Visionary Triumph',
        toneEmoji: '🎯',
        title: 'Destined for Greatness',
        content: `${salutation}, never let the world dim your ambition. May this ${meta.titleEn} fuel your passion, shatter every glass ceiling, and bring the grandest victories you’ve worked so tirelessly for! 🏆💫`,
      },
    ];
  }

  if (isShort) {
    return [
      {
        id: 'w-en-1',
        style: 'Short & Crisp',
        toneEmoji: '⚡',
        title: 'Cheers to You!',
        content: `Happy ${meta.titleEn}, ${name}! ${context ? `${context}! ` : ''}Wishing you endless laughter, great health, and zero stress today and always! 🥂✨`,
      },
      {
        id: 'w-en-2',
        style: 'Punchy Wish',
        toneEmoji: '🎯',
        title: 'Pure Good Vibes',
        content: `${salutation}, happy ${meta.titleEn}! May your day be as remarkable, fun, and bright as you are! 🎉🎈`,
      },
      {
        id: 'w-en-3',
        style: 'One-Liner Warmth',
        toneEmoji: '💫',
        title: 'Big Celebrations',
        content: `To ${name} on your ${meta.titleEn}: keep shining, keep smiling, and make today completely unforgettable! 🌟🎂`,
      },
    ];
  }

  // Default English (Occasion-tailored + Heartfelt / Witty / Poetic)
  return [
    {
      id: 'w-en-1',
      style: 'Heartfelt & Warm',
      toneEmoji: '💖',
      title: `Warmest ${meta.titleEn} Wishes`,
      content: `${salutation}, on this special ${meta.titleEn}, I want you to know how truly treasured you are. May your journey ahead be blessed with vibrant health, peace of mind, and reasons to smile every single day. ${context ? `Special shoutout to: ${context}! ` : ''}You bring so much light into our lives! ✨🌿`,
    },
    {
      id: 'w-en-2',
      style: 'Witty & Fun',
      toneEmoji: '😄',
      title: 'Cheers to Leveling Up!',
      content: `Happy ${meta.titleEn}, ${name}! Like a classic playlist or vintage wine, you only get better (and livelier) with time! Wishing you zero stress, extra treats, and celebrations as legendary as you are. Let the good times roll! 🥂🎉`,
    },
    {
      id: 'w-en-3',
      style: 'Poetic & Expressive',
      toneEmoji: '🪶',
      title: 'A Tapestry of Wonder',
      content: `May every step you take unfold into wonder, ${name}. As you mark this ${meta.titleEn}, may the horizon whisper promises of triumph, love, and courage. Keep shining with that untamed brilliance that inspires everyone around you. 🌟💫`,
    },
  ];
}
