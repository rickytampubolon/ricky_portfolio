import { Linkedin, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

/* ── Stagger helper ──────────────────────────────────────────── */
function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

/* ── Social links ────────────────────────────────────────────── */
const socialLinks = [
  { href: "https://www.linkedin.com/in/rickyhlmn/", icon: <Linkedin  size={18} />, label: "LinkedIn"  },
  { href: "https://www.instagram.com/rickyhlmn/",   icon: <Instagram size={18} />, label: "Instagram" },
];

export default function Home() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [willAnimate,  setWillAnimate]  = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* Opt-in to animations after mount (progressive enhancement) */
  useEffect(() => {
    setWillAnimate(true);
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* Scroll progress bar */
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

      {/* Scroll progress indicator — black line */}
      <div
        className="fixed top-0 left-0 z-[200] h-[2px] bg-[#1A1A1A] dark:bg-[#E0E0E0] transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ════════════════════════════════════════════════════════
          HERO — single column, full-width
          Mobile: stacked centre-aligned
          Desktop: two-column (photo left · text right)
          ════════════════════════════════════════════════════════ */}
      <section
        className={`flex-1 flex flex-col md:flex-row ${willAnimate ? "will-animate" : ""} ${heroRevealed ? "is-revealed" : ""}`}
      >
        {/* ── Left column: photo + name + social ───────────── */}
        <div className="reveal-item flex flex-col items-center justify-center gap-6 px-6 pt-14 pb-10 md:pt-0 md:pb-0 md:w-[40%] md:border-r border-[#E0E0E0] dark:border-[#333333]"
          style={stagger(0)}
        >
          {/* Profile photo — grayscale per spec */}
          <figure className="flex flex-col items-center gap-4">
            <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden ring-[1.5px] ring-[#E0E0E0] dark:ring-[#333333] bg-[#F0F0F0] dark:bg-[#2A2A2A] shrink-0">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
                alt="Ricky Halomoan — Senior Product Manager"
                className="w-full h-full object-cover"
                /* Convert to grayscale per spec: VII. Image Treatment */
                style={{ filter: "grayscale(100%)" }}
                loading="eager"
              />
            </div>
            {/* Name as figcaption — semantic markup */}
            <figcaption className="text-center">
              <p
                className="font-black text-[#1A1A1A] dark:text-[#E0E0E0] leading-[1.1] tracking-[-0.025em]"
                style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.4rem, 4vw, 1.8rem)" }}
              >
                Ricky Halomoan
              </p>
              <p
                className="mt-1 text-[0.68rem] font-medium tracking-[0.18em] uppercase text-[#888888] dark:text-[#666666]"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Senior Product Manager
              </p>
            </figcaption>
          </figure>

          {/* Thin horizontal rule — whitespace divider */}
          <hr className="w-12 border-0 border-t border-[#1A1A1A] dark:border-[#E0E0E0] opacity-30" />

          {/* Social icons */}
          <div className="flex items-center gap-6" role="list" aria-label="Social links">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                role="listitem"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888888] dark:text-[#666666] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-all duration-200 hover:scale-110 w-[44px] h-[44px] flex items-center justify-center"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Right column: heading + bio + CTAs ───────────── */}
        <div className="flex flex-col justify-center px-6 py-12 md:py-0 md:flex-1 md:px-12 lg:px-16 xl:px-20 max-w-[700px]">

          {/* "HELLO" — large, uppercase Montserrat */}
          <h1
            className="reveal-item font-black tracking-[-0.03em] text-[#1A1A1A] dark:text-[#E0E0E0] mb-4 leading-[0.9] uppercase"
            style={{ ...stagger(1), fontFamily: "var(--font-heading)", fontSize: "clamp(3rem, 9vw, 6rem)" }}
          >
            Hello
          </h1>

          {/* Sub-headline */}
          <p
            className="reveal-item mb-8 text-[#555555] dark:text-[#AAAAAA] leading-[1.45] font-medium"
            style={{ ...stagger(2), fontFamily: "var(--font-heading)", fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)" }}
          >
            Here's who I am &amp; what I do.
          </p>

          {/* CTA buttons — spec: primary black fill, secondary outline */}
          <div className="reveal-item flex flex-wrap gap-3 mb-10" style={stagger(3)}>
            <a href="/resume">
              <button
                className="btn-primary active:scale-[0.97]"
                type="button"
              >
                Resume
              </button>
            </a>
            <a href="/contact">
              <button
                className="btn-secondary active:scale-[0.97]"
                type="button"
              >
                Let's Talk
              </button>
            </a>
          </div>

          {/* Bio — Lora serif, max 70ch for readability */}
          <div className="reveal-item space-y-5" style={stagger(4)}>
            <p
              className="text-[#555555] dark:text-[#888888] leading-[1.8]"
              style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.82rem, 1.5vw, 0.92rem)", maxWidth: "60ch" }}
            >
              My journey into product management grew from a curiosity about how systems work and create real value for people. With a background in Informatics and experience in software delivery, I developed a strong understanding of building digital products.
            </p>
            <p
              className="text-[#555555] dark:text-[#888888] leading-[1.8]"
              style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.82rem, 1.5vw, 0.92rem)", maxWidth: "60ch" }}
            >
              Today, as a Senior Product Manager, I focus on turning complex challenges into clear and practical product strategies that align technology with business impact.
            </p>
          </div>

        </div>
      </section>

    </Layout>
  );
}
