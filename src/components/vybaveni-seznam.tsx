import type { Vybavena } from "@/lib/content";
import { cn } from "@/lib/utils";

export function VybaveniSeznam({
  polozky,
  tmave = false,
  className,
}: {
  polozky: readonly Vybavena[];
  tmave?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("grid sm:grid-cols-2", className)}>
      {polozky.map((polozka) => (
        <li
          key={polozka.nazev}
          className={cn(
            "grid gap-3 border-t py-7 sm:grid-cols-[minmax(9rem,.72fr)_1.28fr] sm:gap-8 sm:pr-10",
            tmave ? "border-kamen/17" : "border-kura/15",
          )}
        >
          <h3 className={cn("font-body text-base font-medium tracking-normal", tmave ? "text-papir" : "text-smrk")}>
            {polozka.nazev}
          </h3>
          <p className={cn("max-w-[38ch] text-sm leading-relaxed", tmave ? "text-kamen/66" : "text-kura-svetly")}>
            {polozka.popis}
          </p>
        </li>
      ))}
    </ul>
  );
}
