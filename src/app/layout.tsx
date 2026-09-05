import type { Metadata } from "next";
import { Familjen_Grotesk, IBM_Plex_Mono, Zilla_Slab } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cena, kontakt, site } from "@/lib/content";
import "./globals.css";

/**
 * latin-ext carries ě š č ř ž ý á í é ů ú ň ť ď. Without it Czech text falls
 * back to a system face mid-word and the display type looks broken.
 *
 * Zilla Slab reads as stamped/carved lettering rather than editorial-blog
 * serif — closer to a trail sign or a survey report than a magazine, which is
 * the point of the rozcestník concept this site is built around.
 */
const zillaSlab = Zilla_Slab({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-zilla-slab",
  display: "swap",
});

const familjen = Familjen_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-familjen",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Chata Seninka — chata k pronájmu pod Kralickým Sněžníkem",
    template: "%s | Chata Seninka",
  },
  description:
    "Celá chata pro 5 osob v Nové Senince u Starého Města pod Sněžníkem. Krb, zahrada s grilem, Wi‑Fi přes Starlink a parkování u chaty. 2 500 Kč za noc, celý rok stejně.",
  keywords: [
    "chata Jeseníky",
    "chata Kralický Sněžník",
    "ubytování Staré Město pod Sněžníkem",
    "chata Nová Seninka",
    "pronájem chaty Jeseníky",
  ],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: site.url,
    siteName: site.name,
    title: "Chata Seninka — chata k pronájmu pod Kralickým Sněžníkem",
    description:
      "Celá chata pro 5 osob v Nové Senince. Krb, zahrada, Starlink. 2 500 Kč za noc.",
    images: [{ url: "/fotky/hero.webp", width: 2048, height: 1536 }],
  },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
};

/**
 * Structured data, so a search result can show the location and price.
 * Only confirmed facts go in here — anything the owner hasn't supplied yet is
 * simply left out rather than guessed at.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: site.name,
  url: site.url,
  description:
    "Chata k pronájmu pro 5 osob v Nové Senince, Staré Město pod Sněžníkem, Jeseníky.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nová Seninka, Staré Město pod Sněžníkem",
    addressRegion: "Olomoucký kraj",
    addressCountry: "CZ",
  },
  priceRange: `${cena.castka} ${cena.mena}`,
  numberOfRooms: 2,
  petsAllowed: false,
  ...(kontakt.email ? { email: kontakt.email } : {}),
  ...(kontakt.telefonHref ? { telephone: kontakt.telefonHref } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="cs"
      className={`${zillaSlab.variable} ${familjen.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          // Static, author-controlled data. `<` is escaped anyway so a stray
          // "</script>" in any future value can never close this tag early.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#obsah"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[2px] focus:bg-smrk focus:px-5 focus:py-2.5 focus:text-sm focus:text-papir"
        >
          Přejít na obsah
        </a>
        <SiteHeader />
        <main id="obsah">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
