import { useEffect, useCallback } from "react";
import { useLocation } from "wouter";

declare function gtag(...args: unknown[]): void;

/** Track page views automatically on route change, and expose trackClick. */
export function useAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof gtag === "undefined") return;
    gtag("event", "page_view", {
      page_path: location,
      page_location: window.location.href,
    });
  }, [location]);

  const trackClick = useCallback((label: string) => {
    if (typeof gtag === "undefined") return;
    gtag("event", "click", { event_label: label });
  }, []);

  return { trackClick };
}
