import {
  Mail,
  Linkedin,
  Instagram,
  MapPin,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [heroRevealed, setHeroRevealed] = useState(false);

  /* Hero animates in on mount */
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

  const toggleExpanded = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  /* Reveal hooks per section */
  const aboutReveal = useReveal();
  const expReveal = useReveal();
  const partTimeReveal = useReveal();
  const internReveal = useReveal();
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
      "Product Management",
      "Product Strategy",
      "Change Management",
      "Backlog Prioritization",
      "User-Centered Design",
      "Risk Management",
    ],
    Leadership: [
      "Cross-Functional Team Leadership",
      "Stakeholder Management and Alignment",
      "Project Management",
      "Negotiation",
    ],
    Technical: [
      "SDLC",
      "Software Testing",
      "Data Analysis",
      "API Testing",
      "Automation Testing",
      "SQL",
      "Process Improvement",
    ],
    Methodologies: [
      "Agile Methodologies",
      "Scrum",
      "Kanban",
      "Sprint Planning",
      "Continuous Refinement",
    ],
  };

  const education = [
    {
      degree: "Master of Business Administration",
      school: "Bandung Institute of Technology",
      schoolImage:
        "https://media.licdn.com/dms/image/v2/C560BAQGJoYkUiQpUKA/company-logo_200_200/company-logo_200_200/0/1630672186443/itb_logo?e=1773273600&v=beta&t=ofyRWEblbh2qjZR2HYOofN8zQ-M_gy2yhiVMyS5J334",
      date: "09/2026",
    },
    {
      degree: "Bachelor of Computer Science",
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
      highlights: [
        "Contributed to the eCommerce and Merchant squad, conducting tests across Android, iOS, Web, and mobile web to maintain consistent product quality.",
        "Built structured test cases in Xray and executed manual tests, while monitoring active bugs and communicating quality status with product management throughout each sprint.",
        "Managed sprint tracking and test progress visibility through JIRA throughout the development cycle.",
        "Performed regression and exploratory testing each sprint to identify edge cases and maintain consistent quality across all supported platforms and user flows.",
        "Collaborated closely with developers and product owners to clarify acceptance criteria and align on expected outcomes before and during testing cycles.",
      ],
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
      highlights: [
        "Contributed to the CMS and Integration team, executing tests across Android, API, and Web platforms to support consistent release quality.",
        "Developed structured test cases in TestRail and performed API testing using Postman to verify backend correctness and data consistency.",
        "Managed sprint progress and test visibility through JIRA to support transparency across the team.",
        "Conducted integration and regression testing to validate system stability across cross-platform workflows and interdependent service components.",
        "Worked alongside developers and product owners to define test scope, align on acceptance criteria, and ensure all release requirements were thoroughly validated.",
      ],
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
          className={`flex items-center gap-2 sm:gap-3 rounded-full border border-border shadow-[0_2px_20px_rgba(0,0,0,0.07)] backdrop-blur-[8px] bg-white/80 dark:bg-card/85 transition-all duration-300 ${
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

          {/* Links */}
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
          <div
            className={`grid md:grid-cols-3 gap-10 md:gap-16 ${
              aboutReveal.revealed ? "is-revealed" : ""
            }`}
          >
            {/* Bio */}
            <div className="md:col-span-2">
              <p
                className="reveal-item text-[10px] tracking-[0.14em] uppercase text-muted-foreground mb-6 font-semibold"
                style={stagger(0)}
              >
                About
              </p>
              <p
                className="reveal-item text-sm leading-relaxed mb-5 text-foreground"
                style={stagger(1)}
              >
                Product Manager with experience across electric mobility, logistics, fulfillment,
                and education technology, skilled in leading product strategy and cross-functional
                initiatives to deliver scalable solutions. A background in software engineering
                supports a strong ability to translate operational challenges into practical product
                outcomes, including managing high-impact platforms, coordinating regional and global
                teams, and improving service quality through structured analysis.
              </p>
              <blockquote
                className="reveal-item text-sm leading-relaxed text-foreground/70 italic border-l-2 border-accent/30 pl-4"
                style={stagger(2)}
              >
                I believe great products are built where user empathy, operational depth, and data
                clarity meet. My approach is to understand the full ecosystem, from the ground-level
                workflow to the executive dashboard, and turn complexity into focused, scalable
                solutions that teams can actually execute.
              </blockquote>
            </div>

            {/* Education */}
            <div>
              <p
                className="reveal-item text-[10px] tracking-[0.14em] uppercase text-muted-foreground mb-6 font-semibold"
                style={stagger(0)}
              >
                Education
              </p>
              <div className="space-y-5">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="reveal-item flex gap-3"
                    style={stagger(idx + 1)}
                  >
                    {edu.schoolImage && (
                      <img
                        src={edu.schoolImage}
                        alt={edu.school}
                        className="w-9 h-9 object-contain rounded shrink-0 mt-0.5 bg-white p-0.5 border border-border"
                      />
                    )}
                    <div>
                      <p className="text-sm font-semibold leading-snug text-foreground">
                        {edu.degree}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{edu.school}</p>
                      <p className="text-xs text-muted-foreground">{edu.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience (Timeline) ─────────────────────────────── */}
      <section id="experience" className="border-t border-border">
        <div className="container py-20" ref={expReveal.ref}>
          <p className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground mb-12 font-semibold">
            Experience
          </p>

          <div className={`relative ${expReveal.revealed ? "is-revealed" : ""}`}>
            {/* Timeline thread */}
            <div className="absolute left-[17px] top-[46px] bottom-[46px] w-[2px] bg-gradient-to-b from-border via-border/60 to-transparent pointer-events-none" />

            {experiences.map((exp, index) => {
              const isExpanded = expandedIds.has(exp.id);
              const visibleHighlights = isExpanded
                ? exp.highlights
                : exp.highlights.slice(0, 3);
              const extraCount = exp.highlights.length - 3;
              const hasMore = extraCount > 0;

              return (
                <div
                  key={exp.id}
                  className="reveal-item relative flex gap-4 sm:gap-5 mb-8 last:mb-0"
                  style={stagger(index)}
                >
                  {/* Timeline node: logo */}
                  <div className="relative z-10 shrink-0 mt-1.5">
                    <div className="w-9 h-9 rounded bg-white border border-border overflow-hidden flex items-center justify-center shadow-sm">
                      {exp.companyImage && (
                        <img
                          src={exp.companyImage}
                          alt={exp.company}
                          className="w-7 h-7 object-contain"
                        />
                      )}
                    </div>
                  </div>

                  {/* Experience card */}
                  <div className="flex-1 min-w-0 bg-card border border-border rounded-xl p-4 sm:p-5 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-200 cursor-default">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2.5">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-foreground leading-snug">
                          {exp.title}
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        {exp.id === 1 && (
                          <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-bold tracking-wide bg-accent/10 text-accent rounded-full uppercase">
                            Current
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* Company profile */}
                    {exp.companyProfile && (
                      <p className="text-xs text-muted-foreground/75 italic mb-3 leading-relaxed">
                        {exp.companyProfile}
                      </p>
                    )}

                    {/* Highlights */}
                    <ul className="space-y-1.5">
                      {visibleHighlights.map((highlight, idx) => (
                        <li key={idx} className="flex gap-2 text-xs text-muted-foreground">
                          <span className="text-accent mt-0.5 shrink-0 font-bold">·</span>
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Show More toggle */}
                    {hasMore && (
                      <button
                        onClick={() => toggleExpanded(exp.id)}
                        className="flex items-center gap-1 mt-3 text-xs text-muted-foreground hover:text-accent transition-colors duration-150 font-medium"
                      >
                        {isExpanded
                          ? "Show Less"
                          : `${extraCount} more bullet${extraCount > 1 ? "s" : ""}`}
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Part-Time Roles ───────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="container py-20" ref={partTimeReveal.ref}>
          <p className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground mb-12 font-semibold">
            Part-Time Roles
          </p>

          <div className={`relative ${partTimeReveal.revealed ? "is-revealed" : ""}`}>
            {/* Timeline connector line */}
            <div className="absolute left-[17px] top-[50px] bottom-[50px] w-[2px] bg-[#E5E7EB] dark:bg-border pointer-events-none" />

            {partTimeJobs.map((job, idx) => (
              <div
                key={job.id}
                className="reveal-item relative flex gap-5 mb-14 last:mb-0"
                style={stagger(idx)}
              >
                {/* Timeline icon node */}
                <div className="relative z-10 shrink-0 mt-8">
                  <div className="w-9 h-9 rounded bg-white border border-[#E5E7EB] overflow-hidden flex items-center justify-center shadow-sm">
                    {job.companyImage && (
                      <img
                        src={job.companyImage}
                        alt={job.company}
                        className="w-7 h-7 object-contain"
                      />
                    )}
                  </div>
                </div>

                {/* Refined card */}
                <div
                  className="flex-1 min-w-0 bg-white dark:bg-card border border-[#E5E7EB] dark:border-border rounded-xl p-8 hover:border-accent/40 dark:hover:border-accent/40 transition-colors duration-200"
                  style={{ boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)" }}
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-foreground leading-snug">
                        {job.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {job.company} · {job.period}
                      </p>
                    </div>
                    <span className="shrink-0 text-[9px] font-semibold tracking-[0.05em] uppercase text-muted-foreground/60 bg-secondary border border-border rounded px-2 py-0.5">
                      Part-Time
                    </span>
                  </div>

                  {/* Company description */}
                  {job.description && (
                    <p className="text-xs text-muted-foreground/70 italic mb-4 leading-relaxed">
                      {job.description}
                    </p>
                  )}

                  {/* Bullet highlights */}
                  <ul className="space-y-2">
                    {job.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-xs text-muted-foreground"
                        style={{ lineHeight: "1.6" }}
                      >
                        <span className="mt-[5px] w-1 h-1 rounded-full bg-muted-foreground/35 shrink-0 flex-none" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Internships ───────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="container py-20" ref={internReveal.ref}>
          <p className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground mb-12 font-semibold">
            Internships
          </p>

          <div className={`relative ${internReveal.revealed ? "is-revealed" : ""}`}>
            {/* Timeline connector line */}
            <div className="absolute left-[17px] top-[50px] bottom-[50px] w-[2px] bg-[#E5E7EB] dark:bg-border pointer-events-none" />

            {internships.map((internship, idx) => (
              <div
                key={idx}
                className="reveal-item relative flex gap-5 mb-14 last:mb-0"
                style={stagger(idx)}
              >
                {/* Timeline icon node */}
                <div className="relative z-10 shrink-0 mt-8">
                  <div className="w-9 h-9 rounded bg-white border border-[#E5E7EB] overflow-hidden flex items-center justify-center shadow-sm">
                    {internship.companyImage && (
                      <img
                        src={internship.companyImage}
                        alt={internship.company}
                        className="w-7 h-7 object-contain"
                      />
                    )}
                  </div>
                </div>

                {/* Refined card */}
                <div
                  className="flex-1 min-w-0 bg-white dark:bg-card border border-[#E5E7EB] dark:border-border rounded-xl p-8 hover:border-accent/40 dark:hover:border-accent/40 transition-colors duration-200"
                  style={{ boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)" }}
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-foreground leading-snug">
                        {internship.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {internship.company} · {internship.period}
                      </p>
                    </div>
                    <span className="shrink-0 text-[9px] font-semibold tracking-[0.05em] uppercase text-muted-foreground/60 bg-secondary border border-border rounded px-2 py-0.5">
                      Internship
                    </span>
                  </div>

                  {/* Company profile */}
                  {internship.companyProfile && (
                    <p className="text-xs text-muted-foreground/70 italic mb-3 leading-relaxed">
                      {internship.companyProfile}
                    </p>
                  )}

                  {/* Responsibility */}
                  {internship.responsibility && (
                    <p
                      className="text-xs text-muted-foreground"
                      style={{ lineHeight: "1.6" }}
                    >
                      {internship.responsibility}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────── */}
      <section id="skills" className="border-t border-border">
        <div className="container py-20" ref={skillsReveal.ref}>
          <p className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground mb-9 font-semibold">
            Skills
          </p>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-8 ${
              skillsReveal.revealed ? "is-revealed" : ""
            }`}
          >
            {Object.entries(skills).map(([category, items], catIdx) => (
              <div key={category} className="reveal-item" style={stagger(catIdx)}>
                <h3 className="text-xs font-semibold text-foreground/60 mb-3 tracking-[0.08em] uppercase">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
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
            <div className="flex flex-col gap-3">
              {contactLinks.map(({ href, icon, label, staggerIdx, external }) => (
                <a
                  key={href}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="reveal-item inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group w-fit"
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
