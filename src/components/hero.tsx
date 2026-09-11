"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useRef } from "react";

import { HeroMedia } from "@/components/hero-media";
import { Tlacitko } from "@/components/tlacitko";
import { bookingUrl, fotkaHero, texty } from "@/lib/content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reducedMotion ? ["0%", "0%"] : ["0%", "7%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1, 1.035]);

  return (
    <section ref={ref} className="na-tmavem relative overflow-hidden bg-smrk sm:flex sm:min-h-[94svh] sm:items-end">
      <motion.div
        style={{ y, scale }}
        className="hero-media-panel relative h-[52svh] min-h-[21rem] w-full origin-center overflow-hidden sm:absolute sm:inset-x-0 sm:-bottom-[7%] sm:top-0 sm:h-auto sm:min-h-0"
      >
        <HeroMedia poster={fotkaHero.src ?? "/fotky/hero.webp"} alt={fotkaHero.alt} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-smrk/45 via-transparent to-smrk/50 sm:bg-[linear-gradient(90deg,rgba(21,25,22,.84)_0%,rgba(21,25,22,.42)_48%,rgba(21,25,22,.08)_78%),linear-gradient(0deg,rgba(21,25,22,.78)_0%,transparent_52%)]" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-smrk/55 to-transparent sm:h-44 sm:from-smrk/65" />
      </motion.div>
      <div className="relative mx-auto w-full max-w-[92rem] bg-smrk px-5 pb-9 pt-8 sm:bg-transparent sm:px-8 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-20">
        <motion.div initial={{ opacity: 0, y: reducedMotion ? 0 : 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="max-w-[66rem]">
          <h1 className="max-w-[12ch] text-[clamp(3rem,13.5vw,8.7rem)] font-normal leading-[0.86] tracking-[-0.045em] text-papir">{texty.hero.nadpis}</h1>
          <div className="mt-6 grid max-w-4xl gap-6 border-t border-kamen/30 pt-5 sm:mt-8 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-12 sm:pt-6">
            <div>
              <p className="max-w-[44rem] text-base leading-relaxed text-kamen/88 sm:text-lg">{texty.hero.podnadpis}</p>
              <p className="mt-3 text-sm leading-relaxed text-kamen/67">Pro pět hostů, dvě ložnice a celá chata za 2 500 Kč za noc.</p>
            </div>
            <div className="grid w-full gap-3 sm:flex sm:w-auto sm:flex-wrap">
              <Tlacitko href="/objednavky" className="w-full sm:w-auto">Poptat termín <ArrowRight size={17} aria-hidden /></Tlacitko>
              {bookingUrl ? <Tlacitko href={bookingUrl} varianta="vedlejsi-tmave" className="w-full sm:w-auto" externi>Booking.com <ExternalLink size={16} aria-hidden /></Tlacitko> : null}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
