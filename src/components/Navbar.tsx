import React from 'react';
import { Sparkles, HeartHandshake } from 'lucide-react';
import { LANGUAGES } from '../data/occasions';
import { Language } from '../types/wish';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-festive-200/50 bg-white/80 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-800">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center space-x-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-festive-500 via-rose-500 to-amber-400 text-white shadow-md shadow-festive-500/20">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xl font-bold tracking-tight text-foreground">
                Wish<span className="text-festive-600">Maker</span>
              </span>
              <span className="rounded-full bg-festive-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-festive-800 dark:bg-festive-950 dark:text-festive-300">
                AI
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground hidden sm:block">
              Greetings with heart & soul
            </p>
          </div>
        </div>

        {/* Language switch & actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language selector chips */}
          <div className="flex items-center rounded-xl bg-festive-50/80 p-1 border border-festive-200/60 dark:bg-slate-800 dark:border-slate-700">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => onLanguageChange(lang.id)}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  currentLanguage === lang.id
                    ? 'bg-white text-festive-700 shadow-xs dark:bg-slate-900 dark:text-festive-400 font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{lang.flag}</span>
                <span className="hidden xs:inline">{lang.native}</span>
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-festive-200/60 bg-white/80 text-muted-foreground hover:text-foreground hover:bg-festive-50 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Tag badge */}
          <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground font-medium pl-2">
            <HeartHandshake className="w-3.5 h-3.5 text-festive-500" />
            <span>Made with love</span>
          </div>
        </div>
      </div>
    </header>
  );
};
