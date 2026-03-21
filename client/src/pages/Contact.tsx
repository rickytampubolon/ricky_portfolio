import { useState } from "react";
import Layout from "../components/Layout";
import { Send, CheckCircle } from "lucide-react";

const WEB3FORMS_ACCESS_KEY = "012cebc9-d8fb-4c62-9879-3b3bc071f3b4";

/* ── Types ───────────────────────────────────────────────────── */
interface FormState {
  firstName: string;
  lastName:  string;
  email:     string;
  subject:   string;
  message:   string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = { firstName: "", lastName: "", email: "", subject: "", message: "" };

/* ── Validation ──────────────────────────────────────────────── */
function validate(fields: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!fields.firstName.trim()) errors.firstName = "First name is required.";
  if (!fields.lastName.trim())  errors.lastName  = "Last name is required.";
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.subject.trim()) errors.subject = "Subject is required.";
  if (!fields.message.trim()) errors.message = "Message is required.";
  return errors;
}

/* ── Submit handler ──────────────────────────────────────────── */
async function handleSubmit(data: FormState): Promise<void> {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      name:    `${data.firstName} ${data.lastName}`,
      email:   data.email,
      subject: data.subject || `New message from ${data.firstName} ${data.lastName}`,
      message: data.message,
    }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    console.error("Web3Forms error:", json);
    throw new Error(json.message ?? "Failed to send message.");
  }
}

