import { Link } from "wouter";
import Layout from "../components/Layout";
import { profile } from "../data/homeData";

const sectors = ["Electric Mobility", "Logistics", "Fulfillment", "Ed-Tech"];
const careerPath = ["Traveloka", "Tokopedia", "Shopee", "GSM"];

export default function Home() {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-4rem)] flex flex-col justify-center py-14 md:py-20 px-6 md:px-12 lg:px-20 relative overflow-hidden">

        {/* Background glow — top left */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(100,255,218,0.07) 0%, transparent 70%)" }}
        />

        <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left ─────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Role badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-mint shrink-0" />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-foreground/60">
                Lead Country Product Manager
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-black leading-[1.05] tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "var(--white)" }}
            >
              I lead{" "}
              <span style={{ color: "var(--mint)" }}>products</span>
              {" "}from idea to impact.
            </h1>

            {/* Bio */}
            <p
              className="text-[0.93rem] leading-[1.75] mb-10 max-w-[520px]"
              style={{ color: "var(--slate)" }}
            >
              I have spent the last 6 years working across electric mobility, e-commerce logistics,
              fulfillment, and ed-tech, taking complex business needs and building them into simple,
              scalable digital tools.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link href="/resume">
                <button className="bg-white text-navy font-bold text-[0.88rem] px-8 py-3 rounded-full hover:bg-white/90 transition-colors duration-200 active:scale-[0.97]">
                  View Résumé
                </button>
              </Link>
              <Link href="/contact">
                <button className="border border-foreground/25 text-foreground text-[0.88rem] px-8 py-3 rounded-full hover:bg-white/5 transition-colors duration-200 active:scale-[0.97]">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>

          {/* ── Right — Profile card ──────────────────────────── */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div
              className="rounded-2xl border border-white/10 p-6 relative overflow-hidden"
              style={{ background: "var(--light-navy)" }}
            >
              {/* Card glow — top right */}
              <div
                className="absolute -top-10 -right-10 w-56 h-56 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(100,255,218,0.12) 0%, transparent 70%)" }}
              />

              {/* Profile row */}
              <div className="flex items-center gap-3 mb-5 relative">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-mint/30 shrink-0">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 20%" }}
                  />
                </div>
                <div>
                  <p className="font-bold text-[0.95rem]" style={{ color: "var(--white)" }}>
                    {profile.name}
                  </p>
                  <p className="text-[0.75rem] text-muted-foreground">Jakarta, Indonesia</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
                    <span className="text-[0.7rem] text-mint">Open to work</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/10 mb-5" />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { value: "6+", label: "Years experience" },
                  { value: "4",  label: "Industries led"   },
                ].map(({ value, label }) => (
                  <div key={label} className="rounded-xl p-4" style={{ background: "var(--lightest-navy)" }}>
                    <p className="font-black text-2xl mb-0.5" style={{ color: "var(--white)" }}>{value}</p>
                    <p className="text-[0.72rem] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              {/* Sectors */}
              <div className="mb-5">
                <p className="text-[0.6rem] font-mono uppercase tracking-[0.15em] text-muted-foreground/50 mb-2.5">
                  Sectors
                </p>
                <div className="flex flex-wrap gap-2">
                  {sectors.map((s, i) => (
                    <span
                      key={s}
                      className={`px-3 py-1 rounded-full text-[0.72rem] font-medium border ${
                        i === 0
                          ? "border-mint/50 text-mint"
                          : "border-white/15 text-foreground/60"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Career path */}
              <div>
                <p className="text-[0.6rem] font-mono uppercase tracking-[0.15em] text-muted-foreground/50 mb-2.5">
                  Career Path
                </p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {careerPath.map((co, i) => (
                    <span key={co} className="flex items-center gap-1.5">
                      <span
                        className="text-[0.8rem]"
                        style={{ color: co === "GSM" ? "var(--mint)" : "var(--light-slate)" }}
                      >
                        {co}
                      </span>
                      {i < careerPath.length - 1 && (
                        <span className="text-foreground/25 text-[0.8rem]">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
