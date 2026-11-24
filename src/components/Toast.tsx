import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-festive-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-xl shadow-festive-500/10 animate-fade-in dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
        <CheckCircle2 className="h-4 w-4" />
      </div>
      <span>{message}</span>
    </div>
  );
};
