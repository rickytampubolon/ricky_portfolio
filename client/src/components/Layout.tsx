import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile, social } from "../data/homeData";
import Logo from "./Logo";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Education",  href: "#education"  },
  { label: "Contact",    href: "#contact"    },
];

export default function Layout({ children, title }: { children: React.ReactNode; title?: string }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = title
      ? `${title} | ${profile.name}`
      : `${profile.name} | ${profile.title}`;
  }, [title]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div id="top" className="min-h-screen flex flex-col">
      <div className="w-full max-w-4xl mx-auto px-6 flex-1 flex flex-col">
        <header className="h-24 flex items-center justify-between gap-4">
          <a href="#top" aria-label={`${profile.name}, back to top`} className="shrink-0 hover:opacity-70 transition-opacity">
            <Logo size={44} />
          </a>

          {/* Desktop: links are one tap away, no menu needed */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1 shrink-0">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="rounded-full px-4 min-h-11 inline-flex items-center text-[0.92rem] text-subtle hover:text-foreground hover:bg-card transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Mobile: round menu button */}
          <div ref={menuRef} className="relative shrink-0 md:hidden">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              className="card !p-0 !rounded-full w-12 h-12 grid place-items-center"
            >
              {open ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
            </button>

            {open && (
              <nav id="site-menu" aria-label="Menu" className="card !p-2 !rounded-2xl absolute right-0 top-14 w-52 z-50">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                     className="flex items-center min-h-11 rounded-xl px-4 text-[0.95rem] hover:bg-secondary transition-colors">
                    {l.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </header>

        <main className="flex-1 flex flex-col">{children}</main>

        <footer className="py-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-[0.9rem] text-subtle">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <ul className="flex items-center gap-2">
            {social.map(({ href, label }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-11 px-3 hover:text-foreground transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </div>
  );
}
