import { motion } from "framer-motion";
import { Radio, Sparkles, LineChart, Users } from "lucide-react";

const services = [
  {
    icon: Radio,
    title: "Playlist Marketing",
    body: "Curated placement on active, sub-genre-specific playlists that signal intent to the algorithm — not vanity adds.",
  },
  {
    icon: Sparkles,
    title: "Content Strategy",
    body: "Reels and TikToks formatted to the platform's current bias — hooks, captions, posting cadence, audio choice.",
  },
  {
    icon: LineChart,
    title: "Release Rollouts",
    body: "End-to-end campaign architecture from pre-save flows to debut-week saturation across all surfaces.",
  },
  {
    icon: Users,
    title: "Artist Management",
    body: "For select roster artists: full-service representation across digital, label relations, and live integration.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative border-b border-border px-6 py-28 sm:px-10 sm:py-36"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-8 bg-accent/60" />
            Practice Areas
          </p>
          <h2
            id="services-heading"
            className="max-w-3xl text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Four disciplines, <span className="italic text-accent">one strategic spine.</span>
          </h2>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-card p-8 sm:p-10 transition-colors hover:bg-secondary/40"
            >
              <s.icon className="h-6 w-6 text-accent" strokeWidth={1.4} />
              <h3 className="mt-8 font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
