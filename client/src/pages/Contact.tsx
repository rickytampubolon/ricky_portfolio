import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Send, CheckCircle, ArrowUp } from "lucide-react";
import { profile } from "../data/homeData";

const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "012cebc9-d8fb-4c62-9879-3b3bc071f3b4";

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

/* ── Shared field styles ─────────────────────────────────────── */
const inputBase = "apple-input";
const labelBase =
  "block text-[0.68rem] font-mono tracking-[0.08em] uppercase text-mint mb-1.5";
const errorMsg = "mt-1 text-[0.72rem] text-destructive font-medium";

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
async function submitForm(data: FormState): Promise<void> {
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

/* ── FormField ───────────────────────────────────────────────── */
interface FormFieldProps {
  label:    string;
  error?:   string;
  touched?: boolean;
  children: React.ReactNode;
}

function FormField({ label, error, touched, children }: FormFieldProps) {
  const hasError = touched && error;
  return (
    <div>
      <label className={labelBase}>
        {label} <span className="text-mint/50">*</span>
      </label>
      {children}
      {hasError && <p className={errorMsg}>{error}</p>}
    </div>
  );
}

const inputError = "border-destructive";

/* ── Component ───────────────────────────────────────────────── */
export default function Contact() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [form,      setForm]     = useState<FormState>(EMPTY);
  const [errors,    setErrors]   = useState<FormErrors>({});
  const [touched,   setTouched]  = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [loading,   setLoading]  = useState(false);
  const [success,   setSuccess]  = useState(false);
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
      await submitForm(form);
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

  return (
    <Layout>
      <div className="px-5 md:px-16 lg:px-24 py-10 md:py-20 max-w-4xl mx-auto">

        {/* ── Page intro ─────────────────────────────────────── */}
        <div className="mb-10 md:mb-14">
          <p className="font-mono text-mint text-sm mb-3">04. Contact</p>
          <h1 className="font-black tracking-[-0.03em] text-foreground leading-none mb-3">
            Let's talk.
          </h1>
          <p className="text-subtle text-[0.88rem] max-w-xl">
            Have a project, opportunity, or just want to say hello? Send me a message.
          </p>
        </div>

        {/* ── Form card ──────────────────────────────────────── */}
        <div className="w-full max-w-lg apple-card p-5 md:p-10">

          {success ? (
            <div className="flex flex-col items-center text-center py-8">
              <CheckCircle size={48} className="text-mint mb-4" strokeWidth={1.5} />
              <h2 className="text-xl font-bold text-foreground mb-2">Message sent!</h2>
              <p className="text-[0.9rem] text-muted-foreground mb-6">
                Thanks for reaching out. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-[0.82rem] font-mono text-mint hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="First Name" error={errors.firstName} touched={touched.firstName}>
                  <input
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    onBlur={() => blur("firstName")}
                    className={`${inputBase} ${touched.firstName && errors.firstName ? inputError : ""}`}
                    autoComplete="given-name"
                  />
                </FormField>
                <FormField label="Last Name" error={errors.lastName} touched={touched.lastName}>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    onBlur={() => blur("lastName")}
                    className={`${inputBase} ${touched.lastName && errors.lastName ? inputError : ""}`}
                    autoComplete="family-name"
                  />
                </FormField>
              </div>

              <FormField label="Email" error={errors.email} touched={touched.email}>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  onBlur={() => blur("email")}
                  className={`${inputBase} ${touched.email && errors.email ? inputError : ""}`}
                  autoComplete="email"
                />
              </FormField>

              <FormField label="Subject" error={errors.subject} touched={touched.subject}>
                <input
                  type="text"
                  placeholder="How can I help you?"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  onBlur={() => blur("subject")}
                  className={`${inputBase} ${touched.subject && errors.subject ? inputError : ""}`}
                  autoComplete="off"
                />
              </FormField>

              <FormField label="Message" error={errors.message} touched={touched.message}>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project, opportunity, or just say hello…"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  onBlur={() => blur("message")}
                  className={`${inputBase} resize-none ${touched.message && errors.message ? inputError : ""}`}
                />
              </FormField>

              {submitErr && (
                <p className="text-[0.82rem] text-destructive font-medium">{submitErr}</p>
              )}

              <div className="pt-2 flex justify-start">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 border border-mint text-mint text-[0.88rem] px-8 py-3 rounded-full hover:bg-mint/10 transition-colors duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-mint/40 border-t-mint rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

        <p className="mt-6 text-[0.75rem] text-muted-foreground">
          Or email me directly at{" "}
          <a href={`mailto:${profile.email}`} className="text-mint hover:underline font-mono">
            {profile.email}
          </a>
        </p>

      </div>
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-16 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-mint text-mint hover:bg-mint/10 transition-all duration-300 ${
          showScrollTop ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-3"
        }`}
      >
        <ArrowUp size={16} />
      </button>
    </Layout>
  );
}
