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

      {/* Scroll progress indicator — black line at very top */}
      <div
        className="fixed top-0 left-0 z-[200] h-[2px] bg-[#1A1A1A] dark:bg-[#E0E0E0] transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ════════════════════════════════════════════════════════
          HERO — single column, full-width, unified flow
          Profile picture appears above the HELLO heading.
          No left/right column split on any screen size.
          ════════════════════════════════════════════════════════ */}
      <section
        className={`flex-1 flex flex-col ${willAnimate ? "will-animate" : ""} ${heroRevealed ? "is-revealed" : ""}`}
      >
        <div className="container py-16 md:py-24 lg:py-28 flex flex-col">

          {/* ── Profile identity block ────────────────────────
              Photo + name + title integrated into the content
              flow, appearing above the introductory text (spec).
              ─────────────────────────────────────────────── */}
          <div className="reveal-item mb-12 md:mb-16" style={stagger(0)}>
            <figure className="flex flex-row items-center gap-5 sm:gap-7">

              {/* Profile photo — grayscale per spec VII */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-[1.5px] ring-[#E0E0E0] dark:ring-[#333333] bg-[#F0F0F0] dark:bg-[#2A2A2A] shrink-0">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
                  alt="Ricky Halomoan — Senior Product Manager"
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(100%)" }}
                  loading="eager"
                />
              </div>

              {/* Name + title as figcaption — semantic markup */}
              <figcaption className="flex flex-col">
                <p
                  className="font-black text-[#1A1A1A] dark:text-[#E0E0E0] leading-[1.1] tracking-[-0.025em]"
                  style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.25rem, 3.5vw, 1.6rem)" }}
                >
                  Ricky Halomoan
                </p>
                <p
                  className="mt-1 text-[0.68rem] font-medium tracking-[0.18em] uppercase text-[#888888] dark:text-[#666666]"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  Senior Product Manager
                </p>

                {/* Social icons below name — generous vertical spacing */}
                <div className="flex items-center gap-5 mt-3" role="list" aria-label="Social links">
                  {socialLinks.map(({ href, icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      role="listitem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#888888] dark:text-[#666666] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-all duration-200 hover:scale-110 w-[44px] h-[44px] flex items-center justify-center -ml-3"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </figcaption>
            </figure>
          </div>

          {/* Thin horizontal rule — visual breathing room between
              profile section and introductory text (spec) */}
          <hr
            className="reveal-item border-0 border-t border-[#E0E0E0] dark:border-[#333333] mb-12 md:mb-16"
            style={stagger(1)}
          />

          {/* ── Introductory text block ───────────────────────
              Unified, single-column content flow.
              ─────────────────────────────────────────────── */}

          {/* "HELLO" — large uppercase Montserrat, spec: H1 */}
          <h1
            className="reveal-item font-black tracking-[0.04em] text-[#1A1A1A] dark:text-[#E0E0E0] mb-5 leading-[0.92] uppercase"
            style={{ ...stagger(2), fontFamily: "var(--font-heading)", fontSize: "clamp(3rem, 9vw, 6rem)" }}
          >
            Hello
          </h1>

          {/* Sub-headline */}
          <p
            className="reveal-item mb-10 text-[#555555] dark:text-[#AAAAAA] leading-[1.45] font-medium"
            style={{ ...stagger(3), fontFamily: "var(--font-heading)", fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)" }}
          >
            Here's who I am &amp; what I do.
          </p>

          {/* CTA buttons — spec: primary black fill, secondary outline */}
          <div className="reveal-item flex flex-wrap gap-3 mb-12" style={stagger(4)}>
            <a href="/resume">
              <button className="btn-primary active:scale-[0.97]" type="button">
                Resume
              </button>
            </a>
            <a href="/contact">
              <button className="btn-secondary active:scale-[0.97]" type="button">
                Let's Talk
              </button>
            </a>
          </div>

          {/* Bio — Lora serif, max-width ~60ch for comfortable reading */}
          <div className="reveal-item space-y-5" style={stagger(5)}>
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
