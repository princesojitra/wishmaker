import React from 'react';
import { Sparkles, Languages, MessageCircle } from 'lucide-react';
import { Language } from '../types/wish';

interface HeroProps {
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const content = {
    en: {
      badge: 'Multilingual AI Greeting Studio',
      headingPre: 'Make Every',
      headingAccent: 'Wish',
      headingPost: 'Feel Special.',
      sub: "Create personalized, heartfelt wishes for birthdays, anniversaries, festivals and life's special moments — in English, Hindi & Gujarati.",
      trust1: 'Personalized & Nuanced',
      trust2: '3 Indian Languages',
      trust3: 'Instant WhatsApp Share',
    },
    hi: {
      badge: 'बहुभाषी एआई शुभकामना स्टूडियो',
      headingPre: 'हर',
      headingAccent: 'शुभकामना',
      headingPost: 'बने बेहद खास।',
      sub: 'जन्मदिन, सालगिरह और पावन त्योहारों के लिए दिल को छू लेने वाले व्यक्तिगत संदेश — हिंदी, गुजराती और अंग्रेज़ी में।',
      trust1: 'आत्मीय व निजी भाव',
      trust2: 'तीन भाषाएं',
      trust3: 'व्हाट्सएप पर तुरंत शेयर',
    },
    gu: {
      badge: 'બહુભાષી AI શુભેચ્છા સ્ટુડિયો',
      headingPre: 'દરેક',
      headingAccent: 'શુભેચ્છા',
      headingPost: 'બને યાદગાર.',
      sub: 'જન્મદિવસ, લગ્નતિથિ અને પાવન તહેવારો માટે હૃદયસ્પર્શી શુભેચ્છાઓ — ગુજરાતી, હિન્દી અને અંગ્રેજીમાં.',
      trust1: 'સ્નેહસભર અને આત્મીય',
      trust2: 'ત્રણ ભાષાઓ',
      trust3: 'વોટ્સએપ પર તુરંત શેર',
    },
  };

  const t = content[language] || content.en;

  return (
    <section className="pt-6 pb-4 text-center space-y-4">
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-200/80 bg-violet-50/80 px-3.5 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300 shadow-2xs">
        <Sparkles className="h-3.5 w-3.5 text-violet-500 animate-pulse" />
        <span>{t.badge}</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.15] max-w-2xl mx-auto">
        {t.headingPre}{' '}
        <span className="font-serif italic text-pink-600 dark:text-pink-400 font-normal">
          {t.headingAccent}
        </span>{' '}
        {t.headingPost}
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl mx-auto px-2">
        {t.sub}
      </p>

      {/* Redesigned Premium Feature Highlight Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2">
        {/* Chip 1: Personalized & Nuanced */}
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/85 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 shadow-2xs backdrop-blur-xs hover:border-violet-300 dark:border-violet-900/50 dark:bg-zinc-900/70 dark:text-zinc-200 transition-all select-none">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400">
            <Sparkles className="h-3 w-3" />
          </span>
          <span>{t.trust1}</span>
        </div>

        {/* Chip 2: 3 Indian Languages */}
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/85 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 shadow-2xs backdrop-blur-xs hover:border-sky-300 dark:border-sky-900/50 dark:bg-zinc-900/70 dark:text-zinc-200 transition-all select-none">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400">
            <Languages className="h-3 w-3" />
          </span>
          <span>{t.trust2}</span>
        </div>

        {/* Chip 3: Instant WhatsApp Share */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/85 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 shadow-2xs backdrop-blur-xs hover:border-emerald-300 dark:border-emerald-900/50 dark:bg-zinc-900/70 dark:text-zinc-200 transition-all select-none">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
            <MessageCircle className="h-3 w-3 fill-current/10" />
          </span>
          <span>{t.trust3}</span>
        </div>
      </div>
    </section>
  );
};
