/* ── Resume data ─────────────────────────────────────────────
   Kept short on purpose: role, company, period.
   ─────────────────────────────────────────────────────────── */

export interface Role {
  title: string;
  company: string;
  period: string;
}

export const experience: Role[] = [
  { title: "Lead Country Product Manager, Indonesia Market", company: "Green SM",                      period: "2025 – Now"  },
  { title: "Senior Product Manager, Performance Evaluation", company: "GovTech Edu", period: "2024 – 2025" },
  { title: "Product Lead, Implementation (SPX Xpress)",                company: "Shopee",                        period: "2024"        },
  { title: "Product Manager II, Fulfillment (Dilayani Tokopedia)",         company: "Tokopedia & GoTo Logistics",    period: "2022 – 2024" },
  { title: "Quality Engineer, Accommodation (Hotel)",                        company: "Traveloka",                     period: "2020 – 2022" },
  { title: "QA Engineer, Taxi Group",                             company: "Ice House",                     period: "2019 – 2020" },
];

export const education: Role[] = [
  { title: "Master of Business Administration", company: "Bandung Institute of Technology", period: "2026" },
  { title: "Bachelor of Informatics",           company: "Del Institute of Technology",     period: "2019" },
];

export const skills = [
  "Product strategy",
  "Roadmapping",
  "User research",
  "Product metrics",
  "Go-to-market",
  "Stakeholder management",
  "Data analysis",
  "SQL",
  "Agile",
];
