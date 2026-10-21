import { useEffect } from "react";
import Layout from "../components/Layout";
import { ExperienceCard, EducationCard } from "./Bento";
import ContactSection from "./Contact";

const fog = "text-[color:var(--fog)]";

export default function Home() {
  // The page is lazy-loaded, so honour a #section in the URL once it has rendered.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <Layout>
      <section className="hero-screen pt-4 md:pt-8 pb-12 md:pb-16 reveal">
        <h1 className="text-[clamp(2.25rem,6.2vw,3.6rem)] font-semibold tracking-[-0.04em] leading-[1.22]">
          <span className="block leading-[1.5] mb-[-0.14em]">
          Hi, I'm{" "}
          <img
            src="/ricky.jpg"
            alt=""
            width={160}
            height={160}
            className="inline-block align-middle w-[1.5em] h-[1.5em] mx-1 -mt-[0.1em] rounded-[1.1rem] object-cover bg-card"
            style={{ boxShadow: "0 0 0 3px #fff, 0 1px 2px rgba(0,0,0,0.06), 0 14px 30px -12px rgba(0,0,0,0.3)" }}
          />
          Ricky Halomoan!
          </span>
          <span className={fog}>I'm a </span>Lead Country Product Manager{" "}
          <span className={fog}>at </span>
          <span className="text-[color:var(--cyan-text)]">Green SM.</span>
          <span className="block w-fit mt-4 sm:inline-flex sm:mt-0 sm:ml-3 sm:align-middle items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2.5 text-[1rem] font-normal tracking-normal leading-none sm:-translate-y-[0.1em]">
            <span aria-hidden="true" className="inline-block w-3 h-3 rounded-full mr-2.5 sm:mr-0 align-[-1px]" style={{ background: "var(--cyan)", boxShadow: "0 0 0 4px color-mix(in srgb, var(--cyan) 28%, transparent)" }} />
            Open to work
          </span>
        </h1>

        <div className="hero-cta mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href="#contact"
            className="bg-foreground text-background rounded-full px-8 min-h-14 inline-flex items-center text-[1.05rem] font-medium hover:bg-foreground/85 transition-colors active:scale-[0.98]"
          >
            Get in touch
          </a>
          <p className="text-[1.05rem] leading-snug max-w-xs">
            Have a role or a project in mind? Send me a message.
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
