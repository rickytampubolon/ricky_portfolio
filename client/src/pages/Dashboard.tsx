import { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Eye, Users, MousePointerClick, RefreshCw } from "lucide-react";

/* ── Types ────────────────────────────────────────────────────── */
interface DayStat {
  date: string;
  visitors: number;
  pageViews: number;
  pageBreakdown: Record<string, number>;
  clicks: number;
  clickBreakdown: Record<string, number>;
}

interface Stats {
  days: DayStat[];
  totals: { visitors: number; pageViews: number; clicks: number };
}

/* ── Stat Card ────────────────────────────────────────────────── */
function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  return (
    <div className="border border-border rounded-[6px] bg-background dark:bg-surface p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-[4px] bg-primary/10 flex items-center justify-center shrink-0">
        <Icon size={18} className="text-primary" />
      </div>
      <div>
        <p className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-muted-foreground">
          {label}
        </p>
        <p className="text-2xl font-black text-foreground leading-none mt-1">
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

/* ── Breakdown table ──────────────────────────────────────────── */
function BreakdownTable({
  title,
  data,
}: {
  title: string;
  data: Record<string, number>;
}) {
  const rows = Object.entries(data).sort(([, a], [, b]) => b - a);
  if (rows.length === 0) return null;
  const total = rows.reduce((s, [, n]) => s + n, 0);

  return (
    <div className="border border-border rounded-[6px] bg-background dark:bg-surface p-5">
      <h3 className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
        {title}
      </h3>
      <div className="flex flex-col gap-2">
        {rows.map(([label, count]) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground truncate">{label}</span>
                <span className="text-[0.72rem] text-muted-foreground ml-2 shrink-0">
                  {count}
                </span>
              </div>
              <div className="h-1 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.round((count / total) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Dashboard content ────────────────────────────────────────── */
function DashboardContent() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/analytics/stats`);
      if (!res.ok) throw new Error("Failed to load");
      setStats(await res.json());
    } catch {
      setError("Failed to load stats.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading stats…</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-destructive text-sm">{error}</p>
      </div>
    );
  }

  const chartData = stats.days.map((d) => ({
    date: d.date.slice(5), // "MM-DD"
    Visitors: d.visitors,
    "Page Views": d.pageViews,
    Clicks: d.clicks,
  }));

  // Aggregate all-time page and click breakdowns
  const allPages: Record<string, number> = {};
  const allClicks: Record<string, number> = {};
  for (const day of stats.days) {
    for (const [k, v] of Object.entries(day.pageBreakdown)) {
      allPages[k] = (allPages[k] ?? 0) + v;
    }
    for (const [k, v] of Object.entries(day.clickBreakdown)) {
      allClicks[k] = (allClicks[k] ?? 0) + v;
    }
  }

  return (
    <div className="flex-1 overflow-y-auto px-5 md:px-12 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-[-0.02em]">Analytics</h1>
          <p className="text-[0.72rem] text-muted-foreground mt-1">Last 30 days · All-time totals</p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 border border-border rounded-[4px] px-4 py-2 text-[0.72rem] font-bold tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200"
        >
          <RefreshCw size={13} />
          Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={Users} label="Unique Visitors" value={stats.totals.visitors} />
        <StatCard icon={Eye} label="Page Views" value={stats.totals.pageViews} />
        <StatCard icon={MousePointerClick} label="Clicks Tracked" value={stats.totals.clicks} />
      </div>

      {/* Trend chart */}
      {chartData.length > 0 && (
        <div className="border border-border rounded-[6px] bg-background dark:bg-surface p-5">
          <h3 className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-muted-foreground mb-6">
            Daily Trend (last 30 days)
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 4,
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
              <Line
                type="monotone"
                dataKey="Visitors"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Page Views"
                stroke="hsl(var(--primary) / 0.45)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Clicks"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1.5}
                strokeDasharray="4 2"
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Clicks by day bar chart */}
      {chartData.length > 0 && stats.totals.clicks > 0 && (
        <div className="border border-border rounded-[6px] bg-background dark:bg-surface p-5">
          <h3 className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-muted-foreground mb-6">
            Clicks per Day
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 4,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="Clicks" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Page & click breakdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BreakdownTable title="Top Pages (last 30 days)" data={allPages} />
        {Object.keys(allClicks).length > 0 && (
          <BreakdownTable title="Top Clicks (last 30 days)" data={allClicks} />
        )}
      </div>

      {stats.days.length === 0 && (
        <p className="text-muted-foreground text-sm text-center py-8">
          No data yet. Visit the site to start collecting analytics.
        </p>
      )}
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────── */
export default function Dashboard() {
  return (
    <div className="sm:h-screen sm:overflow-hidden bg-background dark:bg-surface text-foreground flex flex-col">
      <DashboardContent />
    </div>
  );
}
