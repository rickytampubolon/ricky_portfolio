import { useEffect, useState } from "react";
import { experience, earlier, education } from "../data/resumeData";
import { sectors } from "../data/homeData";

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

function IndustriesCard() {
  return (
    <section aria-labelledby="ind-label" className="card h-[19rem]">
      <span id="ind-label" className="chip">Industries</span>
      <ul className="mt-8 space-y-2.5">
        {sectors.map((s) => (
          <li key={s} className="text-[1.4rem] leading-tight font-medium tracking-tight">{s}</li>
        ))}
      </ul>
    </section>
  );
}

/* Line-art city card with a live local clock */
function MapCard() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString("en-US", { timeZone: "Asia/Jakarta", hour: "numeric", minute: "2-digit", second: "2-digit" });

  return (
    <section aria-labelledby="map-label" className="card min-h-[19rem] !p-0 flex flex-col">
      <span id="map-label" className="chip absolute left-5 top-5">Map</span>
      <svg aria-hidden="true" viewBox="0 0 300 200" className="absolute inset-x-0 top-0 w-full h-full text-foreground" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor">
        <g strokeWidth="0.6" opacity="0.35">
          {Array.from({ length: 13 }).map((_, i) => <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25 + 40} y2="200" />)}
          {Array.from({ length: 9 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 25} x2="300" y2={i * 25 - 22} />)}
        </g>
        <g strokeWidth="1.1" opacity="0.8">
          <path d="M-10 120 C60 95 90 140 150 100 S250 70 310 90" />
          <path d="M40 -10 C70 50 60 110 110 210" />
          <path d="M190 -10 C200 40 170 90 215 210" />
        </g>
        <circle cx="150" cy="100" r="5" fill="currentColor" stroke="none" />
        <circle cx="150" cy="100" r="13" strokeWidth="0.8" opacity="0.5" />
      </svg>
      <div className="mt-auto relative px-4 pb-5 pt-24 text-center bg-gradient-to-t from-white via-white/95 to-transparent">
        <p className="text-[1.45rem] tracking-[0.28em] font-light">JAKARTA</p>
        <p className="text-[0.62rem] tracking-[0.35em] text-muted-foreground mt-1">INDONESIA</p>
        <p className="text-[0.72rem] text-muted-foreground mt-3 tabular-nums">{time}</p>
      </div>
    </section>
  );
}

export { ExperienceCard, EducationCard, IndustriesCard, MapCard };
