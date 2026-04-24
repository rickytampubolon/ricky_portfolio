/* ── Resume data ─────────────────────────────────────────────
   Extracted from Resume.tsx for easier updates without touching UI.
   ─────────────────────────────────────────────────────────── */

export interface ExperienceItem {
  id: string | number;
  title: string;
  company: string;
  companyImage: string;
  period: string;
  highlights: string[];
  current?: boolean;
  type?: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  schoolImage: string;
  date: string;
  detail: string;
}

export const fullTimeExp: ExperienceItem[] = [
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
    title: "Senior Product Manager – Performance Evaluation & Data Integration",
    company: "INA Digital Edu – Ministry of Primary and Secondary Education",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/cJhNVtPdbOHZIgCZ.png",
    period: "2024 – 2025",
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
    title: "Lead Product / System – SPX Xpress",
    company: "Shopee",
    companyImage: "https://www.google.com/s2/favicons?domain=shopee.co.id&sz=256",
    period: "2024",
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
    title: "Product Manager II – Fulfillment (Dilayani Tokopedia)",
    company: "Tokopedia & GoTo Logistics",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/ZYnBvsLmQkohgFkj.png",
    period: "2022 – 2024",
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
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/hLmBFNBFYNwCqgOT.png",
    period: "2019 – 2020",
    highlights: [
      "Ran comprehensive functional and integration testing for the MyBluebird application across Android, Web, and API platforms, ensuring a consistent experience for millions of transportation users.",
      "Validated complex end-to-end user flows across multiple release cycles, monitoring feature behavior and maintaining consistency between driver and passenger applications.",
      "Worked closely with business analysts, product owners, and engineers to sharpen requirements, refine user flows, and resolve critical issues found during testing.",
      "Built detailed, structured test cases in TestRail to maximize coverage and maintained automation scripts using Postman and Katalon Studio.",
      "Participated in all sprint ceremonies and worked alongside development teams to address defects, performance gaps, and regression issues affecting user experience and system reliability.",
    ],
  },
];

export const partTimeAndInternships: ExperienceItem[] = [
  {
    id: "pt-1",
    title: "QA Engineer Part-time",
    company: "SehatQ",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/iWSWOgSUpfIhugUD.png",
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
    title: "QA Engineer Part-time",
    company: "SiCepat",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/vtUAAIQhTvYAhdQP.png",
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
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/fMzZvBYHbNOGcXlH.png",
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
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/bUAqVpvhsLeEvRro.png",
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
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/JlXCSsTrCXQVouBa.png",
    period: "2018",
    type: "Internship",
    highlights: [
      "Supported BukaDANA integration and KYC initiatives by validating key user journeys including registration, identity verification, and account setup.",
      "Worked with cross-functional teams to maintain consistent payment and identity verification workflows across the application.",
      "Identified and documented defects during testing cycles, collaborating with developers to resolve issues before release and ensure compliance with financial regulations.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    degree: "Master of Business Administration",
    school: "Bandung Institute of Technology",
    schoolImage: "https://www.google.com/s2/favicons?domain=itb.ac.id&sz=256",
    date: "Expected Sep 2026",
    detail: "SBM ITB · Bandung, Indonesia",
  },
  {
    degree: "Bachelor of Informatics",
    school: "Del Institute of Technology",
    schoolImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThY4yORALIvsjHi1T6lhDZogLcYcnjLfSZPQ&s",
    date: "Sep 2019",
    detail: "Laguboti, North Sumatra, Indonesia",
  },
];

export const skills: Record<string, string[]> = {
  "Product Management":    ["Product Strategy", "Roadmapping", "Backlog Management", "User Research", "Product Metrics", "Go-to-Market Strategy"],
  "Leadership":            ["Cross-Functional Leadership", "Stakeholder Management", "Decision Making", "Change Management", "Negotiation"],
  "Technical":             ["SDLC", "Data Analysis", "API Knowledge", "A/B Testing", "Release Management", "SQL"],
  "Methodologies & Tools": ["Agile", "Scrum", "Jira", "Confluence", "Figma", "Postman"],
};
