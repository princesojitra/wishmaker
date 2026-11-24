import React from 'react';
import { Check } from 'lucide-react';
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

  const sectionTitles = {
    en: {
      title: 'Choose the Occasion',
      subtitle: 'Select the celebration or milestone you want wishes for',
    },
    hi: {
      title: 'अवसर का चयन करें',
      subtitle: 'वह अवसर चुनें जिसके लिए आपको शुभकामना चाहिए',
    },
    gu: {
      title: 'અવસર પસંદ કરો',
      subtitle: 'જે પ્રસંગ કે ઉત્સવ માટે શુભેચ્છા જોઈએ તે પસંદ કરો',
    },
  };

  const currentText = sectionTitles[language] || sectionTitles.en;

  return (
    <div className="space-y-3.5">
      {/* High-visibility section header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold text-xs shadow-xs">
            1
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {currentText.title}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {currentText.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Occasion Cards Grid with clean refined neutral selection */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
        {OCCASIONS.map((occ) => {
          const isSelected = selectedOccasion === occ.id;
          return (
            <button
              key={occ.id}
              type="button"
              onClick={() => onSelectOccasion(occ.id)}
              className={`relative flex flex-col justify-between min-h-[108px] rounded-xl p-3.5 text-left border-2 transition-all duration-150 outline-none ${
                isSelected
                  ? 'border-zinc-900 bg-zinc-100/80 text-zinc-950 shadow-sm ring-1 ring-zinc-900/20 dark:border-zinc-200 dark:bg-zinc-800/90 dark:text-zinc-50 dark:ring-zinc-200/30'
                  : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{occ.icon}</span>
                {isSelected ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                ) : (
                  occ.popular && (
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      Popular
                    </span>
                  )
                )}
              </div>

              <div>
                <p className={`text-sm font-semibold tracking-tight ${isSelected ? 'text-zinc-950 dark:text-zinc-50' : 'text-zinc-800 dark:text-zinc-200'}`}>
                  {getLocalizedTitle(occ)}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug mt-1">
                  {occ.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
