import { motion } from "framer-motion";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";

type Point = { month: string; before: number; after: number };

const data: Point[] = [
  { month: "M1", before: 4800, after: 4800 },
  { month: "M2", before: 5200, after: 9100 },
  { month: "M3", before: 5500, after: 18400 },
  { month: "M4", before: 5900, after: 31200 },
  { month: "M5", before: 6200, after: 52800 },
  { month: "M6", before: 6500, after: 78900 },
  { month: "M7", before: 6800, after: 112400 },
  { month: "M8", before: 7100, after: 148700 },
];

const studies = [
  {
    artist: "JADE OAK",
    genre: "Alt-R&B / Neo-Soul",
    tier: "The Campaign",
    headline: "4,800 → 148K monthly listeners",
    note: "Triggered Discover Weekly placement in week 11 via niche playlist saturation.",
  },
  {
    artist: "ROMÁN K.",
    genre: "Contemporary R&B",
    tier: "The Rollout",
    headline: "Lead single charted #14 R&B Apple",
    note: "Full content takeover paired with release-party UGC seeded ahead of drop date.",
  },
  {
    artist: "MAREN VOSS",
    genre: "R&B / Bedroom Pop",
    tier: "The Catalyst",
    headline: "0 → 12 editorial adds in 60 days",
    note: "Sub-genre tagging and curated drops unlocked algorithmic radio rotation.",
  },
];

export function CaseStudies() {
  const formattedData = useMemo(() => data, []);

  return (
    <section
      id="results"
      className="relative border-b border-border px-6 py-28 sm:px-10 sm:py-36"
      aria-labelledby="results-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-8 bg-accent/60" />
            Case Studies
          </p>
          <h2
            id="results-heading"
            className="max-w-3xl text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Compounding growth, <span className="italic text-accent">measured monthly.</span>
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground">
            A representative artist trajectory after onboarding to a 6-month Campaign tier.
            Baseline is the artist's pre-engagement organic listenership.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-10"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Monthly Spotify listeners
              </div>
              <div className="mt-1 flex items-center gap-2 font-display text-3xl text-foreground">
                <TrendingUp className="h-5 w-5 text-accent" />
                +2,996% over 8 months
              </div>
            </div>
            <div className="hidden gap-6 sm:flex">
              <Legend dot="bg-muted-foreground/50" label="Organic baseline" />
              <Legend dot="bg-accent" label="With NAR" />
            </div>
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={formattedData} margin={{ top: 8, right: 16, bottom: 0, left: -8 }}>
                <defs>
                  <linearGradient id="gAfter" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.09 75)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.78 0.09 75)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(0.28 0.005 60)" strokeDasharray="2 6" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="oklch(0.66 0.01 80)"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="oklch(0.66 0.01 80)"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : `${v}`)}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.19 0.005 60)",
                    border: "1px solid oklch(0.28 0.005 60)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "oklch(0.66 0.01 80)" }}
                  formatter={(v: number) => v.toLocaleString()}
                />
                <Area
                  type="monotone"
                  dataKey="before"
                  stroke="oklch(0.66 0.01 80)"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="transparent"
                  isAnimationActive
                  animationDuration={1400}
                />
                <Area
                  type="monotone"
                  dataKey="after"
                  stroke="oklch(0.78 0.09 75)"
                  strokeWidth={2}
                  fill="url(#gAfter)"
                  isAnimationActive
                  animationDuration={1800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {studies.map((s, i) => (
            <motion.article
              key={s.artist}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-card p-8"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {s.tier}
              </div>
              <div className="mt-6 font-display text-2xl">{s.artist}</div>
              <div className="text-sm text-muted-foreground">{s.genre}</div>
              <div className="mt-6 text-base text-foreground">{s.headline}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.note}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </div>
  );
}
