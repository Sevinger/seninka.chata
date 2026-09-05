import { Tlacitko } from "@/components/tlacitko";
import { Znacka } from "@/components/znacka";

export default function Nenalezeno() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-[86rem] flex-col justify-center px-5 py-32 sm:px-8 lg:px-12">
      <div className="flex items-center gap-2.5">
        <Znacka />
        <span className="eyebrow">Chyba 404</span>
      </div>
      <h1 className="mt-5 max-w-2xl text-[clamp(2rem,5vw,3.4rem)] font-normal">
        Tudy značka nevede
      </h1>
      <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-kura-svetly">
        Stránka, kterou hledáte, tu není. Zpátky na rozcestí to je jeden klik.
      </p>
      <div className="mt-9">
        <Tlacitko href="/">Zpět na úvod</Tlacitko>
      </div>
    </section>
  );
}
