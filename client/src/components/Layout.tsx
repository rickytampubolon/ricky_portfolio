import { Link, useLocation } from "wouter";
import { Sun, Moon, Linkedin, Instagram, Facebook, Twitter, Menu, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "ABOUT ME", href: "/" },
  { label: "RESUME",   href: "/resume" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CONTACT",  href: "/contact" },
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/rickyhlmn/",   icon: <Linkedin  size={14} />, label: "LinkedIn" },
  { href: "https://www.instagram.com/rickyhlmn/",     icon: <Instagram size={14} />, label: "Instagram" },
  { href: "#",                                         icon: <Twitter   size={14} />, label: "Twitter" },
  { href: "#",                                         icon: <Facebook  size={14} />, label: "Facebook" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location]    = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleThemeToggle = () => {
    document.documentElement.classList.add("theme-transitioning");
    toggleTheme?.();
    setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 450);
  };

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <div className="min-h-screen bg-white dark:bg-background text-foreground flex flex-col">

      {/* ── Sticky Header ─────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/96 dark:bg-background/96 backdrop-blur-sm border-b border-[#E0E0E0] dark:border-border transition-shadow duration-300 ${scrolled ? "shadow-sm" : ""}`}
      >
        <div className="h-14 flex items-center justify-between px-5 md:px-12">

          {/* Left: blue square + name / title */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-[10px] h-[10px] bg-[#007BFF] rounded-[2px] shrink-0" />
            <span className="font-bold text-[#1A1A1A] dark:text-foreground leading-none" style={{ fontSize: "0.92rem" }}>
              Ricky Halomoan
            </span>
            <span className="text-[#CCCCCC] dark:text-slate-600 leading-none">/</span>
            <span className="hidden md:block text-[0.63rem] tracking-[0.12em] uppercase text-[#666666] dark:text-muted-foreground font-medium leading-none">
              Senior Product Manager
            </span>
          </Link>

          {/* Desktop nav + toggle */}
          <div className="hidden sm:flex items-center gap-6 md:gap-8">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`text-[0.72rem] font-bold tracking-[0.08em] transition-colors duration-200 ${
                  isActive(href)
                    ? "text-[#007BFF] dark:text-accent"
                    : "text-[#666666] dark:text-foreground/60 hover:text-[#007BFF] dark:hover:text-accent"
                }`}
              >
                {label}
              </Link>
            ))}

            <div className="w-px h-4 bg-[#E0E0E0] dark:bg-border shrink-0" />

            {/* Theme toggle */}
            <button
              onClick={handleThemeToggle}
              aria-label="Toggle dark mode"
              className="relative w-7 h-7 rounded-full border border-[#E0E0E0] dark:border-border bg-[#F8F8F8] dark:bg-secondary hover:bg-[#EFEFEF] dark:hover:bg-muted flex items-center justify-center transition-colors duration-200 shrink-0"
            >
              <Sun  size={13} className={`absolute transition-all duration-300 ${theme === "dark" ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`} />
              <Moon size={13} className={`absolute transition-all duration-300 ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`} />
            </button>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex sm:hidden items-center gap-3">
            <button
              onClick={handleThemeToggle}
              aria-label="Toggle dark mode"
              className="relative w-7 h-7 rounded-full border border-[#E0E0E0] dark:border-border bg-[#F8F8F8] dark:bg-secondary flex items-center justify-center shrink-0"
            >
              <Sun  size={13} className={`absolute transition-all duration-300 ${theme === "dark" ? "opacity-0 rotate-90 scale-50" : "opacity-100"}`} />
              <Moon size={13} className={`absolute transition-all duration-300 ${theme === "dark" ? "opacity-100" : "opacity-0 -rotate-90 scale-50"}`} />
            </button>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              className="w-7 h-7 flex items-center justify-center text-[#666666] dark:text-muted-foreground"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          style={{ maxHeight: mobileOpen ? "220px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}
          className="sm:hidden border-t border-[#E0E0E0] dark:border-border bg-white dark:bg-background"
        >
          <nav className="flex flex-col py-2 px-5">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`py-2.5 text-[0.8rem] font-bold tracking-[0.08em] border-b border-[#F0F0F0] dark:border-border/40 last:border-0 transition-colors ${
                  isActive(href) ? "text-[#007BFF]" : "text-[#666666] dark:text-foreground/60"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Page content ──────────────────────────────────────── */}
      <main className="flex-1 pt-14">{children}</main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-[#E0E0E0] dark:border-border bg-white dark:bg-background">
        <div className="px-5 md:px-12 py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          {/* Copyright */}
          <p className="text-[0.73rem] text-[#4A4A4A]/55 dark:text-muted-foreground/50 shrink-0">
            © 2026 Ricky Halomoan. All rights reserved.
          </p>

          {/* Call + Write */}
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-6">
            <a href="tel:+6281234567890"
              className="text-[0.73rem] text-[#4A4A4A]/55 dark:text-muted-foreground/50 hover:text-[#007BFF] dark:hover:text-accent transition-colors duration-200">
              Call +62 812-3456-7890
            </a>
            <a href="mailto:rickytampubolon97@gmail.com"
              className="text-[0.73rem] text-[#4A4A4A]/55 dark:text-muted-foreground/50 hover:text-[#007BFF] dark:hover:text-accent transition-colors duration-200">
              Write rickytampubolon97@gmail.com
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4 shrink-0">
            {socialLinks.map(({ href, icon, label }) => (
              <a key={label} href={href} aria-label={label}
                {...(href !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-[#4A4A4A]/35 dark:text-muted-foreground/35 hover:text-[#007BFF] dark:hover:text-accent transition-colors duration-200">
                {icon}
              </a>
            ))}
          </div>

        </div>
      </footer>
    </div>
  );
}
