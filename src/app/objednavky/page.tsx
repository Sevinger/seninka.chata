import type { Metadata } from "next";
import { ExternalLink, Mail, Phone } from "lucide-react";

import { Doplnit } from "@/components/doplnit";
import { FormularPoptavky } from "@/components/formular-poptavky";
import { HlavickaStranky } from "@/components/hlavicka-stranky";
import { Reveal } from "@/components/reveal";
import { bookingUrl, cena, cenaText, kontakt, texty } from "@/lib/content";

export const metadata: Metadata = {
  title: "Poptávka termínu",
  description:
    "Napište nám termín a počet hostů. Poptávka jde přímo majiteli chaty. Není to okamžitá rezervace; dostupnost potvrdíme v odpovědi.",
  robots: { index: true, follow: true },
};

/**
 * A genuine sequence, so it's genuinely numbered. The steps exist to set the
 * expectation the brief asks for: this is an enquiry, not a confirmed booking.
 */
const kroky = [
  {
    cislo: "01",
    nadpis: "Napíšete termín",
    text: "Vyplníte formulář a odešlete nám svou poptávku. Tím se zatím nic nerezervuje ani neplatí.",
  },
  {
    cislo: "02",
    nadpis: "Ozveme se vám",
    text: "Obvykle do druhého dne. Ověříme, jestli je termín volný, a potvrdíme ho.",
  },
  {
    cislo: "03",
    nadpis: "Domluvíme zbytek",
    text: "Platbu a předání klíčů si domluvíme e‑mailem nebo telefonem.",
  },
];

export default function Objednavky() {
  return (
    <>
      <HlavickaStranky
        stitek={texty.objednavky.stitek}
        nadpis={texty.objednavky.nadpis}
      >
        <p>{texty.objednavky.text}</p>
      </HlavickaStranky>

      <section className="mx-auto max-w-[86rem] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal>
            <FormularPoptavky />
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="space-y-10">
              {/* price reminder */}
              <div className="border-t-2 border-smrk pt-6">
                <p className="eyebrow">Cena</p>
                <p className="udaj mt-3 text-3xl text-smrk">{cenaText}</p>
                <p className="mt-1 text-[0.9375rem] text-kura-svetly">
                  {cena.jednotka} za celou chatu, až 5 osob.
                </p>
              </div>

              {/* how it works */}
              <div>
                <p className="eyebrow">Jak to funguje</p>
                <ol className="mt-5">
                  {kroky.map((krok) => (
                    <li
                      key={krok.cislo}
                      className="flex gap-4 border-t border-kura/12 py-5"
                    >
                      <span className="udaj shrink-0 text-[0.8125rem] text-znacka">
                        {krok.cislo}
                      </span>
                      <div>
                        <h2 className="font-body text-[0.9375rem] font-medium tracking-normal text-smrk">
                          {krok.nadpis}
                        </h2>
                        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-kura-svetly">
                          {krok.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* the other path */}
              {bookingUrl ? (
                <div className="border border-kura/15 bg-papir p-6">
                  <p className="eyebrow">Raději přes Booking?</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-kura-svetly">
                    Chata je i na Booking.com. Rezervace tam je okamžitá, ale
                    část ceny padne na provizi.
                  </p>
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] text-znacka underline decoration-znacka/30 underline-offset-4 transition-colors hover:decoration-znacka"
                  >
                    Otevřít inzerát na Booking.com
                    <ExternalLink size={15} aria-hidden />
                  </a>
                </div>
              ) : null}

              {/* direct contact */}
              <div className="border-t border-kura/12 pt-6">
                <p className="eyebrow">Nebo napište přímo</p>
                <ul className="mt-4 space-y-3 text-[0.9375rem]">
                  <li className="flex items-start gap-3">
                    <Mail
                      size={17}
                      strokeWidth={1.5}
                      aria-hidden
                      className="mt-0.5 shrink-0 text-mech"
                    />
                    {kontakt.email ? (
                      <a
                        href={`mailto:${kontakt.email}`}
                        className="text-kura underline decoration-kura/25 underline-offset-4 transition-colors hover:text-smrk"
                      >
                        {kontakt.email}
                      </a>
                    ) : (
                      <Doplnit co="e-mail" />
                    )}
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone
                      size={17}
                      strokeWidth={1.5}
                      aria-hidden
                      className="mt-0.5 shrink-0 text-mech"
                    />
                    {kontakt.telefon && kontakt.telefonHref ? (
                      <a
                        href={`tel:${kontakt.telefonHref}`}
                        className="udaj text-kura underline decoration-kura/25 underline-offset-4 transition-colors hover:text-smrk"
                      >
                        {kontakt.telefon}
                      </a>
                    ) : (
                      <Doplnit co="telefon" />
                    )}
                  </li>
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
