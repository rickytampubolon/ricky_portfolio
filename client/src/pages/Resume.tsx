import { useState } from "react";
import Layout from "../components/Layout";
import { ChevronDown, Download } from "lucide-react";

/* ── Shared tokens ───────────────────────────────────────────── */
const sectionHead = "font-black tracking-[-0.025em] text-[#1A1A1A] dark:text-[#E0E0E0]";
const cardBase    = "bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E8E8E8] dark:border-[#2C2C2C] shadow-sm";
const tagPill     = "inline-flex items-center px-3 py-1.5 rounded-full bg-[#F2F2F2] dark:bg-[#2A2A2A] text-[0.73rem] text-[#4A4A4A] dark:text-[#AAAAAA] font-medium";
const btnDL       = "inline-flex items-center gap-2 bg-[#0D7377] text-white px-5 py-2.5 rounded-full text-[0.8rem] font-semibold tracking-[0.04em] hover:bg-[#0A5C60] transition-all duration-200 shadow-[0_4px_12px_rgba(13,115,119,0.25)] hover:-translate-y-px active:scale-[0.97]";
const sectionAccent = "flex items-center gap-2.5 mb-7";
const accentDot   = "w-[6px] h-[6px] bg-[#0D7377] rounded-[1px] shrink-0";

/* ── Data ────────────────────────────────────────────────────── */
const fullTimeExp = [
  {
    id: 1,
    title: "Lead Country Product Manager",
    company: "GSM – Xanh SM",
    companyImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Xanh_SM_logo.svg/200px-Xanh_SM_logo.svg.png",
    period: "2025 – Present",
    current: true,
    highlights: [
      "Led the Indonesian market entry and growth strategy for Xanh SM's digital ecosystem, developing a localized product roadmap that supported operational scalability and service quality for thousands of drivers and riders across the nation.",
      "Managed end-to-end product strategy and execution, defining the national roadmap that balanced aggressive business growth targets with local operational realities, user behaviour, and regional priorities from the global headquarters.",
      "Oversaw development of the full product ecosystem including driver and rider applications, corporate dashboard solutions, and internal operational systems, using behavioural data and performance metrics to identify improvement areas and strengthen service reliability.",
      "Drove market localization initiatives including dynamic pricing logic adjustments, payment flow optimization with local providers, loyalty program design tailored to Indonesian consumers, and fleet management customization for local operational patterns.",
      "Served as primary liaison between Indonesia leadership and global product teams, ensuring alignment on priorities and timelines while coordinating pilot programs and managing national rollout phases across multiple cities.",
    ],
  },
  {
    id: 2,
    title: "Senior Product Manager – Performance Evaluation & Data",
    company: "INA Digital Edu – Ministry of Primary and Secondary Education",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/cJhNVtPdbOHZIgCZ.png",
    period: "2024 – 2025",
    current: false,
    highlights: [
      "Led development of a national performance management and data integration platform that improved accountability tracking for millions of educators and students across Indonesia's primary and secondary education system.",
      "Defined product vision and roadmap aligned with ministry priorities and national education standards, incorporating feedback from regional offices, school administrators, and education partners across the archipelago.",
      "Managed full delivery lifecycle from user research and ideation to testing and nationwide release, coordinating with engineering, data, and UX teams to build a stable, compliant, and user-centered platform.",
      "Supported user adoption through training sessions and continuous assistance for thousands of educational institutions, using usage data and feedback loops to inform product refinements and feature enhancements.",
      "Developed measurement approaches to evaluate tool effectiveness across different regions, guiding iterative improvements based on user behaviour patterns and institutional performance data.",
    ],
  },
  {
    id: 3,
    title: "OPEX Product Lead – Logistic (Shopee Xpress)",
    company: "Shopee",
    companyImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/200px-Shopee_logo.svg.png",
    period: "2024",
    current: false,
    highlights: [
      "Led strategic improvements to the Fleet Management System across First Mile, Middle Mile, and Last Mile operations, enhancing operational throughput and reducing delivery times for millions of shipments.",
      "Managed a team responsible for maintaining and enhancing the core FMS, ensuring alignment with daily operational needs through close collaboration with Business, Finance, Strategy, BI, and Operations teams.",
      "Drove system enhancement planning and delivery to strengthen process sustainability, while handling critical troubleshooting and coordinating cross-team responses to guarantee resolutions within strict SLAs.",
      "Improved operational efficiency by developing new system features that standardized workflows across multiple logistics functions, using data analysis to identify bottlenecks and propose impactful solutions.",
      "Created comprehensive Functional Specification and Business Requirement documents and managed UAT sessions with operations teams to ensure consistent, high-quality feature releases.",
    ],
  },
  {
    id: 4,
    title: "Product Manager – Fulfillment (Dilayani Tokopedia)",
    company: "Tokopedia & GoTo Logistics",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/ZYnBvsLmQkohgFkj.png",
    period: "2022 – 2024",
    current: false,
    highlights: [
      "Drove significant improvements in Dilayani Tokopedia fulfillment operations through strategic Warehouse Management System enhancements that reduced turnaround time and improved service levels across multiple warehouses.",
      "Led the Fulfillment team to achieve higher efficiency by enhancing WMS productivity, data accuracy, and process standardization across all warehouse operations handling thousands of daily orders.",
      "Managed the critical integration between Tokopedia Seller Platform and WMS to ensure accurate, real-time data flow for inventory tracking and order management across the fulfillment network.",
      "Strengthened both Inbound and Integration teams, improving cross-functional collaboration and creating smoother operational handovers between warehouse teams and product development.",
      "Developed long-term, data-driven strategy for WMS improvements, continuously refining product features based on user feedback from warehouse operators and market analysis to support evolving business objectives.",
    ],
  },
  {
    id: 5,
    title: "Quality Engineer – Accommodation",
    company: "Traveloka",
    companyImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Logo_Traveloka.png/200px-Logo_Traveloka.png",
    period: "2020 – 2022",
    current: false,
    highlights: [
      "Established comprehensive quality assurance practices for the Accommodation product team, implementing testing strategies across Android, iOS, and Web that significantly improved feature reliability and user experience for millions of travelers.",
      "Conducted rigorous platform testing alongside software engineers, product managers, and designers to identify and resolve critical issues early in the development cycle before they impacted users.",
      "Participated actively in all Agile ceremonies including sprint planning, grooming, and retrospectives while leading weekly Web release processes to ensure smooth deployments with minimal disruption.",
      "Maintained long-term product stability by preparing structured test cases that improved coverage across critical user journeys and supporting automation scripts using Selenium and Java.",
      "Performed extensive backend API testing with Postman to verify data consistency and system reliability across accommodation booking flows and inventory management systems.",
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
      "Conducted comprehensive functional and integration testing for the MyBluebird application across Android, Web, and API platforms to ensure consistent user experience for millions of transportation service users.",
      "Validated complex end-to-end user flows across multiple release cycles, monitoring feature behaviour and ensuring platform consistency between driver and passenger applications.",
      "Collaborated closely with business analysts, product owners, and engineers to clarify requirements, refine user flows, and resolve critical issues discovered during testing phases.",
      "Created detailed and structured test cases in TestRail to maximize coverage across the application and maintained automation scripts using Postman and Katalon Studio.",
      "Supported all sprint ceremonies and worked closely with development teams to address defects, performance gaps, and regression issues affecting user experience or system reliability.",
    ],
  },
];

