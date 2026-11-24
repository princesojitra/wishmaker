import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 pt-4 animate-fade-in">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="h-4 w-40 rounded bg-zinc-200/80 dark:bg-zinc-800 animate-pulse" />
        <div className="h-6 w-20 rounded bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-zinc-200 bg-white p-4 space-y-3 animate-pulse dark:border-zinc-800 dark:bg-zinc-900/60"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 rounded-full bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-3 w-8 rounded bg-zinc-100 dark:bg-zinc-800" />
            </div>
            <div className="h-4 w-2/3 rounded bg-zinc-200/70 dark:bg-zinc-800" />
            <div className="space-y-1.5 pt-2">
              <div className="h-3 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-3 w-5/6 rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-3 w-4/6 rounded bg-zinc-100 dark:bg-zinc-800" />
            </div>
            <div className="pt-3 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="h-3 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="flex gap-1.5">
                <div className="h-7 w-14 rounded-md bg-zinc-100 dark:bg-zinc-800" />
                <div className="h-7 w-16 rounded-md bg-zinc-100 dark:bg-zinc-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
