import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={ref}
      className="relative grain isolate overflow-hidden border-b border-border"
      aria-label="Introduction"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,oklch(0.78_0.09_75/0.10),transparent_70%)]" />

      <motion.div
        style={{ y, opacity }}
        className="mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-6 py-32 sm:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mb-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground"
        >
          <span className="h-px w-8 bg-accent/60" />
          NAR Music Group — Est. 2021
        </motion.p>

        <h1 className="max-w-4xl text-balance text-5xl leading-[1.02] sm:text-7xl lg:text-[5.5rem]">
          {"New age R&B,"
            .split(" ")
            .map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.08 }}
                className="mr-3 inline-block"
              >
                {word}
              </motion.span>
            ))}
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.5 }}
            className="block italic text-accent"
          >
            engineered for the algorithm.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.75 }}
          className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          We build sustainable digital footprints for emerging and established R&B artists —
          combining playlist marketing, content strategy, and full-service rollouts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.95 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <a
            href="#pricing"
            className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all hover:bg-accent hover:text-accent-foreground"
          >
            See engagement tiers
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="text-sm uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Start a conversation →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="mt-24 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border"
        >
          {[
            ["120+", "Artists scaled"],
            ["38M", "Streams driven"],
            ["94%", "Retention rate"],
          ].map(([n, label]) => (
            <div key={label} className="bg-background/60 px-6 py-6 backdrop-blur">
              <div className="font-display text-3xl text-foreground">{n}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
