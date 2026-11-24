import React from 'react';
import { OCCASIONS } from '../data/occasions';
import { Language } from '../types/wish';

interface OccasionSelectorProps {
  selectedOccasion: string;
  onSelectOccasion: (id: string) => void;
  language: Language;
}

export const OccasionSelector: React.FC<OccasionSelectorProps> = ({
  selectedOccasion,
  onSelectOccasion,
  language,
}) => {
  const getLocalizedTitle = (occ: typeof OCCASIONS[0]) => {
    if (language === 'hi') return occ.titleHi;
    if (language === 'gu') return occ.titleGu;
    return occ.title;
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {language === 'hi'
            ? '1. अवसर चुनें'
            : language === 'gu'
            ? '1. અવસર પસંદ કરો'
            : '1. Select Occasion'}
        </label>
        <span className="text-xs text-zinc-400">Choose one</span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
        {OCCASIONS.map((occ) => {
          const isSelected = selectedOccasion === occ.id;
          return (
            <button
              key={occ.id}
              type="button"
              onClick={() => onSelectOccasion(occ.id)}
              className={`flex items-center gap-2.5 rounded-lg p-2.5 text-left border transition-all duration-150 outline-none ${
                isSelected
                  ? 'border-zinc-900 bg-zinc-50 text-zinc-950 ring-1 ring-zinc-900 shadow-xs dark:border-zinc-100 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-100'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <span className="text-lg shrink-0">{occ.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-medium truncate">
                  {getLocalizedTitle(occ)}
                </p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                  {occ.tag}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
