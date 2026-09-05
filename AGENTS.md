# Chata Seninka — poznámky pro vývoj

Marketingový web pro pronájem jedné chaty. Klient je nefiremní osoba bez
technického zázemí, takže **jednoduchost kódu je vlastnost, ne kompromis**.
Než přidáte abstrakci, zvažte, jestli ji ten web opravdu potřebuje.

## Železná pravidla

1. **Obsah patří do `src/lib/content.ts`.** Žádné texty, ceny ani kontakty
   natvrdo v komponentách. Klient má upravovat jeden soubor, ne deset.

2. **Nevymýšlet fakta.** Ceny, časy, storno podmínky ani co je v ceně si
   nedomýšlíme. Co nevíme, je `null` a web na tom místě ukáže `<Doplnit />`.
   Radši viditelně chybějící údaj než tiše vymyšlený.

3. **Potvrzená fakta neměnit:** kapacita 5, dispozice (přízemí obývák + kuchyň
   + jídelní stůl, podkroví 2 ložnice 2+2+1), cena 2 500 Kč/noc po celý rok za
   celou chatu, vybavení (Starlink Wi‑Fi, krb, gril, zahrada, parkování),
   zvířata nejsou povolena.

4. **Animace zůstávají jemné.** Klient výslovně nechce „mega animace“.
   Prolnutí při scrollu (`<Reveal />`) a 8% parallax v hlavičce je strop.
   Všechno respektuje `prefers-reduced-motion`.

5. **Před předáním spustit `npm run check-obsah`.** Vypíše, co ještě chybí, a
   skončí nenulovým kódem — dá se tím zarazit nasazení nedodělaného webu.

## Vizuální systém

Metafora je **turistická mapa a rozcestník**. Podklad tlumený, struktura
smrkově zelená, a **jedna** sytá barva — červená turistická značka
(`--color-znacka`) — výhradně pro navigaci: hlavní tlačítka, aktivní položka
v menu, štítky `[DOPLNIT]`. Když se červená objeví někde jinde, systém přestane
fungovat.

Tokeny jsou v `src/app/globals.css` v bloku `@theme`, pojmenované česky
(`kamen`, `papir`, `smrk`, `mech`, `kura`, `znacka`).

Podpisový prvek je `<Rozcestnik />` — směrovky ve tvaru šipek. Nepřidávejte
další „výrazný“ prvek; ten jeden má zůstat jediný.

Data (vzdálenosti, ceny, čísla) sázíme monospacem přes utilitu `udaj`. To je
to, co web odlišuje od běžné teplé šablony pro ubytování.

Nadpisy jsou **Zilla Slab** — slab serif, čte se jako vyražený nápis na
rozcestníku, ne jako titulek blogu. Vyhýbáme se běžným „AI defaultům“
(Newsreader, Fraunces apod.).

**Žádné kulaté tečky.** Odrážky v seznamech, značka u `<Doplnit />` i
oddělovače v textu (`Nová Seninka / Jeseníky`) jsou hranaté — malý svislý tick
(`h-* w-[3px] bg-*`, bez `rounded`) nebo lomítko. Kulatý `rounded-full` smí
zůstat jen u dvou věcí, které jsou funkční, ne dekorativní: tyč rozcestníku
(`rozcestnik.tsx`) a bublina s fajfkou po odeslání formuláře
(`formular-poptavky.tsx`).

## Fotky

13 fotek od klienta je v `public/fotky/` (WebP, viz `content.ts`). Chybí ještě
jen zimní záběr a detail zahrady/grilu — jejich sloty (`zahrada`, `zima`)
zůstávají `src: null`, dokud majitel nedodá.

`Fotka` s `src: null` vykreslí navržený placeholder ve správném poměru stran —
layout se doplněním fotky nemění. Placeholder má `bezPopisku`, když nad ním
leží jiný text (hlavička).

Poměr stran se dá přebít propem `pomer` — na obou galeriích (`/` i
`/ubytovani`) se používá `<Galerie />` (masonry grid + lightbox), homepage jen
bere prvních `POCET_NA_HOME` fotek. Fotka bez `src` se v `<Galerie />`
nezobrazí jako klikatelná — lightbox nikdy neotevře prázdné místo.

## Formulář

`src/app/actions.ts` je server action se třemi režimy podle konfigurace:
Resend → mailto → chyba. Validuje se na klientu i na serveru (post může přijít
i bez formuláře). Honeypot `firma` vrací úspěch, aby se robot nic nedozvěděl.

Ověřeno funkčně: validace dat i e-mailu, mailto fallback i chování při
neplatném Resend klíči.
