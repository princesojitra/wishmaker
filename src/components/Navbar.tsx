import React from 'react';
import { Sun, Moon } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:bg-zinc-950/80 dark:border-zinc-800">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
            <span className="text-xs font-bold tracking-tight">W</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              WishMaker
            </span>
            <span className="rounded-full bg-zinc-100 px-1.5 py-0.2 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              AI
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language selector chips */}
          <div className="flex items-center rounded-lg bg-zinc-100 p-0.5 border border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => onLanguageChange(lang.id)}
                className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                  currentLanguage === lang.id
                    ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100 font-semibold'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                <span>{lang.native}</span>
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
