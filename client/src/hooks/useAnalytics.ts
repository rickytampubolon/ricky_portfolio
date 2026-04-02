import { useEffect, useCallback } from "react";
import { useLocation } from "wouter";

async function post(body: object) {
  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // Silently ignore — analytics are best-effort (e.g. static deployment has no backend)
  }
}

/** Track page views automatically on route change, and expose trackClick. */
export function useAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    post({ type: "pageview", path: location });
  }, [location]);

  const trackClick = useCallback((label: string) => {
    post({ type: "click", label });
  }, []);

  return { trackClick };
}
