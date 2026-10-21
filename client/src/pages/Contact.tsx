import { useState, useRef } from "react";

const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "012cebc9-d8fb-4c62-9879-3b3bc071f3b4";

/* ── Types ───────────────────────────────────────────────────── */
interface FormState {
  firstName: string;
  lastName:  string;
  email:     string;
  message:   string;
}

type Field = keyof FormState;
type FormErrors = Partial<Record<Field, string>>;

const EMPTY: FormState = { firstName: "", lastName: "", email: "", message: "" };
const ORDER: Field[] = ["firstName", "lastName", "email", "message"];

/* ── Validation ──────────────────────────────────────────────── */
function validate(fields: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!fields.firstName.trim()) errors.firstName = "Enter your first name.";
  if (!fields.lastName.trim())  errors.lastName  = "Enter your last name.";
  if (!fields.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address, like name@example.com.";
  }
  if (!fields.message.trim()) errors.message = "Write a short message.";
  return errors;
}

/* ── Submit handler ──────────────────────────────────────────── */
async function submitForm(data: FormState): Promise<void> {
  const name = `${data.firstName} ${data.lastName}`;
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      name,
      email:   data.email,
      subject: `New message from ${name}`,
      message: data.message,
    }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    console.error("Web3Forms error:", json);
    throw new Error(json.message ?? "Failed to send message.");
  }
}

/* ── Labelled field with an inline, announced error ──────────── */
interface FieldProps {
  id:        Field;
  label:     string;
  error?:    string;
  multiline?: boolean;
  type?:     string;
  autoComplete?: string;
  value:     string;
  onChange:  (value: string) => void;
  onBlur:    () => void;
}

function TextField({ id, label, error, multiline, type = "text", autoComplete, value, onChange, onBlur }: FieldProps) {
  const errId = `${id}-error`;
  const shared = {
    id,
    value,
    required: true,
    "aria-required": true as const,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errId : undefined,
    autoComplete,
    onBlur,
    className: `field ${error ? "field-error" : ""}`,
  };
  return (
    <div>
      <label htmlFor={id} className="block text-[0.9rem] text-subtle mb-1.5">{label}</label>
      {multiline ? (
        <textarea {...shared} rows={4} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input {...shared} type={type} onChange={(e) => onChange(e.target.value)} />
      )}
      {error && <p id={errId} className="mt-1.5 text-[0.85rem] text-destructive">{error}</p>}
    </div>
  );
}

/* ── Component ───────────────────────────────────────────────── */
export default function ContactSection() {
  const [form,      setForm]      = useState<FormState>(EMPTY);
  const [errors,    setErrors]    = useState<FormErrors>({});
  const [touched,   setTouched]   = useState<Partial<Record<Field, boolean>>>({});
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(false);
  const [submitErr, setSubmitErr] = useState<string | null>(null);
  const submitting = useRef(false);

  const update = (field: Field, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field: Field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  };

  const shown = (field: Field) => (touched[field] ? errors[field] : undefined);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;
    setTouched(Object.fromEntries(ORDER.map((k) => [k, true])));
    const errs = validate(form);
    setErrors(errs);
    const firstBad = ORDER.find((k) => errs[k]);
    if (firstBad) {
      document.getElementById(firstBad)?.focus();
      return;
    }

    submitting.current = true;
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
      setSubmitErr(`The message was not sent (${msg}). Try again, or email me directly.`);
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-label" className="card md:col-span-2 !p-6 md:!p-8">
      <h2 id="contact-label" className="chip">Say hello</h2>
      <div className="mt-8">
        <p className="text-[1.6rem] font-medium tracking-tight mb-7">Have a role or a project in mind?</p>

        {success ? (
          <div role="status" className="py-2">
            <p className="text-[1.25rem] font-medium mb-2">Message sent</p>
            <p className="text-subtle mb-5">Thanks for reaching out. I'll reply soon.</p>
            <button onClick={() => setSuccess(false)} className="link inline-flex items-center min-h-11">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <TextField id="firstName" label="First name" autoComplete="given-name"
                value={form.firstName} error={shown("firstName")}
                onChange={(v) => update("firstName", v)} onBlur={() => blur("firstName")} />
              <TextField id="lastName" label="Last name" autoComplete="family-name"
                value={form.lastName} error={shown("lastName")}
                onChange={(v) => update("lastName", v)} onBlur={() => blur("lastName")} />
            </div>

            <TextField id="email" label="Email" type="email" autoComplete="email"
              value={form.email} error={shown("email")}
              onChange={(v) => update("email", v)} onBlur={() => blur("email")} />

            <TextField id="message" label="Message" multiline
              value={form.message} error={shown("message")}
              onChange={(v) => update("message", v)} onBlur={() => blur("message")} />

            {submitErr && <p role="alert" className="text-[0.9rem] text-destructive">{submitErr}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-foreground text-background px-8 min-h-12 rounded-full text-[0.95rem] font-medium hover:bg-foreground/85 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
