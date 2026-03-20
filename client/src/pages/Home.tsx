import { Linkedin, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useTheme } from "../contexts/ThemeContext";

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

const SLAB       = "#F2F2F2";
const SLAB_DARK  = "#1C1C1C";

export default function Home() {
  const { theme } = useTheme();
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
      />

      {/* ════════════════════════════════════════════════════════
          MOBILE layout
          ════════════════════════════════════════════════════════ */}
      <div className={`md:hidden flex flex-col flex-1 ${willAnimate ? "will-animate" : ""} ${heroRevealed ? "is-revealed" : ""}`}>

        {/* Gray slab: photo + name + title + CTAs */}
        <div
          className="reveal-item px-6 pt-12 pb-10 flex flex-col items-center text-center"
          style={{ ...stagger(0), backgroundColor: theme === "dark" ? SLAB_DARK : SLAB }}
        >
          {/* Profile photo */}
          <div className="w-36 h-36 rounded-full overflow-hidden ring-[4px] ring-white dark:ring-[#2A2A2A] shadow-[0_8px_28px_rgba(0,0,0,0.12)] mb-6 shrink-0 bg-[#C0C0C0]">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
              alt="Ricky Halomoan"
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(100%)" }}
            />
          </div>

          {/* Name */}
          <h2 className="text-[2rem] font-black text-[#1A1A1A] dark:text-[#E0E0E0] leading-[1.1] tracking-[-0.02em] mb-2">
            Ricky<br />Halomoan
          </h2>

          {/* Divider + title */}
          <div className="w-12 h-[2px] bg-[#1A1A1A] dark:bg-[#E0E0E0] my-3 rounded-full" />
          <p className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-[#888888] dark:text-[#777777] mb-7">
            Senior Product Manager
          </p>

          {/* CTA buttons */}
          <div className="flex gap-3 w-full max-w-[280px]">
            <a href="/resume" className="flex-1">
              <button className="w-full bg-[#1A1A1A] dark:bg-[#E0E0E0] text-white dark:text-[#121212] py-[11px] rounded-[28px] text-[0.72rem] font-bold tracking-[0.1em] hover:bg-[#000000] dark:hover:bg-[#FFFFFF] transition-all duration-200 active:scale-[0.97] shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                RESUME
              </button>
            </a>
            <a href="/contact" className="flex-1">
              <button className="w-full border-2 border-[#1A1A1A] dark:border-[#E0E0E0] text-[#1A1A1A] dark:text-[#E0E0E0] py-[11px] rounded-[28px] text-[0.72rem] font-bold tracking-[0.1em] hover:bg-[#1A1A1A] dark:hover:bg-[#E0E0E0] hover:text-white dark:hover:text-[#121212] transition-all duration-200 active:scale-[0.97]">
                LET'S TALK
              </button>
            </a>
          </div>
        </div>

        {/* Social icons strip */}
        <div className="bg-white dark:bg-[#121212] border-y border-[#E8E8E8] dark:border-[#2C2C2C] py-5 flex items-center justify-center gap-8">
          {socialLinks.map(({ href, icon, label }) => (
            <a key={label} href={href} aria-label={label}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[#555555] dark:text-[#AAAAAA] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors duration-200">
              {icon}
            </a>
          ))}
        </div>

        {/* White content: Hello + tagline + bio */}
        <div className="px-6 pt-10 pb-12 bg-white dark:bg-[#121212]">
          <h1
            className="reveal-item font-black tracking-[-0.03em] text-[#1A1A1A] dark:text-[#E0E0E0] mb-3 leading-[0.9]"
            style={{ ...stagger(1), fontSize: "clamp(2.2rem, 9vw, 3.2rem)" }}
          >
            Hello
          </h1>
          <div className="reveal-item mb-7" style={stagger(2)}>
            <p className="text-[1.0rem] font-bold text-[#333333] dark:text-[#CCCCCC] leading-[1.5] mb-3">
              Building digital products that move businesses forward.
            </p>
            <p className="text-[0.6rem] font-semibold tracking-[0.14em] uppercase text-[#AAAAAA] dark:text-[#666666]">
              LOGISTICS &nbsp;·&nbsp; FULFILLMENT &nbsp;·&nbsp; ELECTRIC MOBILITY &nbsp;·&nbsp; DIGITAL TRANSFORMATION
            </p>
          </div>
          <div className="reveal-item space-y-4" style={stagger(3)}>
            <p className="text-[0.85rem] leading-[1.85] text-[#555555] dark:text-[#888888]">
              My journey into product management grew from a curiosity about how systems work and create real value for people. With a background in Informatics and experience in software delivery, I developed a strong understanding of building digital products.
            </p>
            <p className="text-[0.85rem] leading-[1.85] text-[#555555] dark:text-[#888888]">
              Today, as a Senior Product Manager, I focus on turning complex challenges into clear and practical product strategies that align technology with business impact.
            </p>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          DESKTOP layout — three-column balanced split
          Left slab  : Hello + tagline + industry tags
          Center card: Profile photo, name, social links
          Right panel: Bio paragraphs + CTA buttons
          ════════════════════════════════════════════════════════ */}
      <section className="relative hidden md:flex flex-row items-stretch overflow-hidden flex-1">

        {/* Background slabs */}
        <div className="absolute inset-y-0 left-0 w-[41%]"    style={{ backgroundColor: theme === "dark" ? SLAB_DARK : SLAB }} />
        <div className="absolute inset-y-0 left-[41%] right-0 bg-white dark:bg-[#121212]" />

        {/* Three-column content row */}
        <div className={`relative z-10 w-full flex flex-row items-stretch ${willAnimate ? "will-animate" : ""} ${heroRevealed ? "is-revealed" : ""}`}>

          {/* ── Left: headline + tagline ───────────────────────── */}
          <div
            className="shrink-0 flex flex-col justify-center px-10 lg:px-16"
            style={{ width: "calc(41% - 170px)" }}
          >
            <div className="reveal-item max-w-[300px]" style={stagger(1)}>
              <h1
                className="font-black tracking-[-0.03em] text-[#1A1A1A] dark:text-[#E0E0E0] leading-[0.88] mb-5"
                style={{ fontSize: "clamp(3rem, 5.5vw, 5rem)" }}
              >
                Hello
              </h1>
              <p className="text-[0.95rem] font-bold text-[#333333] dark:text-[#CCCCCC] leading-[1.5] mb-4">
                Building digital products that move businesses forward.
              </p>
              <p className="text-[0.58rem] font-semibold tracking-[0.14em] uppercase text-[#AAAAAA] dark:text-[#666666] leading-[2]">
                LOGISTICS · FULFILLMENT<br />ELECTRIC MOBILITY · DIGITAL TRANSFORMATION
              </p>
            </div>
          </div>

          {/* ── Center: profile card ───────────────────────────── */}
          <div className="w-[340px] shrink-0 z-20 flex items-center py-10">
            <div
              className="reveal-item w-full flex flex-col items-center text-center rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-[#E8E8E8] dark:border-[#2E2E2E] px-10 pt-10 pb-0 overflow-hidden"
              style={{ ...stagger(0), backgroundColor: theme === "dark" ? "#222222" : "#FFFFFF" }}
            >
              {/* Photo */}
              <div className="w-[148px] h-[148px] rounded-full overflow-hidden ring-[3px] ring-[#F0F0F0] dark:ring-[#2A2A2A] shadow-[0_4px_20px_rgba(0,0,0,0.10)] mb-5 shrink-0 bg-[#C8C8C8]">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
                  alt="Ricky Halomoan"
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(100%)" }}
                />
              </div>

              {/* Name */}
              <h2 className="text-[1.45rem] font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-[1.2] mb-3 tracking-[-0.01em]">
                Ricky<br />Halomoan
              </h2>

              {/* Thin divider */}
              <div className="w-10 h-[2px] bg-[#D0D0D0] dark:bg-[#444444] mb-3 rounded-full" />

              {/* Title */}
              <p className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-[#999999] dark:text-[#777777] mb-7">
                Senior Product Manager
              </p>

              {/* Social icons bar */}
              <div className="self-stretch -mx-10 bg-[#F7F7F7] dark:bg-[#1A1A1A] border-t border-[#EEEEEE] dark:border-[#2C2C2C] py-4 flex items-center justify-center gap-7">
                {socialLinks.map(({ href, icon, label }) => (
                  <a key={label} href={href} aria-label={label}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-[#888888] dark:text-[#666666] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors duration-200">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: bio + CTAs ─────────────────────────────── */}
          <div className="flex-1 flex flex-col justify-center pl-10 pr-10 lg:pr-16 max-w-[500px]">
            <div className="reveal-item space-y-5 mb-8" style={stagger(2)}>
              <p className="text-[0.875rem] leading-[1.85] text-[#555555] dark:text-[#888888]">
                My journey into product management grew from a curiosity about how systems work and create real value for people. With a background in Informatics and experience in software delivery, I developed a strong understanding of building digital products.
              </p>
              <p className="text-[0.875rem] leading-[1.85] text-[#555555] dark:text-[#888888]">
                Today, as a Senior Product Manager, I focus on turning complex challenges into clear and practical product strategies that align technology with business impact.
              </p>
            </div>
            <div className="reveal-item flex flex-wrap gap-3" style={stagger(3)}>
              <a href="/resume"><button className={btnPrimary}>RESUME</button></a>
              <a href="/contact"><button className={btnSecondary}>LET'S TALK</button></a>
            </div>
          </div>

        </div>
      </section>

    </Layout>
  );
}
