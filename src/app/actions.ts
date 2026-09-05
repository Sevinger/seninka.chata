"use server";

import { Resend } from "resend";

import { kontakt, site } from "@/lib/content";

export type StavPoptavky = {
  stav: "cekam" | "odeslano" | "mailto" | "chyba";
  zprava?: string;
  /** set when no mail provider is configured, so the browser can hand off */
  mailto?: string;
  chybyPoli?: Record<string, string>;
};

const MAX = { jmeno: 120, email: 160, telefon: 40, zprava: 2000 };

function ocisti(hodnota: FormDataEntryValue | null, max: number) {
  return typeof hodnota === "string" ? hodnota.trim().slice(0, max) : "";
}

function jeEmail(hodnota: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(hodnota);
}

/** today in the visitor's local calendar terms, as the YYYY-MM-DD the input emits */
function dnes() {
  return new Date().toISOString().slice(0, 10);
}

export async function odeslatPoptavku(
  _predchozi: StavPoptavky,
  formData: FormData
): Promise<StavPoptavky> {
  // Honeypot: real people leave this empty. Report success either way, so a
  // bot learns nothing from the response.
  if (ocisti(formData.get("firma"), 100)) {
    return { stav: "odeslano" };
  }

  const jmeno = ocisti(formData.get("jmeno"), MAX.jmeno);
  const email = ocisti(formData.get("email"), MAX.email);
  const telefon = ocisti(formData.get("telefon"), MAX.telefon);
  const prijezd = ocisti(formData.get("prijezd"), 10);
  const odjezd = ocisti(formData.get("odjezd"), 10);
  const osoby = ocisti(formData.get("osoby"), 2);
  const zprava = ocisti(formData.get("zprava"), MAX.zprava);

  // Server-side validation. The browser checks the same rules first, but a
  // form post can always arrive without ever touching that markup.
  const chybyPoli: Record<string, string> = {};
  if (jmeno.length < 2) chybyPoli.jmeno = "Uveďte prosím jméno.";
  if (!jeEmail(email)) chybyPoli.email = "Zkontrolujte prosím e‑mail.";
  if (!prijezd) chybyPoli.prijezd = "Vyberte datum příjezdu.";
  else if (prijezd < dnes()) chybyPoli.prijezd = "Datum příjezdu už je minulé.";
  if (!odjezd) chybyPoli.odjezd = "Vyberte datum odjezdu.";
  else if (prijezd && odjezd <= prijezd) {
    chybyPoli.odjezd = "Odjezd musí být až po příjezdu.";
  }

  const pocetOsob = Number(osoby);
  if (!osoby || Number.isNaN(pocetOsob) || pocetOsob < 1 || pocetOsob > 5) {
    chybyPoli.osoby = "Chata je pro 1 až 5 osob.";
  }

  if (Object.keys(chybyPoli).length > 0) {
    return {
      stav: "chyba",
      zprava: "Formulář se nepodařilo odeslat, zkontrolujte prosím označená pole.",
      chybyPoli,
    };
  }

  const radky = [
    `Jméno: ${jmeno}`,
    `E-mail: ${email}`,
    telefon && `Telefon: ${telefon}`,
    `Příjezd: ${prijezd}`,
    `Odjezd: ${odjezd}`,
    `Počet osob: ${osoby}`,
    zprava && `\nPoznámka:\n${zprava}`,
  ]
    .filter(Boolean)
    .join("\n");

  const predmet = `Poptávka ${site.name} — ${jmeno}, ${prijezd} až ${odjezd}`;
  const apiKey = process.env.RESEND_API_KEY;
  const komu = process.env.POPTAVKY_KOMU ?? kontakt.email;

  // No mailbox configured at all: nothing can be delivered, so say so plainly
  // instead of pretending the message went somewhere.
  if (!komu) {
    console.error(
      "Poptávku nelze doručit: chybí kontakt.email v src/lib/content.ts i POPTAVKY_KOMU."
    );
    return {
      stav: "chyba",
      zprava:
        "Formulář zatím není napojený na e‑mail. Zkuste to prosím za chvíli znovu.",
    };
  }

  // No provider yet: hand the message back so the browser can open the guest's
  // own mail client with everything already filled in. The form works on day
  // one; wiring Resend later changes nothing the visitor sees.
  if (!apiKey) {
    return {
      stav: "mailto",
      mailto: `mailto:${komu}?subject=${encodeURIComponent(
        predmet
      )}&body=${encodeURIComponent(radky)}`,
      zprava: "Otevřeli jsme vám e‑mail s předvyplněnou poptávkou. Stačí ji odeslat.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const odesilatel =
      process.env.POPTAVKY_ODESILATEL ?? "Chata Seninka <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from: odesilatel,
      to: [komu],
      replyTo: email,
      subject: predmet,
      text: radky,
    });

    if (error) {
      console.error("Resend odmítl poptávku:", error);
      return { stav: "chyba", zprava: chybovaHlaska() };
    }

    return {
      stav: "odeslano",
      zprava: "Poptávka odeslána. Ozveme se vám co nejdřív.",
    };
  } catch (err) {
    console.error("Odeslání poptávky selhalo:", err);
    return { stav: "chyba", zprava: chybovaHlaska() };
  }
}

function chybovaHlaska() {
  return kontakt.telefon
    ? `Odeslání selhalo. Zavolejte prosím na ${kontakt.telefon}.`
    : "Odeslání selhalo. Zkuste to prosím znovu za chvíli.";
}
