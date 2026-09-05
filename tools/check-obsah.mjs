/**
 * Kontrola obsahu — vypíše všechno, co ještě chybí.
 *
 *   npm run check-obsah
 *
 * Čte přímo src/lib/content.ts (Node umí TypeScript odbavit sám), takže se
 * seznam nikdy nerozejde se skutečným obsahem webu. Pokud něco chybí, skončí
 * s nenulovým kódem — dá se tím tedy zarazit nasazení nedodělaného webu.
 */

import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const cesta = pathToFileURL(resolve(import.meta.dirname, "../src/lib/content.ts"));
const obsah = await import(cesta.href);

const chybi = [];
const varovani = [];

function zkontroluj(hodnota, popis, kde) {
  if (hodnota === null || hodnota === undefined || hodnota === "") {
    chybi.push({ popis, kde });
  }
}

const { kontakt, bookingUrl, podminky, pravidla, fotkaHero, galerie } = obsah;

zkontroluj(kontakt.email, "E-mail pro poptávky a patičku", "kontakt.email");
zkontroluj(kontakt.telefon, "Telefon", "kontakt.telefon");
zkontroluj(kontakt.telefonHref, "Telefon pro proklik (bez mezer)", "kontakt.telefonHref");
zkontroluj(kontakt.provozovatel, "Provozovatel do patičky", "kontakt.provozovatel");
zkontroluj(bookingUrl, "Odkaz na inzerát na Booking.com", "bookingUrl");

zkontroluj(podminky.vCene, "Co je v ceně zahrnuto", "podminky.vCene");
zkontroluj(podminky.prijezd, "Čas příjezdu (check-in)", "podminky.prijezd");
zkontroluj(podminky.odjezd, "Čas odjezdu (check-out)", "podminky.odjezd");
zkontroluj(podminky.minimalniPobyt, "Nejkratší možný pobyt", "podminky.minimalniPobyt");
zkontroluj(podminky.storno, "Storno podmínky", "podminky.storno");
zkontroluj(podminky.kauce, "Kauce", "podminky.kauce");

for (const pravidlo of pravidla) {
  if (!pravidlo.potvrzeno || !pravidlo.detail) {
    chybi.push({
      popis: `Pravidlo „${pravidlo.nazev}" — znění a potvrzení`,
      kde: "pravidla",
    });
  }
}

const vsechnyFotky = [fotkaHero, ...galerie];
const bezFotky = vsechnyFotky.filter((f) => !f.src);
if (bezFotky.length > 0) {
  varovani.push(
    `Fotky: ${bezFotky.length} z ${vsechnyFotky.length} zatím chybí (${bezFotky
      .map((f) => f.id)
      .join(", ")})`
  );
}

const zeleny = "[32m";
const cerveny = "[31m";
const zluty = "[33m";
const seda = "[90m";
const konec = "[0m";

console.log("");
if (chybi.length === 0) {
  console.log(`${zeleny}✓ Všechny povinné údaje jsou vyplněné.${konec}`);
} else {
  console.log(`${cerveny}Chybí ${chybi.length} údajů:${konec}\n`);
  for (const { popis, kde } of chybi) {
    console.log(`  ${cerveny}•${konec} ${popis}  ${seda}(${kde})${konec}`);
  }
  console.log(`\n${seda}Doplňte je v src/lib/content.ts${konec}`);
}

for (const zprava of varovani) {
  console.log(`\n${zluty}⚠ ${zprava}${konec}`);
  console.log(`${seda}  Soubory patří do public/fotky/, cestu doplňte do galerie.${konec}`);
}
console.log("");

process.exit(chybi.length > 0 ? 1 : 0);
