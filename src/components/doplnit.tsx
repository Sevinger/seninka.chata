import { cn } from "@/lib/utils";

/**
 * Marks a fact the owner hasn't supplied yet.
 *
 * We never invent prices, times or policies, so anything still missing shows
 * up here in marker red — loud on purpose. It is impossible to publish the
 * site without noticing, and `npm run check-obsah` lists every one of them.
 */
export function Doplnit({ co, className }: { co: string; className?: string }) {
  return (
    <span
      className={cn(
        "udaj inline-flex items-center gap-1.5 rounded-[2px] border border-znacka/45 bg-znacka/8 px-2 py-0.5 text-[0.6875rem] uppercase tracking-[0.1em] text-znacka",
        className
      )}
    >
      {/* a survey tick, not a badge dot — square, on the baseline, no radius */}
      <span aria-hidden className="h-2 w-[3px] shrink-0 bg-znacka" />
      Doplnit — {co}
    </span>
  );
}
