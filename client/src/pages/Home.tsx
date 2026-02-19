import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";

export default function Home() {
  const experiences = [
    {
      id: 1,
      title: "Lead Country Product Manager",
      company: "GSM - Xanh SM",
      location: "Jakarta, Indonesia",
      period: "Jul 2025 - Present",
      description: "Lead end-to-end product strategy and execution for Xanh SM Indonesia, ensuring the digital ecosystem supports business growth, operational scalability, and service quality.",
      highlights: [
        "Define national roadmap aligned with regional and global priorities while considering local operational needs",
        "Oversee development of driver-facing platforms, rider flows, corporate solutions, and internal operational systems",
        "Collaborate with engineering, design, operations, finance, and data teams to ensure smooth feature delivery",
        "Drive market localization by refining pricing logic, payment flows, loyalty programs, and fleet-management processes",
        "Use operational and behavioral data to identify performance gaps and strengthen service reliability",
        "Lead pilot programs and coordinate market rollout plans before national scaling"
      ]
    },
    {
      id: 2,
      title: "Senior Product Manager - Performance Evaluation & Data",
      company: "INA Digital Edu - Ministry of Primary and Secondary Education",
      location: "Jakarta, Indonesia",
      period: "Aug 2024 - Aug 2025",
      description: "Led the development of performance management tools and national-scale data integration systems aimed at improving accountability and efficiency across the education sector.",
      highlights: [
        "Defined product vision and roadmap aligned with ministry priorities and strategic goals",
        "Collaborated with internal teams, regional education offices, and external partners to integrate feedback",
        "Managed full delivery cycle from research and ideation to user testing and release",
        "Strengthened adoption by organizing training sessions and providing continuous support to educational institutions",
        "Analyzed usage data and user behavior to refine product decisions and improve engagement",
        "Developed measurement strategies to assess impact and guide continuous enhancements"
      ]
    },
    {
      id: 3,
      title: "OPEX Product Lead - Logistic",
      company: "Shopee",
      location: "Jakarta, Indonesia",
      period: "Mar 2024 - Jul 2024",
      description: "Led team responsible for maintaining and improving the Fleet Management System used across First Mile, Middle Mile, and Last Mile operations.",
      highlights: [
        "Collaborated with Business, Finance, Project and Strategy, Business Intelligence, and Operations teams",
        "Managed system enhancement planning, tracking, and delivery to strengthen process sustainability",
        "Handled system troubleshooting and coordinated cross-team responses to ensure timely resolutions",
        "Prepared Functional Requirement Specifications and Business Requirement Documents",
        "Improved operational efficiency by developing new system features supporting workflow consistency",
        "Analyzed operational data and performance metrics to identify inefficiencies and guide decisions"
      ]
    },
    {
      id: 4,
      title: "Product Manager - Fulfillment",
      company: "Tokopedia & GoTo Logistics",
      location: "Jakarta, Indonesia",
      period: "Feb 2022 - Mar 2024",
      description: "Directed the Fulfillment team to operate with higher efficiency by reducing turnaround time and improving service levels.",
      highlights: [
        "Led enhancements to Warehouse Management System, improving productivity and data accuracy",
        "Oversaw integration between Tokopedia Seller Platform and WMS for seamless data flow",
        "Managed both Inbound and Integration teams, strengthening collaboration and operational handovers",
        "Used data analytics to inform product decisions and monitor performance trends",
        "Managed complete product development lifecycle from concept to launch",
        "Continuously refined product features by incorporating user feedback and collaborating with operational leaders"
      ]
    },
    {
      id: 5,
      title: "Quality Engineer - Accommodation",
      company: "Traveloka",
      location: "Jakarta, Indonesia",
      period: "Nov 2019 - Feb 2022",
      description: "Conducted comprehensive testing across Android, iOS, Web, and mobile web platforms to ensure high-quality delivery for the Accommodation product team.",
      highlights: [
        "Coordinated closely with software engineers, product managers, and designers to improve feature reliability",
        "Participated actively in sprint planning, grooming, retrospectives, and daily standups",
        "Led weekly Web release processes to ensure smooth deployments and high stability",
        "Prepared and maintained structured test cases, improving coverage and predictability",
        "Executed detailed manual tests and maintained automation using Selenium, Java, and TestNG",
        "Performed API testing using Postman to ensure backend correctness and data consistency"
      ]
    },
    {
      id: 6,
      title: "QA Engineer - Taxi Group",
      company: "Ice House",
      location: "Jakarta, Indonesia",
      period: "Nov 2019 - Nov 2020",
      description: "Contributed to the MyBluebird application by conducting extensive functional and integration testing across Android, Web, and API components.",
      highlights: [
        "Validated end-to-end flows and ensured consistency between platforms",
        "Monitored feature behavior throughout multiple release cycles",
        "Collaborated with business analysts, product owners, engineers, and designers to clarify requirements",
        "Actively supported sprint ceremonies and addressed defects and performance gaps",
        "Created detailed and structured test cases in TestRail",
        "Maintained automation scripts using Postman and Katalon Studio"
      ]
    }
  ];

  const skills = {
    "Product Management": ["Product Strategy", "Product Management", "Change Management", "Backlog Prioritization", "User-Centered Design", "Risk Management"],
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

  const internships = [
    {
      title: "QA Engineer Intern",
      company: "Moka (GoTo Financial)",
      period: "Sep 2019 - Nov 2019",
      description: "Supported the Moka POS Backoffice Inventory team, ensuring smooth operations and high-quality deliverables."
    },
    {
      title: "QA Engineer Intern",
      company: "Grab Indonesia",
      period: "Jun 2019 - Sep 2019",
      description: "Automated API testing for payment systems using Postman and created robust UI automation using Robot Framework and Appium."
    },
    {
      title: "QA Engineer Intern",
      company: "DANA Indonesia",
      period: "Jun 2018 - Sep 2018",
      description: "Played a key role in the BukaDANA project and KYC processes, ensuring seamless functionality."
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Ricky Halomoan T.</h1>
          <p className="text-xl text-muted-foreground mb-2">Senior Product Manager</p>
          <p className="text-lg text-muted-foreground mb-8">Experience across electric mobility, logistics, fulfillment, and education technology. I lead product strategy, manage complex cross-functional initiatives, and deliver digital solutions that support business scale.</p>
          
          <div className="flex gap-4 mb-8">
            <Button className="bg-foreground text-background hover:bg-muted-foreground">
              Get in Touch
            </Button>
            <Button variant="outline" className="border-foreground text-foreground hover:bg-secondary">
              Download Resume
            </Button>
          </div>

          <div className="flex gap-4">
            <a href="mailto:rickytampubolon97@gmail.com" className="text-muted-foreground hover:text-foreground transition">
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
              Senior Product Manager with experience across electric mobility, logistics, fulfillment, and education technology. I lead product strategy, manage complex cross-functional initiatives, and deliver digital solutions that support business scale.
            </p>
            <p className="text-base leading-relaxed">
              My background in software engineering and quality assurance strengthens my ability to translate operational challenges into practical product outcomes. I have managed high impact platforms, led coordinated execution across regional and global teams, and improved service quality through structured analysis and continuous refinement.
            </p>
          </div>
          <div>
            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-4">Education</h3>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="text-sm">
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-muted-foreground">{edu.school}</p>
                    <p className="text-muted-foreground text-xs">{edu.date}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Contact</h3>
              <div className="text-sm space-y-2 text-muted-foreground">
                <p>+6281375205386</p>
                <p>rickytampubolon97@gmail.com</p>
                <p>Jakarta, Indonesia</p>
              </div>
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

      {/* Internships Section */}
      <section className="container py-16 md:py-24">
        <h2 className="section-title">Internships</h2>
        <div>
          {internships.map((internship, idx) => (
            <div key={idx} className="job-item">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="job-title">{internship.title}</h3>
                  <p className="job-company">{internship.company}</p>
                </div>
                <span className="job-period whitespace-nowrap ml-4">{internship.period}</span>
              </div>
              <p className="text-base">{internship.description}</p>
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
              <a href="mailto:rickytampubolon97@gmail.com" className="text-foreground hover:text-muted-foreground transition">
                rickytampubolon97@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Linkedin size={20} className="text-muted-foreground" />
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-muted-foreground transition">
                linkedin.com/in/rickytampubolon
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Github size={20} className="text-muted-foreground" />
              <span className="text-muted-foreground">+6281375205386</span>
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
