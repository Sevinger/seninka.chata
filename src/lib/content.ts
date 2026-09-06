/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  OBSAH WEBU — všechno, co se dá měnit, je v tomhle jednom souboru.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  Texty, ceny, kontakty i seznam fotek. Nikde jinde v projektu se nic
 *  psát nemusí.
 *
 *  PRAVIDLA:
 *
 *  1. Text měňte jen mezi uvozovkami "takhle".
 *  2. Nechte na místě všechny čárky a složené závorky.
 *  3. `null` znamená "zatím nevíme". Web takové místo buď schová, nebo ho
 *     označí červeně jako [DOPLNIT], aby se nedalo omylem publikovat.
 *  4. Až hodnotu doplníte, přepište `null` na "text v uvozovkách".
 *
 *  Kolik toho ještě chybí zjistíte příkazem:  npm run check-obsah
 * ═══════════════════════════════════════════════════════════════════════════
 */

/* ───────────────────────────────────────────────────────────── Web a značka */

export const site = {
  name: "Chata Seninka",
  /** Kde chata stojí — používá se v patičce a v hlavičkách stránek. */
  misto: "Nová Seninka, Staré Město pod Sněžníkem",
  kraj: "Jeseníky",
  url: "https://chataseninka.cz",
} as const;

/* ──────────────────────────────────────────────────────────────── Kontakty */

export const kontakt = {
  /** DOPLNIT: e-mail, na který mají chodit poptávky a který je v patičce. */
  email: null as string | null,

  /** DOPLNIT: telefon ve tvaru "777 123 456". */
  telefon: null as string | null,

  /** DOPLNIT: stejné číslo bez mezer a s předvolbou, pro proklik z mobilu. */
  telefonHref: null as string | null,

  /** DOPLNIT: jméno majitele nebo firmy, které se ukáže v patičce. */
  provozovatel: null as string | null,
} as const;

/**
 * DOPLNIT: odkaz na inzerát na Booking.com.
 * Dokud je `null`, tlačítka na Booking.com se na webu vůbec nezobrazí —
 * web tak nikde nemá slepý odkaz.
 */
export const bookingUrl: string | null = null;

/* ──────────────────────────────────────────────────────────────────── Cena */

export const cena = {
  castka: 2500,
  mena: "Kč",
  jednotka: "za noc",
  /** Cena je stejná celý rok, bez sezónního rozlišení. */
    poznamka: "Cena platí stejně po celý rok a vztahuje se na celou chatu.",
} as const;

/* ─────────────────────────────────────────────────────────────── Parametry */

export const parametry = [
  { hodnota: "5", popis: "lůžek" },
  { hodnota: "2", popis: "ložnice" },
  { hodnota: "2 500 Kč", popis: "za noc" },
  { hodnota: "Celá chata", popis: "jen pro vás" },
] as const;

/* ─────────────────────────────────────────────────────────────── Dispozice */

export type Podlazi = {
  stitek: string;
  nazev: string;
  popis: string;
  body: string[];
};

export const dispozice: Podlazi[] = [
  {
    stitek: "Přízemí",
    nazev: "Obývací pokoj, kuchyně a velký stůl",
    popis:
      "Jeden průchozí prostor, kde se odehrává celý den. Vaří se tu, jí a večer se sedí u krbu. Jídelní stůl je dost velký na to, aby se k němu vešli všichni najednou.",
    body: [
      "Obývací pokoj s krbem",
      "Kuchyně vybavená na běžné vaření",
      "Jídelní stůl pro celou chatu",
      "Vstup na zahradu",
    ],
  },
  {
    stitek: "Podkroví",
    nazev: "Dvě ložnice, dohromady pět lůžek",
    popis:
      "Spí se nahoře pod střechou, stranou od společné části. Rozdělení lůžek 2 + 2 + 1 vychází dobře pro rodinu i pro dvě dvojice s dítětem.",
    body: [
      "První ložnice — 2 lůžka",
      "Druhá ložnice — 2 lůžka a 1 lůžko navíc",
      "Celková kapacita 5 osob",
    ],
  },
];

/* ───────────────────────────────────────────────────────────────── Vybavení */

