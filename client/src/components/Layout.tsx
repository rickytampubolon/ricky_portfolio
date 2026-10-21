import { useEffect } from "react";
import { profile, social } from "../data/homeData";

const navLinks = [
  { label: "Resume",  href: "#resume"  },
  { label: "Contact", href: "#contact" },
];

export default function Layout({ children, title }: { children: React.ReactNode; title?: string }) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${profile.name}`
      : `${profile.name} | ${profile.title}`;
  }, [title]);

  return (
    <div id="top" className="min-h-screen flex flex-col">
      <header className="px-6 md:px-12 h-20 flex items-center justify-between">
        <a href="#top" className="text-[0.95rem] font-medium tracking-tight">
          {profile.name}
        </a>
        <nav aria-label="Primary" className="flex items-center gap-7 text-[0.95rem]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="px-6 md:px-12 py-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[0.85rem] text-muted-foreground">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <div className="flex items-center gap-6">
          <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors py-2">Email</a>
          {social.map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors py-2">
              {label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
