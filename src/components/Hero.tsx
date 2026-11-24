import React from 'react';
import { Language } from '../types/wish';

interface HeroProps {
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const titles = {
    en: {
      tag: 'AI-Powered Greeting Studio',
      main: 'Thoughtful greetings, composed in seconds.',
      sub: 'Generate personalized wishes with distinct tones in English, Hindi, and Gujarati. Ready for WhatsApp or cards.',
    },
    hi: {
      tag: 'एआई ग्रीटिंग स्टूडियो',
      main: 'हर खास मौके के लिए दिल से निकले खूबसूरत शब्द।',
      sub: 'अंग्रेजी, हिन्दी और गुजराती में पाएं आत्मीय व शायराना शुभकामनाएं।',
    },
    gu: {
      tag: 'AI ગ્રીટિંગ સ્ટુડિયો',
      main: 'લાગણીસભર અને સ્નેહપૂર્ણ શુભેચ્છાઓ, એક ક્ષણમાં।',
      sub: 'ગુજરાતી, હિન્દી અને અંગ્રેજીમાં મેળવો સ્નેહપૂર્ણ અને કાવ્યાત્મક શુભેચ્છાઓ.',
    },
  };

  const text = titles[language] || titles.en;

  return (
    <section className="pt-8 pb-6 sm:pt-12 sm:pb-8 text-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Subtle pill */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 mb-4">
          <span className="flex h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
          <span>{text.tag}</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight mb-3">
          {text.main}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg mx-auto">
          {text.sub}
        </p>
      </div>
    </section>
  );
};
