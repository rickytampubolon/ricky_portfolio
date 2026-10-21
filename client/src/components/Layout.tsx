import { useEffect, useState } from "react";
import { Instagram, Linkedin, Mail, Plus } from "lucide-react";
import { profile, social } from "../data/homeData";
import Logo from "./Logo";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Education",  href: "#education"  },
  { label: "Skills",     href: "#skills"     },
  { label: "Contact",    href: "#contact"    },
];

const icons = { LinkedIn: Linkedin, Instagram };

/* Live Jakarta time, shown in the header */
function JakartaClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString("en-US", { timeZone: "Asia/Jakarta", hour: "numeric", minute: "2-digit", second: "2-digit" });
  return (
    <div className="leading-tight text-[0.78rem]">
      <p className="text-muted-foreground">Jakarta, Indonesia</p>
      <p className="font-medium tabular-nums">{time}</p>
    </div>
  );
}

export default function Layout({ children, title }: { children: React.ReactNode; title?: string }) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${profile.name}`
      : `${profile.name} | ${profile.title}`;
  }, [title]);

  return (
    <div id="top" className="min-h-screen flex flex-col">
      <header className="px-6 md:px-12 h-24 flex items-center gap-6 md:gap-10">
        <a href="#top" aria-label={`${profile.name}, back to top`} className="shrink-0 hover:opacity-80 transition-opacity">
          <Logo size={46} />
        </a>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-[0.92rem]">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="py-2 hover:text-muted-foreground transition-colors">{l.label}</a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:block mr-3"><JakartaClock /></div>
          {social.map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
               className="hidden lg:inline-flex bg-secondary text-muted-foreground rounded-xl px-5 py-2.5 text-[0.9rem] hover:text-foreground transition-colors">
              {label}
            </a>
          ))}
          <a href="#contact" aria-label="Contact me" className="bg-foreground text-background rounded-xl w-11 h-11 grid place-items-center hover:bg-foreground/85 transition-colors active:scale-[0.97]">
            <Plus size={16} strokeWidth={2.2} />
          </a>
        </div>
      </header>

      {/* Social rail, desktop only */}
      <aside aria-label="Social links" className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        {social.map(({ href, label }) => {
          const Icon = icons[label];
          return (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
               className="tile w-11 h-11 rounded-full grid place-items-center hover:bg-foreground hover:text-background transition-colors">
              <Icon size={17} strokeWidth={1.6} />
            </a>
          );
        })}
        <a href={`mailto:${profile.email}`} aria-label="Email"
           className="tile w-11 h-11 rounded-full grid place-items-center hover:bg-foreground hover:text-background transition-colors">
          <Mail size={17} strokeWidth={1.6} />
        </a>
      </aside>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="px-6 md:px-12 py-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-[0.85rem]">
        <p className="flex items-center gap-4">
          <span className="font-semibold">{profile.name}</span>
          <span className="text-muted-foreground">{profile.title}</span>
        </p>
        <nav aria-label="Footer" className="flex items-center gap-6 text-muted-foreground">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors py-2">{l.label}</a>
          ))}
        </nav>
      </footer>
    </div>
  );
}
