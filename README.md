# NAR Music Group

Premium marketing & management for the new wave of R&B.

## Stack

- Vite + React 19 + TypeScript + React Router (TanStack)
- Tailwind CSS v4 + shadcn/ui
- Framer Motion (animations), Lucide (icons), Recharts (charts)
- React Hook Form + Zod (validated, sanitized forms)
- Lovable Cloud (managed Postgres + Edge Functions + Secrets)

## Architecture

```
src/
  routes/                  TanStack Router file routes
  components/
    sections/              Page sections (hero, case studies, pricing, contact, ...)
    ui/                    shadcn/ui primitives
  lib/                     utils
  integrations/supabase/   auto-generated client (do not edit)
supabase/
  functions/send-contact/  Edge function — validates + persists leads
  migrations/              SQL schema migrations
```

All sensitive operations (lead storage, future Spotify / Instagram Graph calls)
run **inside edge functions** with a strict CORS allow-list. No service keys,
provider secrets, or business logic are exposed to the browser.

## Environment

Lovable Cloud auto-provisions these and exposes them safely:

| Variable | Where | Notes |
|---|---|---|
| `VITE_SUPABASE_URL` | client | Public — Lovable Cloud REST URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | client | Public anon key — safe to ship |
| `VITE_SUPABASE_PROJECT_ID` | client | Public project ref |
| `SUPABASE_URL` | edge function | Auto-injected |
| `SUPABASE_SERVICE_ROLE_KEY` | edge function | **Server-only**, never in client bundle |

### Secrets to add in Lovable Cloud → Secrets (optional integrations)

| Secret | Used by | Purpose |
|---|---|---|
| `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` | future edge function | Pull artist analytics for case-study charts |
| `INSTAGRAM_GRAPH_TOKEN` | future edge function | Surface campaign reel metrics |
| `RESEND_API_KEY` | future `send-contact` extension | Email the team on new leads |

Add or rotate secrets in the Lovable Cloud dashboard — never commit them.

## Security posture

- **RLS on `contact_submissions`**: deny-by-default. Only the `send-contact`
  edge function (service role) can write. No client SDK access.
- **Input validation**: Zod on the client *and* re-validated on the server.
- **Honeypot field**: silent bot trap on the contact form.
- **Strict CORS**: edge function only accepts `narmusicgroup.com` (+ Lovable previews).
- **Semantic HTML & one `<h1>` per route**, JSON-LD `Organization` schema for SEO.

## Develop

```bash
bun install
bun run dev
```
