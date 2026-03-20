import { useState, useEffect } from "react";
import Layout from "../components/Layout";

function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

/* ── Design tokens ───────────────────────────────────────────── */
// Primary CTA: filled black/white, inverts on hover
const btnPrimary =
  "inline-flex items-center justify-center bg-[#1A1A1A] dark:bg-[#E0E0E0] text-white dark:text-[#121212] border border-[#1A1A1A] dark:border-[#E0E0E0] px-7 py-3 rounded-full text-[0.72rem] font-bold tracking-[0.12em] uppercase min-h-[44px] hover:bg-[#000000] dark:hover:bg-[#FFFFFF] transition-all duration-300 ease-in-out active:scale-[0.97] cursor-pointer";
// Secondary CTA: outline, fills on hover
const btnSecondary =
  "inline-flex items-center justify-center border border-[#1A1A1A] dark:border-[#E0E0E0] text-[#1A1A1A] dark:text-[#E0E0E0] bg-transparent px-7 py-3 rounded-full text-[0.72rem] font-bold tracking-[0.12em] uppercase min-h-[44px] hover:bg-[#1A1A1A] dark:hover:bg-[#E0E0E0] hover:text-white dark:hover:text-[#121212] transition-all duration-300 ease-in-out active:scale-[0.97] cursor-pointer";

const domainTags = ["LOGISTICS", "FULFILLMENT", "ELECTRIC MOBILITY", "DIGITAL TRANSFORMATION"];

export default function Home() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [willAnimate,  setWillAnimate]  = useState(false);

  useEffect(() => {
    setWillAnimate(true);
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <Layout>
      {/*
        Outer wrapper: flex-1 fills all available main space (Layout's <main>
        is already flex-1 flex-col). flex-col here lets children stack
        vertically so the hero can use flex-1 to fill the remaining space.
      */}
      <div className={`flex-1 flex flex-col ${willAnimate ? "will-animate" : ""} ${heroRevealed ? "is-revealed" : ""}`}>

        {/* ── Hero Section ─────────────────────────────────────────
            Desktop: two-column (profile card | hero text), vertically
            centered, filling the viewport below the header (flex-1).
            Mobile: single-column stack, scrolls naturally if needed.
        ─────────────────────────────────────────────────────────── */}
        <section
          className="md:flex-1 flex items-start md:items-center px-5 sm:px-6 md:px-12 py-6 md:py-8 relative"
          aria-label="Hero"
        >
          {/* ── Faint dot-grid background texture ─────────────────── */}
          <div className="hero-dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

          {/* Inner wrapper: stack on mobile, two-col flex on desktop */}
          <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row md:items-stretch gap-6 md:gap-14">

            {/* ── Profile Card ───────────────────────────────────── */}
            <div className="reveal-item flex-shrink-0 w-full max-w-[340px] mx-auto md:max-w-none md:mx-0 md:w-[280px] flex flex-col" style={stagger(0)}>
              {/*
                Card: overflow-hidden so the accent line at the top
                sits flush against the rounded corner without clipping.
              */}
              <div
                className="border border-[#E0E0E0] dark:border-[#2C2C2C] bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] w-full h-full flex flex-col overflow-hidden"
              >
                {/* Accent line — 3px, spans full card width */}
                <div className="h-[3px] w-full bg-[#1A1A1A] dark:bg-[#E0E0E0] shrink-0" />

                {/* Card content */}
                <div
                  className="flex-1 flex flex-col justify-center"
                  style={{ padding: "clamp(1rem, 3vw, 1.75rem)" }}
                >
                  {/* Vertical centered layout on all breakpoints */}
                  <div className="flex flex-col items-center text-center gap-4">

                    {/* Profile photo */}
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-[2px] ring-[#E0E0E0] dark:ring-[#2A2A2A] bg-[#C8C8C8] shrink-0 mb-4">
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

                    {/* Name + title + divider + tags */}
                    <div className="w-full flex flex-col items-center">
                      <div className="mb-2 md:mb-4">
                        <p
                          className="font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-tight mb-1 text-[1.0625rem]"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          Ricky Halomoan
                        </p>
                        <p className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-[#888888] dark:text-[#666666]">
                          Senior Product Manager
                        </p>
                      </div>

                      {/* Divider — hidden on mobile to save space */}
                      <div className="hidden md:block w-10 h-[1px] bg-[#E0E0E0] dark:bg-[#3A3A3A] mb-3" />

                      {/* Domain tags — pill badges (all breakpoints) */}
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {domainTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-[10px] py-[4px] rounded-full bg-[#F2F2F2] dark:bg-[#2A2A2A] text-[#888888] dark:text-[#666666] font-semibold uppercase"
                            style={{ fontSize: "10px", letterSpacing: "0.07em" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* ── Hero Text ──────────────────────────────────────── */}
            <div className="flex-1 min-w-0 md:flex md:flex-col md:justify-center">

              {/* Primary headline */}
              <h1
                className="reveal-item text-[#1A1A1A] dark:text-[#E0E0E0] mb-3 text-[1.75rem] md:text-[37px]"
                style={stagger(2)}
              >
                Building digital products that move businesses forward.
              </h1>

              {/* Bio paragraph */}
              <div className="reveal-item mb-4" style={stagger(3)}>
                <p className="text-[0.9rem] md:text-sm text-[#555555] dark:text-[#AAAAAA] leading-relaxed max-w-[60ch]">
                  My journey into product management grew from a curiosity about how systems work and create real value for people. With a background in Informatics and experience in software delivery, I developed a strong understanding of building digital products.
                </p>
                <p className="text-[0.9rem] md:text-sm text-[#555555] dark:text-[#AAAAAA] leading-relaxed max-w-[60ch] mt-2 hidden md:block">
                  Today, as a Senior Product Manager, I focus on turning complex challenges into clear and practical product strategies that align technology with business impact.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="reveal-item flex flex-wrap gap-3" style={stagger(4)}>
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