/** `ikona` odkazuje na sadu lucide-react, viz components/vybaveni-ikona.tsx */
export type Vybavena = {
  ikona: "wifi" | "krb" | "gril" | "zahrada" | "parkovani" | "kuchyne";
  nazev: string;
  popis: string;
};

export const vybaveni: Vybavena[] = [
  {
    ikona: "wifi",
    nazev: "Wi‑Fi přes Starlink",
    popis:
      "Satelitní připojení, které funguje i v klidném údolí mimo hlavní silnice.",
  },
  {
    ikona: "krb",
    nazev: "Krb",
    popis: "Příjemné teplo a místo, kde se dá večer v klidu posedět.",
  },
  {
    ikona: "gril",
    nazev: "Gril",
    popis: "Na zahradě je připravený pro letní vaření a posezení.",
  },
  {
    ikona: "zahrada",
    nazev: "Zahrada",
    popis: "Prostor kolem chaty pro odpočinek, hry a letní posezení.",
  },
  {
    ikona: "parkovani",
    nazev: "Parkování u chaty",
    popis: "Zaparkujete přímo u chaty, takže zavazadla nemusíte nosit daleko.",
  },
  {
    ikona: "kuchyne",
    nazev: "Plně vybavená kuchyně",
    popis: "Základní vybavení pro běžné vaření a společné stolování.",
  },
];

/* ─────────────────────────────────────────────────────────────────── Fotky */

/**
 * FOTKY
 *
 * Soubory jsou ve  public/fotky/ . Přidáte-li další, stejným způsobem sem
 * doplňte políčko `src`, např.:  src: "/fotky/chata-v-zime.webp"
 *
 * Dokud je `src` prázdné (`null`), ukáže se na jeho místě označené prázdné
 * pole se správným poměrem stran — rozvržení webu se tím nerozhodí a po
 * doplnění fotky se nic nepředělává. Aktuálně chybí jen zimní záběr a detail
 * zahrady/grilu — obojí majitel ještě nedodal.
 *
 * `alt` je popis pro čtečky pro nevidomé a pro Google. Nechte ho vyplněný.
 */
export type Fotka = {
  id: string;
  alt: string;
  /** poměr stran, aby placeholder zabral přesně tolik místa co budoucí fotka */
  pomer: "16/9" | "4/3" | "3/4" | "1/1" | "3/2";
  src: string | null;
};

/** Hlavní fotka přes celou úvodní obrazovku. */
export const fotkaHero: Fotka = {
  id: "hero",
  alt: "Chata Seninka na louce pod lesnatým hřebenem u Nové Seninky",
  pomer: "16/9",
  src: "/fotky/hero.webp",
};

/**
 * Celá galerie. Homepage z ní bere prvních `POCET_NA_HOME` fotek (viz níže) do
 * klikací ukázky, `/ubytovani` zobrazuje celou.
 */
export const galerie: Fotka[] = [
  {
    id: "exterier-1",
    alt: "Chata od příjezdové cesty, pohled na štít se sedlovou střechou",
    pomer: "4/3",
    src: "/fotky/exterier-1.webp",
  },
  {
    id: "obyvak-1",
    alt: "Obývací pokoj s jídelním stolem a pohledem do kuchyně",
    pomer: "3/2",
    src: "/fotky/obyvak-1.webp",
  },
  {
    id: "kuchyne",
    alt: "Kuchyňská linka se spotřebiči",
    pomer: "3/2",
    src: "/fotky/kuchyne.webp",
  },
  {
    id: "krb",
    alt: "Krb v obývacím pokoji",
    pomer: "3/2",
    src: "/fotky/krb.webp",
  },
  {
    id: "jidelna",
    alt: "Jídelní stůl pro celou chatu",
    pomer: "3/2",
    src: "/fotky/jidelna.webp",
  },
  {
    id: "loznice-1",
    alt: "První ložnice v podkroví",
    pomer: "3/2",
    src: "/fotky/loznice-1.webp",
  },
  {
    id: "loznice-2",
    alt: "Druhá ložnice s přistýlkou",
    pomer: "3/2",
    src: "/fotky/loznice-2.webp",
  },
  {
    id: "loznice-3",
    alt: "Ložnice v podkroví, pohled od dveří",
    pomer: "3/2",
    src: "/fotky/loznice-3.webp",
  },
  {
    id: "koupelna",
    alt: "Koupelna se sprchovým koutem",
    pomer: "3/4",
    src: "/fotky/koupelna.webp",
  },
  {
    id: "exterier-2",
    alt: "Chata mezi smrky, pohled od lesa",
    pomer: "4/3",
    src: "/fotky/exterier-2.webp",
  },
  {
    id: "okoli",
    alt: "Výhled do údolí s loukami a lesy kolem Nové Seninky",
    pomer: "4/3",
    src: "/fotky/okoli-vyhled.webp",
  },
  { id: "zahrada", alt: "Zahrada s grilem", pomer: "3/2", src: null },
  { id: "zima", alt: "Chata v zimě", pomer: "4/3", src: null },
];

