import { Linkedin, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useTheme } from "../contexts/ThemeContext";

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
  { href: "https://www.linkedin.com/in/rickyhlmn/", icon: <Linkedin  size={20} />, label: "LinkedIn" },
  { href: "mailto:rickytampubolon97@gmail.com",     icon: <Instagram size={20} />, label: "Instagram" },
];

const BEIGE = "#E6DACE";
const BEIGE_DARK = "#1A1310";   // dark espresso — matches the cream palette

export default function Home() {
  const { theme } = useTheme();
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
      <div className={`md:hidden flex flex-col flex-1 ${heroRevealed ? "is-revealed" : ""}`}>

        {/* Beige block: photo + name + divider + CTAs */}
        <div
          className="reveal-item px-6 pt-12 pb-8 flex flex-col items-center text-center"
          style={{ ...stagger(0), backgroundColor: theme === "dark" ? BEIGE_DARK : BEIGE }}
        >
          {/* Photo */}
          <div className="w-36 h-36 rounded-full overflow-hidden ring-[5px] ring-white dark:ring-[#3D3026] shadow-[0_8px_28px_rgba(0,0,0,0.15)] mb-6 shrink-0 bg-[#B0B0B0]">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
              alt="Ricky Halomoan"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <h2 className="text-[2rem] font-black text-[#1A1A1A] dark:text-[#E0E0E0] leading-[1.1] tracking-[-0.02em] mb-4">
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
            <a href="/contact" className="flex-1">
              <button className="w-full border-2 border-[#1A1A1A] dark:border-[#E0E0E0] text-[#1A1A1A] dark:text-[#E0E0E0] py-3 rounded-[28px] text-[0.72rem] font-bold tracking-[0.1em] hover:bg-[#1A1A1A] dark:hover:bg-[#E0E0E0] hover:text-white dark:hover:text-[#121212] transition-all duration-200 active:scale-[0.97]">
                LET'S WORK
              </button>
            </a>
          </div>
        </div>

        {/* Social icons strip */}
        <div className="bg-white dark:bg-[#1A1310] border-y border-[#E8E8E8] dark:border-[#3D3026] py-5 flex items-center justify-center gap-8">
          {socialCard.map(({ href, icon, label }) => (
            <a key={label} href={href} aria-label={label}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[#1A1A1A] dark:text-[#E0E0E0] hover:text-[#007BFF] dark:hover:text-[#3B9EFF] transition-colors duration-200">
              {icon}
            </a>
          ))}
        </div>

        {/* Beige content: Hello + sub-headline + bio */}
        <div className="px-6 pt-10 pb-12" style={{ backgroundColor: theme === "dark" ? BEIGE_DARK : BEIGE }}>
          <h1
            className="reveal-item font-black tracking-[-0.03em] text-[#1A1A1A] dark:text-[#E0E0E0] mb-3 leading-[0.9]"
            style={{ ...stagger(1), fontSize: "clamp(2.2rem, 9vw, 3.2rem)" }}
          >
            Hello
          </h1>
          <p className="reveal-item text-[1.05rem] font-bold text-[#4A4A4A] dark:text-[#AAAAAA] mb-6 leading-[1.45]" style={stagger(2)}>
            Here's who I am &amp; what I do.
          </p>
          <div className="reveal-item space-y-4" style={stagger(3)}>
            <p className="text-[0.82rem] leading-[1.8] text-[#4A4A4A] dark:text-[#888888]">
              My journey into product management grew from a curiosity about how systems work and create real value for people. With a background in Informatics and experience in software delivery, I developed a strong understanding of building digital products.
            </p>
            <p className="text-[0.82rem] leading-[1.8] text-[#4A4A4A] dark:text-[#888888]">
              Today, as a Senior Product Manager, I focus on turning complex challenges into clear and practical product strategies that align technology with business impact.
            </p>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          DESKTOP layout — tall section; card is in flex flow
          so items-stretch guarantees exact height match
          ════════════════════════════════════════════════════════ */}
      <section
        className="relative hidden md:flex flex-row items-center overflow-hidden flex-1"
      >
        {/* Full-height background slabs */}
        <div className="absolute inset-y-0 left-0 w-[41%]" style={{ backgroundColor: theme === "dark" ? BEIGE_DARK : BEIGE }} />
        <div className="absolute inset-y-0 left-[41%] right-0 bg-white dark:bg-[#121212]" />

        {/* Content row — items-stretch makes card height === right content height */}
        <div className={`relative z-10 w-full flex flex-row items-center ${heroRevealed ? "is-revealed" : ""}`}>

          {/* Spacer: occupies the beige area minus half the card width,
              so the card column ends up centered on the 41% boundary */}
          <div className="shrink-0" style={{ width: "calc(41% - 170px)" }} />

          {/* Card column — in flex flow, h-full fills the stretched row height */}
          <div className="w-[340px] shrink-0 z-20">
            <div
              className="reveal-item flex flex-col items-center justify-between text-center rounded-2xl shadow-[0_6px_28px_rgba(0,0,0,0.16)] border border-[#CFC0B0] dark:border-[#3D3026] px-10 pt-10 pb-0 overflow-hidden min-h-[420px]"
              style={{ ...stagger(0), backgroundColor: theme === "dark" ? "#231810" : "#FDFAF8" }}
            >
              {/* Top group: photo + name + divider + title */}
              <div className="flex flex-col items-center">
                <div className="w-[152px] h-[152px] rounded-full overflow-hidden ring-[3px] ring-white/80 shadow-[0_4px_18px_rgba(0,0,0,0.13)] mb-5 shrink-0 bg-[#B8B8B8]">
                  <img
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
                    alt="Ricky Halomoan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-[1.5rem] font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-[1.2] mb-4">
                  Ricky<br />Halomoan
                </h2>
                <div className="w-10 h-[2.5px] bg-[#007BFF] mb-4 rounded-full" />
                <p className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-[#666666] dark:text-[#888888]">
                  Senior Product Manager
                </p>
              </div>

              {/* Social icons — full-width white bar */}
              <div className="self-stretch -mx-10 bg-white dark:bg-[#1A1310] py-4 flex items-center justify-center gap-6">
                {socialCard.map(({ href, icon, label }) => (
                  <a key={label} href={href} aria-label={label}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-[#1A1A1A] dark:text-[#E0E0E0] hover:text-[#007BFF] dark:hover:text-[#3B9EFF] transition-colors duration-200">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right content — constrained width so card feels more prominent */}
          <div className="flex-1 pl-12 pr-12 lg:pr-20 pt-8 pb-6 max-w-[520px]">
            <h1
              className="reveal-item font-black tracking-[-0.03em] text-[#1A1A1A] dark:text-[#E0E0E0] mb-3 leading-[0.88]"
              style={{ ...stagger(1), fontSize: "clamp(3.2rem, 6vw, 5.5rem)" }}
            >
              Hello
            </h1>
            <p className="reveal-item text-[1.15rem] font-bold text-[#333333] dark:text-[#AAAAAA] mb-6 leading-[1.45]" style={stagger(2)}>
              Here's who I am &amp; what I do
            </p>
            <div className="reveal-item flex flex-wrap gap-3 mb-7" style={stagger(3)}>
              <a href="/resume"><button className={btnPrimary}>RESUME</button></a>
              <a href="/contact"><button className={btnSecondary}>LET'S WORK</button></a>
            </div>
            <div className="reveal-item space-y-5" style={stagger(4)}>
              <p className="text-[0.85rem] leading-[1.8] text-[#555555] dark:text-[#888888]">
                My journey into product management grew from a curiosity about how systems work and create real value for people. With a background in Informatics and experience in software delivery, I developed a strong understanding of building digital products.
              </p>
              <p className="text-[0.85rem] leading-[1.8] text-[#555555] dark:text-[#888888]">
                Today, as a Senior Product Manager, I focus on turning complex challenges into clear and practical product strategies that align technology with business impact.
              </p>
            </div>
          </div>

        </div>
      </section>

    </Layout>
  );
}
