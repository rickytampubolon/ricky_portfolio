import { Link, useLocation } from "wouter";
import { Linkedin, Instagram, Sun, Moon, X, Menu } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { label: "ABOUT ME", href: "/" },
  { label: "RESUME",   href: "/resume" },
  { label: "WORK",     href: null, soon: true },
  { label: "CONTACT",  href: "/contact" },
];

const footerSocial = [
  { href: "https://www.linkedin.com/in/rickyhlmn/",  icon: <Linkedin  size={20} strokeWidth={1.75} />, label: "LinkedIn"  },
  { href: "https://www.instagram.com/rickyhlmn/",    icon: <Instagram size={20} strokeWidth={1.75} />, label: "Instagram" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location]   = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 40);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    /* Outer shell: pure white / deep black per monochrome spec */
    <div className="h-screen overflow-hidden bg-[#FFFFFF] dark:bg-[#0A0A0A] text-[#121212] dark:text-[#E5E5E5] flex flex-col">

      {/* ── Sticky Header ─────────────────────────────────────── */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 bg-[#FFFFFF]/96 dark:bg-[#0A0A0A]/96 backdrop-blur-sm transition-shadow duration-300 ${
          scrolled
            ? "shadow-[0_1px_0_rgba(0,0,0,0.08)] dark:shadow-[0_1px_0_rgba(255,255,255,0.05)]"
            : ""
        }`}
      >
        {/* ── Desktop header row ── */}
        <div className="hidden sm:flex h-14 items-center justify-between px-5 md:px-12">
          <Link href="/" className="flex items-center gap-3">
            {/* Minimal square logo mark */}
            <div className="w-[8px] h-[8px] bg-[#121212] dark:bg-[#E5E5E5] shrink-0" />
            <span
              className="font-bold text-[#121212] dark:text-[#E5E5E5] leading-none tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem" }}
            >
              Ricky Halomoan
            </span>
            <span className="hidden md:inline text-[#D8D8D8] dark:text-[#333] leading-none mx-0.5">/</span>
            <span className="hidden md:block text-[0.7rem] tracking-[0.18em] uppercase text-[#999999] dark:text-[#666666] font-medium leading-none">
              Lead Product Manager
            </span>
          </Link>

          <nav className="flex items-center gap-7 md:gap-9" role="navigation" aria-label="Primary navigation">
            {navLinks.map(({ label, href, soon }) =>
              soon ? (
                <span key={label} className="flex items-center gap-1.5 text-[0.68rem] font-bold tracking-[0.1em] text-[#C8C8C8] dark:text-[#383838] cursor-default select-none">
                  {label}
                  <span className="px-1.5 py-0.5 text-[0.48rem] font-bold uppercase tracking-wide bg-[#F0F0F0] dark:bg-[#1E1E1E] text-[#AAAAAA] dark:text-[#555555]">
                    Soon
                  </span>
                </span>
              ) : (
                <Link
                  key={href}
                  href={href!}
                  className={`text-[0.68rem] font-bold tracking-[0.1em] transition-colors duration-200 ${
                    isActive(href!)
                      ? "text-[#121212] dark:text-[#E5E5E5]"
                      : "text-[#999999] dark:text-[#555555] hover:text-[#121212] dark:hover:text-[#E5E5E5]"
                  }`}
                  aria-current={isActive(href!) ? "page" : undefined}
                >
                  {label}
                </Link>
              )
            )}
            {/* Dark mode toggle — minimal sun/moon icon */}
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className="text-[#999999] dark:text-[#555555] hover:text-[#121212] dark:hover:text-[#E5E5E5] transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                {theme === "dark" ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
              </button>
            )}
          </nav>
        </div>

        {/* ── Mobile header row ── */}
        <div className="flex sm:hidden items-start justify-between px-5 pt-3 pb-2.5">
          <Link href="/" className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <div className="w-[9px] h-[9px] bg-[#121212] dark:bg-[#E5E5E5] shrink-0 mt-0.5" />
              <span
                className="font-black text-[1.4rem] text-[#121212] dark:text-[#E5E5E5] leading-tight tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ricky Halomoan
              </span>
            </div>
            <span className="text-[0.6rem] tracking-[0.18em] uppercase text-[#999999] font-medium pl-4">
              Lead Product Manager
            </span>
          </Link>

          <div className="flex items-center gap-1 mt-1">
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className="text-[#999999] dark:text-[#555555] hover:text-[#121212] dark:hover:text-[#E5E5E5] transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                {theme === "dark" ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
              </button>
            )}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="text-[#121212] dark:text-[#E5E5E5] min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen mobile navigation overlay ─────────────── */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`sm:hidden fixed inset-0 z-[100] bg-[#FFFFFF] dark:bg-[#0A0A0A] flex flex-col ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          transform: mobileOpen ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <div className="flex items-center justify-between px-5 pt-3 pb-2.5">
          <Link href="/" className="flex flex-col gap-0.5" onClick={() => setMobileOpen(false)}>
            <div className="flex items-center gap-2">
              <div className="w-[9px] h-[9px] bg-[#121212] dark:bg-[#E5E5E5] shrink-0 mt-0.5" />
              <span
                className="font-black text-[1.4rem] text-[#121212] dark:text-[#E5E5E5] leading-tight tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ricky Halomoan
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            className="text-[#121212] dark:text-[#E5E5E5] min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </div>

        {/* Large text nav links */}
        <nav
          role="navigation"
          aria-label="Mobile navigation"
          className="flex flex-col px-5 pt-10 pb-8 flex-1"
        >
          {navLinks.map(({ label, href, soon }) =>
            soon ? (
              <span
                key={label}
                className="py-5 flex items-center gap-3 font-black tracking-[0.06em] text-[#CCCCCC] dark:text-[#333333] cursor-default select-none border-b border-[#EEEEEE] dark:border-[#1A1A1A]"
                style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 8vw, 2.5rem)" }}
              >
                {label}
                <span className="px-2 py-0.5 text-[0.52rem] font-bold uppercase tracking-wide bg-[#F0F0F0] dark:bg-[#1E1E1E] text-[#AAAAAA] dark:text-[#555555]">
                  Soon
                </span>
              </span>
            ) : (
              <Link
                key={href}
                href={href!}
                aria-current={isActive(href!) ? "page" : undefined}
                className={`py-5 font-black tracking-[0.06em] border-b border-[#EEEEEE] dark:border-[#1A1A1A] last:border-0 transition-colors duration-200 ${
                  isActive(href!)
                    ? "text-[#121212] dark:text-[#E5E5E5]"
                    : "text-[#AAAAAA] dark:text-[#444444] hover:text-[#121212] dark:hover:text-[#E5E5E5]"
                }`}
                style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 8vw, 2.5rem)" }}
              >
                {label}
              </Link>
            )
          )}
        </nav>

        {/* Social links at the bottom */}
        <div className="px-5 pb-10 flex items-center gap-5">
          {footerSocial.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#AAAAAA] dark:text-[#555555] hover:text-[#121212] dark:hover:text-[#E5E5E5] transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────── */}
      <main ref={mainRef} className="flex-1 min-h-0 flex flex-col overflow-y-auto">
        {children}

        {/* ── Footer ────────────────────────────────────────────── */}
        <footer className="shrink-0 bg-[#FFFFFF] dark:bg-[#0A0A0A] border-t border-[#EEEEEE] dark:border-[#1A1A1A]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 md:px-12 py-6 sm:py-4 gap-5 sm:gap-0">

            <div className="order-first sm:order-last flex flex-col sm:flex-row gap-5 sm:gap-8 md:gap-14">

              {/* Write */}
              <div className="flex flex-col gap-2">
                <span className="text-[0.7rem] font-bold text-[#121212] dark:text-[#E5E5E5] tracking-[0.1em] uppercase">
                  Write
                </span>
                <a
                  href="mailto:rickytampubolon97@gmail.com"
                  className="text-[0.8rem] text-[#999999] dark:text-[#555555] hover:text-[#121212] dark:hover:text-[#E5E5E5] transition-colors duration-200"
                >
                  rickytampubolon97@gmail.com
                </a>
              </div>

              {/* Follow */}
              <div className="flex flex-col gap-2">
                <span className="text-[0.7rem] font-bold text-[#121212] dark:text-[#E5E5E5] tracking-[0.1em] uppercase">
                  Follow
                </span>
                <div className="flex items-center gap-4">
                  {footerSocial.map(({ href, icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#121212] dark:text-[#E5E5E5] hover:opacity-50 transition-opacity duration-200"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

            </div>

            <span className="order-last sm:order-first text-[0.68rem] text-[#BBBBBB] dark:text-[#444444]">
              © 2026 Ricky Halomoan. All rights reserved.
            </span>

          </div>
        </footer>
      </main>

    </div>
  );
}
