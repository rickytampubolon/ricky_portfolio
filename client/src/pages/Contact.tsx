import { useState } from "react";
import Layout from "../components/Layout";
import { Send, CheckCircle } from "lucide-react";

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

/* ── Placeholder submit handler ──────────────────────────────── */
async function handleSubmit(data: FormState): Promise<void> {
  // TODO: Replace with your actual form submission logic, e.g.:
  // await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  console.log("Form submitted:", data);
  await new Promise((res) => setTimeout(res, 800)); // simulate network delay
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
    } catch {
      setSubmitErr("Something went wrong. Please try again or email me directly.");
    } finally {
      setLoading(false);
    }
  };

  /* Shared field styles */
  const inputBase =
    "w-full bg-transparent border-b-2 border-[#E0E0E0] dark:border-[#333] py-2.5 text-[0.92rem] text-[#1A1A1A] dark:text-[#E0E0E0] placeholder:text-[#AAAAAA] dark:placeholder:text-[#555] outline-none transition-colors duration-200 focus:border-[#007BFF] dark:focus:border-[#3B9EFF]";
  const labelBase =
    "block text-[0.72rem] font-bold tracking-[0.08em] uppercase text-[#666666] dark:text-[#888888] mb-1.5";
  const errorMsg = "mt-1 text-[0.72rem] text-red-500 font-medium";

  return (
    <Layout>
      {/* Full-page beige background */}
      <div className="min-h-[calc(100vh-3.5rem)] bg-[#F5EDE5] dark:bg-[#1A1A1A] flex flex-col items-center justify-start py-16 px-4">

        {/* Heading with blue square icon */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-[10px] h-[10px] bg-[#007BFF] rounded-[2px] shrink-0" />
          <h1
            className="font-black tracking-[-0.03em] text-[#1A1A1A] dark:text-[#E0E0E0] leading-none"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            Let's talk.
          </h1>
        </div>

        {/* ── White form card ──────────────────────────────────── */}
        <div className="w-full max-w-lg bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-[#E8E8E8] dark:border-[#2C2C2C] p-8 md:p-10">

          {/* Success state */}
          {success ? (
            <div className="flex flex-col items-center text-center py-8">
              <CheckCircle size={48} className="text-[#007BFF] mb-4" strokeWidth={1.5} />
              <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-2">Message sent!</h2>
              <p className="text-[0.9rem] text-[#666666] dark:text-[#888888] mb-6">
                Thanks for reaching out. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-[0.82rem] font-semibold text-[#007BFF] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6">

              {/* First Name + Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelBase}>
                    First Name <span className="text-[#007BFF]">*</span>
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
                    Last Name <span className="text-[#007BFF]">*</span>
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
                  Email <span className="text-[#007BFF]">*</span>
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
                <label className={labelBase}>Subject</label>
                <input
                  type="text"
                  placeholder="How can I help you?"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className={inputBase}
                  autoComplete="off"
                />
              </div>

              {/* Message */}
              <div>
                <label className={labelBase}>Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project, opportunity, or just say hello…"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={`${inputBase} resize-none`}
                />
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
                  className="inline-flex items-center justify-center gap-2 bg-[#007BFF] text-white px-10 py-3 rounded-full text-sm font-semibold tracking-[0.06em] hover:bg-[#0056CC] transition-all duration-200 shadow-[0_4px_14px_rgba(0,123,255,0.32)] hover:-translate-y-px active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
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
        <p className="mt-6 text-[0.78rem] text-[#999999]">
          Or email me directly at{" "}
          <a href="mailto:rickytampubolon97@gmail.com" className="text-[#007BFF] hover:underline">
            rickytampubolon97@gmail.com
          </a>
        </p>

      </div>
    </Layout>
  );
}
