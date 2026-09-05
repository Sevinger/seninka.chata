import { cn } from "@/lib/utils";

/**
 * The KČT trail mark — a red band between two pale ones, painted on trees and
 * rocks across every Czech mountain range. It sits before each section label
 * as the site's quiet recurring glyph, doing the same job it does in the
 * forest: telling you you're still on the right path.
 */
export function Znacka({
  className,
  tmave = false,
}: {
  className?: string;
  /** on spruce-dark sections the outer bands need to be light, not stone */
  tmave?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-3.5 w-3.5 shrink-0 flex-col overflow-hidden rounded-[1px]",
        className
      )}
    >
      <span className={cn("h-1/3", tmave ? "bg-mech-svetly" : "bg-kura-svetly")} />
      <span className="h-1/3 bg-znacka" />
      <span className={cn("h-1/3", tmave ? "bg-mech-svetly" : "bg-kura-svetly")} />
    </span>
  );
}
