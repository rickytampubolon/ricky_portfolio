import { Link, useLocation } from "wouter";
import { Sun, Moon, Linkedin, Mail, Menu, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "HOME",    href: "/" },
  { label: "RESUME",  href: "/resume" },
  { label: "CONTACT", href: "/contact" },
];

const footerSocial = [
  { href: "https://www.linkedin.com/in/rickyhlmn/", icon: <Linkedin size={14} />, label: "LinkedIn" },
  { href: "mailto:rickytampubolon97@gmail.com",     icon: <Mail     size={14} />, label: "Email" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location]   = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleThemeToggle = () => {
    document.documentElement.classList.add("theme-transitioning");
    toggleTheme?.();
    setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 450);
  };

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-[#1A1A1A] dark:text-[#E0E0E0] flex flex-col">

      {/* ── Sticky Header ─────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/96 dark:bg-[#121212]/96 backdrop-blur-sm border-b border-[#E0E0E0] dark:border-[#2C2C2C] transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_12px_rgba(0,0,0,0.4)]" : ""}`}
      >
        <div className="h-14 flex items-center justify-between px-5 md:px-12">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-[9px] h-[9px] bg-[#007BFF] rounded-[2px] shrink-0" />
            <span className="font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-none" style={{ fontSize: "0.92rem" }}>
              Ricky Halomoan
            </span>
            <span className="hidden md:inline text-[#D0D0D0] dark:text-[#444] leading-none mx-0.5">/</span>
            <span className="hidden md:block text-[0.62rem] tracking-[0.12em] uppercase text-[#888888] dark:text-[#888888] font-medium leading-none">
              Senior Product Manager
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6 md:gap-8">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`text-[0.72rem] font-bold tracking-[0.09em] transition-colors duration-200 ${
                  isActive(href)
                    ? "text-[#007BFF]"
                    : "text-[#666666] dark:text-[#888888] hover:text-[#007BFF] dark:hover:text-[#3B9EFF]"
                }`}
              >
                {label}
              </Link>
            ))}

            <div className="w-px h-4 bg-[#E0E0E0] dark:bg-[#2C2C2C] shrink-0" />

            {/* Dark/light toggle */}
            <button
              onClick={handleThemeToggle}
              aria-label="Toggle dark mode"
              className="relative w-[30px] h-[30px] rounded-full border border-[#E0E0E0] dark:border-[#2C2C2C] bg-[#F5F5F5] dark:bg-[#1E1E1E] hover:bg-[#EBEBEB] dark:hover:bg-[#2A2A2A] flex items-center justify-center transition-colors duration-200 shrink-0"
            >
              <Sun  size={13} className={`absolute text-[#888] transition-all duration-300 ${theme === "dark" ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`} />
              <Moon size={13} className={`absolute text-[#aaa] transition-all duration-300 ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`} />
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex sm:hidden items-center gap-3">
            <button
              onClick={handleThemeToggle}
              aria-label="Toggle dark mode"
              className="relative w-[30px] h-[30px] rounded-full border border-[#E0E0E0] dark:border-[#2C2C2C] bg-[#F5F5F5] dark:bg-[#1E1E1E] flex items-center justify-center shrink-0"
            >
              <Sun  size={13} className={`absolute text-[#888] transition-all duration-300 ${theme === "dark" ? "opacity-0 rotate-90 scale-50" : "opacity-100"}`} />
              <Moon size={13} className={`absolute text-[#aaa] transition-all duration-300 ${theme === "dark" ? "opacity-100" : "opacity-0 -rotate-90 scale-50"}`} />
            </button>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              className="w-7 h-7 flex items-center justify-center text-[#666] dark:text-[#888]"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          style={{ maxHeight: mobileOpen ? "180px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}
          className="sm:hidden border-t border-[#E0E0E0] dark:border-[#2C2C2C] bg-white dark:bg-[#121212]"
        >
          <nav className="flex flex-col py-2 px-5">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`py-3 text-[0.8rem] font-bold tracking-[0.08em] border-b border-[#F4F4F4] dark:border-[#2C2C2C] last:border-0 transition-colors ${
                  isActive(href) ? "text-[#007BFF]" : "text-[#666666] dark:text-[#888888]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pt-14">{children}</main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-[#E0E0E0] dark:border-[#2C2C2C] bg-white dark:bg-[#121212]">
        <div className="px-5 md:px-12 py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[0.72rem] text-[#999] shrink-0">
            © 2026 Ricky Halomoan. All rights reserved.
          </p>

          <div className="flex flex-col sm:flex-row gap-1 sm:gap-6">
            <a href="tel:+6281234567890"
              className="text-[0.72rem] text-[#999] hover:text-[#007BFF] dark:hover:text-[#3B9EFF] transition-colors duration-200">
              Call +62 812-3456-7890
            </a>
            <a href="mailto:rickytampubolon97@gmail.com"
              className="text-[0.72rem] text-[#999] hover:text-[#007BFF] dark:hover:text-[#3B9EFF] transition-colors duration-200">
              Write rickytampubolon97@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {footerSocial.map(({ href, icon, label }) => (
              <a key={label} href={href} aria-label={label}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-[#BBBBBB] dark:text-[#555] hover:text-[#007BFF] dark:hover:text-[#3B9EFF] transition-colors duration-200">
                {icon}
              </a>
            ))}
          </div>

        </div>
      </footer>
    </div>
  );
}
