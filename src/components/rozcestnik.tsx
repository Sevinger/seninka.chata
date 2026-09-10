import type { Cil } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Rozcestnik({
  cile,
  className,
}: {
  cile: readonly Cil[];
  className?: string;
}) {
  return (
    <ul className={cn("border-b border-kura/15", className)}>
      {cile.map((cil) => (
        <li
          key={cil.nazev}
          className="grid gap-3 border-t border-kura/15 py-6 sm:grid-cols-[minmax(11rem,.7fr)_6rem_1.3fr] sm:items-baseline sm:gap-6"
        >
          <h3 className="font-body text-lg font-medium tracking-normal text-smrk">{cil.nazev}</h3>
          <p className="text-sm tabular-nums text-mech">{cil.vzdalenost}</p>
          <p className="max-w-[48ch] text-sm leading-relaxed text-kura-svetly">
            {cil.detail} <span className="text-kura/45">{cil.smer}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
