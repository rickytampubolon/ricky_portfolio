import { useRef, useState } from "react";
import Layout from "../components/Layout";
import { ChevronDown, Download } from "lucide-react";

/* ── tokens ─────────────────────────────────────────────────── */
const sectionHead = "font-black tracking-[-0.03em] text-[#1A1A1A] dark:text-foreground";
const cardBorder  = "border border-[#E0E0E0] dark:border-border";
const cardBase    = `bg-white dark:bg-card rounded-2xl shadow-sm ${cardBorder}`;
const tagPill     = "inline-flex items-center px-3 py-1.5 rounded-full bg-[#EFEFEF] dark:bg-muted text-[0.73rem] text-[#4A4A4A] dark:text-muted-foreground font-medium";
const btnPrimary  = "inline-flex items-center justify-center gap-2 bg-[#007BFF] text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-[0.04em] hover:bg-[#0056CC] transition-all duration-200 shadow-[0_4px_14px_rgba(0,123,255,0.28)] hover:-translate-y-px active:scale-[0.97]";

/* ── Data ────────────────────────────────────────────────────── */
const experiences = [
  {
    id: 1,
    title: "Lead Country Product Manager - ID Market",
    company: "GSM - Xanh SM",
    companyImage:
      "https://media.licdn.com/dms/image/v2/D560BAQG5Xqveq4buhg/company-logo_200_200/company-logo_200_200/0/1731636708850/greensmartmobility_logo?e=1773273600&v=beta&t=Q6qJwyL1Q3ofHqnlzuetOUmPcP83yX7TJbxOh5apik4",
    period: "2025 – Present",
    current: true,
    highlights: [
      "Lead end-to-end product strategy and execution for Xanh SM Indonesia, defining the national roadmap aligned with regional priorities and local market needs.",
      "Oversee development of customer apps, driver flows, corporate solutions, and internal operational systems across engineering, design, operations, and data teams.",
      "Act as primary liaison between Indonesia leadership and global product organization to align priorities, timelines, and long-term direction.",
      "Drive market localization by adapting core product features to local user behavior and regulatory requirements.",
      "Analyze operational and behavioral data to identify performance gaps and optimize user journeys for drivers and passengers.",
    ],
  },
  {
    id: 2,
    title: "Product Manager – Performance Evaluation & Data Integration",
    company: "INA Digital Edu – Ministry of Primary and Secondary Education",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/cJhNVtPdbOHZIgCZ.png",
    period: "2024 – 2025",
    current: false,
    highlights: [
      "Led development of national-scale performance management tools and data integration systems across Indonesia's education sector.",
      "Defined product vision and roadmap, aligning platform development with ministry priorities for 500,000+ schools and millions of educators.",
      "Drove product adoption by organizing training sessions and providing ongoing support to educational institutions nationwide.",
      "Collaborated with internal teams, regional education offices, and external partners to integrate field feedback into system improvements.",
    ],
  },
  {
    id: 3,
    title: "Senior Associate, System Product Lead – SPX Express",
    company: "Shopee",
    companyImage:
      "https://media.licdn.com/dms/image/v2/C560BAQE0iX_dgdH7nA/company-logo_200_200/company-logo_200_200/0/1672279162763/shopee_logo?e=1773273600&v=beta&t=jlKIMPDqPZbW-4BSR5HmYJVM6SlcapRqyMCtSCGl768",
    period: "2024",
    current: false,
    highlights: [
      "Led a team maintaining and enhancing the Fleet Management System across First, Middle, and Last Mile operations.",
      "Managed system enhancement planning, tracking, and delivery while handling troubleshooting and cross-team SLA coordination.",
      "Authored Functional Requirement Specifications and Business Requirement Documents and led UAT sessions.",
      "Developed new system features that improved operational efficiency across multiple logistics functions.",
    ],
  },
  {
    id: 4,
    title: "Product Manager II – Fulfillment",
    company: "Tokopedia & GoTo Logistics",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/ZYnBvsLmQkohgFkj.png",
    period: "2022 – 2024",
    current: false,
    highlights: [
      "Directed the Fulfillment team to reduce turnaround time and improve service levels across the complete product development lifecycle.",
      "Led Warehouse Management System enhancements, driving improvements in productivity, data accuracy, and process standardization.",
      "Developed long-term WMS strategy aligned with business objectives and evolving market conditions.",
      "Oversaw integration between Tokopedia Seller Platform and WMS to ensure seamless, real-time data flow.",
    ],
  },
  {
    id: 5,
    title: "Quality Engineer – Accommodation",
    company: "Traveloka",
    companyImage:
      "https://media.licdn.com/dms/image/v2/D560BAQGe_izwxvj_SQ/company-logo_200_200/company-logo_200_200/0/1700635813325/traveloka_logo?e=1773273600&v=beta&t=bOObxNgTa_cE27Qpaljq9RoLoVxqtvAUdWwgbjbQdiU",
    period: "2020 – 2022",
    current: false,
    highlights: [
      "Conducted comprehensive testing across Android, iOS, Web, and mobile web platforms for the Accommodation product team.",
      "Led weekly Web release processes ensuring smooth deployments and high platform stability.",
      "Maintained automation frameworks using Selenium, Java, and TestNG; performed API testing with Postman.",
    ],
  },
  {
    id: 6,
    title: "QA Engineer – Taxi Group",
    company: "Ice House",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/hLmBFNBFYNwCqgOT.png",
    period: "2019 – 2020",
    current: false,
    highlights: [
      "Contributed to MyBluebird application with extensive functional and integration testing across Android, Web, and API.",
      "Created structured test cases in TestRail significantly improving test coverage.",
      "Maintained automation scripts using Postman and Katalon Studio.",
    ],
  },
];

