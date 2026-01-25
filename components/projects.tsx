"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Section, Prose } from "@/components/craft";
import { ExternalLink } from "lucide-react";
import Modal from "@/components/modal";

// Define the project data type
type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  innerImageUrl?: string;
  // Extended data for modal
  fullDescription: string;
  details: {
    liveUrl?: string;
    github?: string;
    type?: string;
  };
  gallery?: string[]; // Additional images
  technologies?: string[];
};

// Your project data
const projectsData: Project[] = [
  {
    id: "TRN",
    title: "Trane Residential",
    description: "",
    imageUrl:
      "http://www.alfredorafael.com/wp-content/uploads/2026/01/TRN-Project.png",
    fullDescription:
      "As a software engineer at Trane Technologies, I work with a team of designers and developers coding stateful and stateless components using TypeScript and Next.js. We use TailwindCSS in a headless CMS environment powered by WordPress. We also leverage tools such as GIT, JIRA, and Figma, among many others.",
    details: {
      liveUrl: "https://trane.com/residential",
      github: "Private Repository",
      type: "Full Time Job",
    },
    gallery: [
      "https://dacarch.com/wp-content/uploads/2026/01/project-rendering.png",
      // Add more images as needed
    ],
    technologies: [
      "WordPress",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React.js",
      "GraphQL",
    ],
  },
  {
    id: "AMS",
    title: "American Standard Air",
    description: "",
    imageUrl:
      "http://www.alfredorafael.com/wp-content/uploads/2026/01/AMS-Project2.png",
    fullDescription:
      "As a software engineer at Trane Technologies, I work with a team of designers and developers coding stateful and stateless components using TypeScript and Next.js. We use TailwindCSS in a headless CMS environment powered by WordPress. We also leverage tools such as GIT, JIRA, and Figma, among many others.",
    details: {
      liveUrl: "https://www.americanstandardair.com/",
      github: "1,200 sq ft",
      type: "Commercial",
    },
    technologies: [
      "WordPress",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React.js",
      "GraphQL",
    ],
  },
  {
    id: "MIT",
    title: "MIT ChemE",
    description: "Dunedin, Florida",
    imageUrl:
      "http://www.alfredorafael.com/wp-content/uploads/2026/01/MIT-Project.png",
    fullDescription:
      "At MIT's department of Chemical Engineering I code, redesign, and update 30+ webpages within MIT's Department of Chemical Engineering. Wordpress allows staff and faculty to edit their website's  thru a wysiwyg editor. In addition to HTML/CSS, I create/modify logos with Sketch, and use Wordpress plugins to enhance user experience.",
    details: {
      liveUrl: "https://cheme.mit.edu/",
      github: "Private Repository",
      type: "Part-time Work",
    },
    technologies: ["WordPress", "HTML/CSS", "PHP", "Sketch"],
  },
  {
    id: "REL",
    title: "Relata US",
    description: "Dunedin, Florida",
    imageUrl:
      "http://www.alfredorafael.com/wp-content/uploads/2026/01/REL-Project.png",
    fullDescription:
      "I developed this web-application with React.js, React-Bootsrap and Email-js for its contact funcionality. Relata is a digital media and marketing agency aimed at building peace and understanding, promoting dialogue, and interconnectedness for nonprofits, NGOs, labor organizations, as well as houses of worship, small businesses and entrepreneurs.",
    details: {
      liveUrl: "https://relata.us/",
      github: "",
      type: "Residential",
    },
    technologies: [
      "React.js",
      "React-Bootstrap",
      "EmailJS",
      "jQuery",
      "Reactstrap",
    ],
  },
  {
    id: "ML",
    title: "Merrill Lynch - BofA",
    description: "",
    imageUrl:
      "http://www.alfredorafael.com/wp-content/uploads/2026/01/ML-Project2.png",
    fullDescription:
      "At Merrill Lynch of Bank of America I developed webpages using HTML5, vanilla CSS, vanilla-JS and jQuery. When I am was coding + assisting the creation of new landing pages, I was updating time-sensitive content with the company's CMS, and keeping track of multiple updates using Jira's Kanban board accross several business owners, coworkers and other stakeholders.",
    details: {
      liveUrl: "https://www.merrilledge.com/education-savings/529",
      github: "",
      type: "Contract Work",
    },
    technologies: [
      "HTML5",
      "CSS",
      "jQuery",
      "JavaScript",
      "Jira",
      "Documentum CMS",
    ],
  },
  {
    id: "DAC",
    title: "DAC Architects",
    description: "Dunedin, Florida",
    imageUrl:
      "http://www.alfredorafael.com/wp-content/uploads/2026/01/DAC-Project.png",
    fullDescription:
      "A modern Next.js application built for an architecture firm, showcasing their portfolio and services with a sleek, user-friendly design.",
    details: {
      liveUrl: "https://dacarch.com/",
      github: "",
      type: "Residential",
    },
    technologies: [
      "WordPress",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React.js",
      "GraphQL",
    ],
  },
];

