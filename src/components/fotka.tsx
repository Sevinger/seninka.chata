import Image from "next/image";

import type { Fotka as FotkaData } from "@/lib/content";
import { cn, pomerTridy } from "@/lib/utils";

/**
 * A photo slot.
 *
 * The client's photos are still coming. Until a `src` is filled in, this
 * renders a designed placeholder at the exact final aspect ratio, so dropping
 * the real photos in later changes nothing about the layout. The placeholder
 * is styled as a map legend swatch rather than a broken-image grey box — the
 * page stays presentable while it waits.
 */
export function Fotka({
  fotka,
  className,
  sizes = "100vw",
  priority = false,
  vyplnit = false,
  tmave = false,
  bezPopisku = false,
  pomer,
}: {
  fotka: FotkaData;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** fill the parent instead of holding its own aspect ratio (hero) */
  vyplnit?: boolean;
  /** placeholder styled for spruce-dark surroundings */
  tmave?: boolean;
  /** drop the placeholder caption where other type already sits on top (hero) */
  bezPopisku?: boolean;
  /** override the photo's own ratio, e.g. to line a teaser row up */
  pomer?: FotkaData["pomer"];
}) {
  const ramec = vyplnit
    ? "absolute inset-0"
    : cn("relative", pomerTridy[pomer ?? fotka.pomer]);

  if (!fotka.src) {
    return (
      <div
        className={cn(
          "overflow-hidden",
          tmave ? "bg-smrk-2" : "bg-kamen-tmavy",
          ramec,
          className
        )}
      >
        {/* faint terrain hatch, so the empty slot reads as intentional */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `repeating-linear-gradient(58deg, transparent 0 11px, color-mix(in srgb, var(--color-mech) ${
              tmave ? "45%" : "30%"
            }, transparent) 11px 12px)`,
          }}
        />
        {bezPopisku ? null : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
            <span
              className={cn(
                "udaj text-[0.625rem] uppercase tracking-[0.18em]",
                tmave ? "text-mech-svetly" : "text-kura-svetly"
              )}
            >
              Fotka bude doplněna
            </span>
            <span
              className={cn(
                "max-w-[24ch] text-sm leading-snug",
                tmave ? "text-kamen/70" : "text-kura"
              )}
            >
              {fotka.alt}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden", ramec, className)}>
      <Image
        src={fotka.src}
        alt={fotka.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
