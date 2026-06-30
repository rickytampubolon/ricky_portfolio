import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { ChevronDown, ArrowUp } from "lucide-react";
import { fullTimeExp, partTimeAndInternships, education, skills, type ExperienceItem } from "../data/resumeData";

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

/* ── Section heading ─────────────────────────────────────────── */
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h2 className="font-black tracking-[-0.025em] text-foreground text-xl md:text-[1.7rem]">{title}</h2>
      <div className="flex-1 h-px bg-border ml-2" />
    </div>
  );
}

/* ── Tag pill ────────────────────────────────────────────────── */
const tagPill = "inline-flex items-center px-3 py-1.5 rounded-full bg-secondary text-[0.73rem] text-mint font-mono border border-border";

/* ── Collapsible experience row ─────────────────────────────── */
function ExpRow({ item, isOpen, onToggle }: {
  item: ExperienceItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const typeBadge = "type" in item ? item.type : null;
  const isCurrent = "current" in item && item.current;

  return (
    <div className="apple-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-3 p-4 sm:p-5 text-left hover:bg-secondary/50 transition-colors"
      >
        {/* Logo */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-secondary border border-border overflow-hidden flex items-center justify-center shrink-0 mt-0.5">
          <CompanyLogo src={item.companyImage} alt={item.company} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
        </div>

        {/* Title + company */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap mb-0.5">
            <span className="font-bold text-[0.85rem] sm:text-[0.93rem] text-foreground leading-snug">
              {item.title}
            </span>
            {isCurrent && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.58rem] font-bold uppercase tracking-wide bg-mint-subtle text-mint">
                <span className="w-1 h-1 rounded-full bg-mint animate-pulse" />
                Current
              </span>
            )}
            {typeBadge && (
              <span className="px-2 py-0.5 rounded-full text-[0.58rem] font-bold uppercase tracking-wide bg-secondary text-muted-foreground border border-border">
                {typeBadge}
              </span>
            )}
          </div>
          <p className="text-[0.8rem] text-muted-foreground">{item.company}</p>
        </div>

        {/* Period + chevron */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="hidden sm:block text-[0.68rem] font-mono uppercase tracking-[0.08em] text-muted-foreground/60">
            {item.period}
          </span>
          <ChevronDown
            size={14}
            className={`text-muted-foreground/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Expanded bullets */}
      <div
        style={{
          maxHeight: isOpen ? "2000px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 border-t border-border bg-surface">
          <p className="text-[0.63rem] font-mono uppercase tracking-[0.1em] text-muted-foreground/50 mb-2 mt-2 sm:hidden">
            {item.period}
          </p>
          <ul className="space-y-1.5">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-[0.8rem] sm:text-[0.84rem] text-subtle leading-relaxed">
                <span className="text-mint mt-0.5 shrink-0">▹</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function Resume() {
  const [openId, setOpenId] = useState<string | number | null>(null);
  const toggle = (id: string | number) => setOpenId((p) => (p === id ? null : id));

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const onScroll = () => setShowScrollTop(main.scrollTop > 300);
    main.addEventListener("scroll", onScroll, { passive: true });
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="px-5 md:px-16 lg:px-24 py-10 md:py-20 max-w-4xl mx-auto">

        {/* ── Page intro ─────────────────────────────────────── */}
        <div className="mb-10 md:mb-14">
          <p className="font-mono text-mint text-sm mb-3">02. Resume</p>
          <h1
            className="font-black tracking-[-0.03em] leading-none text-foreground mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Work Experience
          </h1>
          <p className="text-subtle text-[0.88rem] max-w-xl">
            Lead Product Manager · 6+ years across logistics, fulfillment, electric mobility, and digital transformation.
          </p>
        </div>

        {/* ── Experience ─────────────────────────────────────── */}
        <section className="mb-12">
          <SectionHeader title="Experience" />
          <div className="space-y-2.5">
            {fullTimeExp.map((exp) => (
              <ExpRow
                key={exp.id}
                item={exp}
                isOpen={openId === exp.id}
                onToggle={() => toggle(exp.id)}
              />
            ))}
          </div>
        </section>

        {/* ── Internships & Part-time ─────────────────────────── */}
        <section className="mb-12">
          <SectionHeader title="Internships & Part-time" />
          <div className="space-y-2.5">
            {partTimeAndInternships.map((item) => (
              <ExpRow
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>
        </section>

        {/* ── Education ──────────────────────────────────────── */}
        <section className="mb-12">
          <SectionHeader title="Education" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {education.map((edu) => (
              <div key={edu.degree} className="apple-card p-6 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-md bg-secondary border border-border overflow-hidden flex items-center justify-center shrink-0">
                  <CompanyLogo src={edu.schoolImage} alt={edu.school} className="w-7 h-7 object-contain" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[0.92rem] text-foreground leading-snug mb-0.5">
                    {edu.degree}
                  </p>
                  <p className="text-[0.8rem] text-muted-foreground mb-2">{edu.school}</p>
                  <span className="inline-block text-[0.62rem] font-mono uppercase tracking-[0.1em] px-2.5 py-1 rounded border border-mint/30 text-mint/70">
                    {edu.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ─────────────────────────────────────────── */}
        <section>
          <SectionHeader title="Skills" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="apple-card p-6">
                <h3 className="text-[0.66rem] font-mono uppercase tracking-[0.13em] text-mint mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className={tagPill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── Scroll-to-top ──────────────────────────────────────── */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-mint text-mint hover:bg-mint/10 transition-all duration-300 ${
          showScrollTop ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-3"
        }`}
      >
        <ArrowUp size={16} />
      </button>
    </Layout>
  );
}