function ProjectCard({
  title,
  description,
  imageUrl,
  imageAlt = title,
  onClick,
  technologies,
}: {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  onClick?: () => void;
  technologies?: string[];
}) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg shadow-md transition-transform hover:scale-[1.02] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {/* Image */}
      <div className="relative aspect-video w-full">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 via-black/40 to-black/5" />
      </div>

      {/* Overlay text */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-foreground">
        <h3 className="mb-2 text-xl font-bold leading-tight text-white">
          {title}
        </h3>
        {/* <p className="text-sm leading-relaxed text-white text-pretty">
          {description}
        </p> */}
        {/* {technologies && technologies.join(", ")} */}
        {/* <div className="flex flex-wrap gap-2 mt-3">
          {technologies &&
            technologies.map((tech) => (
              <div
                key={tech}
                className="rounded-full bg-accent/30 px-3 py-1 font-semibold text-xs text-white"
              >
                {tech}
              </div>
            ))}
        </div> */}
      </div>
    </div>
  );
}

function ProjectModalContent({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
        <Image
          src={project.imageUrl}
          alt={project.imageAlt || project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex -mt-[1.5rem] justify-between pr-2">
        <div className="flex flex-wrap gap-2 mt-3">
          {project.technologies &&
            project.technologies.map((tech) => (
              <div
                key={tech}
                className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold hover:bg-primary/20"
              >
                {tech}
              </div>
            ))}
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2 shrink-0 md:-mt-7">
          <a
            className="font-medium textBlue flex items-center"
            href={project.details.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="mt-1">Live Url</span> &nbsp;
            <ExternalLink />
          </a>
        </div>
      </div>

      {/* Project Details Grid */}
      {/* <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-200">
        {project.details.liveUrl && (
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Live URL
            </div>
            <a
              href={project.details.liveUrl}
              className="font-medium text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.details.liveUrl}
            </a>
          </div>
        )}
        {project.details.github !== "Private Repository" ? (
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Github Repo
            </div>
            <a
              href={project.details.github}
              className="font-medium text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.details.github}
            </a>
          </div>
        ) : (
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Github Repo
            </div>
            <div className="font-slim">Private Repository</div>
          </div>
        )}

        {project.technologies && (
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Technologies
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.technologies &&
                project.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="rounded-full bg-accent px-3 py-1 font-semibold text-xs flex"
                  >
                    {tech}
                  </div>
                ))}
            </div>
          </div>
        )}
        {project.details.type && (
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Type
            </div>
            <div className="font-slim">{project.details.type}</div>
          </div>
        )}
      </div> */}

      {/* Full Description */}
      <div>
        <h2 className="font-semibold text-accent-foreground mb-2">
          About This Project
        </h2>
        <p className="text-accent-foreground leading-relaxed">
          {project.fullDescription}
        </p>
      </div>
    </div>
  );
}
export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optional: delay clearing selectedProject for smoother animation
    setTimeout(() => setSelectedProject(null), 200);
  };

  return (
    <Section className="px-6 max-w-6xl mx-auto mb-18" id="projects">
      <Prose className="pb-8 text-center">
        <h2>Previous Work</h2>
      </Prose>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            imageAlt={project.imageAlt}
            onClick={() => handleProjectClick(project)}
            technologies={project.technologies}
          />
        ))}
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={selectedProject?.title || ""}
      >
        {selectedProject && <ProjectModalContent project={selectedProject} />}
      </Modal>
    </Section>
  );
}
