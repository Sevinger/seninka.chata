"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import { Fotka } from "@/components/fotka";
import { Reveal } from "@/components/reveal";
import type { Fotka as FotkaData } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Photo grid with a lightbox.
 *
 * A column-based masonry rather than a uniform grid — the photos have
 * different shapes and cropping them all to one ratio would flatten the place.
 * Slots without a photo yet render as placeholders and aren't clickable, so
 * the gallery never opens onto nothing.
 */
export function Galerie({
  fotky,
  className,
}: {
  fotky: readonly FotkaData[];
  className?: string;
}) {
  const [otevrena, setOtevrena] = useState<number | null>(null);

  // Only photos that actually exist can be stepped through in the lightbox.
  const dostupne = fotky.filter((f) => f.src);

  const posun = useCallback(
    (o: number) =>
      setOtevrena((i) =>
        i === null ? null : (i + o + dostupne.length) % dostupne.length
      ),
    [dostupne.length]
  );

  useEffect(() => {
    if (otevrena === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOtevrena(null);
      if (e.key === "ArrowRight") posun(1);
      if (e.key === "ArrowLeft") posun(-1);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [otevrena, posun]);

  const aktivni = otevrena === null ? null : dostupne[otevrena];

  return (
    <>
      <div className={cn("columns-1 gap-4 sm:columns-2 lg:columns-3", className)}>
        {fotky.map((fotka, i) => {
          const indexVDostupnych = dostupne.findIndex((f) => f.id === fotka.id);

          return (
            <Reveal key={fotka.id} delay={(i % 3) * 0.06} className="mb-4 break-inside-avoid">
              {fotka.src ? (
                <button
                  type="button"
                  onClick={() => setOtevrena(indexVDostupnych)}
                  className="group relative block w-full cursor-zoom-in overflow-hidden"
                >
                  <Fotka
                    fotka={fotka}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="sr-only">Zvětšit — {fotka.alt}</span>
                </button>
              ) : (
                <Fotka fotka={fotka} sizes="(min-width: 640px) 45vw, 92vw" />
              )}
            </Reveal>
          );
        })}
      </div>

      {aktivni?.src ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={aktivni.alt}
          className="na-tmavem fixed inset-0 z-[60] flex flex-col bg-smrk/97 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setOtevrena(null)}
        >
          <div className="flex items-center justify-between gap-4">
            <span className="udaj text-[0.75rem] uppercase tracking-[0.16em] text-mech-svetly">
              {(otevrena ?? 0) + 1} / {dostupne.length}
            </span>
            <button
              type="button"
              onClick={() => setOtevrena(null)}
              autoFocus
              className="-mr-2 p-2 text-kamen transition-colors hover:text-papir"
            >
              <span className="sr-only">Zavřít</span>
              <X size={24} />
            </button>
          </div>

          <div
            className="relative min-h-0 flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={aktivni.id}
              src={aktivni.src}
              alt={aktivni.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <div
            className="mt-4 flex items-center justify-between gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-kamen/75">{aktivni.alt}</p>
            {dostupne.length > 1 ? (
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => posun(-1)}
                  className="border border-kamen/25 p-2.5 text-kamen transition-colors hover:border-kamen/60 hover:text-papir"
                >
                  <span className="sr-only">Předchozí fotka</span>
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => posun(1)}
                  className="border border-kamen/25 p-2.5 text-kamen transition-colors hover:border-kamen/60 hover:text-papir"
                >
                  <span className="sr-only">Další fotka</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
