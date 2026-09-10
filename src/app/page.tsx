import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FotoPas } from "@/components/foto-pas";
import { FotoPribeh } from "@/components/foto-pribeh";
import { Fotka as FotkaSlot } from "@/components/fotka";
import { Hero } from "@/components/hero";
import { PruhPoptavka } from "@/components/pruh-poptavka";
import { Rozcestnik } from "@/components/rozcestnik";
import { VybaveniSeznam } from "@/components/vybaveni-seznam";
import { galerie, rozcestnik, texty, vybaveni } from "@/lib/content";

const obal = "mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12";

export default function Domu() {
  const interier = galerie.find((fotka) => fotka.id === "obyvak-1") ?? galerie[0];
  const krajina = galerie.find((fotka) => fotka.id === "okoli") ?? galerie[0];
  const ukazka = galerie.filter((fotka) => fotka.src).slice(0, 9);

  return (
    <>
      <Hero />

      <section className={`${obal} py-24 sm:py-36 lg:py-44`}>
        <div className="grid items-center lg:grid-cols-[1.35fr_.8fr]">
          <FotkaSlot fotka={interier} pomer="4/3" sizes="(min-width: 1024px) 64vw, 92vw" className="min-h-[28rem]" />
          <div className="relative z-10 -mt-12 bg-papir px-6 py-9 sm:mx-10 sm:px-10 lg:-ml-20 lg:mr-0 lg:mt-0 lg:px-12 lg:py-14">
            <h2 className="text-[clamp(2.8rem,5.5vw,5.8rem)] font-normal leading-[0.92] tracking-[-0.04em]">{texty.uvod.nadpis}</h2>
            <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.75] text-kura-svetly">
              {texty.uvod.text.map((odstavec) => <p key={odstavec.slice(0, 28)}>{odstavec}</p>)}
            </div>
          </div>
        </div>

        <ul className="ml-auto mt-14 grid max-w-5xl border-b border-kura/15 md:grid-cols-3">
          {texty.uvod.proKoho.map((polozka) => (
            <li key={polozka.nazev} className="border-t border-kura/15 py-6 md:px-6 md:first:pl-0">
              <h3 className="font-body text-base font-medium tracking-normal">{polozka.nazev}</h3>
              <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-kura-svetly">{polozka.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="na-tmavem bg-smrk py-24 text-papir sm:py-32">
        <div className={obal}>
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
            <h2 className="max-w-[8ch] text-[clamp(3.2rem,6vw,6.7rem)] font-normal leading-[0.88] tracking-[-0.04em] text-papir">Všechno pod jednou střechou.</h2>
            <VybaveniSeznam polozky={vybaveni} tmave />
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-papir py-24 sm:py-32">
        <div className={`${obal} flex flex-wrap items-end justify-between gap-8`}>
          <h2 className="max-w-[12ch] text-[clamp(3.2rem,6.6vw,7rem)] font-normal leading-[0.9] tracking-[-0.04em]">{texty.galerie.nadpis}</h2>
          <Link href="/ubytovani" className="group inline-flex items-center gap-2 pb-2 text-sm text-kura-svetly hover:text-smrk">
            Celá galerie a dispozice
            <ArrowRight size={17} aria-hidden className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <FotoPas fotky={ukazka} />
      </section>

      <FotoPribeh fotka={krajina} nadpis="Ráno rovnou do hor." text="Nová Seninka leží na konci údolí pod Kralickým Sněžníkem. Od chaty se dá vyrazit pěšky do lesa, na horské trasy i jen na krátkou procházku mezi loukami." />

      <section className={`${obal} py-24 sm:py-36`}>
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div>
            <h2 className="max-w-[9ch] text-[clamp(3rem,5.4vw,5.8rem)] font-normal leading-[0.92] tracking-[-0.04em]">{texty.okoli.nadpis}</h2>
            <p className="mt-7 max-w-[40ch] text-base leading-relaxed text-kura-svetly">{texty.okoli.text}</p>
          </div>
          <Rozcestnik cile={rozcestnik} />
        </div>
      </section>

      <PruhPoptavka />
    </>
  );
}
