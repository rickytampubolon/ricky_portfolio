import { Link, useLocation } from "wouter";
import { Linkedin, Instagram, Sun, Moon, X, Menu, Mail, ArrowUp, MapPin, type LucideProps } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect, useRef } from "react";
import { profile, social } from "../data/homeData";

function LiveClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="tabular-nums">
      {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
    </span>
  );
}

/* ── Nav config ──────────────────────────────────────────────── */
type NavLink =
  | { label: string; href: string; soon?: never }
  | { label: string; href?: never;  soon: true  };

const navLinks: NavLink[] = [
  { label: "About",   href: "/"        },
  { label: "Resume",  href: "/resume"  },
  { label: "Work",    soon: true       },
  { label: "Contact", href: "/contact" },
];

/* ── Icon map ────────────────────────────────────────────────── */
const socialIcons: Record<string, React.FC<LucideProps>> = {
  linkedin:  Linkedin,
  instagram: Instagram,
};

/* ── Theme toggle ────────────────────────────────────────────── */
function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  if (!toggleTheme) return null;
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`transition-colors duration-200 min-w-[36px] min-h-[36px] flex items-center justify-center ${className ?? ""}`}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

/* ── Layout ──────────────────────────────────────────────────── */
export default function Layout({ children }: { children: React.ReactNode }) {
  const [location]    = useLocation();
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Scroll-to-top visibility */
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 280);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">

      {/* ── Desktop Sidebar ───────────────────────────────────── */}
      <aside className="hidden md:flex w-[220px] shrink-0 flex-col bg-navy fixed inset-y-0 left-0 z-40 px-6 py-6">

        {/* Brand + theme toggle */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-[9px] h-[9px] rounded-full bg-mint shrink-0" />
          <span className="text-white font-black text-[1.05rem] leading-tight tracking-[-0.01em] flex-1">
            {profile.name}
          </span>
          <ThemeToggle className="text-white/35 hover:text-white/70" />
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-0.5 flex-1" role="navigation" aria-label="Primary navigation">
          {navLinks.map((link) =>
            link.soon ? (
              <span
                key={link.label}
                className="flex items-center gap-2.5 pl-4 border-l-2 border-transparent py-2 text-[0.88rem] font-semibold text-white/25 cursor-default select-none"
              >
                {link.label}
                <span className="text-[0.52rem] px-1.5 py-0.5 rounded-full bg-white/10 text-white/25 uppercase tracking-wide font-bold">
                  Soon
                </span>
              </span>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`flex items-center pl-4 border-l-2 py-2 text-[0.88rem] font-semibold transition-all duration-150 rounded-r-lg ${
                  isActive(link.href)
                    ? "border-mint text-white bg-white/10"
                    : "border-transparent text-white/45 hover:text-white hover:bg-white/5 hover:border-white/20"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Location + clock + social + copyright */}
        <div className="space-y-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-white/35">
              <MapPin size={11} strokeWidth={1.75} />
              <span className="text-[0.62rem]">Jakarta, Indonesia</span>
            </div>
            <span className="text-[0.62rem] text-white/25 pl-[19px]">
              <LiveClock />
            </span>
          </div>
          <div className="flex items-center gap-1">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="text-white/35 hover:text-mint transition-colors duration-200 min-w-[30px] min-h-[30px] flex items-center justify-center"
            >
              <Mail size={14} strokeWidth={1.75} />
            </a>
            {social.map(({ href, label, icon }) => {
              const Icon = socialIcons[icon];
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/35 hover:text-mint transition-colors duration-200 min-w-[30px] min-h-[30px] flex items-center justify-center"
                >
                  <Icon size={14} strokeWidth={1.75} />
                </a>
              );
            })}
          </div>
          <p className="text-[0.58rem] text-white/20 select-none">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </aside>

      {/* ── Mobile header ─────────────────────────────────────── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-5 bg-navy">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-[9px] h-[9px] rounded-full bg-mint shrink-0" />
          <span className="font-black text-[1.0rem] text-white leading-none tracking-[-0.01em]">
            {profile.name}
          </span>
        </Link>
        <div className="flex items-center">
          <ThemeToggle className="text-white/50 hover:text-white" />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Menu size={21} />
          </button>
        </div>
      </header>

      {/* ── Mobile navigation overlay ──────────────────────────── */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`md:hidden fixed inset-0 z-[100] bg-navy flex flex-col transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          transform: mobileOpen ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <div className="flex items-center justify-between px-5 h-14">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <div className="w-[9px] h-[9px] rounded-full bg-mint shrink-0" />
            <span className="font-black text-[1.0rem] text-white leading-none">{profile.name}</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            className="text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X size={22} />
          </button>
        </div>

        <nav
          role="navigation"
          aria-label="Mobile navigation"
          className="flex flex-col px-6 pt-8 flex-1"
        >
          {navLinks.map((link) =>
            link.soon ? (
              <span
                key={link.label}
                className="py-4 flex items-center gap-3 font-black text-white/25 border-b border-white/10 cursor-default select-none"
                style={{ fontSize: "clamp(1.5rem, 8vw, 2.5rem)" }}
              >
                {link.label}
                <span className="text-[0.5rem] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide bg-white/10 text-white/25">
                  Soon
                </span>
              </span>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`py-4 font-black border-b border-white/10 last:border-0 transition-colors duration-200 ${
                  isActive(link.href) ? "text-white" : "text-white/40 hover:text-white"
                }`}
                style={{ fontSize: "clamp(1.5rem, 8vw, 2.5rem)" }}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="px-6 py-8 flex items-center gap-3">
          <a href={`mailto:${profile.email}`} className="text-white/40 hover:text-mint transition-colors">
            <Mail size={17} strokeWidth={1.75} />
          </a>
          {social.map(({ href, label, icon }) => {
            const Icon = socialIcons[icon];
            return (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-mint transition-colors">
                <Icon size={17} strokeWidth={1.75} />
              </a>
            );
          })}
          <ThemeToggle className="ml-auto text-white/40 hover:text-white" />
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────────── */}
      <main
        ref={mainRef}
        className="flex-1 md:ml-[220px] flex flex-col overflow-y-auto pt-14 md:pt-0"
      >
        {children}

        {/* ── Mobile footer ──────────────────────────────────── */}
        <footer className="md:hidden shrink-0 border-t border-border bg-background px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-[0.7rem] text-muted-foreground select-none">
              © {new Date().getFullYear()} {profile.name}
            </span>
            <div className="flex items-center gap-1">
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="text-muted-foreground hover:text-mint transition-colors duration-200 min-w-[36px] min-h-[36px] flex items-center justify-center"
              >
                <Mail size={16} strokeWidth={1.75} />
              </a>
              {social.map(({ href, label, icon }) => {
                const Icon = socialIcons[icon];
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-mint transition-colors duration-200 min-w-[36px] min-h-[36px] flex items-center justify-center"
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </a>
                );
              })}
            </div>
          </div>
        </footer>
      </main>

      {/* ── Mobile scroll-to-top ───────────────────────────────── */}
      <button
        onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={`md:hidden fixed bottom-[68px] right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center bg-navy text-white shadow-lg transition-all duration-300 ${
          scrolled
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <ArrowUp size={17} />
      </button>

    </div>
  );
}