const education = [
  {
    degree: "Master of Business Administration",
    school: "Bandung Institute of Technology (ITB)",
    schoolImage:
      "https://media.licdn.com/dms/image/v2/C560BAQGJoYkUiQpUKA/company-logo_200_200/company-logo_200_200/0/1630672186443/itb_logo?e=1773273600&v=beta&t=ofyRWEblbh2qjZR2HYOofN8zQ-M_gy2yhiVMyS5J334",
    date: "Expected Sep 2026",
    detail: "SBM ITB · Bandung, Indonesia",
  },
  {
    degree: "Bachelor of Engineering – Informatics",
    school: "Del Institute of Technology (IT Del)",
    schoolImage:
      "https://media.licdn.com/dms/image/v2/C560BAQESCZFZZqVyng/company-logo_200_200/company-logo_200_200/0/1631389462084?e=1773273600&v=beta&t=jNYjv_W6atTEERBs7tTk78Yhl1xnfkRZGPXuT4rcyLY",
    date: "Sep 2019",
    detail: "Laguboti, North Sumatra, Indonesia",
  },
];

const skills: Record<string, string[]> = {
  "Product Management": ["Product Strategy","Roadmapping","Backlog Management","User Research","Product Metrics","Go to Market Strategy"],
  "Leadership":         ["Cross Functional Leadership","Stakeholder Management","Executive Communication","Decision Making","Change Management","Negotiation"],
  "Technical":          ["SDLC","Data Analysis","API Knowledge","A/B Testing","Release Management","SQL"],
  "Methodologies & Tools": ["Agile","Scrum","Jira","Confluence","Figma","Postman"],
};

