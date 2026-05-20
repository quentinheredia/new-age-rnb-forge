// Edge function: send-contact
// Receives validated contact form submissions and persists them server-side.
// All secrets (SUPABASE_SERVICE_ROLE_KEY) stay on the server — never shipped to the client.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";

// ---- Strict CORS allow-list (production + Lovable previews) ----
const ALLOWED_ORIGINS = [
  "https://narmusicgroup.com",
  "https://www.narmusicgroup.com",
];
const ALLOWED_ORIGIN_SUFFIXES = [".lovable.app", ".lovableproject.com"];

function corsHeadersFor(origin: string | null) {
  let allowed = "https://narmusicgroup.com";
  if (origin) {
    if (
      ALLOWED_ORIGINS.includes(origin) ||
      ALLOWED_ORIGIN_SUFFIXES.some((s) => {
        try {
          return new URL(origin).hostname.endsWith(s);
        } catch {
          return false;
        }
      })
    ) {
      allowed = origin;
    }
  }
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

const BodySchema = z.object({
  name: z.string().trim().min(1, "Name required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  artist_name: z.string().trim().max(120).optional().or(z.literal("")),
  budget_tier: z.enum(["catalyst", "campaign", "rollout", "unsure"]).optional(),
  message: z.string().trim().min(10, "Message too short").max(4000),
  // honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const cors = corsHeadersFor(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  try {
    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...cors, "Content-Type": "application/json" } },
      );
    }

    // Honeypot tripwire — silently accept to avoid signaling to bots
    if (parsed.data.website) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const ip =
      req.headers.get("cf-connecting-ip") ??
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      null;
    const ua = req.headers.get("user-agent") ?? null;

    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      artist_name: parsed.data.artist_name || null,
      budget_tier: parsed.data.budget_tier ?? null,
      message: parsed.data.message,
      ip_address: ip,
      user_agent: ua,
    });

    if (error) {
      console.error("insert error", error);
      return new Response(JSON.stringify({ error: "Storage failed" }), {
        status: 500,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("unexpected", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