const partTimeAndInternships = [
  {
    id: "pt-1",
    title: "QA Engineer – Part-time",
    company: "SehatQ",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/iWSWOgSUpfIhugUD.png",
    period: "2022 – 2023",
    type: "Part-time",
    highlights: [
      "Conducted structured manual, regression, and exploratory testing across Android, iOS, web, and mobile web platforms for the eCommerce and Merchant squad, ensuring stable releases for healthcare product transactions.",
      "Managed test cases and sprint tracking in Xray and JIRA, monitoring bug status throughout development cycles and communicating priorities to stakeholders.",
      "Collaborated with developers and product owners to align on acceptance criteria and ensure consistent product quality across multiple features and releases.",
    ],
  },
  {
    id: "pt-2",
    title: "QA Engineer – Part-time",
    company: "SiCepat",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/vtUAAIQhTvYAhdQP.png",
    period: "2021 – 2022",
    type: "Part-time",
    highlights: [
      "Executed integration, regression, and API testing across Android and web platforms for the CMS and Integration team, ensuring reliable performance for logistics management systems.",
      "Developed structured test cases in TestRail and validated backend functionality using Postman to ensure data consistency across systems.",
      "Collaborated with developers and product owners to align on test scope and ensure stable releases for critical logistics features.",
    ],
  },
  {
    id: "int-1",
    title: "QA Engineer Intern",
    company: "GoTo Group (Moka)",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/fMzZvBYHbNOGcXlH.png",
    period: "2019",
    type: "Internship",
    highlights: [
      "Supported end-to-end testing and QA activities for the Moka POS Backoffice Inventory team, ensuring smooth operations for merchant inventory management.",
      "Executed structured test scenarios and validated critical inventory workflows including stock updates, product categorization, and order synchronization.",
      "Collaborated with engineers to identify and address issues during development, contributing to improved system reliability.",
    ],
  },
  {
    id: "int-2",
    title: "QA Engineer Intern",
    company: "Grab",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/bUAqVpvhsLeEvRro.png",
    period: "2019",
    type: "Internship",
    highlights: [
      "Automated API testing for payment systems using Postman and built UI automation with Robot Framework and Appium, improving testing efficiency for critical payment flows.",
      "Identified defects through systematic validation of payment transactions, refund processes, and wallet integrations across the application.",
      "Worked with developers to resolve issues and improve system reliability before production releases.",
    ],
  },
  {
    id: "int-3",
    title: "QA Engineer Intern",
    company: "DANA Indonesia",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/JlXCSsTrCXQVouBa.png",
    period: "2018",
    type: "Internship",
    highlights: [
      "Supported BukaDANA integration and KYC initiatives by validating key user journeys including registration, identity verification, and account setup processes.",
      "Partnered with cross-functional teams to maintain consistent payment and identity verification workflows across the application.",
      "Identified and documented defects during testing cycles, working with developers to resolve issues before release and ensure compliance with financial regulations.",
    ],
  },
];

