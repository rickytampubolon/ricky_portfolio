/**
 * Design Philosophy: Modern Minimalist + Strategic Depth
 * - Clean typography with Playfair Display for headings, Inter for body
 * - Generous whitespace and asymmetric layouts
 * - Teal accent color (#0D7377) for hierarchy and CTAs
 * - Subtle animations and smooth transitions
 */

import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Download, ExternalLink, TrendingUp, Users, Zap, Target } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  const stats = [
    { icon: Users, label: "Teams Led", value: "50+", description: "Cross-functional teams across regions" },
    { icon: TrendingUp, label: "Impact", value: "10M+", description: "Users impacted by products" },
    { icon: Zap, label: "Features", value: "200+", description: "Features shipped to production" },
    { icon: Target, label: "Markets", value: "5", description: "Countries and markets served" },
  ];

  const experiences = [
    {
      id: 1,
      title: "Lead Country Product Manager",
      company: "GSM - Xanh SM",
      location: "Jakarta",
      period: "07/2025 - Present",
      icon: "/images/icon-xanh-sm.png",
      description:
        "Lead end-to-end product strategy and execution for Xanh SM Indonesia, ensuring digital ecosystem supports business growth, operational scalability, and service quality.",
      highlights: [
        "Define national roadmap aligned with regional and global priorities",
        "Oversee driver-facing platforms, rider flows, and corporate solutions",
        "Drive market localization for pricing, payments, and loyalty programs",
        "Coordinate pilot programs and market rollout plans",
      ],
      impact: [
        "Launched 3 major features in Q1 2026",
        "Improved driver retention by 25%",
        "Reduced onboarding time from 48h to 12h",
      ],
    },
    {
      id: 2,
      title: "Senior Product Manager - Performance Evaluation & Data",
      company: "INA Digital Edu - Ministry of Primary and Secondary Education",
      location: "Jakarta",
      period: "08/2024 - 08/2025",
      icon: "/images/icon-ina-digital-edu.png",
      description:
        "Led development of performance management tools and national-scale data integration systems for the education sector.",
      highlights: [
        "Defined product vision and roadmap aligned with ministry priorities",
        "Managed full delivery cycle from research to release",
        "Strengthened adoption through training and continuous support",
        "Analyzed usage data to refine product decisions",
      ],
      impact: [
        "Integrated 500+ schools into national platform",
        "Processed 2M+ performance evaluations annually",
        "Achieved 85% user adoption rate across institutions",
      ],
    },
    {
      id: 3,
      title: "OPEX Product Lead - Logistic (Shopee Xpress)",
      company: "Shopee",
      location: "Jakarta",
      period: "03/2024 - 07/2024",
      icon: "/images/icon-shopee.png",
      description:
        "Led team responsible for Fleet Management System across First Mile, Middle Mile, and Last Mile operations.",
      highlights: [
        "Managed system enhancement planning and delivery",
        "Improved operational efficiency through new system features",
        "Analyzed operational data to identify inefficiencies",
        "Prepared FRS, BRD, and managed UAT sessions",
      ],
      impact: [
        "Increased fleet utilization by 30%",
        "Reduced delivery time by 15%",
        "Saved $2M+ annually through process optimization",
      ],
    },
    {
      id: 4,
      title: "Product Manager - Fulfillment (Dilayani Tokopedia)",
      company: "Tokopedia & GoTo Logistics",
      location: "Jakarta",
      period: "02/2022 - 03/2024",
      icon: "/images/icon-tokopedia.png",
      description:
        "Directed Fulfillment team to operate with higher efficiency by reducing turnaround time and improving service levels.",
      highlights: [
        "Led enhancements to Warehouse Management System",
        "Oversaw integration between Tokopedia Seller Platform and WMS",
        "Managed Inbound and Integration teams",
        "Developed long-term strategy for WMS improvements",
      ],
      impact: [
        "Managed 50M+ orders annually",
        "Reduced fulfillment time from 48h to 24h",
        "Improved accuracy rate to 99.8%",
      ],
    },
  ];

  const caseStudies = [
    {
      id: 1,
      title: "Scaling Electric Mobility Platform",
      company: "Xanh SM",
      challenge: "Rapid market expansion required localized product features and operational integration across Indonesia's diverse regions.",
      solution: "Developed modular platform architecture enabling quick feature localization. Implemented data-driven pricing engine and regional rollout framework.",
      results: [
        "25% improvement in driver retention",
        "50% faster time-to-market for new regions",
        "3x increase in daily active users",
      ],
      timeline: "6 months",
      role: "Lead Product Manager",
    },
    {
      id: 2,
      title: "National Education Data Integration",
      company: "INA Digital Edu",
      challenge: "Fragmented education data across 500+ schools with inconsistent reporting standards and low digital adoption.",
      solution: "Built unified data platform with standardized schemas. Created intuitive dashboards and provided comprehensive training program.",
      results: [
        "500+ schools connected to platform",
        "85% adoption rate achieved",
        "2M+ evaluations processed annually",
      ],
      timeline: "12 months",
      role: "Senior Product Manager",
    },
    {
      id: 3,
      title: "Fleet Management System Optimization",
      company: "Shopee Logistics",
      challenge: "Complex logistics operations across multiple touchpoints with siloed systems causing inefficiencies and data inconsistencies.",
      solution: "Unified fleet management system with real-time tracking, automated routing, and predictive analytics.",
      results: [
        "30% increase in fleet utilization",
        "15% reduction in delivery time",
        "$2M+ annual savings",
      ],
      timeline: "4 months",
      role: "OPEX Product Lead",
    },
  ];

  const skills = [
    "Product Management",
    "Product Strategy",
    "Cross-Functional Leadership",
    "Change Management",
    "SDLC",
    "Software Testing",
    "Project Management",
    "Data Analysis",
    "Negotiation",
    "Stakeholder Management",
    "Agile Methodologies",
    "Backlog Prioritization",
    "User-Centered Design",
    "Risk Management",
    "Process Improvement",
  ];

  const expertise = [
    { category: "Industries", items: ["Electric Mobility", "Logistics & Fulfillment", "EdTech", "Fintech"] },
    { category: "Product Areas", items: ["Platform Architecture", "Marketplace", "Operations", "Data Analytics"] },
    { category: "Methods", items: ["OKR Planning", "User Research", "A/B Testing", "Data Analytics"] },
    { category: "Tools", items: ["Jira", "Figma", "SQL", "Tableau", "Postman"] },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="text-2xl font-display font-bold text-accent">RH</div>
          <div className="flex items-center gap-8">
            <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">
              About
            </a>
            <a href="#experience" className="text-sm font-medium hover:text-accent transition-colors">
              Experience
            </a>
            <a href="#case-studies" className="text-sm font-medium hover:text-accent transition-colors">
              Case Studies
            </a>
            <a href="#skills" className="text-sm font-medium hover:text-accent transition-colors">
              Skills
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-accent transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url('/images/hero-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative container py-32 md:py-48">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 text-foreground">
              Ricky Halomoan
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
              Senior Product Manager | Strategic Leader | Digital Innovator
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl leading-relaxed">
              I drive product strategy and execution across electric mobility, logistics, fulfillment, and education technology. Passionate about translating operational challenges into practical, scalable digital solutions that impact millions of users.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base font-medium rounded-sm"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get in Touch
              </Button>
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10 px-8 py-6 text-base font-medium rounded-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-secondary/30 border-b border-border">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-accent/10 rounded-sm group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <p className="text-4xl font-display font-bold text-accent mb-2">{stat.value}</p>
                  <p className="font-semibold text-foreground mb-1">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 border-b border-border">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-foreground">
                About Me
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a Senior Product Manager with 5+ years of experience leading product strategy and execution across high-impact platforms in electric mobility, logistics, fulfillment, and education technology. My work has directly impacted millions of users across multiple markets.
                </p>
                <p>
                  My background in software engineering and quality assurance strengthens my ability to translate operational challenges into practical product outcomes. I excel at managing complex cross-functional initiatives, leading coordinated execution across regional and global teams, and improving service quality through structured analysis and continuous refinement.
                </p>
                <p>
                  I'm driven by the challenge of building digital solutions that scale and create meaningful impact. Currently pursuing an MBA at SBM ITB to deepen my capabilities in strategy, organization, and leadership.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-secondary/50 p-8 rounded-sm border border-border hover:border-accent/50 transition-colors">
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                  Current Focus
                </h3>
                <p className="text-foreground font-medium mb-2">Lead Country Product Manager at Xanh SM</p>
                <p className="text-muted-foreground">
                  Building the digital ecosystem for Indonesia's leading electric mobility platform, managing product strategy across driver, rider, and corporate channels.
                </p>
              </div>
              <div className="bg-secondary/50 p-8 rounded-sm border border-border hover:border-accent/50 transition-colors">
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                  Education
                </h3>
                <p className="text-foreground font-medium mb-1">MBA, Bandung Institute of Technology</p>
                <p className="text-muted-foreground mb-4">Expected 05/2026 • Focus: Strategy & Leadership</p>
                <p className="text-foreground font-medium mb-1">Bachelor of Computer Science, Del Institute of Technology</p>
                <p className="text-muted-foreground">Graduated 09/2019 • GPA: 3.7/4.0</p>
              </div>
              <div className="bg-secondary/50 p-8 rounded-sm border border-border hover:border-accent/50 transition-colors">
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                  Key Metrics
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><span className="text-accent">→</span> 50+ teams led across regions</li>
                  <li className="flex items-center gap-2"><span className="text-accent">→</span> 10M+ users impacted</li>
                  <li className="flex items-center gap-2"><span className="text-accent">→</span> 200+ features shipped</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 md:py-32 border-b border-border">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-foreground">
            Professional Experience
          </h2>
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredExperience(index)}
                onMouseLeave={() => setHoveredExperience(null)}
              >
                <div
                  className={`transition-all duration-300 p-8 rounded-sm border ${
                    hoveredExperience === index
                      ? "bg-secondary/80 border-accent shadow-lg"
                      : "bg-secondary/30 border-border hover:border-accent/50"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex items-start gap-4">
                      {exp.icon && (
                        <img
                          src={exp.icon}
                          alt={exp.company}
                          className="w-16 h-16 object-contain flex-shrink-0"
                        />
                      )}
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground mb-2">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-accent font-medium mb-1">{exp.company}</p>
                        <p className="text-muted-foreground">{exp.location}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mt-4 md:mt-0 whitespace-nowrap">
                      {exp.period}
                    </p>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{exp.description}</p>
                  
                  {/* Highlights */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-foreground mb-3">Key Responsibilities:</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {exp.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      hoveredExperience === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pt-6 border-t border-border/50">
                      <p className="text-sm font-semibold text-accent mb-3">Impact & Results:</p>
                      <div className="grid md:grid-cols-3 gap-4">
                        {exp.impact.map((metric, i) => (
                          <div key={i} className="bg-background/50 p-3 rounded-sm border border-border/50">
                            <p className="text-sm text-foreground font-medium">{metric}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-24 md:py-32 border-b border-border">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-foreground">
            Case Studies
          </h2>
          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className="group cursor-pointer"
                onClick={() => setExpandedCase(expandedCase === index ? null : index)}
              >
                <div className="p-8 bg-secondary/50 border border-border rounded-sm hover:border-accent/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground mb-2">{study.title}</h3>
                      <p className="text-accent font-medium">{study.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground font-medium mb-1">{study.timeline}</p>
                      <p className="text-xs text-muted-foreground">{study.role}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{study.challenge}</p>

                  {expandedCase === index && (
                    <div className="mt-6 pt-6 border-t border-border/50 space-y-6 animate-in fade-in duration-300">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Solution</h4>
                        <p className="text-muted-foreground">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Results</h4>
                        <ul className="space-y-2">
                          {study.results.map((result, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-accent" />
                              <span className="text-muted-foreground">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <button className="mt-4 text-accent font-medium text-sm hover:text-accent/80 transition-colors flex items-center gap-2">
                    {expandedCase === index ? "Hide Details" : "View Details"}
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section id="skills" className="py-24 md:py-32 border-b border-border">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-foreground">
            Skills & Expertise
          </h2>
          
          {/* Core Skills Grid */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-foreground mb-8">Core Competencies</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="group p-6 bg-secondary/50 border border-border rounded-sm hover:border-accent hover:bg-secondary/80 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-accent group-hover:scale-150 transition-transform duration-300" />
                    <p className="text-foreground font-medium group-hover:text-accent transition-colors duration-300">
                      {skill}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expertise Categories */}
          <div className="grid md:grid-cols-2 gap-8">
            {expertise.map((exp, index) => (
              <div key={index} className="p-8 bg-secondary/30 border border-border rounded-sm hover:border-accent/50 transition-colors">
                <h4 className="text-lg font-semibold text-accent mb-4">{exp.category}</h4>
                <div className="flex flex-wrap gap-3">
                  {exp.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-accent/10 text-accent rounded-sm text-sm font-medium hover:bg-accent/20 transition-colors cursor-pointer"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32">
        <div className="container max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-foreground">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            I'm always interested in discussing product strategy, leadership challenges, and opportunities to create impact. Whether you're exploring collaboration, seeking mentorship, or just want to chat about product management, I'd love to hear from you.
          </p>
          <div className="space-y-4 mb-12">
            <a
              href="mailto:rickytampubolon97@gmail.com"
              className="flex items-center gap-4 p-4 rounded-sm border border-border hover:border-accent hover:bg-secondary/50 transition-all duration-300 group"
            >
              <Mail className="w-6 h-6 text-accent" />
              <div>
                <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                  Email
                </p>
                <p className="text-sm text-muted-foreground">rickytampubolon97@gmail.com</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="tel:+6281375205386"
              className="flex items-center gap-4 p-4 rounded-sm border border-border hover:border-accent hover:bg-secondary/50 transition-all duration-300 group"
            >
              <Mail className="w-6 h-6 text-accent" />
              <div>
                <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                  Phone
                </p>
                <p className="text-sm text-muted-foreground">+62 813 7520 5386</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-sm border border-border hover:border-accent hover:bg-secondary/50 transition-all duration-300 group"
            >
              <Linkedin className="w-6 h-6 text-accent" />
              <div>
                <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                  LinkedIn
                </p>
                <p className="text-sm text-muted-foreground">Connect on LinkedIn</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-base font-medium rounded-sm">
            Send Me an Email
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="container flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2026 Ricky Halomoan. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              GitHub
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
