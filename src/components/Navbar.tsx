import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { LANGUAGES } from '../data/occasions';
import { Language } from '../types/wish';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onGoHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  isDark,
  onToggleTheme,
  onGoHome,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:bg-zinc-950/90 dark:border-zinc-800 transition-colors">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none select-none"
        >
          <div className="flex h-9 w-9 items-center justify-center transition-transform group-hover:scale-105">
            <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 27L4 14C1 10.5 2 5 6.5 3C11 1 14.5 4 16 6.5V27Z" fill="url(#origami-pink)" />
              <path d="M16 27L28 14C31 10.5 30 5 25.5 3C21 1 17.5 4 16 6.5V27Z" fill="url(#origami-purple)" />
              <path d="M16 6.5L10 16L16 27L22 16L16 6.5Z" fill="white" fillOpacity="0.22" />
              <defs>
                <linearGradient id="origami-pink" x1="4" y1="3" x2="16" y2="27" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#E11D48" />
                </linearGradient>
                <linearGradient id="origami-purple" x1="28" y1="3" x2="16" y2="27" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A855F7" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              WishMaker
            </span>
            <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              AI
            </span>
          </div>
        </button>

        {/* Right Actions: Language Selector + Theme Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Language selector chips */}
          <div className="flex items-center rounded-xl bg-zinc-100/90 p-1 border border-zinc-200/70 dark:bg-zinc-900 dark:border-zinc-800">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => onLanguageChange(lang.id)}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                  currentLanguage === lang.id
                    ? 'bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50 font-bold'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                <span>{lang.native}</span>
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/80 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer shadow-2xs"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
