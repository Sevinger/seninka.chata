import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";
import { Znacka } from "@/components/znacka";

/**
 * Inner pages open with type rather than a photo. The home page owns the big
 * image; repeating it on every page would dilute it and slow the pages that
 * people actually read for information.
 */
export function HlavickaStranky({
  stitek,
  nadpis,
  children,
  udaje,
}: {
  stitek: string;
  nadpis: string;
  children?: ReactNode;
  /** optional mono facts along the bottom edge, e.g. price and capacity */
  udaje?: readonly { hodnota: string; popis: string }[];
}) {
  return (
    <section className="mx-auto max-w-[86rem] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:px-12">
      <Reveal y={12}>
        <div className="flex items-center gap-2.5">
          <Znacka />
          <span className="eyebrow">{stitek}</span>
        </div>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.1rem,5.4vw,3.9rem)] font-normal">
          {nadpis}
        </h1>
        {children ? (
          <div className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-kura-svetly">
            {children}
          </div>
        ) : null}
      </Reveal>

      {udaje ? (
        <Reveal delay={0.1}>
          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-5 border-t border-kura/15 pt-6">
            {udaje.map((u) => (
              <div key={u.popis}>
                <dt className="udaj text-lg text-smrk">{u.hodnota}</dt>
                <dd className="mt-0.5 text-[0.8125rem] text-kura-svetly">{u.popis}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      ) : (
        <div aria-hidden className="linka mt-12" />
      )}
    </section>
  );
}
