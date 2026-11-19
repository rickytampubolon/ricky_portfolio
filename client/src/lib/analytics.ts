/* ── Analytics helpers (GA4) ─────────────────────────────────
   Sends events to GA4 through gtag. Never send personal data
   (name, email, message text) in event params.
   ─────────────────────────────────────────────────────────── */

declare function gtag(...args: unknown[]): void;

/** True when the owner opted out (?notrack=1) or the visitor looks like a bot.
 *  The flag is set by a small inline script in index.html. */
export function isTrackingDisabled(): boolean {
  return (window as unknown as Record<string, unknown>)["ga-disable-G-6HCZ3FP6S0"] === true;
}

export function track(name: string, params: Record<string, unknown> = {}) {
  if (typeof gtag === "undefined" || isTrackingDisabled()) return;
  try {
    gtag("event", name, params);
  } catch {
    /* analytics must never break the page */
  }
}

/* ── JavaScript error reporting ──────────────────────────────
   Sends only a short message, the file name and the page path.
   Capped per page load, and errors from browser extensions or
   other origins are ignored. */
export function initErrorTracking(): () => void {
  let sent = 0;
  const MAX = 5;

  const report = (message: string, file = "", line = 0) => {
    if (sent >= MAX) return;
    if (!message || message === "Script error." || message.includes("ResizeObserver loop")) return;
    sent += 1;
    track("js_error", {
      message: message.slice(0, 150),
      file: file.split("/").pop()?.split("?")[0],
      line,
      page_path: window.location.pathname + window.location.hash,
    });
  };

  const onError = (e: ErrorEvent) => {
    if (e.filename && !e.filename.startsWith(window.location.origin)) return;
    report(e.message, e.filename, e.lineno);
  };
  const onRejection = (e: PromiseRejectionEvent) => {
    const r = e.reason;
    report(r instanceof Error ? r.message : String(r ?? ""));
  };

  window.addEventListener("error", onError);
  window.addEventListener("unhandledrejection", onRejection);
  return () => {
    window.removeEventListener("error", onError);
    window.removeEventListener("unhandledrejection", onRejection);
  };
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
