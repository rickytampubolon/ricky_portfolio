import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DayData {
  pageViews: Record<string, number>; // page path -> count
  clicks: Record<string, number>;    // click label -> count
  visitors: string[];                // hashed IPs (unique per day)
}

interface AnalyticsStore {
  days: Record<string, DayData>; // "YYYY-MM-DD" -> data
}

const DATA_FILE = path.resolve(__dirname, "..", "analytics-data.json");

function loadData(): AnalyticsStore {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as AnalyticsStore;
    }
  } catch {
    // ignore corrupted file, start fresh
  }
  return { days: {} };
}

function saveData(data: AnalyticsStore): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("[analytics] Failed to save data:", err);
  }
}

let store = loadData();

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function hashIP(ip: string): string {
  return crypto.createHash("sha256").update(ip + "ricky_portfolio_salt").digest("hex").slice(0, 16);
}

function ensureDay(date: string): DayData {
  if (!store.days[date]) {
    store.days[date] = { pageViews: {}, clicks: {}, visitors: [] };
  }
  return store.days[date];
}

export function trackPageView(pagePath: string, ip: string): void {
  const today = getToday();
  const day = ensureDay(today);
  day.pageViews[pagePath] = (day.pageViews[pagePath] ?? 0) + 1;
  const hashed = hashIP(ip);
  if (!day.visitors.includes(hashed)) {
    day.visitors.push(hashed);
  }
  saveData(store);
}

export function trackClick(label: string, ip: string): void {
  const today = getToday();
  const day = ensureDay(today);
  day.clicks[label] = (day.clicks[label] ?? 0) + 1;
  saveData(store);
}

export interface DayStat {
  date: string;
  visitors: number;
  pageViews: number;
  pageBreakdown: Record<string, number>;
  clicks: number;
  clickBreakdown: Record<string, number>;
}

export interface AnalyticsStats {
  days: DayStat[];
  totals: {
    visitors: number;
    pageViews: number;
    clicks: number;
  };
}

export function getStats(limitDays = 30): AnalyticsStats {
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
