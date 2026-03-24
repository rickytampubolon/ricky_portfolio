import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { profile, headline, domainTags, bio } from "../data/homeData";

function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

/* ── Design tokens ───────────────────────────────────────────── */
// Primary CTA: filled, inverts on hover
const btnPrimary =
  "inline-flex items-center justify-center bg-primary text-primary-foreground border border-primary px-7 py-3 rounded-[4px] text-[0.72rem] font-bold tracking-[0.12em] uppercase min-h-[44px] hover:opacity-90 hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.22)] dark:hover:shadow-[0_6px_18px_rgba(255,255,255,0.12)] transition-all duration-300 ease-in-out active:scale-[0.97] active:translate-y-0 cursor-pointer";
// Secondary CTA: outline, fills on hover
const btnSecondary =
  "inline-flex items-center justify-center border border-primary text-foreground bg-transparent px-7 py-3 rounded-[4px] text-[0.72rem] font-bold tracking-[0.12em] uppercase min-h-[44px] hover:bg-primary hover:text-primary-foreground hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out active:scale-[0.97] active:translate-y-0 cursor-pointer";

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

          {/* Inner wrapper: stack on mobile, two-col grid on desktop */}
          <div className="relative w-full max-w-5xl mx-auto flex flex-col items-stretch md:flex-row gap-5 md:gap-10">

            {/* ── Profile Card ───────────────────────────────────── */}
            <div className="reveal-item w-full max-w-[340px] mx-auto md:w-[280px] md:max-w-none md:mx-0 md:shrink-0 flex flex-col" style={stagger(0)}>
              {/*
                Card: overflow-hidden so the accent line at the top
                sits flush against the rounded corner without clipping.
              */}
              <div
                className="border border-border border-t-[3px] border-t-primary bg-card rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] w-full h-full flex flex-col"
              >

                {/* Card content */}
                <div
                  className="flex-1 flex flex-col justify-center"
                  style={{ paddingLeft: "clamp(1rem, 3vw, 1.75rem)", paddingRight: "clamp(1rem, 3vw, 1.75rem)" }}
                >
                  {/* Vertical centered layout on all breakpoints */}
                  <div className="flex flex-col items-center text-center gap-4">

                    {/* Profile photo */}
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-[2px] ring-border bg-muted shrink-0 mb-4">
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

                    {/* Name + title + divider + tags */}
                    <div className="w-full flex flex-col items-center">
                      <div className="mb-2 md:mb-4">
                        <p
                          className="font-bold text-foreground leading-tight mb-1 text-[1.25rem] md:text-[1.3rem]"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {profile.name}
                        </p>
                        <p className="text-[0.75rem] md:text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                          {profile.title}
                        </p>
                      </div>

                      {/* Divider — accent color on mobile, muted on desktop */}
                      <div className="w-10 h-[2px] mb-3 bg-primary md:h-[1px] md:bg-border" />

                      {/* Domain tags — uniform pill badges */}
                      <div className="flex flex-wrap justify-center gap-[6px]">
                        {domainTags.map((tag) => (
                          <span
                            key={tag}
                            className="text-subtle font-semibold uppercase bg-secondary rounded-full px-2.5 py-1 text-[10px] tracking-[0.07em]"
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
            <div className="min-w-0 max-w-[750px] md:flex-1 md:flex md:flex-col">

              {/* Text content — grows to fill column, centers headline + bio vertically */}
              <div className="md:flex-1 md:flex md:flex-col md:justify-center">

                {/* Primary headline */}
                <h1
                  className="reveal-item font-black tracking-[-0.03em] leading-none text-foreground mb-3 text-[21px] md:text-[44px]"
                  style={stagger(2)}
                >
                  {headline}
                </h1>

                {/* Bio paragraph */}
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

                {/* CTA buttons — mobile only, shown below bio paragraphs */}
                <div className="md:hidden flex flex-wrap justify-start gap-3 mt-5">
                  <a href="/resume">
                    <button className={btnPrimary}>Resume</button>
                  </a>
                  <a href="/contact">
                    <button className={btnSecondary}>Let's Talk</button>
                  </a>
                </div>

              </div>

              {/* CTA buttons — desktop only; pinned to the bottom of the
                  column so their baseline aligns with the bottom edge of the profile card */}
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
