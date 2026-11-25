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
    <section className="space-y-5 animate-fade-in py-2 w-full">
      {/* Top Header Bar: Title on Leading (Left), Regenerate on Trailing (Right) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200/70 dark:border-zinc-800">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            {t.subtitle}
          </p>
        </div>

        {/* Trailing Regenerate Button */}
        <button
          type="button"
          onClick={onRegenerate}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300/90 bg-white px-5 py-2 text-xs sm:text-sm font-semibold text-zinc-800 hover:bg-zinc-50 hover:text-zinc-950 transition-colors dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer shadow-2xs shrink-0 self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t.regenBtn}</span>
        </button>
      </div>

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 lg:gap-5 items-stretch">
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
