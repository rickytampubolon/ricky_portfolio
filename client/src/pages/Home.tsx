import { Mail, Linkedin, Instagram } from "lucide-react";

export default function Home() {
  const experiences = [
    {
      id: 1,
      title: "Lead Country Product Manager",
      company: "GSM - Xanh SM",
      companyProfile: "Vietnamese-founded electric ride-hailing company expanding across Southeast Asia, with Indonesia as a key growth market.",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/JlXCSsTrCXQVouBa.png",
      location: "Jakarta, Indonesia",
      period: "Jul 2025 - Present",
      description: "",
      highlights: [
        "Own end-to-end product strategy and execution for Xanh SM Indonesia, ensuring the digital ecosystem supports business growth, operational scalability, and service quality.",
        "Define the national product roadmap and align it with regional and global priorities, balancing local operational needs, market behaviour, and regulatory requirements.",
        "Oversee the development and continuous enhancement of driver-facing platforms, rider flows, corporate solutions, and internal operational systems across multiple business units.",
        "Drive cross-functional collaboration with engineering, design, operations, finance, and data teams to ensure consistent and high-quality feature delivery at every stage.",
        "Lead market localization efforts by refining pricing logic, payment flows, loyalty programs, and fleet-management processes to meet Indonesian user expectations.",
        "Leverage operational and behavioural data to identify performance gaps, improve user journeys, and strengthen service reliability for both drivers and passengers.",
        "Coordinate pilot programs and national rollout plans, ensuring readiness across operations, engineering, and leadership before scaling.",
        "Serve as the primary liaison between Indonesia leadership and the global product organization, maintaining alignment on priorities, timelines, and long-term direction.",
        "Champion operational excellence by streamlining workflows, communication channels, and cross-team coordination to reduce friction in daily service execution."
      ]
    },
    {
      id: 2,
      title: "Product Manager - Performance Evaluation & Data Integration",
      company: "INA Digital Edu - Ministry of Primary and Secondary Education",
      companyProfile: "Government digital initiative building national-scale platforms to improve accountability and data-driven decision-making across Indonesia's education sector.",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/cJhNVtPdbOHZIgCZ.png",
      location: "Jakarta, Indonesia",
      period: "Aug 2024 - Aug 2025",
      description: "",
      highlights: [
        "Led the development of performance management tools and national-scale data integration systems to improve accountability and operational efficiency across the education sector.",
        "Defined the product vision and roadmap, ensuring platform development remained aligned with ministry priorities and strategic goals.",
        "Engaged with internal teams, regional education offices, and external partners to capture field realities and translate feedback into meaningful system improvements.",
        "Managed the full delivery lifecycle from research and ideation through user testing and release, maintaining compliance with national education standards.",
        "Coordinated closely with engineering, data, and UX teams to uphold development stability and regulatory compliance throughout each release cycle.",
        "Strengthened institutional adoption through targeted training sessions and ongoing support for educational organizations across the country.",
        "Analysed usage data, user behaviour, and evaluation patterns to sharpen product decisions and improve overall platform engagement.",
        "Established measurement frameworks to assess the effectiveness of performance management tools and drove continuous improvements grounded in data-driven insights."
      ]
    },
    {
      id: 3,
      title: "Senior Associate, System Product Lead",
      company: "Shopee",
      companyProfile: "One of Southeast Asia's largest e-commerce platforms, operating an integrated logistics arm (Shopee Xpress) covering first, middle, and last mile delivery across the region.",
      companyImage: "https://media.licdn.com/dms/image/v2/C560BAQE0iX_dgdH7nA/company-logo_200_200/company-logo_200_200/0/1672279162763/shopee_logo?e=1773273600&v=beta&t=jlKIMPDqPZbW-4BSR5HmYJVM6SlcapRqyMCtSCGl768",
      location: "Jakarta, Indonesia",
      period: "Mar 2024 - Jul 2024",
      description: "",
      highlights: [
        "Directed a team responsible for maintaining and enhancing the Fleet Management System across First Mile, Middle Mile, and Last Mile operations.",
        "Partnered with Business, Finance, Strategy, Business Intelligence, Process Improvement, and Operations teams to keep system capabilities aligned with daily operational demands.",
        "Managed end-to-end planning, tracking, and delivery of system enhancements to strengthen process sustainability and improve operational throughput.",
        "Coordinated cross-team responses to system issues, ensuring timely resolutions within established SLA parameters.",
        "Authored Functional Requirement Specifications and Business Requirement Documents, and facilitated UAT sessions to maintain consistent quality across all feature releases.",
        "Developed new system features that improved workflow consistency and supported sustained efficiency across multiple logistics functions.",
        "Analysed operational data and performance metrics to surface inefficiencies, recommend improvements, and inform decision-making with actionable insights."
      ]
    },
    {
      id: 4,
      title: "Product Manager - Fulfillment",
      company: "Tokopedia & GoTo Logistics",
      companyProfile: "Tokopedia is Indonesia's largest homegrown e-commerce marketplace; GoTo Logistics is the group's integrated logistics arm powering fulfilment services for sellers and buyers at scale.",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/ZYnBvsLmQkohgFkj.png",
      location: "Jakarta, Indonesia",
      period: "Feb 2022 - Mar 2024",
      description: "",
      highlights: [
        "Drove Fulfillment team performance by reducing turnaround time and elevating service levels through targeted operational and product improvements.",
        "Led enhancements to the Warehouse Management System, resulting in measurable gains in productivity, data accuracy, and process standardization.",
        "Managed the integration between the Tokopedia Seller Platform and WMS to ensure seamless, accurate, and real-time data synchronization.",
        "Oversaw both the Inbound and Integration teams, strengthening cross-team collaboration and improving handover processes between operational functions.",
        "Applied data analytics to inform product decisions, monitor performance trends, and implement improvements that raised overall service quality.",
        "Managed the full product development lifecycle across multiple initiatives, ensuring smooth progression from concept through to launch.",
        "Developed a long-term WMS improvement strategy aligned with broader business objectives and evolving market conditions.",
        "Refined product features continuously through user feedback, market analysis, and close collaboration with operational leaders."
      ]
    },
    {
      id: 5,
      title: "Quality Engineer - Accommodation",
      company: "Traveloka",
      companyProfile: "Southeast Asia's leading travel and lifestyle super-app, offering flights, hotels, attractions, and financial products to millions of users across the region.",
      companyImage: "https://media.licdn.com/dms/image/v2/D560BAQGe_izwxvj_SQ/company-logo_200_200/company-logo_200_200/0/1700635813325/traveloka_logo?e=1773273600&v=beta&t=bOObxNgTa_cE27Qpaljq9RoLoVxqtvAUdWwgbjbQdiU",
      location: "Jakarta, Indonesia",
      period: "Nov 2019 - Feb 2022",
      description: "",
      highlights: [
        "Conducted comprehensive testing across Android, iOS, Web, and mobile web platforms to uphold high-quality standards for the Accommodation product team.",
        "Collaborated with Software Engineers, Product Managers, and Designers to strengthen feature reliability and improve the overall user experience.",
        "Participated actively in sprint planning, grooming, retrospectives, and daily standups to support cross-team efficiency and delivery alignment.",
        "Led the weekly Web release process, ensuring stable deployments and consistent platform performance across each cycle.",
        "Developed and maintained structured test cases to improve coverage predictability and long-term testing consistency.",
        "Executed detailed manual tests and sustained automation coverage using Selenium, Java, and TestNG to strengthen release reliability.",
        "Conducted API testing via Postman to validate backend correctness and ensure data consistency across services."
      ]
    },
    {
      id: 6,
      title: "QA Engineer - Taxi Group",
      company: "Ice House",
      companyProfile: "Indonesia's leading mobile app development agency and the first Google Certified Developer in Southeast Asia, building and maintaining apps and backends for leading companies across financial services, logistics, transportation, e-commerce, entertainment, and more.",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/hLmBFNBFYNwCqgOT.png",
      location: "Jakarta, Indonesia",
      period: "Nov 2019 - Nov 2020",
      description: "",
      highlights: [
        "Contributed to the MyBluebird application through extensive functional and integration testing across Android, Web, and API components.",
        "Validated end-to-end user flows, ensured cross-platform consistency, and monitored feature behaviour across multiple release cycles.",
        "Collaborated with Business Analysts, Product Owners, Engineers, and Designers to clarify requirements, refine user flows, and resolve issues identified during testing.",
        "Supported sprint ceremonies and worked alongside the development team to address defects, performance gaps, and regression issues before they reached production.",
        "Built detailed test cases in TestRail and maintained automation scripts using Postman and Katalon Studio to improve long-term testing efficiency and release stability."
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
      date: "Expected 05/2026"
    },
    {
      degree: "Bachelor of Computer Science",
      school: "Del Institute of Technology",
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
        "Contributed to the eCommerce and Merchant squad, conducting tests across Android, iOS, Web, and mobile web platforms to maintain consistent product quality.",
        "Worked alongside Software Engineers, Product Managers, and Designers to validate features and ensure a reliable user experience across all touchpoints.",
        "Participated in sprint planning, grooming, retrospectives, daily standups, and sprint reviews to stay closely aligned with team delivery cycles.",
        "Monitored quality status for active bugs across product features and maintained clear, ongoing communication with product management on business logic and application behaviour.",
        "Built structured test cases in Xray and executed manual tests to ensure thorough coverage ahead of each release.",
        "Managed sprint tracking and test progress visibility through JIRA throughout the development cycle."
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
        "Collaborated with Software Engineers, Product Managers, and Designers to clarify requirements and resolve issues surfaced during testing.",
        "Participated in sprint planning, grooming, retrospectives, daily standups, and sprint reviews to maintain alignment with the broader team delivery process.",
        "Monitored quality status for active bugs and communicated clearly with product management on application behaviour and business rules throughout each sprint.",
        "Developed structured test cases in TestRail and ran manual tests to maintain thorough and consistent coverage across release cycles.",
        "Performed API testing using Postman to verify backend correctness and ensure data consistency across integrated services.",
        "Managed sprint progress and test visibility through JIRA to support transparency across the team."
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
      highlights: [
        "Supported the Moka POS Backoffice Inventory team in ensuring smooth operations and high-quality product deliverables throughout the internship period."
      ]
    },
    {
      title: "QA Engineer Intern",
      company: "Grab Indonesia",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/bUAqVpvhsLeEvRro.png",
      period: "Jun 2019 - Sep 2019",
      companyProfile: "Southeast Asia's leading superapp for ride-hailing, deliveries, and financial services.",
      highlights: [
        "Automated API testing for payment systems using Postman.",
        "Developed robust UI automation using Robot Framework and Appium."
      ]
    },
    {
      title: "QA Engineer Intern",
      company: "DANA Indonesia",
      companyImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/JlXCSsTrCXQVouBa.png",
      period: "Jun 2018 - Sep 2018",
      companyProfile: "Indonesia's leading digital wallet platform.",
      highlights: [
        "Played an active role in the BukaDANA project and KYC processes, ensuring seamless functionality and consistent product quality."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Navigation */}
      <header className="sticky top-0 bg-background border-b border-border z-50">
        <nav className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/FytkfOyUipkYiXSh.png" alt="Ricky Halomoan" className="w-7 h-7 rounded-full object-cover" />
            <span className="text-base font-semibold tracking-tight">Ricky Halomoan</span>
          </div>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition">About</a>
            <a href="#experience" className="hover:text-foreground transition">Experience</a>
            <a href="#skills" className="hover:text-foreground transition">Skills</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container pt-12 pb-8">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Senior Product Manager</p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-3">Ricky Halomoan T.</h1>
        <p className="text-2xl md:text-3xl font-light text-muted-foreground mb-7 tracking-tight">
          Building digital products that<br className="hidden md:block" /> move businesses forward.
        </p>

        <div className="flex items-center gap-4">
          <a href="mailto:rickytampubolon97@gmail.com">
            <button className="bg-foreground text-background hover:opacity-80 px-5 py-2 text-sm rounded transition">
              Get in Touch
            </button>
          </a>
          <a href="https://drive.google.com/uc?export=download&id=17Nb74FFTxtJOh-lMQcZCONSWQP0KJ_de" target="_blank" rel="noopener noreferrer">
            <button className="border border-border text-foreground hover:bg-secondary px-5 py-2 text-sm rounded transition">
              Download Resume
            </button>
          </a>
          <div className="flex gap-3 ml-1">
            <a href="mailto:rickytampubolon97@gmail.com" className="text-muted-foreground hover:text-foreground transition">
              <Mail size={18} />
            </a>
            <a href="https://www.linkedin.com/in/rickyhalomoan" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">
              <Linkedin size={18} />
            </a>
            <a href="https://www.instagram.com/rickyhlmn/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container py-8 border-t border-border">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-4">About</h2>
            <p className="text-sm leading-relaxed mb-3">
              Senior Product Manager with experience across electric mobility, logistics, fulfillment, and education technology. Proven ability to lead product strategy, manage complex cross-functional initiatives, and deliver digital solutions that support business scale.
            </p>
            <p className="text-sm leading-relaxed">
              A background in software engineering and quality assurance enables a strong capacity to translate operational challenges into practical product outcomes. Experienced in managing high-impact platforms, driving coordinated execution across regional and global teams, and improving service quality through structured analysis and continuous refinement. Currently pursuing an MBA at SBM ITB to deepen capabilities in strategy, organization, and leadership.
            </p>
          </div>
          <div>
            <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Education</h2>
            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <p className="text-sm font-medium leading-snug">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{edu.school}</p>
                  <p className="text-xs text-muted-foreground">{edu.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="container py-8 border-t border-border">
        <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-6">Experience</h2>
        <div>
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-7 pb-7 border-b border-border last:border-b-0 last:pb-0 last:mb-0">
              <div className="flex items-start justify-between mb-1.5">
                <div>
                  <h3 className="text-base font-semibold text-foreground leading-snug">{exp.title}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    {exp.companyImage && (
                      <img src={exp.companyImage} alt={exp.company} className="w-4 h-4 object-contain" />
                    )}
                    <p className="text-sm text-muted-foreground font-medium">{exp.company}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4 mt-0.5">{exp.period}</span>
              </div>

              {exp.companyProfile && (
                <p className="text-xs text-muted-foreground italic mb-3 mt-2">{exp.companyProfile}</p>
              )}

              <ul className="text-sm text-muted-foreground space-y-1.5">
                {exp.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <span className="text-foreground mt-0.5 shrink-0">·</span>
                    <span className="leading-snug">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Part-time Work Section */}
      <section className="container py-8 border-t border-border">
        <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-6">Part-Time Roles</h2>
        <div>
          {partTimeJobs.map((job) => (
            <div key={job.id} className="mb-7 pb-7 border-b border-border last:border-b-0 last:pb-0 last:mb-0">
              <div className="flex items-start justify-between mb-1.5">
                <div>
                  <h3 className="text-base font-semibold text-foreground leading-snug">{job.title}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    {job.companyImage && (
                      <img src={job.companyImage} alt={job.company} className="w-4 h-4 object-contain" />
                    )}
                    <p className="text-sm text-muted-foreground font-medium">{job.company}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4 mt-0.5">{job.period}</span>
              </div>

              {job.description && (
                <p className="text-xs text-muted-foreground italic mb-3 mt-2">{job.description}</p>
              )}

              <ul className="text-sm text-muted-foreground space-y-1.5">
                {job.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <span className="text-foreground mt-0.5 shrink-0">·</span>
                    <span className="leading-snug">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Internships Section */}
      <section className="container py-8 border-t border-border">
        <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-6">Internships</h2>
        <div>
          {internships.map((internship, idx) => (
            <div key={idx} className="mb-7 pb-7 border-b border-border last:border-b-0 last:pb-0 last:mb-0">
              <div className="flex items-start justify-between mb-1.5">
                <div>
                  <h3 className="text-base font-semibold text-foreground leading-snug">{internship.title}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    {internship.companyImage && (
                      <img src={internship.companyImage} alt={internship.company} className="w-4 h-4 object-contain" />
                    )}
                    <p className="text-sm text-muted-foreground font-medium">{internship.company}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4 mt-0.5">{internship.period}</span>
              </div>

              {internship.companyProfile && (
                <p className="text-xs text-muted-foreground italic mb-3 mt-2">{internship.companyProfile}</p>
              )}

              {internship.highlights && internship.highlights.length > 0 && (
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  {internship.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex gap-2.5">
                      <span className="text-foreground mt-0.5 shrink-0">·</span>
                      <span className="leading-snug">{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container py-8 border-t border-border">
        <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-6">Skills</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground mb-2">{category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-secondary text-foreground text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <p>Ricky Halomoan © 2026</p>
        <div className="flex gap-4">
          <a href="mailto:rickytampubolon97@gmail.com" className="hover:text-foreground transition">rickytampubolon97@gmail.com</a>
          <a href="https://www.linkedin.com/in/rickyhalomoan" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
