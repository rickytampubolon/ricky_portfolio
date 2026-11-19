import { useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { track, getAttribution } from "../lib/analytics";

const SECTIONS = ["experience", "education", "contact"];
const SCROLL_STEPS = [25, 50, 75, 100];

/** Page views with traffic source, scroll depth, section views,
 *  and outbound link clicks. Also exposes trackClick. */
export function useAnalytics() {
  const [location] = useLocation();

  /* Page view + where the visitor came from */
  useEffect(() => {
    const a = getAttribution();
    track("page_view", {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
      page_referrer: document.referrer || undefined,
      traffic_source: a.source,
      traffic_medium: a.medium,
      traffic_campaign: a.campaign,
      traffic_content: a.content,
      traffic_term: a.term,
      referrer_host: a.referrer,
      landing_path: a.landing_path,
      language: navigator.language,
      screen: `${window.screen.width}x${window.screen.height}`,
    });
  }, [location]);

  /* Scroll depth: fires once per milestone per page load */
  useEffect(() => {
    const fired = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      for (const step of SCROLL_STEPS) {
        if (pct >= step - 1 && !fired.has(step)) {
          fired.add(step);
          track("scroll_depth", { percent: step });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Section views: fires once when a section is at least half visible */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id;
          if (e.isIntersecting && !seen.has(id)) {
            seen.add(id);
            track("section_view", { section: id });
          }
        }
      },
      { threshold: 0.5 },
    );
    const t = window.setTimeout(() => {
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      });
    }, 500);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, []);

  /* Outbound links (LinkedIn, Instagram, mailto, etc.) */
  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const label = a.textContent?.trim().slice(0, 60) || href;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        track("contact_click", { link_type: href.split(":")[0], label });
        return;
      }
      try {
        const u = new URL(a.href, window.location.href);
        if (u.hostname !== window.location.hostname) {
          track("outbound_click", {
            link_url: u.href,
            link_domain: u.hostname,
            label,
          });
        } else if (u.hash) {
          track("nav_click", { target: u.hash.slice(1), label });
        }
      } catch {
        /* ignore malformed links */
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const trackClick = useCallback((label: string) => {
    track("click", { event_label: label });
  }, []);

  return { trackClick };
}
