import { Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

/* ── Design tokens ───────────────────────────────────────────── */
const btnPrimary =
  "inline-flex items-center justify-center bg-[#007BFF] text-white px-7 py-3 rounded-full text-sm font-semibold tracking-[0.05em] min-h-[44px] hover:bg-[#0056CC] transition-all duration-200 shadow-[0_4px_14px_rgba(0,123,255,0.30)] hover:-translate-y-px active:scale-[0.97]";
const btnSecondary =
  "inline-flex items-center justify-center border-2 border-[#007BFF] text-[#007BFF] dark:border-[#3B9EFF] dark:text-[#3B9EFF] px-7 py-3 rounded-full text-sm font-semibold tracking-[0.05em] min-h-[44px] hover:bg-[#007BFF] hover:text-white dark:hover:bg-[#3B9EFF] dark:hover:text-white transition-all duration-200 active:scale-[0.97]";

const socialCard = [
  { href: "https://www.linkedin.com/in/rickyhlmn/", icon: <Linkedin size={15} />, label: "LinkedIn" },
  { href: "mailto:rickytampubolon97@gmail.com",     icon: <Mail     size={15} />, label: "Email" },
];

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
        <div className="reveal-item bg-[#F5EDE5] dark:bg-[#1A1A1A] px-6 pt-12 pb-8 flex flex-col items-center text-center" style={stagger(0)}>
          {/* Photo */}
          <div className="w-36 h-36 rounded-full overflow-hidden ring-[5px] ring-white dark:ring-[#2A2A2A] shadow-[0_8px_28px_rgba(0,0,0,0.15)] mb-6 shrink-0">
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
            <a href="/contact" className="flex-1">
              <button className="w-full bg-[#007BFF] text-white py-3 rounded-full text-sm font-bold tracking-[0.06em] hover:bg-[#0056CC] transition-all duration-200 active:scale-[0.97]">
                LET'S TALK
              </button>
            </a>
            <a href="/resume" className="flex-1">
              <button className="w-full border-2 border-[#1A1A1A] dark:border-[#E0E0E0] text-[#1A1A1A] dark:text-[#E0E0E0] py-3 rounded-full text-sm font-bold tracking-[0.06em] hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-[#E0E0E0] dark:hover:text-[#121212] transition-all duration-200 active:scale-[0.97]">
                RESUME
              </button>
            </a>
          </div>
        </div>

        {/* White social icons strip */}
        <div className="bg-white dark:bg-[#1E1E1E] border-y border-[#E8E8E8] dark:border-[#2C2C2C] py-5 flex items-center justify-center gap-8">
          {socialCard.map(({ href, icon, label }) => (
            <a key={label} href={href} aria-label={label}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[#333333] dark:text-[#AAAAAA] hover:text-[#007BFF] dark:hover:text-[#3B9EFF] transition-colors duration-200"
              style={{ fontSize: "22px" }}>
              {icon}
            </a>
          ))}
        </div>

        {/* Beige content: Hello + sub-headline + bio */}
        <div className="bg-[#F5EDE5] dark:bg-[#1A1A1A] px-6 pt-10 pb-12">
          <h1
            className="reveal-item font-black tracking-[-0.03em] text-[#1A1A1A] dark:text-[#E0E0E0] mb-3 leading-[0.9]"
            style={{ ...stagger(1), fontSize: "clamp(3.5rem, 14vw, 5rem)" }}
          >
            Hello.
          </h1>
          <p className="reveal-item text-[1rem] font-semibold text-[#4A4A4A] dark:text-[#888888] mb-6 leading-[1.45]" style={stagger(2)}>
            Here's who I am &amp; what I do.
          </p>
          <div className="reveal-item space-y-4" style={stagger(3)}>
            <p className="text-[0.93rem] leading-[1.8] text-[#555555] dark:text-[#888888]">
              My journey into product management did not follow a straight path. It developed from a strong curiosity about how systems work and how they create real value for people. With a background in Informatics and early experience in software delivery, I gained a solid understanding of the technical side of building digital products.
            </p>
            <p className="text-[0.93rem] leading-[1.8] text-[#555555] dark:text-[#888888]">
              Today, as a Senior Product Manager, I focus on translating complex operational and product challenges into clear and practical roadmaps — speaking with users, operations teams, and engineers to connect technical possibilities with real user needs.
            </p>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          DESKTOP layout — split-panel with positioned card
          ════════════════════════════════════════════════════════ */}
      <section
        className="relative hidden md:block overflow-hidden"
        style={{ minHeight: "min(680px, calc(100vh - 3.5rem - 56px))" }}
      >
        {/* Beige left slab */}
        <div className="absolute inset-y-0 left-0 w-[38%] bg-[#F5EDE5] dark:bg-[#1A1A1A]" />

        {/* Profile card on the 38/62 boundary */}
        <div
          className={`absolute z-20 top-1/2 ${heroRevealed ? "is-revealed" : ""}`}
          style={{ left: "38%", transform: "translate(-50%, -50%)" }}
        >
          <div
            className="reveal-item flex flex-col items-center text-center bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-[#E8E8E8] dark:border-[#2C2C2C] w-[300px] pt-10 pb-9 px-9"
            style={stagger(0)}
          >
            <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-white dark:ring-[#2A2A2A] shadow-[0_8px_28px_rgba(0,0,0,0.14)] mb-6 shrink-0">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
                alt="Ricky Halomoan"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-[1.25rem] font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-snug mb-4">
              Ricky Halomoan
            </h2>
            <div className="w-12 h-[2px] bg-[#007BFF] mb-4 rounded-full" />
            <p className="text-[0.65rem] font-bold tracking-[0.16em] uppercase text-[#888888] dark:text-[#666666] mb-6">
              Senior Product Manager
            </p>
            <div className="flex items-center justify-center gap-4">
              {socialCard.map(({ href, icon, label }) => (
                <a key={label} href={href} aria-label={label}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="w-9 h-9 rounded-full bg-[#F5F5F5] dark:bg-[#2A2A2A] flex items-center justify-center text-[#888888] dark:text-[#666666] hover:bg-[#007BFF] hover:text-white dark:hover:bg-[#007BFF] dark:hover:text-white transition-all duration-200">
                  <span style={{ fontSize: "15px" }}>{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right content panel */}
        <div
          className={`absolute inset-y-0 right-0 w-[62%] flex items-center bg-white dark:bg-[#121212] ${heroRevealed ? "is-revealed" : ""}`}
        >
          <div className="w-full py-0 px-6 pl-44 pr-16 lg:pr-32 max-w-[680px]">
            <h1
              className="reveal-item font-black tracking-[-0.03em] text-[#1A1A1A] dark:text-[#E0E0E0] mb-3 leading-[0.9]"
              style={{ ...stagger(1), fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
            >
              Hello.
            </h1>
            <p className="reveal-item text-[1.08rem] font-semibold text-[#555555] dark:text-[#888888] mb-7 leading-[1.45]" style={stagger(2)}>
              Here's who I am &amp; what I do.
            </p>
            <div className="reveal-item flex flex-wrap gap-3 mb-9" style={stagger(3)}>
              <a href="/contact"><button className={btnPrimary}>Let's Talk</button></a>
              <a href="/resume"><button className={btnSecondary}>Resume</button></a>
            </div>
            <div className="reveal-item space-y-4 border-t border-[#E8E8E8] dark:border-[#2C2C2C] pt-7" style={stagger(4)}>
              <p className="text-[0.92rem] leading-[1.8] text-[#555555] dark:text-[#888888]">
                My journey into product management did not follow a straight path. It developed from a strong curiosity about how systems work and how they create real value for people. With a background in Informatics and early experience in software delivery, I gained a solid understanding of the technical side of building digital products.
              </p>
              <p className="text-[0.92rem] leading-[1.8] text-[#555555] dark:text-[#888888]">
                Today, as a Senior Product Manager, I focus on translating complex operational and product challenges into clear and practical roadmaps — speaking with users, operations teams, and engineers to connect technical possibilities with real user needs.
              </p>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
