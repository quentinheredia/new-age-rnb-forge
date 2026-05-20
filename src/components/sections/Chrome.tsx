import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 80));
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute inset-0 border-b border-border bg-background/80 backdrop-blur-xl"
      />
      <nav
        aria-label="Primary"
        className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10"
      >
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight">NAR</span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Music Group
          </span>
        </a>
        <ul className="hidden items-center gap-10 md:flex">
          {[
            ["Services", "#services"],
            ["Results", "#results"],
            ["Pricing", "#pricing"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-accent hover:text-accent-foreground hover:border-accent"
        >
          Inquire
        </a>
        {scrolled ? null : null}
      </nav>
    </motion.header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 text-xs text-muted-foreground sm:flex-row">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-base text-foreground">NAR</span>
          <span className="uppercase tracking-[0.24em]">Music Group · New York</span>
        </div>
        <div className="flex gap-6">
          <span>© {new Date().getFullYear()} NAR Music Group</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
