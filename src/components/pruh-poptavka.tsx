import { ArrowRight, ExternalLink } from "lucide-react";

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
    <section className="na-tmavem bg-smrk">
      <div className="mx-auto max-w-[92rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="max-w-[11ch] text-[clamp(3rem,6.4vw,6.8rem)] font-normal leading-[0.9] tracking-[-0.04em] text-papir">
                {nadpis}
              </h2>
              <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-kamen/65">
                {text}
              </p>
            </div>

            <div className="shrink-0">
              <p className="text-sm text-kamen/60">
                <span className="mr-2 font-display text-3xl text-papir">{cenaText}</span> {cena.jednotka}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Tlacitko href="/objednavky">
                  Poptat termín
                  <ArrowRight size={17} aria-hidden />
                </Tlacitko>
                {bookingUrl ? (
                  <Tlacitko href={bookingUrl} varianta="vedlejsi-tmave" externi>
                    Booking.com
                    <ExternalLink size={16} aria-hidden />
                  </Tlacitko>
                ) : null}
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
