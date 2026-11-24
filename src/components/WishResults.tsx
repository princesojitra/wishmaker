import React from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
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
    <section className="space-y-6 pt-4 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-festive-200/80 pb-4 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground">
              {language === 'hi'
                ? `${recipientName} के लिए 3 खास शुभकामनाएं`
                : language === 'gu'
                ? `${recipientName} માટે 3 સુંદર શુભેચ્છાઓ`
                : `3 Unique Wishes for ${recipientName}`}
            </h3>
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Choose your favorite style, tweak if needed, and share directly to WhatsApp or clipboard.
          </p>
        </div>

        {/* Source Badge & Regenerate */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-festive-100 px-3 py-1 text-xs font-medium text-festive-800 dark:bg-festive-950 dark:text-festive-300">
            <Sparkles className="w-3.5 h-3.5 text-festive-600" />
            <span>AI Personalized</span>
          </span>

          <button
            type="button"
            onClick={onRegenerate}
            className="flex items-center gap-1 rounded-xl border border-festive-200 bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-festive-50 hover:text-foreground transition-all dark:bg-slate-800 dark:border-slate-700"
            title="Generate new variations"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Regenerate</span>
          </button>
        </div>
      </div>

      {/* 3 Cards Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
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
