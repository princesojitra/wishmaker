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
  festival: {
    titleEn: 'Festive Season',
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
  friendship: {
    titleEn: 'Friendship Celebration',
    titleHi: 'अनमोल मित्रता',
    titleGu: 'સચ્ચી મિત્રતા',
    emoji: '👥',
    themeEn: 'unbreakable bond, shared laughs, and unconditional support',
    themeHi: 'अटूट दोस्ती, हंसी-मज़ाक और हर कदम पर एक-दूजे का साथ',
    themeGu: 'સાચી ભાઈબંધી, અવિરત સાથ અને મન મૂકીને વિતાવેલી પળો',
  },
  congratulations: {
    titleEn: 'Hearty Congratulations',
    titleHi: 'हार्दिक बधाई व शुभकामनाएं',
    titleGu: 'હાર્દિક અભિનંદન',
    emoji: '🏆',
    themeEn: 'outstanding achievement, hard work, and brilliant success',
    themeHi: 'शानदार उपलब्धि, अटूट लगन और गौरवपूर्ण सफलता',
    themeGu: 'અદભુત સિદ્ધિ, ઉજ્જવળ સફળતા અને પરિશ્રમનું સુવર્ણ ફળ',
  },
  thank_you: {
    titleEn: 'Heartfelt Thank You',
    titleHi: 'हार्दिक धन्यवाद व आभार',
    titleGu: 'અંતઃકરણપૂર્વક આભાર',
    emoji: '🌸',
    themeEn: 'genuine gratitude, kindness, and deep appreciation',
    themeHi: 'सच्चा आभार, आपके स्नेह और अमूल्य सहयोग के लिए धन्यवाद',
    themeGu: 'આપના સ્નેહ, નિસ્વાર્થ સાથ અને ઉમદા સહકાર બદલ દિલથી આભાર',
  },
  just_because: {
    titleEn: 'Thinking of You',
    titleHi: 'यूं ही — खास आपके लिए',
    titleGu: 'બસ એમ જ — તમારી યાદમાં',
    emoji: '💗',
    themeEn: 'a warm reminder of care, joy, and positive vibes',
    themeHi: 'बिना किसी वजह के, बस आपको यह याद दिलाने के लिए कि आप बहुत खास हैं',
    themeGu: 'કોઈ કારણ વગર, માત્ર એ યાદ અપાવવા કે તમે હૃદયની ખૂબ નજીક છો',
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

function applyLoopVariation(wishes: Wish[], loop: number, regenCount: number): Wish[] {
  if (loop <= 0) return wishes;
  const loopEmojis = ['💫', '🌟', '✨', '💎', '🎉', '🔥'];
  return wishes.map((w, idx) => ({
    ...w,
    id: `${w.id}-loop${loop}-${idx}`,
    title: loop % 2 === 1 ? `${w.title} (Fresh Take)` : `${w.title} ✨`,
    content: `${w.content} ${loopEmojis[(regenCount + idx) % loopEmojis.length]}`,
  }));
}

export function getCuratedWishes(req: WishRequest): Wish[] {
  const name = req.recipientName?.trim() || 'My Friend';
  const rawOcc = req.occasion?.toLowerCase() || 'birthday';
  const lang = req.language || 'en';
  const rel = req.relationship || 'friend';
  const tones = Array.isArray(req.tones) && req.tones.length > 0 ? req.tones : [req.tone || 'heartfelt'];
  const context = req.context?.trim() || '';

  // Cycle index: increments every time the user taps Regenerate!
  const regenCount = req.regenerationCount ?? req.seed ?? 0;
  const cycle = regenCount % 3;
  const loop = Math.floor(regenCount / 3);

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

  let results: Wish[] = [];

  // -------------------------------------------------------------
  // GUJARATI ENGINE (3 Distinct Sets by Cycle)
  // -------------------------------------------------------------
  if (lang === 'gu') {
    if (isCustom) {
      if (cycle === 1) {
        results = [
          {
            id: `w-gu-cu1-1`,
            style: `${customToneName || 'કસ્ટમ શૈલી'}`,
            toneEmoji: '✨',
            title: 'અનોખી અને તાજી શુભેચ્છા',
            content: `વહાલા ${name}, ${meta.titleGu} ના આ રૂડા અવસરે તમારા માટે ખાસ: તમારી ઊર્જા અને મનોબળ હંમેશા આવા જ અજેય રહે! ${context ? `(વિશેષ યાદ: ${context})` : ''} જીવનમાં નવી ઊંચાઈઓ સર કરો! 🏔️🎉`,
          },
          {
            id: `w-gu-cu1-2`,
            style: 'આગવો વટ',
            toneEmoji: '🔥',
            title: 'હંમેશા અવ્વલ રહો',
            content: `${salutation}, તમારો આ વિશિષ્ટ અંદાજ જ તમારી સૌથી મોટી શક્તિ છે. ${meta.titleGu} પર ઈશ્વર તમારા માર્ગમાં અખૂટ સફળતા અને પ્રસન્નતા પાથરે એવી હૃદયની દુઆ! 🌟🥂`,
          },
          {
            id: `w-gu-cu1-3`,
            style: 'હાર્દિક સ્મરણ',
            toneEmoji: '🪶',
            title: 'નવી ક્ષિતિજો',
            content: `${name}, જીવનના આ સુંદર પડાવ પર તમારા બધા જ સપનાઓ સાકાર થાય. આ ${meta.titleGu} તમારા માટે સૌથી યાદગાર બની રહે! 🙏💫`,
          },
        ];
      } else if (cycle === 2) {
        results = [
          {
            id: `w-gu-cu2-1`,
            style: `${customToneName || 'વિશિષ્ટ અંદાજ'}`,
            toneEmoji: '💎',
            title: 'નવી ચેતના અને તેજ',
            content: `સ્નેહી ${name}, ${meta.titleGu} ના આ રૂડા ટાણે તમારા જીવનમાં નવી ચેતના અને અવિરત ઉત્સાહનો સંચાર થાય! ${context ? `(વિશેષ પ્રેરણા: ${context})` : ''} તમારી પ્રત્યેક મહત્ત્વાકાંક્ષા પૂર્ણ થાય એવી હાર્દિક મનોકામના! 🌟🚀`,
          },
          {
            id: `w-gu-cu2-2`,
            style: 'અડગ વિશ્વાસ',
            toneEmoji: '⚡',
            title: 'સફળતાના નવા શિખરો',
            content: `${salutation}, તમારી લગન અને અનોખી પ્રતિભા દરેકને પ્રભાવિત કરે છે. ${meta.titleGu} પર ઈશ્વર તમારા પર સદા કૃપાદ્રષ્ટિ રાખે અને તમારો દરેક દિવસ ઉત્સવ બની રહે! 🌺💫`,
          },
          {
            id: `w-gu-cu2-3`,
            style: 'શાશ્વત સ્નેહ',
            toneEmoji: '🪶',
            title: 'સદાય હસતા રહો',
            content: `વહાલા ${name}, આ મંગલ ઘડી તમારા દિલમાં અસીમ શાંતિ અને આનંદ ભરી દે. ખૂબ ખૂબ અભિનંદન! 🥂✨`,
          },
        ];
      } else {
        results = [
          {
            id: `w-gu-cu0-1`,
            style: `${customToneName || 'કસ્ટમ અંદાજ'}`,
            toneEmoji: '✍️',
            title: `${customToneName ? `અંદાજ: ${customToneName}` : 'ખાસ કસ્ટમ શુભેચ્છા'}`,
            content: `${salutation}, ${meta.titleGu} ના આ ખાસ પ્રસંગે તમારા માટે ખાસ શૈલીમાં: જીવનમાં હંમેશા નવી ઉર્જા, ઉત્સાહ અને આનંદ બની રહે એવી હૃદયપૂર્વકની કામના! ${context ? `(${context})` : ''} 🌟✨`,
          },
          {
            id: `w-gu-cu0-2`,
            style: 'અનોખી પ્રેરણા',
            toneEmoji: '💫',
            title: 'તમારી આગવી ઓળખ',
            content: `વહાલા ${name}, તમારું વ્યક્તિત્વ હંમેશા અનોખું અને પ્રેરણાદાયી રહ્યું છે. ${meta.titleGu} નો આ રૂડો અવસર તમારા માટે સફળતાના નવા દ્વાર ખોલે એવી પ્રાર્થના! 🎉🌸`,
          },
          {
            id: `w-gu-cu0-3`,
            style: 'યાદગાર પળો',
            toneEmoji: '🪶',
            title: 'અવિસ્મરણીય સફર',
            content: `${salutation}, તમારા દરેક સપના પૂરા થાય અને આવનારા દિવસોમાં દરેક પળ ઉત્સવ સમાન બની રહે. ખૂબ ખૂબ અભિનંદન! 🙏🥂`,
          },
        ];
      }
      return applyLoopVariation(results, loop, regenCount);
    }

    if (isRoast) {
      if (cycle === 1) {
        results = [
          {
            id: `w-gu-r1-1`,
            style: 'તીખી મજાક',
            toneEmoji: '🔥',
            title: 'કેલેન્ડર બદલાયું, તમે ક્યારે?',
            content: `${salutation}, ${meta.titleGu} ની ખૂબ ખૂબ વધામણી! દુનિયા ચંદ્ર પર પહોંચી ગઈ પણ તમારા નખરાં અને મોડા પડવાની આદત હજુ ત્યાં જ છે! ${context ? `ખાસ કરીને: ${context}! ` : ''}આજે તો કંઈક સુધરો અને પાર્ટી આપો! 🍕😂`,
          },
          {
            id: `w-gu-r1-2`,
            style: 'સ્નેહી ખેંચતાણ',
            toneEmoji: '😜',
            title: 'અમારી સહનશક્તિ જિંદાબાદ!',
            content: `અરે ${name}! ભગવાન તમને દીર્ઘાયુ આપે જેથી તમે અમને હજુ વર્ષો સુધી હેરાન કરી શકો! આ ${meta.titleGu} પર બસ એક જ વિનંતી: આજે બિલ તમે ચૂકવજો! 🥳💸`,
          },
          {
            id: `w-gu-r1-3`,
            style: 'હાસ્યસ્પદ ફ્રેન્ડશિપ',
            toneEmoji: '🍺',
            title: 'સદાબહાર કાર્ટૂન',
            content: `વહાલા ${name}, તમારા વગર અમારી કોઈ મહેફિલ જામતી નથી—કારણ કે હસવા માટે કોઈ જોકર તો જોઈએ ને! જલસા કરો અને આ ${meta.titleGu} ધમાકેદાર ઉજવો! 🎈🥂`,
          },
        ];
      } else if (cycle === 2) {
        results = [
          {
            id: `w-gu-r2-1`,
            style: 'રમૂજી ચિમકી',
            toneEmoji: '🍕',
            title: 'તમારી આળસને સલામ!',
            content: `${salutation}, ${meta.titleGu} પર એક જ સવાલ: આ વર્ષે તો સમયસર પહોંચશો કે દર વખતની જેમ "બસ 5 મિનિટમાં પહોંચ્યો" કહીને 2 કલાક કરાવશો?! ${context ? `(ખાસ યાદ: ${context}) ` : ''}બાકી તમારા વગર મજા નથી આવતી! 😜🎉`,
          },
          {
            id: `w-gu-r2-2`,
            style: 'અલ્ટીમેટ મસ્તી',
            toneEmoji: '🎭',
            title: 'ઓસ્કાર એવોર્ડ વિનર',
            content: `અરે ${name}! તમારા નાટક અને ડ્રામા આગળ તો બોલિવૂડ પણ ઝાંખું પડે! ${meta.titleGu} ની ખૂબ ખૂબ વધામણી! આજે કમસે કમ ચા-નાસ્તો તો તમારા તરફથી કરાવો! 🥳💸`,
          },
          {
            id: `w-gu-r2-3`,
            style: 'મીઠો કટાક્ષ',
            toneEmoji: '🍻',
            title: 'સદાબહાર નમૂનો',
            content: `વહાલા ${name}, ઉંમર ભલે વધે પણ તમારી નાની બાળકની જેવી હરકતો ક્યારેય બદલાતી નથી! ભગવાન તમારી રક્ષા કરે અને અમને તમારા ત્રાસમાંથી મુક્તિ આપે! ચીયર્સ! 🥂😂`,
          },
        ];
      } else {
        results = [
          {
            id: `w-gu-r0-1`,
            style: 'હળવી મસ્તી અને મજાક',
            toneEmoji: '😈',
            title: `પાર્ટી તો બનવી જ જોઈએ!`,
            content: `${salutation}, ${meta.titleGu} ના આ રૂડા અવસરે તમને ઘણી બધી શુભેચ્છાઓ! ઉંમર ભલે એક વર્ષ વધે કે અનુભવ, તમારો વટ એવો ને એવો જ રહેવો જોઈએ. હવે બહુ બહાના ન કાઢતા, પાર્ટી ક્યારે આપો છો? ${context ? `(ખાસ કરીને: ${context} વાળી ટ્રીટ બાકી છે!)` : ''} 🥳🍕`,
          },
          {
            id: `w-gu-r0-2`,
            style: 'તોફાની ટ્વિસ્ટ',
            toneEmoji: '😜',
            title: 'ઓરિજિનલ સ્વેગ!',
            content: `અરે વાહ ${name}! આજના આ ખાસ દિવસે તમારા ચહેરા પર આવી જ મોટી સ્માઈલ રહેવી જોઈએ. દુનિયા ભલે ગમે તેટલી સિરિયસ થઈ જાય, તમારો મસ્તમૌલા અંદાજ ક્યારેય ના બદલાવો જોઈએ! જલસા કરો અને મજા માણો! 🎉🎈`,
          },
          {
            id: `w-gu-r0-3`,
            style: 'પ્રેમાળ કટાક્ષ',
            toneEmoji: '😄',
            title: 'હંમેશા સુપરહિટ રહો',
            content: `${salutation}, તમારા જેવા સજ્જન મિત્ર મળવા એ પણ નસીબની વાત છે—જે હંમેશા બધાને હસાવતા રહે છે! આ ${meta.titleGu} પર ઈશ્વર તમને અખૂટ ધીરજ આપે અને અમને સહન કરવાની શક્તિ આપે! 🥂✨`,
          },
        ];
      }
      return applyLoopVariation(results, loop, regenCount);
    }

    // Default Gujarati (3 Diverse Sets)
    if (cycle === 1) {
      results = [
        {
          id: `w-gu-c1-1`,
          style: 'અખૂટ સ્નેહ અને આદર',
          toneEmoji: '🌸',
          title: 'સુવર્ણ પ્રભાત અને આશીર્વાદ',
          content: `${salutation}, ${meta.titleGu} ની આ પાવન વેળાએ આપના જીવનમાં સુખ, સંતોષ અને ઉત્તમ તંદુરસ્તી સદાય મહેકતી રહે એવી અંતઃકરણપૂર્વકની શુભકામનાઓ! ${context ? `(યાદગાર પળ: ${context})` : ''} પ્રભુ આપને સદાય પ્રસન્ન રાખે. 🌺🙏`,
        },
        {
          id: `w-gu-c1-2`,
          style: 'નવી ઉમંગ અને આનંદ',
          toneEmoji: '🌟',
          title: 'ઉત્સાહભરી ક્ષણો',
          content: `વહાલા ${name}, આપની સંગત હંમેશા ખુશીઓની પ્રેરણા આપે છે. આ ${meta.titleGu} આપના અને આપના પરિવાર માટે અનંત ખુશીઓ અને સમૃદ્ધિનું નવું સવાર લઈને આવે! ખૂબ ખૂબ વધામણી! 💐✨`,
        },
        {
          id: `w-gu-c1-3`,
          style: 'કાવ્યાત્મક દુઆ',
          toneEmoji: '🪶',
          title: 'અવિરત પ્રગતિ',
          content: `${salutation}, ઈશ્વર આપના દરેક ડગલાને સફળતાથી સજાવે, દરેક મુશ્કેલીને હિંમતમાં બદલે અને આપનું હૃદય હંમેશા સ્નેહથી છલકાતું રહે. ${meta.titleGu} મુબારક! 🌿💫`,
        },
      ];
    } else if (cycle === 2) {
      results = [
        {
          id: `w-gu-c2-1`,
          style: 'પરમ શાંતિ અને શ્રદ્ધા',
          toneEmoji: '🌿',
          title: 'સર્વમંગલ કામના',
          content: `${salutation}, ${meta.titleGu} ના આ પુનિત દિને પરમેશ્વર આપના ઘરમાં અખૂટ લક્ષ્મી, શાંતિ અને દીર્ઘાયુની કૃપા વરસાવે. ${context ? `(${context}) ` : ''}આપનો દરેક દિવસ મંગલમય રહે એવી શ્રદ્ધાપૂર્ણ શુભકામનાઓ! 🪔🙏`,
        },
        {
          id: `w-gu-c2-2`,
          style: 'પ્રેરણા અને ગૌરવ',
          toneEmoji: '🏆',
          title: 'સતત વિજયી બનો',
          content: `આદરણીય ${name}, આપનો સાથ અને આશીર્વાદ હંમેશા અમારું માર્ગદર્શન કરે છે. ${meta.titleGu} નો આ પવિત્ર અવસર આપના જીવનમાં યશ અને કીર્તિની નવી ઊંચાઈઓ ઉમેરે! 🌟💐`,
        },
        {
          id: `w-gu-c2-3`,
          style: 'હૃદયસ્પર્શી દુઆ',
          toneEmoji: '💫',
          title: 'અનંત સ્નેહની સુવાસ',
          content: `${salutation}, ફૂલોની જેમ આપનું જીવન મહેકતું રહે અને ઈશ્વર આપના હૃદયની દરેક સદ્ભાવના સાકાર કરે. ${meta.titleGu} ની ખૂબ ખૂબ મુબારકબાદી! 🌸✨`,
        },
      ];
    } else {
      results = [
        {
          id: `w-gu-c0-1`,
          style: 'હાર્દિક અને સ્નેહસભર',
          toneEmoji: '💖',
          title: `${meta.titleGu} ની અંતરંગ શુભેચ્છાઓ`,
          content: `${salutation}, ${meta.titleGu} ના આ મંગલમય અવસરે આપના જીવનમાં સુખ, શાંતિ, સદ્ભાવના અને અખૂટ સમૃદ્ધિની વર્ષા થાય એવી હૃદયપૂર્વકની શુભકામનાઓ! ${context ? `વિશેષ સ્મરણ: ${context}!` : ''} આપનું દરેક સ્વપ્ન સાકાર થાય. 🌸✨`,
        },
        {
          id: `w-gu-c0-2`,
          style: 'મનોરંજક અને ઉત્સાહી',
          toneEmoji: '😄',
          title: 'જલસા અને ધૂમધામ!',
          content: `અરે ${name}! ${meta.titleGu} નો આ પાવન દિવસ ખૂબ ઉત્સાહ અને આનંદ સાથે ઉજવજો. ઈશ્વર આપના ચહેરા પરનું સ્મિત સદાય ખીલેલું રાખે અને જીવનનો દરેક પળ યાદગાર બને. ખૂબ ખૂબ વધામણી! 🥳🎉`,
        },
        {
          id: `w-gu-c0-3`,
          style: 'કાવ્યાત્મક આશીર્વાદ',
          toneEmoji: '🪶',
          title: 'દુઆઓની સુવાસ',
          content: `સમયની દરેક ક્ષણ આપના માટે ખુશીઓની મહેક લઈને આવે, ${salutation}. ${meta.titleGu} નો આ પંથ આપના માટે નવી આશાઓ અને સફળતાના શિખરો સર કરવાનો માર્ગ મોકળો કરે. ઈશ્વરના અનંત આશીર્વાદ આપની સાથે રહે. 🙏💫`,
        },
      ];
    }
    return applyLoopVariation(results, loop, regenCount);
  }

  // -------------------------------------------------------------
  // HINDI ENGINE (3 Distinct Sets by Cycle)
  // -------------------------------------------------------------
  if (lang === 'hi') {
    if (isCustom) {
      if (cycle === 1) {
        results = [
          {
            id: `w-hi-cu1-1`,
            style: `${customToneName || 'खास अंदाज़'}`,
            toneEmoji: '✨',
            title: 'अनूठा व विशेष अंदाज़',
            content: `${salutation}, ${meta.titleHi} के इस शानदार अवसर पर आपके लिए खास: आपका यह खास अंदाज़ और सकारात्मक सोच हमेशा यूं ही चमकती रहे! ${context ? `(विशेष: ${context}) ` : ''}जीवन में हर कदम पर जीत मिले! 🌟🎉`,
          },
          {
            id: `w-hi-cu1-2`,
            style: 'अलग पहचान',
            toneEmoji: '🔥',
            title: 'सदा अव्वल रहें',
            content: `प्रिय ${name}, आपकी ऊर्जा और लगन सबसे अलग है। ${meta.titleHi} आपके लिए नए अवसरों और खुशियों का नया पैगाम लेकर आए! 🚀💫`,
          },
          {
            id: `w-hi-cu1-3`,
            style: 'आत्मीय संस्मरण',
            toneEmoji: '🪶',
            title: 'नई ऊंचाइयों की ओर',
            content: `${salutation}, हर ख्वाहिश पूरी हो और आपका हर दिन उत्सव बन जाए। बहुत-बहुत शुभकामनाएं! 🥂🌸`,
          },
        ];
      } else if (cycle === 2) {
        results = [
          {
            id: `w-hi-cu2-1`,
            style: `${customToneName || 'विशिष्ट शैली'}`,
            toneEmoji: '💎',
            title: 'तेजस्वी व प्रेरणादायक',
            content: `${salutation}, ${meta.titleHi} के इस पावन मोड़ पर आपकी विशिष्ट प्रतिभा और लगन को हमारा सलाम! ${context ? `(${context}) ` : ''}आपकी हर राह खुशियों से सजी रहे! 🏔️✨`,
          },
          {
            id: `w-hi-cu2-2`,
            style: 'अडिग विश्वास',
            toneEmoji: '🌟',
            title: 'सितारों से आगे',
            content: `प्रिय ${name}, आप जहां भी जाते हैं, एक नई चमक बिखेर देते हैं। ईश्वर करे यह ${meta.titleHi} आपके जीवन की सबसे यादगार शुरुआत बने! 💐🙏`,
          },
          {
            id: `w-hi-cu2-3`,
            style: 'सदाबहार स्नेह',
            toneEmoji: '🪶',
            title: 'सफलता का परचम',
            content: `${salutation}, आपकी मेहनत और हौसले को देखकर हर कोई प्रेरित होता है। ${meta.titleHi} की अनंत बधाइयां! 🥂🎉`,
          },
        ];
      } else {
        results = [
          {
            id: `w-hi-cu0-1`,
            style: `${customToneName || 'अनुकूलित अंदाज़'}`,
            toneEmoji: '✍️',
            title: `${customToneName ? `अंदाज़: ${customToneName}` : 'विशेष शुभकामना'}`,
            content: `${salutation}, ${meta.titleHi} के इस पावन पर्व पर आपके लिए विशेष शैली में: जीवन में हमेशा नए उत्साह, आनंद और सफलता का वास रहे! ${context ? `(${context})` : ''} 🌟✨`,
          },
          {
            id: `w-hi-cu0-2`,
            style: 'विशिष्ट प्रेरणा',
            toneEmoji: '💫',
            title: 'आपकी अपनी पहचान',
            content: `प्रिय ${name}, आपका यह व्यक्तित्व हमेशा दूसरों को प्रेरणा देता है। ${meta.titleHi} का यह पावन दिन आपके जीवन में खुशहाली के नए द्वार खोले! 🎉🌸`,
          },
          {
            id: `w-hi-cu0-3`,
            style: 'अविस्मरणीय पल',
            toneEmoji: '🪶',
            title: 'मुबारक हो यह सफर',
            content: `${salutation}, आपका हर सपना साकार हो और जीवन का हर पल एक खूबसूरत त्योहार बन जाए। बहुत-बहुत बधाई! 🙏🥂`,
          },
        ];
      }
      return applyLoopVariation(results, loop, regenCount);
    }

    if (isRoast) {
      if (cycle === 1) {
        results = [
          {
            id: `w-hi-r1-1`,
            style: 'तीखी नोकझोंक',
            toneEmoji: '🔥',
            title: 'उम्र बढ़ गई, अक्ल कब आएगी?',
            content: `${salutation}, ${meta.titleHi} की ढेरों बधाइयां! सुना है साल बदलने से इंसान समझदार हो जाता है, पर आपको देखकर यह थ्योरी गलत साबित हो गई! ${context ? `(खासकर: ${context}!)` : ''} अब बहाने छोड़ो और मिठाई का डिब्बा खोलो! 🍕😜`,
          },
          {
            id: `w-hi-r1-2`,
            style: 'फुल नौटंकी',
            toneEmoji: '🤣',
            title: 'हमारे ड्रामेबाज़ दोस्त के नाम',
            content: `अरे ${name}! आपका स्वैग और नौटंकी देखकर तो ऑस्कर भी शर्मा जाए! ${meta.titleHi} के इस मौके पर यही दुआ है कि आप हमेशा ऐसे ही हंसते-हंसाते रहें और पार्टी का बिल खुद भरें! 🥳🎂`,
          },
          {
            id: `w-hi-r1-3`,
            style: 'दोस्ताना तंज',
            toneEmoji: '😈',
            title: 'सहनशीलता का पुरस्कार',
            content: `${salutation}, आपके साथ रहने के लिए हमें नोबेल प्राइज मिलना चाहिए! लेकिन फिर भी, आपके बिना महफिल अधूरी है। ${meta.titleHi} मुबारक हो, हमारे सबसे प्यारे कार्टून! 🥂✨`,
          },
        ];
      } else if (cycle === 2) {
        results = [
          {
            id: `w-hi-r2-1`,
            style: 'आलस का बादशाह',
            toneEmoji: '🍕',
            title: 'टाइम पर पहुंचना कब सीखोगे?',
            content: `${salutation}, ${meta.titleHi} पर बस एक ही प्रार्थना है: कभी तो "रास्ते में हूं" बोलकर घर पर सोना बंद करो! ${context ? `(खासकर: ${context}!) ` : ''}बाकी आप जैसे हो, हमारे सबसे प्यारे कार्टून हो! 😜🥳`,
          },
          {
            id: `w-hi-r2-2`,
            style: 'ड्रामा क्वीन/किंग',
            toneEmoji: '🎭',
            title: 'सुपरस्टार नौटंकी',
            content: `अरे ${name}! आपका ड्रामा देखकर तो टीवी सीरियल वाले भी इस्तीफा दे दें! ${meta.titleHi} की ढेर सारी शुभकामनाएं! आज तो पार्टी का बिल भर ही देना भाई! 💸🎉`,
          },
          {
            id: `w-hi-r2-3`,
            style: 'खट्टी-मीठी नोकझोंक',
            toneEmoji: '🍻',
            title: 'हमारी जान हो तुम',
            content: `वहाब ${salutation}, उम्र चाहे कितनी भी बढ़ जाए, आपकी हरकतें अभी भी नर्सरी वाली ही हैं! रब करे हमारी दोस्ती ऐसे ही तरोताजा रहे। चीयर्स! 🥂😂`,
          },
        ];
      } else {
        results = [
          {
            id: `w-hi-r0-1`,
            style: 'दोस्ताना रोस्ट व मस्ती',
            toneEmoji: '😈',
            title: 'पार्टी कब दे रहे हो भाई?',
            content: `${salutation}, ${meta.titleHi} के इस शानदार मौके पर बहुत-बहुत बधाई! उम्र और समझ में से कुछ तो बढ़ रहा है, यही बड़ी बात है। अब ज्यादा बहाने मत बनाना, ट्रीट का इंतजार पूरी टोली कर रही है! ${context ? `(खासकर: ${context}!)` : ''} 🥳🍕`,
          },
          {
            id: `w-hi-r0-2`,
            style: 'हंसोड़ व जिंदादिल',
            toneEmoji: '😜',
            title: 'स्वैग हमेशा 100%!',
            content: `अरे हमारे प्यारे ${name}! दुनिया चाहे कितनी भी गंभीर हो जाए, आपका यह बिंदास और मस्तमौला अंदाज कभी नहीं बदलना चाहिए। ${meta.titleHi} का जश्न ऐसा मने कि पड़ोसी भी आकर नाचने लगें! मुस्कुराते रहो और मस्त रहो! 🎉🎈`,
          },
          {
            id: `w-hi-r0-3`,
            style: 'प्यारी सी खिंचाई',
            toneEmoji: '😄',
            title: 'सदा सलामत रहे यह बॉन्डिंग',
            content: `${salutation}, आपके जैसा अनमोल साथी पाना भी किसी किस्मत से कम नहीं—जिसे देखकर दिन की सारी थकान गायब हो जाती है। ईश्वर से दुआ है कि आपकी अक्ल और हमारी सहनशीलता दोनों सलामत रहे! 🥂✨`,
          },
        ];
      }
      return applyLoopVariation(results, loop, regenCount);
    }

    // Default Hindi (3 Diverse Sets)
    if (cycle === 1) {
      results = [
        {
          id: `w-hi-c1-1`,
          style: 'अगाध स्नेह व आशीष',
          toneEmoji: '🌺',
          title: 'सुख, शांति और समृद्धि की कामना',
          content: `${salutation}, ${meta.titleHi} के इस शुभ अवसर पर ईश्वर से प्रार्थना है कि आपका जीवन सदैव खुशहाली, उत्तम स्वास्थ्य और नई उपलब्धियों से आलोकित रहे। ${context ? `(विशेष संस्मरण: ${context})` : ''} आपके हर कदम पर सफलता आपके साथ हो। 🌸🙏`,
        },
        {
          id: `w-hi-c1-2`,
          style: 'उमंग व नई ऊर्जा',
          toneEmoji: '✨',
          title: 'मुस्कुराहटों का कारवां',
          content: `प्रिय ${name}, आपकी ऊर्जा और सकारात्मक सोच हर किसी को प्रेरणा देती है। ${meta.titleHi} का यह पावन दिन आपके लिए नए अवसर और असीम खुशियां लेकर आए। बहुत-बहुत बधाई! 🌟💐`,
        },
        {
          id: `w-hi-c1-3`,
          style: 'शायराना अंदाज़',
          toneEmoji: '🪶',
          title: 'दुआओं का खूबसूरत चमन',
          content: `हर सुबह नई उम्मीद का पैगाम दे आपको,\nहर शाम खुशियों का नया सलाम दे आपको।\n${salutation}, रब करे ${meta.titleHi} का यह मोड़,\nजमाने की हर नेमत और मुकाम दे आपको। 🌿✍️`,
        },
      ];
    } else if (cycle === 2) {
      results = [
        {
          id: `w-hi-c2-1`,
          style: 'परम आशीष व मंगलकामना',
          toneEmoji: '🌿',
          title: 'ईश्वर की असीम अनुकंपा',
          content: `${salutation}, ${meta.titleHi} के इस पवित्र अवसर पर ईश्वर आपके आंगन में सुख, शांति, संतोष और उत्तम स्वास्थ्य का वरदान बरसाए। ${context ? `(${context}) ` : ''}आपका हर दिन नई रोशनी से जगमगाए! 🪔🙏`,
        },
        {
          id: `w-hi-c2-2`,
          style: 'प्रेरणा व कीर्ति',
          toneEmoji: '🏆',
          title: 'सदा विजयी भव',
          content: 'आदरणीय ' + name + `, आपका व्यक्तित्व और विचार हम सभी के लिए एक मार्गदर्शक हैं। ${meta.titleHi} का यह मंगलमय दिन आपके जीवन में सम्मान और यश के नए आयाम जोड़े! 🌟💐`,
        },
        {
          id: `w-hi-c2-3`,
          style: 'शायराना दुआ',
          toneEmoji: '🪶',
          title: 'दुआओं का गुलदस्ता',
          content: `चांदनी रातों में जैसे नूर बरसता है,\nवैसे ही रब का करम आप पर सदा बरसता रहे।\n${salutation}, मुबारक हो ${meta.titleHi} का यह खूबसूरत दिन,\nआपकी झोली में हर पल खुशियों का गुलशन महकता रहे। 🌸✨`,
        },
      ];
    } else {
      results = [
        {
          id: `w-hi-c0-1`,
          style: 'दिल से व आत्मीय',
          toneEmoji: '💖',
          title: `${meta.titleHi} की हार्दिक शुभकामनाएं`,
          content: `${salutation}, ${meta.titleHi} के इस मंगलकारी अवसर पर आपको दिल की गहराइयों से अनंत शुभकामनाएं! ईश्वर करे आने वाला हर दिन आपके जीवन में सुख, समृद्धि और अच्छी सेहत की सौगात लेकर आए। ${context ? `(विशेष संस्मरण: ${context}!)` : ''} 🌺✨`,
        },
        {
          id: `w-hi-c0-2`,
          style: 'मस्ती और उमंग',
          toneEmoji: '😄',
          title: 'जश्न और खुशियों की बौछार!',
          content: `अरे हमारे प्यारे ${name}! ${meta.titleHi} का यह पावन पर्व आपके जीवन में नई उमंग और ढेर सारी खुशियां भर दे। आज का दिन सिर्फ मुस्कुराहटों, मीठी बातों और जश्न का है। ढेर सारी बधाइयां! 🥳🎉`,
        },
        {
          id: `w-hi-c0-3`,
          style: 'शायराना व गहराई भरा',
          toneEmoji: '🪶',
          title: 'दुआओं का खूबसूरत तोहफा',
          content: `खुशियों की महक से महके हर एक पल तुम्हारा,\nसितारों की रौशनी से रोशन हो मुकद्दर तुम्हारा।\nदुआ है रब से ${salutation}, ${meta.titleHi} के इस पावन मोड़ पर,\nकभी कम न हो यह मासूम सा तबस्सुम तुम्हारा। 🌟✍️`,
        },
      ];
    }
    return applyLoopVariation(results, loop, regenCount);
  }

  // -------------------------------------------------------------
  // ENGLISH ENGINE (3 Distinct Sets by Cycle)
  // -------------------------------------------------------------
  if (isCustom) {
    if (cycle === 1) {
      results = [
        {
          id: `w-en-cu1-1`,
          style: `${customToneName || 'Custom Twist'}`,
          toneEmoji: '⚡',
          title: 'Tailored With Flair',
          content: `${salutation}, celebrating ${meta.titleEn} in a distinct tone crafted just for you: may your ambition stay fierce, your vision clear, and your everyday victories undeniable! ${context ? `(Honoring: ${context}) ` : ''}Keep dominating your lane! 🚀✨`,
        },
        {
          id: `w-en-cu1-2`,
          style: 'Bold Originality',
          toneEmoji: '🔥',
          title: 'Standing Apart From the Crowd',
          content: `Dear ${name}, the mold was broken the day you arrived. On this ${meta.titleEn}, embrace your uniqueness and watch how the world aligns with your pace! 🌟🎉`,
        },
        {
          id: `w-en-cu1-3`,
          style: 'Sharp & Memorable',
          toneEmoji: '🪶',
          title: 'To Your Next Epoch',
          content: `${salutation}, may this ${meta.titleEn} be the spark that ignites your most rewarding season yet. Huge congratulations! 🥂💫`,
        },
      ];
    } else if (cycle === 2) {
      results = [
        {
          id: `w-en-cu2-1`,
          style: `${customToneName || 'Signature Edition'}`,
          toneEmoji: '💎',
          title: 'Rare, Bold & Genuine',
          content: `To ${name}: wishing you a spectacular ${meta.titleEn}! In an ordinary world, your authentic vibe is pure gold. ${context ? `(Shoutout: ${context}) ` : ''}May the year ahead bring thrilling breakthroughs and quiet peace in equal measure! 🏔️✨`,
        },
        {
          id: `w-en-cu2-2`,
          style: 'Electric Energy',
          toneEmoji: '⚡',
          title: 'Writing Your Own Script',
          content: `${salutation}, happy ${meta.titleEn}! Continue creating your own rules, charting uncharted territories, and inspiring everyone lucky enough to be in your orbit. 🌟🥂`,
        },
        {
          id: `w-en-cu2-3`,
          style: 'Timeless Resonance',
          toneEmoji: '🪶',
          title: 'A Legacy of Excellence',
          content: `Dearest ${name}, marking this ${meta.titleEn} with the deepest admiration for your grit and heart. Here is to health, abundance, and unwavering joy! 💐🙏`,
        },
      ];
    } else {
      results = [
        {
          id: `w-en-cu0-1`,
          style: `${customToneName || 'Custom Signature'}`,
          toneEmoji: '✍️',
          title: `${customToneName ? `Vibe: ${customToneName}` : 'Custom Crafted Wish'}`,
          content: `${salutation}, on this momentous ${meta.titleEn}, here is a message styled to your exact rhythm: may boundless clarity, dynamic energy, and profound fulfillment walk beside you every single day! ${context ? `Special note: ${context}. ` : ''}Enjoy every second! 🌟🎉`,
        },
        {
          id: `w-en-cu0-2`,
          style: 'Distinct Voice',
          toneEmoji: '💫',
          title: 'An Original Journey',
          content: `Dear ${name}, your individuality is your superpower. As you celebrate this ${meta.titleEn}, take immense pride in who you are and where you are headed. The best chapters await! 🚀✨`,
        },
        {
          id: `w-en-cu0-3`,
          style: 'Bespoke Warmth',
          toneEmoji: '🪶',
          title: 'Unforgettable Moments',
          content: `${salutation}, may your ${meta.titleEn} be overflowing with pure delight, good company, and genuine triumphs! Cheers! 🥂💐`,
        },
      ];
    }
    return applyLoopVariation(results, loop, regenCount);
  }

  if (isRoast) {
    if (cycle === 1) {
      results = [
        {
          id: `w-en-r1-1`,
          style: 'Savage Teasing',
          toneEmoji: '🔥',
          title: 'Still Acting Twelve!',
          content: `${salutation}, happy ${meta.titleEn}! It is truly breathtaking how you manage to increase in age while completely avoiding maturity. ${context ? `Remembering: ${context}! ` : ''}May your hairline stay intact and your joints stay quiet today! 🎂😜`,
        },
        {
          id: `w-en-r1-2`,
          style: 'Hilarious Sarcasm',
          toneEmoji: '🤡',
          title: 'Legendary Disaster',
          content: `Dear ${name}, you are proof that practice does not make perfect, but it does make things wildly entertaining! Happy ${meta.titleEn}! Please don't break anything today! 🍕🥳`,
        },
        {
          id: `w-en-r1-3`,
          style: 'Tough Love',
          toneEmoji: '😈',
          title: 'Patience Award Goes To Me',
          content: `${salutation}, celebrating you today because science hasn't found a cure for your personality yet. Love you anyway! Cheers to surviving another year! 🍻✨`,
        },
      ];
    } else if (cycle === 2) {
      results = [
        {
          id: `w-en-r2-1`,
          style: 'Playful Jab',
          toneEmoji: '🤣',
          title: 'Aging in Reverse? Definitely Not.',
          content: `To ${name}: happy ${meta.titleEn}! May your Wi-Fi be swift, your coffee triple-strength, and your ability to tolerate adulting slightly improved this year! ☕🎉`,
        },
        {
          id: `w-en-r2-2`,
          style: 'Brutal & Loving',
          toneEmoji: '🍕',
          title: 'Here for the Free Food',
          content: `${salutation}, I only showed up for the snacks, but seeing you survive another 365 days of questionable life choices is an added bonus. Cheers, legend! 🥂🔥`,
        },
        {
          id: `w-en-r2-3`,
          style: 'Cheeky Salute',
          toneEmoji: '🎈',
          title: 'Never Grow Up',
          content: `Happy ${meta.titleEn}, ${name}! Growing old is mandatory, but growing up is totally optional—and you have masterfully avoided both! Keep rocking! 🤘✨`,
        },
      ];
    } else {
      results = [
        {
          id: `w-en-r0-1`,
          style: 'Playful Banter',
          toneEmoji: '😈',
          title: 'Aging Like Fine Milk!',
          content: `${salutation}, huge congratulations on ${meta.titleEn}! Another year older, wiser... well, at least older! Don't worry, your secrets are always safe with me (mostly because my memory is failing too). ${context ? `Raising a toast to: ${context}! ` : ''}Now where is the party?! 🍕🥂`,
        },
        {
          id: `w-en-r0-2`,
          style: 'Cheeky Teasing',
          toneEmoji: '😜',
          title: 'Leveling Up with Style',
          content: `Happy ${meta.titleEn}, ${name}! You're like that favorite vintage vinyl—a little scratched, highly dramatic, but still undeniably iconic. Never change your crazy self! Here's to making even more dubious life choices together! 🎉🔥`,
        },
        {
          id: `w-en-r0-3`,
          style: 'Sarcastic & Sweet',
          toneEmoji: '😄',
          title: 'Tolerating You is My Superpower',
          content: `${salutation}, on this ${meta.titleEn}, I wanted to remind you of my unconditional patience for putting up with you. May your coffee be strong, your Wi-Fi swift, and your celebration legendary. Cheers! 🥂🎈`,
        },
      ];
    }
    return applyLoopVariation(results, loop, regenCount);
  }

  if (isRomantic) {
    if (cycle === 1) {
      results = [
        {
          id: `w-en-rom1-1`,
          style: 'Sweet Companionship',
          toneEmoji: '🌹',
          title: 'My Favorite Love Story',
          content: `${salutation}, every love story is beautiful, but ours is my absolute favorite. Celebrating ${meta.titleEn} with you reminds me how lucky I am to share my days with my dream partner. ${context ? `Remembering: ${context}. ` : ''}Happy ${meta.titleEn}, my heart! 💖✨`,
        },
        {
          id: `w-en-rom1-2`,
          style: 'Deep Sanctuary',
          toneEmoji: '🕊️',
          title: 'Home in Your Eyes',
          content: `Dearest ${name}, in your arms, the entire world feels peaceful and safe. On this ${meta.titleEn}, I promise to keep choosing you, admiring you, and holding your hand through every chapter. Forever yours! 🌸💍`,
        },
        {
          id: `w-en-rom1-3`,
          style: 'Lyrical Romance',
          toneEmoji: '✨',
          title: 'A Love Without Measure',
          content: `${salutation}, you are the poetry in my silence and the warmth in every cold day. Happy ${meta.titleEn}! Here's to an eternity of laughter, slow dances, and unconditional devotion. ❤️🥂`,
        },
      ];
    } else if (cycle === 2) {
      results = [
        {
          id: `w-en-rom2-1`,
          style: 'Unconditional Devotion',
          toneEmoji: '💖',
          title: 'My Forever Anchor',
          content: `To my dearest ${name}: ${meta.titleEn} is sweeter because I get to celebrate it by your side. You are the warmth in every cold morning and the peace after every storm. ${context ? `(Always treasuring: ${context}) ` : ''}I love you more than words can hold. 🌹✨`,
        },
        {
          id: `w-en-rom2-2`,
          style: 'Enchanted Harmony',
          toneEmoji: '✨',
          title: 'Magic in the Everyday',
          content: `${salutation}, with you, even quiet coffee moments feel like the grandest adventures. Happy ${meta.titleEn}, my love. Here is to growing older, wiser, and more madly in love with you each day. 🥂🌸`,
        },
        {
          id: `w-en-rom2-3`,
          style: 'Starlit Promise',
          toneEmoji: '🪶',
          title: 'Two Hearts, One Melody',
          content: `Happy ${meta.titleEn}, darling! Every heartbeat whispers how grateful I am for your presence in my life. You are my home, my joy, and my greatest blessing. ❤️💍`,
        },
      ];
    } else {
      results = [
        {
          id: `w-en-rom0-1`,
          style: 'Heartfelt Romance',
          toneEmoji: '🌹',
          title: 'My Whole Heart',
          content: `${salutation}, celebrating ${meta.titleEn} with you is the greatest privilege of my life. You make every ordinary day feel like poetry and every dream feel within reach. ${context ? `Remembering: ${context}. ` : ''}I love you more than words could ever convey. Happy ${meta.titleEn}! 💖✨`,
        },
        {
          id: `w-en-rom0-2`,
          style: 'Tender Devotion',
          toneEmoji: '✨',
          title: 'Forever By Your Side',
          content: `My dearest ${name}, your laughter is my sanctuary and your love is my greatest compass. On this special ${meta.titleEn}, I promise to keep choosing you, loving you, and laughing with you through every chapter ahead. 🌸💍`,
        },
        {
          id: `w-en-rom0-3`,
          style: 'Poetic Love',
          toneEmoji: '🪶',
          title: 'Our Beautiful Constellation',
          content: `Every second spent loving you feels like holding stars, ${name}. May this ${meta.titleEn} wrap you in all the tenderness you shower upon my world. Forever yours, now and always. ❤️🥂`,
        },
      ];
    }
    return applyLoopVariation(results, loop, regenCount);
  }

  if (isFormal) {
    if (cycle === 1) {
      results = [
        {
          id: `w-en-f1-1`,
          style: 'Distinguished Accolades',
          toneEmoji: '🏛️',
          title: 'Highest Regards and Congratulations',
          content: `${salutation}, on this auspicious ${meta.titleEn}, I convey my sincere felicitations. Your steadfast integrity, remarkable diligence, and inspiring vision remain a benchmark of excellence. ${context ? `(Honoring: ${context}) ` : ''}Wishing you enduring success in all future pursuits. 🌟🙏`,
        },
        {
          id: `w-en-f1-2`,
          style: 'Executive Warmth',
          toneEmoji: '🤝',
          title: 'A Benchmark of Leadership',
          content: `${salutation}, warm compliments on marking this milestone. It is a genuine pleasure to work alongside a professional of your caliber. May the journey ahead bring greater accomplishments and fulfillment. 💐✨`,
        },
        {
          id: `w-en-f1-3`,
          style: 'Gracious Tribute',
          toneEmoji: '📜',
          title: 'Honoring Your Dedication',
          content: `${salutation}, sending best wishes on this ${meta.titleEn}. May your continued dedication pave the way for extraordinary triumphs and deep satisfaction. 🌿🏛️`,
        },
      ];
    } else if (cycle === 2) {
      results = [
        {
          id: `w-en-f2-1`,
          style: 'Executive Distinction',
          toneEmoji: '🏛️',
          title: 'With Highest Respect & Felicitations',
          content: `${salutation}, please accept my warmest compliments on the occasion of ${meta.titleEn}. Your integrity, steadfast professionalism, and exemplary leadership set a high standard for us all. ${context ? `(Recognizing: ${context}) ` : ''}May the road ahead be paved with continuous triumphs and fulfillment. 🌟🙏`,
        },
        {
          id: `w-en-f2-2`,
          style: 'Gracious Tribute',
          toneEmoji: '🤝',
          title: 'Honoring Your Dedication',
          content: `Dear ${name}, marking this milestone provides a welcome opportunity to express sincere appreciation for your invaluable contributions. Wishing you and your esteemed family continued prosperity and good health. 💐✨`,
        },
        {
          id: `w-en-f2-3`,
          style: 'Distinguished Regards',
          toneEmoji: '📜',
          title: 'Continued Success & Excellence',
          content: `${salutation}, sending best wishes on this ${meta.titleEn}. May your future endeavors yield extraordinary success and deep satisfaction. Warmest regards. 🌿🏛️`,
        },
      ];
    } else {
      results = [
        {
          id: `w-en-f0-1`,
          style: 'Distinguished & Warm',
          toneEmoji: '👔',
          title: 'Warmest Compliments & Congratulations',
          content: `${salutation}, please accept my sincere congratulations on this momentous ${meta.titleEn}. Your steadfast dedication, integrity, and visionary leadership continue to be an inspiration to everyone around you. ${context ? `Honoring: ${context}. ` : ''}Wishing you continued distinction and triumph. 🌟🏛️`,
        },
        {
          id: `w-en-f0-2`,
          style: 'Professional Warmth',
          toneEmoji: '🤝',
          title: 'Wishing You Continued Distinction',
          content: `${salutation}, on the occasion of ${meta.titleEn}, I extend my warmest regards to you and your family. May this milestone usher in greater fulfillment, robust health, and enduring prosperity in all your endeavors. 💐✨`,
        },
        {
          id: `w-en-f0-3`,
          style: 'Gracious & Dignified',
          toneEmoji: '📜',
          title: 'A Tribute to Excellence',
          content: `${salutation}, marking this ${meta.titleEn} is a celebration of both character and exceptional dedication. It is an honor to collaborate with you. Wishing you abundant success and joyous celebrations ahead. 🌿🙏`,
        },
      ];
    }
    return applyLoopVariation(results, loop, regenCount);
  }

  if (isBlessed) {
    if (cycle === 1) {
      results = [
        {
          id: `w-en-b1-1`,
          style: 'Heavenly Grace',
          toneEmoji: '🕊️',
          title: 'A Path of Light & Peace',
          content: `${salutation}, may the Almighty shower your household with abundant peace, good health, and serenity on this ${meta.titleEn}. May you feel deeply guided and loved every single day. ${context ? `(${context}) ` : ''}Stay blessed. 🌸✨`,
        },
        {
          id: `w-en-b1-2`,
          style: 'Divine Protection',
          toneEmoji: '🙏',
          title: 'Surrounded by Sacred Favor',
          content: `Dear ${name}, praying that this ${meta.titleEn} brings heavenly warmth into your heart. May every storm part before you and every quiet morning bring renewed gratitude. 🌿🤍`,
        },
        {
          id: `w-en-b1-3`,
          style: 'Eternal Grace',
          toneEmoji: '💫',
          title: 'Radiance & Joy',
          content: `${salutation}, may divine grace surround you and your loved ones today and throughout the coming year. Happy ${meta.titleEn}! 🌟🙏`,
        },
      ];
    } else if (cycle === 2) {
      results = [
        {
          id: `w-en-b2-1`,
          style: 'Abundant Grace',
          toneEmoji: '🕊️',
          title: 'Surrounded by Light & Favor',
          content: `${salutation}, on this sacred ${meta.titleEn}, may the Almighty bless you with profound peace, unshakeable faith, and enduring vitality. ${context ? `(${context}) ` : ''}May you walk in confidence knowing goodness and mercy follow you always. 🌸🙏`,
        },
        {
          id: `w-en-b2-2`,
          style: 'Gentle Protection',
          toneEmoji: '🌿',
          title: 'A Shield of Serenity',
          content: `Dearest ${name}, lifting you in prayer on this special day. May every quiet dawn bring renewed gratitude, every challenge reveal divine strength, and your home be filled with harmony. 🤍✨`,
        },
        {
          id: `w-en-b2-3`,
          style: 'Sacred Joy',
          toneEmoji: '💫',
          title: 'Radiance of the Spirit',
          content: `${salutation}, may divine light illuminate your path and fulfill every righteous longing of your heart. Have a blessed and joyful ${meta.titleEn}! 🌟🙏`,
        },
      ];
    } else {
      results = [
        {
          id: `w-en-b0-1`,
          style: 'Spiritual Peace',
          toneEmoji: '🙏',
          title: 'Divine Blessings & Serenity',
          content: `${salutation}, on this blessed ${meta.titleEn}, may the Almighty illuminate your path with divine grace, peace, and abundance. May your heart always feel sheltered by love and your days overflow with gratitude. ${context ? `(${context}) ` : ''}Stay blessed always. 🕊️✨`,
        },
        {
          id: `w-en-b0-2`,
          style: 'Sacred Prayers',
          toneEmoji: '🌿',
          title: 'Light, Health & Protection',
          content: `Dear ${name}, praying that this ${meta.titleEn} brings heavenly joy into your home. May every challenge transform into a stepping stone of wisdom, and may tranquility accompany you wherever you go. 🌸🙏`,
        },
        {
          id: `w-en-b0-3`,
          style: 'Grace & Gratitude',
          toneEmoji: '💫',
          title: 'Surrounded by Heaven’s Favor',
          content: `${salutation}, sending heartfelt prayers for your health, prosperity, and spiritual joy. May the year ahead reflect the beauty of your kind soul and the blessings you so generously share with others. 🌟🤍`,
        },
      ];
    }
    return applyLoopVariation(results, loop, regenCount);
  }

  if (isInspirational) {
    if (cycle === 1) {
      results = [
        {
          id: `w-en-i1-1`,
          style: 'Relentless Ambition',
          toneEmoji: '🔥',
          title: 'The Summit is Calling',
          content: `${salutation}, ${meta.titleEn} is living proof that dedication always conquers doubt! ${context ? `Remembering: ${context}! ` : ''}Keep your sights high and your conviction firm. You are built for greatness! 🏔️✨`,
        },
        {
          id: `w-en-i1-2`,
          style: 'Bold Spark',
          toneEmoji: '⚡',
          title: 'Blaze Your Own Trail',
          content: `To ${name}: you don't wait for doors to open—you build them yourself. On this ${meta.titleEn}, celebrate your grit, your heart, and the extraordinary horizons waiting for you! 🚀🌟`,
        },
        {
          id: `w-en-i1-3`,
          style: 'Visionary Horizon',
          toneEmoji: '🎯',
          title: 'No Limits Ahead',
          content: `${salutation}, may this ${meta.titleEn} remind you of the immense strength inside you. Never let anyone shrink your dream. Keep climbing! 🏆💫`,
        },
      ];
    } else if (cycle === 2) {
      results = [
        {
          id: `w-en-i2-1`,
          style: 'Fierce Determination',
          toneEmoji: '🚀',
          title: 'Architect of Your Destiny',
          content: `${salutation}, ${meta.titleEn} is a powerful testament to what resilience, grit, and belief can build! ${context ? `(Remembering: ${context}) ` : ''}Never dim your light to make others comfortable. Keep scaling mountains! 🔥🏔️`,
        },
        {
          id: `w-en-i2-2`,
          style: 'Champion Mindset',
          toneEmoji: '🏆',
          title: 'Victories Ahead',
          content: `To ${name}: you were never made to follow the beaten path—you were built to blaze new trails. On this ${meta.titleEn}, celebrate how far you’ve come, and charge boldly toward where you are going! ⚡🌟`,
        },
        {
          id: `w-en-i2-3`,
          style: 'Unshakable Courage',
          toneEmoji: '🎯',
          title: 'Eyes on the Prize',
          content: `${salutation}, greatness isn’t luck—it is chosen every single day. Wishing you immense momentum, sharp clarity, and massive victories on this ${meta.titleEn}! 💫🧗`,
        },
      ];
    } else {
      results = [
        {
          id: `w-en-i0-1`,
          style: 'Bold & Empowering',
          toneEmoji: '🚀',
          title: 'Conquer Your Next Horizon',
          content: `${salutation}, ${meta.titleEn} is not just another milestone—it is proof of your relentless courage, resilience, and brilliance! ${context ? `Remembering ${context}—` : ''}keep dreaming audaciously and climbing higher. The summit is yours! 🔥🌟`,
        },
        {
          id: `w-en-i0-2`,
          style: 'Uplifting Drive',
          toneEmoji: '⚡',
          title: 'Unstoppable Momentum',
          content: `To ${name}: you carry within you the sparks that ignite revolutions. On this ${meta.titleEn}, embrace every ounce of your unique power. Your best chapters are still being written! 🏔️✨`,
        },
        {
          id: `w-en-i0-3`,
          style: 'Visionary Triumph',
          toneEmoji: '🎯',
          title: 'Destined for Greatness',
          content: `${salutation}, never let the world dim your ambition. May this ${meta.titleEn} fuel your passion, shatter every glass ceiling, and bring the grandest victories you’ve worked so tirelessly for! 🏆💫`,
        },
      ];
    }
    return applyLoopVariation(results, loop, regenCount);
  }

  if (isShort) {
    if (cycle === 1) {
      results = [
        {
          id: `w-en-s1-1`,
          style: 'Crisp Spark',
          toneEmoji: '⚡',
          title: 'Pure Celebration!',
          content: `Happy ${meta.titleEn}, ${name}! ${context ? `${context}! ` : ''}Wishing you peak energy, immense joy, and continuous wins! 🥂🎉`,
        },
        {
          id: `w-en-s1-2`,
          style: 'Direct & Sunny',
          toneEmoji: '☀️',
          title: 'To Your Happiness',
          content: `${salutation}, may this ${meta.titleEn} bring you everything you’ve been hoping for and more! 🌟🎂`,
        },
        {
          id: `w-en-s1-3`,
          style: 'One-Liner Cheer',
          toneEmoji: '🎯',
          title: 'Rocking Today',
          content: `To ${name}: wishing you a spectacular ${meta.titleEn} filled with great moments and zero stress! 🎈💫`,
        },
      ];
    } else if (cycle === 2) {
      results = [
        {
          id: `w-en-s2-1`,
          style: 'Punchy Spark',
          toneEmoji: '⚡',
          title: 'Huge Vibes!',
          content: `Happy ${meta.titleEn}, ${name}! ${context ? `${context}! ` : ''}Wishing you vibrant health, huge laughs, and unstoppable momentum today! 🥂🚀`,
        },
        {
          id: `w-en-s2-2`,
          style: 'Straight From the Heart',
          toneEmoji: '💖',
          title: 'Simply the Best',
          content: `${salutation}, may your ${meta.titleEn} be packed with genuine smiles and great surprises! 🎉🎂`,
        },
        {
          id: `w-en-s2-3`,
          style: 'Crisp Cheer',
          toneEmoji: '🎯',
          title: 'To Your Wins',
          content: `To ${name} on ${meta.titleEn}: keep shining bright and conquering every goal! 🌟🎈`,
        },
      ];
    } else {
      results = [
        {
          id: `w-en-s0-1`,
          style: 'Short & Crisp',
          toneEmoji: '⚡',
          title: 'Cheers to You!',
          content: `Happy ${meta.titleEn}, ${name}! ${context ? `${context}! ` : ''}Wishing you endless laughter, great health, and zero stress today and always! 🥂✨`,
        },
        {
          id: `w-en-s0-2`,
          style: 'Punchy Wish',
          toneEmoji: '🎯',
          title: 'Pure Good Vibes',
          content: `${salutation}, happy ${meta.titleEn}! May your day be as remarkable, fun, and bright as you are! 🎉🎈`,
        },
        {
          id: `w-en-s0-3`,
          style: 'One-Liner Warmth',
          toneEmoji: '💫',
          title: 'Big Celebrations',
          content: `To ${name} on your ${meta.titleEn}: keep shining, keep smiling, and make today completely unforgettable! 🌟🎂`,
        },
      ];
    }
    return applyLoopVariation(results, loop, regenCount);
  }

  // Default English (3 Diverse Rotation Cycles)
  if (cycle === 1) {
    results = [
      {
        id: `w-en-c1-1`,
        style: 'Joyful & Grateful',
        toneEmoji: '🌟',
        title: 'Every Reason to Smile',
        content: `${salutation}, on this ${meta.titleEn}, I'm pausing to celebrate the incredible energy and kindness you share so freely. May the upcoming days bring unexpected joys, big victories, and peaceful evenings. ${context ? `Special cheers to: ${context}! ` : ''}Keep making the world brighter! 🌿✨`,
      },
      {
        id: `w-en-c1-2`,
        style: 'Clever & Spirited',
        toneEmoji: '🎉',
        title: 'Another Masterpiece in the Making',
        content: `Happy ${meta.titleEn}, ${name}! The world tried to keep up with you this year and completely failed. May your day be drama-free, your celebrations legendary, and your smile permanent! Let's raise a glass! 🥂🥳`,
      },
      {
        id: `w-en-c1-3`,
        style: 'Soulful & Visionary',
        toneEmoji: '🪶',
        title: 'Whispers of the Horizon',
        content: `To ${name}: may the winds of grace always fill your sails. As you mark this ${meta.titleEn}, look back with pride and look forward with unshakeable courage. The best chapters are rushing to meet you! 🏔️💫`,
      },
    ];
  } else if (cycle === 2) {
    results = [
      {
        id: `w-en-c2-1`,
        style: 'Deep Admiration',
        toneEmoji: '💖',
        title: 'A Heart of Pure Gold',
        content: `Dearest ${name}, some people make the world noticeably warmer just by being in it—and you are one of them. Happy ${meta.titleEn}! May all the love, generosity, and joy you give to others return to you tenfold today! 🌸🌿`,
      },
      {
        id: `w-en-c2-2`,
        style: 'High-Energy Banter',
        toneEmoji: '🚀',
        title: 'Warning: Extremely Legendary',
        content: `Drop everything because it's ${name}'s ${meta.titleEn}! If life is an adventure, you are definitely the main character with the best soundtrack. Wishing you a celebration as wild and memorable as our best stories! 🎂🔥`,
      },
      {
        id: `w-en-c2-3`,
        style: 'Timeless Wisdom',
        toneEmoji: '🪶',
        title: 'The Poetry of Today',
        content: `Time is measured not merely by years, but by the moments that take our breath away, ${name}. As you mark this ${meta.titleEn}, may your heart remain fearless and your spirit untamed. Happy celebrations! 💫🌟`,
      },
    ];
  } else {
    results = [
      {
        id: `w-en-c0-1`,
        style: 'Heartfelt & Warm',
        toneEmoji: '💖',
        title: `Warmest ${meta.titleEn} Wishes`,
        content: `${salutation}, on this special ${meta.titleEn}, I want you to know how truly treasured you are. May your journey ahead be blessed with vibrant health, peace of mind, and reasons to smile every single day. ${context ? `Special shoutout to: ${context}! ` : ''}You bring so much light into our lives! ✨🌿`,
      },
      {
        id: `w-en-c0-2`,
        style: 'Witty & Fun',
        toneEmoji: '😄',
        title: 'Cheers to Leveling Up!',
        content: `Happy ${meta.titleEn}, ${name}! Like a classic playlist or vintage wine, you only get better (and livelier) with time! Wishing you zero stress, extra treats, and celebrations as legendary as you are. Let the good times roll! 🥂🎉`,
      },
      {
        id: `w-en-c0-3`,
        style: 'Poetic & Expressive',
        toneEmoji: '🪶',
        title: 'A Tapestry of Wonder',
        content: `May every step you take unfold into wonder, ${name}. As you mark this ${meta.titleEn}, may the horizon whisper promises of triumph, love, and courage. Keep shining with that untamed brilliance that inspires everyone around you. 🌟💫`,
      },
    ];
  }

  return applyLoopVariation(results, loop, regenCount);
}
