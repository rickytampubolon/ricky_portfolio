import {
  Mail,
  Linkedin,
  Instagram,
  MapPin,
  ChevronUp,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

/* ── Intersection-observer reveal hook ─────────────────────── */
function useReveal(threshold = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, revealed };
}

/* ── Stagger helper ─────────────────────────────────────────── */
function stagger(n: number) {
  return { "--stagger": n } as React.CSSProperties;
}

/* ── Design tokens ───────────────────────────────────────── */
// Universal card
const cardBorder  = "border border-slate-200 dark:border-border";
const cardBase    = `bg-white dark:bg-card rounded-2xl shadow-sm ${cardBorder} transition-all duration-300`;
// Section heading — same scale as "Hello." for every section
const sectionHeading = "font-black tracking-[-0.03em] text-foreground";
// Buttons — two styles only, used everywhere
const btnPrimary  = "inline-flex items-center justify-center bg-accent text-white px-7 py-3 rounded-full text-sm font-semibold min-h-[44px] hover:bg-[#0056CC] transition-all duration-200 shadow-[0_4px_14px_rgba(0,122,255,0.35)] hover:-translate-y-px active:scale-[0.97]";
const btnSecondary= "inline-flex items-center justify-center border-2 border-foreground text-foreground px-7 py-3 rounded-full text-sm font-semibold min-h-[44px] hover:bg-foreground hover:text-background transition-all duration-200 active:scale-[0.97]";
// Universal tag/pill
const tagPill     = "inline-flex items-center px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-[0.75rem] text-slate-600 dark:text-slate-400 font-normal";
// Card padding token
const cardPad     = "p-6";
/* ── Shared component styles ─────────────────────────────── */
const expCard      = `flex-1 min-w-0 ${cardBase} ${cardPad} hover:-translate-y-1`;
const timelineNode = `w-9 h-9 rounded-xl bg-white dark:bg-card ${cardBorder} overflow-hidden flex items-center justify-center shadow-sm dark:shadow-none`;
const subsectionH3 = "fluid-h3 font-semibold tracking-[-0.01em] text-foreground mb-4";
const partTimeCard = `flex-1 min-w-0 ${cardBase} p-4 sm:p-5 hover:-translate-y-0.5`;
const internCard   = `min-w-0 ${cardBase} p-4 hover:-translate-y-0.5`;


