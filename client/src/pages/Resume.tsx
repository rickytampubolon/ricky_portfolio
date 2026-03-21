import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { ChevronDown, ArrowUp } from "lucide-react";

/* ── Company logo with initial fallback ──────────────────────── */
function CompanyLogo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const initial = alt.trim().charAt(0).toUpperCase();
  if (failed) {
    return (
      <span className={`flex items-center justify-center font-bold text-[#888888] dark:text-[#666666] text-[0.85rem] select-none ${className ?? ""}`}>
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

/* ── Shared design tokens — monochrome palette ───────────────── */
const sectionHead  = "font-black tracking-[-0.025em] text-[#121212] dark:text-[#E5E5E5]";
// Card: white on light / dark charcoal on dark, 1px border dividers
const cardBase     = "bg-[#FFFFFF] dark:bg-[#161616] border border-[#EEEEEE] dark:border-[#252525]";
// Pill tags: grey border-only, no fill
const tagPill      = "inline-flex items-center px-3 py-1.5 border border-[#DEDEDE] dark:border-[#2A2A2A] text-[0.68rem] text-[#888888] dark:text-[#666666] font-medium tracking-[0.03em] rounded-sm uppercase";
const sectionAccent = "flex items-center gap-2.5 mb-6";
const accentDot    = "w-[5px] h-[5px] bg-[#121212] dark:bg-[#E5E5E5] shrink-0";

/* ── Data ────────────────────────────────────────────────────── */
const fullTimeExp = [
  {
    id: 1,
    title: "Lead Country Product Manager – ID Market",
    company: "GSM – Xanh SM",
    companyImage: "https://www.google.com/s2/favicons?domain=xanhsm.com&sz=256",
    period: "2025 – Present",
    current: true,
    highlights: [
      "Led Indonesia market entry and growth for Xanh SM's digital ecosystem, building a localized product roadmap that supported operational scale and service quality for drivers and riders nationwide.",
      "Owned end-to-end product strategy and the national roadmap, balancing aggressive growth targets with local operational realities, user behavior, and priorities from global headquarters.",
      "Oversaw the full product ecosystem including driver and rider apps, corporate dashboard, and internal operational tools, using behavioral data and performance metrics to drive reliability improvements.",
      "Drove market localization across pricing logic, payment flows with local providers, loyalty program design, and fleet management customization for Indonesian operational patterns.",
      "Served as the primary bridge between Indonesia leadership and global product teams, aligning priorities, coordinating pilots, and managing multi-city rollout phases.",
    ],
  },
  {
    id: 2,
    title: "Product Manager – Performance Evaluation & Data Integration",
    company: "INA Digital Edu – Ministry of Primary and Secondary Education",
    companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/cJhNVtPdbOHZIgCZ.png",
    period: "2024 – 2025",
    current: false,
    highlights: [
      "Led the development of a national performance management and data integration platform, improving accountability tracking for millions of educators and students across Indonesia's primary and secondary education system.",
      "Defined product vision and roadmap in line with ministry priorities and national education standards, incorporating input from regional offices, school administrators, and education partners across the archipelago.",
      "Managed the full delivery lifecycle from user research through to nationwide release, coordinating across engineering, data, and UX teams to ship a stable, compliant, and user-centered platform.",
      "Supported adoption through hands-on training and ongoing assistance for thousands of educational institutions, using usage data and feedback to continuously improve the product.",
      "Built measurement frameworks to evaluate tool effectiveness by region, using behavioral patterns and institutional performance data to guide iterative improvements.",
    ],
  },
  {
    id: 3,
    title: "Senior Associate, System Product Lead – SPX Express",
    company: "Shopee",
    companyImage: "https://www.google.com/s2/favicons?domain=shopee.co.id&sz=256",
    period: "2024",
    current: false,
    highlights: [
      "Led strategic improvements to the Fleet Management System across First Mile, Middle Mile, and Last Mile operations, increasing throughput and cutting delivery times across millions of shipments.",
      "Managed a cross-functional team responsible for maintaining and evolving the core FMS, staying closely aligned with daily operational needs through collaboration with Business, Finance, Strategy, BI, and Operations.",
      "Drove system enhancement planning and delivery to strengthen process sustainability, while handling critical troubleshooting and coordinating cross-team responses within strict SLAs.",
      "Developed new system features that standardized workflows across multiple logistics functions, using data analysis to surface bottlenecks and drive meaningful solutions.",
      "Produced comprehensive Functional Specification and Business Requirement documents, and led UAT sessions with operations teams to ensure consistent, high-quality releases.",
    ],
  },
  {
    id: 4,
    title: "Product Manager II – Fulfillment",
    company: "Tokopedia & GoTo Logistics",
    companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/ZYnBvsLmQkohgFkj.png",
    period: "2022 – 2024",
    current: false,
    highlights: [
      "Drove measurable improvements in Dilayani Tokopedia fulfillment operations through strategic WMS enhancements that reduced turnaround time and raised service levels across multiple warehouses.",
      "Led the Fulfillment team in improving WMS productivity, data accuracy, and process standardization across warehouse operations handling thousands of daily orders.",
      "Managed the critical integration between Tokopedia's Seller Platform and WMS, ensuring accurate, real-time data flow for inventory tracking and order management.",
      "Strengthened Inbound and Integration teams through improved cross-functional collaboration and cleaner operational handovers between warehouse and product development.",
      "Built a long-term, data-driven WMS improvement strategy, refining product features continuously based on operator feedback and evolving market needs.",
    ],
  },
  {
    id: 5,
    title: "Quality Engineer – Accommodation",
    company: "Traveloka",
    companyImage: "/traveloka-logo.png",
    period: "2020 – 2022",
    current: false,
    highlights: [
      "Built comprehensive QA practices for the Accommodation product team, implementing testing strategies across Android, iOS, and Web that raised feature reliability for millions of travelers.",
      "Worked closely with engineers, PMs, and designers to catch and resolve critical issues early in the development cycle, well before they reached users.",
      "Participated in all Agile ceremonies including sprint planning, grooming, and retrospectives, and led weekly Web release processes to ensure smooth, low-disruption deployments.",
      "Maintained long-term product stability through structured test cases that broadened coverage across critical user journeys and supported automation scripts using Selenium and Java.",
      "Performed extensive backend API testing with Postman to verify data consistency and system reliability across accommodation booking flows and inventory management.",
    ],
  },
  {
    id: 6,
    title: "QA Engineer – Taxi Group",
    company: "Ice House",
    companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/hLmBFNBFYNwCqgOT.png",
    period: "2019 – 2020",
    current: false,
    highlights: [
      "Ran comprehensive functional and integration testing for the MyBluebird application across Android, Web, and API platforms, ensuring a consistent experience for millions of transportation users.",
      "Validated complex end-to-end user flows across multiple release cycles, monitoring feature behavior and maintaining consistency between driver and passenger applications.",
      "Worked closely with business analysts, product owners, and engineers to sharpen requirements, refine user flows, and resolve critical issues found during testing.",
      "Built detailed, structured test cases in TestRail to maximize coverage and maintained automation scripts using Postman and Katalon Studio.",
      "Participated in all sprint ceremonies and worked alongside development teams to address defects, performance gaps, and regression issues affecting user experience and system reliability.",
    ],
  },
];

const partTimeAndInternships = [
  {
    id: "pt-1",
    title: "QA Engineer – Part-time",
    company: "SehatQ",
    companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/iWSWOgSUpfIhugUD.png",
    period: "2022 – 2023",
    type: "Part-time",
    highlights: [
      "Ran structured manual, regression, and exploratory testing across Android, iOS, web, and mobile web for the eCommerce and Merchant squad, ensuring stable releases for healthcare product transactions.",
      "Managed test cases and sprint tracking in Xray and JIRA, monitoring bug status throughout development cycles and keeping stakeholders informed on priorities.",
      "Partnered with developers and product owners to align on acceptance criteria and maintain consistent product quality across features and releases.",
    ],
  },
  {
    id: "pt-2",
    title: "QA Engineer – Part-time",
    company: "SiCepat",
    companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/vtUAAIQhTvYAhdQP.png",
    period: "2021 – 2022",
    type: "Part-time",
    highlights: [
      "Ran integration, regression, and API testing across Android and web for the CMS and Integration team, ensuring reliable performance for logistics management systems.",
      "Built structured test cases in TestRail and validated backend functionality using Postman to verify data consistency across systems.",
      "Worked with developers and product owners to align on test scope and deliver stable releases for critical logistics features.",
    ],
  },
  {
    id: "int-1",
    title: "QA Engineer Intern",
    company: "GoTo Group (Moka)",
    companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/fMzZvBYHbNOGcXlH.png",
    period: "2019",
    type: "Internship",
    highlights: [
      "Supported end-to-end testing and QA activities for the Moka POS Backoffice Inventory team, contributing to smooth operations for merchant inventory management.",
      "Executed structured test scenarios and validated critical inventory workflows including stock updates, product categorization, and order synchronization.",
      "Worked with engineers to identify and resolve issues during development, helping improve overall system reliability.",
    ],
  },
  {
    id: "int-2",
    title: "QA Engineer Intern",
    company: "Grab",
    companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/bUAqVpvhsLeEvRro.png",
    period: "2019",
    type: "Internship",
    highlights: [
      "Automated API testing for payment systems using Postman and built UI automation with Robot Framework and Appium, improving testing coverage for critical payment flows.",
      "Identified defects through systematic validation of payment transactions, refund processes, and wallet integrations across the application.",
      "Partnered with developers to resolve issues and strengthen system reliability before production releases.",
    ],
  },
  {
    id: "int-3",
    title: "QA Engineer Intern",
    company: "DANA Indonesia",
    companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/JlXCSsTrCXQVouBa.png",
    period: "2018",
    type: "Internship",
    highlights: [
      "Supported BukaDANA integration and KYC initiatives by validating key user journeys including registration, identity verification, and account setup.",
      "Worked with cross-functional teams to maintain consistent payment and identity verification workflows across the application.",
      "Identified and documented defects during testing cycles, collaborating with developers to resolve issues before release and ensure compliance with financial regulations.",
    ],
  },
];

const education = [
  {
    degree: "Master of Business Administration",
    school: "Bandung Institute of Technology (ITB)",
    schoolImage: "https://www.google.com/s2/favicons?domain=itb.ac.id&sz=256",
    date: "Expected Sep 2026",
    detail: "SBM ITB · Bandung, Indonesia",
  },
  {
    degree: "Bachelor of Informatics",
    school: "Del Institute of Technology (IT Del)",
    schoolImage: "https://instagram.fcgk53-1.fna.fbcdn.net/v/t51.2885-19/280229359_535565961429651_6162074952034670710_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby43OTQuYzIifQ&_nc_ht=instagram.fcgk53-1.fna.fbcdn.net&_nc_cat=103&_nc_oc=Q6cZ2gEcvt2qISB8AnFd0BtzLyGmIof-Y8I9MqJDnnZcK11Ska8_FWQzmfBh98Pa5IJbLQ0&_nc_ohc=U5mZj60ivhYQ7kNvwH2cO-F&_nc_gid=MUTHnFdhQaCjgvRYMaCe9w&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfxxfILSR7fdC_5gG6Myi35uZHj16ZhyzHGB3VqGs7TxBw&oe=69C364A9&_nc_sid=7a9f4b",
    date: "Sep 2019",
    detail: "Laguboti, North Sumatra, Indonesia",
  },
];

const skills: Record<string, string[]> = {
  "Product Management":    ["Product Strategy","Roadmapping","Backlog Management","User Research","Product Metrics","Go-to-Market Strategy"],
  "Leadership":            ["Cross-Functional Leadership","Stakeholder Management","Executive Communication","Decision Making","Change Management","Negotiation"],
  "Technical":             ["SDLC","Data Analysis","API Knowledge","A/B Testing","Release Management","SQL"],
  "Methodologies & Tools": ["Agile","Scrum","Jira","Confluence","Figma","Postman"],
};

/* ── Collapsible experience row ─────────────────────────────── */
function ExpRow({ item, isOpen, onToggle }: {
  item: typeof fullTimeExp[number] | typeof partTimeAndInternships[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const typeBadge = "type" in item ? item.type : null;
  const isCurrent = "current" in item && item.current;

  return (
    <div className={`${cardBase} overflow-hidden`}>
      {/* Row header — click to expand */}
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-3 p-4 sm:p-5 text-left hover:bg-[#FAFAFA] dark:hover:bg-[#1A1A1A] transition-colors duration-150"
      >
        {/* Company logo */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#F5F5F5] dark:bg-[#222222] border border-[#EEEEEE] dark:border-[#2A2A2A] overflow-hidden flex items-center justify-center shrink-0 mt-0.5">
          <CompanyLogo src={item.companyImage} alt={item.company} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
        </div>

        {/* Title + company name */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap mb-0.5">
            <span className="font-bold text-[0.85rem] sm:text-[0.9rem] text-[#121212] dark:text-[#E5E5E5] leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
              {item.title}
            </span>
            {isCurrent && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wide bg-[#121212]/7 dark:bg-[#E5E5E5]/8 text-[#121212] dark:text-[#E5E5E5]">
                <span className="w-1 h-1 rounded-full bg-[#121212] dark:bg-[#E5E5E5] animate-pulse" />
                Current
              </span>
            )}
            {typeBadge && (
              <span className="px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wide border border-[#DEDEDE] dark:border-[#2A2A2A] text-[#888888] dark:text-[#666666]">
                {typeBadge}
              </span>
            )}
          </div>
          <p className="text-[0.78rem] text-[#999999] dark:text-[#555555]">{item.company}</p>
        </div>

        {/* Period + chevron */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="hidden sm:block text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#BBBBBB] dark:text-[#444444]">
            {item.period}
          </span>
          <ChevronDown
            size={14}
            strokeWidth={2}
            className={`text-[#CCCCCC] dark:text-[#404040] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Expanded highlights — smooth height animation */}
      <div
        style={{
          maxHeight: isOpen ? `${item.highlights.length * 80}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* 1px top divider inside the expanded area */}
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 border-t border-[#F0F0F0] dark:border-[#222222] bg-[#FAFAFA] dark:bg-[#111111]">
          {/* Period shown on mobile (hidden in header row) */}
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.1em] text-[#CCCCCC] dark:text-[#444] mb-2 mt-2 sm:hidden">
            {item.period}
          </p>
          <ul className="space-y-1.5">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-[0.8rem] sm:text-[0.83rem] text-[#666666] dark:text-[#777777] leading-relaxed">
                {/* 1px vertical accent instead of bullet dot */}
                <span className="w-[1px] bg-[#DDDDDD] dark:bg-[#333333] shrink-0 mt-1 self-stretch" />
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
      <div>

        {/* ── Banner — light grey / dark charcoal strip ─────────── */}
        <div className="bg-[#F5F5F5] dark:bg-[#1A1A1A] border-b border-[#EEEEEE] dark:border-[#252525]">
          <div className="container py-8 md:py-14">
            <h1
              className="font-black tracking-[-0.03em] leading-none text-[#121212] dark:text-[#E5E5E5]"
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}
            >
              Resume
            </h1>
            <p className="mt-3 text-[0.8rem] text-[#888888] dark:text-[#666666] tracking-[0.03em]">
              Lead Product Manager · 6+ years across logistics, mobility, and education.
            </p>
          </div>
        </div>

        <div className="container py-8 md:py-16">

          {/* ── Experience ──────────────────────────────────────── */}
          <section className="mb-10 md:mb-16">
            <div className={sectionAccent}>
              <div className={accentDot} />
              <h2 className={`${sectionHead} text-xl md:text-[1.65rem]`}>Experience</h2>
            </div>
            {/* 1px top border above the list */}
            <div className="border-t border-[#EEEEEE] dark:border-[#252525] pt-4 space-y-2">
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

          {/* ── Internships & Part-time ──────────────────────────── */}
          <section className="mb-10 md:mb-16">
            <div className={sectionAccent}>
              <div className={accentDot} />
              <h2 className={`${sectionHead} text-xl md:text-[1.65rem]`}>Internships &amp; Part-time</h2>
            </div>
            <div className="border-t border-[#EEEEEE] dark:border-[#252525] pt-4 space-y-2">
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

          {/* ── Education ───────────────────────────────────────── */}
          <section className="mb-10 md:mb-16">
            <div className={sectionAccent}>
              <div className={accentDot} />
              <h2 className={`${sectionHead} text-xl md:text-[1.65rem]`}>Education</h2>
            </div>
            <div className="border-t border-[#EEEEEE] dark:border-[#252525] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {education.map((edu) => (
                <div key={edu.degree} className={`${cardBase} p-5 flex gap-4 items-start`}>
                  <div className="w-10 h-10 bg-[#F5F5F5] dark:bg-[#222222] border border-[#EEEEEE] dark:border-[#2A2A2A] overflow-hidden flex items-center justify-center shrink-0">
                    <CompanyLogo src={edu.schoolImage} alt={edu.school} className="w-7 h-7 object-contain" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[0.9rem] text-[#121212] dark:text-[#E5E5E5] leading-snug mb-0.5" style={{ fontFamily: "var(--font-heading)" }}>
                      {edu.degree}
                    </p>
                    <p className="text-[0.78rem] text-[#999999] dark:text-[#555555] mb-1">{edu.school}</p>
                    <p className="text-[0.7rem] text-[#BBBBBB] dark:text-[#444444]">{edu.detail}</p>
                    <span className="mt-2.5 inline-block text-[0.6rem] font-bold uppercase tracking-[0.1em] px-2.5 py-1 border border-[#DEDEDE] dark:border-[#2A2A2A] text-[#888888] dark:text-[#666666]">
                      {edu.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Skills ──────────────────────────────────────────── */}
          <section>
            <div className={sectionAccent}>
              <div className={accentDot} />
              <h2 className={`${sectionHead} text-xl md:text-[1.65rem]`}>Skills</h2>
            </div>
            <div className="border-t border-[#EEEEEE] dark:border-[#252525] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className={`${cardBase} p-5`}>
                  <h3
                    className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#999999] dark:text-[#555555] mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
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

      {/* ── Scroll-to-top button ──────────────────────────────── */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-[#121212] dark:bg-[#E5E5E5] text-white dark:text-[#0A0A0A] shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-all duration-300 hover:scale-110 active:scale-95 ${
          showScrollTop ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-3"
        }`}
      >
        <ArrowUp size={15} strokeWidth={2} />
      </button>
    </Layout>
  );
}
