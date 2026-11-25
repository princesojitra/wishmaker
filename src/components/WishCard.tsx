import React, { useState } from 'react';
import { Copy, Check, MessageCircle, Heart, Edit3 } from 'lucide-react';
import { Wish, Language } from '../types/wish';

interface WishCardProps {
  wish: Wish;
  index: number;
  language: Language;
  onCopy: (text: string) => void;
  onShareWhatsApp: (text: string) => void;
}

const CARD_STYLES = [
  {
    // Peach / Amber Tint
    heartColor: 'text-[#FB923C] fill-[#FB923C] dark:text-amber-400 dark:fill-amber-400',
    bgTint:
      'bg-[#FFFBF5] dark:bg-[#20150e] border-[#FED7AA]/80 dark:border-amber-600/30 shadow-xs dark:shadow-[0_0_24px_rgba(245,158,11,0.06)]',
    hoverBorder: 'hover:border-[#FDBA74] dark:hover:border-amber-500/60',
    titleColor: 'text-zinc-900 dark:text-amber-100',
    actionBtn:
      'dark:border-amber-800/40 dark:bg-amber-950/60 dark:text-amber-200 dark:hover:bg-amber-900/60 dark:hover:text-white',
    footerBorder: 'border-amber-200/50 dark:border-amber-900/30',
  },
  {
    // Sky Blue Tint
    heartColor: 'text-[#38BDF8] fill-[#38BDF8] dark:text-sky-400 dark:fill-sky-400',
    bgTint:
      'bg-[#F0F9FF] dark:bg-[#0c1928] border-[#BAE6FD]/80 dark:border-sky-500/30 shadow-xs dark:shadow-[0_0_24px_rgba(56,189,248,0.06)]',
    hoverBorder: 'hover:border-[#7DD3FC] dark:hover:border-sky-400/60',
    titleColor: 'text-zinc-900 dark:text-sky-100',
    actionBtn:
      'dark:border-sky-800/40 dark:bg-sky-950/60 dark:text-sky-200 dark:hover:bg-sky-900/60 dark:hover:text-white',
    footerBorder: 'border-sky-200/50 dark:border-sky-900/30',
  },
  {
    // Lilac / Purple Tint
    heartColor: 'text-[#C084FC] fill-[#C084FC] dark:text-purple-400 dark:fill-purple-400',
    bgTint:
      'bg-[#FAF5FF] dark:bg-[#1a122a] border-[#E9D5FF]/80 dark:border-purple-500/30 shadow-xs dark:shadow-[0_0_24px_rgba(192,132,252,0.06)]',
    hoverBorder: 'hover:border-[#D8B4FE] dark:hover:border-purple-400/60',
    titleColor: 'text-zinc-900 dark:text-purple-100',
    actionBtn:
      'dark:border-purple-800/40 dark:bg-purple-950/60 dark:text-purple-200 dark:hover:bg-purple-900/60 dark:hover:text-white',
    footerBorder: 'border-purple-200/50 dark:border-purple-900/30',
  },
];

export const WishCard: React.FC<WishCardProps> = ({
  wish,
  index,
  language,
  onCopy,
  onShareWhatsApp,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(wish.content);

  const style = CARD_STYLES[index % CARD_STYLES.length];

  const handleCopy = () => {
    onCopy(editedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    onShareWhatsApp(editedContent);
  };

  const handleReset = () => {
    setEditedContent(wish.content);
    setIsEditing(false);
  };

  const langClass =
    language === 'hi' ? 'font-hindi' : language === 'gu' ? 'font-gujarati' : 'font-sans';

  return (
    <div
      className={`rounded-2xl p-5 border transition-all duration-150 flex flex-col justify-between h-full select-none ${style.bgTint} ${style.hoverBorder}`}
    >
      <div className="space-y-3 flex-1 flex flex-col">
        {/* Top Header Row: Heart Icon on left, Quick Actions on right */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className={`w-5 h-5 ${style.heartColor}`} />
          </div>

          <div className="flex items-center gap-1.5">
            {/* Edit Button */}
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              title={isEditing ? 'Done editing' : 'Edit text'}
              className={`flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-white/90 text-zinc-500 hover:text-zinc-950 hover:bg-white transition-colors cursor-pointer shadow-2xs ${style.actionBtn}`}
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              title="Copy wish"
              className={`flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-white/90 text-zinc-600 hover:text-zinc-950 hover:bg-white transition-colors cursor-pointer shadow-2xs ${style.actionBtn}`}
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            {/* WhatsApp Share Button */}
            <button
              type="button"
              onClick={handleWhatsApp}
              title="Share on WhatsApp"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-200/80 bg-white/90 text-[#25D366] hover:bg-emerald-50 dark:border-emerald-800/40 dark:bg-emerald-950/60 dark:text-[#25D366] dark:hover:bg-emerald-900/50 transition-colors cursor-pointer shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 fill-[#25D366]/10" />
            </button>
          </div>
        </div>

        {/* Wish Title */}
        <h3 className={`text-sm sm:text-base font-bold ${style.titleColor} tracking-tight`}>
          {wish.title}
        </h3>

        {/* Wish Content Body */}
        <div className="flex-1 flex flex-col">
          {isEditing ? (
            <div className="space-y-2 pt-1 flex-1 flex flex-col justify-between">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full flex-1 min-h-[140px] rounded-xl border border-zinc-300 bg-white p-3 text-xs sm:text-sm text-zinc-900 focus-visible:outline-none focus-visible:border-violet-600 focus-visible:ring-1 focus-visible:ring-violet-600/20 dark:border-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-100 resize-none"
                rows={5}
                autoFocus
              />
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-700 transition-colors cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>
          ) : (
            <p className={`text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed ${langClass}`}>
              {editedContent}
            </p>
          )}
        </div>
      </div>

      {/* Subtle Footer */}
      <div
        className={`pt-3.5 mt-3 border-t flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-400 font-medium ${style.footerBorder}`}
      >
        <span>{editedContent.length} chars</span>
        <span className="capitalize">{wish.style || 'Heartfelt'}</span>
      </div>
    </div>
  );
};
