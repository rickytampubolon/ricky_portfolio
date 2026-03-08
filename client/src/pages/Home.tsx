import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

/* ── Design tokens ───────────────────────────────────────────── */
// Slightly rectangular pills (rounded-[28px]) matching the Wix template
const btnPrimary =
  "inline-flex items-center justify-center bg-[#007BFF] text-white px-8 py-3 rounded-[28px] text-[0.75rem] font-bold tracking-[0.1em] min-h-[46px] hover:bg-[#0056CC] transition-all duration-200 shadow-[0_4px_14px_rgba(0,123,255,0.30)] hover:-translate-y-px active:scale-[0.97]";
const btnSecondary =
  "inline-flex items-center justify-center border-2 border-[#1A1A1A] dark:border-[#E0E0E0] text-[#1A1A1A] dark:text-[#E0E0E0] px-8 py-3 rounded-[28px] text-[0.75rem] font-bold tracking-[0.1em] min-h-[46px] hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-[#E0E0E0] dark:hover:text-[#121212] transition-all duration-200 active:scale-[0.97]";

// Flat dark social icons for the profile card (no circle wrapper)
const socialCard = [
  { href: "https://facebook.com",                   icon: <Facebook  size={20} />, label: "Facebook" },
  { href: "https://twitter.com",                    icon: <Twitter   size={20} />, label: "Twitter" },
  { href: "https://www.linkedin.com/in/rickyhlmn/", icon: <Linkedin  size={20} />, label: "LinkedIn" },
  { href: "mailto:rickytampubolon97@gmail.com",     icon: <Instagram size={20} />, label: "Instagram" },
];

const BEIGE = "#E6DACE";
const BEIGE_DARK = "#1A1A1A";

