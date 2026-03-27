import { Link, useLocation } from "wouter";
import { Linkedin, Instagram, Sun, Moon, X, Menu, ArrowUp, type LucideProps } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect, useRef } from "react";
import { profile, social } from "../data/homeData";

/* ── Nav config ──────────────────────────────────────────────── */
type NavLink =
  | { label: string; href: string; soon?: never }
  | { label: string; href?: never;  soon: true  };

const navLinks: NavLink[] = [
  { label: "ABOUT ME", href: "/" },
  { label: "RESUME",   href: "/resume" },
  { label: "WORK",     soon: true },
  { label: "CONTACT",  href: "/contact" },
];

/* ── Icon map for footer social links ────────────────────────── */
const socialIcons: Record<string, React.FC<LucideProps>> = {
  linkedin:  Linkedin,
  instagram: Instagram,
};

/* ── Local clock (GMT+7) ─────────────────────────────────────── */
function LocalClock() {
  const getTime = () =>
    new Date().toLocaleTimeString("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

  const [time, setTime] = useState(getTime);

  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-[0.72rem] font-bold tracking-[0.09em] text-muted-foreground select-none tabular-nums">
      🇮🇩 {time} GMT+7
    </span>
  );
}

/* ── Theme toggle button ─────────────────────────────────────── */
function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  if (!toggleTheme) return null;
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`text-muted-foreground hover:text-foreground transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${className ?? ""}`}
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

/* ── Layout ──────────────────────────────────────────────────── */
export default function Layout({ children }: { children: React.ReactNode }) {
  const [location]   = useLocation();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 40);
    el.addEventListener("scroll", onScroll, { passive: true });
    const onWindowScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <div className="sm:h-screen sm:overflow-hidden bg-background dark:bg-surface text-foreground flex flex-col">

      {/* ── Sticky Header ─────────────────────────────────────── */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 bg-background/96 dark:bg-surface/96 backdrop-blur-sm transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_12px_rgba(0,0,0,0.4)]" : ""}`}
      >
        {/* Desktop header */}
        <div className="hidden sm:flex h-14 items-center justify-between px-5 md:px-12">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-[9px] h-[9px] bg-primary rounded-[2px] shrink-0" />
            <span className="font-bold text-foreground leading-none" style={{ fontSize: "1.4rem" }}>
              {profile.name}
            </span>
            <span className="hidden md:inline text-border leading-none mx-0.5">/</span>
            <span className="hidden md:block text-[0.92rem] tracking-[0.12em] uppercase text-muted-foreground font-medium leading-none">
              {profile.title}
            </span>
          </Link>

          <nav className="flex items-center gap-6 md:gap-8" role="navigation" aria-label="Primary navigation">
            {navLinks.map((link) =>
              link.soon ? (
                <span key={link.label} className="relative flex items-center gap-1.5 text-[0.72rem] font-bold tracking-[0.09em] text-muted-foreground/40 cursor-default select-none group">
                  {link.label}
                  <span className="px-1 py-px rounded text-[0.42rem] font-medium uppercase tracking-wide bg-secondary/70 text-muted-foreground/40">
                    Soon
                  </span>
                  <span className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg text-[0.65rem] font-medium text-primary-foreground bg-primary whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md z-50">
                    Case studies coming soon!
                  </span>
                </span>
              ) : (
                <Link key={link.href} href={link.href}
                  className={`text-[0.72rem] font-bold tracking-[0.09em] transition-colors duration-200 ${
                    isActive(link.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              )
            )}
            <ThemeToggle />
          </nav>
        </div>

        {/* Mobile header */}
        <div className="flex sm:hidden items-start justify-between px-5 pt-3 pb-2.5">
          <Link href="/" className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <div className="w-[10px] h-[10px] bg-primary rounded-[2px] shrink-0 mt-0.5" />
              <span className="font-black text-[1.45rem] text-foreground leading-tight tracking-[-0.02em]">
                {profile.name}
              </span>
            </div>
            <span className="text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground font-semibold pl-4">
              {profile.title}
            </span>
          </Link>

          <div className="flex items-center gap-1 mt-1">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile navigation overlay ──────────────────────────── */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`sm:hidden fixed inset-0 z-[100] bg-background dark:bg-surface flex flex-col transition-opacity duration-300 ${
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
              <div className="w-[10px] h-[10px] bg-primary rounded-[2px] shrink-0 mt-0.5" />
              <span className="font-black text-[1.45rem] text-foreground leading-tight tracking-[-0.02em]">
                {profile.name}
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            className="text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X size={22} />
          </button>
        </div>

        <nav
          role="navigation"
          aria-label="Mobile navigation"
          className="flex flex-col px-5 pt-10 pb-8 flex-1"
        >
          {navLinks.map((link) =>
            link.soon ? (
              <span
                key={link.label}
                className="py-5 flex items-center gap-3 font-black tracking-[0.08em] text-muted-foreground/40 cursor-default select-none border-b border-border"
                style={{ fontSize: "clamp(1.5rem, 8vw, 2.5rem)" }}
              >
                {link.label}
                <span className="px-1.5 py-px rounded text-[0.5rem] font-medium uppercase tracking-wide bg-secondary/70 text-muted-foreground/40">
                  Soon
                </span>
              </span>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`py-5 font-black tracking-[0.08em] border-b border-border last:border-0 transition-colors duration-200 ${
                  isActive(link.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontSize: "clamp(1.5rem, 8vw, 2.5rem)" }}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>

      {/* ── Scroll-to-top — mobile only ────────────────────────── */}
      <button
        onClick={() => {
          mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        aria-label="Scroll to top"
        className={`sm:hidden fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-300 ${
          scrolled ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp size={18} />
      </button>

      {/* ── Main content ───────────────────────────────────────── */}
      <main ref={mainRef} className="flex-1 sm:min-h-0 flex flex-col sm:overflow-y-auto">
        {children}

        {/* Footer */}
        <footer className="shrink-0 bg-background dark:bg-surface border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 md:px-12 py-6 sm:py-4 gap-5 sm:gap-0">

            <div className="order-first sm:order-last flex flex-col sm:flex-row gap-5 sm:gap-8 md:gap-14">
              <div className="flex flex-col gap-2">
                <span className="text-[0.82rem] font-bold text-foreground tracking-[0.06em]">Write</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[0.82rem] text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {profile.email}
                </a>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[0.82rem] font-bold text-foreground tracking-[0.06em]">Follow</span>
                <div className="flex items-center gap-4">
                  {social.map(({ href, label, icon }) => {
                    const Icon = socialIcons[icon];
                    return (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:opacity-60 transition-opacity duration-200"
                      >
                        <Icon size={22} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <span className="order-last sm:order-first flex items-center gap-2 text-[0.72rem] text-muted-foreground">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
              <span className="select-none">·</span>
              <LocalClock />
            </span>

          </div>
        </footer>
      </main>

    </div>
  );
}
