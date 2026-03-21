import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Linkedin, Github } from "lucide-react";

function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

/* ── Button tokens ─────────────────────────────────────────────
   Primary:   Solid Black (#121212) / Solid White (#E5E5E5 dark)
   Secondary: Ghost / Outlined — fills on hover
   Both use the .btn-lift class from index.css for the translateY effect.
──────────────────────────────────────────────────────────────── */
const btnPrimary =
  "btn-lift inline-flex items-center justify-center bg-[#121212] dark:bg-[#E5E5E5] text-white dark:text-[#0A0A0A] px-8 py-3.5 text-[0.68rem] font-bold tracking-[0.16em] uppercase min-h-[44px] cursor-pointer";

const btnSecondary =
  "btn-lift inline-flex items-center justify-center border border-[#121212] dark:border-[#E5E5E5] text-[#121212] dark:text-[#E5E5E5] bg-transparent px-8 py-3.5 text-[0.68rem] font-bold tracking-[0.16em] uppercase min-h-[44px] hover:bg-[#121212] dark:hover:bg-[#E5E5E5] hover:text-white dark:hover:text-[#0A0A0A] transition-colors duration-200 cursor-pointer";

/* ── Skill tags shown in the right column ─────────────────────
   Border-only, no fill — subtle grey border, rounded corners.
──────────────────────────────────────────────────────────────── */
const skillTags = [
  "Product Strategy",
  "Roadmapping",
  "User Research",
  "Cross-functional Leadership",
  "Data Analysis",
  "Go-to-Market",
  "Agile / Scrum",
  "Stakeholder Management",
];

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
      <div
        className={`flex-1 flex flex-col ${willAnimate ? "will-animate" : ""} ${heroRevealed ? "is-revealed" : ""}`}
      >
        {/* ── Hero Section ────────────────────────────────────────
            Desktop: two-column layout
              LEFT  — elevated profile card (#F5F5F5 bg)
              RIGHT — headline, bio, CTAs, skill tags
            Mobile: single-column stack
        ──────────────────────────────────────────────────────── */}
        <section
          className="md:flex-1 flex items-start md:items-center px-5 sm:px-6 md:px-12 py-8 md:py-10 relative bg-[#FFFFFF] dark:bg-[#0A0A0A]"
          aria-label="Hero"
        >
          {/* Faint dot-grid background texture */}
          <div className="hero-dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

          {/* Two-column wrapper — max-width keeps it centered on wide screens */}
          <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row md:items-stretch gap-8 md:gap-16">

            {/* ── LEFT: Elevated Profile Card ─────────────────────
                Background: #F5F5F5 light / #1A1A1A dark (per spec).
                card-elevated applies layered box-shadows from index.css.
                Sharp corners (no border-radius) for architectural feel.
            ─────────────────────────────────────────────────── */}
            <div
              className="reveal-item flex-shrink-0 w-full max-w-[300px] mx-auto md:max-w-none md:mx-0 md:w-[268px]"
              style={stagger(0)}
            >
              <div className="card-elevated bg-[#F5F5F5] dark:bg-[#1A1A1A] w-full h-full flex flex-col overflow-hidden">

                {/* Top accent bar — 4px solid black/white */}
                <div className="h-[4px] w-full bg-[#121212] dark:bg-[#E5E5E5] shrink-0" />

                {/* Card body */}
                <div className="flex-1 flex flex-col items-center text-center px-7 py-8 gap-5">

                  {/* Circular grayscale headshot */}
                  <div className="w-28 h-28 rounded-full overflow-hidden ring-[2px] ring-[#DEDEDE] dark:ring-[#2A2A2A] bg-[#CCCCCC] shrink-0">
                    <img
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
                      alt="Ricky Halomoan – Lead Product Manager"
                      className="w-full h-full object-cover"
                      style={{ filter: "grayscale(100%)" }}
                      loading="eager"
                      width="128"
                      height="128"
                    />
                  </div>

                  {/* Name block */}
                  <div className="w-full flex flex-col items-center">
                    {/* Bold name */}
                    <p
                      className="font-bold text-[1.0rem] text-[#121212] dark:text-[#E5E5E5] leading-tight tracking-[-0.01em]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Ricky Halomoan
                    </p>

                    {/* Thin black divider — 1px, constrained width */}
                    <div className="w-8 h-[1px] bg-[#CCCCCC] dark:bg-[#333333] my-3" />

                    {/* Title — light weight, very tracked out */}
                    <p className="text-[0.58rem] font-light tracking-[0.24em] uppercase text-[#888888] dark:text-[#666666]">
                      Lead Product Manager
                    </p>
                  </div>

                  {/* Social icons: LinkedIn + GitHub (monochrome) */}
                  <div className="flex items-center justify-center gap-1 pt-1">
                    <a
                      href="https://www.linkedin.com/in/rickyhlmn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="text-[#AAAAAA] dark:text-[#555555] hover:text-[#121212] dark:hover:text-[#E5E5E5] transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    >
                      <Linkedin size={17} strokeWidth={1.75} />
                    </a>
                    <a
                      href="https://github.com/rickyhlmn"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="text-[#AAAAAA] dark:text-[#555555] hover:text-[#121212] dark:hover:text-[#E5E5E5] transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    >
                      <Github size={17} strokeWidth={1.75} />
                    </a>
                  </div>

                </div>
              </div>
            </div>

            {/* ── RIGHT: Hero Content ──────────────────────────────
                Headline: ALL-CAPS (via h1 CSS), extra-bold Archivo.
                Sub-headline + bio + CTAs + skill tags stack below.
            ─────────────────────────────────────────────────── */}
            <div className="flex-1 min-w-0 md:flex md:flex-col md:justify-center">

              {/* Eyebrow / sub-label */}
              <p
                className="reveal-item text-[0.62rem] font-semibold tracking-[0.22em] uppercase text-[#AAAAAA] dark:text-[#555555] mb-4"
                style={stagger(1)}
              >
                Here's who I am &amp; what I do.
              </p>

              {/* Main headline — ALL-CAPS via h1 CSS in index.css */}
              <h1
                className="reveal-item font-black text-[#121212] dark:text-[#E5E5E5] mb-5"
                style={{ ...stagger(2), fontSize: "clamp(1.75rem, 4.2vw, 3rem)" }}
              >
                Building digital products that move businesses forward.
              </h1>

              {/* Bio — Inter body, generous line-height for "breathable" feel */}
              <div className="reveal-item mb-6" style={stagger(3)}>
                <p className="text-[0.88rem] text-[#666666] dark:text-[#777777] leading-[1.75] max-w-[58ch]">
                  My journey into product management grew from a curiosity about how systems work and create real value for people. With a background in Informatics and experience in software delivery, I developed a strong understanding of building digital products.
                </p>
                <p className="text-[0.88rem] text-[#666666] dark:text-[#777777] leading-[1.75] max-w-[58ch] mt-3 hidden md:block">
                  Today, as a Lead Product Manager, I focus on turning complex challenges into clear and practical product strategies that align technology with business impact.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="reveal-item flex flex-wrap gap-3 mb-7" style={stagger(4)}>
                <a href="/resume">
                  <button className={btnPrimary}>Resume</button>
                </a>
                <a href="/contact">
                  <button className={btnSecondary}>Let's Talk</button>
                </a>
              </div>

              {/* Skill Tags — border-only, no background fill */}
              <div className="reveal-item flex flex-wrap gap-2" style={stagger(5)}>
                {skillTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 border border-[#DDDDDD] dark:border-[#2A2A2A] text-[#888888] dark:text-[#666666] text-[0.65rem] font-medium tracking-[0.04em] rounded-sm uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
