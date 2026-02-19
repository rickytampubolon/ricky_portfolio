import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";

export default function Home() {
  const experiences = [
    {
      id: 1,
      title: "Lead Country Product Manager",
      company: "Xanh SM (GSM)",
      location: "Jakarta, Indonesia",
      period: "Jul 2025 - Present",
      description: "Lead end-to-end product strategy and execution for Xanh SM Indonesia's digital ecosystem. Responsible for defining national roadmap, cross-functional alignment, and ensuring scalable solutions that support business growth.",
      highlights: [
        "Define and execute national product roadmap aligned with regional and global priorities",
        "Lead cross-functional teams across product, engineering, operations, and business",
        "Drive digital transformation initiatives for electric mobility platform",
        "Improved driver retention by 25% through product enhancements",
        "Reduced onboarding time from 48 hours to 12 hours"
      ]
    },
    {
      id: 2,
      title: "Senior Product Manager - Performance Evaluation & Data",
      company: "INA Digital Edu - Ministry of Primary and Secondary Education",
      location: "Jakarta, Indonesia",
      period: "Aug 2024 - Aug 2025",
      description: "Led development of performance management tools and national-scale data integration systems for Indonesia's education sector.",
      highlights: [
        "Defined product vision and roadmap aligned with ministry priorities",
        "Managed end-to-end product development from discovery to launch",
        "Processed 2M+ performance evaluations annually",
        "Achieved 85% user adoption rate across institutions",
        "Integrated data from 500+ schools nationwide"
      ]
    },
    {
      id: 3,
      title: "OPEX Product Lead - Logistics",
      company: "Shopee",
      location: "Jakarta, Indonesia",
      period: "Mar 2024 - Jul 2024",
      description: "Led Fleet Management System across First Mile, Middle Mile, and Last Mile logistics operations for Shopee Xpress.",
      highlights: [
        "Managed system enhancement planning and delivery",
        "Coordinated with 10+ teams across logistics and operations",
        "Reduced delivery time by 15% through process optimization",
        "Saved $2M+ annually through operational efficiency improvements",
        "Improved fleet utilization by 20%"
      ]
    },
    {
      id: 4,
      title: "Product Manager - Fulfillment",
      company: "Tokopedia & GoTo Logistics",
      location: "Jakarta, Indonesia",
      period: "Feb 2022 - Mar 2024",
      description: "Directed Fulfillment team to operate with higher efficiency by reducing turnaround time and improving service levels.",
      highlights: [
        "Led enhancements to Warehouse Management System",
        "Managed 50+ fulfillment centers across Indonesia",
        "Improved order fulfillment speed by 30%",
        "Reduced operational costs by $1.5M annually",
        "Achieved 99.2% order accuracy rate"
      ]
    }
  ];

  const skills = {
    "Product Management": ["Product Strategy", "Roadmapping", "User Research", "Analytics", "OKRs", "Agile"],
    "Leadership": ["Cross-functional Leadership", "Stakeholder Management", "Team Building", "Mentoring"],
    "Technical": ["SQL", "Data Analysis", "API Integration", "Product Analytics", "A/B Testing"],
    "Industries": ["E-commerce", "Logistics", "Education Tech", "Electric Mobility", "FinTech"],
    "Tools": ["Jira", "Figma", "Tableau", "Mixpanel", "Amplitude", "Looker"]
  };

  const certifications = [
    {
      title: "Certified Scrum Product Owner",
      issuer: "Scrum Alliance",
      date: "2023"
    },
    {
      title: "Product Management Certification",
      issuer: "General Assembly",
      date: "2021"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Navigation */}
      <header className="sticky top-0 bg-background border-b border-border z-50">
        <nav className="container py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">RH</h1>
          <div className="flex gap-6 text-sm">
            <a href="#about" className="hover:text-muted-foreground transition">About</a>
            <a href="#experience" className="hover:text-muted-foreground transition">Experience</a>
            <a href="#skills" className="hover:text-muted-foreground transition">Skills</a>
            <a href="#contact" className="hover:text-muted-foreground transition">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Ricky Halomoan</h1>
          <p className="text-xl text-muted-foreground mb-2">Senior Product Manager</p>
          <p className="text-lg text-muted-foreground mb-8">Strategic leader driving digital innovation across e-commerce, logistics, and education technology</p>
          
          <div className="flex gap-4 mb-8">
            <Button className="bg-foreground text-background hover:bg-muted-foreground">
              Get in Touch
            </Button>
            <Button variant="outline" className="border-foreground text-foreground hover:bg-secondary">
              Download Resume
            </Button>
          </div>

          <div className="flex gap-4">
            <a href="mailto:ricky@example.com" className="text-muted-foreground hover:text-foreground transition">
              <Mail size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">
              <Github size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container py-16 md:py-24">
        <h2 className="section-title">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-base leading-relaxed mb-4">
              I'm a Senior Product Manager with 8+ years of experience building and scaling digital products across Southeast Asia. My expertise spans e-commerce, logistics, fulfillment, and education technology—industries where I've led teams to deliver products impacting millions of users.
            </p>
            <p className="text-base leading-relaxed">
              I'm passionate about solving complex operational challenges through thoughtful product design and data-driven decision making. I thrive in fast-paced environments where I can collaborate across functions to translate business needs into scalable digital solutions.
            </p>
          </div>
          <div>
            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-3">Education</h3>
              <div className="text-sm">
                <p className="font-medium">Bachelor of Science in Information Systems</p>
                <p className="text-muted-foreground">Bina Nusantara University, Jakarta</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Career Highlights</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Led 50+ fulfillment centers across Indonesia</li>
                <li>• Managed 2M+ annual performance evaluations</li>
                <li>• Delivered $3.5M+ in annual cost savings</li>
                <li>• Built products serving 10M+ users</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="container py-16 md:py-24">
        <h2 className="section-title">Experience</h2>
        <div>
          {experiences.map((exp) => (
            <div key={exp.id} className="job-item">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="job-title">{exp.title}</h3>
                  <p className="job-company">{exp.company}</p>
                </div>
                <span className="job-period whitespace-nowrap ml-4">{exp.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{exp.location}</p>
              <p className="text-base mb-4">{exp.description}</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                {exp.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-foreground">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container py-16 md:py-24">
        <h2 className="section-title">Skills</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skill-category">
              <h3 className="skill-category-title">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section className="container py-16 md:py-24">
        <h2 className="section-title">Certifications</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((cert, idx) => (
            <div key={idx} className="p-6 border border-border rounded">
              <h3 className="font-semibold text-foreground mb-2">{cert.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">{cert.issuer}</p>
              <p className="text-sm text-muted-foreground">{cert.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container py-16 md:py-24">
        <h2 className="section-title">Contact</h2>
        <div className="max-w-2xl">
          <p className="text-base mb-8">
            I'm always interested in hearing about new opportunities and connecting with fellow product leaders. Feel free to reach out.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-muted-foreground" />
              <a href="mailto:ricky@example.com" className="text-foreground hover:text-muted-foreground transition">
                ricky@example.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Linkedin size={20} className="text-muted-foreground" />
              <a href="https://linkedin.com/in/ricky" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-muted-foreground transition">
                linkedin.com/in/ricky
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Github size={20} className="text-muted-foreground" />
              <a href="https://github.com/ricky" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-muted-foreground transition">
                github.com/ricky
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 Ricky Halomoan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
