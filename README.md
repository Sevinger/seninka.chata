# Chata Seninka

Web pro pronájem chaty v Nové Senince (Staré Město pod Sněžníkem, Jeseníky).
Čtyři stránky, poptávkový formulář na e-mail, žádná administrace.

**Doména:** chataseninka.cz · **Hosting:** Vercel

---

## Co ještě chybí od majitele

Web je hotový, ale pár údajů zatím nemáme. Na místech, kde chybí, svítí červený
štítek **[DOPLNIT]** — schválně nápadně, aby se web nedal omylem publikovat
nedodělaný.

Aktuální seznam kdykoli vypíšete příkazem:

```bash
npm run check-obsah
```

Fotky od majitele už dorazily a jsou na webu (13 fotek — exteriér, obývák
s krbem, kuchyně, koupelna, tři ložnice, výhled do okolí). Chybí ještě jen
zimní záběr a detail zahrady s grilem — místa pro ně jsou v galerii
připravená, doplní se stejným způsobem přes `src/lib/content.ts`.

Zatím čekáme na:

| Co | Kam se to doplní |
| --- | --- |
| Odkaz na inzerát na Booking.com | `bookingUrl` |
| E-mail a telefon | `kontakt` |
| Jméno provozovatele do patičky | `kontakt.provozovatel` |
| Co je v ceně (energie, povlečení, ručníky, dřevo…) | `podminky.vCene` |
| Časy příjezdu a odjezdu | `podminky.prijezd`, `podminky.odjezd` |
| Nejkratší pobyt, kauce, storno podmínky | `podminky` |
| Pravidla ke kouření, nočnímu klidu a úklidu | `pravidla` |

Navíc: **vzdálenosti v rozcestníku jsou přibližné** (proto je u nich „~“).
Až je majitel potvrdí, přepište je v `rozcestnik`.

Dokud `bookingUrl` chybí, tlačítka na Booking.com se nikde nezobrazí — web tedy
nemá žádný slepý odkaz. Jakmile ho doplníte, objeví se samy.

---

## Úpravy obsahu

**Všechny texty, ceny, kontakty i seznam fotek jsou v jediném souboru:**

```
src/lib/content.ts
```

Nikde jinde se nic psát nemusí. V souboru jsou u každé části komentáře.
Pravidla jsou tři:

1. Text měňte jen mezi uvozovkami `"takhle"`.
2. Čárky a složené závorky nechte na místě.
3. `null` znamená „zatím nevíme“. Přepište ho na `"text v uvozovkách"`.

### Přidání fotek

1. Soubory nahrajte do `public/fotky/` (klidně `chata-zvenku.jpg`).
2. V `src/lib/content.ts` doplňte cestu do `src`:

```ts
{ id: "exterier", alt: "Chata zvenku", pomer: "4/3", src: "/fotky/chata-zvenku.jpg" },
```

Dokud je `src: null`, ukáže se na místě fotky označené prázdné pole se správným
poměrem stran. **Rozvržení webu se doplněním fotek nerozhodí** — místo je pro ně
připravené předem.

`pomer` říká, jaký tvar fotka má: `"16/9"`, `"4/3"`, `"3/2"` (na šířku),
`"3/4"` (na výšku), `"1/1"` (čtverec). Vyberte ten, který sedí, ať se fotka
zbytečně neořízne.

---

## Poptávkový formulář

Formulář **neposílá rezervaci** — pošle majiteli e-mail s termínem a kontaktem.
Dostupnost si majitel hlídá sám, potvrzuje ručně. Tak je to i napsané na webu,
aby to host čekal.

Kontroluje se jméno, platný e-mail, obě data a že odjezd je až po příjezdu —
a to jak v prohlížeči, tak znovu na serveru. Proti robotům je ve formuláři
skryté pole (honeypot), které člověk nevidí.

Nastavení odesílání je v [`.env.example`](.env.example). Ve zkratce:

- **jen adresa příjemce** → hostovi se otevře jeho vlastní e-mail s předvyplněnou
  poptávkou. Funguje hned.
- **+ `RESEND_API_KEY`** → poptávka odejde sama na pozadí. Cílový stav.

Když odeslání selže, host to uvidí a dostane telefon (jakmile ho doplníte).
Poptávka se nikdy „tiše neztratí“.

---

## Vývoj

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # produkční build
npm run check-obsah  # co ještě chybí doplnit
npm test             # pohyb a fotografický pás
npm run lint
```

Node 20+.

### Nasazení na Vercel

1. Repozitář připojit ve Vercelu (framework se detekuje sám).
2. V **Settings → Environment Variables** vyplnit proměnné z `.env.example`.
3. V **Settings → Domains** přidat `chataseninka.cz`, DNS nasměrovat na Vercel.
4. Po každém pushi do `main` se web nasadí sám.

---

## Jak je to postavené

- **Next.js 16** (App Router) + **React 19**, TypeScript
- **Tailwind CSS v4** — barvy a fonty jsou v `src/app/globals.css` v bloku `@theme`
- **Resend** pro odeslání poptávky
- **framer-motion** — pohyb hero média a jedné krajinné scény při scrollu
- Bez databáze, bez administrace, bez přihlašování

```
src/
  app/
    page.tsx           úvodní stránka
    ubytovani/         O ubytování — dispozice, vybavení, galerie, okolí
    cenik/             Ceník a informace
    objednavky/        Poptávka + formulář
    actions.ts         odeslání poptávky (server)
    globals.css        barvy, fonty, sdílené utility
  components/          sdílené kusy stránek
  lib/content.ts       ← VEŠKERÝ OBSAH
tools/
  check-obsah.mjs      kontrola, co ještě chybí
```

### Vizuální styl

Web je postavený jako fotografický příběh konkrétního místa. Úvod tvoří
letecká videosmyčka, velká editoriální typografie a jediná hlavní akce.
Další fotografie se střídají v asymetrických kompozicích, horizontálním pásu
a jedné široké krajinné scéně. Praktické informace nejsou schované v
dekorativních kartách ani bublinách.

Písma: **Fraunces** pro výrazné nadpisy, **DM Sans** pro běžný text a
**IBM Plex Mono** pouze tam, kde pomáhá čitelnosti údajů. Všechna mají
latin-ext, takže česká diakritika sedí.

Animace respektují systémové nastavení „omezit pohyb“. V takovém případě se
hero video skryje a zůstane fotografie, scrollové transformace se zastaví.

### Hero video

Homepage používá dvě krátké H.264 smyčky v `public/video/`:

- `seninka-hero-desktop.mp4` — 1600 × 900 px, přibližně 3,3 MB,
- `seninka-hero-mobile.mp4` — 720 × 960 px, přibližně 1,6 MB.

Zdrojové video zůstává mimo Git. Nové varianty se vytvoří příkazem:

```bash
tools/render-hero-video.sh "/cesta/k/Nová Seninka - chata v1.0. bez hudby.mp4"
```

Skript vybere úvodní letecký záběr, vytvoří vratnou smyčku a exportuje MP4
s rychlým startem pro web. `public/fotky/hero.webp` slouží jako poster a jako
náhrada při vypnutých animacích nebo zablokovaném autoplay. Původní velké
video se do repozitáře nikdy nepřidává.
