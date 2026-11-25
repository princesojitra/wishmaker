import React from 'react';

const SKELETON_STYLES = [
  'bg-white dark:bg-[#20150e]/80 border-zinc-200/80 dark:border-amber-600/30',
  'bg-white dark:bg-[#0c1928]/80 border-zinc-200/80 dark:border-sky-500/30',
  'bg-white dark:bg-[#1a122a]/80 border-zinc-200/80 dark:border-purple-500/30',
];

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-5 pt-2 animate-fade-in w-full">
      {/* Top Header Bar Skeleton */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200/70 dark:border-zinc-800">
        <div className="space-y-1.5">
          <div className="h-6 w-56 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 animate-pulse" />
          <div className="h-4 w-40 rounded bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
        </div>
        <div className="h-9 w-28 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
      </div>

      {/* 3 Columns Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 lg:gap-5 items-stretch">
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            className={`rounded-2xl border p-5 space-y-4 animate-pulse flex flex-col justify-between min-h-[260px] ${SKELETON_STYLES[idx]}`}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="h-5 w-5 rounded-full bg-zinc-200/80 dark:bg-zinc-700/60" />
                <div className="flex gap-1.5">
                  <div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-750" />
                  <div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-750" />
                  <div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-750" />
                </div>
              </div>

              {/* Title */}
              <div className="h-5 w-3/4 rounded-md bg-zinc-200/80 dark:bg-zinc-700/60" />

              {/* Body */}
              <div className="space-y-2 pt-1">
                <div className="h-3.5 w-full rounded bg-zinc-100 dark:bg-zinc-750" />
                <div className="h-3.5 w-full rounded bg-zinc-100 dark:bg-zinc-750" />
                <div className="h-3.5 w-5/6 rounded bg-zinc-100 dark:bg-zinc-750" />
                <div className="h-3.5 w-4/6 rounded bg-zinc-100 dark:bg-zinc-750" />
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between">
              <div className="h-3 w-12 rounded bg-zinc-100 dark:bg-zinc-750" />
              <div className="h-3 w-14 rounded bg-zinc-100 dark:bg-zinc-750" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
