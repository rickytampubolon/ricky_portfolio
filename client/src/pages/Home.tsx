import {
  Mail,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Layout from "../components/Layout";

/* ── Intersection-observer reveal hook ─────────────────────── */
function useReveal(threshold = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, revealed };
}

function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

/* ── Design tokens ───────────────────────────────────────────── */
const cardBorder   = "border border-[#E0E0E0] dark:border-border";
const cardBase     = `bg-white dark:bg-card rounded-2xl shadow-sm ${cardBorder} transition-all duration-300`;
const sectionHead  = "font-black tracking-[-0.03em] text-[#1A1A1A] dark:text-foreground";
const btnPrimary   = "inline-flex items-center justify-center bg-[#007BFF] text-white px-7 py-3 rounded-full text-sm font-semibold tracking-[0.04em] min-h-[44px] hover:bg-[#0056CC] transition-all duration-200 shadow-[0_4px_14px_rgba(0,123,255,0.32)] hover:-translate-y-px active:scale-[0.97]";
const btnSecondary = "inline-flex items-center justify-center border-2 border-[#007BFF] text-[#007BFF] dark:border-foreground dark:text-foreground px-7 py-3 rounded-full text-sm font-semibold tracking-[0.04em] min-h-[44px] hover:bg-[#007BFF] hover:text-white dark:hover:bg-foreground dark:hover:text-background transition-all duration-200 active:scale-[0.97]";
const tagPill      = "inline-flex items-center px-3 py-1.5 rounded-full bg-[#EFEFEF] dark:bg-muted text-[0.75rem] text-[#4A4A4A] dark:text-muted-foreground font-medium";
const cardPad      = "p-6";
const expCard      = `flex-1 min-w-0 ${cardBase} ${cardPad} hover:-translate-y-1`;
const timelineNode = `w-9 h-9 rounded-xl bg-white dark:bg-card ${cardBorder} overflow-hidden flex items-center justify-center shadow-sm dark:shadow-none`;
const subsectionH3 = "text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[#666666] dark:text-muted-foreground/60 mb-4";

const socialCard = [
  { href: "https://www.linkedin.com/in/rickyhlmn/", icon: <Linkedin  size={15} />, label: "LinkedIn" },
  { href: "https://www.instagram.com/rickyhlmn/",   icon: <Instagram size={15} />, label: "Instagram" },
  { href: "#",                                       icon: <Twitter   size={15} />, label: "Twitter" },
  { href: "#",                                       icon: <Facebook  size={15} />, label: "Facebook" },
];

