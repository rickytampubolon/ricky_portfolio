import { useState, useEffect } from "react";
import Layout from "../components/Layout";

function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

/* ── Design tokens ───────────────────────────────────────────── */
// Primary CTA: filled black/white, inverts on hover
const btnPrimary =
  "inline-flex items-center justify-center bg-[#1A1A1A] dark:bg-[#E0E0E0] text-white dark:text-[#121212] border border-[#1A1A1A] dark:border-[#E0E0E0] px-7 py-3 rounded-full text-[0.72rem] font-bold tracking-[0.12em] uppercase min-h-[44px] hover:bg-[#000000] dark:hover:bg-[#FFFFFF] hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.22)] dark:hover:shadow-[0_6px_18px_rgba(255,255,255,0.12)] transition-all duration-300 ease-in-out active:scale-[0.97] active:translate-y-0 cursor-pointer";
// Secondary CTA: outline, fills on hover
const btnSecondary =
  "inline-flex items-center justify-center border border-[#1A1A1A] dark:border-[#E0E0E0] text-[#1A1A1A] dark:text-[#E0E0E0] bg-transparent px-7 py-3 rounded-full text-[0.72rem] font-bold tracking-[0.12em] uppercase min-h-[44px] hover:bg-[#1A1A1A] dark:hover:bg-[#E0E0E0] hover:text-white dark:hover:text-[#121212] hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out active:scale-[0.97] active:translate-y-0 cursor-pointer";

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
          className="flex-1 flex items-center px-5 sm:px-6 md:px-12 py-6 md:py-8 relative min-h-[calc(100dvh-12rem)]"
          aria-label="Hero"
        >
          {/* ── Faint dot-grid background texture ─────────────────── */}
          <div className="hero-dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

          {/* Inner wrapper: stack on mobile, two-col flex on desktop */}
          <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row md:items-stretch gap-6 md:gap-10">

            {/* ── Profile Card ───────────────────────────────────── */}
            <div className="reveal-item flex-shrink-0 w-full max-w-[340px] mx-auto md:max-w-none md:mx-0 md:w-[280px] flex flex-col md:self-stretch" style={stagger(0)}>
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
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-[2px] ring-[#E0E0E0] dark:ring-[#2A2A2A] bg-[#C8C8C8] shrink-0 mb-4">
                      <img
                        src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
                        alt="Ricky Halomoan – Lead Product Manager"
                        className="w-full h-full object-cover scale-110"
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
                          className="font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-tight mb-1 text-[1.25rem] md:text-[1.3rem]"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          Ricky Halomoan
                        </p>
                        <p className="text-[0.75rem] md:text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-[#888888] dark:text-[#666666]">
                          Lead Product Manager
                        </p>
                      </div>

                      {/* Divider — accent color on mobile, muted on desktop */}
                      <div className="w-10 h-[2px] mb-3 bg-[#1A1A1A] dark:bg-[#E0E0E0] md:h-[1px] md:bg-[#E0E0E0] md:dark:bg-[#3A3A3A]" />

                      {/* Domain tags — uniform pill badges */}
                      <div className="flex flex-wrap justify-center gap-[6px]">
                        {domainTags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[#555555] dark:text-[#999999] font-semibold uppercase bg-[#F0F0F0] dark:bg-[#2A2A2A]"
                            style={{
                              borderRadius: "999px",
                              padding: "4px 10px",
                              fontSize: "10px",
                              letterSpacing: "0.07em",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA buttons — mobile only, shown below domain tags */}
                      <div className="md:hidden flex flex-wrap justify-center gap-3 mt-4">
                        <a href="/resume">
                          <button className={btnPrimary}>Resume</button>
                        </a>
                        <a href="/contact">
                          <button className={btnSecondary}>Let's Talk</button>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* ── Hero Text ──────────────────────────────────────── */}
            <div className="flex-1 min-w-0 max-w-[750px] md:self-stretch md:flex md:flex-col bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#2C2C2C] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] px-5 py-6 md:bg-transparent md:dark:bg-transparent md:border-0 md:shadow-none md:rounded-none md:px-0 md:py-0">

              {/* Text content — grows to fill column, centers headline + bio vertically */}
              <div className="md:flex-1 md:flex md:flex-col md:justify-center">

                {/* Primary headline */}
                <h1
                  className="reveal-item font-black tracking-[-0.03em] leading-none text-[#1A1A1A] dark:text-[#E0E0E0] mb-3 text-[1.85rem] md:text-[44px]"
                  style={stagger(2)}
                >
                  Building digital products that <span className="text-gray-600 dark:text-gray-300">move businesses forward.</span>
                </h1>

                {/* Bio paragraph */}
                <div className="reveal-item" style={stagger(3)}>
                  <p className="text-[0.9rem] md:text-sm text-[#555555] dark:text-[#AAAAAA] leading-relaxed max-w-[750px]">
                    My journey into product management grew from a curiosity about how systems work and create real value for people. With a background in Informatics and experience in software delivery, I developed a strong understanding of building digital products.
                  </p>
                  <p className="text-[0.9rem] md:text-sm text-[#555555] dark:text-[#AAAAAA] leading-relaxed max-w-[750px] mt-2">
                    Today, as a Lead Product Manager, I focus on turning complex challenges into clear and practical product strategies that align technology with business impact.
                  </p>
                </div>

              </div>

              {/* CTA buttons — hidden on mobile (shown in profile card); pinned to the bottom of the
                  column on desktop so their baseline aligns with the bottom edge of the profile card */}
              <div className="reveal-item hidden md:flex flex-wrap gap-3 md:pt-6" style={stagger(4)}>
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
