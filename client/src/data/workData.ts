/* ── Work / Case Studies data ────────────────────────────────
   Centralises project cards shown on the Work page.
   ─────────────────────────────────────────────────────────── */

export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  companyImage: string;
  role: string;
  period: string;
  domains: string[];
  summary: string;
  outcomes: string[];
  available: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "xanh-sm-id",
    title: "Indonesia Market Entry — Electric Ride-hailing",
    company: "GSM – Xanh SM",
    companyImage: "https://www.google.com/s2/favicons?domain=xanhsm.com&sz=256",
    role: "Lead Country Product Manager",
    period: "2025 – Present",
    domains: ["Electric Mobility", "Market Expansion", "Super App"],
    summary:
      "Led the product strategy and roadmap for Xanh SM's Indonesia launch — localising a Vietnamese EV ride-hailing platform for the world's fourth most-populous market, from driver onboarding to payment localisation.",
    outcomes: [
      "Built a localised product roadmap spanning driver app, rider app, corporate dashboard, and internal ops tools",
      "Integrated local payment providers and loyalty mechanics tailored to Indonesian user behaviour",
      "Served as the primary bridge between Indonesia leadership and global HQ, aligning on pilots and multi-city rollout phases",
    ],
    available: false,
  },
  {
    id: "ina-digital-edu",
    title: "National Education Performance Platform",
    company: "Ministry of Primary & Secondary Education",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/cJhNVtPdbOHZIgCZ.png",
    role: "Product Manager",
    period: "2024 – 2025",
    domains: ["EdTech", "Government", "Data Integration"],
    summary:
      "Defined the vision and led delivery of a national performance management and data integration platform for Indonesia's primary and secondary education system — used by millions of educators and students across the archipelago.",
    outcomes: [
      "Shipped a stable, compliant platform from zero to nationwide release, coordinating engineering, data, and UX teams",
      "Built measurement frameworks to track effectiveness by region using behavioural and institutional performance data",
      "Supported thousands of educational institutions through hands-on training and iterative product improvements",
    ],
    available: false,
  },
  {
    id: "shopee-fms",
    title: "Fleet Management System — 3-Mile Optimisation",
    company: "Shopee (SPX Express)",
    companyImage: "https://www.google.com/s2/favicons?domain=shopee.co.id&sz=256",
    role: "Senior Associate, System Product Lead",
    period: "2024",
    domains: ["Logistics", "Operations", "Systems"],
    summary:
      "Led strategic improvements to SPX Express's Fleet Management System across First, Middle, and Last Mile operations, cutting delivery times and increasing throughput across millions of monthly shipments.",
    outcomes: [
      "Delivered FMS enhancements that standardised workflows across multiple logistics functions",
      "Drove system improvement planning using data analysis to surface and resolve operational bottlenecks",
      "Produced Functional Specification and BRD documentation and led UAT with operations teams",
    ],
    available: false,
  },
  {
    id: "tokopedia-wms",
    title: "WMS Enhancement & Fulfillment Optimisation",
    company: "Tokopedia & GoTo Logistics",
    companyImage:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663308270135/ZYnBvsLmQkohgFkj.png",
    role: "Product Manager II",
    period: "2022 – 2024",
    domains: ["Fulfillment", "E-Commerce", "Logistics"],
    summary:
      "Drove measurable improvements in the Dilayani Tokopedia fulfillment operation through strategic Warehouse Management System enhancements, raising service levels and reducing turnaround time across multiple warehouses.",
    outcomes: [
      "Led WMS productivity, data accuracy, and process standardisation across high-volume warehouse operations",
      "Managed critical integration between Tokopedia Seller Platform and WMS for real-time inventory and order accuracy",
      "Built a long-term, data-driven WMS improvement strategy refined continuously through operator feedback",
    ],
    available: false,
  },
];