const education = [
  {
    degree: "Master of Business Administration",
    school: "Bandung Institute of Technology (ITB)",
    schoolImage:
      "https://upload.wikimedia.org/wikipedia/id/b/b9/ITB_logo.png",
    date: "Expected Sep 2026",
    detail: "SBM ITB · Bandung, Indonesia",
  },
  {
    degree: "Bachelor of Engineering – Informatics",
    school: "Del Institute of Technology (IT Del)",
    schoolImage:
      "https://upload.wikimedia.org/wikipedia/id/4/46/IT_Del_logo.png",
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
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-5 text-left hover:bg-[#FAFAFA] dark:hover:bg-[#242424] transition-colors"
      >
        {/* Logo */}
        <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#2A2A2A] border border-[#E8E8E8] dark:border-[#333] overflow-hidden flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
          <img src={item.companyImage} alt={item.company} className="w-6 h-6 object-contain" loading="lazy" />
        </div>

        {/* Title + company */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="font-bold text-[0.93rem] text-[#1A1A1A] dark:text-[#E0E0E0] leading-snug">
              {item.title}
            </span>
            {isCurrent && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.58rem] font-bold uppercase tracking-wide bg-[#0D7377]/10 text-[#0D7377]">
                <span className="w-1 h-1 rounded-full bg-[#0D7377] animate-pulse" />
                Current
              </span>
            )}
            {typeBadge && (
              <span className="px-2 py-0.5 rounded-full text-[0.58rem] font-bold uppercase tracking-wide bg-[#F2F2F2] dark:bg-[#2A2A2A] text-[#888]">
                {typeBadge}
              </span>
            )}
          </div>
          <p className="text-[0.8rem] text-[#888888] dark:text-[#666666]">{item.company}</p>
        </div>

        {/* Period + chevron */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="hidden sm:block text-[0.68rem] font-bold uppercase tracking-[0.08em] text-[#AAAAAA] dark:text-[#555555]">
            {item.period}
          </span>
          <ChevronDown
            size={14}
            className={`text-[#BBBBBB] dark:text-[#444] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Expanded bullets */}
      <div
        style={{
          maxHeight: isOpen ? `${item.highlights.length * 120}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="px-5 pb-5 pt-1 border-t border-[#F2F2F2] dark:border-[#2C2C2C] bg-[#FAFAFA]/70 dark:bg-[#181818]/60">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.1em] text-[#BBBBBB] dark:text-[#555] mb-2.5 mt-2 sm:hidden">
            {item.period}
          </p>
          <ul className="space-y-1.5">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-[0.84rem] text-[#555555] dark:text-[#888888] leading-relaxed">
                <span className="text-[#0D7377] mt-0.5 shrink-0 font-bold">·</span>
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

  return (
    <Layout>
      <div className="min-h-[calc(100vh-3.5rem)]">

        {/* ── Banner ─────────────────────────────────────────── */}
        <div className="bg-[#F2F2F2] dark:bg-[#1A1A1A] border-b border-[#E0E0E0] dark:border-[#2C2C2C]">
          <div className="container py-12 md:py-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[#1A1A1A] mb-2">
                  Ricky Halomoan
                </p>
                <h1
                  className={`${sectionHead} leading-[0.92]`}
                  style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}
                >
                  Resume
                </h1>
                <p className="mt-3 text-[0.88rem] text-[#666666] dark:text-[#888888] max-w-[46ch]">
                  Senior Product Manager · 6+ years across logistics, mobility, and education.
                </p>
              </div>
              <a href="#" className={`${btnDL} self-start`} title="Replace href with your PDF resume link">
                <Download size={14} />
                Download PDF
              </a>
            </div>
          </div>
        </div>

        <div className="container py-14 md:py-20">

          {/* ── Experience ─────────────────────────────────────── */}
          <section className="mb-14 md:mb-18">
            <div className={sectionAccent}>
              <div className={accentDot} />
              <h2 className={`${sectionHead} text-2xl md:text-[1.7rem]`}>Experience</h2>
            </div>
            <div className="space-y-3">
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
          <section className="mb-14 md:mb-18">
            <div className={sectionAccent}>
              <div className={accentDot} />
              <h2 className={`${sectionHead} text-2xl md:text-[1.7rem]`}>Internships &amp; Part-time</h2>
            </div>
            <div className="space-y-3">
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
          <section className="mb-14 md:mb-18">
            <div className={sectionAccent}>
              <div className={accentDot} />
              <h2 className={`${sectionHead} text-2xl md:text-[1.7rem]`}>Education</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {education.map((edu) => (
                <div key={edu.degree} className={`${cardBase} p-6 flex gap-4 items-start`}>
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#2A2A2A] border border-[#E8E8E8] dark:border-[#333] overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                    <img src={edu.schoolImage} alt={edu.school} className="w-7 h-7 object-contain" loading="lazy" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[0.92rem] text-[#1A1A1A] dark:text-[#E0E0E0] leading-snug mb-0.5">
                      {edu.degree}
                    </p>
                    <p className="text-[0.8rem] text-[#888888] dark:text-[#666666] mb-1">{edu.school}</p>
                    <p className="text-[0.72rem] text-[#AAAAAA] dark:text-[#555555]">{edu.detail}</p>
                    <span className="mt-2.5 inline-block text-[0.62rem] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full bg-[#0D7377]/8 text-[#0D7377] border border-[#0D7377]/20">
                      {edu.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Skills ─────────────────────────────────────────── */}
          <section>
            <div className={sectionAccent}>
              <div className={accentDot} />
              <h2 className={`${sectionHead} text-2xl md:text-[1.7rem]`}>Skills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className={`${cardBase} p-6`}>
                  <h3 className="text-[0.66rem] font-bold uppercase tracking-[0.13em] text-[#0D7377] mb-4">
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
