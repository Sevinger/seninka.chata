import type { Metadata } from "next";
import { Check } from "lucide-react";

import { Doplnit } from "@/components/doplnit";
import { HlavickaStranky } from "@/components/hlavicka-stranky";
import { NadpisSekce } from "@/components/nadpis-sekce";
import { PruhPoptavka } from "@/components/pruh-poptavka";
import { Reveal } from "@/components/reveal";
import { cena, cenaText, podminky, pravidla, texty } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ceník a informace",
  description:
    "2 500 Kč za noc za celou chatu, stejná cena po celý rok. Podmínky pobytu, časy příjezdu a odjezdu a pravidla chaty.",
};

const obal = "mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-12";

/** Times and terms the owner hasn't confirmed show as [DOPLNIT], never as a guess. */
const casyAPodminky = [
  { nazev: "Příjezd", hodnota: podminky.prijezd, klic: "čas příjezdu" },
  { nazev: "Odjezd", hodnota: podminky.odjezd, klic: "čas odjezdu" },
  { nazev: "Nejkratší pobyt", hodnota: podminky.minimalniPobyt, klic: "min. pobyt" },
  { nazev: "Kauce", hodnota: podminky.kauce, klic: "kauce" },
  { nazev: "Storno podmínky", hodnota: podminky.storno, klic: "storno" },
];

export default function Cenik() {
  return (
    <>
      <HlavickaStranky stitek={texty.cenik.stitek} nadpis={texty.cenik.nadpis}>
        <p>{texty.cenik.text}</p>
      </HlavickaStranky>

      {/* ── Cena ─────────────────────────────────────────────────────────── */}
      <section className={`${obal} pb-24 sm:pb-32`}>
        <Reveal>
          <div className="flex flex-col gap-8 border border-kura/15 bg-papir p-8 sm:flex-row sm:items-end sm:justify-between sm:p-12">
            <div>
              <p className="eyebrow">Cena za celou chatu</p>
              <p className="udaj mt-4 text-[clamp(3rem,9vw,5.5rem)] leading-none text-smrk">
                {cenaText}
              </p>
              <p className="udaj mt-3 text-sm uppercase tracking-[0.16em] text-kura-svetly">
                {cena.jednotka} / až 5 osob
              </p>
            </div>
            <p className="max-w-xs text-[0.9375rem] leading-relaxed text-kura-svetly">
              {cena.poznamka}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Co je v ceně + časy ──────────────────────────────────────────── */}
      <section className="border-y border-kura/12 bg-papir py-24 sm:py-32">
        <div className={`${obal} grid gap-16 lg:grid-cols-2 lg:gap-24`}>
          <Reveal>
            <NadpisSekce stitek="V ceně" nadpis="Co je v ceně zahrnuto" />
            {podminky.vCene ? (
              <ul className="mt-10">
                {podminky.vCene.map((polozka) => (
                  <li
                    key={polozka}
                    className="flex items-baseline gap-3 border-t border-kura/12 py-3.5 text-[0.9375rem] text-kura"
                  >
                    <Check
                      size={15}
                      strokeWidth={2}
                      aria-hidden
                      className="shrink-0 translate-y-0.5 text-mech"
                    />
                    {polozka}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-10 border-t border-kura/12 pt-6">
                <Doplnit co="co je v ceně" />
                <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-kura-svetly">
                  Seznam doplníme, jakmile ho od majitele budeme mít — energie,
                  povlečení, ručníky, dřevo do krbu a podobně. Nic si tu
                  nevymýšlíme.
                </p>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.08}>
            <NadpisSekce stitek="Podmínky" nadpis="Časy a podmínky pobytu" />
            <dl className="mt-10">
              {casyAPodminky.map((radek) => (
                <div
                  key={radek.nazev}
                  className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-kura/12 py-4"
                >
                  <dt className="text-[0.9375rem] text-kura">{radek.nazev}</dt>
                  <dd className="udaj text-[0.9375rem] text-smrk">
                    {radek.hodnota ?? <Doplnit co={radek.klic} />}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── Pravidla ─────────────────────────────────────────────────────── */}
      <section className={`${obal} py-24 sm:py-32`}>
        <Reveal>
          <NadpisSekce stitek="Pravidla" nadpis="Pravidla chaty">
            <p>
              Chatu si pronajímáte celou, takže pravidel je málo. Ta, která
              platí, jsou tady.
            </p>
          </NadpisSekce>
        </Reveal>

        <ul className="mt-12 grid gap-x-14 sm:grid-cols-2">
          {pravidla.map((pravidlo, i) => (
            <li key={pravidlo.nazev}>
              <Reveal delay={i * 0.05}>
                <div className="border-t border-kura/12 py-6">
                  <h3 className="font-body text-[1.0625rem] font-medium tracking-normal text-smrk">
                    {pravidlo.nazev}
                  </h3>
                  <div className="mt-2 text-[0.9375rem] leading-relaxed text-kura-svetly">
                    {pravidlo.potvrzeno && pravidlo.detail ? (
                      pravidlo.detail
                    ) : (
                      <Doplnit co={pravidlo.nazev.toLowerCase()} />
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <PruhPoptavka
        nadpis="Cena sedí? Napište termín."
        text="Poptávka jde přímo majiteli, bez provize. Odpovíme obvykle do druhého dne."
      />
    </>
  );
}
