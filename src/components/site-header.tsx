"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Znacka } from "@/components/znacka";
import { navigace, site } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The header sits over the hero photo while the visitor is at the top of the
 * home page, then takes a solid ground once they scroll. On every other page
 * there is no hero photo behind it, so it starts solid.
 */
export function SiteHeader() {
  const cesta = usePathname();
  const naHomepage = cesta === "/";
  const [odscrolovano, setOdscrolovano] = useState(false);
  const [menuOtevreno, setMenuOtevreno] = useState(false);

  useEffect(() => {
    const onScroll = () => setOdscrolovano(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the open mobile menu so it doesn't scroll underneath.
  useEffect(() => {
    document.body.style.overflow = menuOtevreno ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOtevreno]);

  const pruhledne = naHomepage && !odscrolovano && !menuOtevreno;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        pruhledne
          ? "na-tmavem bg-transparent"
          : "border-b border-kura/12 bg-kamen/92 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex max-w-[86rem] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          onClick={() => setMenuOtevreno(false)}
          className="flex items-center gap-2.5"
          aria-label={`${site.name} — úvodní stránka`}
        >
          <Znacka tmave={pruhledne} />
          <span
            className={cn(
              "udaj text-[0.8125rem] font-medium uppercase tracking-[0.2em] transition-colors",
              pruhledne ? "text-papir" : "text-smrk"
            )}
          >
            Chata Seninka
          </span>
        </Link>

        <nav aria-label="Hlavní" className="hidden items-center gap-9 md:flex">
          {navigace.map((polozka) => {
            const aktivni =
              polozka.href === "/" ? cesta === "/" : cesta.startsWith(polozka.href);
            return (
              <Link
                key={polozka.href}
                href={polozka.href}
                aria-current={aktivni ? "page" : undefined}
                className={cn(
                  "relative py-1 text-[0.9375rem] transition-colors",
                  pruhledne
                    ? "text-papir/80 hover:text-papir"
                    : "text-kura-svetly hover:text-smrk",
                  aktivni && (pruhledne ? "text-papir" : "text-smrk")
                )}
              >
                {polozka.label}
                {aktivni ? (
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-znacka"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOtevreno((o) => !o)}
          aria-expanded={menuOtevreno}
          aria-controls="menu-mobil"
          className={cn(
            "-mr-2 p-2 md:hidden",
            pruhledne ? "text-papir" : "text-smrk"
          )}
        >
          <span className="sr-only">{menuOtevreno ? "Zavřít menu" : "Otevřít menu"}</span>
          {menuOtevreno ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOtevreno ? (
        <nav
          id="menu-mobil"
          aria-label="Hlavní"
          className="border-t border-kura/12 bg-kamen md:hidden"
        >
          <ul className="mx-auto max-w-[86rem] px-5 py-3 sm:px-8">
            {navigace.map((polozka) => {
              const aktivni =
                polozka.href === "/" ? cesta === "/" : cesta.startsWith(polozka.href);
              return (
                <li key={polozka.href} className="border-b border-kura/10 last:border-0">
                  <Link
                    href={polozka.href}
                    onClick={() => setMenuOtevreno(false)}
                    aria-current={aktivni ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 py-4 text-lg",
                      aktivni ? "text-smrk" : "text-kura-svetly"
                    )}
                  >
                    {aktivni ? <Znacka /> : <span className="w-3.5" aria-hidden />}
                    {polozka.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
