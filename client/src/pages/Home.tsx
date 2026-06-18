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
      <div className="flex-1 flex flex-col hero-bg">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="flex-1 px-8 sm:px-12 md:px-16 py-10 md:flex md:items-center md:py-0">

          <div className="w-full grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10 md:gap-16 md:items-start">

            {/* ── Profile card ─────────────────────────────── */}
            <div className="w-full max-w-[320px] mx-auto md:mx-0 order-2 md:order-1 md:pt-2">
              <div className="apple-card overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] dark:shadow-[0_4px_28px_rgba(0,0,0,0.45)]">

                {/* Photo */}
                <div className="flex justify-center pt-8 pb-3 px-6 bg-card">
                  <div className="w-36 h-36 rounded-full overflow-hidden ring-[5px] ring-border shrink-0">
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "center 20%" }}
                      loading="eager"
                    />
                  </div>
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
            <div className="flex flex-col gap-5 order-1 md:order-2">
              <h1
                className="font-black leading-[1.07] tracking-[-0.03em] text-foreground"
                style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.4rem)" }}
              >
                {headline}
              </h1>
              <div className="flex flex-col gap-3">
                {bio.map((p, i) => (
                  <p key={i} className="text-[0.9rem] sm:text-[0.95rem] text-subtle leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/resume">
                  <button className="bg-navy text-white px-8 py-2.5 rounded-full text-[0.82rem] font-semibold tracking-[0.02em] hover:opacity-80 transition-opacity duration-200 active:scale-[0.97] min-h-[42px] shadow-sm">
                    View Resume
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="border-2 border-navy text-navy dark:border-foreground dark:text-foreground px-8 py-2.5 rounded-full text-[0.82rem] font-semibold tracking-[0.02em] hover:bg-navy hover:text-white dark:hover:bg-foreground dark:hover:text-background transition-all duration-200 active:scale-[0.97] min-h-[42px]">
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
