import { Link } from "wouter";
import Layout from "../components/Layout";
import { profile, bio, domainTags, headline } from "../data/homeData";

const companies = [
  { name: "Traveloka",   logo: "/traveloka-logo.png" },
  { name: "Tokopedia",   logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/ZYnBvsLmQkohgFkj.png" },
  { name: "Shopee",      logo: "https://www.google.com/s2/favicons?domain=shopee.co.id&sz=256" },
  { name: "GovTech Edu", logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/cJhNVtPdbOHZIgCZ.png" },
  { name: "Green SM",    logo: "https://www.google.com/s2/favicons?domain=xanhsm.com&sz=256" },
];

export default function Home() {
  return (
    <Layout>
      <div className="min-h-full flex flex-col">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="flex-1 flex items-center px-6 sm:px-10 md:px-14 py-10 md:py-0">
          <div className="w-full max-w-4xl mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-14 items-center">

              {/* ── Profile card ─────────────────────────────── */}
              <div className="w-full max-w-[300px] mx-auto md:mx-0">
                <div className="apple-card overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] border-t-2" style={{ borderTopColor: "var(--mint)" }}>

                  {/* Photo */}
                  <div className="w-full overflow-hidden bg-secondary" style={{ aspectRatio: "6/5" }}>
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "center 30%" }}
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

                    <div className="my-3 border-t border-border" />

                    {/* Domain tags — 2 rows */}
                    <div className="space-y-1">
                      {[domainTags.slice(0, 2), domainTags.slice(2)].map((row, r) => (
                        <div key={r} className="flex gap-1">
                          {row.map((tag, i) => (
                            <span
                              key={tag}
                              className={`px-1.5 py-px rounded-full text-[0.48rem] font-semibold uppercase tracking-normal leading-5 whitespace-nowrap ${
                                r === 0 && i === 0
                                  ? "bg-mint-subtle text-mint"
                                  : "bg-secondary text-muted-foreground"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>

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

              {/* ── Text block ───────────────────────────────── */}
              <div>
                <h1
                  className="font-black leading-[1.07] tracking-[-0.03em] text-foreground mb-5"
                  style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)" }}
                >
                  {headline}
                </h1>
                <p className="text-[0.9rem] sm:text-[0.95rem] text-subtle leading-relaxed">
                  {bio[0]}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── CTA buttons ──────────────────────────────────────── */}
        <div className="shrink-0 flex justify-center gap-4 px-6 py-8">
          <Link href="/resume">
            <button className="bg-navy text-white px-9 py-3 rounded-full text-[0.82rem] font-semibold tracking-[0.02em] hover:opacity-80 transition-opacity active:scale-[0.97] min-h-[46px] shadow-sm">
              View Resume
            </button>
          </Link>
          <Link href="/contact">
            <button className="border-2 border-navy text-navy dark:border-white dark:text-white px-9 py-3 rounded-full text-[0.82rem] font-semibold tracking-[0.02em] hover:bg-navy hover:text-white dark:hover:bg-white dark:hover:text-navy transition-all active:scale-[0.97] min-h-[46px]">
              Let's Talk
            </button>
          </Link>
        </div>

      </div>
    </Layout>
  );
}
