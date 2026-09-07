# Chata Seninka — filmový editoriální redesign

## Cíl

Posunout web z čisté ubytovací prezentace na zapamatovatelný, fotografický web o konkrétním místě. Video a fotografie mají nést atmosféru, typografie má dát webu vlastní hlas a motion má reagovat na scroll nebo kliknutí. Rezervace a praktické informace musí zůstat snadno dostupné.

## Materiály

Zdrojový balík obsahuje 43 fotografií ve velikostech vhodných pro tisk i web a dvě přibližně 588MB MP4 verze videa chaty. Pro web se použije video bez hudby. Zdrojové soubory zůstanou mimo repozitář; do `public/video/` se uloží pouze optimalizované výřezy.

## Vizuální směr

- Základ tvoří přírodní bílá, uhlová černá, šedá a tlumený lišejníkový odstín.
- Fraunces zůstává jako výrazný display font. Nadpisy budou větší, kratší a použité jako součást kompozice fotografie.
- DM Sans zůstává pro běžný a praktický text.
- Odstraní se datový pruh pod hero, opakované sekční konstrukce a pravidelný rytmus bloků.
- Každá hlavní část dostane jinou, ale související kompozici: celoplošný film, text vedle fotografie, překrývaný obraz a horizontální galerii.

## Hero

Hero bude tvořit krátká videosmyčka bez zvuku, ovládacích prvků a rušivých střihů. Video se spustí automaticky pouze s `muted`, `playsInline` a `loop`. Poster bude současná fotografie `hero.webp`, takže návštěvník okamžitě uvidí kvalitní obraz i před načtením videa.

Text bude asymetricky umístěný do klidnější části obrazu. Praktické údaje se zobrazí jako jednoduchá věta pod hlavním nadpisem. CTA „Poptat termín“ zůstane viditelné bez scrollování.

Při `prefers-reduced-motion` se video nebude přehrávat a zůstane poster. Na úzkých mobilních displejích se použije menší video soubor a konzervativnější ořez.

## Pohyb při scrollu

Web použije tři typy pohybu:

1. pomalý posun a změnu měřítka hero média,
2. horizontální posun fotografického pásu podle scrollu,
3. jemný přechod velkého textu přes obraz v jedné atmosférické sekci.

Ostatní sekce nebudou mít opakované fade-up animace. Interakční pohyb zůstane u galerie, navigace a lightboxu.

## Homepage

Po hero bude následovat krátký úvod s jednou dominantní fotografií interiéru. Vybavení se zobrazí jako souvislý typografický seznam, ne jako sada karet.

Galerie bude horizontální pás velkých snímků s viditelným pořadím a možností přejít do lightboxu. Na mobilu půjde posouvat dotykem. Stránka poté použije jeden široký krajinný záběr jako přechod do okolí.

Rozcestník se změní na jednoduchý přehled míst a vzdáleností bez imitace turistických cedulí.

## Další stránky

Stránky ubytování, ceníku a poptávky převezmou novou typografii, neutrální paletu a větší fotografie. Jejich informační struktura zůstane zachovaná, aby se nezhoršila orientace ani formulář.

## Video pipeline

Pomocí FFmpeg se z videa bez hudby vybere klidný záběr vhodný pro smyčku. Vznikne:

- desktop MP4 v H.264, přibližně 8–12 sekund, maximálně kolem 4 MB,
- mobilní MP4 s menším rozlišením, maximálně kolem 2 MB,
- existující `hero.webp` jako poster.

Smyčka musí mít nenápadný začátek a konec. Pokud vhodný spoj ve zdroji nebude, použije se krátké prolnutí.

## Přístupnost a výkon

- Videa budou bez zvuku a čistě atmosférická; důležitý obsah zůstane v textu.
- `prefers-reduced-motion` vypne autoplay a scroll transformace.
- Lightbox zůstane ovladatelný klávesnicí.
- Fotografie zůstanou přes `next/image`.
- Video se načte až jako hero médium a další případné klipy nebudou přidány, pokud nepřinesou jasnou hodnotu.

## Ověření

- produkční build a TypeScript,
- desktop a mobilní screenshot celé homepage,
- hero poster a video fallback,
- reduced-motion varianta,
- galerie: kliknutí, šipky, Escape a dotykové posouvání,
- kontrola velikosti výsledných video souborů,
- kontrola všech čtyř stránek.

