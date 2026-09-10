import type { ReactNode } from "react";

export function HlavickaStranky({
  stitek,
  nadpis,
  children,
  udaje,
}: {
  stitek: string;
  nadpis: string;
  children?: ReactNode;
  udaje?: readonly { hodnota: string; popis: string }[];
}) {
  return (
    <section className="mx-auto max-w-[92rem] px-5 pb-16 pt-28 sm:px-8 sm:pb-28 sm:pt-44 lg:px-12">
      <span className="sr-only">{stitek}</span>
      <div className="grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-end lg:gap-20">
        <h1 className="max-w-[13ch] text-[clamp(3rem,13vw,7.8rem)] font-normal leading-[0.88] tracking-[-0.045em]">
          {nadpis}
        </h1>
        <div>
          {children ? (
            <div className="max-w-[38rem] text-[1.04rem] leading-[1.75] text-kura-svetly">{children}</div>
          ) : null}
          {udaje ? (
            <p className="mt-6 border-t border-kura/18 pt-5 text-sm leading-relaxed text-kura-svetly">
              {udaje.map((udaj) => `${udaj.hodnota} ${udaj.popis}`).join(", ")}.
            </p>
          ) : null}
        </div>
      </div>
      <div aria-hidden className="mt-10 h-px bg-kura/18 sm:mt-14" />
    </section>
  );
}
