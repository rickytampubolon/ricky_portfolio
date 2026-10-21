import { useEffect } from "react";
import Layout from "../components/Layout";
import ResumeSection from "./Resume";
import ContactSection from "./Contact";
import { profile, intro, careerPath, sectors, stats } from "../data/homeData";

export default function Home() {
  // The page is lazy-loaded, so honour a #section in the URL once it has rendered.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <Layout>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        className="relative flex flex-col justify-center px-6 md:px-12 pt-6 pb-20 md:pb-28 min-h-[calc(100svh-5rem)] overflow-hidden"
      >
        {/* soft grey light, top right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-24 -right-48 w-[40rem] h-[40rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 65%)" }}
        />
        <div className="relative max-w-6xl">
          <h1 className="font-display reveal text-[clamp(3.5rem,13vw,10.5rem)] leading-[0.9]">
            Ricky<br /><em className="italic font-light">Halomoan</em>
          </h1>

          <div className="mt-12 md:mt-16 grid md:grid-cols-[1fr_1fr] gap-8 max-w-4xl reveal" style={{ animationDelay: "150ms" }}>
            <p className="text-xl md:text-2xl font-display leading-snug">
              {profile.title}.<br />
              <span className="text-muted-foreground">{profile.location}</span>
            </p>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed max-w-sm">{intro}</p>
              <p className="flex gap-3">
                <a href="#resume" className="bg-foreground text-background px-7 py-3 rounded-full text-[0.95rem] hover:bg-foreground/85 transition-colors active:scale-[0.98]">
                  View resume
                </a>
                <a href="#contact" className="border border-foreground px-7 py-3 rounded-full text-[0.95rem] hover:bg-foreground hover:text-background transition-colors active:scale-[0.98]">
                  Contact
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Numbers ────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-14 md:py-20 border-t border-border">
        <dl className="grid grid-cols-3 gap-6 max-w-4xl">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-[clamp(3rem,9vw,6.5rem)] leading-none">{s.value}</dd>
              <p className="mt-3 text-[0.9rem] text-muted-foreground max-w-[10rem]" aria-hidden="true">{s.label}</p>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Career path, inverted band ─────────────────────── */}
      <section className="bg-foreground text-background px-6 md:px-12 py-16 md:py-24">
        <p className="text-[0.95rem] text-background/60 mb-8 md:mb-12">Where I've built</p>
        <ul className="group/list">
          {careerPath.map((co) => (
            <li
              key={co}
              className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[1.1] border-b border-background/15 py-2 md:py-3 transition-opacity duration-300 group-hover/list:opacity-30 hover:!opacity-100"
            >
              {co}
            </li>
          ))}
        </ul>
        <p className="mt-10 md:mt-14 text-background/60 max-w-xl leading-relaxed">
          Across {sectors.map((s) => s.toLowerCase()).join(", ").replace(/, ([^,]*)$/, " and $1")}.
        </p>
      </section>

      <ResumeSection />
      <ContactSection />
    </Layout>
  );
}