export default function Home() {
  const [heroRevealed, setHeroRevealed]     = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
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

      {/* Scroll progress */}
      <div
        className="fixed top-0 left-0 z-[200] h-[2px] bg-[#007BFF] transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ════════════════════════════════════════════════════════
          MOBILE layout — full-width beige, no white card
          ════════════════════════════════════════════════════════ */}
      <div className={`md:hidden ${heroRevealed ? "is-revealed" : ""}`}>

        {/* Beige block: photo + name + divider + CTAs */}
        <div
          className="reveal-item px-6 pt-12 pb-8 flex flex-col items-center text-center"
          style={{ ...stagger(0), backgroundColor: BEIGE }}
        >
          {/* Photo */}
          <div className="w-36 h-36 rounded-full overflow-hidden ring-[5px] ring-white shadow-[0_8px_28px_rgba(0,0,0,0.15)] mb-6 shrink-0 bg-[#B0B0B0]">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
              alt="Ricky Halomoan"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <h2 className="text-[2rem] font-black text-[#1A1A1A] leading-[1.1] tracking-[-0.02em] mb-4">
            Ricky<br />Halomoan
          </h2>

          {/* Blue divider */}
          <div className="w-20 h-[3px] bg-[#007BFF] mb-7 rounded-full" />

          {/* CTA buttons */}
          <div className="flex gap-3 w-full max-w-xs">
            <a href="/resume" className="flex-1">
              <button className="w-full bg-[#007BFF] text-white py-3 rounded-[28px] text-[0.72rem] font-bold tracking-[0.1em] hover:bg-[#0056CC] transition-all duration-200 active:scale-[0.97]">
                RESUME
              </button>
            </a>
            <a href="/projects" className="flex-1">
              <button className="w-full border-2 border-[#1A1A1A] text-[#1A1A1A] py-3 rounded-[28px] text-[0.72rem] font-bold tracking-[0.1em] hover:bg-[#1A1A1A] hover:text-white transition-all duration-200 active:scale-[0.97]">
                PROJECTS
              </button>
            </a>
          </div>
        </div>

        {/* White social icons strip */}
        <div className="bg-white border-y border-[#E8E8E8] py-5 flex items-center justify-center gap-8">
          {socialCard.map(({ href, icon, label }) => (
            <a key={label} href={href} aria-label={label}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[#1A1A1A] hover:text-[#007BFF] transition-colors duration-200">
              {icon}
            </a>
          ))}
        </div>

        {/* Beige content: Hello + sub-headline + bio */}
        <div className="px-6 pt-10 pb-12" style={{ backgroundColor: BEIGE }}>
          <h1
            className="reveal-item font-black tracking-[-0.03em] text-[#1A1A1A] mb-3 leading-[0.9]"
            style={{ ...stagger(1), fontSize: "clamp(2.8rem, 11vw, 4rem)" }}
          >
            Hello
          </h1>
          <p className="reveal-item text-[1rem] font-semibold text-[#4A4A4A] mb-6 leading-[1.45]" style={stagger(2)}>
            Here's who I am &amp; what I do.
          </p>
          <div className="reveal-item space-y-4" style={stagger(3)}>
            <p className="text-[0.93rem] leading-[1.8] text-[#4A4A4A]">
              My journey into product management grew from a curiosity about how systems work and create real value for people. With a background in Informatics and experience in software delivery, I developed a strong understanding of building digital products.
            </p>
            <p className="text-[0.93rem] leading-[1.8] text-[#4A4A4A]">
              Today, as a Senior Product Manager, I focus on turning complex challenges into clear and practical product strategies that align technology with business impact.
            </p>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          DESKTOP layout — flex-row so columns stretch equally
          ════════════════════════════════════════════════════════ */}
      <section
        className="relative hidden md:flex flex-row overflow-hidden"
        style={{ minHeight: "min(680px, calc(100vh - 3.5rem - 56px))" }}
      >
        {/* Left beige slab — flex child, stretches to match right column */}
        <div className="w-[38%] shrink-0" style={{ backgroundColor: BEIGE }} />

        {/* Profile card straddling the 38/62 boundary — inset-y-0 so it fills
            the exact same height as the section (which is driven by the right column) */}
        <div
          className={`absolute z-20 inset-y-0 ${heroRevealed ? "is-revealed" : ""}`}
          style={{ left: "38%", transform: "translateX(-50%)" }}
        >
          <div
            className="reveal-item h-full flex flex-col items-center justify-between text-center rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-[#E0D8CC] w-[300px] px-9 py-10"
            style={{ ...stagger(0), backgroundColor: "#F3ECE7" }}
          >
            {/* Top group: photo + name + divider + title */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-white shadow-[0_8px_28px_rgba(0,0,0,0.14)] mb-6 shrink-0 bg-[#B0B0B0]">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
                  alt="Ricky Halomoan"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-[1.25rem] font-bold text-[#1A1A1A] leading-snug mb-4">
                Ricky Halomoan
              </h2>
              <div className="w-12 h-[2px] bg-[#007BFF] mb-4 rounded-full" />
              <p className="text-[0.65rem] font-bold tracking-[0.16em] uppercase text-[#888888]">
                Senior Product Manager
              </p>
            </div>

            {/* Bottom: social icons */}
            <div className="flex items-center justify-center gap-5">
              {socialCard.map(({ href, icon, label }) => (
                <a key={label} href={href} aria-label={label}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-[#555555] hover:text-[#007BFF] transition-colors duration-200">
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right content panel — flex-1, drives the section height */}
        <div
          className={`flex-1 flex items-center bg-white dark:bg-[#121212] ${heroRevealed ? "is-revealed" : ""}`}
        >
          <div className="w-full py-10 px-6 pl-44 pr-16 lg:pr-32 max-w-[680px]">
            <h1
              className="reveal-item font-black tracking-[-0.03em] text-[#1A1A1A] dark:text-[#E0E0E0] mb-3 leading-[0.9]"
              style={{ ...stagger(1), fontSize: "clamp(3.5rem, 6.5vw, 5.5rem)" }}
            >
              Hello
            </h1>
            <p className="reveal-item text-[1.08rem] font-semibold text-[#555555] dark:text-[#888888] mb-7 leading-[1.45]" style={stagger(2)}>
              Here's who I am &amp; what I do.
            </p>
            <div className="reveal-item flex flex-wrap gap-3 mb-9" style={stagger(3)}>
              <a href="/resume"><button className={btnPrimary}>RESUME</button></a>
              <a href="/projects"><button className={btnSecondary}>PROJECTS</button></a>
            </div>
            <div className="reveal-item space-y-4 pt-7" style={stagger(4)}>
              <p className="text-[0.92rem] leading-[1.8] text-[#555555] dark:text-[#888888]">
                My journey into product management grew from a curiosity about how systems work and create real value for people. With a background in Informatics and experience in software delivery, I developed a strong understanding of building digital products.
              </p>
              <p className="text-[0.92rem] leading-[1.8] text-[#555555] dark:text-[#888888]">
                Today, as a Senior Product Manager, I focus on turning complex challenges into clear and practical product strategies that align technology with business impact.
              </p>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
