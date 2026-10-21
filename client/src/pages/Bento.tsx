import { experience, education, type Role } from "../data/resumeData";

const half = Math.ceil(experience.length / 2);

/* One vertical timeline column. Company leads, because that is what gets scanned. */
function Timeline({ items, continues = false }: { items: Role[]; continues?: boolean }) {
  return (
    <ol>
      {items.map((r, i) => (
        <li key={`${r.company}-${r.period}`} className={`relative pl-6 ${i === items.length - 1 && !continues ? "" : "pb-7"} ${i === items.length - 1 ? "md:pb-0" : ""}`}>
          <span aria-hidden="true" className="absolute left-0 top-[0.5rem] w-2 h-2 rounded-full bg-foreground" />
          {/* On mobile the two lists stack, so the first list's last item keeps its line */}
          {(i < items.length - 1 || continues) && (
            <span
              aria-hidden="true"
              className={`absolute left-[3.5px] top-[1.15rem] bottom-0 w-px bg-foreground/70 ${i === items.length - 1 ? "md:hidden" : ""}`}
            />
          )}
          <p className="text-[1.05rem] font-medium leading-snug">{r.company}</p>
          <p className="text-[0.95rem] leading-snug mt-1">{r.title}</p>
          <p className="text-[0.82rem] text-subtle mt-1">{r.period}</p>
        </li>
      ))}
    </ol>
  );
}

function ExperienceCard() {
  return (
    <section id="experience" aria-labelledby="exp-label" className="card md:col-span-2 !p-6 md:!p-8">
      <h2 id="exp-label" className="chip">My experience</h2>
      <div className="mt-8 grid md:grid-cols-2 gap-x-12 ml-1">
        <Timeline items={experience.slice(0, half)} continues />
        <Timeline items={experience.slice(half)} />
      </div>
    </section>
  );
}

function EducationCard() {
  return (
    <section id="education" aria-labelledby="edu-label" className="card md:col-span-2 !p-6 md:!p-8">
      <h2 id="edu-label" className="chip">Education</h2>
      <ul className="mt-8 grid md:grid-cols-2 gap-x-12 gap-y-7">
        {education.map((e) => (
          <li key={e.title}>
            <p className="text-[1.05rem] font-medium leading-snug">{e.company}</p>
            <p className="text-[0.95rem] leading-snug mt-1">{e.title}</p>
            <p className="text-[0.82rem] text-subtle mt-1">{e.period}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export { ExperienceCard, EducationCard };
