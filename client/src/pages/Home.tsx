import { Mail, Linkedin, Instagram, MapPin, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const experiences = [
    {
      id: 1,
      title: "Lead Country Product Manager - ID Market",
      company: "GSM - Xanh SM",
      companyProfile: "Vietnamese-founded electric ride-hailing company committed to sustainable urban mobility across Southeast Asia. Backed by VinGroup, Xanh SM operates a fully electric fleet and is expanding rapidly across key markets, with Indonesia positioned as a critical growth frontier alongside Vietnam, Thailand, and the Philippines.",
      companyImage: "https://media.licdn.com/dms/image/v2/D560BAQG5Xqveq4buhg/company-logo_200_200/company-logo_200_200/0/1731636708850/greensmartmobility_logo?e=1773273600&v=beta&t=Q6qJwyL1Q3ofHqnlzuetOUmPcP83yX7TJbxOh5apik4",
      location: "Jakarta, Indonesia",
      period: "Jul 2025 - Present",
      highlights: [
        "Own end-to-end product strategy and execution for Xanh SM Indonesia, ensuring the digital ecosystem supports business growth, operational scalability, and service quality.",
        "Define the national product roadmap and align it with regional and global priorities, balancing local operational needs, market behaviour, and regulatory requirements.",
        "Drive cross-functional collaboration with engineering, design, operations, finance, and data teams to ensure consistent and high-quality feature delivery at every stage.",
        "Serve as the primary liaison between Indonesia leadership and the global product organization, maintaining alignment on priorities, timelines, and long-term direction.",
        "Monitor key product metrics and platform performance indicators, translating data-driven insights into prioritised improvements that sustain business momentum and service reliability."
      ]
    },
    {
      id: 2,
      title: "Product Manager - Performance Evaluation & Data Integration",
      company: "INA Digital Edu - Ministry of Primary and Secondary Education",
      companyProfile: "A government-led digital transformation initiative under Indonesia's Ministry of Primary and Secondary Education, focused on building national-scale platforms for teacher performance evaluation, institutional accountability, and data-driven decision-making across more than 500,000 schools and millions of educators nationwide.",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/cJhNVtPdbOHZIgCZ.png",
      location: "Jakarta, Indonesia",
      period: "Aug 2024 - Aug 2025",
      highlights: [
        "Led the development of performance management tools and national-scale data integration systems, improving accountability across 500,000+ schools.",
        "Defined the product vision and roadmap aligned with ministry priorities, ensuring regulatory compliance at every release cycle.",
        "Established measurement frameworks to assess tool effectiveness and drove continuous, data-grounded improvements.",
        "Facilitated discovery sessions with ministry officials and educators to capture nuanced needs and ensure platform relevance across stakeholder groups."
      ]
    },
    {
      id: 3,
      title: "Senior Associate, System Product Lead - SPX Express",
      company: "Shopee",
      companyProfile: "One of Southeast Asia's largest e-commerce platforms, with a dedicated logistics arm, SPX Express (formerly Shopee Xpress), managing end-to-end delivery operations across first, middle, and last mile in multiple countries. SPX Express processes millions of parcels daily, serving a growing network of sellers, hubs, and delivery partners across the region.",
      companyImage: "https://media.licdn.com/dms/image/v2/C560BAQE0iX_dgdH7nA/company-logo_200_200/company-logo_200_200/0/1672279162763/shopee_logo?e=1773273600&v=beta&t=jlKIMPDqPZbW-4BSR5HmYJVM6SlcapRqyMCtSCGl768",
      location: "Jakarta, Indonesia",
      period: "Mar 2024 - Jul 2024",
      highlights: [
        "Directed a team maintaining and enhancing the Fleet Management System across First, Middle, and Last Mile operations for millions of daily parcels.",
        "Managed end-to-end delivery of system enhancements that improved operational throughput and process sustainability.",
        "Analysed operational data to surface inefficiencies and translate findings into prioritised, actionable improvements.",
        "Partnered with Business, Finance, Strategy, BI, and Operations to keep system capabilities aligned with daily demand."
      ]
    },
    {
      id: 4,
      title: "Product Manager - Fulfillment",
      company: "Tokopedia & GoTo Logistics",
      companyProfile: "Tokopedia is Indonesia's largest homegrown e-commerce marketplace, merged with Gojek to form the GoTo Group. GoTo Logistics serves as the group's integrated logistics arm, powering warehousing, fulfilment, and last-mile delivery for millions of sellers and buyers across the country, operating at a scale that positions it as one of Indonesia's leading logistics infrastructure providers.",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/ZYnBvsLmQkohgFkj.png",
      location: "Jakarta, Indonesia",
      period: "Feb 2022 - Mar 2024",
      highlights: [
        "Reduced fulfillment turnaround time and elevated service levels through targeted operational and product improvements.",
        "Led WMS enhancements that delivered measurable gains in warehouse productivity, data accuracy, and process standardisation.",
        "Managed Tokopedia Seller Platform–WMS integration, ensuring seamless and real-time data synchronisation at scale.",
        "Applied data analytics to monitor performance trends and implement improvements that raised overall service quality."
      ]
    },
    {
      id: 5,
      title: "Quality Engineer - Accommodation",
      company: "Traveloka",
      companyProfile: "Southeast Asia's leading travel and lifestyle super-app, serving millions of users across six countries. Traveloka's platform spans flights, hotels, car rentals, activities, and financial products, supported by a technology infrastructure built to handle high-volume transactions and complex travel experiences across a diverse and fast-growing regional market.",
      companyImage: "https://media.licdn.com/dms/image/v2/D560BAQGe_izwxvj_SQ/company-logo_200_200/company-logo_200_200/0/1700635813325/traveloka_logo?e=1773273600&v=beta&t=bOObxNgTa_cE27Qpaljq9RoLoVxqtvAUdWwgbjbQdiU",
      location: "Jakarta, Indonesia",
      period: "Nov 2019 - Feb 2022",
      highlights: [
        "Owned quality across Android, iOS, Web, and mobile web for the Accommodation team, maintaining high-quality standards across all release cycles.",
        "Led the weekly Web release process, ensuring stable deployments and consistent platform performance.",
        "Sustained automation coverage using Selenium, Java, and TestNG and validated backend correctness through Postman API testing."
      ]
    },
    {
      id: 6,
      title: "QA Engineer - Taxi Group",
      company: "Ice House",
      companyProfile: "Indonesia's leading mobile app development agency and the first Google Certified Developer in Southeast Asia. Ice House builds and maintains high-performance applications and backends for enterprise clients across financial services, logistics, transportation, e-commerce, and entertainment, with a team of 500+ engineers serving major brands across the region.",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/hLmBFNBFYNwCqgOT.png",
      location: "Jakarta, Indonesia",
      period: "Nov 2019 - Nov 2020",
      highlights: [
        "Tested the MyBluebird application across Android, Web, and API to maintain functional and integration quality.",
        "Built test cases in TestRail and maintained automation scripts using Postman and Katalon Studio, improving testing efficiency and release stability.",
        "Collaborated with BAs, POs, engineers, and designers to clarify requirements and resolve issues throughout each sprint."
      ]
    }
  ];

  const skills = {
    "Product Management": ["Product Management", "Product Strategy", "Change Management", "Backlog Prioritization", "User-Centered Design", "Risk Management"],
    "Leadership": ["Cross-Functional Team Leadership", "Stakeholder Management and Alignment", "Project Management", "Negotiation"],
    "Technical": ["SDLC", "Software Testing", "Data Analysis", "API Testing", "Automation Testing", "Process Improvement"],
    "Methodologies": ["Agile Methodologies", "Scrum", "Kanban", "Sprint Planning", "Continuous Refinement"]
  };

  const education = [
    {
      degree: "Master of Business Administration",
      school: "Bandung Institute of Technology",
      schoolImage: "https://media.licdn.com/dms/image/v2/C560BAQGJoYkUiQpUKA/company-logo_200_200/company-logo_200_200/0/1630672186443/itb_logo?e=1773273600&v=beta&t=ofyRWEblbh2qjZR2HYOofN8zQ-M_gy2yhiVMyS5J334",
      date: "Expected 05/2026"
    },
    {
      degree: "Bachelor of Computer Science",
      school: "Del Institute of Technology",
      schoolImage: "https://media.licdn.com/dms/image/v2/C560BAQESCZFZZqVyng/company-logo_200_200/company-logo_200_200/0/1631389462084?e=1773273600&v=beta&t=jNYjv_W6atTEERBs7tTk78Yhl1xnfkRZGPXuT4rcyLY",
      date: "09/2019"
    }
  ];

  const partTimeJobs = [
    {
      id: 1,
      title: "QA Engineer - Part-time",
      company: "SehatQ",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/iWSWOgSUpfIhugUD.png",
      location: "Jakarta, Indonesia",
      period: "Feb 2022 - Feb 2023",
      description: "Indonesian health tech startup offering a full suite of health-related services through its digital platform, covering teleconsultation, medicine delivery, and e-commerce.",
      highlights: [
        "Contributed to the eCommerce and Merchant squad, conducting tests across Android, iOS, Web, and mobile web to maintain consistent product quality.",
        "Built structured test cases in Xray and executed manual tests, while monitoring active bugs and communicating quality status with product management throughout each sprint.",
        "Managed sprint tracking and test progress visibility through JIRA throughout the development cycle.",
        "Performed regression and exploratory testing each sprint to identify edge cases and maintain consistent quality across all supported platforms and user flows.",
        "Collaborated closely with developers and product owners to clarify acceptance criteria and align on expected outcomes before and during testing cycles."
      ]
    },
    {
      id: 2,
      title: "QA Engineer - Part-time",
      company: "SiCepat",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/vtUAAIQhTvYAhdQP.png",
      location: "Jakarta, Indonesia",
      period: "Aug 2021 - Feb 2022",
      description: "Indonesian express courier company founded in 2014, specialising in 15-hour delivery for Jabodetabek and Bandung areas and same-day delivery across major cities throughout Indonesia.",
      highlights: [
        "Contributed to the CMS and Integration team, executing tests across Android, API, and Web platforms to support consistent release quality.",
        "Developed structured test cases in TestRail and performed API testing using Postman to verify backend correctness and data consistency.",
        "Managed sprint progress and test visibility through JIRA to support transparency across the team.",
        "Conducted integration and regression testing to validate system stability across cross-platform workflows and interdependent service components.",
        "Worked alongside developers and product owners to define test scope, align on acceptance criteria, and ensure all release requirements were thoroughly validated."
      ]
    }
  ];

  const internships = [
    {
      title: "QA Engineer Intern",
      company: "Moka (GoTo Financial)",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/fMzZvBYHbNOGcXlH.png",
      period: "Sep 2019 - Nov 2019",
      companyProfile: "Cloud-based POS and business management platform acquired by GoTo Financial.",
      responsibility: "Supported the Moka POS Backoffice Inventory team in ensuring smooth operations and high-quality product deliverables throughout the internship period."
    },
    {
      title: "QA Engineer Intern",
      company: "Grab Indonesia",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/bUAqVpvhsLeEvRro.png",
      period: "Jun 2019 - Sep 2019",
      companyProfile: "Southeast Asia's leading superapp for ride-hailing, deliveries, and financial services.",
      responsibility: "Automated API testing for payment systems using Postman and developed robust UI automation using Robot Framework and Appium."
    },
    {
      title: "QA Engineer Intern",
      company: "DANA Indonesia",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/JlXCSsTrCXQVouBa.png",
      period: "Jun 2018 - Sep 2018",
      companyProfile: "Indonesia's leading digital wallet platform.",
      responsibility: "Played an active role in the BukaDANA project and KYC processes, ensuring seamless functionality and consistent product quality."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Navigation */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <nav className="container py-3.5 flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png"
              alt="Ricky Halomoan"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-border"
            />
            <span className="text-sm font-semibold tracking-tight">Ricky Halomoan</span>
          </div>
          <div className="flex-1 flex justify-end gap-5 md:gap-7 text-xs md:text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors duration-200 font-medium">About</a>
            <a href="#experience" className="hover:text-foreground transition-colors duration-200 font-medium">Experience</a>
            <a href="#skills" className="hover:text-foreground transition-colors duration-200 font-medium">Skills</a>
            <a href="#contact" className="hover:text-foreground transition-colors duration-200 font-medium">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container pt-14 md:pt-20 pb-14 md:pb-20 text-center">
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 mb-6">
          <p className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground font-semibold">
            <span className="w-5 h-px bg-accent inline-block"></span>
            Senior Product Manager
          </p>
          <span className="text-muted-foreground/30">·</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin size={11} />
            <span>Jakarta, Indonesia</span>
            <span className="ml-0.5">🇮🇩</span>
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-5 leading-[1.05] text-foreground">
          Ricky Halomoan
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl font-light text-muted-foreground mb-3 leading-relaxed">
          Building digital products that move businesses forward.
        </p>

        <p className="text-sm text-muted-foreground/70 mb-10 tracking-wide">
          Logistics · Fulfillment · Electric Mobility · Digital Transformation
        </p>

        <div className="flex flex-wrap justify-center items-center gap-3">
          <a href="#contact">
            <button className="bg-foreground text-background hover:bg-foreground/85 px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
              Let's Work Together
            </button>
          </a>
          <a href="#experience">
            <button className="border border-border text-foreground hover:bg-secondary hover:border-muted px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200">
              View My Work
            </button>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-secondary border-t border-border">
        <div className="container py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-10 md:gap-14">
            <div className="md:col-span-2">
              <h2 className="flex items-center gap-2.5 text-[10px] tracking-widest uppercase text-muted-foreground mb-5 font-bold">
                <span className="w-4 h-px bg-accent"></span>About
              </h2>
              <p className="text-sm leading-relaxed mb-4 text-foreground/80">
                Senior Product Manager with experience across electric mobility, logistics, fulfillment, and education technology. Proven ability to lead product strategy, manage complex cross-functional initiatives, and deliver digital solutions that support business scale.
              </p>
              <p className="text-sm leading-relaxed mb-4 text-foreground/80">
                A background in software engineering and quality assurance enables a strong capacity to translate operational challenges into practical product outcomes. Experienced in managing high-impact platforms, driving coordinated execution across regional and global teams, and improving service quality through structured analysis and continuous refinement. Currently pursuing an MBA at SBM ITB to deepen capabilities in strategy, organization, and leadership.
              </p>
              <p className="text-sm leading-relaxed text-foreground/60 italic border-l-2 border-accent/40 pl-3">
                I believe great products are built where user empathy, operational depth, and data clarity meet. My approach is to understand the full ecosystem — from the ground-level workflow to the executive dashboard — and turn complexity into focused, scalable solutions that teams can actually execute.
              </p>
            </div>
            <div>
              <h2 className="flex items-center gap-2.5 text-[10px] tracking-widest uppercase text-muted-foreground mb-5 font-bold">
                <span className="w-4 h-px bg-accent"></span>Education
              </h2>
              <div className="space-y-5">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex gap-3">
                    {edu.schoolImage && (
                      <img src={edu.schoolImage} alt={edu.school} className="w-9 h-9 object-contain rounded-md shrink-0 mt-0.5 bg-white p-0.5 border border-border" />
                    )}
                    <div>
                      <p className="text-sm font-semibold leading-snug text-foreground">{edu.degree}</p>
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

      {/* Experience Section */}
      <section id="experience" className="container py-12 md:py-16 border-t border-border">
        <h2 className="flex items-center gap-2.5 text-[10px] tracking-widest uppercase text-muted-foreground mb-9 font-bold">
          <span className="w-4 h-px bg-accent"></span>Experience
        </h2>
        <div>
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-7 pb-7 border-b border-border last:border-b-0 last:pb-0 last:mb-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2.5 gap-1">
                <div className="flex gap-3">
                  {exp.companyImage && (
                    <img src={exp.companyImage} alt={exp.company} className="w-9 h-9 object-contain rounded-md shrink-0 mt-0.5 bg-white p-0.5 border border-border" />
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground leading-snug">{exp.title}</h3>
                    <p className="text-xs text-muted-foreground font-medium mt-0.5">{exp.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:ml-4 shrink-0 pl-12 sm:pl-0">
                  {exp.id === 1 && (
                    <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-bold tracking-wide bg-accent/10 text-accent rounded uppercase">
                      Current
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{exp.period}</span>
                </div>
              </div>

              {exp.companyProfile && (
                <p className="text-xs text-muted-foreground italic mb-2.5 mt-1 leading-relaxed pl-12">{exp.companyProfile}</p>
              )}

              <ul className="text-xs text-muted-foreground space-y-1.5 pl-12">
                {exp.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0 font-bold">·</span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Part-time Work Section */}
      <section className="bg-secondary border-t border-border">
        <div className="container py-12 md:py-16">
          <h2 className="flex items-center gap-2.5 text-[10px] tracking-widest uppercase text-muted-foreground mb-9 font-bold">
            <span className="w-4 h-px bg-accent"></span>Part-Time Roles
          </h2>
          <div>
            {partTimeJobs.map((job) => (
              <div key={job.id} className="mb-7 pb-7 border-b border-border last:border-b-0 last:pb-0 last:mb-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2.5 gap-1">
                  <div className="flex gap-3">
                    {job.companyImage && (
                      <img src={job.companyImage} alt={job.company} className="w-9 h-9 object-contain rounded-md shrink-0 mt-0.5 bg-white p-0.5 border border-border" />
                    )}
                    <div>
                      <h3 className="text-sm font-semibold text-foreground leading-snug">{job.title}</h3>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">{job.company}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap sm:ml-4 pl-12 sm:pl-0">{job.period}</span>
                </div>

                {job.description && (
                  <p className="text-xs text-muted-foreground italic mb-2.5 mt-1 leading-relaxed pl-12">{job.description}</p>
                )}

                <ul className="text-xs text-muted-foreground space-y-1.5 pl-12">
                  {job.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-accent mt-0.5 shrink-0 font-bold">·</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internships Section */}
      <section className="container py-12 md:py-16 border-t border-border">
        <h2 className="flex items-center gap-2.5 text-[10px] tracking-widest uppercase text-muted-foreground mb-9 font-bold">
          <span className="w-4 h-px bg-accent"></span>Internships
        </h2>
        <div>
          {internships.map((internship, idx) => (
            <div key={idx} className="mb-6 pb-6 border-b border-border last:border-b-0 last:pb-0 last:mb-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1">
                <div className="flex gap-3">
                  {internship.companyImage && (
                    <img src={internship.companyImage} alt={internship.company} className="w-9 h-9 object-contain rounded-md shrink-0 mt-0.5 bg-white p-0.5 border border-border" />
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground leading-snug">{internship.title}</h3>
                    <p className="text-xs text-muted-foreground font-medium mt-0.5">{internship.company}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap sm:ml-4 pl-12 sm:pl-0">{internship.period}</span>
              </div>

              {internship.companyProfile && (
                <p className="text-xs text-muted-foreground italic mt-1.5 leading-relaxed pl-12">{internship.companyProfile}</p>
              )}

              {internship.responsibility && (
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed pl-12">{internship.responsibility}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-secondary border-t border-border">
        <div className="container py-12 md:py-16">
          <h2 className="flex items-center gap-2.5 text-[10px] tracking-widest uppercase text-muted-foreground mb-9 font-bold">
            <span className="w-4 h-px bg-accent"></span>Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-xs font-bold text-foreground mb-3 tracking-wide uppercase">{category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-background text-foreground/75 text-xs rounded-md border border-border hover:border-accent/40 hover:text-foreground transition-colors duration-150 font-medium"
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

      {/* Contact Section */}
      <section id="contact" className="border-t border-border">
        <div className="container py-14 md:py-20">
          <h2 className="flex items-center gap-2.5 text-[10px] tracking-widest uppercase text-muted-foreground mb-4 font-bold">
            <span className="w-4 h-px bg-accent"></span>Contact
          </h2>
          <p className="text-sm text-muted-foreground mb-9 max-w-md leading-relaxed">
            Open to new opportunities and collaborations. Feel free to reach out via email or connect on social media.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:rickytampubolon97@gmail.com"
              className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group w-fit"
            >
              <span className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-200 shrink-0">
                <Mail size={15} />
              </span>
              rickytampubolon97@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/rickyhlmn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group w-fit"
            >
              <span className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-200 shrink-0">
                <Linkedin size={15} />
              </span>
              linkedin.com/in/rickyhlmn
            </a>
            <a
              href="https://www.instagram.com/rickyhlmn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group w-fit"
            >
              <span className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-200 shrink-0">
                <Instagram size={15} />
              </span>
              @rickyhlmn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-6 border-t border-border">
        <p className="text-xs text-muted-foreground">Ricky Halomoan © 2026</p>
      </footer>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-foreground text-background p-2.5 rounded-full shadow-lg hover:bg-foreground/85 transition-all duration-200 z-50"
          aria-label="Back to top"
        >
          <ChevronUp size={16} />
        </button>
      )}
    </div>
  );
}