export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  /* Expanded state for full-time experience bullets */
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set([5, 6]));
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [earlyCareerOpen, setEarlyCareerOpen] = useState(false);
  const [expandedEntryKey, setExpandedEntryKey] = useState<string | null>(null);

  /* Briefly add theme-transitioning class so all colours animate smoothly,
     then remove it so normal hover transitions are unaffected. */
  const handleThemeToggle = () => {
    document.documentElement.classList.add("theme-transitioning");
    toggleTheme?.();
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 450);
  };

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
      setShowBackToTop(window.scrollY > 400);
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleExpanded = (id: number) =>
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  /* Reveal hooks per section */
  const expReveal = useReveal();
  const skillsReveal = useReveal();
  const contactReveal = useReveal();

  /* ── Data ─────────────────────────────────────────────────── */
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
      period: "2025 \u2013 Present",
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
      period: "2024 \u2013 2025",
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
        "One of Southeast Asia's largest e-commerce platforms, with a dedicated logistics arm, SPX Express (formerly Shopee Xpress), managing end-to-end delivery operations across first, middle, and last mile in multiple countries. SPX Express processes millions of parcels daily, serving a growing network of sellers, hubs, and delivery partners across the region.",
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
        "Developed new system features that improved operational efficiency and supported workflow consistency across multiple logistics functions.",
      ],
    },
    {
      id: 4,
      title: "Product Manager II - Fulfillment",
      company: "Tokopedia & GoTo Logistics",
      companyProfile:
        "Tokopedia is Indonesia's largest homegrown e-commerce marketplace, merged with Gojek to form the GoTo Group. GoTo Logistics serves as the group's integrated logistics arm, powering warehousing, fulfilment, and last-mile delivery for millions of sellers and buyers across the country, operating at a scale that positions it as one of Indonesia's leading logistics infrastructure providers.",
      companyImage:
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/ZYnBvsLmQkohgFkj.png",
      location: "Jakarta, Indonesia",
      period: "2022 \u2013 2024",
      highlights: [
        "Directed the Fulfillment team to reduce turnaround time and improve service levels, managing the complete product development lifecycle from concept to launch.",
        "Led enhancements to the Warehouse Management System, driving improvements in productivity, data accuracy, and process standardization.",
        "Developed long-term WMS strategy aligned with business objectives and evolving market conditions, continuously refining features based on user feedback and market analysis.",
        "Oversaw integration between Tokopedia Seller Platform and WMS to ensure seamless, accurate, real-time data flow.",
        "Managed both Inbound and Integration teams, strengthening cross-functional collaboration and improving operational handovers.",
        "Used data analytics to inform product decisions, monitor performance trends, and implement improvements that elevated overall service quality.",
      ],
    },
    {
      id: 5,
      title: "Quality Engineer - Accommodation",
      company: "Traveloka",
      companyProfile:
        "Southeast Asia's leading travel and lifestyle super-app, serving millions of users across six countries. Traveloka's platform spans flights, hotels, car rentals, activities, and financial products, supported by a technology infrastructure built to handle high-volume transactions and complex travel experiences across a diverse and fast-growing regional market.",
      companyImage:
        "https://media.licdn.com/dms/image/v2/D560BAQGe_izwxvj_SQ/company-logo_200_200/company-logo_200_200/0/1700635813325/traveloka_logo?e=1773273600&v=beta&t=bOObxNgTa_cE27Qpaljq9RoLoVxqtvAUdWwgbjbQdiU",
      location: "Jakarta, Indonesia",
      period: "2020 \u2013 2022",
      highlights: [
        "Conducted comprehensive testing across Android, iOS, Web, and mobile web platforms to ensure high-quality delivery for the Accommodation product team.",
        "Led weekly Web release processes to ensure smooth deployments and high platform stability.",
        "Coordinated closely with software engineers, product managers, and designers to improve feature reliability and user experience.",
        "Maintained automation frameworks using Selenium, Java, and TestNG, and performed API testing with Postman to ensure backend correctness and data consistency.",
        "Participated actively in all agile ceremonies to enhance cross-team efficiency and product quality.",
        "Prepared and maintained structured test cases, improving coverage and predictability across releases.",
      ],
    },
    {
      id: 6,
      title: "QA Engineer - Taxi Group",
      company: "Ice House",
      companyProfile:
        "Indonesia's leading mobile app development agency and the first Google Certified Developer in Southeast Asia. Ice House builds and maintains high-performance applications and backends for enterprise clients across financial services, logistics, transportation, e-commerce, and entertainment.",
      companyImage:
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/hLmBFNBFYNwCqgOT.png",
      location: "Jakarta, Indonesia",
      period: "2019 \u2013 2020",
      highlights: [
        "Contributed to MyBluebird application by conducting extensive functional and integration testing across Android, Web, and API components.",
        "Collaborated closely with business analysts, product owners, engineers, and designers to clarify requirements, refine user flows, and resolve issues.",
        "Validated end-to-end flows, ensured consistency between platforms, and monitored feature behavior throughout multiple release cycles.",
        "Created detailed and structured test cases in TestRail, significantly improving test coverage across the application.",
        "Maintained automation scripts using Postman and Katalon Studio to strengthen testing efficiency and long-term release stability.",
        "Actively supported sprint ceremonies and worked with development teams to address defects, performance gaps, and regression issues.",
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
    "Product Management": [
      "Product Strategy",
      "Roadmapping",
      "Backlog Management",
      "User Research",
      "Product Metrics",
      "Go to Market Strategy",
    ],
    Leadership: [
      "Cross Functional Leadership",
      "Stakeholder Management",
      "Executive Communication",
      "Decision Making",
      "Change Management",
      "Negotiation",
    ],
    Technical: [
      "SDLC",
      "Data Analysis",
      "API Knowledge",
      "A/B Testing",
      "Release Management",
      "SQL",
    ],
    "Methodologies & Tools": [
      "Agile",
      "Scrum",
      "Jira",
      "Confluence",
      "Figma",
      "Postman",
    ],
  };

  const education = [
    {
      degree: "Master of Business Administration",
      school: "Bandung Institute of Technology",
      schoolImage:
        "https://media.licdn.com/dms/image/v2/C560BAQGJoYkUiQpUKA/company-logo_200_200/company-logo_200_200/0/1630672186443/itb_logo?e=1773273600&v=beta&t=ofyRWEblbh2qjZR2HYOofN8zQ-M_gy2yhiVMyS5J334",
      date: "Expected 09/2026",
    },
    {
      degree: "Informatics Engineering",
      school: "Del Institute of Technology",
      schoolImage:
        "https://media.licdn.com/dms/image/v2/C560BAQESCZFZZqVyng/company-logo_200_200/company-logo_200_200/0/1631389462084?e=1773273600&v=beta&t=jNYjv_W6atTEERBs7tTk78Yhl1xnfkRZGPXuT4rcyLY",
      date: "09/2019",
    },
  ];

  const partTimeJobs = [
    {
      id: 1,
      title: "QA Engineer - Part-time",
      company: "SehatQ",
      companyImage:
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/iWSWOgSUpfIhugUD.png",
      location: "Jakarta, Indonesia",
      period: "2022 \u2013 2023",
      description:
        "Indonesian health technology company building an integrated digital healthcare ecosystem. Through teleconsultation, medicine delivery, and health commerce services, SehatQ aims to improve access to trusted and affordable healthcare across Indonesia.",
      summary:
        "Contributed to the eCommerce and Merchant squad by executing structured manual, regression, and exploratory testing across Android, iOS, web, and mobile web, managing test cases and sprint tracking in Xray and JIRA, monitoring and communicating bug status, and collaborating closely with developers and product owners to align on acceptance criteria and ensure consistent product quality across all user flows.",
    },
    {
      id: 2,
      title: "QA Engineer - Part-time",
      company: "SiCepat",
      companyImage:
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/vtUAAIQhTvYAhdQP.png",
      location: "Jakarta, Indonesia",
      period: "2021 \u2013 2022",
      description:
        "Indonesian express logistics company focused on fast and reliable delivery services nationwide. With strong same-day capabilities and extensive city coverage, SiCepat plays a key role in supporting Indonesia's growing e-commerce ecosystem.",
      summary:
        "Contributed to the CMS and Integration team by executing integration, regression, and API testing across Android and web platforms, developing structured test cases in TestRail, validating backend functionality with Postman, managing sprint visibility in JIRA, and collaborating with developers and product owners to align on test scope and acceptance criteria to ensure stable and reliable releases.",
    },
  ];

  const internships = [
    {
      title: "QA Engineer Intern",
      company: "GoTo Group (Moka)",
      companyImage:
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/fMzZvBYHbNOGcXlH.png",
      period: "2019",
      companyProfile: "Cloud-based point of sale and business management platform under GoTo Group, empowering merchants with digital tools to manage transactions, inventory, and operations. As part of Indonesia's largest digital ecosystem, Moka supports the growth of SMEs across the country.",
      responsibility:
        "Contributed to the Moka POS Backoffice Inventory team by supporting end-to-end testing and quality assurance activities to ensure stable system performance and reliable product releases. Executed structured test scenarios, validated critical inventory workflows, and collaborated closely with engineers to maintain consistent product quality across backoffice operations.",
    },
    {
      title: "QA Engineer Intern",
      company: "Grab",
      companyImage:
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/bUAqVpvhsLeEvRro.png",
      period: "2019",
      companyProfile:
        "Southeast Asian technology platform driving digital adoption across mobility, deliveries, and financial services. Operating across multiple countries, Grab connects millions of users, drivers, and merchants through a unified superapp ecosystem.",
      responsibility:
        "Automated API testing for payment systems using Postman and developed UI automation frameworks with Robot Framework and Appium to strengthen regression coverage and improve release confidence. Identified defects early through systematic validation of payment flows and worked with developers to ensure secure and seamless transaction experiences.",
    },
    {
      title: "QA Engineer Intern",
      company: "DANA Indonesia",
      companyImage:
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/JlXCSsTrCXQVouBa.png",
      period: "2018",
      companyProfile: "Indonesian digital wallet platform accelerating the transition to a cashless society. By providing secure payments, transfers, and financial services, DANA supports financial inclusion for individuals and businesses nationwide.",
      responsibility:
        "Supported the BukaDANA integration and KYC initiatives by validating key user journeys, monitoring system behavior, and ensuring compliance with verification requirements. Partnered with cross-functional teams to resolve issues efficiently and maintain consistent functionality across payment and identity verification processes.",
    },
  ];

  const contactLinks = [
    {
      href: "mailto:rickytampubolon97@gmail.com",
      icon: <Mail size={15} />,
      label: "rickytampubolon97@gmail.com",
      staggerIdx: 3,
    },
    {
      href: "https://www.linkedin.com/in/rickyhlmn/",
      icon: <Linkedin size={15} />,
      label: "linkedin.com/in/rickyhlmn",
      staggerIdx: 4,
      external: true,
    },
    {
      href: "https://www.instagram.com/rickyhlmn/",
      icon: <Instagram size={15} />,
      label: "instagram.com/rickyhlmn",
      staggerIdx: 5,
      external: true,
    },
  ];

  /* ── Render ───────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Scroll Progress Bar ────────────────────────────── */}
      <div
        className="fixed top-0 left-0 z-[200] h-[2px] bg-accent transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── Flat Sticky Navbar ─────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-slate-200 dark:border-border">
        <div className="h-14 flex items-center justify-between px-6 md:px-10">
          {/* Left side: name + separator + title */}
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-foreground" style={{ fontSize: "0.95rem" }}>
              Ricky Halomoan
            </span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="hidden sm:block text-[0.68rem] tracking-[0.12em] uppercase text-muted-foreground">
              Senior Product Manager
            </span>
          </div>

          {/* Right side: nav links + divider + theme toggle */}
          <div className="flex items-center gap-4 md:gap-7">
            {(
              [
                ["About", "about"],
                ["Experience", "experience"],
                ["My Toolkit", "skills"],
                ["Contact", "contact"],
              ] as [string, string][]
            ).map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`text-[0.85rem] font-medium transition-colors duration-200 ${
                  id === "contact"
                    ? "text-accent font-semibold"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {label}
              </a>
            ))}

            {/* Divider */}
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 shrink-0" />

            {/* Dark / Light toggle */}
            <button
              onClick={handleThemeToggle}
              aria-label="Toggle dark mode"
              className="relative w-7 h-7 rounded-full border border-slate-200 dark:border-border bg-secondary hover:bg-muted flex items-center justify-center transition-colors duration-200 shrink-0"
            >
              {/* Sun -- visible in light mode */}
              <Sun
                size={13}
                className={`absolute transition-all duration-300 ${
                  theme === "dark"
                    ? "opacity-0 rotate-90 scale-50"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              {/* Moon -- visible in dark mode */}
              <Moon
                size={13}
                className={`absolute transition-all duration-300 ${
                  theme === "dark"
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-50"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero + About -- split-panel layout ─────────────────── */}
      <section id="about" className="relative min-h-screen pt-14 overflow-hidden">
        {/* Muted left slab -- warm stone */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[40%] h-72 md:h-full bg-stone-200 dark:bg-stone-800/30" />

        {/* Profile card -- centered on the 40/60 boundary (desktop only) */}
        <div
          className={`reveal-item hidden md:flex flex-col items-center text-center absolute z-20 top-1/2 bg-white dark:bg-card rounded-3xl shadow-[0_24px_64px_rgb(0,0,0,0.12)] ${cardBorder} w-[280px] p-8`}
          style={{ left: "40%", transform: "translate(-50%, -50%)", ...stagger(0) }}
        >
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-[0_8px_24px_rgb(0,0,0,0.12)] mb-5 shrink-0">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png" alt="Ricky Halomoan" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-lg font-bold text-foreground leading-snug mb-3">Ricky<br />Halomoan</h2>
          <div className="w-8 h-[2px] bg-accent mb-3 rounded-full" />
          <p className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-2">Senior Product Manager</p>
          <div className="flex items-center justify-center gap-1 text-[0.72rem] text-muted-foreground/60">
            <MapPin size={9} /><span>Jakarta, Indonesia</span><span>&#x1F1EE;&#x1F1E9;</span>
          </div>
        </div>

        {/* Mobile: profile card stacked (not absolute) */}
        <div className={`reveal-item flex md:hidden flex-col items-center text-center relative z-10 py-16 px-6 ${heroRevealed ? "is-revealed" : ""}`} style={stagger(0)}>
          <div className={`bg-white dark:bg-card rounded-3xl shadow-[0_16px_48px_rgb(0,0,0,0.10)] ${cardBorder} w-full max-w-[260px] p-8 flex flex-col items-center`}>
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-[0_8px_24px_rgb(0,0,0,0.12)] mb-4">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png" alt="Ricky Halomoan" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-base font-bold text-foreground leading-snug mb-2">Ricky Halomoan</h2>
            <div className="w-8 h-[2px] bg-accent mb-2 rounded-full" />
            <p className="text-[0.62rem] font-semibold tracking-[0.15em] uppercase text-muted-foreground">Senior Product Manager</p>
          </div>
        </div>

        {/* Right panel -- full width on mobile, 60% on desktop */}
        <div className={`relative z-10 md:absolute md:inset-y-0 md:right-0 md:w-[60%] flex items-center bg-background ${heroRevealed ? "is-revealed" : ""}`}>
          <div className="w-full py-16 md:py-0 px-6 md:pl-48 md:pr-16 lg:pr-24 max-w-none md:max-w-[700px]">

            {/* Greeting */}
            <h1
              className={`reveal-item ${sectionHeading} mb-4 leading-[0.92]`}
              style={{ ...stagger(1), fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}
            >Hello.</h1>

            {/* Tagline */}
            <p className="reveal-item text-base md:text-lg font-semibold text-foreground/70 mb-5 leading-[1.4] tracking-[-0.01em]" style={stagger(2)}>
              Bridging technical complexity with user-centric product strategy.
            </p>

            {/* Domain pills -- unified tagPill style */}
            <div className="reveal-item flex flex-wrap gap-2 mb-7" style={stagger(3)}>
              {["Logistics","Fulfillment","Electric Mobility","Digital Transformation"].map(tag=>(
                <span key={tag} className={tagPill}>{tag}</span>
              ))}
            </div>

            {/* CTA buttons -- primary + secondary */}
            <div className="reveal-item flex flex-wrap gap-3 mb-9" style={stagger(4)}>
              <a href="#contact"><button className={btnPrimary}>{"Let's Work Together"}</button></a>
              <a href="#experience"><button className={btnSecondary}>View My Work</button></a>
            </div>

            {/* Bio */}
            <div className="reveal-item space-y-4 border-t border-slate-200 dark:border-border pt-7 mb-8" style={stagger(5)}>
              <p className="text-[0.92rem] leading-[1.75] text-muted-foreground">
                My journey into product management did not follow a straight path. It developed from a strong curiosity about how systems work and how they create real value for people. With a background in Informatics and early experience in software delivery, I gained a solid understanding of the technical side of building digital products.
              </p>
              <p className="text-[0.92rem] leading-[1.75] text-muted-foreground">
                {"Today, as a Senior Product Manager, I focus on translating complex operational and product challenges into clear and practical roadmaps \u2014 speaking with users, operations teams, and engineers to connect technical possibilities with real user needs."}
              </p>
            </div>

            {/* Education -- compact horizontal rows */}
            <div className="reveal-item grid grid-cols-1 sm:grid-cols-2 gap-3" style={stagger(6)}>
              {/* ITB */}
              <div className={`flex items-start gap-3 ${cardBase} p-4 hover:-translate-y-0.5`}>
                <div className={`w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800/40 ${cardBorder} flex items-center justify-center shrink-0 overflow-hidden`}>
                  <img src={education[0].schoolImage} alt={education[0].school} className="w-6 h-6 object-contain" loading="lazy" />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.8rem] font-semibold text-foreground leading-snug mb-0.5">{education[0].degree}</p>
                  <p className="text-[0.72rem] text-muted-foreground/70">{education[0].school}</p>
                  <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-700/30 text-[0.6rem] font-semibold tracking-wide text-amber-700 dark:text-amber-400 uppercase">
                    <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />In Progress
                  </span>
                </div>
              </div>
              {/* Del IT */}
              <div className={`flex items-start gap-3 ${cardBase} p-4 hover:-translate-y-0.5`}>
                <div className={`w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800/40 ${cardBorder} flex items-center justify-center shrink-0 overflow-hidden`}>
                  <img src={education[1].schoolImage} alt={education[1].school} className="w-6 h-6 object-contain" loading="lazy" />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.8rem] font-semibold text-foreground leading-snug mb-0.5">{education[1].degree}</p>
                  <p className="text-[0.72rem] text-muted-foreground/70">{education[1].school}</p>
                  <span className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full ${cardBorder} bg-slate-50 dark:bg-slate-800/40 text-[0.6rem] font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase`}>
                    {"Graduated \u00b7 2019"}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────────── */}
      <section id="experience" className="border-t border-slate-200 dark:border-border">
        <div className="container py-20 md:py-32" ref={expReveal.ref}>
          <h2 className={`${sectionHeading} text-5xl md:text-6xl mb-10 md:mb-14`}>Experience</h2>

          <div className={expReveal.revealed ? "is-revealed" : ""}>
            <div className="mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 items-stretch">
                {featuredProjects.map((project) => {
                  const exp = experiences.find((e) => e.id === project.expId)!;
                  const isSelected = selectedProjectId === project.expId;
                  const isCurrent = exp.id === 1;
                  return (
                    <button
                      key={project.expId}
                      onClick={() => setSelectedProjectId(isSelected ? null : project.expId)}
                      className={`text-left rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-0.5 flex flex-col ${
                        isSelected
                          ? "bg-accent/5 border-accent/25 shadow-[0_10px_32px_rgba(0,122,255,0.08)]"
                          : `bg-white dark:bg-card border-slate-200 dark:border-border shadow-sm hover:shadow-[0_16px_40px_rgb(0,0,0,0.07)]`
                      }`}
                    >
                      {/* Header row: logo + company + period badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-xl bg-white dark:bg-card border border-slate-200 dark:border-border overflow-hidden flex items-center justify-center shrink-0">
                            <img src={exp.companyImage} alt={exp.company} className="w-5 h-5 object-contain" loading="lazy" />
                          </div>
                          <span className="text-[0.68rem] font-semibold uppercase tracking-widest text-muted-foreground truncate">
                            {exp.company}
                          </span>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.65rem] font-semibold tracking-wide uppercase shrink-0 ${
                          isCurrent
                            ? "bg-accent/10 text-accent"
                            : "bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40 text-slate-500 dark:text-slate-400"
                        }`}>
                          {isCurrent && <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />}
                          {isCurrent ? "Ongoing" : exp.period}
                        </span>
                      </div>

                      <p className="font-bold text-foreground leading-snug mb-2 text-[1rem]">
                        {project.title}
                      </p>
                      {/* flex-1 pushes CTA to card bottom, equalising heights */}
                      <p className="text-[0.85rem] text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                        {project.impact}
                      </p>
                      <div className="flex items-center gap-1 mt-4 text-accent text-xs font-semibold">
                        <span>{isSelected ? "Collapse" : "View Details"}</span>
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-300 ${isSelected ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Expanded project detail panel */}
              {selectedProjectId !== null && (() => {
                const exp = experiences.find((e) => e.id === selectedProjectId)!;
                return (
                  <div className="rounded-2xl p-6 sm:p-8 bg-accent/[0.03] border border-accent/15 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:gap-8">
                      <div className="md:w-52 shrink-0 mb-4 md:mb-0">
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className={timelineNode}>
                            <img src={exp.companyImage} alt={exp.company} className="w-7 h-7 object-contain" loading="lazy" />
                          </div>
                        </div>
                        <p className="font-bold text-foreground leading-snug" style={{ fontSize: "1.05rem" }}>
                          {exp.title}
                        </p>
                        <p className="font-medium text-muted-foreground mt-0.5" style={{ fontSize: "0.9rem" }}>
                          {exp.company}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap mt-0.5">
                          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[#6e6e73] dark:text-muted-foreground">
                            {exp.period}
                          </p>
                          {exp.id === 1 && (
                            <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-bold tracking-wide bg-accent/10 text-accent rounded-full uppercase">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        {exp.companyProfile && (
                          <p className="text-[0.85rem] text-muted-foreground/70 italic mb-3 leading-relaxed">
                            {exp.companyProfile}
                          </p>
                        )}
                        <ul className="space-y-1.5">
                          {exp.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex gap-2 text-muted-foreground" style={{ fontSize: "0.9rem" }}>
                              <span className="text-accent mt-0.5 shrink-0 font-bold">·</span>
                              <span className="leading-[1.6]">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* ── Foundational Experience (collapsed by default) ── */}
            {(() => {
              const earlyCareerEntries = [
                ...experiences
                  .filter((e) => e.id === 5 || e.id === 6)
                  .map((e) => ({
                    key: `exp-${e.id}`,
                    logo: e.companyImage,
                    company: e.company,
                    title: e.title,
                    period: e.period,
                    brief: e.highlights[0],
                  })),
                ...partTimeJobs.map((j) => ({
                  key: `pt-${j.id}`,
                  logo: j.companyImage,
                  company: j.company,
                  title: j.title,
                  period: j.period,
                  brief: j.summary.split(".")[0] + ".",
                })),
                ...internships.map((i, idx) => ({
                  key: `int-${idx}`,
                  logo: i.companyImage,
                  company: i.company,
                  title: i.title,
                  period: i.period,
                  brief: i.responsibility.split(".")[0] + ".",
                })),
              ];

              return (
                <div className="mt-8">
                  {/* Toggle -- styled as a designed subheader, not a debug element */}
                  <button
                    onClick={() => {
                      setEarlyCareerOpen((o) => !o);
                      setExpandedEntryKey(null);
                    }}
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border border-slate-200 dark:border-border/50 bg-slate-50/70 dark:bg-card/50 hover:bg-slate-100/80 dark:hover:bg-card/70 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[0.85rem] font-semibold text-foreground/70 group-hover:text-foreground/90 transition-colors">
                        Foundational Experience
                      </span>
                      <span className="hidden sm:block text-[0.72rem] font-medium text-muted-foreground/40 shrink-0">
                        {earlyCareerEntries.length} roles · 2018 – 2023
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[0.72rem] font-medium text-muted-foreground/50">
                        {earlyCareerOpen ? "Collapse" : "View all"}
                      </span>
                      <ChevronDown
                        size={13}
                        className={`text-muted-foreground/40 transition-transform duration-300 ${earlyCareerOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {/* Expandable content */}
                  <div
                    style={{
                      maxHeight: earlyCareerOpen ? `${earlyCareerEntries.length * 200}px` : "0px",
                      overflow: "hidden",
                      transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    <div className="mt-2 rounded-2xl border border-slate-200 dark:border-border/40 overflow-hidden divide-y divide-slate-100/60 dark:divide-border/30 bg-white dark:bg-card/40">
                      {earlyCareerEntries.map((entry) => {
                        const isEntryOpen = expandedEntryKey === entry.key;
                        return (
                          <div key={entry.key}>
                            <button
                              onClick={() =>
                                setExpandedEntryKey(isEntryOpen ? null : entry.key)
                              }
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-card/60 transition-colors duration-150 text-left"
                            >
                              {/* Logo */}
                              <div className="w-7 h-7 rounded-lg bg-white dark:bg-card border border-slate-200 dark:border-border overflow-hidden flex items-center justify-center shrink-0">
                                {entry.logo && (
                                  <img
                                    src={entry.logo}
                                    alt={entry.company}
                                    className="w-4 h-4 object-contain"
                                    loading="lazy"
                                  />
                                )}
                              </div>

                              {/* Company + title */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline gap-2 min-w-0">
                                  <span className="text-[0.82rem] font-semibold text-foreground/80 truncate">
                                    {entry.company}
                                  </span>
                                  <span className="hidden sm:block text-muted-foreground/30 text-xs shrink-0">·</span>
                                  <span className="hidden sm:block text-[0.75rem] text-muted-foreground/55 truncate">
                                    {entry.title}
                                  </span>
                                </div>
                                <span className="sm:hidden text-[0.7rem] text-muted-foreground/50 truncate block">
                                  {entry.title}
                                </span>
                              </div>

                              {/* Period */}
                              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground/40 shrink-0">
                                {entry.period}
                              </span>

                              {/* Chevron */}
                              <ChevronDown
                                size={11}
                                className={`text-muted-foreground/30 shrink-0 transition-transform duration-200 ${
                                  isEntryOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {/* Inline brief detail */}
                            <div
                              style={{
                                maxHeight: isEntryOpen ? "160px" : "0px",
                                overflow: "hidden",
                                transition: "max-height 0.25s ease-in-out",
                              }}
                            >
                              <p className="px-4 pb-4 pt-1 text-[0.78rem] text-muted-foreground/60 leading-relaxed bg-slate-50 dark:bg-card/30">
                                {entry.brief}
                              </p>
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

      {/* ── Skills ────────────────────────────────────────────── */}
      <section id="skills" className="border-t border-slate-200 dark:border-border">
        <div className="container py-20 md:py-32" ref={skillsReveal.ref}>
          <h2 className={`${sectionHeading} text-5xl md:text-6xl mb-10 md:mb-14`}>My Toolkit</h2>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 items-start ${
              skillsReveal.revealed ? "is-revealed" : ""
            }`}
          >
            {Object.entries(skills).map(([category, items], catIdx) => (
              <div
                key={category}
                className={`reveal-item ${cardBase} ${cardPad} hover:-translate-y-1`}
                style={stagger(catIdx)}
              >
                <h3 className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-muted-foreground/60 mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, idx) => (
                    <span
                      key={idx}
                      className={tagPill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────── */}
      <section id="contact" className="border-t border-slate-200 dark:border-border">
        <div className="container py-20 md:py-32" ref={contactReveal.ref}>
          <div className={contactReveal.revealed ? "is-revealed" : ""}>

            <h2 className={`reveal-item ${sectionHeading} text-5xl md:text-6xl mb-4`} style={stagger(0)}>
              {"Let's Talk."}
            </h2>
            <p className="reveal-item text-[0.95rem] text-muted-foreground mb-8 max-w-[44ch]" style={stagger(1)}>
              Open to new opportunities, product collaborations, and meaningful conversations.
            </p>

            {/* Two CTA buttons -- same pattern as hero */}
            <div className="reveal-item flex flex-wrap gap-3 mb-10" style={stagger(2)}>
              <a href="mailto:rickytampubolon97@gmail.com">
                <button className={btnPrimary}>Get in Touch</button>
              </a>
              <a href="https://www.linkedin.com/in/rickyhlmn/" target="_blank" rel="noopener noreferrer">
                <button className={btnSecondary}>LinkedIn</button>
              </a>
            </div>

            {/* Social links */}
            <div className="flex flex-row flex-wrap gap-8">
              {contactLinks.map(({ href, icon, label, staggerIdx, external }) => (
                <a
                  key={href}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="reveal-item inline-flex items-center gap-2 text-[0.85rem] text-muted-foreground/60 hover:text-accent transition-colors duration-200"
                  style={stagger(staggerIdx)}
                >
                  {icon}
                  <span>{label}</span>
                </a>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 dark:border-border">
        <div className="container py-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-[0.8rem] text-muted-foreground/50">
            Ricky Halomoan © 2026
          </p>
          <div className="flex items-center gap-5">
            {contactLinks.map(({ href, icon, label, external }) => (
              <a key={href} href={href} aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-muted-foreground/40 hover:text-accent transition-colors duration-200">
                {icon}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Back to Top ───────────────────────────────────────── */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-4 sm:right-6 bg-white dark:bg-card text-foreground border border-[#E5E5EA] dark:border-border p-[14px] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03),_0_1px_8px_rgba(0,0,0,0.02)] hover:bg-secondary transition-all duration-200 active:scale-[0.97] z-50"
          aria-label="Back to top"
        >
          <ChevronUp size={16} />
        </button>
      )}
    </div>
  );
}
