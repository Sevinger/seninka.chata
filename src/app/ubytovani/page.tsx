import type { Metadata } from "next";

import { Galerie } from "@/components/galerie";
import { HlavickaStranky } from "@/components/hlavicka-stranky";
import { NadpisSekce } from "@/components/nadpis-sekce";
import { PruhPoptavka } from "@/components/pruh-poptavka";
import { Reveal } from "@/components/reveal";
import { Rozcestnik } from "@/components/rozcestnik";
import { VybaveniSeznam } from "@/components/vybaveni-seznam";
import {
  dispozice,
  galerie,
  okoli,
  parametry,
  rozcestnik,
  texty,
  vybaveni,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "O ubytování",
  description:
    "Dispozice chaty: přízemí s obývacím pokojem, kuchyní a krbem, v podkroví dvě ložnice s pěti lůžky. Vybavení, fotogalerie a okolí v Jeseníkách.",
};

const obal = "mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-12";

export default function Ubytovani() {
  return (
    <>
      <HlavickaStranky
        stitek="O ubytování"
        nadpis="Dřevěná chata na dvou podlažích, celá vaše"
        udaje={parametry}
      >
        <p>
          Přízemí je společné — vaří se tam, jí a sedí u krbu. Nahoře se spí.
          Nic se s nikým nesdílí, protože tu nikdo jiný není.
        </p>
      </HlavickaStranky>

      {/* ── Dispozice ────────────────────────────────────────────────────── */}
      <section className={`${obal} pb-24 sm:pb-32`}>
        <div className="grid gap-14 md:grid-cols-2 md:gap-16">
          {dispozice.map((podlazi, i) => (
            <Reveal key={podlazi.stitek} delay={i * 0.1}>
              <article className="h-full border-t-2 border-smrk pt-7">
                <div className="udaj text-[0.6875rem] uppercase tracking-[0.18em] text-znacka">
                  {podlazi.stitek}
                </div>
                <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.05rem)] font-normal">
                  {podlazi.nazev}
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-kura-svetly">
                  {podlazi.popis}
                </p>
                <ul className="mt-7 space-y-0">
                  {podlazi.body.map((bod) => (
                    <li
                      key={bod}
                      className="flex items-baseline gap-3 border-t border-kura/12 py-3 text-[0.9375rem] text-kura"
                    >
                      {/* a tick, not a bullet dot — matches the doplnit badge */}
                      <span
                        aria-hidden
                        className="h-3 w-[3px] shrink-0 translate-y-0.5 bg-mech"
                      />
                      {bod}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Vybavení ─────────────────────────────────────────────────────── */}
      <section className="na-tmavem bg-smrk py-24 sm:py-32">
        <div className={obal}>
          <Reveal>
            <NadpisSekce
              stitek={texty.vybaveni.stitek}
              nadpis={texty.vybaveni.nadpis}
              tmave
            />
          </Reveal>
          <VybaveniSeznam polozky={vybaveni} tmave className="mt-12" />
        </div>
      </section>

      {/* ── Galerie ──────────────────────────────────────────────────────── */}
      <section className={`${obal} py-24 sm:py-32`}>
        <Reveal>
          <NadpisSekce stitek={texty.galerie.stitek} nadpis="Fotogalerie">
            <p>
              Kliknutím se fotka zvětší. Šipkami se prochází celá galerie.
            </p>
          </NadpisSekce>
        </Reveal>
        <Galerie fotky={galerie} className="mt-14" />
      </section>

      {/* ── Okolí ────────────────────────────────────────────────────────── */}
      <section className="na-tmavem relative overflow-hidden border-t border-kamen/10 bg-smrk py-24 sm:py-32">
        <div aria-hidden className="vrstevnice absolute inset-0 opacity-[0.28]" />
        <div className={`relative ${obal}`}>
          <Reveal>
            <NadpisSekce stitek={texty.okoli.stitek} nadpis="Co je kolem" tmave>
              <p>{texty.okoli.text}</p>
            </NadpisSekce>
          </Reveal>

          <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div>
              {[okoli.leto, okoli.zima, okoli.dojezd].map((blok, i) => (
                <Reveal key={blok.stitek} delay={i * 0.08}>
                  <article className="border-t border-kamen/15 py-7">
                    <div className="udaj text-[0.6875rem] uppercase tracking-[0.18em] text-mech-svetly">
                      {blok.stitek}
                    </div>
                    <h3 className="mt-2.5 text-[1.35rem] font-normal text-papir">
                      {blok.nadpis}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-kamen/70">
                      {blok.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <div>
              <p className="eyebrow mb-5 text-mech-svetly">Rozcestník</p>
              <Rozcestnik cile={rozcestnik} />
              <p className="mt-6 pl-4 text-[0.8125rem] text-kamen/45 sm:pl-6">
                Vzdálenosti jsou přibližné.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PruhPoptavka />
    </>
  );
}
