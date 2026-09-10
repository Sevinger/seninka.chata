"use client";

import { useCallback, useState } from "react";
import { Fotka } from "@/components/fotka";
import { Lightbox } from "@/components/lightbox";
import type { Fotka as FotkaData } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Galerie({ fotky, className }: { fotky: readonly FotkaData[]; className?: string }) {
  const [aktivniIndex, setAktivniIndex] = useState<number | null>(null);
  const dostupne = fotky.filter((fotka) => fotka.src);
  const posunout = useCallback((smer: -1 | 1) => setAktivniIndex((index) => index === null ? null : (index + smer + dostupne.length) % dostupne.length), [dostupne.length]);
  const zavrit = useCallback(() => setAktivniIndex(null), []);
  return <>
    <div className={cn("columns-1 gap-4 sm:columns-2 lg:columns-3", className)}>
      {fotky.map((fotka) => {
        const index = dostupne.findIndex((dostupna) => dostupna.id === fotka.id);
        return <div key={fotka.id} className="mb-4 break-inside-avoid">
          {fotka.src ? <button type="button" onClick={() => setAktivniIndex(index)} className="group block w-full cursor-zoom-in overflow-hidden"><Fotka fotka={fotka} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" className="transition-transform duration-700 ease-out group-hover:scale-[1.02]" /><span className="sr-only">Zvětšit — {fotka.alt}</span></button> : <Fotka fotka={fotka} sizes="(min-width: 640px) 45vw, 92vw" />}
        </div>;
      })}
    </div>
    <Lightbox fotky={dostupne} aktivniIndex={aktivniIndex} zavrit={zavrit} posunout={posunout} />
  </>;
}
