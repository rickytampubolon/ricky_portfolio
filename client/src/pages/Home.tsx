import { useEffect } from "react";
import Layout from "../components/Layout";
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
          <img
            src="/ricky.jpg"
            alt="Ricky Halomoan"
            width={160}
            height={160}
            className="inline-block align-middle w-[1.55em] h-[1.55em] mx-1 -translate-y-[0.06em] rounded-[1.1rem] object-cover bg-card"
            style={{ boxShadow: "0 0 0 3px #fff, 0 1px 2px rgba(0,0,0,0.06), 0 14px 30px -12px rgba(0,0,0,0.3)" }}
          />
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
