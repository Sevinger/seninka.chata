import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Every section opens the same way: trail mark, label, headline. Consistent
 * enough that a visitor stops reading the furniture after the first one.
 */
export function NadpisSekce({
  stitek,
  nadpis,
  children,
  tmave = false,
  className,
}: {
  stitek: string;
  nadpis: string;
  /** optional lede paragraph under the headline */
  children?: ReactNode;
  tmave?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <span className={cn("eyebrow", tmave && "text-mech-svetly")}>{stitek}</span>
      <h2
        className={cn(
          "mt-5 text-[clamp(1.85rem,4.2vw,3rem)] font-normal",
          tmave && "text-papir"
        )}
      >
        {nadpis}
      </h2>
      {children ? (
        <div
          className={cn(
            "mt-5 text-[1.0625rem] leading-relaxed",
            tmave ? "text-kamen/80" : "text-kura-svetly"
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
