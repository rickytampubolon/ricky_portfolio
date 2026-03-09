import { Link, useLocation } from "wouter";
import { Linkedin, Instagram } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "ABOUT ME", href: "/" },
  { label: "RESUME",   href: "/resume" },
  { label: "CONTACT",  href: "/contact" },
];

const footerSocial = [
  { href: "https://www.linkedin.com/in/rickyhlmn/",    icon: <Linkedin  size={20} />, label: "LinkedIn" },
  { href: "https://instagram.com",                     icon: <Instagram size={20} />, label: "Instagram" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location]   = useLocation();
  const { theme }    = useTheme();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-[#1A1A1A] dark:text-[#E0E0E0] flex flex-col">

      {/* ── Sticky Header ─────────────────────────────────────── */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 bg-white/96 dark:bg-[#121212]/96 backdrop-blur-sm border-b border-[#E0E0E0] dark:border-[#2C2C2C] transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_12px_rgba(0,0,0,0.4)]" : ""}`}
      >
        {/* ── Desktop header row ── */}
        <div className="hidden sm:flex h-14 items-center justify-between px-5 md:px-12">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-[9px] h-[9px] bg-[#007BFF] rounded-[2px] shrink-0" />
            <span className="font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-none" style={{ fontSize: "1.05rem" }}>
              Ricky Halomoan
            </span>
            <span className="hidden md:inline text-[#D0D0D0] dark:text-[#444] leading-none mx-0.5">/</span>
            <span className="hidden md:block text-[0.72rem] tracking-[0.12em] uppercase text-[#888888] dark:text-[#888888] font-medium leading-none">
              Senior Product Manager
            </span>
          </Link>

          <div className="flex items-center gap-6 md:gap-8">
            {navLinks.map(({ label, href }) => (
              <Link key={href} href={href}
                className={`text-[0.72rem] font-bold tracking-[0.09em] transition-colors duration-200 ${
                  isActive(href) ? "text-[#007BFF]" : "text-[#666666] dark:text-[#888888] hover:text-[#007BFF] dark:hover:text-[#3B9EFF]"
                }`}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Mobile header: 2-line ── */}
        <div className="flex sm:hidden items-start justify-between px-5 pt-3 pb-2.5">
          {/* Left: square + name (large) + title below */}
          <Link href="/" className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <div className="w-[10px] h-[10px] bg-[#007BFF] rounded-[2px] shrink-0 mt-0.5" />
              <span className="font-black text-[1.25rem] text-[#1A1A1A] dark:text-[#E0E0E0] leading-tight tracking-[-0.02em]">
                Ricky Halomoan
              </span>
            </div>
            <span className="text-[0.65rem] tracking-[0.14em] uppercase text-[#888888] font-semibold pl-4">
              Senior Product Manager
            </span>
          </Link>

          {/* Right: hamburger only */}
          <button onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu"
            className="flex flex-col gap-[5px] w-6 shrink-0 py-1 mt-1">
            <span className="block h-[2px] bg-[#007BFF] rounded-full w-full" />
            <span className="block h-[2px] bg-[#007BFF] rounded-full w-3/4" />
          </button>
        </div>

        {/* Mobile dropdown nav */}
        <div
          style={{ maxHeight: mobileOpen ? "220px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}
          className="sm:hidden border-t border-[#F0F0F0] dark:border-[#2C2C2C] bg-white dark:bg-[#121212]"
        >
          <nav className="flex flex-col py-1 px-5">
            {navLinks.map(({ label, href }) => (
              <Link key={href} href={href}
                className={`py-3 text-[0.82rem] font-bold tracking-[0.08em] border-b border-[#F4F4F4] dark:border-[#2C2C2C] last:border-0 transition-colors ${
                  isActive(href) ? "text-[#007BFF]" : "text-[#666666] dark:text-[#888888]"
                }`}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">{children}</main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-[#E0E0E0] dark:border-[#2C2C2C] bg-white dark:bg-[#121212]">

        {/* ── Mobile footer layout ── */}
        <div className="sm:hidden px-6 pt-8 pb-6">
          {/* Write */}
          <div className="mb-7">
            <p className="text-[0.82rem] font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-1.5">Write</p>
            <a href="mailto:rickytampubolon97@gmail.com" className="text-[0.8rem] text-[#666666] dark:text-[#888888] hover:text-[#007BFF] transition-colors break-all">
              rickytampubolon97@gmail.com
            </a>
          </div>

          {/* Follow */}
          <p className="text-[0.82rem] font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-3">Follow</p>
          <div className="flex items-center gap-5 mb-7">
            {footerSocial.map(({ href, icon, label }) => (
              <a key={label} href={href} aria-label={label}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-[#1A1A1A] dark:text-[#E0E0E0] hover:text-[#007BFF] dark:hover:text-[#3B9EFF] transition-colors duration-200">
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[0.72rem] text-[#999]">
            © 2026 Ricky Halomoan. All rights reserved.
          </p>
        </div>

        {/* ── Desktop footer layout ── */}
        <div className="hidden sm:flex px-5 md:px-12 py-5 items-center justify-between gap-6">
          <p className="text-[0.72rem] text-[#999] shrink-0">
            © 2026 Ricky Halomoan. All rights reserved.
          </p>

          <div className="flex items-start gap-10">
            {/* Write */}
            <div>
              <p className="text-[0.7rem] font-bold text-[#555] dark:text-[#AAA] mb-0.5 tracking-[0.06em]">Write</p>
              <a href="mailto:rickytampubolon97@gmail.com" className="text-[0.72rem] text-[#999] hover:text-[#007BFF] transition-colors duration-200">
                rickytampubolon97@gmail.com
              </a>
            </div>
            {/* Follow */}
            <div>
              <p className="text-[0.7rem] font-bold text-[#555] dark:text-[#AAA] mb-1.5 tracking-[0.06em]">Follow</p>
              <div className="flex items-center gap-3">
                {footerSocial.map(({ href, icon, label }) => (
                  <a key={label} href={href} aria-label={label}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-[#888] dark:text-[#555] hover:text-[#007BFF] dark:hover:text-[#3B9EFF] transition-colors duration-200">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

      </footer>
    </div>
  );
}
