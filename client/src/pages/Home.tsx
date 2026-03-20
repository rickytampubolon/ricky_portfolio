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

      <div className={`flex-1 ${willAnimate ? "will-animate" : ""} ${heroRevealed ? "is-revealed" : ""}`}>

        {/* ── Hero Section ─────────────────────────────────────────
            Desktop: two-column grid (profile card | hero text), vertically
            centered, filling the viewport below the header.
            Mobile: single-column stack.
        ─────────────────────────────────────────────────────────── */}
        <section
          className="container flex items-center"
          style={{ minHeight: "calc(100vh - 3.5rem)" }}
          aria-label="Hero"
        >
          {/* Inner wrapper: column on mobile, two-col grid on desktop */}
          <div className="w-full flex flex-col md:grid md:grid-cols-[auto_1fr] md:gap-14 md:items-center gap-9 py-10 md:py-0">

            {/* ── Profile Card ──────────────────────────────────── */}
            <div className="reveal-item" style={stagger(0)}>
              {/*
                Card: visually distinct bordered element.
                Mobile  → full width, horizontal (photo + info in a row).
                Desktop → fixed 252px width, vertical layout.
              */}
              <div
                className="border border-[#E0E0E0] dark:border-[#2C2C2C] bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] w-full md:w-[252px]"
                style={{ padding: "clamp(1.25rem, 3vw, 1.75rem)" }}
              >
                {/* Mobile: flex row. Desktop: block (vertical). */}
                <div className="flex md:block items-center gap-5 md:gap-0">

                  {/* Profile photo */}
                  <div className="w-[76px] h-[76px] md:w-[88px] md:h-[88px] rounded-full overflow-hidden ring-[2px] ring-[#E0E0E0] dark:ring-[#2A2A2A] bg-[#C8C8C8] shrink-0 md:mb-5">
                    <img
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
                      alt="Ricky Halomoan – Senior Product Manager"
                      className="w-full h-full object-cover"
                      style={{ filter: "grayscale(100%)" }}
                      loading="eager"
                      width="88"
                      height="88"
                    />
                  </div>

                  {/* Name + title (inside the flex row on mobile) */}
                  <div className="md:mb-5 min-w-0">
                    <p
                      className="font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-tight mb-1.5 truncate"
                      style={{ fontFamily: "var(--font-heading)", fontSize: "1rem" }}
                    >
                      Ricky Halomoan
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-[2px] bg-[#CCCCCC] dark:bg-[#444444] rounded-full shrink-0" />
                      <p className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-[#888888] dark:text-[#666666]">
                        Senior Product Manager
                      </p>
                    </div>
                  </div>

                </div>

                {/* Social icon links — below the row on both layouts */}
                <div className="flex items-center gap-1 mt-4 md:mt-0">
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

              {/* Primary headline */}
              <h1
                className="reveal-item text-[#1A1A1A] dark:text-[#E0E0E0] mb-5 max-w-[18ch]"
                style={{
                  ...stagger(1),
                  fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
                }}
              >
                Building digital products that move businesses forward.
              </h1>

              {/* Domain tags / sub-headline */}
              <div className="reveal-item mb-8" style={stagger(2)}>
                <p className="text-[0.6rem] font-bold tracking-[0.22em] uppercase text-[#888888] dark:text-[#666666]">
                  LOGISTICS&nbsp;•&nbsp;FULFILLMENT&nbsp;•&nbsp;ELECTRIC MOBILITY&nbsp;•&nbsp;DIGITAL TRANSFORMATION
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

        {/* Horizontal rule divider */}
        <hr className="border-[#E8E8E8] dark:border-[#2C2C2C]" />

        {/* ── About Me Section ───────────────────────────────────── */}
        <section className="container py-14 md:py-20" id="about">

          <div className="reveal-item mb-5" style={stagger(4)}>
            <h2
              className="text-[#1A1A1A] dark:text-[#E0E0E0]"
              style={{ fontSize: "clamp(1.3rem, 3.5vw, 2.1rem)" }}
            >
              HEY! I'm Ricky Halomoan,{" "}
              <span className="text-[#888888] dark:text-[#666666]">
                A SENIOR PRODUCT MANAGER
              </span>
            </h2>
          </div>

          <div className="reveal-item max-w-[70ch]" style={stagger(5)}>
            <p
              className="font-body-serif text-[0.9rem] text-[#555555] dark:text-[#888888]"
            >
              My journey into product management grew from a curiosity about how
              systems work and create real value for people. With a background in
              Informatics and experience in software delivery, I developed a strong
              understanding of building digital products.
            </p>
          </div>

        </section>

      </div>

    </Layout>
  );
}
