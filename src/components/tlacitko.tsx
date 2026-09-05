import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Varianta = "hlavni" | "vedlejsi" | "vedlejsi-tmave";

const zaklad =
  "inline-flex items-center justify-center gap-2.5 rounded-[2px] px-6 py-3.5 text-[0.9375rem] font-medium transition-colors duration-200";

const varianty: Record<Varianta, string> = {
  // The only saturated thing on the page — reserved for "go here next".
  hlavni: "bg-znacka text-papir hover:bg-[#8f2b17]",
  vedlejsi:
    "border border-kura/25 text-smrk hover:border-kura/55 hover:bg-papir/70",
  "vedlejsi-tmave":
    "border border-kamen/30 text-papir hover:border-kamen/60 hover:bg-papir/10",
};

export function Tlacitko({
  href,
  varianta = "hlavni",
  className,
  children,
  externi = false,
  ...rest
}: {
  href: string;
  varianta?: Varianta;
  className?: string;
  children: ReactNode;
  /** external links open in a new tab and get the noreferrer pair */
  externi?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const trida = cn(zaklad, varianty[varianta], className);

  if (externi) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={trida}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={trida} {...rest}>
      {children}
    </Link>
  );
}
