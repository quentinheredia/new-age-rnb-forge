import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Tier = {
  id: "catalyst" | "campaign" | "rollout";
  name: string;
  tagline: string;
  price: string;
  cadence: string;
  target: string;
  features: string[];
  valueProp: string;
  highlighted?: boolean;
};

const tiers: Tier[] = [
  {
    id: "catalyst",
    name: "The Catalyst",
    tagline: "Foundational growth",
    price: "$299 – $499",
    cadence: "per project / month",
    target: "Emerging artists building algorithmic signal in a defined sub-genre.",
    features: [
      "Playlist marketing across 3–5 highly targeted, SEO-optimized niche playlists",
      "2 professionally formatted Reel / TikTok edits, algorithm-tuned",
      "Sub-genre tagging audit & metadata cleanup",
      "Monthly performance report",
    ],
    valueProp: "Getting the algorithm to understand your specific sub-genre.",
  },
  {
    id: "campaign",
    name: "The Campaign",
    tagline: "Sustained momentum",
    price: "$799 – $1,200",
    cadence: "per month",
    target: "Artists pushing a specific single or EP into wider rotation.",
    features: [
      "Placement across a wider network of active R&B / Soul playlists",
      "4-week rolling content calendar with 4–6 Reels / Stories",
      "Hashtag strategy & engagement guidelines",
      "Conversion tracking: passive listener → follower",
    ],
    valueProp: "Sustained momentum and converting passive listeners into followers.",
    highlighted: true,
  },
  {
    id: "rollout",
    name: "The Rollout",
    tagline: "End-to-end release",
    price: "$2,500+",
    cadence: "per month",
    target: "Artists wanting full-service management around a release window.",
    features: [
      "Comprehensive playlist network saturation",
      "Full social media takeover & community management",
      "Real-world integration: release parties, creator mixers, events",
      "Dedicated strategist + weekly syncs",
    ],
    valueProp: "End-to-end digital footprint management.",
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative border-b border-border px-6 py-28 sm:px-10 sm:py-36"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 flex flex-col justify-between gap-8 sm:flex-row sm:items-end"
        >
          <div>
            <p className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              <span className="h-px w-8 bg-accent/60" />
              Engagement Tiers
            </p>
            <h2
              id="pricing-heading"
              className="max-w-2xl text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
            >
              Transparent pricing. <span className="italic text-accent">Scalable scope.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Every engagement is bespoke. Tiers below are the starting framework — final scope is
            tailored to your release calendar and existing footprint.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.article
              key={tier.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={cn(
                "relative flex flex-col rounded-xl border bg-card p-8 transition-colors",
                tier.highlighted
                  ? "border-accent/50 bg-gradient-to-b from-accent/[0.04] to-transparent shadow-[0_0_0_1px_oklch(0.78_0.09_75/0.25)]"
                  : "border-border hover:border-muted-foreground/30",
              )}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent-foreground">
                  <Sparkles className="h-3 w-3" />
                  Most popular
                </div>
              )}

              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {tier.tagline}
              </div>
              <h3 className="mt-3 font-display text-3xl">{tier.name}</h3>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-4xl text-foreground">{tier.price}</span>
                <span className="text-xs text-muted-foreground">{tier.cadence}</span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{tier.target}</p>

              <ul className="mt-8 space-y-3.5 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <span className="text-foreground/85">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-border pt-6 text-sm italic text-muted-foreground">
                "{tier.valueProp}"
              </div>

              <a
                href="#contact"
                className={cn(
                  "mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors",
                  tier.highlighted
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : "border border-border text-foreground hover:bg-secondary",
                )}
              >
                Inquire about {tier.name}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
