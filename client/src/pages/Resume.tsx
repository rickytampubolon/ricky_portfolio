import { ArrowUpRight, BarChart3, Compass, Map, Rocket, Search, Users, type LucideIcon } from "lucide-react";
import { experience, earlier, education, type Role } from "../data/resumeData";

const helpAreas: { label: string; icon: LucideIcon }[] = [
  { label: "Product strategy",       icon: Compass   },
  { label: "Roadmapping",            icon: Map       },
  { label: "User research",          icon: Search    },
  { label: "Product metrics",        icon: BarChart3 },
  { label: "Go-to-market",           icon: Rocket    },
  { label: "Stakeholder management", icon: Users     },
];

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
        <div className="max-w-6xl">
          <div className="flex items-center justify-between gap-4 mb-10">
            <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.5rem)]">I can help you with</h2>
            <a href="#contact" className="bg-secondary rounded-xl px-5 py-2.5 text-[0.9rem] hover:bg-foreground hover:text-background transition-colors shrink-0">
              Talk with me
            </a>
          </div>
          <ul>
            {helpAreas.map(({ label, icon: Icon }) => (
              <li key={label} className="border-t border-border last:border-b">
                <a href="#contact" className="group flex items-center gap-4 py-6">
                  <span aria-hidden="true" className="tile w-11 h-11 rounded-xl grid place-items-center shrink-0">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <span className="font-display text-[clamp(1.4rem,2.4vw,1.85rem)]">{label}</span>
                  <span aria-hidden="true" className="ml-auto tile w-9 h-9 rounded-full grid place-items-center group-hover:bg-foreground group-hover:text-background transition-colors">
                    <ArrowUpRight size={15} strokeWidth={1.8} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