/** Kolik fotek z galerie se ukáže v klikací ukázce na úvodní stránce. */
export const POCET_NA_HOME = 6;

/* ──────────────────────────────────────────────────────────── Okolí / cíle */

/**
 * ROZCESTNÍK
 *
 * Vzdálenosti jsou PŘIBLIŽNÉ a je potřeba je ověřit — proto je u nich „~“.
 * Klidně je přepište na přesnější čísla, jakmile je budete mít.
 *
 * `smer` je jen popisek („autem“, „pěšky“, „vlakem“).
 */
export type Cil = {
  nazev: string;
  detail: string;
  vzdalenost: string;
  smer: "autem" | "pěšky" | "vlakem";
};

export const rozcestnik: Cil[] = [
  {
    nazev: "Staré Město pod Sněžníkem",
    detail: "Nejbližší město — obchody, restaurace, lékař.",
    vzdalenost: "~ 5 km",
    smer: "autem",
  },
  {
    nazev: "Ski areál Kunčice",
    detail: "Sjezdovky a vlek, nejbližší lyžování v zimě.",
    vzdalenost: "~ 8 km",
    smer: "autem",
  },
  {
    nazev: "Kralický Sněžník",
    detail: "Vrchol v 1 424 m n. m., u něj pramen Moravy a socha slona.",
    vzdalenost: "~ 12 km",
    smer: "pěšky",
  },
  {
    nazev: "Hanušovice",
    detail: "Vlakové nádraží na trati Olomouc — Jeseník, a pivovar.",
    vzdalenost: "~ 20 km",
    smer: "vlakem",
  },
];

/* ────────────────────────────────────────────────────────────────── Okolí */

export const okoli = {
  leto: {
    stitek: "Léto",
    nadpis: "Z chaty se vyráží pěšky",
    text: "Značené trasy vedou přímo z údolí nahoru na hřeben. Od chaty se dá dojít na Kralický Sněžník, k prameni Moravy i po hřebeni dál — a večer se vrátit ke grilu. Kdo nechce nikam daleko, má les hned za plotem.",
  },
  zima: {
    stitek: "Zima",
    nadpis: "Sníh tu vydrží dlouho",
    text: "Nejbližší sjezdovky jsou v Kunčicích, kousek autem. Kolem chaty se dá běžkovat a na hřebeni drží sníh i tehdy, když je v nížině dávno po zimě. Do chaty se pak vracíte ke krbu.",
  },
  dojezd: {
    stitek: "Cesta k nám",
    nadpis: "Autem i vlakem",
    text: "Autem se přijede až k chatě a zaparkuje se na pozemku. Vlakem se jede na Hanušovice po trati Olomouc — Jeseník a odtud dál do Starého Města pod Sněžníkem.",
  },
} as const;

/* ──────────────────────────────────────────────── Podmínky pobytu / ceník */

/**
 * Body, které zatím nemáme od majitele. Dokud je hodnota `null`, web na
 * daném místě ukáže výrazný červený štítek [DOPLNIT], aby bylo hned vidět,
 * co ještě chybí. Nic si nevymýšlíme.
 */
export const podminky = {
  /** DOPLNIT: co všechno je v ceně (energie, povlečení, ručníky, dřevo do krbu…). */
  vCene: null as string[] | null,

  /** DOPLNIT: např. "od 15:00". */
  prijezd: null as string | null,

  /** DOPLNIT: např. "do 10:00". */
  odjezd: null as string | null,

  /** DOPLNIT: nejkratší možný pobyt, např. "2 noci". */
  minimalniPobyt: null as string | null,

  /** DOPLNIT: podmínky zrušení rezervace. */
  storno: null as string | null,

  /** DOPLNIT: vratná kauce, pokud ji vybíráte. */
  kauce: null as string | null,
} as const;

