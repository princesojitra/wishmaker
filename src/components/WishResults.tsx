import React from 'react';
import { RefreshCw } from 'lucide-react';
import { WishCard } from './WishCard';
import { Wish, Language } from '../types/wish';

interface WishResultsProps {
  wishes: Wish[];
  recipientName: string;
  occasion?: string;
  language: Language;
  onCopy: (text: string) => void;
  onShareWhatsApp: (text: string) => void;
  onRegenerate: () => void;
}

export const WishResults: React.FC<WishResultsProps> = ({
  wishes,
  recipientName,
  language,
  onCopy,
  onShareWhatsApp,
  onRegenerate,
}) => {
  const titles = {
    en: {
      title: 'Here are your personalized wishes ✨',
      subtitle: `Three unique crafted messages for ${recipientName || 'your loved one'}`,
      regenBtn: 'Regenerate',
    },
    hi: {
      title: 'आपकी खास शुभकामनाएं तैयार हैं ✨',
      subtitle: `${recipientName || 'आपके प्रिय'} के लिए 3 मनभावन संदेश`,
      regenBtn: 'पुनः नया बनाएं',
    },
    gu: {
      title: 'તમારી ખાસ શુભેચ્છાઓ તૈયાર છે ✨',
      subtitle: `${recipientName || 'તમારા સ્નેહી'} માટે 3 અનોખા સંદેશા`,
      regenBtn: 'નવા વિકલ્પો બનાવો',
    },
  };

  const t = titles[language] || titles.en;

  return (
    <section className="space-y-5 animate-fade-in pt-1 pb-0 w-full">
      {/* Top Header Bar: Title on Left, Regenerate on Right (Across All Screen Sizes) */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-200/70 dark:border-zinc-800">
        <div className="space-y-0.5 min-w-0 flex-1">
          <h2 className="text-lg sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 truncate sm:whitespace-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Trailing Regenerate Button - Stays Trailing on Both Mobile & Desktop */}
        <button
          type="button"
          onClick={onRegenerate}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-300/90 bg-white px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-zinc-800 hover:bg-zinc-50 hover:text-zinc-950 transition-colors dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer shadow-2xs shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t.regenBtn}</span>
        </button>
      </div>

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-stretch">
        {wishes.map((wish, index) => (
          <WishCard
            key={wish.id || index}
            wish={wish}
            index={index}
            language={language}
            onCopy={onCopy}
            onShareWhatsApp={onShareWhatsApp}
          />
        ))}
      </div>
    </section>
  );
};
