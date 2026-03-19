import { Link, useLocation } from "wouter";
import { Linkedin, Instagram, Mail, Sun, Moon, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "About Me", href: "/" },
  { label: "Resume",   href: "/resume" },
  { label: "Contact",  href: "/contact" },
];

const footerSocial = [
  { href: "https://www.linkedin.com/in/rickyhlmn/",  icon: <Linkedin  size={16} />, label: "LinkedIn"  },
  { href: "https://www.instagram.com/rickyhlmn/",    icon: <Instagram size={16} />, label: "Instagram" },
  { href: "mailto:rickytampubolon97@gmail.com",       icon: <Mail      size={16} />, label: "Email"     },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location]   = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [scrolled,    setScrolled]    = useState(false);
  const [navOpen,     setNavOpen]     = useState(false);

  /* Close nav on route change */
  useEffect(() => { setNavOpen(false); }, [location]);

  /* Lock body scroll when nav overlay is open */
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

  /* Header shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-[#E0E0E0] flex flex-col">

      {/* ════════════════════════════════════════════════════════
          HEADER — Logo left · Theme toggle + MENU button right
          ════════════════════════════════════════════════════════ */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 bg-white/96 dark:bg-[#1A1A1A]/96 backdrop-blur-sm transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_0_0_#E0E0E0] dark:shadow-[0_1px_0_0_#333333]" : ""
        }`}
      >
        <div className="flex h-14 items-center justify-between px-5 md:px-12">

          {/* Logo / brand */}
          <Link href="/" className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] dark:focus-visible:ring-[#FFFFFF] rounded">
            {/* Small black square — brand mark */}
            <div className="w-[8px] h-[8px] bg-[#1A1A1A] dark:bg-[#E0E0E0] rounded-[2px] shrink-0" />
            <span
              className="font-black text-[#1A1A1A] dark:text-[#E0E0E0] leading-none tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1rem, 3vw, 1.25rem)" }}
            >
              Ricky Halomoan
            </span>
            {/* Role — desktop only */}
            <span className="hidden md:inline text-[#CCCCCC] dark:text-[#444] leading-none mx-0.5">/</span>
            <span
              className="hidden md:block text-[0.75rem] tracking-[0.12em] uppercase text-[#888888] dark:text-[#666666] font-medium leading-none"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Senior Product Manager
            </span>
          </Link>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="w-[44px] h-[44px] flex items-center justify-center text-[#888888] dark:text-[#666666] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors duration-200 rounded"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            {/* MENU button — triggers full-screen overlay */}
            <button
              onClick={() => setNavOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={navOpen}
              aria-controls="nav-overlay"
              className="flex items-center gap-2.5 h-[44px] px-1 text-[#1A1A1A] dark:text-[#E0E0E0] hover:opacity-70 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] dark:focus-visible:ring-[#FFFFFF] rounded"
            >
              {/* Hamburger lines */}
              <div className="flex flex-col gap-[5px] w-5">
                <span className="block h-[1.5px] bg-current rounded-full w-full" />
                <span className="block h-[1.5px] bg-current rounded-full w-3/4" />
              </div>
              {/* "Menu" label — desktop only */}
              <span
                className="hidden sm:block text-[0.7rem] font-bold tracking-[0.12em] uppercase"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Menu
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════
          FULL-SCREEN NAV OVERLAY
          Fades in + slight upward translate.
          aria-modal + focus trap for accessibility.
          ════════════════════════════════════════════════════════ */}
      <div
        id="nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-[100] bg-white dark:bg-[#1A1A1A] flex flex-col transition-opacity duration-300 ${
          navOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay header row — same height as main header */}
        <div className="flex h-14 items-center justify-between px-5 md:px-12 border-b border-[#E0E0E0] dark:border-[#333333]">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setNavOpen(false)}
          >
            <div className="w-[8px] h-[8px] bg-[#1A1A1A] dark:bg-[#E0E0E0] rounded-[2px] shrink-0" />
            <span
              className="font-black text-[#1A1A1A] dark:text-[#E0E0E0] leading-none tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1rem, 3vw, 1.25rem)" }}
            >
              Ricky Halomoan
            </span>
          </Link>

          {/* Close button */}
          <button
            onClick={() => setNavOpen(false)}
            aria-label="Close navigation menu"
            className="w-[44px] h-[44px] flex items-center justify-center text-[#1A1A1A] dark:text-[#E0E0E0] hover:opacity-60 transition-opacity duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] dark:focus-visible:ring-[#FFFFFF]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation links — large, centered vertically */}
        <nav
          className={`flex-1 flex flex-col justify-center px-5 md:px-12 gap-2 ${navOpen ? "nav-overlay-enter" : ""}`}
        >
          {navLinks.map(({ label, href }, index) => (
            <Link
              key={href}
              href={href}
              onClick={() => setNavOpen(false)}
              className={`group flex items-baseline gap-4 py-4 border-b border-[#E0E0E0] dark:border-[#333333] last:border-0 transition-opacity duration-200 ${
                isActive(href) ? "opacity-100" : "opacity-40 hover:opacity-100"
              }`}
            >
              {/* Index number */}
              <span
                className="text-[0.65rem] font-bold tracking-[0.1em] text-[#AAAAAA] dark:text-[#555555] w-5 shrink-0"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                0{index + 1}
              </span>
              {/* Link label */}
              <span
                className="font-black tracking-[-0.02em] text-[#1A1A1A] dark:text-[#E0E0E0] leading-none uppercase"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2rem, 8vw, 4.5rem)",
                }}
              >
                {label}
              </span>
              {/* Active indicator */}
              {isActive(href) && (
                <span className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#888888] dark:text-[#666666] self-center ml-2"
                  style={{ fontFamily: "var(--font-ui)" }}>
                  — current
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Overlay footer — social links + email */}
        <div className="px-5 md:px-12 py-6 border-t border-[#E0E0E0] dark:border-[#333333] flex items-center justify-between gap-6 flex-wrap">
          <a
            href="mailto:rickytampubolon97@gmail.com"
            className="text-[0.78rem] text-[#888888] dark:text-[#666666] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors duration-200"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            rickytampubolon97@gmail.com
          </a>
          <div className="flex items-center gap-5">
            {footerSocial.slice(0, 2).map(({ href, icon, label }) => (
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
        </div>
      </div>

      {/* Page content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* ════════════════════════════════════════════════════════
          FOOTER — single centered row
          ════════════════════════════════════════════════════════ */}
      <footer className="bg-white dark:bg-[#1A1A1A] border-t border-[#E0E0E0] dark:border-[#333333]">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 px-5 py-5">

          {/* Copyright */}
          <p
            className="text-[0.7rem] text-[#AAAAAA] dark:text-[#555555] order-last sm:order-none"
            style={{ fontFamily: "var(--font-ui)", maxWidth: "none" }}
          >
            © 2026 Ricky Halomoan
          </p>

          {/* Separator — desktop only */}
          <span className="hidden sm:block text-[#E0E0E0] dark:text-[#333333]">·</span>

          {/* Social + email icons */}
          <div className="flex items-center gap-6">
            {footerSocial.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="w-[44px] h-[44px] flex items-center justify-center text-[#AAAAAA] dark:text-[#555555] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-all duration-200 hover:scale-110"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
