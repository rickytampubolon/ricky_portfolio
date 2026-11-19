/* ── Analytics helpers (GA4) ─────────────────────────────────
   Sends events to GA4 through gtag. Never send personal data
   (name, email, message text) in event params.
   ─────────────────────────────────────────────────────────── */

declare function gtag(...args: unknown[]): void;

export function track(name: string, params: Record<string, unknown> = {}) {
  if (typeof gtag === "undefined") return;
  try {
    gtag("event", name, params);
  } catch {
    /* analytics must never break the page */
  }
}

/* ── Traffic source (first touch of the session) ─────────────── */
export interface Attribution {
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
  referrer?: string;
  landing_path: string;
}

const STORE_KEY = "attribution";

function readAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  let refHost = "";
  try {
    if (document.referrer) {
      const u = new URL(document.referrer);
      if (u.hostname !== window.location.hostname) refHost = u.hostname;
    }
  } catch {
    /* ignore bad referrer */
  }

  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");

  return {
    source: utmSource ?? (refHost || "(direct)"),
    medium: utmMedium ?? (refHost ? "referral" : "(none)"),
    campaign: params.get("utm_campaign") ?? undefined,
    content: params.get("utm_content") ?? undefined,
    term: params.get("utm_term") ?? undefined,
    referrer: refHost || undefined,
    landing_path: window.location.pathname + window.location.hash,
  };
}

/** Returns the source of the visit. Stored once per browser session so
 *  later in-page navigation does not overwrite where the visitor came from. */
export function getAttribution(): Attribution {
  try {
    const saved = sessionStorage.getItem(STORE_KEY);
    if (saved) return JSON.parse(saved) as Attribution;
    const fresh = readAttribution();
    sessionStorage.setItem(STORE_KEY, JSON.stringify(fresh));
    return fresh;
  } catch {
    return readAttribution();
  }
}