export default function Resume() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <Layout>
      <div className="min-h-[calc(100vh-3.5rem)]">

        {/* ── Page header banner ─────────────────────────────── */}
        <div className="bg-[#F5EDE5] dark:bg-muted/20 border-b border-[#E0E0E0] dark:border-border">
          <div className="container py-12 md:py-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#007BFF] dark:text-accent mb-2">
                  Ricky Halomoan
                </p>
                <h1
                  className={`${sectionHead} leading-[0.92]`}
                  style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
                >
                  Resume
                </h1>
                <p className="mt-3 text-[0.9rem] text-[#4A4A4A]/70 dark:text-muted-foreground max-w-[48ch]">
                  Senior Product Manager with 6+ years driving digital products in logistics, mobility, and education.
                </p>
              </div>
              <a
                href="#"
                className={btnPrimary}
                title="Download PDF (replace with actual resume PDF link)"
              >
                <Download size={14} />
                Download PDF
              </a>
            </div>
          </div>
        </div>

        <div className="container py-14 md:py-20">

          {/* ── Experience ─────────────────────────────────────── */}
          <section className="mb-14 md:mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-[6px] h-[6px] bg-[#007BFF] rounded-[1px] shrink-0" />
              <h2 className={`${sectionHead} text-2xl md:text-3xl`}>Experience</h2>
            </div>

            <div className="space-y-3">
              {experiences.map((exp) => {
                const isOpen = openId === exp.id;
                return (
                  <div key={exp.id} className={`${cardBase} overflow-hidden transition-all duration-300`}>
                    <button
                      onClick={() => toggle(exp.id)}
                      className="w-full flex items-start gap-4 p-5 text-left hover:bg-[#FAFAFA] dark:hover:bg-card/70 transition-colors"
                    >
                      {/* Logo */}
                      <div className="w-9 h-9 rounded-xl bg-white dark:bg-card border border-[#E0E0E0] dark:border-border overflow-hidden flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <img src={exp.companyImage} alt={exp.company} className="w-6 h-6 object-contain" loading="lazy" />
                      </div>

                      {/* Title + company */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="font-bold text-[0.95rem] text-[#1A1A1A] dark:text-foreground leading-snug">
                            {exp.title}
                          </span>
                          {exp.current && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.6rem] font-bold uppercase tracking-wide bg-[#007BFF]/10 text-[#007BFF] dark:text-accent">
                              <span className="w-1 h-1 rounded-full bg-[#007BFF] animate-pulse" />
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-[0.82rem] text-[#666666] dark:text-muted-foreground">{exp.company}</p>
                      </div>

                      {/* Period + chevron */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="hidden sm:block text-[0.7rem] font-bold uppercase tracking-[0.08em] text-[#666666]/60 dark:text-muted-foreground/60">
                          {exp.period}
                        </span>
                        <ChevronDown
                          size={14}
                          className={`text-[#666666]/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>

                    {/* Expanded bullets */}
                    <div
                      style={{
                        maxHeight: isOpen ? `${exp.highlights.length * 80}px` : "0px",
                        overflow: "hidden",
                        transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-[#F0F0F0] dark:border-border/40 bg-[#FAFAFA]/60 dark:bg-card/30">
                        <p className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#666666]/50 dark:text-muted-foreground/50 mb-2.5 mt-2">
                          {exp.period}
                        </p>
                        <ul className="space-y-1.5">
                          {exp.highlights.map((h, i) => (
                            <li key={i} className="flex gap-2 text-[0.84rem] text-[#4A4A4A] dark:text-muted-foreground leading-relaxed">
                              <span className="text-[#007BFF] dark:text-accent mt-0.5 shrink-0 font-bold">·</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Education ──────────────────────────────────────── */}
          <section className="mb-14 md:mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-[6px] h-[6px] bg-[#007BFF] rounded-[1px] shrink-0" />
              <h2 className={`${sectionHead} text-2xl md:text-3xl`}>Education</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {education.map((edu) => (
                <div key={edu.degree} className={`${cardBase} p-6 flex gap-4 items-start`}>
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-card border border-[#E0E0E0] dark:border-border overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                    <img src={edu.schoolImage} alt={edu.school} className="w-7 h-7 object-contain" loading="lazy" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[0.92rem] text-[#1A1A1A] dark:text-foreground leading-snug mb-0.5">{edu.degree}</p>
                    <p className="text-[0.82rem] text-[#666666] dark:text-muted-foreground mb-1">{edu.school}</p>
                    <p className="text-[0.73rem] text-[#666666]/55 dark:text-muted-foreground/55">{edu.detail}</p>
                    <span className="mt-2 inline-block text-[0.63rem] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full bg-[#007BFF]/8 dark:bg-[#007BFF]/10 text-[#007BFF] dark:text-accent border border-[#007BFF]/15">
                      {edu.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Skills ─────────────────────────────────────────── */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-[6px] h-[6px] bg-[#007BFF] rounded-[1px] shrink-0" />
              <h2 className={`${sectionHead} text-2xl md:text-3xl`}>Skills</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className={`${cardBase} p-6`}>
                  <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#007BFF]/70 dark:text-accent/70 mb-4">
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
      </div>
    </Layout>
  );
}
