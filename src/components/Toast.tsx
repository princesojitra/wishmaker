import React from 'react';
import { Check, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

interface ToastProps {
  message: string;
  isVisible: boolean;
  type?: ToastType;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  isVisible,
  type = 'success',
  onClose,
}) => {
  if (!isVisible) return null;

  const isNudge = type === 'warning' || type === 'error';

  return (
    <div
      role="alert"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 flex items-center gap-3 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-md animate-fade-in ${
        isNudge
          ? 'border border-amber-500/40 bg-zinc-950 text-zinc-100 ring-2 ring-amber-500/20 dark:border-amber-400/40 dark:bg-zinc-900 dark:text-zinc-50'
          : 'border border-zinc-800 bg-zinc-900 text-white dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-900'
      }`}
    >
      {isNudge ? (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
          <AlertCircle className="h-4 w-4" />
        </div>
      ) : type === 'info' ? (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-400">
          <Info className="h-4 w-4" />
        </div>
      ) : (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 dark:text-emerald-600">
          <Check className="h-3.5 w-3.5" />
        </div>
      )}

      <span className="leading-snug max-w-[280px] sm:max-w-md">{message}</span>

      {onClose && (
        <button
          onClick={onClose}
          type="button"
          className="ml-1 -mr-1 p-1 rounded-md text-zinc-400 hover:text-white dark:hover:text-zinc-900 hover:bg-white/10 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          aria-label="Close notification"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};