export default function Home() {
  const [heroRevealed, setHeroRevealed]       = useState(false);
  const [scrollProgress, setScrollProgress]   = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [earlyCareerOpen, setEarlyCareerOpen] = useState(false);
  const [expandedEntryKey, setExpandedEntryKey] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Reveal hooks per section */
  const expReveal    = useReveal();
  const skillsReveal = useReveal();
  const contactReveal = useReveal();

  /* ── Data ────────────────────────────────────────────────── */
  const experiences = [
    {
      id: 1,
      title: "Lead Country Product Manager - ID Market",
      company: "GSM - Xanh SM",
      companyProfile:
        "Vietnamese-founded electric ride-hailing company committed to sustainable urban mobility across Southeast Asia. Backed by VinGroup, Xanh SM operates a fully electric fleet and is expanding rapidly across key markets, with Indonesia positioned as a critical growth frontier alongside Vietnam, Laos, Thailand, and the Philippines.",
      companyImage:
        "https://media.licdn.com/dms/image/v2/D560BAQG5Xqveq4buhg/company-logo_200_200/company-logo_200_200/0/1731636708850/greensmartmobility_logo?e=1773273600&v=beta&t=Q6qJwyL1Q3ofHqnlzuetOUmPcP83yX7TJbxOh5apik4",
      location: "Jakarta, Indonesia",
      period: "2025 – Present",
      highlights: [
        "Lead end-to-end product strategy and execution for Xanh SM Indonesia, defining the national roadmap that aligns regional and global priorities with local operational needs, market behavior, and regulatory requirements.",
        "Oversee development of customer apps, driver flows, corporate solutions, and internal operational systems, collaborating with engineering, design, operations, finance, data teams, and global stakeholders to ensure smooth feature delivery.",
        "Act as primary liaison between Indonesia leadership and global product organization to align priorities, timelines, and long-term direction while driving operational excellence through improved workflows and cross-team coordination.",
        "Drive market localization by adapting core product features and processes to align with local user behavior and expectations.",
        "Analyze operational and behavioral data to identify performance gaps, optimize user journeys, and strengthen service reliability for both drivers and passengers.",
        "Spearhead user research initiatives and competitive analysis to uncover market opportunities, validate product hypotheses, and inform strategic decision-making.",
      ],
    },
    {
      id: 2,
      title: "Product Manager - Performance Evaluation & Data Integration",
      company: "INA Digital Edu - Ministry of Primary and Secondary Education",
      companyProfile:
        "A government-led digital transformation initiative under Indonesia's Ministry of Primary and Secondary Education, focused on building national-scale platforms for teacher performance evaluation, institutional accountability, and data-driven decision-making across more than 500,000 schools and millions of educators nationwide.",
      companyImage:
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/cJhNVtPdbOHZIgCZ.png",
      location: "Jakarta, Indonesia",
      period: "2024 – 2025",
      highlights: [
        "Led development of national-scale performance management tools and data integration systems, improving accountability and efficiency across Indonesia's education sector.",
        "Defined product vision and roadmap, aligning platform development with ministry priorities and national education standards while managing the full delivery lifecycle from research to release.",
        "Drove product adoption by organizing training sessions and providing ongoing support to educational institutions nationwide.",
        "Collaborated with internal teams, regional education offices, and external partners to understand field realities and integrate feedback into system improvements.",
        "Analyzed usage data, user behavior, and evaluation patterns to refine product decisions, develop measurement strategies, and guide continuous data-driven enhancements.",
        "Coordinated closely with engineering, data, and UX teams to ensure stable, compliant development aligned with national standards.",
      ],
    },
    {
      id: 3,
      title: "Senior Associate, System Product Lead - SPX Express",
      company: "Shopee",
      companyProfile:
        "One of Southeast Asia's largest e-commerce platforms, with a dedicated logistics arm, SPX Express (formerly Shopee Xpress), managing end-to-end delivery operations across first, middle, and last mile in multiple countries.",
      companyImage:
        "https://media.licdn.com/dms/image/v2/C560BAQE0iX_dgdH7nA/company-logo_200_200/company-logo_200_200/0/1672279162763/shopee_logo?e=1773273600&v=beta&t=jlKIMPDqPZbW-4BSR5HmYJVM6SlcapRqyMCtSCGl768",
      location: "Jakarta, Indonesia",
      period: "2024",
      highlights: [
        "Led a team responsible for maintaining and enhancing the Fleet Management System across First Mile, Middle Mile, and Last Mile operations.",
        "Collaborated with Business, Finance, Project and Strategy, Business Intelligence, Process Improvement, and Operations teams to ensure system improvements aligned with daily operational needs.",
        "Managed system enhancement planning, tracking, and delivery while handling troubleshooting and coordinating cross-team responses to ensure timely resolution within SLA.",
        "Analyzed operational metrics to identify inefficiencies, propose improvements, and guide strategic decisions with data-backed insights.",
        "Authored Functional Requirement Specifications and Business Requirement Documents, and led UAT sessions to guarantee consistent quality across feature releases.",
      ],
    },
    {
      id: 4,
      title: "Product Manager II - Fulfillment",
      company: "Tokopedia & GoTo Logistics",
      companyProfile:
        "Tokopedia is Indonesia's largest homegrown e-commerce marketplace, merged with Gojek to form the GoTo Group. GoTo Logistics serves as the group's integrated logistics arm, powering warehousing, fulfilment, and last-mile delivery for millions of sellers and buyers across the country.",
      companyImage:
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/ZYnBvsLmQkohgFkj.png",
      location: "Jakarta, Indonesia",
      period: "2022 – 2024",
      highlights: [
        "Directed the Fulfillment team to reduce turnaround time and improve service levels, managing the complete product development lifecycle from concept to launch.",
        "Led enhancements to the Warehouse Management System, driving improvements in productivity, data accuracy, and process standardization.",
        "Developed long-term WMS strategy aligned with business objectives and evolving market conditions, continuously refining features based on user feedback and market analysis.",
        "Oversaw integration between Tokopedia Seller Platform and WMS to ensure seamless, accurate, real-time data flow.",
        "Used data analytics to inform product decisions, monitor performance trends, and implement improvements that elevated overall service quality.",
      ],
    },
    {
      id: 5,
      title: "Quality Engineer - Accommodation",
      company: "Traveloka",
      companyProfile:
        "Southeast Asia's leading travel and lifestyle super-app, serving millions of users across six countries.",
      companyImage:
        "https://media.licdn.com/dms/image/v2/D560BAQGe_izwxvj_SQ/company-logo_200_200/company-logo_200_200/0/1700635813325/traveloka_logo?e=1773273600&v=beta&t=bOObxNgTa_cE27Qpaljq9RoLoVxqtvAUdWwgbjbQdiU",
      location: "Jakarta, Indonesia",
      period: "2020 – 2022",
      highlights: [
        "Conducted comprehensive testing across Android, iOS, Web, and mobile web platforms to ensure high-quality delivery for the Accommodation product team.",
        "Led weekly Web release processes to ensure smooth deployments and high platform stability.",
        "Coordinated closely with software engineers, product managers, and designers to improve feature reliability and user experience.",
        "Maintained automation frameworks using Selenium, Java, and TestNG, and performed API testing with Postman.",
      ],
    },
    {
      id: 6,
      title: "QA Engineer - Taxi Group",
      company: "Ice House",
      companyProfile:
        "Indonesia's leading mobile app development agency and the first Google Certified Developer in Southeast Asia.",
      companyImage:
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/hLmBFNBFYNwCqgOT.png",
      location: "Jakarta, Indonesia",
      period: "2019 – 2020",
      highlights: [
        "Contributed to MyBluebird application by conducting extensive functional and integration testing across Android, Web, and API components.",
        "Collaborated closely with business analysts, product owners, engineers, and designers to clarify requirements, refine user flows, and resolve issues.",
        "Maintained automation scripts using Postman and Katalon Studio to strengthen testing efficiency and long-term release stability.",
      ],
    },
  ];

  const featuredProjects = [
    {
      expId: 1,
      title: "Electric Mobility Product Expansion",
      impact: "Defining Indonesia's national roadmap across customer, driver, and corporate product lines for a fully electric ride-hailing platform.",
    },
    {
      expId: 2,
      title: "National Education Performance Platform",
      impact: "Built data integration systems for 500,000+ schools and millions of educators, improving institutional accountability at national scale.",
    },
    {
      expId: 4,
      title: "Warehouse Management Overhaul",
      impact: "Rebuilt WMS strategy and Tokopedia Seller Platform integration, cutting fulfillment turnaround time across GoTo Logistics.",
    },
    {
      expId: 3,
      title: "Fleet Management System",
      impact: "Orchestrated cross-mile Fleet Management System enhancements at SPX Express across First, Middle, and Last Mile operations.",
    },
  ];

  const skills = {
    "Product Management": ["Product Strategy","Roadmapping","Backlog Management","User Research","Product Metrics","Go to Market Strategy"],
    "Leadership":          ["Cross Functional Leadership","Stakeholder Management","Executive Communication","Decision Making","Change Management","Negotiation"],
    "Technical":           ["SDLC","Data Analysis","API Knowledge","A/B Testing","Release Management","SQL"],
    "Methodologies & Tools": ["Agile","Scrum","Jira","Confluence","Figma","Postman"],
  };

  const partTimeJobs = [
    { id: 1, title: "QA Engineer - Part-time", company: "SehatQ",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/iWSWOgSUpfIhugUD.png",
      period: "2022 – 2023",
      summary: "Contributed to the eCommerce and Merchant squad by executing structured manual, regression, and exploratory testing across Android, iOS, web, and mobile web." },
    { id: 2, title: "QA Engineer - Part-time", company: "SiCepat",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/vtUAAIQhTvYAhdQP.png",
      period: "2021 – 2022",
      summary: "Contributed to the CMS and Integration team by executing integration, regression, and API testing across Android and web platforms." },
  ];

  const internships = [
    { title: "QA Engineer Intern", company: "GoTo Group (Moka)",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/fMzZvBYHbNOGcXlH.png",
      period: "2019",
      responsibility: "Contributed to the Moka POS Backoffice Inventory team by supporting end-to-end testing and quality assurance activities." },
    { title: "QA Engineer Intern", company: "Grab",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/bUAqVpvhsLeEvRro.png",
      period: "2019",
      responsibility: "Automated API testing for payment systems using Postman and developed UI automation frameworks with Robot Framework and Appium." },
    { title: "QA Engineer Intern", company: "DANA Indonesia",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/JlXCSsTrCXQVouBa.png",
      period: "2018",
      responsibility: "Supported the BukaDANA integration and KYC initiatives by validating key user journeys and monitoring system behavior." },
  ];

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <Layout>

      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[200] h-[2px] bg-[#007BFF] dark:bg-accent transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── Hero: split-panel ────────────────────────────────── */}
      <section id="about" className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden">

        {/* Left beige slab */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[38%] h-72 md:h-full bg-[#F5EDE5] dark:bg-muted/20" />

        {/* ── Desktop profile card ── */}
        <div
          className={`hidden md:block absolute z-20 top-1/2 ${heroRevealed ? "is-revealed" : ""}`}
          style={{ left: "38%", transform: "translate(-50%, -50%)" }}
        >
          <div
            className="reveal-item flex flex-col items-center text-center bg-white dark:bg-card rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-[#E0E0E0] dark:border-border w-[240px] p-7"
            style={stagger(0)}
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] mb-4 shrink-0">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
                alt="Ricky Halomoan"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-[1rem] font-bold text-[#1A1A1A] dark:text-foreground leading-snug mb-3">
              Ricky Halomoan
            </h2>
            <div className="w-10 h-[2px] bg-[#007BFF] dark:bg-accent mb-2.5 rounded-full" />
            <p className="text-[0.60rem] font-bold tracking-[0.15em] uppercase text-[#666666] dark:text-muted-foreground mb-4">
              Senior Product Manager
            </p>
            {/* Social icons */}
            <div className="flex items-center justify-center gap-3">
              {socialCard.map(({ href, icon, label }) => (
                <a key={label} href={href} aria-label={label}
                  {...(href !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="w-7 h-7 rounded-full bg-[#F5EDE5]/60 dark:bg-muted flex items-center justify-center text-[#666666] dark:text-muted-foreground hover:bg-[#007BFF] hover:text-white transition-all duration-200">
                  <span style={{ fontSize: "11px" }}>{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile profile card ── */}
        <div className={`flex md:hidden flex-col items-center text-center relative z-10 py-12 px-6 ${heroRevealed ? "is-revealed" : ""}`}>
          <div className="reveal-item bg-white dark:bg-card rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.10)] border border-[#E0E0E0] dark:border-border w-full max-w-[240px] p-7 flex flex-col items-center" style={stagger(0)}>
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-[0_6px_18px_rgba(0,0,0,0.12)] mb-4">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png" alt="Ricky Halomoan" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-[0.95rem] font-bold text-[#1A1A1A] dark:text-foreground leading-snug mb-2">Ricky Halomoan</h2>
            <div className="w-10 h-[2px] bg-[#007BFF] dark:bg-accent mb-2 rounded-full" />
            <p className="text-[0.58rem] font-bold tracking-[0.15em] uppercase text-[#666666] dark:text-muted-foreground mb-3">Senior Product Manager</p>
            <div className="flex items-center justify-center gap-3">
              {socialCard.map(({ href, icon, label }) => (
                <a key={label} href={href} aria-label={label}
                  {...(href !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="w-6 h-6 rounded-full bg-[#F5EDE5]/60 dark:bg-muted flex items-center justify-center text-[#666666] hover:bg-[#007BFF] hover:text-white transition-all duration-200">
                  <span style={{ fontSize: "10px" }}>{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right content panel ── */}
        <div className={`relative z-10 md:absolute md:inset-y-0 md:right-0 md:w-[62%] flex items-center bg-white dark:bg-background ${heroRevealed ? "is-revealed" : ""}`}>
          <div className="w-full py-10 md:py-0 px-6 md:pl-44 md:pr-16 lg:pr-28 max-w-none md:max-w-[680px]">

            {/* Greeting */}
            <h1
              className="reveal-item font-black tracking-[-0.03em] text-[#1A1A1A] dark:text-foreground mb-3 leading-[0.9]"
              style={{ ...stagger(1), fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
            >
              Hello.
            </h1>

            {/* Subheading */}
            <p className="reveal-item text-base md:text-lg font-semibold text-[#4A4A4A] dark:text-foreground/70 mb-6 leading-[1.45]" style={stagger(2)}>
              Here's who I am &amp; what I do.
            </p>

            {/* CTA buttons */}
            <div className="reveal-item flex flex-wrap gap-3 mb-8" style={stagger(3)}>
              <a href="/resume">
                <button className={btnPrimary}>RESUME</button>
              </a>
              <a href="/projects">
                <button className={btnSecondary}>PROJECTS</button>
              </a>
            </div>

            {/* Bio */}
            <div className="reveal-item space-y-4 border-t border-[#E0E0E0] dark:border-border pt-7" style={stagger(4)}>
              <p className="text-[0.92rem] leading-[1.8] text-[#4A4A4A] dark:text-muted-foreground">
                My journey into product management did not follow a straight path. It developed from a strong curiosity about how systems work and how they create real value for people. With a background in Informatics and early experience in software delivery, I gained a solid understanding of the technical side of building digital products.
              </p>
              <p className="text-[0.92rem] leading-[1.8] text-[#4A4A4A] dark:text-muted-foreground">
                Today, as a Senior Product Manager, I focus on translating complex operational and product challenges into clear and practical roadmaps — speaking with users, operations teams, and engineers to connect technical possibilities with real user needs.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────────── */}
      <section id="experience" className="border-t border-[#E0E0E0] dark:border-border">
        <div className="container py-20 md:py-28" ref={expReveal.ref}>
          <h2 className={`${sectionHead} text-5xl md:text-6xl mb-10 md:mb-14`}>Experience</h2>

          <div className={expReveal.revealed ? "is-revealed" : ""}>
            {/* Featured project cards */}
            <div className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 items-stretch">
                {featuredProjects.map((project) => {
                  const exp = experiences.find((e) => e.id === project.expId)!;
                  const isSelected = selectedProjectId === project.expId;
                  const isCurrent = exp.id === 1;
                  return (
                    <button
                      key={project.expId}
                      onClick={() => setSelectedProjectId(isSelected ? null : project.expId)}
                      className={`text-left reveal-item rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-0.5 flex flex-col ${
                        isSelected
                          ? "bg-[#007BFF]/5 border-[#007BFF]/20 shadow-[0_10px_32px_rgba(0,123,255,0.07)]"
                          : "bg-white dark:bg-card border-[#E0E0E0] dark:border-border shadow-sm hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
                      }`}
                      style={stagger(project.expId)}
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-xl bg-white dark:bg-card border border-[#E0E0E0] dark:border-border overflow-hidden flex items-center justify-center shrink-0">
                            <img src={exp.companyImage} alt={exp.company} className="w-5 h-5 object-contain" loading="lazy" />
                          </div>
                          <span className="text-[0.67rem] font-bold uppercase tracking-widest text-[#666666] dark:text-muted-foreground truncate">
                            {exp.company}
                          </span>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.63rem] font-bold tracking-wide uppercase shrink-0 ${
                          isCurrent
                            ? "bg-[#007BFF]/10 text-[#007BFF] dark:text-accent"
                            : "bg-[#F8F8F8] dark:bg-muted border border-[#E0E0E0] dark:border-border text-[#666666] dark:text-muted-foreground"
                        }`}>
                          {isCurrent && <span className="w-1 h-1 rounded-full bg-[#007BFF] animate-pulse" />}
                          {isCurrent ? "Ongoing" : exp.period}
                        </span>
                      </div>
                      <p className="font-bold text-[#1A1A1A] dark:text-foreground leading-snug mb-2 text-[0.97rem]">{project.title}</p>
                      <p className="text-[0.84rem] text-[#4A4A4A]/70 dark:text-muted-foreground leading-relaxed line-clamp-2 flex-1">{project.impact}</p>
                      <div className="flex items-center gap-1 mt-4 text-[#007BFF] dark:text-accent text-xs font-bold">
                        <span>{isSelected ? "Collapse" : "View Details"}</span>
                        <ChevronDown size={12} className={`transition-transform duration-300 ${isSelected ? "rotate-180" : ""}`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Expanded detail panel */}
              {selectedProjectId !== null && (() => {
                const exp = experiences.find((e) => e.id === selectedProjectId)!;
                return (
                  <div className="rounded-2xl p-6 sm:p-8 bg-[#007BFF]/[0.03] border border-[#007BFF]/15">
                    <div className="flex flex-col md:flex-row md:gap-8">
                      <div className="md:w-52 shrink-0 mb-4 md:mb-0">
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className={timelineNode}><img src={exp.companyImage} alt={exp.company} className="w-7 h-7 object-contain" loading="lazy" /></div>
                        </div>
                        <p className="font-bold text-[#1A1A1A] dark:text-foreground leading-snug" style={{ fontSize: "1.02rem" }}>{exp.title}</p>
                        <p className="font-medium text-[#666666] dark:text-muted-foreground mt-0.5" style={{ fontSize: "0.88rem" }}>{exp.company}</p>
                        <div className="flex items-center gap-2 flex-wrap mt-0.5">
                          <p className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#666666] dark:text-muted-foreground">{exp.period}</p>
                          {exp.id === 1 && <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-bold tracking-wide bg-[#007BFF]/10 text-[#007BFF] dark:text-accent rounded-full uppercase">Current</span>}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        {exp.companyProfile && <p className="text-[0.84rem] text-[#4A4A4A]/60 dark:text-muted-foreground/70 italic mb-3 leading-relaxed">{exp.companyProfile}</p>}
                        <ul className="space-y-1.5">
                          {exp.highlights.map((h, i) => (
                            <li key={i} className="flex gap-2 text-[#4A4A4A] dark:text-muted-foreground" style={{ fontSize: "0.88rem" }}>
                              <span className="text-[#007BFF] dark:text-accent mt-0.5 shrink-0 font-bold">·</span>
                              <span className="leading-[1.6]">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Foundational experience accordion */}
            {(() => {
              const earlyEntries = [
                ...experiences.filter((e) => e.id === 5 || e.id === 6).map((e) => ({
                  key: `exp-${e.id}`, logo: e.companyImage, company: e.company, title: e.title, period: e.period,
                  brief: e.highlights[0],
                })),
                ...partTimeJobs.map((j) => ({
                  key: `pt-${j.id}`, logo: j.companyImage, company: j.company, title: j.title, period: j.period,
                  brief: j.summary.split(".")[0] + ".",
                })),
                ...internships.map((i, idx) => ({
                  key: `int-${idx}`, logo: i.companyImage, company: i.company, title: i.title, period: i.period,
                  brief: i.responsibility.split(".")[0] + ".",
                })),
              ];
              return (
                <div className="mt-6">
                  <button
                    onClick={() => { setEarlyCareerOpen((o) => !o); setExpandedEntryKey(null); }}
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border border-[#E0E0E0] dark:border-border/50 bg-[#F8F8F8]/70 dark:bg-card/50 hover:bg-[#F5EDE5]/40 dark:hover:bg-card/70 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[0.84rem] font-semibold text-[#4A4A4A]/70 dark:text-foreground/70">Foundational Experience</span>
                      <span className="hidden sm:block text-[0.7rem] font-medium text-[#666666]/40 dark:text-muted-foreground/40 shrink-0">{earlyEntries.length} roles · 2018 – 2023</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[0.7rem] font-medium text-[#666666]/50">{earlyCareerOpen ? "Collapse" : "View all"}</span>
                      <ChevronDown size={13} className={`text-[#666666]/40 transition-transform duration-300 ${earlyCareerOpen ? "rotate-180" : ""}`} />
                    </div>
                  </button>
                  <div style={{ maxHeight: earlyCareerOpen ? `${earlyEntries.length * 200}px` : "0px", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
                    <div className="mt-2 rounded-2xl border border-[#E0E0E0] dark:border-border/40 overflow-hidden divide-y divide-[#F0F0F0]/60 dark:divide-border/30 bg-white dark:bg-card/40">
                      {earlyEntries.map((entry) => {
                        const isOpen = expandedEntryKey === entry.key;
                        return (
                          <div key={entry.key}>
                            <button
                              onClick={() => setExpandedEntryKey(isOpen ? null : entry.key)}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F8F8F8] dark:hover:bg-card/60 transition-colors text-left"
                            >
                              <div className="w-7 h-7 rounded-lg bg-white dark:bg-card border border-[#E0E0E0] dark:border-border overflow-hidden flex items-center justify-center shrink-0">
                                {entry.logo && <img src={entry.logo} alt={entry.company} className="w-4 h-4 object-contain" loading="lazy" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline gap-2 min-w-0">
                                  <span className="text-[0.81rem] font-semibold text-[#1A1A1A]/80 dark:text-foreground/80 truncate">{entry.company}</span>
                                  <span className="hidden sm:block text-[#CCCCCC] text-xs shrink-0">·</span>
                                  <span className="hidden sm:block text-[0.74rem] text-[#666666]/55 dark:text-muted-foreground/55 truncate">{entry.title}</span>
                                </div>
                                <span className="sm:hidden text-[0.68rem] text-[#666666]/50 truncate block">{entry.title}</span>
                              </div>
                              <span className="text-[0.66rem] font-bold uppercase tracking-[0.08em] text-[#666666]/40 shrink-0">{entry.period}</span>
                              <ChevronDown size={11} className={`text-[#666666]/30 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                            </button>
                            <div style={{ maxHeight: isOpen ? "160px" : "0px", overflow: "hidden", transition: "max-height 0.25s ease-in-out" }}>
                              <p className="px-4 pb-4 pt-1 text-[0.77rem] text-[#4A4A4A]/60 dark:text-muted-foreground/60 leading-relaxed bg-[#F8F8F8] dark:bg-card/30">{entry.brief}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── My Toolkit ────────────────────────────────────────── */}
      <section id="skills" className="border-t border-[#E0E0E0] dark:border-border">
        <div className="container py-20 md:py-28" ref={skillsReveal.ref}>
          <h2 className={`${sectionHead} text-5xl md:text-6xl mb-10 md:mb-14`}>My Toolkit</h2>
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 items-start ${skillsReveal.revealed ? "is-revealed" : ""}`}>
            {Object.entries(skills).map(([category, items], catIdx) => (
              <div key={category} className={`reveal-item ${cardBase} ${cardPad} hover:-translate-y-1`} style={stagger(catIdx)}>
                <h3 className={subsectionH3}>{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className={tagPill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact teaser ────────────────────────────────────── */}
      <section id="contact-teaser" className="border-t border-[#E0E0E0] dark:border-border">
        <div className="container py-20 md:py-28" ref={contactReveal.ref}>
          <div className={contactReveal.revealed ? "is-revealed" : ""}>
            <h2 className={`reveal-item ${sectionHead} text-5xl md:text-6xl mb-4`} style={stagger(0)}>Let's Talk.</h2>
            <p className="reveal-item text-[0.94rem] text-[#4A4A4A]/70 dark:text-muted-foreground mb-8 max-w-[44ch]" style={stagger(1)}>
              Open to new opportunities, product collaborations, and meaningful conversations.
            </p>
            <div className="reveal-item flex flex-wrap gap-3" style={stagger(2)}>
              <a href="/contact"><button className={btnPrimary}>Get in Touch</button></a>
              <a href="https://www.linkedin.com/in/rickyhlmn/" target="_blank" rel="noopener noreferrer">
                <button className={btnSecondary}>LinkedIn</button>
              </a>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
