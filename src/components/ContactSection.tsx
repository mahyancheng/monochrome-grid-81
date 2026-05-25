import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import heroImg from "@/Archive/Projects/courtyard-house_60.jpg";

// ─── reCAPTCHA v3 Site Key (public — safe to commit) ─────────────────────────
const RECAPTCHA_SITE_KEY = "6LezafssAAAAAJWoQ6fiDxrq2G5CJrxaPZ9eUpP5";

// ─── Spam Protection Config ───────────────────────────────────────────────────
const RATE_LIMIT_MS    = 60_000; // 60 seconds between submissions
const MIN_FILL_TIME_MS =  4_000; // must spend at least 4s filling the form

// ─── Validation Schema ────────────────────────────────────────────────────────
const contactSchema = z.object({
  name:        z.string().trim().min(1, "Name is required").max(100),
  phone:       z.string().trim().min(1, "Contact number is required").max(20),
  email:       z.string().trim().email("Invalid email address").max(255),
  message:     z.string().trim().min(1, "Message is required").max(2000),
  submittedAt: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

// ─── reCAPTCHA helpers ────────────────────────────────────────────────────────
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
    gtag?: (...args: unknown[]) => void;
  }
}

function loadRecaptchaScript(): Promise<void> {
  return new Promise((resolve) => {
    if (document.getElementById("recaptcha-script")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id  = "recaptcha-script";
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

async function getRecaptchaToken(): Promise<string> {
  await loadRecaptchaScript();
  return new Promise((resolve) => {
    window.grecaptcha.ready(async () => {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: "contact_form",
      });
      resolve(token);
    });
  });
}

// ─── Component ────────────────────────────────────────────────────────────────
const ContactSection = () => {
  const { toast } = useToast();

  // Anti-spam state
  const formLoadTime     = useRef<number>(Date.now());
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered,    setIsHovered]    = useState(false);

  // Form state
  const [form, setForm] = useState<ContactForm>({
    name: "", phone: "", email: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});

  // Honeypot field (hidden from real users, bots auto-fill it)
  const [honeypot, setHoneypot] = useState("");

  // Pre-load reCAPTCHA script as soon as the section mounts
  useEffect(() => {
    loadRecaptchaScript().catch(() => {
      console.warn("reCAPTCHA script failed to load");
    });
  }, []);

  const handleChange = (
    field: keyof Omit<ContactForm, "submittedAt">,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ── Guard 1: Honeypot — silently abort if filled ──────────────────────────
    if (honeypot) {
      setForm({ name: "", phone: "", email: "", message: "" });
      return;
    }

    // ── Guard 2: Fill-time check — real humans take > 4 seconds ──────────────
    if (Date.now() - formLoadTime.current < MIN_FILL_TIME_MS) {
      toast({
        title: "Please review your details",
        description: "Take a moment before submitting.",
        variant: "destructive",
      });
      return;
    }

    // ── Guard 3: Client-side rate limit ───────────────────────────────────────
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      const secondsLeft = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
      toast({
        title: "Please wait",
        description: `You can send another message in ${secondsLeft} seconds.`,
        variant: "destructive",
      });
      return;
    }

    // ── Zod validation ────────────────────────────────────────────────────────
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // ── Guard 4: reCAPTCHA v3 token ────────────────────────────────────────
      // Token is sent to Apps Script for server-side score verification.
      // Score < 0.5 should be rejected in Apps Script (not here).
      let recaptchaToken = "";
      try {
        recaptchaToken = await getRecaptchaToken();
      } catch {
        // Non-fatal: if reCAPTCHA fails (ad blocker, network issue),
        // other guards are still active. Apps Script will handle missing token.
        console.warn("reCAPTCHA token fetch failed, submitting without token");
      }

      const submissionTime = new Date().toLocaleString("zh-CN", {
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false,
      });

      const payload = {
        ...result.data,
        submittedAt:    submissionTime,
        recaptchaToken,               // Apps Script verifies this server-side
      };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwlDkN-YbS0rsIGSoOUgR-t_reNiC-_XNTZinQ6VTxAu4ey3q3zAl6ftqlK6yO10gxAwg/exec",
        {
          method: "POST",
          // text/plain avoids CORS preflight against script.google.com
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        toast({
          title: "Message sent",
          description: `Successfully sent at ${submissionTime}`,
        });

        setLastSubmitTime(Date.now());
        setForm({ name: "", phone: "", email: "", message: "" });
        setErrors({});
        // Reset load time so next submission also enforces the fill-time check
        formLoadTime.current = Date.now();

        // Google Ads conversion tracking
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "conversion", {
            send_to: "AW-11342839562/aySGCNSJiqAcEIr-16Aq",
          });
        }
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please check your network.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const rateLimitSecondsLeft =
    lastSubmitTime > 0
      ? Math.max(0, Math.ceil((RATE_LIMIT_MS - (Date.now() - lastSubmitTime)) / 1000))
      : 0;

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Contact Background"
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? "scale(1.02)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Decorative border */}
      <div
        className="absolute inset-4 md:inset-8 border border-border transition-all duration-700 pointer-events-none"
        style={{
          transform: isHovered ? "scale(1.005)" : "scale(1)",
          opacity:   isHovered ? 0.4 : 0.2,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Left: Contact info ─────────────────────────────────────────── */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value: "1, Jalan Biru 2, Taman Pelangi,\n80400 JB, Johor.",
                },
                {
                  icon: Phone,
                  label: "Telephone",
                  value: "+6016-7442330 | +607-339 1199",
                },
                { icon: Mail, label: "Email", value: "hidilin@gmail.com" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-8 h-8 border border-border flex items-center justify-center flex-shrink-0 mt-0.5 bg-background/50 backdrop-blur-sm">
                    <item.icon size={14} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-xs leading-5 whitespace-pre-line">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Form ────────────────────────────────────────────────── */}
          <div className="flex flex-col justify-center">
            <div className="bg-background/60 backdrop-blur-md border border-border p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-px bg-foreground" />
                <span className="text-[10px] tracking-[0.3em] uppercase">
                  Send Us A Message
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Honeypot — visually hidden, bots auto-fill, real users never see it */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    top: "auto",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                    Name
                  </label>
                  <Input
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="bg-transparent border-border rounded-none text-sm focus-visible:ring-foreground"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-[10px] text-destructive mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Contact No */}
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                    Contact No
                  </label>
                  <Input
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="bg-transparent border-border rounded-none text-sm focus-visible:ring-foreground"
                    placeholder="+60"
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="bg-transparent border-border rounded-none text-sm focus-visible:ring-foreground"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-[10px] text-destructive mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                    Message
                  </label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="bg-transparent border-border rounded-none text-sm focus-visible:ring-foreground min-h-[100px]"
                    placeholder="Tell us about your project"
                  />
                  {errors.message && (
                    <p className="text-[10px] text-destructive mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="outline"
                  disabled={isSubmitting || rateLimitSecondsLeft > 0}
                  className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background text-[10px] tracking-[0.3em] uppercase px-8 py-5 transition-colors duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Sending..."
                    : rateLimitSecondsLeft > 0
                    ? `Wait ${rateLimitSecondsLeft}s`
                    : "Send Message"}
                  {!isSubmitting && rateLimitSecondsLeft === 0 && (
                    <ArrowUpRight size={12} className="ml-2" />
                  )}
                </Button>

                {/* reCAPTCHA badge disclosure — required by Google's Terms of Service */}
                <p className="text-[9px] text-muted-foreground text-center leading-4">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    Terms of Service
                  </a>{" "}
                  apply.
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;