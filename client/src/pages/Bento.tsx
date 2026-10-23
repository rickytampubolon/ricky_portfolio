import { experience, education, type Role } from "../data/resumeData";

const half = Math.ceil(experience.length / 2);

/* One vertical timeline column. Company leads, because that is what gets scanned. */
function Timeline({ items, continues = false, current = false }: { items: Role[]; continues?: boolean; current?: boolean }) {
  return (
    <ol>
      {items.map((r, i) => {
        const last = i === items.length - 1;
        const isNow = current && i === 0;
        return (
          <li key={`${r.company}-${r.period}`} className={`relative pl-6 ${last && !continues ? "" : "pb-7"} ${last ? "md:pb-0" : ""}`}>
            <span
              aria-hidden="true"
              className="absolute left-0 top-[0.5rem] w-2 h-2 rounded-full"
              style={isNow
                ? { background: "var(--cyan)", boxShadow: "0 0 0 3px color-mix(in srgb, var(--cyan) 28%, transparent)" }
                : { background: "var(--ink)" }}
            />
            {/* The line runs from this dot to the next one. On mobile the two lists stack, so the first list keeps its last line. */}
            {(!last || continues) && (
              <span
                aria-hidden="true"
                className={`absolute left-[3.5px] top-[1rem] -bottom-[0.5rem] w-px bg-foreground/70 ${last ? "md:hidden" : ""}`}
              />
            )}
            <p className="text-[1.125rem] font-medium leading-snug">{r.company}</p>
            <p className="text-base leading-snug mt-1">{r.title}</p>
            <p className="text-[0.8125rem] text-subtle mt-1">{r.period}</p>
          </li>
        );
      })}
    </ol>
  );
}

function ExperienceCard() {
  return (
    <section id="experience" aria-labelledby="exp-label" className="card md:col-span-2 !p-6 md:!p-8">
      <h2 id="exp-label" className="chip">Experience and education</h2>

      <div className="mt-8 grid md:grid-cols-2 gap-x-12 ml-1">
        <Timeline items={experience.slice(0, half)} continues current />
        <Timeline items={experience.slice(half)} />
      </div>

      <div id="education" className="mt-9 pt-7 border-t border-border scroll-mt-6">
        <h3 className="text-[0.8125rem] text-subtle mb-5 font-sans tracking-normal">Education</h3>
        <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          {education.map((e) => (
            <li key={e.title}>
              <p className="text-[1.125rem] font-medium leading-snug">{e.company}</p>
              <p className="text-base leading-snug mt-1">{e.title}</p>
              <p className="text-[0.8125rem] text-subtle mt-1">{e.period}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export { ExperienceCard };
