import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile, social } from "../data/homeData";
import Logo from "./Logo";

const menuLinks = [
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
          <div className="flex items-center gap-3 min-w-0">
            <a href="#top" aria-label={`${profile.name}, back to top`} className="shrink-0 hover:opacity-70 transition-opacity">
              <Logo size={44} />
            </a>
            <a href={`mailto:${profile.email}`} className="link text-[0.95rem] truncate">{profile.email}</a>
          </div>

          <div ref={menuRef} className="relative shrink-0">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              className="card !p-0 !rounded-full w-12 h-12 grid place-items-center hover:scale-105 transition-transform"
            >
              {open ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
            </button>

            {open && (
              <nav id="site-menu" aria-label="Menu" className="card !p-2 !rounded-2xl absolute right-0 top-14 w-52 z-50">
                {[...menuLinks, ...social.map((s) => ({ label: s.label, href: s.href }))].map((l) => {
                  const external = l.href.startsWith("http");
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="block rounded-xl px-4 py-2.5 text-[0.92rem] hover:bg-secondary transition-colors"
                    >
                      {l.label}
                    </a>
                  );
                })}
              </nav>
            )}
          </div>
        </header>

        <main className="flex-1 flex flex-col">{children}</main>

        <footer className="py-10 flex flex-wrap items-center justify-between gap-2 text-[0.85rem] text-muted-foreground">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>{profile.title}</p>
        </footer>
      </div>
    </div>
  );
}
