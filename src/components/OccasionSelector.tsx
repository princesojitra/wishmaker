import React from 'react';
import { X } from 'lucide-react';
import { OCCASIONS } from '../data/occasions';
import { Language } from '../types/wish';
import { Input } from './ui/input';

interface OccasionSelectorProps {
  selectedOccasion: string;
  onSelectOccasion: (id: string) => void;
  customOccasionText?: string;
  onCustomOccasionChange?: (text: string) => void;
  language: Language;
}

export const OccasionSelector: React.FC<OccasionSelectorProps> = ({
  selectedOccasion,
  onSelectOccasion,
  customOccasionText = '',
  onCustomOccasionChange,
  language,
}) => {
  const getLocalizedTitle = (occ: typeof OCCASIONS[0]) => {
    if (language === 'hi') return occ.titleHi;
    if (language === 'gu') return occ.titleGu;
    return occ.title;
  };

  const labels = {
    en: {
      label: 'Occasion',
      customPlaceholder: 'What are you celebrating? (e.g. Housewarming, Marathon, Pet adoption...)',
      customLabel: 'Custom Event',
    },
    hi: {
      label: 'अवसर',
      customPlaceholder: 'आप क्या मना रहे हैं? (उदा. गृह प्रवेश, मैराथन, नई कार...)',
      customLabel: 'अन्य अवसर',
    },
    gu: {
      label: 'અવસર',
      customPlaceholder: 'તમે શું ઉજવી રહ્યા છો? (દા.ત. ગૃહ પ્રવેશ, મેરેથોન, નવી કાર...)',
      customLabel: 'અન્ય પ્રસંગ',
    },
  };

  const t = labels[language] || labels.en;
  const primaryOccasions = OCCASIONS.filter((o) => o.id !== 'custom').slice(0, 8);
  const isCustomActive = selectedOccasion === 'custom';

  return (
    <div className="space-y-3">
      {/* Prominent Bold Occasion Label */}
      <label className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 block">
        {t.label}
      </label>

      {/* Symmetrical Occasion Tiles Grid: 3x3 on Desktop, 2-col on Mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
        {primaryOccasions.map((occ) => {
          const isSelected = selectedOccasion === occ.id;
          return (
            <button
              key={occ.id}
              type="button"
              onClick={() => onSelectOccasion(occ.id)}
              className={`flex items-center gap-2.5 px-3 sm:px-3.5 h-11 sm:h-12 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer select-none text-left border ${
                isSelected
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-500/25 ring-2 ring-violet-400/30 transform -translate-y-0.5'
                  : 'bg-zinc-50/80 hover:bg-zinc-100/90 text-zinc-800 border-zinc-200/80 hover:border-zinc-300 dark:bg-zinc-900/60 dark:text-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800/80'
              }`}
            >
              <span className="text-base shrink-0 leading-none">{occ.icon}</span>
              <span className="truncate flex-1">{getLocalizedTitle(occ)}</span>
            </button>
          );
        })}

        {/* 9th Tile: Custom Celebration (Spans 2 cols on mobile, 1 col on desktop for perfect 3x3) */}
        <button
          type="button"
          onClick={() => onSelectOccasion('custom')}
          className={`col-span-2 sm:col-span-1 flex items-center gap-2.5 px-3 sm:px-3.5 h-11 sm:h-12 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer select-none text-left border ${
            isCustomActive
              ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-500/25 ring-2 ring-violet-400/30 transform -translate-y-0.5'
              : 'bg-zinc-50/80 hover:bg-zinc-100/90 text-zinc-800 border-zinc-200/80 hover:border-zinc-300 dark:bg-zinc-900/60 dark:text-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800/80'
          }`}
        >
          <span className="text-base shrink-0 leading-none">✍️</span>
          <span className="truncate flex-1">
            {customOccasionText && isCustomActive ? customOccasionText : t.customLabel}
          </span>
        </button>
      </div>

      {/* In-place Custom Occasion Input */}
      {isCustomActive && (
        <div className="pt-2 animate-fade-in">
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-zinc-400 text-sm">✍️</span>
            <Input
              type="text"
              placeholder={t.customPlaceholder}
              value={customOccasionText}
              onChange={(e) => onCustomOccasionChange?.(e.target.value)}
              className="h-12 pl-10 pr-10 rounded-xl text-sm sm:text-base border-zinc-200/90 bg-zinc-50/60 hover:bg-white focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 dark:bg-zinc-900/80 dark:border-zinc-700/80 transition-all"
              maxLength={60}
              autoFocus
            />
            {customOccasionText && (
              <button
                type="button"
                onClick={() => onCustomOccasionChange?.('')}
                className="absolute right-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 cursor-pointer"
                title="Clear text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
