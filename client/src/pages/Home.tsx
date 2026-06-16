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
  "inline-flex items-center justify-center px-7 py-3 rounded-full text-[0.72rem] font-bold tracking-[0.12em] uppercase min-h-[44px] min-w-[100px] w-full sm:w-auto whitespace-nowrap hover:-translate-y-[2px] transition-all duration-300 ease-in-out active:scale-[0.97] active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-white";
const btnSecondary =
  "inline-flex items-center justify-center px-7 py-3 rounded-full text-[0.72rem] font-bold tracking-[0.12em] uppercase min-h-[44px] min-w-[100px] w-full sm:w-auto whitespace-nowrap hover:-translate-y-[2px] transition-all duration-300 ease-in-out active:scale-[0.97] active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground glass-card hover:border-white/40";

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
              {/* Glow behind card */}
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-3xl opacity-40 blur-2xl pointer-events-none animate-glow-pulse"
                  style={{ background: "linear-gradient(135deg, rgba(123,123,255,0.5), rgba(56,189,248,0.4), rgba(251,113,133,0.3))" }}
                />

                {/* Glass card */}
                <div className="relative glass-card rounded-3xl w-full flex flex-col overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_24px_60px_rgba(123,123,255,0.25)]">

                  {/* Top section */}
                  <div className="flex flex-col items-center pt-8 pb-6 px-6">

                    {/* Profile photo with gradient ring */}
                    <div
                      className="p-[2px] rounded-full shrink-0"
                      style={{ background: "linear-gradient(135deg, #7B7BFF, #38BDF8, #FB7185)" }}
                    >
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-muted">
                        <img
                          src={profile.photo}
                          alt={`${profile.name} – ${profile.title}`}
                          className="w-full h-full object-cover scale-110"
                          loading="eager"
                          width="128"
                          height="128"
                        />
                      </div>
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

                    {/* Gradient divider */}
                    <div
                      className="mt-3 rounded-full"
                      style={{
                        width: "48px",
                        height: "2px",
                        background: "linear-gradient(90deg, #7B7BFF, #38BDF8)",
                      }}
                    />

                    {/* Pill badges */}
                    <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                      {pillBadges.map((badge) => (
                        <span
                          key={badge}
                          className="px-2.5 py-0.5 rounded-full text-[0.54rem] font-bold tracking-[0.06em] uppercase glass-card text-muted-foreground"
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
                      <button
                        className={btnPrimary}
                        style={{ background: "linear-gradient(135deg, #7B7BFF, #38BDF8)", boxShadow: "0 4px 20px rgba(123,123,255,0.4)" }}
                      >
                        Resume
                      </button>
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
