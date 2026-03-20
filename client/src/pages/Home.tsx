import { Linkedin, Instagram } from "lucide-react";
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

const socialLinks = [
  { href: "https://www.linkedin.com/in/rickyhlmn/", icon: <Linkedin size={18} />, label: "LinkedIn" },
  { href: "https://www.instagram.com/rickyhlmn/",   icon: <Instagram size={18} />, label: "Instagram" },
];

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
          className="container flex-1 flex items-center"
          aria-label="Hero"
        >
          {/* Inner wrapper: column on mobile, two-col grid on desktop */}
          <div className="w-full flex flex-col md:grid md:grid-cols-[auto_1fr] md:gap-10 md:items-center gap-7 py-8 md:py-0">

            {/* ── Profile Card ──────────────────────────────────── */}
            <div className="reveal-item" style={stagger(0)}>
              {/*
                Card: visually distinct bordered element.
                Mobile  → full width, horizontal (photo + info in a row).
                Desktop → fixed 240px width, vertical layout.
              */}
              <div
                className="border border-[#E0E0E0] dark:border-[#2C2C2C] bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] w-full md:w-[240px]"
                style={{ padding: "clamp(1rem, 2.5vw, 1.5rem)" }}
              >
                {/* Mobile: flex row. Desktop: block (vertical). */}
                <div className="flex md:block items-center gap-5 md:gap-0">

                  {/* Profile photo */}
                  <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-full overflow-hidden ring-[2px] ring-[#E0E0E0] dark:ring-[#2A2A2A] bg-[#C8C8C8] shrink-0 md:mb-4">
                    <img
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
                      alt="Ricky Halomoan – Senior Product Manager"
                      className="w-full h-full object-cover"
                      style={{ filter: "grayscale(100%)" }}
                      loading="eager"
                      width="84"
                      height="84"
                    />
                  </div>

                  {/* Name + title (inside the flex row on mobile) */}
                  <div className="md:mb-4 min-w-0">
                    <p
                      className="font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-tight mb-1.5 truncate"
                      style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem" }}
                    >
                      Ricky Halomoan
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-[2px] bg-[#CCCCCC] dark:bg-[#444444] rounded-full shrink-0" />
                      <p className="text-[0.58rem] font-semibold tracking-[0.18em] uppercase text-[#888888] dark:text-[#666666]">
                        Senior Product Manager
                      </p>
                    </div>
                  </div>

                </div>

                {/* Social icon links — below the row on both layouts */}
                <div className="flex items-center gap-1 mt-3 md:mt-0">
                  {socialLinks.map(({ href, icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#AAAAAA] dark:text-[#555555] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-all duration-200 hover:scale-110 min-w-[44px] min-h-[44px] flex items-center"
                    >
                      {icon}
                    </a>
                  ))}
                </div>

              </div>
            </div>

            {/* ── Hero Text ─────────────────────────────────────── */}
            <div>

              {/* Primary headline — compact clamp per spec */}
              <h1
                className="reveal-item text-[#1A1A1A] dark:text-[#E0E0E0] mb-4 max-w-[18ch]"
                style={{
                  ...stagger(1),
                  fontSize: "clamp(1.5rem, 5vw, 2.8rem)",
                }}
              >
                Building digital products that move businesses forward.
              </h1>

              {/* Domain tags / sub-headline */}
              <div className="reveal-item mb-6" style={stagger(2)}>
                <p className="text-[0.6rem] font-bold tracking-[0.22em] uppercase text-[#888888] dark:text-[#666666]">
                  LOGISTICS&nbsp;•&nbsp;FULFILLMENT&nbsp;•&nbsp;ELECTRIC MOBILITY&nbsp;•&nbsp;DIGITAL TRANSFORMATION
                </p>
              </div>

              {/* Bio paragraph */}
              <div className="reveal-item mb-6" style={stagger(3)}>
                <p className="text-sm text-[#555555] dark:text-[#AAAAAA] leading-relaxed max-w-[50ch]">
                  My journey into product management grew from a curiosity about how systems work and create real value for people. With a background in Informatics and experience in software delivery, I developed a strong understanding of building digital products.
                  <br /><br />
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