/* ── Component ───────────────────────────────────────────────── */
export default function Contact() {
  const [form,      setForm]      = useState<FormState>(EMPTY);
  const [errors,    setErrors]    = useState<FormErrors>({});
  const [touched,   setTouched]   = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(false);
  const [submitErr, setSubmitErr] = useState<string | null>(null);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors(validate({ ...form, [field]: value }));
    }
  };

  const blur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      (Object.keys(form) as (keyof FormState)[]).map((k) => [k, true])
    );
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setSubmitErr(null);
    try {
      await handleSubmit(form);
      setSuccess(true);
      setForm(EMPTY);
      setTouched({});
      setErrors({});
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setSubmitErr(`Something went wrong: ${msg}. Please try again or email me directly.`);
    } finally {
      setLoading(false);
    }
  };

  /* ── Shared field styles ──────────────────────────────────────
     Bottom-border only (no box). Thickens from 1px → 2px on focus.
  ──────────────────────────────────────────────────────────────── */
  const inputBase =
    "w-full bg-transparent border-b border-[#DDDDDD] dark:border-[#2A2A2A] py-2.5 text-[0.9rem] text-[#121212] dark:text-[#E5E5E5] placeholder:text-[#CCCCCC] dark:placeholder:text-[#404040] outline-none transition-all duration-200 focus:border-b-2 focus:border-[#121212] dark:focus:border-[#E5E5E5]";
  const labelBase =
    "block text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-[#888888] dark:text-[#666666] mb-1.5";
  const errorMsg = "mt-1 text-[0.68rem] text-red-500 font-medium";

  return (
    <Layout>
      {/*
        Background: light grey (#F5F5F5) / dark charcoal (#1A1A1A) — per spec.
        The form card sits centered on top of this background.
      */}
      <div className="grow shrink-0 bg-[#F5F5F5] dark:bg-[#1A1A1A] flex flex-col items-center justify-start py-10 md:py-16 px-4">

        {/* Page heading */}
        <div className="flex items-center justify-center gap-3 mb-8 md:mb-12 w-full max-w-lg">
          <div className="w-[7px] h-[7px] bg-[#121212] dark:bg-[#E5E5E5] shrink-0" />
          <h1
            className="font-black tracking-[-0.03em] text-[#121212] dark:text-[#E5E5E5] leading-none"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.6rem, 5vw, 2.8rem)" }}
          >
            Let's talk.
          </h1>
        </div>

        {/* ── Form card: white / dark-grey, sharp corners ───────── */}
        <div className="w-full max-w-lg bg-[#FFFFFF] dark:bg-[#111111] border border-[#EEEEEE] dark:border-[#252525] shadow-[0_20px_60px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-6 md:p-10">

          {/* ── Success state ──────────────────────────────────── */}
          {success ? (
            <div className="flex flex-col items-center text-center py-8">
              <CheckCircle size={44} className="text-[#121212] dark:text-[#E5E5E5] mb-5" strokeWidth={1.25} />
              <h2
                className="text-lg font-bold text-[#121212] dark:text-[#E5E5E5] mb-2 tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Message sent!
              </h2>
              <p className="text-[0.88rem] text-[#888888] dark:text-[#666666] mb-6 leading-relaxed">
                Thanks for reaching out. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-[0.75rem] font-semibold text-[#121212] dark:text-[#E5E5E5] tracking-[0.06em] uppercase hover:opacity-60 transition-opacity"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6">

              {/* First + Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelBase}>
                    First Name <span className="text-[#CCCCCC] dark:text-[#444]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    onBlur={() => blur("firstName")}
                    className={`${inputBase} ${touched.firstName && errors.firstName ? "border-b-red-400 focus:border-b-red-500" : ""}`}
                    autoComplete="given-name"
                  />
                  {touched.firstName && errors.firstName && (
                    <p className={errorMsg}>{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className={labelBase}>
                    Last Name <span className="text-[#CCCCCC] dark:text-[#444]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    onBlur={() => blur("lastName")}
                    className={`${inputBase} ${touched.lastName && errors.lastName ? "border-b-red-400 focus:border-b-red-500" : ""}`}
                    autoComplete="family-name"
                  />
                  {touched.lastName && errors.lastName && (
                    <p className={errorMsg}>{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelBase}>
                  Email <span className="text-[#CCCCCC] dark:text-[#444]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  onBlur={() => blur("email")}
                  className={`${inputBase} ${touched.email && errors.email ? "border-b-red-400 focus:border-b-red-500" : ""}`}
                  autoComplete="email"
                />
                {touched.email && errors.email && (
                  <p className={errorMsg}>{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className={labelBase}>
                  Subject <span className="text-[#CCCCCC] dark:text-[#444]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="How can I help you?"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  onBlur={() => blur("subject")}
                  className={`${inputBase} ${touched.subject && errors.subject ? "border-b-red-400 focus:border-b-red-500" : ""}`}
                  autoComplete="off"
                />
                {touched.subject && errors.subject && (
                  <p className={errorMsg}>{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className={labelBase}>
                  Message <span className="text-[#CCCCCC] dark:text-[#444]">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project, opportunity, or just say hello…"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  onBlur={() => blur("message")}
                  className={`${inputBase} resize-none ${touched.message && errors.message ? "border-b-red-400 focus:border-b-red-500" : ""}`}
                />
                {touched.message && errors.message && (
                  <p className={errorMsg}>{errors.message}</p>
                )}
              </div>

              {/* Submit error */}
              {submitErr && (
                <p className="text-[0.8rem] text-red-500 font-medium">{submitErr}</p>
              )}

              {/* ── Large Send button — high-contrast black/white ── */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-lift w-full inline-flex items-center justify-center gap-2.5 bg-[#121212] dark:bg-[#E5E5E5] text-white dark:text-[#0A0A0A] py-4 text-[0.75rem] font-bold tracking-[0.14em] uppercase shadow-[0_4px_16px_rgba(0,0,0,0.15)] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 dark:border-[#0A0A0A]/30 border-t-white dark:border-t-[#0A0A0A] rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} strokeWidth={2} />
                      Send Message
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Sub-copy */}
        <p className="mt-6 text-[0.73rem] text-[#AAAAAA] dark:text-[#555555] text-center">
          Or email me directly at{" "}
          <a
            href="mailto:rickytampubolon97@gmail.com"
            className="text-[#121212] dark:text-[#E5E5E5] hover:underline underline-offset-2"
          >
            rickytampubolon97@gmail.com
          </a>
        </p>

      </div>
    </Layout>
  );
}
