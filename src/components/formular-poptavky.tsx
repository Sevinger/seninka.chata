"use client";

import { useActionState, useEffect, useId, useState } from "react";
import { ArrowRight, Check, Loader2, TriangleAlert } from "lucide-react";

import { odeslatPoptavku, type StavPoptavky } from "@/app/actions";
import { cn } from "@/lib/utils";

const pocatecni: StavPoptavky = { stav: "cekam" };

const poleTrida =
  "w-full rounded-[2px] border border-kura/25 bg-papir px-3.5 py-3 text-[0.9375rem] text-smrk transition-colors placeholder:text-kura-svetly/60 focus:border-mech focus:outline-none";

function dnesISO() {
  return new Date().toISOString().slice(0, 10);
}

export function FormularPoptavky() {
  const [stav, akce, odesilam] = useActionState(odeslatPoptavku, pocatecni);
  const [prijezd, setPrijezd] = useState("");
  const id = useId();

  // No mail provider configured yet — hand the finished message to the guest's
  // own mail client rather than dropping it.
  useEffect(() => {
    if (stav.stav === "mailto" && stav.mailto) {
      window.location.href = stav.mailto;
    }
  }, [stav]);

  if (stav.stav === "odeslano") {
    return (
      <div className="border border-mech/40 bg-papir p-8 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mech/15">
            <Check size={17} strokeWidth={2} aria-hidden className="text-mech" />
          </span>
          <h2 className="font-body text-lg font-medium tracking-normal text-smrk">
            Poptávka odeslána
          </h2>
        </div>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-kura-svetly">
          {stav.zprava ??
            "Máme ji. Ozveme se vám co nejdřív a termín potvrdíme."}{" "}
          Termín zatím není rezervovaný. Potvrdíme ho až v odpovědi.
        </p>
      </div>
    );
  }

  const chyby = stav.chybyPoli ?? {};

  return (
    <form action={akce} noValidate className="border border-kura/15 bg-papir p-6 sm:p-10">
      {stav.stav === "chyba" && stav.zprava ? (
        <p
          role="alert"
          className="mb-7 flex items-start gap-2.5 border-l-2 border-znacka bg-znacka/6 px-4 py-3 text-[0.9375rem] text-znacka"
        >
          <TriangleAlert size={17} aria-hidden className="mt-0.5 shrink-0" />
          {stav.zprava}
        </p>
      ) : null}

      {stav.stav === "mailto" && stav.zprava ? (
        <p
          role="status"
          className="mb-7 border-l-2 border-mech bg-mech/8 px-4 py-3 text-[0.9375rem] text-kura"
        >
          {stav.zprava}
        </p>
      ) : null}

      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <Pole
          id={`${id}-prijezd`}
          jmeno="prijezd"
          popisek="Příjezd"
          chyba={chyby.prijezd}
        >
          <input
            id={`${id}-prijezd`}
            name="prijezd"
            type="date"
            required
            min={dnesISO()}
            value={prijezd}
            onChange={(e) => setPrijezd(e.target.value)}
            aria-invalid={Boolean(chyby.prijezd)}
            aria-describedby={chyby.prijezd ? `${id}-prijezd-chyba` : undefined}
            className={cn(poleTrida, "udaj", chyby.prijezd && "border-znacka")}
          />
        </Pole>

        <Pole
          id={`${id}-odjezd`}
          jmeno="odjezd"
          popisek="Odjezd"
          chyba={chyby.odjezd}
        >
          <input
            id={`${id}-odjezd`}
            name="odjezd"
            type="date"
            required
            min={prijezd || dnesISO()}
            aria-invalid={Boolean(chyby.odjezd)}
            aria-describedby={chyby.odjezd ? `${id}-odjezd-chyba` : undefined}
            className={cn(poleTrida, "udaj", chyby.odjezd && "border-znacka")}
          />
        </Pole>

        <Pole
          id={`${id}-osoby`}
          jmeno="osoby"
          popisek="Počet osob"
          napoveda="Chata je pro 1 až 5 osob."
          chyba={chyby.osoby}
        >
          <select
            id={`${id}-osoby`}
            name="osoby"
            required
            defaultValue="2"
            aria-invalid={Boolean(chyby.osoby)}
            aria-describedby={chyby.osoby ? `${id}-osoby-chyba` : undefined}
            className={cn(poleTrida, chyby.osoby && "border-znacka")}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Pole>

        <Pole id={`${id}-jmeno`} jmeno="jmeno" popisek="Jméno" chyba={chyby.jmeno}>
          <input
            id={`${id}-jmeno`}
            name="jmeno"
            type="text"
            required
            autoComplete="name"
            placeholder="Jan Novák"
            aria-invalid={Boolean(chyby.jmeno)}
            aria-describedby={chyby.jmeno ? `${id}-jmeno-chyba` : undefined}
            className={cn(poleTrida, chyby.jmeno && "border-znacka")}
          />
        </Pole>

        <Pole id={`${id}-email`} jmeno="email" popisek="E‑mail" chyba={chyby.email}>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jan@example.cz"
            aria-invalid={Boolean(chyby.email)}
            aria-describedby={chyby.email ? `${id}-email-chyba` : undefined}
            className={cn(poleTrida, chyby.email && "border-znacka")}
          />
        </Pole>

        <Pole
          id={`${id}-telefon`}
          jmeno="telefon"
          popisek="Telefon"
          napoveda="Nepovinné."
        >
          <input
            id={`${id}-telefon`}
            name="telefon"
            type="tel"
            autoComplete="tel"
            placeholder="777 123 456"
            className={cn(poleTrida, "udaj")}
          />
        </Pole>

        <div className="sm:col-span-2">
          <Pole
            id={`${id}-zprava`}
            jmeno="zprava"
            popisek="Poznámka"
            napoveda="Nepovinné. Napište například věk dětí nebo plánovaný čas příjezdu."
          >
            <textarea
              id={`${id}-zprava`}
              name="zprava"
              rows={4}
              maxLength={2000}
              className={cn(poleTrida, "resize-y")}
            />
          </Pole>
        </div>
      </div>

      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-firma`}>Firma</label>
        <input id={`${id}-firma`} name="firma" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={odesilam}
        className="mt-9 inline-flex w-full items-center justify-center gap-2.5 rounded-[2px] bg-znacka px-6 py-4 text-[0.9375rem] font-medium text-papir transition-colors hover:bg-[#8f2b17] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {odesilam ? (
          <>
            <Loader2 size={17} aria-hidden className="animate-spin" />
            Odesílám…
          </>
        ) : (
          <>
            Odeslat poptávku
            <ArrowRight size={17} aria-hidden />
          </>
        )}
      </button>

      <p className="mt-5 text-[0.8125rem] leading-relaxed text-kura-svetly">
        Odesláním nám dáváte jen svůj kontakt a termín, abychom vám mohli
        odpovědět. Nikam dál je nepředáváme.
      </p>
    </form>
  );
}

function Pole({
  id,
  popisek,
  napoveda,
  chyba,
  children,
}: {
  id: string;
  jmeno: string;
  popisek: string;
  napoveda?: string;
  chyba?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="udaj mb-2 block text-[0.6875rem] uppercase tracking-[0.14em] text-kura-svetly"
      >
        {popisek}
      </label>
      {children}
      {chyba ? (
        <p id={`${id}-chyba`} className="mt-2 text-[0.8125rem] text-znacka">
          {chyba}
        </p>
      ) : napoveda ? (
        <p className="mt-2 text-[0.8125rem] text-kura-svetly">{napoveda}</p>
      ) : null}
    </div>
  );
}
