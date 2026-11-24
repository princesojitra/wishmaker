import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "subtle";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium transition-colors",
        {
          "border-transparent bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900":
            variant === "default",
          "border-zinc-200 bg-zinc-100 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200":
            variant === "secondary",
          "border-zinc-200 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300":
            variant === "outline",
          "border-transparent bg-zinc-100/80 text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400":
            variant === "subtle",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
