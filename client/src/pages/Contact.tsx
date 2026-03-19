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

  /* ── Field styles — bottom-border, monochromatic focus ─── */
  const inputBase =
    "w-full bg-transparent border-b-2 border-[#E0E0E0] dark:border-[#333333] py-2.5 text-[0.92rem] text-[#1A1A1A] dark:text-[#E0E0E0] placeholder:text-[#BBBBBB] dark:placeholder:text-[#555] outline-none transition-colors duration-200 focus:border-b-[#1A1A1A] dark:focus:border-b-[#E0E0E0]";
  const labelBase =
    "block text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[#888888] dark:text-[#666666] mb-1.5";
  const errorMsg  = "mt-1 text-[0.72rem] text-red-500 font-medium";

  return (
    <Layout>
      {/* Page background — uses surface color */}
      <div className="min-h-[calc(100vh-3.5rem)] bg-[#F5F5F5] dark:bg-[#1E1E1E] flex flex-col items-center justify-start py-16 px-4">

        {/* ── Page heading ─────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-[8px] h-[8px] bg-[#1A1A1A] dark:bg-[#E0E0E0] rounded-[2px] shrink-0" />
          <h1
            className="font-black tracking-[-0.03em] text-[#1A1A1A] dark:text-[#E0E0E0] leading-none uppercase"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            Let's talk.
          </h1>
        </div>

        {/* ── Form card ────────────────────────────────────── */}
        <div className="w-full max-w-lg bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-[#E0E0E0] dark:border-[#333333] p-8 md:p-10">

          {/* Success state */}
          {success ? (
            <div className="flex flex-col items-center text-center py-8">
              <CheckCircle size={44} className="text-[#1A1A1A] dark:text-[#E0E0E0] mb-4" strokeWidth={1.5} />
              <h2
                className="text-xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Message sent!
              </h2>
              <p
                className="text-[0.9rem] text-[#666666] dark:text-[#888888] mb-6"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Thanks for reaching out. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-[0.82rem] font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] hover:underline"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6">

              {/* First Name + Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelBase} style={{ fontFamily: "var(--font-ui)" }}>
                    First Name <span className="text-[#1A1A1A] dark:text-[#E0E0E0]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    onBlur={() => blur("firstName")}
                    className={`${inputBase} ${touched.firstName && errors.firstName ? "!border-b-red-400 focus:!border-b-red-500" : ""}`}
                    autoComplete="given-name"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  {touched.firstName && errors.firstName && (
                    <p className={errorMsg}>{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className={labelBase} style={{ fontFamily: "var(--font-ui)" }}>
                    Last Name <span className="text-[#1A1A1A] dark:text-[#E0E0E0]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    onBlur={() => blur("lastName")}
                    className={`${inputBase} ${touched.lastName && errors.lastName ? "!border-b-red-400 focus:!border-b-red-500" : ""}`}
                    autoComplete="family-name"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  {touched.lastName && errors.lastName && (
                    <p className={errorMsg}>{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelBase} style={{ fontFamily: "var(--font-ui)" }}>
                  Email <span className="text-[#1A1A1A] dark:text-[#E0E0E0]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  onBlur={() => blur("email")}
                  className={`${inputBase} ${touched.email && errors.email ? "!border-b-red-400 focus:!border-b-red-500" : ""}`}
                  autoComplete="email"
                  style={{ fontFamily: "var(--font-body)" }}
                />
                {touched.email && errors.email && (
                  <p className={errorMsg}>{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className={labelBase} style={{ fontFamily: "var(--font-ui)" }}>Subject</label>
                <input
                  type="text"
                  placeholder="How can I help you?"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className={inputBase}
                  autoComplete="off"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>

              {/* Message */}
              <div>
                <label className={labelBase} style={{ fontFamily: "var(--font-ui)" }}>Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project, opportunity, or just say hello…"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={`${inputBase} resize-none`}
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>

              {/* Submit error */}
              {submitErr && (
                <p className="text-[0.82rem] text-red-500 font-medium">{submitErr}</p>
              )}

              {/* Send button — primary black */}
              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] dark:bg-[#E0E0E0] text-white dark:text-[#1A1A1A] px-10 py-3 rounded-full text-[0.8rem] font-bold tracking-[0.08em] uppercase hover:bg-[#000000] dark:hover:bg-[#FFFFFF] transition-all duration-200 hover:-translate-y-px active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 min-h-[44px]"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 dark:border-[#1A1A1A]/40 border-t-white dark:border-t-[#1A1A1A] rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      Send
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Sub-copy */}
        <p
          className="mt-6 text-[0.78rem] text-[#AAAAAA] dark:text-[#555555]"
          style={{ fontFamily: "var(--font-ui)", maxWidth: "none" }}
        >
          Or email me directly at{" "}
          <a
            href="mailto:rickytampubolon97@gmail.com"
            className="text-[#1A1A1A] dark:text-[#E0E0E0] underline hover:opacity-60 transition-opacity"
          >
            rickytampubolon97@gmail.com
          </a>
        </p>

      </div>
    </Layout>
  );
}
