import { Car, ChefHat, Flame, Trees, Utensils, Wifi } from "lucide-react";

import { Reveal } from "@/components/reveal";
import type { Vybavena } from "@/lib/content";
import { cn } from "@/lib/utils";

const ikony = {
  wifi: Wifi,
  krb: Flame,
  gril: Utensils,
  zahrada: Trees,
  parkovani: Car,
  kuchyne: ChefHat,
} as const;

/**
 * Amenities as a ruled list rather than a grid of icon cards. Six boxes with
 * a centred icon is the template answer; hairlines and a left-aligned icon
 * read as a printed inventory, which is what this actually is.
 */
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
    <ul
      className={cn(
        "grid gap-x-14 sm:grid-cols-2",
        tmave ? "divide-kamen/12" : "divide-kura/12",
        className
      )}
    >
      {polozky.map((polozka, i) => {
        const Ikona = ikony[polozka.ikona];
        return (
          <li key={polozka.nazev}>
            <Reveal delay={i * 0.05}>
              <div
                className={cn(
                  "flex gap-4 border-t py-6",
                  tmave ? "border-kamen/12" : "border-kura/12"
                )}
              >
                <Ikona
                  size={19}
                  strokeWidth={1.5}
                  aria-hidden
                  className={cn(
                    "mt-0.5 shrink-0",
                    tmave ? "text-mech-svetly" : "text-mech"
                  )}
                />
                <div>
                  <h3
                    className={cn(
                      "font-body text-[1.0625rem] font-medium tracking-normal",
                      tmave ? "text-papir" : "text-smrk"
                    )}
                  >
                    {polozka.nazev}
                  </h3>
                  <p
                    className={cn(
                      "mt-1.5 text-[0.9375rem] leading-relaxed",
                      tmave ? "text-kamen/70" : "text-kura-svetly"
                    )}
                  >
                    {polozka.popis}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
