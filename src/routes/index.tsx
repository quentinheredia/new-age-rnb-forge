import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Pricing } from "@/components/sections/Pricing";
import { Contact } from "@/components/sections/Contact";
import { Nav, Footer } from "@/components/sections/Chrome";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "NAR Music Group — R&B Playlist Marketing & Artist Management",
      },
      {
        name: "description",
        content:
          "Premium R&B marketing & management agency. Playlist strategy, content rollouts, and full-service campaigns engineered for the algorithm.",
      },
      { name: "keywords", content: "RnB playlist marketing agency, R&B music marketing, artist management, playlist promotion, music rollout" },
      { property: "og:title", content: "NAR Music Group — New Age R&B Marketing" },
      {
        property: "og:description",
        content:
          "We build sustainable digital footprints for R&B artists — playlist marketing, content strategy, and full-service rollouts.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://narmusicgroup.com" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NAR Music Group" },
      {
        name: "twitter:description",
        content: "Premium R&B marketing & management agency.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://narmusicgroup.com" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "NAR Music Group",
          alternateName: "New Age RNB",
          url: "https://narmusicgroup.com",
          description:
            "Premium R&B marketing & artist management agency specializing in playlist marketing, content strategy, and full-service release rollouts.",
          areaServed: "Worldwide",
          sameAs: [],
          contactPoint: [
            {
              "@type": "ContactPoint",
              email: "hello@narmusicgroup.com",
              contactType: "customer support",
              availableLanguage: ["English"],
            },
          ],
          offers: [
            { "@type": "Offer", name: "The Catalyst", priceCurrency: "USD", price: "299" },
            { "@type": "Offer", name: "The Campaign", priceCurrency: "USD", price: "799" },
            { "@type": "Offer", name: "The Rollout", priceCurrency: "USD", price: "2500" },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div id="top" className="relative min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Services />
        <CaseStudies />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.19 0.005 60)",
            border: "1px solid oklch(0.28 0.005 60)",
            color: "oklch(0.96 0.006 80)",
          },
        }}
      />
    </div>
  );
}
