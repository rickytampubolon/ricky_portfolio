import { Link, useLocation } from "wouter";
import { Linkedin, Instagram, X, Menu, Mail, type LucideProps } from "lucide-react";
import { useState, useEffect } from "react";
import { profile, social } from "../data/homeData";

/* ── Nav config ──────────────────────────────────────────────── */
type NavLink =
  | { label: string; href: string; num: string; soon?: never }
  | { label: string; href?: never;  num: string; soon: true  };

const navLinks: NavLink[] = [
  { num: "01.", label: "About",   href: "/"        },
  { num: "02.", label: "Resume",  href: "/resume"  },
  { num: "03.", label: "Work",    soon: true       },
  { num: "04.", label: "Contact", href: "/contact" },
];

/* ── Icon map ────────────────────────────────────────────────── */
const socialIcons: Record<string, React.FC<LucideProps>> = {
  linkedin:  Linkedin,
  instagram: Instagram,
};

/* ── Layout ──────────────────────────────────────────────────── */
export default function Layout({ children }: { children: React.ReactNode }) {
  const [location]   = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const isScrollPage = location === "/resume" || location === "/contact";
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    setAtBottom(false);
    if (location !== "/resume" && location !== "/contact") return;
    const check = () => {
      const total = document.documentElement.scrollHeight;
      const visible = window.innerHeight;
      if (total <= visible + 10) { setAtBottom(true); return; }
      setAtBottom(window.scrollY + visible >= total - 60);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [location]);

  const footerVisible = !isScrollPage || atBottom;

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <div className="min-h-screen text-foreground">

      {/* ── Fixed top nav ─────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-12" style={{ background: "transparent" }}>

        {/* Logo — text only */}
        <Link href="/" className="mr-auto">
          <div className="flex items-center gap-2.5 group">
            <span className="w-2 h-2 rounded-sm bg-mint shrink-0 group-hover:scale-110 transition-transform duration-200" />
            <span
              className="font-bold text-[0.92rem] tracking-tight transition-colors duration-200 group-hover:text-mint"
              style={{ color: "var(--white)" }}
            >
              {profile.name}
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Primary navigation">
          {navLinks.map((link) =>
            link.soon ? (
              <span
                key={link.label}
                className="px-4 py-2 text-[0.82rem] font-mono text-foreground/25 cursor-default select-none flex items-center gap-1.5"
              >
                <span className="text-mint/40 text-[0.72rem]">{link.num}</span>
                {link.label}
                <span className="text-[0.48rem] px-1.5 py-0.5 rounded border border-foreground/15 text-foreground/25 uppercase tracking-wide font-bold ml-1">
                  Soon
                </span>
              </span>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`px-4 py-2 text-[0.82rem] font-mono transition-colors duration-200 flex items-center gap-1.5 ${
                  isActive(link.href)
                    ? "text-mint"
                    : "text-subtle hover:text-mint"
                }`}
              >
                <span className="text-mint text-[0.72rem]">{link.num}</span>
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile: hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="md:hidden text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <Menu size={21} />
        </button>
      </header>

      {/* ── Mobile navigation overlay ──────────────────────────── */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`md:hidden fixed inset-0 z-[100] bg-surface flex flex-col transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <div className="flex items-center justify-end px-5 h-16">
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
          className="flex flex-col items-center justify-center flex-1 gap-6"
        >
          {navLinks.map((link) =>
            link.soon ? (
              <span
                key={link.label}
                className="flex flex-col items-center text-foreground/25 cursor-default select-none"
              >
                <span className="text-mint/40 font-mono text-xs mb-1">{link.num}</span>
                <span className="font-bold text-2xl">{link.label}</span>
              </span>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`flex flex-col items-center transition-colors duration-200 ${
                  isActive(link.href) ? "text-mint" : "text-foreground/60 hover:text-mint"
                }`}
              >
                <span className="text-mint font-mono text-xs mb-1">{link.num}</span>
                <span className="font-bold text-2xl">{link.label}</span>
              </Link>
            )
          )}
        </nav>

        <div className="px-6 py-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-5">
            <a href={`mailto:${profile.email}`} className="text-subtle hover:text-mint transition-colors">
              <Mail size={18} strokeWidth={1.75} />
            </a>
            {social.map(({ href, label, icon }) => {
              const Icon = socialIcons[icon];
              return (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-mint transition-colors">
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              );
            })}
          </div>
        </div>
      </div>


      {/* ── Main content ───────────────────────────────────────── */}
      <main className="pt-16 pb-24 flex flex-col min-h-screen">
        <div className="flex-1">
          {children}
        </div>

        {/* ── Footer ───────────────────────────────────────────── */}
        <footer
          className={`fixed bottom-0 left-0 right-0 z-40 px-6 md:px-12 py-4 transition-all duration-300 ${
            footerVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          style={{ background: "transparent" }}
        >
          <div className="flex items-center justify-between">
            <p className="text-[0.68rem] font-mono text-muted-foreground select-none">
              © {new Date().getFullYear()} {profile.name}
            </p>
            <div className="flex items-center">
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="text-subtle hover:text-mint transition-colors duration-200 min-w-[40px] min-h-[40px] flex items-center justify-center"
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
                    className="text-subtle hover:text-mint transition-colors duration-200 min-w-[40px] min-h-[40px] flex items-center justify-center"
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </a>
                );
              })}
            </div>
          </div>
        </footer>
      </main>

    </div>
  );
}