/**
 * Pravidla chaty. `potvrzeno: true` znamená, že to od majitele víme jistě
 * a web to ukáže normálně. `potvrzeno: false` = zatím jen návrh, web u toho
 * ukáže štítek [DOPLNIT].
 */
export type Pravidlo = {
  nazev: string;
  detail: string | null;
  potvrzeno: boolean;
};

export const pravidla: Pravidlo[] = [
  {
    nazev: "Zvířata nejsou povolena",
    detail: "Psy ani jiná zvířata bohužel do chaty vzít nemůžete.",
    potvrzeno: true,
  },
  {
    nazev: "Kouření",
    detail: null, // DOPLNIT
    potvrzeno: false,
  },
  {
    nazev: "Noční klid",
    detail: null, // DOPLNIT
    potvrzeno: false,
  },
  {
    nazev: "Úklid při odjezdu",
    detail: null, // DOPLNIT
    potvrzeno: false,
  },
];

/* ───────────────────────────────────────────────────────────────── Texty */

export const texty = {
  hero: {
    stitek: "Nová Seninka / Jeseníky",
    nadpis: "Chata pro pět lidí v klidném údolí Jeseníků.",
    podnadpis:
      "Celá chata jen pro vás. Krb, zahrada, les za plotem a cesty do hor hned za dveřmi.",
  },
  uvod: {
    stitek: "O chatě",
    nadpis: "Místo, kde se dá na chvíli zpomalit",
    text: [
      "Nová Seninka leží v údolí nad Starým Městem pod Sněžníkem. Kolem jsou louky, lesy a hřeben Kralického Sněžníku; zázemí pro běžný nákup najdete ve Starém Městě.",
      "Chatu si pronajímáte celou, takže máte klid a vlastní tempo. Ráno můžete vyrazit na výlet, odpoledne zůstat na zahradě a večer se sejít u krbu.",
    ],
    proKoho: [
      {
        nazev: "Pro rodiny",
        text: "Dvě ložnice, pět lůžek a dost prostoru uvnitř i venku.",
      },
      {
        nazev: "Pro dvě dvojice",
        text: "Dvě samostatné ložnice a společný obývák s kuchyní.",
      },
      {
        nazev: "Pro ty, co chtějí klid",
        text: "Klidné okolí, vlastní zahrada a internet přes Starlink, když ho potřebujete.",
      },
    ],
  },
  vybaveni: {
    stitek: "Vybavení",
    nadpis: "Co na chatě najdete",
  },
  galerie: {
    stitek: "Fotky",
    nadpis: "Podívejte se dovnitř i kolem chaty",
  },
  okoli: {
    stitek: "Okolí",
    nadpis: "Hory začínají za dveřmi",
    text: "Chata stojí v Nové Senince, části Starého Města pod Sněžníkem. Do lesa je to pár kroků, na hřeben se vyráží po značených trasách a do města sjedete autem.",
  },
  cenik: {
    stitek: "Ceník",
    nadpis: "Jednoduchý ceník",
    text: "Cena je za celou chatu a zůstává stejná po celý rok. Přesné podmínky pobytu doplníme, jakmile je potvrdíme.",
  },
  objednavky: {
    stitek: "Poptávka",
    nadpis: "Napište nám, kdy chcete přijet",
    text: "Pošlete nám termín a počet hostů. Poptávka není okamžitá rezervace; dostupnost vám potvrdíme osobně.",
  },
} as const;

/* ─────────────────────────────────────────────────────────────── Navigace */

export const navigace = [
  { href: "/", label: "Chata" },
  { href: "/ubytovani", label: "O ubytování" },
  { href: "/cenik", label: "Ceník a informace" },
  { href: "/objednavky", label: "Poptávka" },
] as const;

/* ─────────────────────────────────────────────────────────────── Pomocníci */

/** "2 500 Kč" — s pevnou mezerou, aby se číslo nikdy nezlomilo na konci řádku. */
export const cenaText = `${cena.castka.toLocaleString("cs-CZ").replace(/\s/g, " ")} ${cena.mena}`;
