import { Occasion } from '../types/wish';

export const OCCASIONS: Occasion[] = [
  {
    id: 'birthday',
    title: 'Birthday',
    titleHi: 'जन्मदिन',
    titleGu: 'જન્મદિવસ',
    icon: '🎂',
    description: 'Celebrate another year of life & joy',
    tag: 'Celebration',
    popular: true,
  },
  {
    id: 'festival',
    title: 'Diwali & Festivals',
    titleHi: 'दिवाली व त्योहार',
    titleGu: 'દિવાળી અને તહેવારો',
    icon: '🪔',
    description: 'Warm blessings of light & prosperity',
    tag: 'Cultural',
    popular: true,
  },
  {
    id: 'anniversary',
    title: 'Anniversary',
    titleHi: 'सालगिरह',
    titleGu: 'લગ્નતિથિ',
    icon: '🥂',
    description: 'Honor enduring love & togetherness',
    tag: 'Milestone',
    popular: true,
  },
  {
    id: 'wedding',
    title: 'Wedding',
    titleHi: 'विवाह',
    titleGu: 'લગ્ન પ્રસંગ',
    icon: '💍',
    description: 'Blessings for the newly-weds',
    tag: 'Celebration',
  },
  {
    id: 'promotion',
    title: 'Success & Promotion',
    titleHi: 'पदोन्नति व सफलता',
    titleGu: 'પ્રગતિ અને સફળતા',
    icon: '🚀',
    description: 'Applaud hard work & breakthroughs',
    tag: 'Career',
  },
  {
    id: 'new_year',
    title: 'New Year',
    titleHi: 'नया साल',
    titleGu: 'નવું વર્ષ / સાલ મુબારક',
    icon: '✨',
    description: 'Fresh beginnings & prosperous days',
    tag: 'Seasonal',
  },
  {
    id: 'friendship',
    title: 'Friendship & Love',
    titleHi: 'दोस्ती व स्नेह',
    titleGu: 'મિત્રતા અને સ્નેહ',
    icon: '💛',
    description: 'Remind them how much they matter',
    tag: 'Personal',
  },
  {
    id: 'gratitude',
    title: 'Gratitude & Thanks',
    titleHi: 'आभार व धन्यवाद',
    titleGu: 'આભાર અને કૃતજ્ઞતા',
    icon: '🙏',
    description: 'Heartfelt thanks for kindness & support',
    tag: 'Heartfelt',
  },
];

export const RELATIONSHIPS = [
  { id: 'friend', label: 'Friend / Buddy', labelHi: 'मित्र', labelGu: 'મિત્ર' },
  { id: 'best_friend', label: 'Best Friend', labelHi: 'घनिष्ठ मित्र', labelGu: 'પાક્કો ભાઈબંધ / બહેનપણી' },
  { id: 'partner', label: 'Partner / Spouse', labelHi: 'जीवनसाथी', labelGu: 'જીવનસાથી' },
  { id: 'parents', label: 'Parents / Elders', labelHi: 'माता-पिता / बड़े', labelGu: 'માતા-પિતા / વડીલ' },
  { id: 'sibling', label: 'Brother / Sister', labelHi: 'भाई / बहन', labelGu: 'ભાઈ / બહેન' },
  { id: 'colleague', label: 'Colleague / Boss', labelHi: 'सहकर्मी / बॉस', labelGu: 'સહકર્મી / બોસ' },
  { id: 'mentor', label: 'Mentor / Teacher', labelHi: 'गुरु / शिक्षक', labelGu: 'ગુરુ / શિક્ષક' },
  { id: 'general', label: 'Anyone Special', labelHi: 'विशेष व्यक्ति', labelGu: 'ખાસ વ્યક્તિ' },
];

export const TONES = [
  {
    id: 'heartfelt' as const,
    label: 'Heartfelt',
    emoji: '💖',
    description: 'Warm, emotional & genuinely touching',
  },
  {
    id: 'witty' as const,
    label: 'Witty & Fun',
    emoji: '😄',
    description: 'Playful banter, clever jokes & high energy',
  },
  {
    id: 'poetic' as const,
    label: 'Poetic / Shayari',
    emoji: '🪶',
    description: 'Lyrical depth, metaphors & classic rhythm',
  },
  {
    id: 'formal' as const,
    label: 'Formal & Respectful',
    emoji: '👔',
    description: 'Polite, professional & dignified warmth',
  },
  {
    id: 'short' as const,
    label: 'Short & Punchy',
    emoji: '⚡',
    description: 'Crisp one-liners perfect for quick chats',
  },
];

export const LANGUAGES = [
  { id: 'en' as const, label: 'English', native: 'English', flag: '🇬🇧' },
  { id: 'hi' as const, label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { id: 'gu' as const, label: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
];
