"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { Fotka as FotkaSlot } from "@/components/fotka";
import type { Fotka } from "@/lib/content";

export function FotoPribeh({
  fotka,
  nadpis,
  text,
}: {
  fotka: Fotka;
  nadpis: string;
  text: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reducedMotion ? ["0%", "0%"] : ["-5%", "5%"]);
  const textY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [42, -42]);

  return (
    <section ref={ref} className="na-tmavem relative min-h-[78svh] overflow-hidden bg-smrk">
      <motion.div style={{ y }} className="absolute inset-x-0 -bottom-[7%] -top-[7%]">
        <FotkaSlot fotka={fotka} vyplnit tmave bezPopisku sizes="100vw" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,25,23,.78)_0%,rgba(22,25,23,.26)_62%,rgba(22,25,23,.08)_100%),linear-gradient(0deg,rgba(22,25,23,.52),transparent_55%)]" />
      <motion.div style={{ y: textY }} className="relative mx-auto flex min-h-[78svh] max-w-[92rem] items-center px-5 py-28 sm:px-8 lg:px-12">
        <div className="max-w-[48rem]">
          <h2 className="max-w-[12ch] text-[clamp(3.2rem,7.2vw,7.8rem)] font-normal leading-[0.88] tracking-[-0.04em] text-papir">
            {nadpis}
          </h2>
          <p className="mt-8 max-w-[42rem] border-l border-kamen/45 pl-5 text-base leading-relaxed text-kamen/82 sm:text-lg">
            {text}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
