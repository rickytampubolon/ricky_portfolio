import { useEffect } from "react";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import { ExperienceCard, EducationCard } from "./Bento";
import ContactSection from "./Contact";

const muted = "text-[color:var(--fog)]";

export default function Home() {
  // The page is lazy-loaded, so honour a #section in the URL once it has rendered.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <Layout>
      <section className="pt-8 md:pt-14 pb-14 md:pb-20 reveal">
        <h1 className="text-[clamp(2.25rem,6.2vw,3.6rem)] font-semibold tracking-[-0.04em] leading-[1.22]">
          Hi, I'm{" "}
          <span
            aria-hidden="true"
            className="card !p-0 !rounded-[1.1rem] inline-grid place-items-center align-middle w-[1.55em] h-[1.55em] mx-1 -translate-y-[0.06em]"
          >
            <Logo size={44} />
          </span>
          Ricky Halomoan!
          <br />
          <span className={muted}>I'm a </span>Lead Country Product Manager
          <br />
          <span className={muted}>at </span><span className="text-[color:var(--cyan)]">Green SM.</span>
          <span className="inline-flex items-center gap-2.5 align-middle ml-3 rounded-full border border-border bg-card px-4 py-2 text-[1rem] font-normal tracking-normal leading-none -translate-y-[0.1em]">
            <span aria-hidden="true" className="w-3 h-3 rounded-full" style={{ background: "var(--live)", boxShadow: "0 0 0 4px color-mix(in srgb, var(--live) 25%, transparent)" }} />
            Open to work
          </span>
        </h1>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href="#contact"
            className="bg-foreground text-background rounded-full px-8 py-4 text-[1.05rem] font-medium hover:bg-foreground/85 transition-colors active:scale-[0.98]"
          >
            Get in touch
          </a>
          <p className="text-[1.05rem] leading-snug max-w-xs">
            Feel free to look around and reach out. I'd love to connect!
          </p>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2 pb-4">
        <ExperienceCard />
        <EducationCard />
        <ContactSection />
      </div>
    </Layout>
  );
}
