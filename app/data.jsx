import { Mail, Phone, MapPin, Clock, ExternalLink, Badge } from "lucide-react";

export const contactData = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (412) 320-9569",
    href: "tel:+14123209569",
    plusSignAndOnlyDashesValue: "+1-412-320-9569",
  },
  {
    icon: Mail,
    label: "Email",
    value: "dacarchdesign@gmail.com",
    href: "mailto:dacarchdesign@gmail.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "5767 75th Ave, Pinellas Park\n FL 33781",
    href: "https://www.google.com/maps/place/Pinellas+Park,+FL/@27.8597714,-82.7524459,13z/data=!3m1!4b1!4m6!3m5!1s0x88c2e4eeef314f25:0x3f127ac896cd422d!8m2!3d27.8428025!4d-82.6995443!16zL20vMHJyMzQ?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM",
    href: null,
  },
];
export const experienceData = [
  {
    period: "2022 — Present",
    title: "Front-End Software Engineer",
    company: "Trane Technologies",
    companyUrl: "https://trane.com/residential",
    description: (
      <>
        <ul
          style={{
            listStyleType: "disc",
            paddingLeft: "1rem",
            marginTop: "1rem",
          }}
          className=" leading-relaxed"
        >
          <li className="mb-4">
            Develop and implement reusable components using Next.js, React and
            TypeScript in headless CMS environment.
          </li>
          <li className="mb-4">
            Collaborate with cross-functional teams with GIT for version
            control, JIRA for agile project management, and Figma for user
            interface (UI) design.
          </li>
          <li className="mb-4">
            Leaverage TailwindCSS to craft responsive and visually appealing
            user interfaces while adhering to best practices and modern design
            principles.
          </li>
          <li className="mb-4">
            Enhance data-management with Advanced Custom Fields (ACF) and
            optimize admin panel's UI, improving publishers' user experience
            (UX).
          </li>
        </ul>
      </>
    ),
    technologies: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS"],
  },
  {
    period: "2020 — Present",
    title: "Assistant Web Developer",
    company: "Massachusetts Institute of Technology (MIT)",
    companyUrl: "#",
    description: (
      <>
        <ul
          style={{
            listStyleType: "disc",
            paddingLeft: "1rem",
            margin: "1rem 0",
          }}
          className=" leading-relaxed"
        >
          <li className="mb-4">
            Develop and implement reusable components using Next.js, React and
            TypeScript in headless CMS environment.
          </li>
          <li className="mb-4">
            Collaborate with cross-functional teams with GIT for version
            control, JIRA for agile project management, and Figma for user
            interface (UI) design.
          </li>
          <li className="mb-4">
            Leaverage TailwindCSS to craft responsive and visually appealing
            user interfaces while adhering to best practices and modern design
            principles.
          </li>
          <li className="mb-4">
            Enhance data-management with Advanced Custom Fields (ACF) and
            optimize admin panel's UI, improving publishers' user experience
            (UX).
          </li>
        </ul>
      </>
    ),
    technologies: ["WordPress", "PHP", "ACF"],
  },
  {
    period: "2018 — 2020",
    title: "Frontend Developer",
    company: "CreativeStudio",
    companyUrl: "#",
    description:
      "Developed, maintained, and shipped production code for client websites. Worked alongside creative teams to bring designs to life with pixel-perfect implementation and smooth interactions.",
    technologies: ["HTML", "CSS", "JavaScript", "Vue.js", "SCSS"],
  },
  {
    period: "2017 — 2018",
    title: "Web Development Intern",
    company: "StartupXYZ",
    companyUrl: "#",
    description:
      "Assisted in the development of the company's main product. Learned industry best practices and modern development workflows while contributing to real-world projects.",
    technologies: ["HTML", "CSS", "JavaScript", "Python", "Django"],
  },
];
export const educationData = [
  {
    degree: "Master of Science in Computer Science",
    school: "Stanford University",
    schoolUrl: "#",
    period: "2015 — 2017",
    description:
      "Specialized in Human-Computer Interaction and Machine Learning. Thesis on accessible web interfaces.",
  },
  {
    degree: "Bachelor of Science in Software Engineering",
    school: "MIT",
    schoolUrl: "#",
    period: "2011 — 2015",
    description:
      "Dean's List. Active member of the Computer Science Society. Led multiple hackathon-winning teams.",
  },
];
export const resumeNavItems = [
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "education", label: "EDUCATION" },
];
export const certificationsData = [
  "AWS Certified Solutions Architect",
  "Google Cloud Professional Developer",
  "Meta Frontend Developer Certificate",
];
export const projectsData = [
  {
    title: "DevFlow",
    description:
      "A developer productivity platform that helps teams track code quality metrics, manage technical debt, and streamline code reviews with AI-powered insights.",
    image: "/dashboard-app-interface-dark-theme.jpg",
    url: "#",
    github: "#",
    technologies: ["Next.js", "TypeScript", "Prisma", "OpenAI"],
  },
  {
    title: "CloudSync",
    description:
      "Real-time file synchronization tool with end-to-end encryption, supporting seamless collaboration across distributed teams.",
    image: "/cloud-sync-app-interface-dark-theme.jpg",
    url: "#",
    github: "#",
    technologies: ["React", "Node.js", "WebSocket", "AWS S3"],
  },
  {
    title: "CodeCanvas",
    description:
      "An interactive coding playground that allows developers to experiment with various frameworks and share their creations instantly.",
    image: "/code-editor-interface-dark-theme.jpg",
    url: "#",
    github: "#",
    technologies: ["Vue.js", "Monaco Editor", "Docker", "Redis"],
  },
];
export const skillsData = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Go", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Redux", "GraphQL"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "Django", "FastAPI", "PostgreSQL", "Redis"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "Docker", "AWS", "Vercel", "Figma", "Linear"],
  },
];
export const testimonialsData = [
  {
    id: "1",
    content:
      "This product has completely transformed how we work! The team is responsive, the features are intuitive, and the results speak for themselves. Highly recommended!",
    author: "Sarita Johnson",
    role: "CEO",
    company: "TechStart Inc",
    avatar: "/professional-woman-diverse.png",
    rating: 5,
  },
  {
    id: "2",
    content:
      "Outstanding service from start to finish. The attention to detail and commitment to excellence is evident in every interaction. We couldn't be happier with our decision.",
    author: "Michael Chen",
    role: "Product Manager",
    company: "InnovateCo",
    avatar: "/professional-man.jpg",
    rating: 5,
  },
  {
    id: "3",
    content:
      "A game-changer for our business. The ROI was immediate and the ongoing support has been exceptional. This is exactly what we were looking for.",
    author: "Emily Rodriguez",
    role: "Director of Operations",
    company: "Growth Solutions",
    avatar: "/professional-woman-smiling.png",
    rating: 5,
  },
  {
    id: "4",
    content:
      "The level of professionalism and expertise is unmatched. They understood our needs perfectly and delivered beyond our expectations. Absolutely fantastic!",
    author: "David Thompson",
    role: "CTO",
    company: "Digital Dynamics",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "5",
    content:
      "Implementing this solution was seamless. The support team guided us every step of the way, and we saw results within the first week. Couldn't ask for more!",
    author: "Jennifer Martinez",
    role: "VP of Marketing",
    company: "Brand Builders",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "6",
    content:
      "Simply outstanding! The quality of work and dedication to customer success is remarkable. This has been one of the best investments we've made.",
    author: "Robert Kim",
    role: "Founder",
    company: "StartupHub",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
];
