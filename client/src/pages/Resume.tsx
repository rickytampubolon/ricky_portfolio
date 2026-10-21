import Layout from "../components/Layout";
import { experience, earlier, education, skills, type Role } from "../data/resumeData";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid md:grid-cols-[10rem_1fr] gap-x-10 gap-y-4 py-10 border-t border-border">
      <h2 className="text-muted-foreground text-[0.95rem] font-sans tracking-normal">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function Rows({ items }: { items: Role[] }) {
  return (
    <ul className="space-y-5">
      {items.map((r) => (
        <li key={`${r.company}-${r.period}`} className="grid grid-cols-[1fr_auto] gap-x-6">
          <div>
            <p className="leading-snug">{r.title}</p>
            <p className="text-muted-foreground text-[0.95rem]">{r.company}</p>
          </div>
          <p className="text-muted-foreground text-[0.95rem] tabular-nums whitespace-nowrap">{r.period}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Resume() {
  return (
    <Layout title="Resume">
      <div className="px-6 md:px-12 pt-8 md:pt-16 pb-16 max-w-4xl w-full">
        <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] mb-14 md:mb-20">Resume</h1>

        <Section title="Experience"><Rows items={experience} /></Section>
        <Section title="Earlier"><Rows items={earlier} /></Section>
        <Section title="Education"><Rows items={education} /></Section>
        <Section title="Skills">
          <p className="leading-relaxed max-w-lg">{skills.join(", ")}.</p>
        </Section>
      </div>
    </Layout>
  );
}
