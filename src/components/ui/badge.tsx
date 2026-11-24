import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "festive" | "warm";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground":
            variant === "default",
          "border-festive-200 bg-festive-50 text-festive-800":
            variant === "secondary",
          "border-border text-foreground": variant === "outline",
          "border-amber-200/60 bg-amber-50 text-amber-900":
            variant === "warm",
          "border-transparent bg-gradient-to-r from-festive-500 to-amber-500 text-white shadow-xs":
            variant === "festive",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
