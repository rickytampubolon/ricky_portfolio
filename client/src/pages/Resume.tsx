import { experience, earlier, education, skills, type Role } from "../data/resumeData";

/* Initial in a white tile, in place of external company logos */
function Mark({ name }: { name: string }) {
  return (
    <span aria-hidden="true" className="tile w-11 h-11 rounded-xl grid place-items-center font-semibold text-[0.95rem] shrink-0">
      {name.trim().charAt(0).toUpperCase()}
    </span>
  );
}

function Rows({ items }: { items: Role[] }) {
  return (
    <ul>
      {items.map((r) => (
        <li key={`${r.company}-${r.title}-${r.period}`} className="flex items-center gap-4 py-5 border-b border-border last:border-b-0">
          <Mark name={r.company} />
          <div className="min-w-0">
            <p className="leading-snug">
              {r.title} <span className="text-muted-foreground">at</span>{" "}
              <span className="font-semibold">{r.company}</span>
            </p>
            <p className="text-[0.85rem] text-muted-foreground mt-0.5">{r.period}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Heading({ children, id }: { children: React.ReactNode; id?: string }) {
  return <h2 id={id} className="font-display text-[clamp(1.9rem,3.2vw,2.5rem)] mb-4">{children}</h2>;
}

export default function ExperienceSection() {
  return (
    <>
      <section id="experience" className="bg-secondary px-6 md:px-12 py-20 md:py-28 scroll-mt-0">
        <div className="grid lg:grid-cols-2 gap-x-20 gap-y-16 max-w-6xl">
          <div>
            <Heading>Working experience</Heading>
            <Rows items={experience} />
          </div>
          <div className="space-y-16">
            <div id="education" className="scroll-mt-6">
              <Heading>Education</Heading>
              <Rows items={education} />
            </div>
            <div>
              <Heading>Earlier roles</Heading>
              <Rows items={earlier} />
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="px-6 md:px-12 py-20 md:py-28">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 max-w-6xl items-start">
          <div>
            <Heading>Experience across products and industries</Heading>
            <p className="text-muted-foreground max-w-sm">
              Mobility, logistics, fulfillment and education.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {skills.map((s) => (
              <li key={s} className="tile rounded-full px-5 py-2.5 text-[0.92rem]">{s}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

