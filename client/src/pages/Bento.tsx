import { experience, earlier, education } from "../data/resumeData";

const timeline = [...experience, ...earlier];

/* Vertical timeline that fades at the top and bottom edges */
function ExperienceCard() {
  return (
    <section id="experience" aria-labelledby="exp-label" className="card h-[19rem] md:row-span-1">
      <span id="exp-label" className="chip">My experience</span>
      <ol
        tabIndex={0}
        aria-label="Experience timeline, scrollable"
        className="absolute inset-x-5 top-14 bottom-0 overflow-y-auto pb-6 pt-3 pl-5 space-y-4 border-l border-transparent focus-visible:outline-offset-[-2px]"
        style={{ maskImage: "linear-gradient(to bottom, transparent 0, #000 14%, #000 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 14%, #000 88%, transparent 100%)" }}
      >
        {timeline.map((r, i) => (
          <li key={`${r.company}-${r.title}-${r.period}`} className="relative pl-5">
            <span aria-hidden="true" className="absolute left-0 top-[0.45rem] w-2 h-2 rounded-full bg-foreground" />
            {i < timeline.length - 1 && (
              <span aria-hidden="true" className="absolute left-[3px] top-[1.1rem] -bottom-[1.1rem] w-px bg-foreground/80" />
            )}
            <p className="text-[0.88rem] leading-snug">{r.title} at {r.company}</p>
            <p className="text-[0.75rem] text-muted-foreground">{r.period}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function EducationCard() {
  return (
    <section id="education" aria-labelledby="edu-label" className="card h-[19rem]">
      <span id="edu-label" className="chip">Education</span>
      <ul className="mt-8 space-y-6">
        {education.map((e) => (
          <li key={e.title}>
            <p className="text-[0.95rem] leading-snug">{e.title}</p>
            <p className="text-[0.8rem] text-muted-foreground mt-1">{e.company}</p>
            <p className="text-[0.75rem] text-muted-foreground">{e.period}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export { ExperienceCard, EducationCard };
