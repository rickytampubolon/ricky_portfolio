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

        <section className="px-6 py-10 md:flex-1 md:flex md:items-center md:py-0 md:px-10">
          <div className="w-full max-w-[820px] mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-9 md:gap-12 md:items-start">

            {/* ── Profile card ─────────────────────────────── */}
            <div className="w-full max-w-[260px] mx-auto md:mx-0 order-2 md:order-1">
              <div className="apple-card overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.5)]">

                <div className="flex justify-center pt-7 pb-2 px-5 bg-card">
                  <div className="w-32 h-32 rounded-full overflow-hidden ring-[4px] ring-border shrink-0">
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "center 20%" }}
                      loading="eager"
                    />
                  </div>
                </div>

                <div className="px-5 py-4">
                  <p className="font-bold text-[0.95rem] text-foreground leading-tight">
                    {profile.name}
                  </p>
                  <p className="text-[0.72rem] text-muted-foreground mt-0.5">
                    {profile.title}
                  </p>

                  <div className="my-3 border-t border-border" />

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
                </div>

              </div>
            </div>

            {/* ── Text block ───────────────────────────────── */}
            <div className="flex flex-col gap-4 order-1 md:order-2">
              <h1
                className="font-black leading-[1.08] tracking-[-0.03em] text-foreground"
                style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.2rem)" }}
              >
                {headline}
              </h1>
              <p className="text-[0.88rem] text-subtle leading-relaxed">{bio[0]}</p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/resume">
                  <button className="bg-foreground text-background px-7 py-2.5 rounded-full text-[0.8rem] font-semibold tracking-[0.02em] hover:opacity-75 transition-opacity duration-200 active:scale-[0.97] min-h-[40px]">
                    View Resume
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="border border-foreground text-foreground px-7 py-2.5 rounded-full text-[0.8rem] font-semibold tracking-[0.02em] hover:bg-foreground hover:text-background transition-all duration-200 active:scale-[0.97] min-h-[40px]">
                    Let's Talk
                  </button>
                </Link>
              </div>

              {/* ── Experience bar ───────────────────────────── */}
              <div className="apple-card px-4 py-3 flex items-center gap-3 mt-1">
                <span className="text-[0.72rem] font-semibold text-muted-foreground shrink-0">Experience</span>
                <div className="w-px h-4 bg-border shrink-0" />
                <div className="flex items-center gap-3 flex-wrap">
                  {companies.map(({ name, logo }) => (
                    <div key={name} className="w-6 h-6 flex items-center justify-center shrink-0">
                      <img
                        src={logo}
                        alt={name}
                        title={name}
                        className="max-w-full max-h-full object-contain grayscale opacity-50"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </Layout>
  );
}
