import { useState, useEffect } from "react";
import { Link } from "wouter";
import Layout from "../components/Layout";
import { profile, bio } from "../data/homeData";

function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

const pillBadges = ["LOGISTICS", "FULFILLMENT", "ELECTRIC MOBILITY", "DIGITAL TRANSFORMATION"];

/* ── Design tokens ───────────────────────────────────────────── */
const btnPrimary =
  "inline-flex items-center justify-center bg-foreground text-background px-7 py-3 rounded-full text-[0.72rem] font-semibold tracking-[0.04em] min-h-[44px] min-w-[100px] w-full sm:w-auto whitespace-nowrap hover:opacity-80 transition-opacity duration-200 active:scale-[0.97] cursor-pointer focus-visible:outline-none";
const btnSecondary =
  "inline-flex items-center justify-center border border-border bg-transparent text-foreground px-7 py-3 rounded-full text-[0.72rem] font-semibold tracking-[0.04em] min-h-[44px] min-w-[100px] w-full sm:w-auto whitespace-nowrap hover:bg-secondary transition-colors duration-200 active:scale-[0.97] cursor-pointer focus-visible:outline-none";

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
          className="flex-1 flex items-center px-5 sm:px-6 md:px-12 py-8 md:py-10 relative hero-gradient"
          aria-label="Hero"
        >


          {/* Inner wrapper: stack on mobile, two-col grid on desktop */}
          <div className="relative w-full max-w-5xl mx-auto md:ml-[18%] flex flex-col items-stretch md:flex-row gap-5 md:gap-10">

            {/* ── Profile Card ───────────────────────────────────── */}
            <div
              className="reveal-item group w-full max-w-[420px] mx-auto md:w-[280px] md:max-w-none md:mx-0 md:shrink-0 flex flex-col"
              style={stagger(0)}
            >
              <div className="relative">
                <div className="relative apple-card w-full flex flex-col overflow-hidden transition-transform duration-300 ease-out group-hover:-translate-y-1 shadow-[0_2px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.4)]">

                  {/* Top section */}
                  <div className="flex flex-col items-center pt-8 pb-6 px-6">

                    {/* Profile photo */}
                    <div className="w-32 h-32 rounded-full overflow-hidden ring-[1.5px] ring-border bg-muted shrink-0">
                      <img
                        src={profile.photo}
                        alt={`${profile.name} – ${profile.title}`}
                        className="w-full h-full object-cover scale-110"
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

                    {/* Divider */}
                    <div className="mt-3 rounded-full bg-border" style={{ width: "40px", height: "1.5px" }} />

                    {/* Pill badges */}
                    <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                      {pillBadges.map((badge) => (
                        <span
                          key={badge}
                          className="px-2.5 py-0.5 rounded-full text-[0.54rem] font-semibold tracking-[0.04em] uppercase bg-secondary text-muted-foreground"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* ── Hero Text ──────────────────────────────────────── */}
            <div className="min-w-0 max-w-[580px] md:flex-1 md:flex md:flex-col">
              <div className="md:flex-1 md:flex md:flex-col md:justify-start">

                {/* Left-border accent — mobile only */}
                <div className="md:contents">

                  {/* Primary headline */}
                  <h1
                    className="reveal-item font-black tracking-[-0.03em] leading-tight text-foreground mb-3"
                    style={{ ...stagger(1), fontSize: "clamp(1.25rem, 3.5vw, 2rem)" }}
                  >
                    Building digital products that move businesses forward.
                  </h1>

                  {/* Bio paragraphs */}
                  <div className="reveal-item" style={stagger(2)}>
                    {bio.map((paragraph, i) => (
                      <p
                        key={i}
                        className={`text-[0.9rem] md:text-sm text-subtle leading-relaxed${i > 0 ? " mt-2" : ""}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* CTA buttons */}
                  <div className="reveal-item flex flex-col sm:flex-row gap-3 mt-5" style={stagger(3)}>
                    <Link href="/resume" className="w-full sm:w-auto">
                      <button className={btnPrimary}>Resume</button>
                    </Link>
                    <Link href="/contact" className="w-full sm:w-auto">
                      <button className={btnSecondary}>Let's Talk</button>
                    </Link>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </section>

      </div>
    </Layout>
  );
}
