/* ── Resume data ─────────────────────────────────────────────
   Kept short on purpose: role, company, period.
   ─────────────────────────────────────────────────────────── */

export interface Role {
  title: string;
  company: string;
  period: string;
}

export const experience: Role[] = [
  { title: "Lead Country Product Manager, Indonesia", company: "Green SM",                      period: "2025 – Now"  },
  { title: "Senior Product Manager",                  company: "INA Digital Edu, Ministry of Education", period: "2024 – 2025" },
  { title: "Lead Product, SPX Xpress",                company: "Shopee",                        period: "2024"        },
  { title: "Product Manager II, Fulfillment",         company: "Tokopedia & GoTo Logistics",    period: "2022 – 2024" },
  { title: "Quality Engineer",                        company: "Traveloka",                     period: "2020 – 2022" },
  { title: "QA Engineer",                             company: "Ice House",                     period: "2019 – 2020" },
];

export const earlier: Role[] = [
  { title: "QA Engineer, part-time", company: "SehatQ",             period: "2022 – 2023" },
  { title: "QA Engineer, part-time", company: "SiCepat",            period: "2021 – 2022" },
  { title: "QA Engineer, intern",    company: "GoTo Group (Moka)",  period: "2019"        },
  { title: "QA Engineer, intern",    company: "Grab",               period: "2019"        },
  { title: "QA Engineer, intern",    company: "DANA Indonesia",     period: "2018"        },
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
