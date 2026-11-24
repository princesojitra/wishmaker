import React from 'react';
import { Sparkles, Heart, Share2, Globe2 } from 'lucide-react';
import { Language } from '../types/wish';

interface HeroProps {
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const titles = {
    en: {
      tag: 'AI-Powered Greeting Generator',
      main: 'Celebrate Every Moment with Words That Matter',
      sub: 'Generate bespoke, culturally resonant wishes in English, Hindi, and Gujarati. Tailored with warmth, humor, or poetic charm in seconds.',
    },
    hi: {
      tag: 'एआई-संचालित शुभकामना जनरेटर',
      main: 'हर खास मौके को बनाएं यादगार, दिल से निकले शब्दों के साथ',
      sub: 'अंग्रेजी, हिन्दी और गुजराती में पाएं आत्मीय, मस्ती भरी और शायराना शुभकामनाएं। सीधे व्हाट्सएप पर साझा करें।',
    },
    gu: {
      tag: 'AI આધારિત શુભેચ્છા જનરેટર',
      main: 'દરેક ખાસ પળને બનાવો યાદગાર, અંતરના લાગણીસભર શબ્દો સાથે',
      sub: 'ગુજરાતી, હિન્દી અને અંગ્રેજીમાં મેળવો સ્નેહપૂર્ણ, રમુજી અને કાવ્યાત્મક શુભેચ્છાઓ એક ક્લિકમાં.',
    },
  };

  const text = titles[language] || titles.en;

  return (
    <section className="relative overflow-hidden pt-8 pb-6 sm:pt-12 sm:pb-8 text-center">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-festive-300/30 via-rose-300/20 to-amber-200/30 blur-3xl dark:from-festive-900/20 dark:via-rose-950/20 dark:to-amber-900/10"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Decorative Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-festive-200/80 bg-festive-50/80 px-3.5 py-1 text-xs font-semibold text-festive-800 shadow-xs backdrop-blur-sm dark:bg-festive-950/80 dark:border-festive-800 dark:text-festive-300 mb-4 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-festive-500" />
          <span>{text.tag}</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.18] sm:leading-[1.15] mb-4">
          {text.main}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
          {text.sub}
        </p>

        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5 font-medium">
            <Heart className="h-4 w-4 text-rose-500" />
            <span>3 Unique Perspectives</span>
          </div>
          <span className="text-festive-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 font-medium">
            <Globe2 className="h-4 w-4 text-amber-500" />
            <span>English • हिन्दी • ગુજરાતી</span>
          </div>
          <span className="text-festive-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 font-medium">
            <Share2 className="h-4 w-4 text-emerald-500" />
            <span>1-Tap WhatsApp Share</span>
          </div>
        </div>
      </div>
    </section>
  );
};
