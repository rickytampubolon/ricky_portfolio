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
function useReveal(threshold = 0.12) {
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
const sectionH2 = "text-[2rem] font-bold tracking-[-0.02em] text-foreground mb-12";

/* ── Shared refined card style ──────────────────────────────── */
const refinedCard =
  "flex-1 min-w-0 bg-white dark:bg-card border border-[rgba(0,0,0,0.08)] dark:border-border rounded-xl hover:border-accent/40 dark:hover:border-accent/40 transition-colors duration-200";
const refinedCardShadow = { boxShadow: "0 1px 2px 0 rgba(0,0,0,0.03)" };

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
      title: "Product Manager - Fulfillment",
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
      "Product Lifecycle",
      "Product Metrics",
    ],
    Leadership: [
      "Cross Functional Leadership",
      "Stakeholder Management",
      "Executive Communication",
      "Decision Making",
      "Negotiation",
      "Change Management",
    ],
    Technical: [
      "SDLC",
      "Data Analysis",
      "API Knowledge",
      "A/B Testing",
      "Release Management",
      "Process Improvement",
    ],
    "Methodologies & Tools": [
      "Agile",
      "Scrum",
      "Kanban",
      "Sprint Planning",
      "Continuous Improvement",
      "Jira",
      "Confluence",
      "Figma",
      "Miro",
      "Google Analytics",
      "SQL",
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
        "Indonesian health tech startup offering a full suite of health-related services through its digital platform, covering teleconsultation, medicine delivery, and e-commerce.",
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
        "Indonesian express courier founded in 2014, specialising in same-day delivery across major cities throughout Indonesia.",
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
      companyProfile: "Cloud-based POS and business management platform, part of GoTo Financial.",
      responsibility:
        "Supported the Moka POS Backoffice Inventory team in ensuring smooth operations and high-quality product deliverables throughout the internship period.",
    },
    {
      title: "QA Engineer Intern",
      company: "Grab",
      companyImage:
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/bUAqVpvhsLeEvRro.png",
      period: "2019",
      companyProfile:
        "Southeast Asia's leading superapp for ride-hailing, deliveries, and financial services.",
      responsibility:
        "Automated API testing for payment systems using Postman and developed robust UI automation using Robot Framework and Appium.",
    },
    {
      title: "QA Engineer Intern",
      company: "DANA Indonesia",
      companyImage:
        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/JlXCSsTrCXQVouBa.png",
      period: "2018",
      companyProfile: "Indonesia's leading digital wallet platform.",
      responsibility:
        "Played an active role in the BukaDANA project and KYC processes, ensuring seamless functionality and consistent product quality.",
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
      label: "@rickyhlmn",
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
          className={`max-w-[640px] w-full flex items-center justify-between gap-2 sm:gap-3 rounded-full border border-border shadow-[0_2px_20px_rgba(0,0,0,0.07)] backdrop-blur-[12px] bg-white/70 dark:bg-card/85 transition-all duration-300 ${
            scrolled ? "px-3 sm:px-4 py-1.5 sm:py-2" : "px-4 sm:px-6 py-2 sm:py-3"
          }`}
        >
          {/* Brand */}
          <div className="flex items-center gap-2">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
              alt="Ricky Halomoan T."
              className={`rounded-full object-cover ring-1 ring-border transition-all duration-300 ${
                scrolled ? "w-5 h-5" : "w-6 h-6"
              }`}
            />
            <span
              className={`hidden sm:block font-semibold text-foreground tracking-[-0.02em] transition-all duration-300 ${
                scrolled ? "text-xs" : "text-sm"
              }`}
            >
              Ricky Halomoan T.
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
                className={`text-foreground/70 hover:text-foreground rounded-full transition-all duration-200 font-semibold hover:bg-secondary ${
                  scrolled
                    ? "text-[10px] px-2 py-1"
                    : "text-[11px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5"
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
              <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground bg-secondary border border-border rounded-full px-3 py-1 mb-8 tracking-wide">
                <MapPin size={10} />
                <span>Jakarta, Indonesia</span>
                <span>🇮🇩</span>
              </div>
            </div>

            {/* Name */}
            <h1
              className="reveal-item text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.04] text-foreground mb-3"
              style={{ ...stagger(1), letterSpacing: "-0.03em" }}
            >
              Ricky Halomoan T.
            </h1>

            {/* Sub-headline */}
            <p
              className="reveal-item text-base sm:text-lg text-muted-foreground font-medium leading-relaxed mb-3"
              style={stagger(2)}
            >
              Senior Product Manager · Building digital products that move businesses forward.
            </p>

            {/* Domain tags */}
            <p
              className="reveal-item text-[10px] sm:text-[11px] text-muted-foreground/50 tracking-[0.14em] uppercase font-medium mb-10"
              style={stagger(3)}
            >
              Logistics · Fulfillment · Electric Mobility · Digital Transformation
            </p>

            {/* CTAs */}
            <div
              className="reveal-item flex flex-wrap justify-center items-center gap-3 sm:gap-4"
              style={stagger(4)}
            >
              <a href="#contact">
                <button className="h-11 bg-accent text-white hover:bg-[#4338CA] px-7 sm:px-8 text-sm font-semibold rounded-full transition-all duration-200 shadow-[0_4px_16px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_24px_rgba(79,70,229,0.45)] hover:-translate-y-px tracking-[-0.01em]">
                  Let's Work Together
                </button>
              </a>
              <a href="#experience">
                <button className="h-11 border border-[rgba(0,0,0,0.1)] text-foreground bg-card hover:bg-secondary px-7 sm:px-8 text-sm font-medium rounded-full transition-all duration-200 tracking-[-0.01em] dark:border-border">
                  View My Work
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/40 select-none pointer-events-none">
          <span className="text-[9px] tracking-[0.18em] uppercase font-medium">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────── */}
      <section id="about" className="border-t border-border">
        <div className="container py-20" ref={aboutReveal.ref}>
          <div className={aboutReveal.revealed ? "is-revealed" : ""}>
            {/* Section heading */}
            <h2
              className="reveal-item text-[2rem] font-bold tracking-[-0.02em] text-foreground mb-8"
              style={stagger(0)}
            >
              About Me
            </h2>

            <div className="grid md:grid-cols-3 gap-10 md:gap-16">
              {/* Bio */}
              <div className="md:col-span-2 space-y-5">
                <p
                  className="reveal-item text-base leading-relaxed text-foreground"
                  style={stagger(1)}
                >
                  Product Manager with experience across electric mobility, logistics, fulfillment,
                  and education technology, skilled in leading product strategy and cross-functional
                  initiatives to deliver scalable solutions. A background in software engineering
                  supports a strong ability to translate operational challenges into practical product
                  outcomes, including managing high-impact platforms, coordinating regional and global
                  teams, and improving service quality through structured analysis.
                </p>
                <p
                  className="reveal-item text-base leading-relaxed text-foreground"
                  style={stagger(2)}
                >
                  I believe great products are built where user empathy, operational depth, and data
                  clarity meet. My approach is to understand the full ecosystem, from the ground-level
                  workflow to the executive dashboard, and turn complexity into focused, scalable
                  solutions that teams can actually execute.
                </p>
              </div>

              {/* Education — single unified card */}
              <div className="reveal-item" style={stagger(2)}>
                <div className="bg-[#F9FAFB] dark:bg-card border border-[#E5E7EB] dark:border-border rounded-xl p-5">
                  <p className="text-[11px] tracking-[0.12em] uppercase text-foreground/60 font-bold mb-4">
                    Education
                  </p>
                  <div>
                    {education.map((edu, idx) => (
                      <div key={idx}>
                        {idx > 0 && (
                          <div className="border-t border-[#E5E7EB] dark:border-border my-4" />
                        )}
                        <div className="flex items-center gap-3">
                          {edu.schoolImage && (
                            <img
                              src={edu.schoolImage}
                              alt={edu.school}
                              className="w-8 h-8 object-contain rounded shrink-0 bg-white p-0.5 border border-[#E5E7EB] dark:border-border"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-foreground leading-snug" style={{ fontSize: "0.95rem" }}>
                              {edu.degree}
                            </p>
                            <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.82rem" }}>
                              {edu.school}
                            </p>
                            <p className="text-muted-foreground/70 mt-0.5" style={{ fontSize: "0.8rem" }}>
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
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────────── */}
      <section id="experience" className="border-t border-border">
        <div className="container py-20" ref={expReveal.ref}>
          {/* Main heading */}
          <h2 className="text-[2rem] font-bold tracking-[-0.02em] text-foreground mb-6">
            Experience
          </h2>

          <div className={expReveal.revealed ? "is-revealed" : ""}>
            {/* ── Full-time Roles ── */}
            <h3 className="text-2xl font-semibold text-foreground mb-4">
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
                      <div className="w-9 h-9 rounded bg-white dark:bg-card border border-border overflow-hidden flex items-center justify-center shadow-sm">
                        {exp.companyImage && (
                          <img src={exp.companyImage} alt={exp.company} className="w-7 h-7 object-contain" />
                        )}
                      </div>
                    </div>

                    {/* Card */}
                    <div className="flex-1 min-w-0 rounded-lg p-4 bg-[#F9FAFB] dark:bg-card border border-[#E5E7EB] dark:border-border">
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-foreground leading-snug" style={{ fontSize: "1.05rem" }}>
                            {exp.title}
                          </p>
                          <p className="font-medium text-muted-foreground mt-0.5" style={{ fontSize: "0.9rem" }}>
                            {exp.company} · {exp.period}
                          </p>
                        </div>
                        {exp.id === 1 && (
                          <span className="shrink-0 inline-flex items-center px-2 py-0.5 text-[9px] font-bold tracking-wide bg-accent/10 text-accent rounded-full uppercase mt-0.5">
                            Current
                          </span>
                        )}
                      </div>

                      {exp.companyProfile && (
                        <p className="text-xs text-muted-foreground/75 italic mb-3 leading-relaxed">
                          {exp.companyProfile}
                        </p>
                      )}

                      <ul className="space-y-1.5">
                        {exp.highlights.slice(0, 3).map((highlight, idx) => (
                          <li key={idx} className="flex gap-2 text-muted-foreground" style={{ fontSize: "0.85rem" }}>
                            <span className="text-accent mt-0.5 shrink-0 font-bold">·</span>
                            <span className="leading-[1.6]">{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {hasMore && (
                        <div
                          style={{
                            maxHeight: isExpanded ? `${extraCount * 80}px` : "0px",
                            overflow: "hidden",
                            transition: "max-height 0.3s ease-in-out",
                          }}
                        >
                          <ul className="space-y-1.5 mt-1.5">
                            {exp.highlights.slice(3).map((highlight, idx) => (
                              <li key={idx + 3} className="flex gap-2 text-muted-foreground" style={{ fontSize: "0.85rem" }}>
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
            <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">
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
                    <div className="w-9 h-9 rounded bg-white dark:bg-card border border-border overflow-hidden flex items-center justify-center shadow-sm">
                      {job.companyImage && (
                        <img src={job.companyImage} alt={job.company} className="w-7 h-7 object-contain" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 rounded-lg p-4 bg-[#F9FAFB] dark:bg-card border border-[#E5E7EB] dark:border-border">
                    <p className="font-bold text-foreground leading-snug mb-0.5" style={{ fontSize: "1.05rem" }}>
                      {job.title}
                    </p>
                    <p className="font-medium text-muted-foreground mb-2.5" style={{ fontSize: "0.9rem" }}>
                      {job.company} · {job.period}
                    </p>

                    {job.description && (
                      <p className="text-xs text-muted-foreground/70 italic mb-3 leading-relaxed">
                        {job.description}
                      </p>
                    )}

                    <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "0.85rem" }}>
                      {job.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Internships ── */}
            <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">
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
                    <div className="w-9 h-9 rounded bg-white dark:bg-card border border-border overflow-hidden flex items-center justify-center shadow-sm">
                      {internship.companyImage && (
                        <img src={internship.companyImage} alt={internship.company} className="w-7 h-7 object-contain" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 rounded-lg p-4 bg-[#F9FAFB] dark:bg-card border border-[#E5E7EB] dark:border-border">
                    <p className="font-bold text-foreground leading-snug mb-0.5" style={{ fontSize: "1.05rem" }}>
                      {internship.title}
                    </p>
                    <p className="font-medium text-muted-foreground mb-2.5" style={{ fontSize: "0.9rem" }}>
                      {internship.company} · {internship.period}
                    </p>

                    {internship.companyProfile && (
                      <p className="text-xs text-muted-foreground/70 italic mb-3 leading-relaxed">
                        {internship.companyProfile}
                      </p>
                    )}

                    {internship.responsibility && (
                      <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "0.85rem" }}>
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
                className="reveal-item bg-white dark:bg-card border border-[rgba(0,0,0,0.08)] dark:border-border rounded-xl p-6"
                style={{ boxShadow: "0 1px 2px 0 rgba(0,0,0,0.03)", ...stagger(catIdx) }}
              >
                <h3 className="text-xs font-semibold text-foreground/60 mb-4 tracking-[0.08em] uppercase">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-full font-medium bg-secondary text-foreground/65 hover:bg-muted hover:text-foreground transition-colors duration-150"
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
            <p
              className="reveal-item text-[10px] tracking-[0.14em] uppercase text-muted-foreground mb-5 font-semibold"
              style={stagger(0)}
            >
              Contact
            </p>
            <h2
              className="reveal-item text-3xl sm:text-4xl font-bold text-foreground mb-3"
              style={stagger(1)}
            >
              Let's build something great.
            </h2>
            <p
              className="reveal-item text-sm text-muted-foreground mb-10 max-w-sm leading-relaxed"
              style={stagger(2)}
            >
              Open to new opportunities and collaborations. Feel free to reach out via email or
              connect on social media.
            </p>
            <div className="flex flex-col gap-4">
              {contactLinks.map(({ href, icon, label, staggerIdx, external }) => (
                <a
                  key={href}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="reveal-item inline-flex items-center gap-3 text-[1.1rem] text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors duration-200 group w-fit"
                  style={stagger(staggerIdx)}
                >
                  <span className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-200 shrink-0">
                    {icon}
                  </span>
                  <span className="truncate">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-border">
        <div className="container py-8 flex flex-col sm:flex-row items-center sm:justify-between gap-1 text-center sm:text-left">
          <p className="text-xs text-muted-foreground">Ricky Halomoan T. © 2026</p>
          <p className="text-xs text-muted-foreground/50">Senior Product Manager · Jakarta</p>
        </div>
      </footer>

      {/* ── Back to Top ───────────────────────────────────────── */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-4 sm:right-6 bg-card text-foreground border border-border p-3 rounded-full shadow-lg hover:bg-secondary transition-all duration-200 z-50"
          aria-label="Back to top"
        >
          <ChevronUp size={16} />
        </button>
      )}
    </div>
  );
}
