import { useEffect } from "react";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import ExperienceSection from "./Resume";
import ContactSection from "./Contact";
import { tagline, subline } from "../data/homeData";

export default function Home() {
  // The page is lazy-loaded, so honour a #section in the URL once it has rendered.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <Layout>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="px-6 md:px-12 pt-10 md:pt-20 pb-24 md:pb-40">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-6xl">
          <div className="reveal">
            <span aria-hidden="true" className="tile w-14 h-14 rounded-full grid place-items-center mb-10 md:mb-14">
              <Logo size={34} />
            </span>
            <h1 className="font-display text-[clamp(2.75rem,6.5vw,5rem)] leading-[1.05]">
              Hello! I'm<br />Ricky Halomoan
            </h1>
          </div>

          <div className="reveal md:pt-[5.5rem]" style={{ animationDelay: "120ms" }}>
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-snug max-w-md">{tagline}</p>
            <p className="mt-5 text-muted-foreground max-w-sm">{subline}</p>
            <p className="mt-9 flex flex-wrap gap-3">
              <a href="#contact" className="bg-foreground text-background rounded-xl px-6 py-3 text-[0.95rem] hover:bg-foreground/85 transition-colors active:scale-[0.98]">
                Talk with me
              </a>
              <a href="#experience" className="tile rounded-xl px-6 py-3 text-[0.95rem] hover:bg-secondary transition-colors active:scale-[0.98]">
                See my experience
              </a>
            </p>
          </div>
        </div>
      </section>

      <ExperienceSection />
      <ContactSection />
    </Layout>
  );
}
