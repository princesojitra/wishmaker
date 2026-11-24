import React from 'react';
import { Check } from 'lucide-react';
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

  const sectionTitles = {
    en: {
      title: 'Choose the Occasion',
      subtitle: 'Select from popular events or create your own custom occasion',
    },
    hi: {
      title: 'अवसर का चयन करें',
      subtitle: 'लोकप्रिय अवसरों में से चुनें या अपना कोई भी खास अवसर लिखें',
    },
    gu: {
      title: 'અવસર પસંદ કરો',
      subtitle: 'જાણીતા પ્રસંગોમાંથી પસંદ કરો અથવા તમારો પોતાનો પ્રસંગ લખો',
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

      {/* Occasion Cards Grid */}
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
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-zinc-800 shadow-2xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>Popular</span>
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

      {/* Dynamic input for custom occasion */}
      {selectedOccasion === 'custom' && (
        <div className="pt-1.5 animate-fade-in">
          <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider block mb-1.5">
            {language === 'hi'
              ? 'अपने अवसर का नाम लिखें'
              : language === 'gu'
              ? 'તમારા પ્રસંગનું નામ લખો'
              : 'Name Your Custom Occasion'}
            <span className="text-zinc-900 dark:text-zinc-100 ml-1 font-bold">*</span>
          </label>
          <Input
            id="custom-occasion-input"
            type="text"
            placeholder={
              language === 'hi'
                ? 'उदा. मैराथन जीत, नई दुकान का उद्घाटन, पहली कार, पीएचडी पूरी होना...'
                : language === 'gu'
                ? 'દા.ત. નવી ગાડી, દુકાનનું ઉદ્ઘાટન, નવી કંપની શરૂ કરી...'
                : 'e.g. Marathon finish, Book launch, First home, Startup funding...'
            }
            value={customOccasionText}
            onChange={(e) => onCustomOccasionChange?.(e.target.value)}
            className="h-11 border-zinc-300 dark:border-zinc-700 text-sm"
            maxLength={60}
          />
        </div>
      )}
    </div>
  );
};
