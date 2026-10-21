import { useState } from "react";
import { experience, education } from "../data/resumeData";

const timeline = experience;
const PREVIEW = 6;

/* Vertical timeline: latest roles first, the rest on request */
function ExperienceCard() {
  const [all, setAll] = useState(false);
  const items = all ? timeline : timeline.slice(0, PREVIEW);

  return (
    <section id="experience" aria-labelledby="exp-label" className="card flex flex-col">
      <h2 id="exp-label" className="chip self-start">My experience</h2>

      <ol className="mt-7 ml-1">
        {items.map((r, i) => (
          <li key={`${r.company}-${r.title}-${r.period}`} className="relative pl-6 pb-5 last:pb-0">
            <span aria-hidden="true" className="absolute left-0 top-[0.5rem] w-2 h-2 rounded-full bg-foreground" />
            {i < items.length - 1 && (
              <span aria-hidden="true" className="absolute left-[3.5px] top-[1.15rem] bottom-0 w-px bg-foreground/70" />
            )}
            <p className="text-[0.95rem] leading-snug">{r.title} at {r.company}</p>
            <p className="text-[0.82rem] text-subtle mt-0.5">{r.period}</p>
          </li>
        ))}
      </ol>

      {timeline.length > PREVIEW && (
        <button
          onClick={() => setAll((a) => !a)}
          aria-expanded={all}
          className="link self-start mt-4 min-h-11 inline-flex items-center text-[0.92rem]"
        >
          {all ? "Show fewer" : `Show all ${timeline.length} roles`}
        </button>
      )}
    </section>
  );
}

function EducationCard() {
  return (
    <section id="education" aria-labelledby="edu-label" className="card">
      <h2 id="edu-label" className="chip">Education</h2>
      <ul className="mt-7 space-y-7">
        {education.map((e) => (
          <li key={e.title}>
            <p className="text-[1.15rem] leading-snug tracking-tight">{e.title}</p>
            <p className="text-[0.92rem] text-subtle mt-1.5">{e.company}</p>
            <p className="text-[0.82rem] text-subtle">{e.period}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export { ExperienceCard, EducationCard };
