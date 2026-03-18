import { Linkedin, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import Layout from "../components/Layout";

/* ── Stagger helper ───────────────────────────────────────────── */
function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

/* ── Social links (profile card & overlay) ────────────────────── */
const socialLinks = [
  { href: "https://www.linkedin.com/in/rickyhlmn/", icon: <Linkedin size={18} />, label: "LinkedIn" },
  { href: "https://www.instagram.com/rickyhlmn/",   icon: <Instagram size={18} />, label: "Instagram" },
];

export default function Home() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [willAnimate,  setWillAnimate]  = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* Staggered entrance animation */
  useEffect(() => {
    setWillAnimate(true);
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* Scroll progress indicator */
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

      {/* ── Scroll progress bar — monochromatic black ────────── */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[200] h-[2px] bg-[#1A1A1A] dark:bg-[#E0E0E0] transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ══════════════════════════════════════════════════════════
          HERO SECTION — single-column, full-width (spec §III)
          Profile picture → name → rule → hello heading → bio → CTAs
          ══════════════════════════════════════════════════════════ */}
      <section
        className={`flex-1 flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 py-20 md:py-28 max-w-[1100px] mx-auto w-full ${
          willAnimate ? "will-animate" : ""
        } ${heroRevealed ? "is-revealed" : ""}`}
      >

        {/* ── Profile area: image + name + title ───────────────
            Spec: "integrated cleanly into the main content flow,
            not as a separate floating element. Consider a figure."   */}
        <figure
          className="reveal-item flex items-center gap-5 mb-10"
          style={{ ...stagger(0), margin: "0 0 2.5rem 0" }}
        >
          {/* Profile picture — grayscale filter per spec §VII */}
          <div
            className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-full overflow-hidden shrink-0 bg-[#E0E0E0] dark:bg-[#2A2A2A]"
            style={{
              boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
              outline: "2px solid #1A1A1A",
              outlineOffset: "3px",
            }}
          >
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
              alt="Ricky Halomoan — Senior Product Manager"
              className="w-full h-full object-cover"
              /* Spec §VII: grayscale filter for B&W aesthetic */
              style={{ filter: "grayscale(100%)" }}
              loading="eager"
            />
          </div>

          {/* Name + title as figure caption for accessibility */}
          <figcaption className="flex flex-col gap-1">
            <span
              className="font-black text-[#1A1A1A] dark:text-[#E0E0E0] leading-none tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.1rem, 3vw, 1.35rem)" }}
            >
              Ricky Halomoan
            </span>
            <span
              className="text-[#888888] dark:text-[#666666] tracking-[0.12em] uppercase"
              style={{ fontFamily: "var(--font-nav)", fontSize: "0.65rem", fontWeight: 400 }}
            >
              Senior Product Manager
            </span>
          </figcaption>
        </figure>

        {/* ── Thin horizontal rule ──────────────────────────────── */}
        <hr
          className="reveal-item w-full border-0 border-t border-[#E0E0E0] dark:border-[#2C2C2C] mb-10"
          style={stagger(1)}
          aria-hidden="true"
        />

        {/* ── H1 "Hello" — uppercase Montserrat (spec §IV) ─────── */}
        <h1
          className="reveal-item text-[#1A1A1A] dark:text-[#E0E0E0] mb-4"
          style={{
            ...stagger(2),
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(3rem, 10vw, 6rem)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
          }}
        >
          Hello
        </h1>

        {/* ── Sub-headline ──────────────────────────────────────── */}
        <p
          className="reveal-item text-[#555555] dark:text-[#AAAAAA] mb-8"
          style={{
            ...stagger(3),
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            fontWeight: 400,
            letterSpacing: "0.01em",
            maxWidth: "none",
          }}
        >
          Here's who I am &amp; what I do.
        </p>

        {/* ── CTA Buttons (spec §VI) ────────────────────────────── */}
        <div className="reveal-item flex flex-wrap gap-3 mb-14" style={stagger(4)}>
          {/* Primary: black fill → hover inverted */}
          <Link href="/resume">
            <button
              className="btn-primary"
              style={{ minWidth: "140px" }}
            >
              Resume
            </button>
          </Link>

          {/* Secondary: outline → hover filled black */}
          <Link href="/contact">
            <button
              className="btn-secondary"
              style={{ minWidth: "140px" }}
            >
              Let's Talk
            </button>
          </Link>
        </div>

        {/* ── Bio paragraphs — Lora serif, max-width 70ch ──────── */}
        <div className="reveal-item space-y-5 mb-12" style={stagger(5)}>
          <p
            className="text-[#555555] dark:text-[#888888]"
            style={{ lineHeight: 1.8, fontSize: "clamp(0.9rem, 1.5vw + 0.2rem, 1rem)" }}
          >
            My journey into product management grew from a curiosity about how systems work and
            create real value for people. With a background in Informatics and experience in
            software delivery, I developed a strong understanding of building digital products.
          </p>
          <p
            className="text-[#555555] dark:text-[#888888]"
            style={{ lineHeight: 1.8, fontSize: "clamp(0.9rem, 1.5vw + 0.2rem, 1rem)" }}
          >
            Today, as a Senior Product Manager, I focus on turning complex challenges into clear
            and practical product strategies that align technology with business impact.
          </p>
        </div>

        {/* ── Social icons — SVG, scale on hover (spec §VI) ─────── */}
        <div
          className="reveal-item flex items-center gap-6"
          style={stagger(6)}
          aria-label="Social links"
        >
          {socialLinks.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] dark:text-[#555555] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] inline-block"
              style={{ transition: "color 0.2s ease, transform 0.2s ease", transform: "scale(1)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              {icon}
            </a>
          ))}
        </div>

      </section>

    </Layout>
  );
}
