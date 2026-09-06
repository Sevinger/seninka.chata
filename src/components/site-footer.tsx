import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Doplnit } from "@/components/doplnit";
import { Znacka } from "@/components/znacka";
import { bookingUrl, kontakt, navigace, site } from "@/lib/content";

export function SiteFooter() {
  const rok = new Date().getFullYear();

  return (
    <footer className="na-tmavem bg-smrk pb-10 pt-20 text-kamen sm:pt-24">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Znacka tmave />
              <span className="udaj text-[0.8125rem] font-medium uppercase tracking-[0.2em] text-papir">
                {site.name}
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-kamen/70">
              Celá chata pro pět lidí v Nové Senince, v klidném údolí Jeseníků.
              Pronajímáme ji přímo.
            </p>
          </div>

          <div>
            <h2 className="eyebrow text-mech-svetly">Kontakt</h2>
            <ul className="mt-5 space-y-3.5 text-[0.9375rem]">
              <li className="flex items-start gap-3">
                <MapPin size={17} strokeWidth={1.5} aria-hidden className="mt-0.5 shrink-0 text-mech" />
                <span className="text-kamen/80">
                  {site.misto}
                  <br />
                  {site.kraj}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={17} strokeWidth={1.5} aria-hidden className="mt-0.5 shrink-0 text-mech" />
                {kontakt.email ? (
                  <a
                    href={`mailto:${kontakt.email}`}
                    className="text-kamen/80 underline decoration-mech/50 underline-offset-4 transition-colors hover:text-papir"
                  >
                    {kontakt.email}
                  </a>
                ) : (
                  <Doplnit co="e-mail" />
                )}
              </li>
              <li className="flex items-start gap-3">
                <Phone size={17} strokeWidth={1.5} aria-hidden className="mt-0.5 shrink-0 text-mech" />
                {kontakt.telefon && kontakt.telefonHref ? (
                  <a
                    href={`tel:${kontakt.telefonHref}`}
                    className="udaj text-kamen/80 underline decoration-mech/50 underline-offset-4 transition-colors hover:text-papir"
                  >
                    {kontakt.telefon}
                  </a>
                ) : (
                  <Doplnit co="telefon" />
                )}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-mech-svetly">Stránky</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              {navigace.map((polozka) => (
                <li key={polozka.href}>
                  <Link
                    href={polozka.href}
                    className="text-kamen/80 transition-colors hover:text-papir"
                  >
                    {polozka.label}
                  </Link>
                </li>
              ))}
              {bookingUrl ? (
                <li>
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-kamen/80 transition-colors hover:text-papir"
                  >
                    Booking.com
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-kamen/12 pt-7 text-[0.8125rem] text-kamen/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="udaj">
            © {rok}{" "}
            {kontakt.provozovatel ?? <Doplnit co="provozovatel" className="align-middle" />}
          </p>
          <p>{site.url.replace("https://", "")}</p>
        </div>
      </div>
    </footer>
  );
}
