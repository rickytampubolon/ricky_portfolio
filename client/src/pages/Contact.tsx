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
  const [form,     setForm]     = useState<FormState>(EMPTY);
  const [errors,   setErrors]   = useState<FormErrors>({});
  const [touched,  setTouched]  = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
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

  /* Shared field styles */
  const inputBase =
    "w-full bg-transparent border-b-2 border-[#E0E0E0] dark:border-[#333] py-2.5 text-[0.92rem] text-[#1A1A1A] dark:text-[#E0E0E0] placeholder:text-[#AAAAAA] dark:placeholder:text-[#555] outline-none transition-colors duration-200 focus:border-[#1A1A1A] dark:focus:border-[#E0E0E0]";
  const labelBase =
    "block text-[0.72rem] font-bold tracking-[0.08em] uppercase text-[#666666] dark:text-[#888888] mb-1.5";
  const errorMsg = "mt-1 text-[0.72rem] text-red-500 font-medium";

  return (
    <Layout>
      {/* Background fill */}
      <div className="grow shrink-0 bg-[#F2F2F2] dark:bg-[#222222] flex flex-col items-center justify-start py-8 md:py-14 px-4">

        {/* Heading */}
        <div className="flex items-center justify-center gap-3 mb-7 md:mb-10 w-full max-w-lg">
          <div className="w-[9px] h-[9px] bg-[#1A1A1A] dark:bg-[#E0E0E0] rounded-[2px] shrink-0" />
          <h1
            className="font-black tracking-[-0.03em] text-[#1A1A1A] dark:text-[#E0E0E0] leading-none"
            style={{ fontSize: "clamp(1.6rem, 5vw, 2.8rem)" }}
          >
            Let's talk.
          </h1>
        </div>

        {/* ── White form card ──────────────────────────────────── */}
        <div className="w-full max-w-lg bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-[#E8E8E8] dark:border-[#2C2C2C] p-6 md:p-10">

          {/* Success state */}
          {success ? (
            <div className="flex flex-col items-center text-center py-8">
              <CheckCircle size={48} className="text-[#1A1A1A] dark:text-[#E0E0E0] mb-4" strokeWidth={1.5} />
              <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-2">Message sent!</h2>
              <p className="text-[0.9rem] text-[#666666] dark:text-[#888888] mb-6">
                Thanks for reaching out. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-[0.82rem] font-semibold text-[#1A1A1A] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">

              {/* First Name + Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelBase}>
                    First Name <span className="text-[#888888]">*</span>
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
                    Last Name <span className="text-[#888888]">*</span>
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
                  Email <span className="text-[#888888]">*</span>
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
                  Subject <span className="text-[#888888]">*</span>
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
                  Message <span className="text-[#888888]">*</span>
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
                <p className="text-[0.82rem] text-red-500 font-medium">{submitErr}</p>
              )}

              {/* Send button */}
              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] dark:bg-[#E0E0E0] text-white dark:text-[#121212] px-10 py-3 rounded-full text-sm font-semibold tracking-[0.06em] hover:bg-[#000000] dark:hover:bg-[#FFFFFF] transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:-translate-y-px active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Sub-copy */}
        <p className="mt-5 text-[0.75rem] text-[#999999] text-center">
          Or email me directly at{" "}
          <a href="mailto:rickytampubolon97@gmail.com" className="text-[#1A1A1A] dark:text-[#E0E0E0] hover:underline">
            rickytampubolon97@gmail.com
          </a>
        </p>

      </div>
    </Layout>
  );
}
