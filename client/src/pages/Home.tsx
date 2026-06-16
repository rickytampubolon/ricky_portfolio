import { useState, useEffect } from "react";
import { Link } from "wouter";
import Layout from "../components/Layout";
import { profile, bio, domainTags, headline } from "../data/homeData";

function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

const companies = [
  { name: "Traveloka",      logo: "/traveloka-logo.png" },
  { name: "Tokopedia",      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/ZYnBvsLmQkohgFkj.png" },
  { name: "Shopee",         logo: "https://www.google.com/s2/favicons?domain=shopee.co.id&sz=256" },
  { name: "GovTech Edu",    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/cJhNVtPdbOHZIgCZ.png" },
  { name: "Green SM",       logo: "https://www.google.com/s2/favicons?domain=xanhsm.com&sz=256" },
];

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
          <div className="w-full max-w-5xl mx-auto grid md:grid-cols-[260px_1fr] gap-8 md:gap-14 items-center">

            {/* ── Profile Card ───────────────────────────────── */}
            <div className="reveal-item w-full max-w-sm mx-auto md:mx-0" style={stagger(0)}>
              <div className="apple-card overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]">

                {/* Photo */}
                <div className="w-full overflow-hidden bg-secondary" style={{ aspectRatio: "1/1" }}>
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover object-center"
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
                  <div className="flex flex-wrap gap-1 overflow-hidden" style={{ maxHeight: "3.2rem" }}>
                    {domainTags.map((tag, i) => (
                      <span
                        key={tag}
                        className={`px-2 py-px rounded-full text-[0.55rem] font-semibold tracking-[0.03em] uppercase leading-5 ${
                          i === 0 ? "bg-mint-subtle" : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="my-3 border-t border-border" />

                  {/* Company logos + location */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {companies.map(({ name, logo }) => (
                        <div key={name} className="w-5 h-5 flex items-center justify-center shrink-0">
                          <img
                            src={logo}
                            alt={name}
                            title={name}
                            className="max-w-full max-h-full object-contain grayscale opacity-70"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-[0.68rem] text-muted-foreground">Jakarta, ID</span>
                  </div>
                </div>

              </div>
            </div>

            {/* ── Hero Text ──────────────────────────────────── */}
            <div className="flex flex-col gap-5">

              <div className="reveal-item" style={stagger(1)}>
                <h1
                  className="font-black text-foreground leading-[1.08] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
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
