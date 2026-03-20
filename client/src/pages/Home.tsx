import { useState, useEffect } from "react";
import Layout from "../components/Layout";

function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

/* ── Design tokens ───────────────────────────────────────────── */
// Primary CTA: filled black/white, inverts on hover
const btnPrimary =
  "inline-flex items-center justify-center bg-[#1A1A1A] dark:bg-[#E0E0E0] text-white dark:text-[#121212] border border-[#1A1A1A] dark:border-[#E0E0E0] px-7 py-3 text-[0.72rem] font-bold tracking-[0.12em] uppercase min-h-[44px] hover:bg-[#000000] dark:hover:bg-[#FFFFFF] transition-all duration-300 ease-in-out active:scale-[0.97] cursor-pointer";
// Secondary CTA: outline, fills on hover
const btnSecondary =
  "inline-flex items-center justify-center border border-[#1A1A1A] dark:border-[#E0E0E0] text-[#1A1A1A] dark:text-[#E0E0E0] bg-transparent px-7 py-3 text-[0.72rem] font-bold tracking-[0.12em] uppercase min-h-[44px] hover:bg-[#1A1A1A] dark:hover:bg-[#E0E0E0] hover:text-white dark:hover:text-[#121212] transition-all duration-300 ease-in-out active:scale-[0.97] cursor-pointer";


export default function Home() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [willAnimate,  setWillAnimate]  = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setWillAnimate(true);
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Layout>

      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[200] h-[2px] bg-[#1A1A1A] dark:bg-[#E0E0E0] transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/*
        Outer wrapper: flex-1 fills all available main space (Layout's <main>
        is already flex-1 flex-col). flex-col here lets children stack
        vertically so the hero can use flex-1 to fill the remaining space
        after the header, pushing the About section below the fold.
      */}
      <div className={`flex-1 flex flex-col ${willAnimate ? "will-animate" : ""} ${heroRevealed ? "is-revealed" : ""}`}>

        {/* ── Hero Section ─────────────────────────────────────────
            Desktop: two-column grid (profile card | hero text), vertically
            centered, filling the viewport below the header (flex-1).
            Mobile: single-column stack.
        ─────────────────────────────────────────────────────────── */}
        <section
          className="flex-1 flex items-center px-6 md:px-12 py-6 md:py-8"
          aria-label="Hero"
        >
          {/* Inner wrapper: stack on mobile, two-col flex on desktop */}
          <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row md:items-center gap-8 md:gap-16">

            {/* ── Profile Card (~35%) ────────────────────────────── */}
            <div className="reveal-item flex-shrink-0 w-full md:w-[300px] flex flex-col" style={stagger(0)}>
              <div
                className="border border-[#E0E0E0] dark:border-[#2C2C2C] bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] w-full flex-1 flex flex-col justify-center"
                style={{ padding: "clamp(1.5rem, 3vw, 2rem)" }}
              >
                {/* Vertical centered layout */}
                <div className="flex flex-col items-center text-center">

                  {/* Profile photo */}
                  <div className="w-[128px] h-[128px] rounded-full overflow-hidden ring-[2px] ring-[#E0E0E0] dark:ring-[#2A2A2A] bg-[#C8C8C8] shrink-0 mb-5">
                    <img
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
                      alt="Ricky Halomoan – Senior Product Manager"
                      className="w-full h-full object-cover"
                      style={{ filter: "grayscale(100%)" }}
                      loading="eager"
                      width="128"
                      height="128"
                    />
                  </div>

                  {/* Name + title */}
                  <div className="mb-5">
                    <p
                      className="font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-tight mb-2"
                      style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem" }}
                    >
                      Ricky Halomoan
                    </p>
                    <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-[#888888] dark:text-[#666666]">
                      Senior Product Manager
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-10 h-[1px] bg-[#E0E0E0] dark:bg-[#3A3A3A] mb-4" />

                  {/* Domain tags */}
                  <p className="text-[0.58rem] font-bold tracking-[0.18em] uppercase text-[#AAAAAA] dark:text-[#555555] leading-loose">
                    LOGISTICS&nbsp;•&nbsp;FULFILLMENT<br />ELECTRIC MOBILITY<br />DIGITAL TRANSFORMATION
                  </p>

                </div>

              </div>
            </div>

            {/* ── Hero Text (~65%) ──────────────────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Primary headline */}
              <h1
                className="reveal-item text-[#1A1A1A] dark:text-[#E0E0E0] mb-3 text-[1.2rem] md:text-[30px]"
                style={stagger(1)}
              >
                Building digital products that move businesses forward.
              </h1>

              {/* Bio paragraph */}
              <div className="reveal-item mb-3" style={stagger(2)}>
                <p className="text-sm text-[#555555] dark:text-[#AAAAAA] leading-relaxed max-w-[60ch]">
                  My journey into product management grew from a curiosity about how systems work and create real value for people. With a background in Informatics and experience in software delivery, I developed a strong understanding of building digital products.
                  <br /><br />
                  Today, as a Senior Product Manager, I focus on turning complex challenges into clear and practical product strategies that align technology with business impact.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="reveal-item flex flex-wrap gap-3" style={stagger(3)}>
                <a href="/resume">
                  <button className={btnPrimary}>Resume</button>
                </a>
                <a href="/contact">
                  <button className={btnSecondary}>Let's Talk</button>
                </a>
              </div>

            </div>

          </div>
        </section>


      </div>

    </Layout>
  );
}
