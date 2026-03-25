import { useState } from "react";
import Layout from "../components/Layout";
import { caseStudies, type CaseStudy } from "../data/workData";

/* ── Shared tokens ───────────────────────────────────────────── */
const sectionHead   = "font-black tracking-[-0.025em] text-foreground";
const cardBase      = "bg-card rounded-2xl border border-border shadow-sm";
const tagPill       = "inline-flex items-center px-3 py-1.5 rounded-full bg-secondary text-[0.73rem] text-subtle font-medium";
const sectionAccent = "flex items-center gap-2.5 mb-7";
const accentDot     = "w-[6px] h-[6px] bg-primary rounded-[1px] shrink-0";

/* ── Company logo with initial fallback ──────────────────────── */
function CompanyLogo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const initial = alt.trim().charAt(0).toUpperCase();
  if (failed) {
    return (
      <span className={`flex items-center justify-center font-bold text-muted-foreground text-[0.85rem] select-none ${className ?? ""}`}>
        {initial}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      style={{ filter: "grayscale(100%)" }}
      onError={() => setFailed(true)}
    />
  );
}

/* ── Case study card ─────────────────────────────────────────── */
function CaseStudyCard({ item }: { item: CaseStudy }) {
  return (
    <div className={`${cardBase} flex flex-col overflow-hidden`}>

      {/* Card header */}
      <div className="p-5 sm:p-6 border-b border-border">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-card border border-border overflow-hidden flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <CompanyLogo src={item.companyImage} alt={item.company} className="w-6 h-6 object-contain" />
          </div>
          <div className="min-w-0">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-muted-foreground leading-none mb-1">
              {item.company}
            </p>
            <p className="text-[0.72rem] text-muted-foreground/60">
              {item.role} · {item.period}
            </p>
          </div>
        </div>

        <h2
          className={`${sectionHead} text-[0.95rem] sm:text-[1.05rem] leading-snug mb-3`}
        >
          {item.title}
        </h2>

        {/* Domain tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.domains.map((d) => (
            <span key={d} className={tagPill}>{d}</span>
          ))}
        </div>
      </div>

      {/* Summary + outcomes */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <p className="text-[0.85rem] text-subtle leading-relaxed mb-5">
          {item.summary}
        </p>

        <ul className="space-y-2 mb-6 flex-1">
          {item.outcomes.map((o, i) => (
            <li key={i} className="flex gap-2 text-[0.8rem] sm:text-[0.84rem] text-subtle leading-relaxed">
              <span className="text-muted-foreground/50 mt-0.5 shrink-0 font-bold">·</span>
              <span>{o}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {item.available ? (
          <button className="w-full flex items-center justify-center gap-2 border border-primary text-foreground rounded-full py-2.5 text-[0.75rem] font-bold uppercase tracking-[0.1em] hover:bg-primary hover:text-primary-foreground transition-all duration-200">
            View Case Study
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 border border-border text-muted-foreground/40 rounded-full py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.1em] select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            Case Study Coming Soon
          </div>
        )}
      </div>

    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function Work() {
  return (
    <Layout>
      <div>

        {/* ── Banner ─────────────────────────────────────────── */}
        <div className="bg-surface border-b border-border">
          <div className="container py-8 md:py-14">
            <h1
              className="font-black tracking-[-0.03em] leading-none text-foreground"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}
            >
              Work
            </h1>
            <p className="mt-2 text-[0.82rem] sm:text-[0.88rem] text-muted-foreground">
              Selected product case studies across logistics, mobility, and education.
            </p>
          </div>
        </div>

        <div className="container py-8 md:py-16">

          <div className={sectionAccent}>
            <div className={accentDot} />
            <h2 className={`${sectionHead} text-xl md:text-[1.7rem]`}>Case Studies</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {caseStudies.map((item) => (
              <CaseStudyCard key={item.id} item={item} />
            ))}
          </div>

          <p className="mt-8 text-center text-[0.78rem] text-muted-foreground/60">
            Full case studies with metrics and artefacts are in preparation.
          </p>

        </div>
      </div>
    </Layout>
  );
}
