import { Linkedin, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

/* ── Design tokens ───────────────────────────────────────────── */
const btnPrimary =
  "inline-flex items-center justify-center bg-[#1A1A1A] dark:bg-[#E0E0E0] text-white dark:text-[#121212] px-8 py-3 rounded-[28px] text-[0.75rem] font-bold tracking-[0.1em] min-h-[46px] hover:bg-[#000000] dark:hover:bg-[#FFFFFF] transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:-translate-y-px active:scale-[0.97]";
const btnSecondary =
  "inline-flex items-center justify-center border-2 border-[#1A1A1A] dark:border-[#E0E0E0] text-[#1A1A1A] dark:text-[#E0E0E0] px-8 py-3 rounded-[28px] text-[0.75rem] font-bold tracking-[0.1em] min-h-[46px] hover:bg-[#1A1A1A] dark:hover:bg-[#E0E0E0] hover:text-white dark:hover:text-[#121212] transition-all duration-200 active:scale-[0.97]";

const socialLinks = [
  { href: "https://www.linkedin.com/in/rickyhlmn/", icon: <Linkedin size={20} />, label: "LinkedIn" },
  { href: "https://www.instagram.com/rickyhlmn/",   icon: <Instagram size={20} />, label: "Instagram" },
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

      {/* ── Single-column unified layout ─────────────────────────── */}
      <div className={`flex-1 ${willAnimate ? "will-animate" : ""} ${heroRevealed ? "is-revealed" : ""}`}>

        {/* ── Hero Section ───────────────────────────────────────── */}
        <section className="container py-16 md:py-24">

          {/* Profile picture + name integrated into content flow */}
          <div className="reveal-item mb-10" style={stagger(0)}>
            <figure>
              {/* Photo */}
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-[3px] ring-[#E0E0E0] dark:ring-[#2A2A2A] shadow-[0_4px_20px_rgba(0,0,0,0.10)] bg-[#C8C8C8] mb-5">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
                  alt="Ricky Halomoan – Senior Product Manager"
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(100%)" }}
                  loading="eager"
                />
              </div>
              {/* Name + title below photo */}
              <figcaption>
                <p className="font-bold text-[1rem] text-[#1A1A1A] dark:text-[#E0E0E0] leading-tight mb-1">
                  Ricky Halomoan
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-[2px] bg-[#1A1A1A] dark:bg-[#E0E0E0] rounded-full" />
                  <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-[#888888] dark:text-[#666666]">
                    Senior Product Manager
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>

          {/* Primary headline — uppercase, bold, large */}
          <h1
            className="reveal-item font-black uppercase text-[#1A1A1A] dark:text-[#E0E0E0] leading-[1.05] mb-6 max-w-[18ch]"
            style={{
              ...stagger(1),
              fontSize: "clamp(2rem, 6.5vw, 4.5rem)",
              letterSpacing: "0.05em",
            }}
          >
            Building digital products that move businesses forward.
          </h1>

          {/* Sub-headline: domain tags */}
          <div className="reveal-item mb-10" style={stagger(2)}>
            <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#888888] dark:text-[#666666]">
              LOGISTICS&nbsp;•&nbsp;FULFILLMENT&nbsp;•&nbsp;ELECTRIC MOBILITY&nbsp;•&nbsp;DIGITAL TRANSFORMATION
            </p>
          </div>

          {/* CTA buttons */}
          <div className="reveal-item flex flex-wrap gap-3 mb-10" style={stagger(3)}>
            <a href="/resume"><button className={btnPrimary}>RESUME</button></a>
            <a href="/contact"><button className={btnSecondary}>LET'S TALK</button></a>
          </div>

          {/* Social icons */}
          <div className="reveal-item flex items-center gap-5" style={stagger(4)}>
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888888] dark:text-[#666666] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-all duration-200 hover:scale-110"
              >
                {icon}
              </a>
            ))}
          </div>

        </section>

        {/* Horizontal rule divider */}
        <hr className="border-[#E8E8E8] dark:border-[#2C2C2C]" />

        {/* ── About Me Section ───────────────────────────────────── */}
        <section className="container py-16 md:py-20" id="about">

          {/* Section heading */}
          <div className="reveal-item mb-7" style={stagger(5)}>
            <h2
              className="font-black uppercase text-[#1A1A1A] dark:text-[#E0E0E0] leading-[1.1]"
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2.4rem)",
                letterSpacing: "0.05em",
              }}
            >
              HEY! I'm Ricky Halomoan,{" "}
              <span className="text-[#888888] dark:text-[#666666]">
                A SENIOR PRODUCT MANAGER
              </span>
            </h2>
          </div>

          {/* Body text */}
          <div className="reveal-item space-y-4 max-w-[70ch]" style={stagger(6)}>
            <p className="text-[0.9rem] leading-[1.85] text-[#555555] dark:text-[#888888]">
              My journey into product management grew from a curiosity about how
              systems work and create real value for people. With a background in
              Informatics and experience in software delivery, I developed a strong
              understanding of building digital products.
            </p>
            <p className="text-[0.9rem] leading-[1.85] text-[#555555] dark:text-[#888888]">
              Today, as a Senior Product Manager, I focus on turning complex
              challenges into clear and practical product strategies that align
              technology with business impact.
            </p>
          </div>

        </section>

      </div>

    </Layout>
  );
}
