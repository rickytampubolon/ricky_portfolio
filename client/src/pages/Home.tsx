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

/* ── Shared section heading style ───────────────────────────── */
const sectionH2Base = "fluid-h2 font-semibold tracking-[-0.02em] text-foreground";
const sectionH2 = `${sectionH2Base} mb-12`;

/* ── Shared component styles ─────────────────────────────── */
const expCard = "flex-1 min-w-0 rounded-3xl p-5 sm:p-6 bg-white dark:bg-card shadow-[0_10px_30px_rgba(0,0,0,0.03),_0_1px_8px_rgba(0,0,0,0.02)] dark:shadow-none border border-transparent dark:border-border transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1";
const timelineNode = "w-9 h-9 rounded-2xl bg-white dark:bg-card border border-[#E5E5EA] dark:border-border overflow-hidden flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.03),_0_1px_8px_rgba(0,0,0,0.02)] dark:shadow-none";
const subsectionH3 = "fluid-h3 font-medium tracking-[-0.01em] text-foreground mb-4";

/* ── Skill category tag tints ────────────────────────────── */
const categoryTagColors: Record<string, string> = {
  "Product Management":   "bg-[rgba(0,122,255,0.08)] hover:bg-[rgba(0,122,255,0.13)] dark:bg-blue-500/10 dark:hover:bg-blue-500/15",
  "Leadership":           "bg-[rgba(52,199,89,0.08)] hover:bg-[rgba(52,199,89,0.13)] dark:bg-green-500/10 dark:hover:bg-green-500/15",
  "Technical":            "bg-[rgba(255,149,0,0.08)] hover:bg-[rgba(255,149,0,0.13)] dark:bg-orange-500/10 dark:hover:bg-orange-500/15",
  "Methodologies & Tools":"bg-[rgba(88,86,214,0.08)] hover:bg-[rgba(88,86,214,0.13)] dark:bg-purple-500/10 dark:hover:bg-purple-500/15",
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  /* Expanded state for full-time experience bullets */
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [heroRevealed, setHeroRevealed] = useState(false);

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
      setShowBackToTop(window.scrollY > 400);
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
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
  const aboutReveal = useReveal();
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
      period: "2025 – Present",
      highlights: [
        "Own end-to-end product strategy and execution for Xanh SM Indonesia, ensuring the digital ecosystem supports business growth, operational scalability, and service quality.",
        "Define the national product roadmap and align it with regional and global priorities, balancing local operational needs, market behaviour, and regulatory requirements.",
        "Drive cross-functional collaboration with engineering, design, operations, finance, and data teams to ensure consistent and high-quality feature delivery at every stage.",
        "Serve as the primary liaison between Indonesia leadership and the global product organization, maintaining alignment on priorities, timelines, and long-term direction.",
        "Monitor key product metrics and platform performance indicators, translating data-driven insights into prioritised improvements that sustain business momentum and service reliability.",
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
        "Led the development of performance management tools and national-scale data integration systems, improving accountability across 500,000+ schools.",
        "Defined the product vision and roadmap aligned with ministry priorities, ensuring regulatory compliance at every release cycle.",
        "Established measurement frameworks to assess tool effectiveness and drove continuous, data-grounded improvements.",
        "Facilitated discovery sessions with ministry officials and educators to capture nuanced needs and ensure platform relevance across stakeholder groups.",
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
        "Directed a team maintaining and enhancing the Fleet Management System across First, Middle, and Last Mile operations for millions of daily parcels.",
        "Managed end-to-end delivery of system enhancements that improved operational throughput and process sustainability.",
        "Analysed operational data to surface inefficiencies and translate findings into prioritised, actionable improvements.",
        "Partnered with Business, Finance, Strategy, BI, and Operations to keep system capabilities aligned with daily demand.",
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
      period: "2022 – 2024",
      highlights: [
        "Reduced fulfillment turnaround time and elevated service levels through targeted operational and product improvements.",
        "Led WMS enhancements that delivered measurable gains in warehouse productivity, data accuracy, and process standardisation.",
        "Managed Tokopedia Seller Platform–WMS integration, ensuring seamless and real-time data synchronisation at scale.",
        "Applied data analytics to monitor performance trends and implement improvements that raised overall service quality.",
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
      period: "2020 – 2022",
      highlights: [
        "Owned quality across Android, iOS, Web, and mobile web for the Accommodation team, maintaining high-quality standards across all release cycles.",
        "Led the weekly Web release process, ensuring stable deployments and consistent platform performance.",
        "Sustained automation coverage using Selenium, Java, and TestNG and validated backend correctness through Postman API testing.",
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
      period: "2019 – 2020",
      highlights: [
        "Tested the MyBluebird application across Android, Web, and API to maintain functional and integration quality.",
        "Built test cases in TestRail and maintained automation scripts using Postman and Katalon Studio, improving testing efficiency and release stability.",
        "Collaborated with BAs, POs, engineers, and designers to clarify requirements and resolve issues throughout each sprint.",
      ],
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
      period: "2022 – 2023",
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
      period: "2021 – 2022",
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

      {/* ── Floating Glassmorphism Nav ─────────────────────── */}
      <header
        className={`fixed left-0 right-0 z-50 flex justify-center px-3 sm:px-4 transition-all duration-300 ${
          scrolled ? "top-2 sm:top-3" : "top-3 sm:top-5"
        }`}
      >
        <nav
          className={`max-w-[640px] w-full flex items-center justify-between gap-2 sm:gap-3 rounded-full border border-border shadow-[0_2px_24px_rgba(0,0,0,0.08)] backdrop-blur-[30px] backdrop-saturate-[180%] bg-white/80 dark:bg-card/90 transition-all duration-300 ${
            scrolled ? "px-3 sm:px-4 py-1.5 sm:py-2" : "px-4 sm:px-6 py-2 sm:py-3"
          }`}
        >
          {/* Brand */}
          <div className="flex items-center gap-2">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
              alt="Ricky Halomoan"
              className={`rounded-full object-cover ring-1 ring-border transition-all duration-300 ${
                scrolled ? "w-5 h-5" : "w-6 h-6"
              }`}
            />
            <span
              className={`hidden sm:block font-semibold text-foreground tracking-[-0.02em] transition-all duration-300 ${
                scrolled ? "text-xs" : "text-sm"
              }`}
            >
              Ricky Halomoan
            </span>
          </div>

          <div className="hidden sm:block w-px h-4 bg-border mx-0.5" />

          {/* Links + theme toggle */}
          <div className="flex items-center gap-0.5">
            {[
              ["About", "about"],
              ["Experience", "experience"],
              ["Skills", "skills"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`transition-all duration-200 font-medium ${
                  id === "contact"
                    ? `border border-[#CCCCCC] dark:border-border text-foreground bg-transparent hover:bg-secondary rounded-full ${
                        scrolled ? "text-[10px] px-2.5 py-0.5" : "text-[11px] sm:text-xs px-3 sm:px-4 py-1 sm:py-1.5"
                      }`
                    : `text-foreground/70 hover:text-foreground rounded-full hover:bg-secondary ${
                        scrolled ? "text-[10px] px-2 py-1" : "text-[11px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5"
                      }`
                }`}
              >
                {label}
              </a>
            ))}

            {/* Divider */}
            <div className="w-px h-4 bg-border mx-1.5 shrink-0" />

            {/* Dark / Light toggle */}
            <button
              onClick={handleThemeToggle}
              aria-label="Toggle dark mode"
              className={`relative rounded-full border border-border bg-secondary hover:bg-muted flex items-center justify-center transition-colors duration-200 shrink-0 ${
                scrolled ? "w-6 h-6" : "w-7 h-7"
              }`}
            >
              {/* Sun — visible in light mode */}
              <Sun
                size={scrolled ? 11 : 13}
                className={`absolute transition-all duration-300 ${
                  theme === "dark"
                    ? "opacity-0 rotate-90 scale-50"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              {/* Moon — visible in dark mode */}
              <Moon
                size={scrolled ? 11 : 13}
                className={`absolute transition-all duration-300 ${
                  theme === "dark"
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-50"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Hero — full-screen ─────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <div className="w-full max-w-[800px] mx-auto">
          <div className={heroRevealed ? "is-revealed" : ""}>
            {/* Location badge */}
            <div className="reveal-item" style={stagger(0)}>
              <div className="inline-flex items-center gap-1.5 text-[0.85rem] font-light text-muted-foreground bg-secondary rounded-full px-4 py-1.5 mb-8 tracking-[0.01em]">
                <MapPin size={11} />
                <span>Jakarta, Indonesia</span>
                <span>🇮🇩</span>
              </div>
            </div>

            {/* Name */}
            <h1
              className="reveal-item font-bold leading-[1.1] text-foreground mb-4"
              style={{ ...stagger(1), letterSpacing: "-0.03em", fontSize: "var(--font-size-h1)" }}
            >
              Ricky Halomoan
            </h1>

            {/* Sub-headline */}
            <p
              className="reveal-item text-[1.1rem] text-muted-foreground font-normal leading-relaxed mb-3 tracking-[0.005em]"
              style={stagger(2)}
            >
              Senior Product Manager · Building digital products that move businesses forward.
            </p>

            {/* Domain tags */}
            <p
              className="reveal-item text-[0.9rem] text-muted-foreground/60 tracking-[0.12em] uppercase font-light mb-10"
              style={stagger(3)}
            >
              Logistics · Fulfillment · Electric Mobility · Digital Transformation
            </p>

            {/* CTA */}
            <div
              className="reveal-item flex justify-center items-center w-full"
              style={stagger(4)}
            >
              <a href="#contact">
                <button className="bg-accent text-white hover:bg-[#0056CC] px-8 py-3 min-h-[44px] text-sm font-medium rounded-full transition-all duration-200 shadow-[0_4px_16px_rgba(0,122,255,0.35)] hover:shadow-[0_6px_24px_rgba(0,122,255,0.45)] hover:-translate-y-px active:scale-[0.97]">
                  Let's Work Together
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/40 select-none pointer-events-none">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase font-light">Scroll</span>
          <ChevronDown size={15} className="animate-scroll-pulse" />
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────── */}
      <section id="about" className="border-t border-border">
        <div className="container py-20" ref={aboutReveal.ref}>
          <div className={aboutReveal.revealed ? "is-revealed" : ""}>
            {/* Section heading */}
            <h2 className={`reveal-item ${sectionH2Base} mb-8`} style={stagger(0)}>
              About Me
            </h2>

            <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-stretch">
              {/* Bio */}
              <div className="flex-[1.8] min-w-0 space-y-5 max-w-[65ch]">
                <p
                  className="reveal-item text-base leading-[1.6] text-foreground"
                  style={stagger(1)}
                >
                  I became a Product Manager because I wanted great engineering effort to solve the
                  right problems. With a foundation in Informatics and hands-on experience
                  delivering software, I earned a seat at the technical table. What drives me,
                  however, is ensuring that the work truly serves real user needs. The space between
                  what is technically possible and what is genuinely useful is where I do my best
                  work.
                </p>
                <p
                  className="reveal-item text-base leading-[1.6] text-foreground"
                  style={stagger(2)}
                >
                  Across electric mobility, logistics, and fulfillment, I have learned that the
                  most impactful products are not the most complex. They are the ones grounded in a
                  deep understanding of how people actually work. I begin every challenge by getting
                  close to the operation, speaking with drivers, operations teams, and engineers
                  before shaping any roadmap. I translate complexity into clarity so cross-functional
                  teams can move with alignment and purpose.
                </p>
              </div>

              {/* Education — single unified card */}
              <div className="reveal-item flex-1 min-w-0 flex flex-col" style={stagger(3)}>
                <div className="h-full bg-white dark:bg-card shadow-[0_10px_30px_rgba(0,0,0,0.03),_0_1px_8px_rgba(0,0,0,0.02)] dark:shadow-none border border-transparent dark:border-border rounded-3xl p-5 sm:p-8 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1">
                  {education.map((edu, idx) => (
                    <div
                      key={idx}
                      className={idx < education.length - 1 ? "border-b border-[#F0F0F0] dark:border-border pb-6 mb-6" : ""}
                    >
                      <div className="flex items-start gap-3">
                        {edu.schoolImage && (
                          <img
                            src={edu.schoolImage}
                            alt={edu.school}
                            className="w-6 h-6 object-contain rounded-md shrink-0 bg-white p-0.5 border border-[#E5E5EA] dark:border-border mt-0.5"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-[#1D1D1F] dark:text-foreground leading-snug mb-1" style={{ fontSize: "1.1rem" }}>
                            {edu.degree}
                          </p>
                          <p className="font-normal text-[#86868b] dark:text-muted-foreground" style={{ fontSize: "0.9rem" }}>
                            {edu.school}
                          </p>
                          <p className="font-normal text-[#86868b] dark:text-muted-foreground mt-0.5" style={{ fontSize: "0.9rem" }}>
                            {edu.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────────── */}
      <section id="experience" className="border-t border-border">
        <div className="container py-20" ref={expReveal.ref}>
          <h2 className={`${sectionH2Base} mb-6`}>Experience</h2>

          <div className={expReveal.revealed ? "is-revealed" : ""}>
            {/* ── Full-time Roles ── */}
            <h3 className={subsectionH3}>
              Full-time Roles
            </h3>
            <div className="relative">
              {/* Timeline thread */}
              <div className="absolute left-[17px] top-[46px] bottom-[46px] w-[2px] bg-gradient-to-b from-border via-border/60 to-transparent pointer-events-none" />

              {experiences.map((exp, index) => {
                const isExpanded = expandedIds.has(exp.id);
                const extraCount = exp.highlights.length - 3;
                const hasMore = extraCount > 0;

                return (
                  <div
                    key={exp.id}
                    className="reveal-item relative flex gap-4 sm:gap-5 mb-4 last:mb-0"
                    style={stagger(index)}
                  >
                    {/* Timeline node: logo */}
                    <div className="relative z-10 shrink-0 mt-1.5">
                      <div className={timelineNode}>
                        {exp.companyImage && (
                          <img src={exp.companyImage} alt={exp.company} className="w-7 h-7 object-contain" />
                        )}
                      </div>
                    </div>

                    {/* Card */}
                    <div className={expCard}>
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-foreground leading-snug" style={{ fontSize: "1.05rem" }}>
                            {exp.title}
                          </p>
                          <p className="font-medium text-muted-foreground mt-0.5" style={{ fontSize: "0.9rem" }}>
                            {exp.company}
                          </p>
                          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[#86868b] dark:text-muted-foreground mt-0.5">
                            {exp.period}
                          </p>
                        </div>
                        {exp.id === 1 && (
                          <span className="shrink-0 inline-flex items-center px-2 py-0.5 text-[9px] font-bold tracking-wide bg-accent/10 text-accent rounded-full uppercase mt-0.5">
                            Current
                          </span>
                        )}
                      </div>

                      {exp.companyProfile && (
                        <p className="text-[0.85rem] text-muted-foreground/70 italic mb-3 leading-relaxed">
                          {exp.companyProfile}
                        </p>
                      )}

                      <ul className="space-y-1.5">
                        {exp.highlights.slice(0, 3).map((highlight, idx) => (
                          <li key={idx} className="flex gap-2 text-muted-foreground" style={{ fontSize: "0.9rem" }}>
                            <span className="text-accent mt-0.5 shrink-0 font-bold">·</span>
                            <span className="leading-[1.6]">{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {hasMore && (
                        <div
                          style={{
                            maxHeight: isExpanded ? `${extraCount * 100}px` : "0px",
                            overflow: "hidden",
                            transition: "max-height 0.3s ease-in-out",
                          }}
                        >
                          <ul className="space-y-1.5 mt-1.5">
                            {exp.highlights.slice(3).map((highlight, idx) => (
                              <li key={idx + 3} className="flex gap-2 text-muted-foreground" style={{ fontSize: "0.9rem" }}>
                                <span className="text-accent mt-0.5 shrink-0 font-bold">·</span>
                                <span className="leading-[1.6]">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {hasMore && (
                        <button
                          onClick={() => toggleExpanded(exp.id)}
                          className="flex items-center gap-1 mt-3 text-xs text-muted-foreground hover:text-accent transition-colors duration-150 font-medium"
                        >
                          {isExpanded ? "Show Less" : "Show More"}
                          <ChevronDown
                            size={12}
                            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Part-Time Roles ── */}
            <h3 className={`${subsectionH3} mt-10`}>
              Part-Time Roles
            </h3>
            <div className="relative">
              <div className="absolute left-[17px] top-[46px] bottom-[46px] w-[2px] bg-gradient-to-b from-border via-border/60 to-transparent pointer-events-none" />

              {partTimeJobs.map((job, idx) => (
                <div
                  key={job.id}
                  className="reveal-item relative flex gap-4 sm:gap-5 mb-4 last:mb-0"
                  style={stagger(idx)}
                >
                  <div className="relative z-10 shrink-0 mt-1.5">
                    <div className={timelineNode}>
                      {job.companyImage && (
                        <img src={job.companyImage} alt={job.company} className="w-7 h-7 object-contain" />
                      )}
                    </div>
                  </div>

                  <div className={expCard}>
                    <p className="font-bold text-foreground leading-snug mb-0.5" style={{ fontSize: "1.05rem" }}>
                      {job.title}
                    </p>
                    <p className="font-medium text-muted-foreground" style={{ fontSize: "0.9rem" }}>
                      {job.company}
                    </p>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[#86868b] dark:text-muted-foreground mt-0.5 mb-2.5">
                      {job.period}
                    </p>

                    {job.description && (
                      <p className="text-xs text-muted-foreground/70 italic mb-3 leading-relaxed">
                        {job.description}
                      </p>
                    )}

                    <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "0.9rem" }}>
                      {job.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Internships ── */}
            <h3 className={`${subsectionH3} mt-10`}>
              Internships
            </h3>
            <div className="relative">
              <div className="absolute left-[17px] top-[46px] bottom-[46px] w-[2px] bg-gradient-to-b from-border via-border/60 to-transparent pointer-events-none" />

              {internships.map((internship, idx) => (
                <div
                  key={idx}
                  className="reveal-item relative flex gap-4 sm:gap-5 mb-4 last:mb-0"
                  style={stagger(idx)}
                >
                  <div className="relative z-10 shrink-0 mt-1.5">
                    <div className={timelineNode}>
                      {internship.companyImage && (
                        <img src={internship.companyImage} alt={internship.company} className="w-7 h-7 object-contain" />
                      )}
                    </div>
                  </div>

                  <div className={expCard}>
                    <p className="font-bold text-foreground leading-snug mb-0.5" style={{ fontSize: "1.05rem" }}>
                      {internship.title}
                    </p>
                    <p className="font-medium text-muted-foreground" style={{ fontSize: "0.9rem" }}>
                      {internship.company}
                    </p>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[#86868b] dark:text-muted-foreground mt-0.5 mb-2.5">
                      {internship.period}
                    </p>

                    {internship.companyProfile && (
                      <p className="text-xs text-muted-foreground/70 italic mb-3 leading-relaxed">
                        {internship.companyProfile}
                      </p>
                    )}

                    {internship.responsibility && (
                      <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "0.9rem" }}>
                        {internship.responsibility}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills (Bento) ────────────────────────────────────── */}
      <section id="skills" className="border-t border-border">
        <div className="container py-20" ref={skillsReveal.ref}>
          <h2 className={sectionH2}>Skills</h2>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${
              skillsReveal.revealed ? "is-revealed" : ""
            }`}
          >
            {Object.entries(skills).map(([category, items], catIdx) => (
              <div
                key={category}
                className="reveal-item bg-white dark:bg-card shadow-[0_10px_30px_rgba(0,0,0,0.03),_0_1px_8px_rgba(0,0,0,0.02)] dark:shadow-none border border-transparent dark:border-border rounded-3xl p-6 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1"
                style={stagger(catIdx)}
              >
                <h3 className="text-xs font-semibold text-foreground/60 mb-4 tracking-[0.08em] uppercase">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-4 py-1.5 text-[0.9rem] rounded-[8px] font-normal text-[#1D1D1F] dark:text-foreground transition-all duration-200 ${categoryTagColors[category] ?? "bg-[#EEEEEE] hover:bg-[#E0E0E0] dark:bg-secondary dark:hover:bg-muted"}`}
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
      <section id="contact" className="border-t border-border">
        <div className="container py-20" ref={contactReveal.ref}>
          <div className={contactReveal.revealed ? "is-revealed" : ""}>
            <h2
              className={`reveal-item ${sectionH2}`}
              style={stagger(0)}
            >
              Contact
            </h2>
            <p
              className="reveal-item text-[1.5rem] font-medium text-foreground mb-2 tracking-[-0.01em]"
              style={stagger(1)}
            >
              Let's build something great.
            </p>
            <p
              className="reveal-item text-[0.9rem] font-light text-muted-foreground mb-10 tracking-[0.005em]"
              style={stagger(2)}
            >
              Open to new opportunities and collaborations. Feel free to reach out via email or connect on social media.
            </p>
            <div className="flex flex-col gap-4">
              {contactLinks.map(({ href, icon, label, staggerIdx, external }) => (
                <a
                  key={href}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="reveal-item inline-flex items-center gap-4 text-[1rem] text-muted-foreground hover:text-foreground hover:-translate-y-0.5 transition-all duration-200 group w-fit"
                  style={stagger(staggerIdx)}
                >
                  <span className="w-11 h-11 rounded-2xl bg-white dark:bg-secondary shadow-[0_10px_30px_rgba(0,0,0,0.03),_0_1px_8px_rgba(0,0,0,0.02)] dark:shadow-none border border-[#E5E5EA] dark:border-border flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-200 shrink-0">
                    {icon}
                  </span>
                  <span className="truncate group-hover:underline underline-offset-4">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-[#d2d2d7] dark:border-border">
        <div className="container py-8 text-center">
          <p className="text-[0.875rem] text-[#86868b] dark:text-muted-foreground">
            Ricky Halomoan © 2026
          </p>
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
