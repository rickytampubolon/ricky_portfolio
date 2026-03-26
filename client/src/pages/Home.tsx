import { useState, useEffect } from "react";
import { Link } from "wouter";
import Layout from "../components/Layout";
import { profile, bio } from "../data/homeData";

function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

const pillBadges = ["LOGISTICS", "FULFILLMENT", "ELECTRIC MOBILITY", "DIGITAL TRANSFORMATION"];

/* ── Design tokens ───────────────────────────────────────────── */
// Pill-shaped primary CTA: filled
const btnPrimary =
  "inline-flex items-center justify-center bg-primary text-primary-foreground border border-primary px-7 py-3 rounded-[4px] text-[0.72rem] font-bold tracking-[0.12em] uppercase min-h-[44px] min-w-[100px] whitespace-nowrap hover:opacity-90 hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.22)] dark:hover:shadow-[0_6px_18px_rgba(255,255,255,0.12)] transition-all duration-300 ease-in-out active:scale-[0.97] active:translate-y-0 cursor-pointer";
// Secondary CTA: outline
const btnSecondary =
  "inline-flex items-center justify-center border border-primary text-foreground bg-transparent px-7 py-3 rounded-[4px] text-[0.72rem] font-bold tracking-[0.12em] uppercase min-h-[44px] min-w-[100px] whitespace-nowrap hover:bg-primary hover:text-primary-foreground hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out active:scale-[0.97] active:translate-y-0 cursor-pointer";

export default function Home() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [willAnimate, setWillAnimate] = useState(false);

  useEffect(() => {
    setWillAnimate(true);
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <Layout>
      <div className={`flex-1 flex flex-col ${willAnimate ? "will-animate" : ""} ${heroRevealed ? "is-revealed" : ""}`}>

        {/* ── Hero Section ─────────────────────────────────────────
            Desktop: two-column (profile card | hero text), vertically
            centered. Mobile: single-column stack.
        ─────────────────────────────────────────────────────────── */}
        <section
          className="flex-1 flex items-center px-5 sm:px-6 md:px-12 py-6 md:py-8 relative"
          aria-label="Hero"
        >
          {/* ── Faint dot-grid background texture ─────────────────── */}
          <div className="hero-dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

          {/* Inner wrapper: stack on mobile, two-col grid on desktop */}
          <div className="relative w-full max-w-5xl mx-auto flex flex-col items-stretch md:flex-row gap-5 md:gap-10">

            {/* ── Profile Card ───────────────────────────────────── */}
            <div
              className="reveal-item w-full max-w-[420px] mx-auto md:w-[280px] md:max-w-none md:mx-0 md:shrink-0 flex flex-col"
              style={stagger(0)}
            >
              {/* Depth-effect wrapper */}
              <div className="relative" style={{ paddingBottom: "8px", paddingRight: "8px" }}>
                {/* Shadow block behind the card */}
                <div
                  className="absolute rounded-2xl"
                  style={{
                    backgroundColor: "#D9D0C4",
                    top: "8px",
                    left: "8px",
                    right: "0",
                    bottom: "0",
                  }}
                />

                {/* Card itself */}
                <div className="relative bg-surface dark:bg-surface border border-border rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] w-full flex flex-col overflow-hidden">

                  {/* Top section: photo + name + subtitle + divider + pills + buttons */}
                  <div className="flex flex-col items-center pt-8 pb-6 px-6">

                    {/* Profile photo */}
                    <div className="w-32 h-32 rounded-full overflow-hidden ring-[2px] ring-border bg-muted shrink-0">
                      <img
                        src={profile.photo}
                        alt={`${profile.name} – ${profile.title}`}
                        className="w-full h-full object-cover scale-110"
                        style={{ filter: "grayscale(100%)" }}
                        loading="eager"
                        width="128"
                        height="128"
                      />
                    </div>

                    {/* Name */}
                    <p
                      className="font-bold text-foreground leading-tight text-center mt-4 text-[1.35rem]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {profile.name}
                    </p>

                    {/* Subtitle */}
                    <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-muted-foreground mt-1 text-center">
                      LEAD PRODUCT MANAGER
                    </p>

                    {/* Short centered divider */}
                    <div
                      style={{
                        width: "48px",
                        height: "2px",
                        marginTop: "10px",
                        backgroundColor: "var(--foreground)",
                      }}
                    />

                    {/* Pill badges */}
                    <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                      {pillBadges.map((badge) => (
                        <span
                          key={badge}
                          className="px-2.5 py-1 rounded-full border border-border text-[0.58rem] font-bold tracking-[0.1em] uppercase text-muted-foreground"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="flex gap-3 mt-6 justify-center">
                      <Link href="/resume">
                        <button className={btnPrimary}>Resume</button>
                      </Link>
                      <Link href="/contact">
                        <button className={btnSecondary}>Let's Talk</button>
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* ── Hero Text ──────────────────────────────────────── */}
            <div className="min-w-0 max-w-[750px] md:flex-1 md:flex md:flex-col">
              <div className="md:flex-1 md:flex md:flex-col md:justify-start">

                {/* Primary headline */}
                <h1
                  className="reveal-item font-black tracking-[-0.03em] leading-tight text-foreground mb-3"
                  style={{ ...stagger(2), fontSize: "clamp(1.4rem, 4vw, 2.2rem)" }}
                >
                  Building digital products that move businesses forward.
                </h1>

                {/* Bio paragraphs */}
                <div className="reveal-item" style={stagger(3)}>
                  {bio.map((paragraph, i) => (
                    <p
                      key={i}
                      className={`text-[0.9rem] md:text-sm text-subtle leading-relaxed max-w-[750px]${i > 0 ? " mt-2" : ""}`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </section>

      </div>
    </Layout>
  );
}
