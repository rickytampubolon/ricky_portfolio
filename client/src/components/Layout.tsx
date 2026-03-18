import { Link, useLocation } from "wouter";
import { Linkedin, Instagram } from "lucide-react";
import { useState, useEffect } from "react";

/* ── Navigation links ─────────────────────────────────────────── */
const navLinks = [
  { label: "About Me", href: "/" },
  { label: "Resume",   href: "/resume" },
  { label: "Contact",  href: "/contact" },
];

/* ── Footer social links (SVG icons via lucide-react) ────────── */
const footerSocial = [
  { href: "https://www.linkedin.com/in/rickyhlmn/",  icon: <Linkedin  size={16} />, label: "LinkedIn"  },
  { href: "https://www.instagram.com/rickyhlmn/",    icon: <Instagram size={16} />, label: "Instagram" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location]   = useLocation();
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

  /* Close overlay on route change */
  useEffect(() => { setMenuOpen(false); }, [location]);

  /* Shadow header when scrolled */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll while overlay is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-[#1A1A1A] dark:text-[#E0E0E0] flex flex-col">

      {/* ══════════════════════════════════════════════════════════
          STICKY HEADER — logo left, hamburger menu button right
          ══════════════════════════════════════════════════════════ */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 bg-white/96 dark:bg-[#121212]/96 backdrop-blur-sm transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_8px_rgba(0,0,0,0.4)]" : ""
        }`}
      >
        <div className="flex h-14 items-center justify-between px-6 md:px-12">

          {/* Logo — name only, no colored dots */}
          <Link href="/" className="flex flex-col gap-0.5 no-underline">
            <span
              className="font-black text-[#1A1A1A] dark:text-[#E0E0E0] leading-none tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem" }}
            >
              Ricky Halomoan
            </span>
            <span
              className="text-[#888888] leading-none tracking-[0.1em] uppercase"
              style={{ fontFamily: "var(--font-nav)", fontSize: "0.58rem", fontWeight: 400 }}
            >
              Senior Product Manager
            </span>
          </Link>

          {/* ── Hamburger "Menu" button (spec §III) ──────────────
              - <button> with aria-expanded + aria-controls
              - Text label + animated lines (closed = 2 lines, open = X)
              ──────────────────────────────────────────────────── */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="nav-overlay"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex items-center gap-2.5 text-[#1A1A1A] dark:text-[#E0E0E0] hover:opacity-50 transition-opacity duration-200"
            style={{ fontFamily: "var(--font-nav)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em" }}
          >
            <span className="uppercase">{menuOpen ? "Close" : "Menu"}</span>
            {/* Hamburger icon — 2 bars that animate to X */}
            <div className="flex flex-col gap-[5px] w-5 shrink-0" aria-hidden="true">
              <span
                className="block rounded-full"
                style={{
                  height: "1.5px",
                  backgroundColor: "currentColor",
                  transition: "transform 0.3s ease, translate 0.3s ease",
                  transform: menuOpen ? "rotate(45deg) translate(0, 4.5px)" : "none",
                }}
              />
              <span
                className="block rounded-full"
                style={{
                  height: "1.5px",
                  backgroundColor: "currentColor",
                  transition: "transform 0.3s ease, translate 0.3s ease",
                  transform: menuOpen ? "rotate(-45deg) translate(0, -4.5px)" : "none",
                }}
              />
            </div>
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════
          FULL-SCREEN NAV OVERLAY (spec §III)
          - Fades/slides in on menu open
          - Nav links in large Montserrat uppercase
          - Social icons at bottom
          ══════════════════════════════════════════════════════════ */}
      <div
        id="nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-[100] flex flex-col justify-center px-10 md:px-20"
        style={{
          backgroundColor: "#1A1A1A",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Nav links — large uppercase Montserrat */}
        <nav>
          <ul className="list-none p-0 m-0 flex flex-col gap-6 md:gap-8">
            {navLinks.map(({ label, href }, i) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group inline-block no-underline"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "clamp(2.5rem, 8vw, 5rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                    textTransform: "uppercase",
                    color: isActive(href) ? "#FFFFFF" : "#666666",
                    /* Staggered entrance per link */
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity 0.45s cubic-bezier(0.16,1,0.3,1) ${80 + i * 80}ms, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${80 + i * 80}ms, color 0.2s ease`,
                  }}
                >
                  {/* Underline on hover — slides in from left */}
                  <span
                    className="relative"
                    style={{
                      borderBottom: isActive(href) ? "2px solid #FFFFFF" : "2px solid transparent",
                      transition: "border-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderBottomColor = "#FFFFFF";
                      (e.currentTarget.parentElement as HTMLElement).style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(href)) {
                        (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
                        (e.currentTarget.parentElement as HTMLElement).style.color = "#666666";
                      }
                    }}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social icons — bottom section of overlay */}
        <div
          className="mt-16 flex items-center gap-6"
          style={{
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.45s ease ${80 + navLinks.length * 80}ms, transform 0.45s ease ${80 + navLinks.length * 80}ms`,
          }}
        >
          {footerSocial.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#555555] hover:text-white transition-colors duration-200"
              style={{ transform: "scale(1)", transition: "color 0.2s ease, transform 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────── */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* ══════════════════════════════════════════════════════════
          FOOTER — single centered line (spec §III)
          copyright + email + social icons
          ══════════════════════════════════════════════════════════ */}
      <footer className="border-t border-[#E0E0E0] dark:border-[#2C2C2C] py-5 px-6 md:px-12">
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-5xl mx-auto"
          style={{ fontFamily: "var(--font-nav)", fontSize: "0.7rem" }}
        >
          {/* Copyright */}
          <p className="text-[#999999] m-0" style={{ maxWidth: "none" }}>
            © 2026 Ricky Halomoan. All rights reserved.
          </p>

          {/* Email + Social icons */}
          <div className="flex items-center gap-5">
            <a
              href="mailto:rickytampubolon97@gmail.com"
              className="text-[#888888] dark:text-[#666666] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors duration-200"
              style={{ textDecoration: "none" }}
            >
              rickytampubolon97@gmail.com
            </a>
            {footerSocial.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888888] dark:text-[#555555] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-all duration-200 inline-block"
                style={{ transform: "scale(1)", transition: "color 0.2s ease, transform 0.2s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
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
