"use client";

import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Fotka as FotkaSlot } from "@/components/fotka";
import { Lightbox } from "@/components/lightbox";
import type { Fotka } from "@/lib/content";
import { carouselStep } from "@/lib/interaction";

export function FotoPas({ fotky }: { fotky: readonly Fotka[] }) {
  const dostupne = fotky.filter((fotka) => fotka.src);
  const pasRef = useRef<HTMLDivElement>(null);
  const [aktivniIndex, setAktivniIndex] = useState<number | null>(null);
  const [lzeZpet, setLzeZpet] = useState(false);
  const [lzeDal, setLzeDal] = useState(dostupne.length > 1);
  const zkontrolovatOkraje = useCallback(() => {
    const pas = pasRef.current;
    if (!pas) return;
    setLzeZpet(pas.scrollLeft > 8);
    setLzeDal(pas.scrollLeft + pas.clientWidth < pas.scrollWidth - 8);
  }, []);
  useEffect(() => {
    zkontrolovatOkraje();
    window.addEventListener("resize", zkontrolovatOkraje);
    return () => window.removeEventListener("resize", zkontrolovatOkraje);
  }, [zkontrolovatOkraje]);
  const posunoutPas = (smer: "previous" | "next") => {
    const pas = pasRef.current;
    const karta = pas?.querySelector<HTMLElement>("[data-foto-karta]");
    if (!pas || !karta) return;
    const gap = Number.parseFloat(getComputedStyle(pas).columnGap) || 0;
    pas.scrollBy({ left: carouselStep({ cardWidth: karta.offsetWidth, gap }, smer), behavior: "smooth" });
  };
  const posunoutLightbox = useCallback((smer: -1 | 1) => setAktivniIndex((index) => index === null ? null : (index + smer + dostupne.length) % dostupne.length), [dostupne.length]);
  const zavritLightbox = useCallback(() => setAktivniIndex(null), []);
  return <>
    <div className="flex justify-end gap-2 px-5 sm:px-8 lg:px-12">
      <button type="button" onClick={() => posunoutPas("previous")} disabled={!lzeZpet} className="border border-kura/20 p-3 disabled:opacity-25"><span className="sr-only">Předchozí snímek</span><ArrowLeft size={19} aria-hidden /></button>
      <button type="button" onClick={() => posunoutPas("next")} disabled={!lzeDal} className="border border-kura/20 p-3 disabled:opacity-25"><span className="sr-only">Další snímek</span><ArrowRight size={19} aria-hidden /></button>
    </div>
    <div ref={pasRef} onScroll={zkontrolovatOkraje} className="foto-pas mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:gap-6 sm:px-8 lg:px-12">
      {dostupne.map((fotka, index) => <figure key={fotka.id} data-foto-karta className="w-[82vw] max-w-[72rem] shrink-0 snap-start sm:w-[68vw] lg:w-[54vw]">
        <button type="button" onClick={() => setAktivniIndex(index)} className="group relative block w-full cursor-zoom-in overflow-hidden text-left">
          <FotkaSlot fotka={fotka} pomer="3/2" sizes="(min-width: 1024px) 54vw, 82vw" className="transition-transform duration-700 ease-out group-hover:scale-[1.018]" />
          <span className="absolute bottom-4 right-4 bg-smrk/75 p-2.5 text-papir"><span className="sr-only">Zvětšit — {fotka.alt}</span><Maximize2 size={17} aria-hidden /></span>
        </button>
        <figcaption className="mt-3 text-sm leading-snug text-kura-svetly">{fotka.alt}</figcaption>
      </figure>)}
      <div aria-hidden className="w-px shrink-0" />
    </div>
    <Lightbox fotky={dostupne} aktivniIndex={aktivniIndex} zavrit={zavritLightbox} posunout={posunoutLightbox} />
  </>;
}
