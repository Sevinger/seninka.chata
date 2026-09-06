"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

import { Fotka } from "@/components/fotka";
import { Tlacitko } from "@/components/tlacitko";
import { bookingUrl, fotkaHero, parametry, texty } from "@/lib/content";

/**
 * The hero is bottom-weighted rather than centred: the photograph gets the
 * whole frame, and the words sit along the lower edge above a data rail that
 * answers the four questions every enquiry email asks anyway — how many beds,
 * how many bedrooms, what it costs, whose it is while you're there.
 *
 * The parallax is 8% of the frame. Enough to feel like the photo has depth,
 * far short of the scroll-jacking the brief rules out.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "8%"]);

  return (
    <section
      ref={ref}
      className="na-tmavem relative flex min-h-[88svh] flex-col justify-end overflow-hidden bg-smrk"
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -bottom-[8%] top-0">
        <Fotka fotka={fotkaHero} priority vyplnit tmave bezPopisku sizes="100vw" />
      </motion.div>

      {/* Scrim. Keeps the headline legible whatever photo eventually lands. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-smrk via-smrk/55 to-smrk/15"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-smrk/60 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[92rem] px-5 pb-10 pt-32 sm:px-8 sm:pb-14 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl pb-14"
        >
          <span className="text-sm font-medium tracking-wide text-kamen/80">{texty.hero.stitek}</span>

          <h1 className="mt-5 max-w-4xl text-[clamp(3.2rem,8vw,7.8rem)] font-normal leading-[0.9] text-papir">
            {texty.hero.nadpis}
          </h1>

          <p className="mt-7 max-w-lg text-base leading-relaxed text-kamen/85 sm:text-lg">
            {texty.hero.podnadpis}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Tlacitko href="/objednavky">
              Poptat termín
              <ArrowRight size={17} aria-hidden />
            </Tlacitko>
            {bookingUrl ? (
              <Tlacitko href={bookingUrl} varianta="vedlejsi-tmave" externi>
                Zjistit dostupnost na Booking.com
                <ExternalLink size={16} aria-hidden />
              </Tlacitko>
            ) : null}
          </div>
        </motion.div>
      </div>

      {/* A quiet practical line, kept separate from the headline. */}
      <motion.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="relative mx-auto grid w-full max-w-[92rem] grid-cols-2 border-t border-kamen/25 px-5 sm:px-8 md:grid-cols-4 lg:px-12"
      >
        {parametry.map((polozka, i) => (
          <div
            key={polozka.popis}
            className={`px-1 py-5 sm:py-6 ${
              i > 0 ? "md:border-l md:border-kamen/15 md:pl-7" : ""
            } ${i % 2 === 1 ? "border-l border-kamen/15 pl-5 md:pl-7" : ""}`}
          >
            <dt className="udaj text-[1.0625rem] text-papir sm:text-xl">
              {polozka.hodnota}
            </dt>
            <dd className="mt-1 text-[0.8125rem] text-kamen/65">{polozka.popis}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
