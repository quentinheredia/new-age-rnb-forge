
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  artist_name TEXT,
  budget_tier TEXT,
  message TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- No anon/public access. The edge function uses the service role to insert.
-- Deny-by-default: no policies means no client access via the SDK.

CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
