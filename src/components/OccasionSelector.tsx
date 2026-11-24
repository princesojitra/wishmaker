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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-festive-100 text-[11px] font-bold text-festive-700">
            1
          </span>
          <span>
            {language === 'hi'
              ? 'अवसर चुनें (Select Occasion)'
              : language === 'gu'
              ? 'અવસર પસંદ કરો (Select Occasion)'
              : 'Choose the Occasion'}
          </span>
        </label>
        <span className="text-xs text-muted-foreground">Tap to select</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
        {OCCASIONS.map((occ) => {
          const isSelected = selectedOccasion === occ.id;
          return (
            <button
              key={occ.id}
              type="button"
              onClick={() => onSelectOccasion(occ.id)}
              className={`group relative flex flex-col items-start rounded-2xl p-3.5 text-left transition-all duration-200 outline-none ${
                isSelected
                  ? 'border-2 border-festive-500 bg-festive-50/90 shadow-md shadow-festive-500/10 dark:bg-festive-950/40 dark:border-festive-500 scale-[1.02]'
                  : 'border border-festive-200/80 bg-white/80 hover:border-festive-300 hover:bg-festive-50/40 hover:shadow-xs dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-slate-700'
              }`}
            >
              {/* Top row: Emoji & Popular badge */}
              <div className="flex w-full items-center justify-between mb-2">
                <span className="text-2xl transition-transform duration-200 group-hover:scale-110">
                  {occ.icon}
                </span>
                {occ.popular && (
                  <span className="rounded-full bg-amber-100/90 px-1.5 py-0.5 text-[10px] font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    Popular
                  </span>
                )}
              </div>

              {/* Title */}
              <span className={`text-sm font-semibold tracking-tight ${isSelected ? 'text-festive-900 dark:text-festive-200' : 'text-foreground'}`}>
                {getLocalizedTitle(occ)}
              </span>

              {/* Sub description */}
              <span className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                {occ.description}
              </span>

              {/* Selected indicator check */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-festive-500 text-white text-[10px]">
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
