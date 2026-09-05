"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { Cil } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The rozcestník — a Czech trail signpost.
 *
 * At every junction in these mountains there is a post carrying arrow-shaped
 * plates: where you can go, how far it is, how you get there. It is the one
 * object every Czech walker reads without thinking, and it happens to answer
 * exactly what a guest wants to know before booking. So the surroundings
 * section isn't prose about "the beautiful Jeseníky region" — it's the post.
 *
 * Plate widths vary slightly, the way real ones do. That irregularity is the
 * whole reason it reads as an object rather than a list.
 */
const sirky = ["100%", "93%", "97%", "88%"];

export function Rozcestnik({
  cile,
  className,
}: {
  cile: readonly Cil[];
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative pl-4 sm:pl-6", className)}>
      {/* the post */}
      <div
        aria-hidden
        className="absolute bottom-2 left-0 top-2 w-[3px] rounded-full bg-gradient-to-b from-mech/70 via-mech/45 to-transparent sm:w-1"
      />

      <ul className="space-y-3">
        {cile.map((cil, i) => (
          <motion.li
            key={cil.nazev}
            initial={{ opacity: 0, x: reduced ? 0 : -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.55,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ maxWidth: sirky[i % sirky.length] }}
          >
            <div className="deska relative bg-papir py-4 pl-5 pr-5 sm:pr-12">
              {/* the trail colour band down the mounting edge */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-[5px] bg-znacka"
              />

              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <span className="text-[1.0625rem] font-medium text-smrk sm:text-lg">
                  {cil.nazev}
                </span>
                <span className="udaj shrink-0 text-[0.9375rem] text-znacka">
                  {cil.vzdalenost}
                  <span className="ml-2.5 text-[0.6875rem] uppercase tracking-[0.14em] text-kura-svetly">
                    {cil.smer}
                  </span>
                </span>
              </div>

              <p className="mt-1.5 max-w-[46ch] text-sm leading-snug text-kura-svetly">
                {cil.detail}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
