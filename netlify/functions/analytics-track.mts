import type { Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import crypto from "crypto";

interface DayData {
  pageViews: Record<string, number>;
  clicks: Record<string, number>;
  visitors: string[];
}

interface AnalyticsStore {
  days: Record<string, DayData>;
}

function hashIP(ip: string): string {
  return crypto
    .createHash("sha256")
    .update(ip + "ricky_portfolio_salt")
    .digest("hex")
    .slice(0, 16);
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    // ignore parse errors
  }

  const { type, path: pagePath, label } = body as {
    type?: string;
    path?: string;
    label?: string;
  };

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const store = getStore("analytics");
  const existing = (await store.get("data", {
    type: "json",
  })) as AnalyticsStore | null;
  const data: AnalyticsStore = existing ?? { days: {} };

  const today = getToday();
  if (!data.days[today]) {
    data.days[today] = { pageViews: {}, clicks: {}, visitors: [] };
  }
  const day = data.days[today];

  if (type === "pageview" && typeof pagePath === "string") {
    day.pageViews[pagePath] = (day.pageViews[pagePath] ?? 0) + 1;
    const hashed = hashIP(ip);
    if (!day.visitors.includes(hashed)) {
      day.visitors.push(hashed);
    }
  } else if (type === "click" && typeof label === "string") {
    day.clicks[label] = (day.clicks[label] ?? 0) + 1;
  }

  await store.set("data", JSON.stringify(data));

  return Response.json({ ok: true });
};

export const config: Config = {
  path: "/api/analytics/track",
};
