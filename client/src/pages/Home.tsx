import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Linkedin, Instagram } from "lucide-react";
import Layout from "../components/Layout";
import { profile, bio, social, domainTags, headline } from "../data/homeData";

function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

const socialIcons: Record<string, React.FC<{ size?: number; strokeWidth?: number }>> = {
  linkedin:  Linkedin,
  instagram: Instagram,
};

export default function Home() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [willAnimate, setWillAnimate]   = useState(false);

  useEffect(() => {
    setWillAnimate(true);
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <Layout>
      <div className={`flex-1 flex flex-col ${willAnimate ? "will-animate" : ""} ${heroRevealed ? "is-revealed" : ""}`}>

        <section
          className="flex-1 flex items-center px-5 md:px-12 py-10 md:py-0 hero-gradient"
          aria-label="Hero"
        >
          <div className="w-full max-w-5xl mx-auto grid md:grid-cols-[320px_1fr] gap-8 md:gap-14 items-center">

            {/* ── Profile Card ───────────────────────────────── */}
            <div className="reveal-item w-full max-w-sm mx-auto md:mx-0" style={stagger(0)}>
              <div className="apple-card overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]">

                {/* Photo */}
                <div className="w-full aspect-square overflow-hidden bg-secondary">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                </div>

                {/* Info block */}
                <div className="px-5 py-4">
                  <p className="font-bold text-[1.05rem] text-foreground leading-tight">
                    {profile.name}
                  </p>
                  <p className="text-[0.75rem] text-muted-foreground mt-0.5 tracking-wide">
                    {profile.title}
                  </p>

                  {/* Divider */}
                  <div className="my-3 border-t border-border" />

                  {/* Domain tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {domainTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-secondary text-[0.6rem] font-semibold tracking-[0.04em] uppercase text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="my-3 border-t border-border" />

                  {/* Social links */}
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
                          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                        >
                          <Icon size={17} strokeWidth={1.75} />
                        </a>
                      );
                    })}
                    <span className="ml-auto text-[0.68rem] text-muted-foreground">
                      Jakarta, ID
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* ── Hero Text ──────────────────────────────────── */}
            <div className="flex flex-col gap-5">

              <div className="reveal-item" style={stagger(1)}>
                <h1
                  className="font-black text-foreground leading-[1.08] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)" }}
                >
                  {headline}
                </h1>
              </div>

              <div className="reveal-item space-y-3" style={stagger(2)}>
                {bio.map((paragraph, i) => (
                  <p key={i} className="text-[0.92rem] text-subtle leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="reveal-item flex flex-wrap gap-3" style={stagger(3)}>
                <Link href="/resume">
                  <button className="inline-flex items-center justify-center bg-foreground text-background px-7 py-2.5 rounded-full text-[0.78rem] font-semibold tracking-[0.02em] hover:opacity-80 transition-opacity duration-200 active:scale-[0.97] min-h-[42px]">
                    View Resume
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="inline-flex items-center justify-center border border-border text-foreground px-7 py-2.5 rounded-full text-[0.78rem] font-semibold tracking-[0.02em] hover:bg-secondary transition-colors duration-200 active:scale-[0.97] min-h-[42px]">
                    Let's Talk
                  </button>
                </Link>
              </div>

            </div>

          </div>
        </section>

      </div>
    </Layout>
  );
}
