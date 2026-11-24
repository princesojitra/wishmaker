import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-medium text-white shadow-lg animate-fade-in dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-900">
      <Check className="h-3.5 w-3.5 text-emerald-400 dark:text-emerald-600" />
      <span>{message}</span>
    </div>
  );
};
