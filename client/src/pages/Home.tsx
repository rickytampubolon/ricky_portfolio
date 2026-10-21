import { useEffect } from "react";
import Layout from "../components/Layout";
import { ExperienceCard } from "./Bento";
import ContactSection from "./Contact";

const fog = "text-[color:var(--fog)]";

export default function Home() {
  useEffect(() => {
    // Jump to a section, then clean the hash out of the address bar. Otherwise a saved or
    // autocompleted "rickyhlmn.com/#contact" would reopen the site scrolled to the bottom.
    const go = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return false;
      el.scrollIntoView();
      history.replaceState(null, "", window.location.pathname + window.location.search);
      return true;
    };

    // The page is lazy-loaded, so honour a #section in the URL once it has rendered.
    const initial = window.location.hash.slice(1);
    if (initial) go(initial);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest("a");
      const href = a?.getAttribute("href");
      if (!href || !/^\/?#./.test(href)) return;
      if (go(href.replace(/^\/?#/, ""))) e.preventDefault();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
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
        </h1>

        <div className="hero-cta mt-10 flex flex-wrap items-center gap-x-7 gap-y-5">
          <a
            href="#contact"
            className="bg-foreground text-background rounded-full px-8 min-h-14 inline-flex items-center text-[1.125rem] font-medium hover:bg-foreground/85 transition-colors active:scale-[0.98]"
          >
            Get in touch
          </a>
          <p className="inline-flex items-center gap-2.5 text-subtle text-base">
            <span aria-hidden="true" className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "var(--cyan)", boxShadow: "0 0 0 4px color-mix(in srgb, var(--cyan) 28%, transparent)" }} />
            Open to opportunities
          </p>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2 pb-4">
        <ExperienceCard />
        <ContactSection />
      </div>
    </Layout>
  );
}
