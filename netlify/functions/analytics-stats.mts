import type { Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

interface DayData {
  pageViews: Record<string, number>;
  clicks: Record<string, number>;
  visitors: string[];
}

interface AnalyticsStore {
  days: Record<string, DayData>;
}

interface DayStat {
  date: string;
  visitors: number;
  pageViews: number;
  pageBreakdown: Record<string, number>;
  clicks: number;
  clickBreakdown: Record<string, number>;
}

interface AnalyticsStats {
  days: DayStat[];
  totals: {
    visitors: number;
    pageViews: number;
    clicks: number;
  };
}

function getStats(store: AnalyticsStore, limitDays = 30): AnalyticsStats {
  const sorted = Object.entries(store.days)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-limitDays);

  const days: DayStat[] = sorted.map(([date, data]) => ({
    date,
    visitors: data.visitors.length,
    pageViews: Object.values(data.pageViews).reduce((s, n) => s + n, 0),
    pageBreakdown: data.pageViews,
    clicks: Object.values(data.clicks).reduce((s, n) => s + n, 0),
    clickBreakdown: data.clicks,
  }));

  const allVisitors = new Set(
    Object.values(store.days).flatMap((d) => d.visitors)
  );

  const totals = {
    visitors: allVisitors.size,
    pageViews: Object.values(store.days)
      .flatMap((d) => Object.values(d.pageViews))
      .reduce((s, n) => s + n, 0),
    clicks: Object.values(store.days)
      .flatMap((d) => Object.values(d.clicks))
      .reduce((s, n) => s + n, 0),
  };

  return { days, totals };
}

export default async (_req: Request) => {
  const store = getStore("analytics");
  const existing = (await store.get("data", {
    type: "json",
  })) as AnalyticsStore | null;
  const data: AnalyticsStore = existing ?? { days: {} };

  return Response.json(getStats(data));
};

export const config: Config = {
  path: "/api/analytics/stats",
};
