import React from 'react';
import { RefreshCw } from 'lucide-react';
import { WishCard } from './WishCard';
import { Wish, Language } from '../types/wish';

interface WishResultsProps {
  wishes: Wish[];
  recipientName: string;
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
  return (
    <section className="space-y-4 pt-4 animate-fade-in">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3 dark:border-zinc-800">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {language === 'hi'
              ? `${recipientName} के लिए शुभकामनाएं`
              : language === 'gu'
              ? `${recipientName} માટે શુભેચ્છાઓ`
              : `Wishes for ${recipientName}`}
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Select a style to copy or share directly to WhatsApp.
          </p>
        </div>

        <button
          type="button"
          onClick={onRegenerate}
          className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Regenerate</span>
        </button>
      </div>

      {/* 3 Cards Grid */}
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
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
