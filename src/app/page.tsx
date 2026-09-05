import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Galerie } from "@/components/galerie";
import { Hero } from "@/components/hero";
import { NadpisSekce } from "@/components/nadpis-sekce";
import { PruhPoptavka } from "@/components/pruh-poptavka";
import { Reveal } from "@/components/reveal";
import { Rozcestnik } from "@/components/rozcestnik";
import { VybaveniSeznam } from "@/components/vybaveni-seznam";
import { POCET_NA_HOME, galerie, rozcestnik, texty, vybaveni } from "@/lib/content";

const obal = "mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-12";

export default function Domu() {
  const ukazka = galerie.slice(0, POCET_NA_HOME);

  return (
    <>
      <Hero />

      {/* ── Úvod ─────────────────────────────────────────────────────────── */}
      <section className={`${obal} py-24 sm:py-32`}>
        <Reveal>
          <NadpisSekce stitek={texty.uvod.stitek} nadpis={texty.uvod.nadpis} />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
          <Reveal delay={0.08}>
            <div className="space-y-6">
              {texty.uvod.text.map((odstavec) => (
                <p
                  key={odstavec.slice(0, 24)}
                  className="font-display text-[1.3rem] leading-[1.65] text-kura sm:text-[1.4rem]"
                >
                  {odstavec}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <ul>
              {texty.uvod.proKoho.map((polozka) => (
                <li key={polozka.nazev} className="border-t border-kura/12 py-5">
                  <h3 className="font-body text-[0.9375rem] font-medium tracking-normal text-smrk">
                    {polozka.nazev}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-kura-svetly">
                    {polozka.text}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Vybavení ─────────────────────────────────────────────────────── */}
      <section className={`${obal} pb-24 sm:pb-32`}>
        <Reveal>
          <NadpisSekce
            stitek={texty.vybaveni.stitek}
            nadpis={texty.vybaveni.nadpis}
          />
        </Reveal>
        <VybaveniSeznam polozky={vybaveni} className="mt-12" />
      </section>

      {/* ── Fotky — proklikávací ukázka, plná galerie je na /ubytovani ────── */}
      <section className="border-y border-kura/12 bg-papir py-24 sm:py-32">
        <div className={obal}>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <NadpisSekce
                stitek={texty.galerie.stitek}
                nadpis={texty.galerie.nadpis}
              >
                <p>Kliknutím na fotku se otevře ve větším náhledu.</p>
              </NadpisSekce>
              <Link
                href="/ubytovani"
                className="group inline-flex items-center gap-2 pb-2 text-[0.9375rem] text-znacka transition-colors hover:text-smrk"
              >
                Celá galerie a dispozice
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>

          <Galerie fotky={ukazka} className="mt-14" />
        </div>
      </section>

      {/* ── Okolí — the signpost ─────────────────────────────────────────── */}
      <section className="na-tmavem relative overflow-hidden bg-smrk py-24 sm:py-32">
        <div aria-hidden className="vrstevnice absolute inset-0 opacity-[0.28]" />
        <div className={`relative ${obal}`}>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
            <Reveal>
              <NadpisSekce
                stitek={texty.okoli.stitek}
                nadpis={texty.okoli.nadpis}
                tmave
              >
                <p>{texty.okoli.text}</p>
              </NadpisSekce>
            </Reveal>

            <Rozcestnik cile={rozcestnik} className="lg:pt-3" />
          </div>
        </div>
      </section>

      <PruhPoptavka />
    </>
  );
}
