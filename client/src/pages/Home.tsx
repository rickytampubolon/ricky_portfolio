import { Link } from "wouter";
import Layout from "../components/Layout";
import { profile, bio, headline } from "../data/homeData";

export default function Home() {
  return (
    <Layout>
      <div className="min-h-full flex flex-col">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="flex-1 flex items-center px-6 sm:px-10 md:px-14 py-10 md:py-0">
          <div className="w-full max-w-4xl mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-12 items-center">

              {/* ── Profile card ─────────────────────────────── */}
              <div className="w-full max-w-[260px] mx-auto md:mx-0 bg-card rounded-2xl shadow-[0_4px_28px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_28px_rgba(0,0,0,0.5)] border border-border p-6 flex flex-col items-center text-center">

                {/* Circular photo */}
                <div className="w-28 h-28 rounded-full overflow-hidden mb-5 ring-4 ring-border shrink-0">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 20%" }}
                    loading="eager"
                  />
                </div>

                {/* Work status */}
                <span className="text-[0.63rem] font-bold uppercase tracking-[0.12em] text-muted-foreground/60 mb-1.5 select-none">
                  Work Status
                </span>
                <p className="text-[0.82rem] font-semibold text-foreground leading-snug">
                  {profile.title} @ Green SM Indonesia
                </p>
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
