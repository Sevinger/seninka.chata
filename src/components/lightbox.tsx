"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

import type { Fotka } from "@/lib/content";

export function Lightbox({ fotky, aktivniIndex, zavrit, posunout }: { fotky: readonly Fotka[]; aktivniIndex: number | null; zavrit: () => void; posunout: (smer: -1 | 1) => void }) {
  useEffect(() => {
    if (aktivniIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") zavrit();
      if (event.key === "ArrowLeft") posunout(-1);
      if (event.key === "ArrowRight") posunout(1);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [aktivniIndex, posunout, zavrit]);

  const aktivni = aktivniIndex === null ? null : fotky[aktivniIndex];
  if (!aktivni?.src) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={aktivni.alt} className="na-tmavem fixed inset-0 z-[80] flex flex-col bg-smrk/98 p-4 sm:p-8" onClick={zavrit}>
      <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between gap-4">
        <span className="text-sm tabular-nums text-kamen/65">{(aktivniIndex ?? 0) + 1} / {fotky.length}</span>
        <button type="button" onClick={zavrit} autoFocus className="p-3 text-kamen transition-colors hover:text-white"><span className="sr-only">Zavřít náhled</span><X size={26} aria-hidden /></button>
      </div>
      <div className="relative mx-auto min-h-0 w-full max-w-[92rem] flex-1" onClick={(event) => event.stopPropagation()}>
        <Image key={aktivni.id} src={aktivni.src} alt={aktivni.alt} fill sizes="100vw" className="object-contain" />
      </div>
      <div className="mx-auto mt-4 flex w-full max-w-[92rem] items-center justify-between gap-5" onClick={(event) => event.stopPropagation()}>
        <p className="max-w-[68ch] text-sm text-kamen/75">{aktivni.alt}</p>
        {fotky.length > 1 ? <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => posunout(-1)} className="border border-kamen/25 p-3 text-kamen hover:border-kamen/60 hover:text-white"><span className="sr-only">Předchozí fotka</span><ArrowLeft size={19} aria-hidden /></button>
          <button type="button" onClick={() => posunout(1)} className="border border-kamen/25 p-3 text-kamen hover:border-kamen/60 hover:text-white"><span className="sr-only">Další fotka</span><ArrowRight size={19} aria-hidden /></button>
        </div> : null}
      </div>
    </div>
  );
}
