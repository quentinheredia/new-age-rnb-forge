import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  artist_name: z.string().trim().max(120).optional(),
  budget_tier: z.enum(["catalyst", "campaign", "rollout", "unsure"]),
  message: z.string().trim().min(10, "At least 10 characters").max(4000),
  website: z.string().max(0).optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { budget_tier: "unsure", website: "" },
  });

  const onSubmit = async (values: FormValues) => {
    const { error } = await supabase.functions.invoke("send-contact", { body: values });
    if (error) {
      toast.error("Couldn't send your message. Please try again.");
      return;
    }
    toast.success("Message received. We'll be in touch within 48 hours.");
    setSubmitted(true);
    reset();
  };

  return (
    <section
      id="contact"
      className="relative border-b border-border px-6 py-28 sm:px-10 sm:py-36"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-8 bg-accent/60" />
            Start a conversation
          </p>
          <h2 id="contact-heading" className="text-balance text-4xl leading-[1.05] sm:text-5xl">
            Let's hear what you're <span className="italic text-accent">building.</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Tell us about your release window, current footprint, and where you want to be in 6 months.
            We respond to every qualified inquiry within 48 hours.
          </p>

          <dl className="mt-10 space-y-4 text-sm">
            <Row label="Direct" value="hello@narmusicgroup.com" />
            <Row label="A&R submissions" value="ar@narmusicgroup.com" />
            <Row label="Hours" value="Mon–Fri · 10:00–18:00 ET" />
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl border border-border bg-card p-8 sm:p-10"
            noValidate
          >
            {/* Honeypot — visually hidden, not focusable */}
            <div className="hidden" aria-hidden="true">
              <label>
                Website
                <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" error={errors.name?.message}>
                <input
                  {...register("name")}
                  className="field"
                  autoComplete="name"
                  placeholder="Maren Voss"
                />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input
                  type="email"
                  {...register("email")}
                  className="field"
                  autoComplete="email"
                  placeholder="you@label.com"
                />
              </Field>
              <Field label="Artist / project name" error={errors.artist_name?.message}>
                <input
                  {...register("artist_name")}
                  className="field"
                  placeholder="Optional"
                />
              </Field>
              <Field label="Engagement interest" error={errors.budget_tier?.message}>
                <select {...register("budget_tier")} className="field">
                  <option value="unsure">Not sure yet</option>
                  <option value="catalyst">The Catalyst</option>
                  <option value="campaign">The Campaign</option>
                  <option value="rollout">The Rollout</option>
                </select>
              </Field>
            </div>

            <div className="mt-5">
              <Field label="What are you working on?" error={errors.message?.message}>
                <textarea
                  {...register("message")}
                  rows={5}
                  className="field resize-none"
                  placeholder="Release dates, current monthly listeners, where you're stuck..."
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all hover:bg-accent hover:text-accent-foreground disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending
                </>
              ) : submitted ? (
                "Sent — thank you"
              ) : (
                <>
                  Send inquiry
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="mt-4 text-xs text-muted-foreground">
              By submitting you agree to be contacted by NAR Music Group. We never share your details.
            </p>
          </form>
        </motion.div>
      </div>

      <style>{`
        .field {
          width: 100%;
          background: oklch(0.16 0.005 60);
          border: 1px solid oklch(0.28 0.005 60);
          color: oklch(0.96 0.006 80);
          border-radius: 8px;
          padding: 12px 14px;
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .field:focus {
          outline: none;
          border-color: oklch(0.78 0.09 75);
          box-shadow: 0 0 0 3px oklch(0.78 0.09 75 / 0.15);
        }
        .field::placeholder { color: oklch(0.55 0.01 80); }
      `}</style>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 border-b border-border pb-3">
      <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
