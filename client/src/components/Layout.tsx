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
  { href: "https://www.linkedin.com/in/rickyhlmn/",  icon: <Linkedin  size={22} />, label: "LinkedIn"  },
  { href: "https://www.instagram.com/rickyhlmn/",    icon: <Instagram size={22} />, label: "Instagram" },
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

  /* Close nav on route change */
  useEffect(() => { setMobileOpen(false); }, [location]);

  /* Lock body scroll when mobile nav is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <div className="h-screen overflow-hidden bg-[#FAFAFA] dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-[#E0E0E0] flex flex-col">

      {/* ── Sticky Header ─────────────────────────────────────── */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 bg-[#FAFAFA]/96 dark:bg-[#1A1A1A]/96 backdrop-blur-sm transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_12px_rgba(0,0,0,0.4)]" : ""}`}
      >
        {/* ── Desktop header row ── */}
        <div className="hidden sm:flex h-14 items-center justify-between px-5 md:px-12">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-[9px] h-[9px] bg-[#1A1A1A] dark:bg-[#E0E0E0] rounded-[2px] shrink-0" />
            <span className="font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-none" style={{ fontSize: "1.4rem" }}>
              Ricky Halomoan
            </span>
            <span className="hidden md:inline text-[#D0D0D0] dark:text-[#444] leading-none mx-0.5">/</span>
            <span className="hidden md:block text-[0.92rem] tracking-[0.12em] uppercase text-[#888888] dark:text-[#888888] font-medium leading-none">
              Senior Product Manager
            </span>
          </Link>

          <nav className="flex items-center gap-6 md:gap-8" role="navigation" aria-label="Primary navigation">
            {navLinks.map(({ label, href, soon }) =>
              soon ? (
                <span key={label} className="flex items-center gap-1.5 text-[0.72rem] font-bold tracking-[0.09em] text-[#C0C0C0] dark:text-[#444444] cursor-default select-none">
                  {label}
                  <span className="px-1.5 py-0.5 rounded-full text-[0.5rem] font-bold uppercase tracking-wide bg-[#F0F0F0] dark:bg-[#2A2A2A] text-[#AAAAAA] dark:text-[#555555]">
                    Soon
                  </span>
                </span>
              ) : (
                <Link key={href} href={href!}
                  className={`text-[0.72rem] font-bold tracking-[0.09em] transition-colors duration-200 ${
                    isActive(href!) ? "text-[#1A1A1A] dark:text-[#E0E0E0]" : "text-[#888888] dark:text-[#666666] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0]"
                  }`}
                  aria-current={isActive(href!) ? "page" : undefined}
                >
                  {label}
                </Link>
              )
            )}
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className="text-[#888888] dark:text-[#666666] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            )}
          </nav>
        </div>

        {/* ── Mobile header row ── */}
        <div className="flex sm:hidden items-start justify-between px-5 pt-3 pb-2.5">
          <Link href="/" className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <div className="w-[10px] h-[10px] bg-[#1A1A1A] dark:bg-[#E0E0E0] rounded-[2px] shrink-0 mt-0.5" />
              <span className="font-black text-[1.45rem] text-[#1A1A1A] dark:text-[#E0E0E0] leading-tight tracking-[-0.02em]">
                Ricky Halomoan
              </span>
            </div>
            <span className="text-[0.65rem] tracking-[0.14em] uppercase text-[#888888] font-semibold pl-4">
              Senior Product Manager
            </span>
          </Link>

          <div className="flex items-center gap-1 mt-1">
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className="text-[#888888] dark:text-[#666666] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            )}
            {/* Hamburger menu button with proper ARIA */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="text-[#1A1A1A] dark:text-[#E0E0E0] min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Menu size={22} />
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
        className={`sm:hidden fixed inset-0 z-[100] bg-[#FAFAFA] dark:bg-[#1A1A1A] flex flex-col transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          transform: mobileOpen ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {/* Overlay header row */}
        <div className="flex items-center justify-between px-5 pt-3 pb-2.5">
          <Link href="/" className="flex flex-col gap-0.5" onClick={() => setMobileOpen(false)}>
            <div className="flex items-center gap-2">
              <div className="w-[10px] h-[10px] bg-[#1A1A1A] dark:bg-[#E0E0E0] rounded-[2px] shrink-0 mt-0.5" />
              <span className="font-black text-[1.45rem] text-[#1A1A1A] dark:text-[#E0E0E0] leading-tight tracking-[-0.02em]">
                Ricky Halomoan
              </span>
            </div>
          </Link>
          {/* Close button */}
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            className="text-[#1A1A1A] dark:text-[#E0E0E0] min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav links — large text */}
        <nav
          role="navigation"
          aria-label="Mobile navigation"
          className="flex flex-col px-5 pt-10 pb-8 flex-1"
        >
          {navLinks.map(({ label, href, soon }) =>
            soon ? (
              <span
                key={label}
                className="py-5 flex items-center gap-3 font-black tracking-[0.08em] text-[#C0C0C0] dark:text-[#444444] cursor-default select-none border-b border-[#E8E8E8] dark:border-[#2C2C2C]"
                style={{ fontSize: "clamp(1.5rem, 8vw, 2.5rem)" }}
              >
                {label}
                <span className="px-2 py-0.5 rounded-full text-[0.55rem] font-bold uppercase tracking-wide bg-[#F0F0F0] dark:bg-[#2A2A2A] text-[#AAAAAA] dark:text-[#555555]">
                  Soon
                </span>
              </span>
            ) : (
              <Link
                key={href}
                href={href!}
                aria-current={isActive(href!) ? "page" : undefined}
                className={`py-5 font-black tracking-[0.08em] border-b border-[#E8E8E8] dark:border-[#2C2C2C] last:border-0 transition-colors duration-200 ${
                  isActive(href!)
                    ? "text-[#1A1A1A] dark:text-[#E0E0E0]"
                    : "text-[#888888] dark:text-[#555555] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0]"
                }`}
                style={{ fontSize: "clamp(1.5rem, 8vw, 2.5rem)" }}
              >
                {label}
              </Link>
            )
          )}
        </nav>

        {/* Social links at the bottom of overlay */}
        <div className="px-5 pb-10 flex items-center gap-5">
          {footerSocial.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] dark:text-[#666666] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Content */}
      <main ref={mainRef} className="flex-1 min-h-0 flex flex-col overflow-y-auto">
        {children}

        {/* ── Footer (non-home pages: scrolls with content) ───── */}
        {location !== "/" && (
          <footer className="shrink-0 bg-[#FAFAFA] dark:bg-[#1A1A1A] border-t border-[#E8E8E8] dark:border-[#2C2C2C]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 md:px-12 py-6 sm:py-4 gap-5 sm:gap-0">

              {/* Write + Follow — order-first on mobile, order-last on desktop */}
              <div className="order-first sm:order-last flex flex-col sm:flex-row gap-5 sm:gap-8 md:gap-14">

                {/* Write */}
                <div className="flex flex-col gap-2">
                  <span className="text-[0.82rem] font-bold text-[#1A1A1A] dark:text-[#E0E0E0] tracking-[0.06em]">
                    Write
                  </span>
                  <a
                    href="mailto:rickytampubolon97@gmail.com"
                    className="text-[0.82rem] text-[#999999] dark:text-[#555555] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors duration-200"
                  >
                    rickytampubolon97@gmail.com
                  </a>
                </div>

                {/* Follow */}
                <div className="flex flex-col gap-2">
                  <span className="text-[0.82rem] font-bold text-[#1A1A1A] dark:text-[#E0E0E0] tracking-[0.06em]">
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
                        className="text-[#1A1A1A] dark:text-[#E0E0E0] hover:opacity-60 transition-opacity duration-200"
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>

              </div>

              {/* Copyright — order-last on mobile, order-first on desktop */}
              <span className="order-last sm:order-first text-[0.72rem] text-[#999999] dark:text-[#555555]">
                © 2026 Ricky Halomoan. All rights reserved.
              </span>

            </div>
          </footer>
        )}
      </main>

      {/* ── Footer (home page only: sticky at bottom) ─────────── */}
      {location === "/" && (
        <footer className="shrink-0 bg-[#FAFAFA] dark:bg-[#1A1A1A] border-t border-[#E8E8E8] dark:border-[#2C2C2C]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 md:px-12 py-6 sm:py-4 gap-5 sm:gap-0">

            {/* Write + Follow — order-first on mobile, order-last on desktop */}
            <div className="order-first sm:order-last flex flex-col sm:flex-row gap-5 sm:gap-8 md:gap-14">

              {/* Write */}
              <div className="flex flex-col gap-2">
                <span className="text-[0.82rem] font-bold text-[#1A1A1A] dark:text-[#E0E0E0] tracking-[0.06em]">
                  Write
                </span>
                <a
                  href="mailto:rickytampubolon97@gmail.com"
                  className="text-[0.82rem] text-[#999999] dark:text-[#555555] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors duration-200"
                >
                  rickytampubolon97@gmail.com
                </a>
              </div>

              {/* Follow */}
              <div className="flex flex-col gap-2">
                <span className="text-[0.82rem] font-bold text-[#1A1A1A] dark:text-[#E0E0E0] tracking-[0.06em]">
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
                      className="text-[#1A1A1A] dark:text-[#E0E0E0] hover:opacity-60 transition-opacity duration-200"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Copyright — order-last on mobile, order-first on desktop */}
            <span className="order-last sm:order-first text-[0.72rem] text-[#999999] dark:text-[#555555]">
              © 2026 Ricky Halomoan. All rights reserved.
            </span>

          </div>
        </footer>
      )}

    </div>
  );
}
