import type { Metadata } from "next";

import { Fotka } from "@/components/fotka";
import { Galerie } from "@/components/galerie";
import { HlavickaStranky } from "@/components/hlavicka-stranky";
import { PruhPoptavka } from "@/components/pruh-poptavka";
import { Rozcestnik } from "@/components/rozcestnik";
import { VybaveniSeznam } from "@/components/vybaveni-seznam";
import { dispozice, galerie, okoli, parametry, rozcestnik, vybaveni } from "@/lib/content";

export const metadata: Metadata = {
  title: "O ubytování",
  description: "Dispozice chaty, dvě ložnice s pěti lůžky, vybavení, fotogalerie a okolí v Jeseníkách.",
};

const obal = "mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12";

export default function Ubytovani() {
  const fotografie = [
    galerie.find((fotka) => fotka.id === "obyvak-1") ?? galerie[0],
    galerie.find((fotka) => fotka.id === "loznice-1") ?? galerie[0],
  ];

  return (
    <>
      <HlavickaStranky stitek="O ubytování" nadpis="Dřevěná chata na dvou podlažích, celá vaše" udaje={parametry}>
        <p>Přízemí je společné — vaří se tam, jí a sedí u krbu. Nahoře se spí. Nic se s nikým nesdílí, protože chata patří po dobu pobytu jen vám.</p>
      </HlavickaStranky>

      <section className={`${obal} pb-28 sm:pb-36`}>
        <div className="space-y-24 sm:space-y-32">
          {dispozice.map((podlazi, index) => (
            <article key={podlazi.stitek} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <Fotka fotka={fotografie[index]} pomer="4/3" sizes="(min-width: 1024px) 48vw, 92vw" className={index % 2 ? "lg:order-2" : ""} />
              <div>
                <p className="text-sm text-kura/45">{podlazi.stitek}</p>
                <h2 className="mt-4 text-[clamp(2.4rem,4.5vw,4.8rem)] font-normal leading-[0.94] tracking-[-0.035em]">{podlazi.nazev}</h2>
                <p className="mt-6 max-w-[48ch] text-base leading-[1.75] text-kura-svetly">{podlazi.popis}</p>
                <ul className="mt-8 border-b border-kura/15">
                  {podlazi.body.map((bod) => <li key={bod} className="border-t border-kura/15 py-3.5 text-sm">{bod}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="na-tmavem bg-smrk py-24 sm:py-32">
        <div className={obal}>
          <h2 className="max-w-[10ch] text-[clamp(3rem,5.6vw,6rem)] font-normal leading-[0.9] tracking-[-0.04em] text-papir">Co na chatě najdete</h2>
          <VybaveniSeznam polozky={vybaveni} tmave className="mt-14" />
        </div>
      </section>

      <section className={`${obal} py-24 sm:py-36`}>
        <h2 className="text-[clamp(3rem,6vw,6.4rem)] font-normal leading-[0.9] tracking-[-0.04em]">Fotogalerie</h2>
        <p className="mt-5 text-base text-kura-svetly">Kliknutím fotku zvětšíte. Mezi snímky se dá přecházet šipkami.</p>
        <Galerie fotky={galerie} className="mt-14" />
      </section>

      <section className="bg-papir py-24 sm:py-32">
        <div className={`${obal} grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-24`}>
          <div>
            <h2 className="text-[clamp(3rem,5.5vw,5.8rem)] font-normal leading-[0.92] tracking-[-0.04em]">Co je kolem</h2>
            {[okoli.leto, okoli.zima, okoli.dojezd].map((blok) => (
              <div key={blok.stitek} className="mt-7 border-t border-kura/15 pt-5">
                <h3 className="font-body text-base font-medium tracking-normal">{blok.nadpis}</h3>
                <p className="mt-2 text-sm leading-relaxed text-kura-svetly">{blok.text}</p>
              </div>
            ))}
          </div>
          <Rozcestnik cile={rozcestnik} />
        </div>
      </section>

      <PruhPoptavka />
    </>
  );
}
