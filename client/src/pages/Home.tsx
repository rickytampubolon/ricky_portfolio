/**
 * Design Philosophy: Modern Minimalist + Strategic Depth
 * - Clean typography with Playfair Display for headings, Inter for body
 * - Generous whitespace and asymmetric layouts
 * - Teal accent color (#0D7377) for hierarchy and CTAs
 * - Subtle animations and smooth transitions
 */

import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Download, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);

  const experiences = [
    {
      id: 1,
      title: "Lead Country Product Manager",
      company: "GSM - Xanh SM",
      location: "Jakarta",
      period: "07/2025 - Present",
      description:
        "Lead end-to-end product strategy and execution for Xanh SM Indonesia, ensuring digital ecosystem supports business growth, operational scalability, and service quality.",
      highlights: [
        "Define national roadmap aligned with regional and global priorities",
        "Oversee driver-facing platforms, rider flows, and corporate solutions",
        "Drive market localization for pricing, payments, and loyalty programs",
        "Coordinate pilot programs and market rollout plans",
      ],
    },
    {
      id: 2,
      title: "Senior Product Manager - Performance Evaluation & Data",
      company: "INA Digital Edu - Ministry of Primary and Secondary Education",
      location: "Jakarta",
      period: "08/2024 - 08/2025",
      description:
        "Led development of performance management tools and national-scale data integration systems for the education sector.",
      highlights: [
        "Defined product vision and roadmap aligned with ministry priorities",
        "Managed full delivery cycle from research to release",
        "Strengthened adoption through training and continuous support",
        "Analyzed usage data to refine product decisions",
      ],
    },
    {
      id: 3,
      title: "OPEX Product Lead - Logistic (Shopee Xpress)",
      company: "Shopee",
      location: "Jakarta",
      period: "03/2024 - 07/2024",
      description:
        "Led team responsible for Fleet Management System across First Mile, Middle Mile, and Last Mile operations.",
      highlights: [
        "Managed system enhancement planning and delivery",
        "Improved operational efficiency through new system features",
        "Analyzed operational data to identify inefficiencies",
        "Prepared FRS, BRD, and managed UAT sessions",
      ],
    },
    {
      id: 4,
      title: "Product Manager - Fulfillment (Dilayani Tokopedia)",
      company: "Tokopedia & GoTo Logistics",
      location: "Jakarta",
      period: "02/2022 - 03/2024",
      description:
        "Directed Fulfillment team to operate with higher efficiency by reducing turnaround time and improving service levels.",
      highlights: [
        "Led enhancements to Warehouse Management System",
        "Oversaw integration between Tokopedia Seller Platform and WMS",
        "Managed Inbound and Integration teams",
        "Developed long-term strategy for WMS improvements",
      ],
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
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 text-foreground">
              Ricky Halomoan
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
              Senior Product Manager | Strategic Leader | Digital Innovator
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-xl leading-relaxed">
              Driving product strategy and execution across electric mobility, logistics, fulfillment, and education technology. Passionate about translating operational challenges into practical, scalable digital solutions.
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
                  I'm a Senior Product Manager with 5+ years of experience leading product strategy and execution across high-impact platforms in electric mobility, logistics, fulfillment, and education technology.
                </p>
                <p>
                  My background in software engineering and quality assurance strengthens my ability to translate operational challenges into practical product outcomes. I excel at managing complex cross-functional initiatives, leading coordinated execution across regional and global teams, and improving service quality through structured analysis and continuous refinement.
                </p>
                <p>
                  Currently, I'm pursuing an MBA at SBM ITB to deepen my capabilities in strategy, organization, and leadership. I'm driven by the challenge of building digital solutions that scale and create meaningful impact.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-secondary/50 p-8 rounded-sm border border-border">
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                  Current Focus
                </h3>
                <p className="text-foreground font-medium mb-2">Lead Country Product Manager at Xanh SM</p>
                <p className="text-muted-foreground">
                  Building the digital ecosystem for Indonesia's leading electric mobility platform.
                </p>
              </div>
              <div className="bg-secondary/50 p-8 rounded-sm border border-border">
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                  Education
                </h3>
                <p className="text-foreground font-medium mb-1">MBA, Bandung Institute of Technology</p>
                <p className="text-muted-foreground mb-4">Expected 05/2026</p>
                <p className="text-foreground font-medium mb-1">Bachelor of Computer Science, Del Institute of Technology</p>
                <p className="text-muted-foreground">Graduated 09/2019</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 md:py-32 border-b border-border">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-foreground">
            Experience
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
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-accent font-medium mb-1">{exp.company}</p>
                      <p className="text-muted-foreground">{exp.location}</p>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mt-4 md:mt-0 whitespace-nowrap">
                      {exp.period}
                    </p>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{exp.description}</p>
                  <div
                    className={`grid md:grid-cols-2 gap-4 transition-all duration-300 overflow-hidden ${
                      hoveredExperience === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {exp.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 md:py-32 border-b border-border">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-foreground">
            Skills & Expertise
          </h2>
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
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32">
        <div className="container max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-foreground">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            I'm always interested in discussing product strategy, leadership challenges, and opportunities to create impact. Feel free to reach out through any of the channels below.
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
