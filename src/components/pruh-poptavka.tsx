import { ArrowRight, ExternalLink } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { Tlacitko } from "@/components/tlacitko";
import { bookingUrl, cenaText, cena } from "@/lib/content";

/**
 * The closing band, repeated at the foot of every page. Direct enquiry is the
 * primary path — it costs the owner nothing — with Booking.com offered beside
 * it for visitors who would rather book somewhere they already have an account.
 */
export function PruhPoptavka({
  nadpis = "Máte termín? Napište nám.",
  text = "Poptávka jde přímo majiteli. Odpovíme obvykle do druhého dne a domluvíme se bez provize.",
}: {
  nadpis?: string;
  text?: string;
}) {
  return (
    <section className="border-t border-kura/12 bg-papir">
      <div className="mx-auto max-w-[86rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">Rezervace</span>
              <h2 className="mt-5 text-[clamp(1.85rem,4vw,2.75rem)] font-normal">
                {nadpis}
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-kura-svetly">
                {text}
              </p>
            </div>

            <div className="shrink-0">
              <p className="udaj text-sm text-kura-svetly">
                <span className="text-2xl text-smrk">{cenaText}</span> {cena.jednotka}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Tlacitko href="/objednavky">
                  Rezervovat termín
                  <ArrowRight size={17} aria-hidden />
                </Tlacitko>
                {bookingUrl ? (
                  <Tlacitko href={bookingUrl} varianta="vedlejsi" externi>
                    Booking.com
                    <ExternalLink size={16} aria-hidden />
                  </Tlacitko>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
