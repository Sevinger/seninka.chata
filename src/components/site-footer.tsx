import Link from "next/link";

import { Doplnit } from "@/components/doplnit";
import { bookingUrl, kontakt, navigace, site } from "@/lib/content";

export function SiteFooter() {
  const rok = new Date().getFullYear();

  return (
    <footer className="na-tmavem border-t border-kamen/12 bg-smrk pb-9 pt-20 text-kamen sm:pt-28">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <p className="font-display text-[clamp(3.4rem,8vw,8.5rem)] leading-[0.86] tracking-[-0.045em] text-papir">
          Chata Seninka
        </p>
        <div className="mt-14 grid gap-12 border-t border-kamen/15 pt-9 md:grid-cols-[1.3fr_1fr_1fr]">
          <p className="max-w-[38ch] text-base leading-relaxed text-kamen/65">
            Celá chata pro pět lidí v Nové Senince, v klidném údolí Jeseníků. Pronajímáme ji přímo.
          </p>
          <div className="space-y-2 text-sm text-kamen/72">
            <p>{site.misto}<br />{site.kraj}</p>
            <p>{kontakt.email ? <a href={`mailto:${kontakt.email}`} className="hover:text-papir">{kontakt.email}</a> : <Doplnit co="e-mail" />}</p>
            <p>{kontakt.telefon && kontakt.telefonHref ? <a href={`tel:${kontakt.telefonHref}`} className="hover:text-papir">{kontakt.telefon}</a> : <Doplnit co="telefon" />}</p>
          </div>
          <nav aria-label="Navigace v patičce">
            <ul className="space-y-2 text-sm text-kamen/72">
              {navigace.map((polozka) => <li key={polozka.href}><Link href={polozka.href} className="hover:text-papir">{polozka.label}</Link></li>)}
              {bookingUrl ? <li><a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="hover:text-papir">Booking.com</a></li> : null}
            </ul>
          </nav>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-kamen/12 pt-6 text-xs text-kamen/42 sm:flex-row sm:justify-between">
          <p>© {rok} {kontakt.provozovatel ?? <Doplnit co="provozovatel" className="align-middle" />}</p>
          <p>{site.url.replace("https://", "")}</p>
        </div>
      </div>
    </footer>
  );
}
