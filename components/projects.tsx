"use client";

import Image from "next/image";
import { useState } from "react";
import { Section, Prose } from "@/components/craft";
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
      "As a software engineer at Trane Technologies, I work with a team of desginers and fellow developers to code stateful and stateless components using TypeScript and Next.js. We use TailwindCSS in a headless CMS environment powered by WordPress. In this role I also leverage tools such as GIT, JIRA, Figma, and Asana in several team-based, enterprise scale applications.",
    details: {
      liveUrl: "https://trane.com/residential",
      github: "Private Repository",
      type: "Full Time Job",
    },
    gallery: [
      "https://dacarch.com/wp-content/uploads/2026/01/project-rendering.png",
      // Add more images as needed
    ],
    technologies: ["WordPress", "HTML", "CSS"],
  },
  {
    id: "AMS",
    title: "American Standard Air",
    description: "",
    imageUrl:
      "http://www.alfredorafael.com/wp-content/uploads/2026/01/AMS-Project2.png",
    fullDescription:
      "As a software engineer at Trane Technologies, I work with a team of desginers and fellow developers to code stateful and stateless components using TypeScript and Next.js. We use TailwindCSS in a headless CMS environment powered by WordPress. In this role I also leverage tools such as GIT, JIRA, Figma, and Asana in several team-based, enterprise scale applications.",
    details: {
      liveUrl: "https://www.americanstandardair.com/",
      github: "1,200 sq ft",
      type: "Commercial",
    },
    technologies: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "MIT",
    title: "MIT ChemE",
    description: "Dunedin, Florida",
    imageUrl:
      "http://www.alfredorafael.com/wp-content/uploads/2026/01/MIT-Project.png",
    fullDescription:
      "At MIT's department of Chemical Engineering I code, redesign, and update webpages within the M.I.T's Chemical Engineering department. Wordpress is a powerful tool to develop enterprise level applications, allowing clients edit their website's content thru a wysiwyg editor. I use custom HTML, vanilla CSS, use Sketch to create/modify logos, and additional Worpdress pluggings to enhance user experience.",
    details: {
      liveUrl: "https://cheme.mit.edu/",
      github: "Private Repository",
      type: "Part-time Work",
    },
    technologies: ["React", "TypeScript", "Tailwind CSS"],
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
    technologies: ["React", "TypeScript", "Tailwind CSS"],
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
    technologies: ["React", "TypeScript", "Tailwind CSS"],
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
    technologies: ["React", "TypeScript", "Tailwind CSS"],
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
                className="rounded-full bg-accent px-3 py-1 font-semibold text-xs "
              >
                {tech}
              </div>
            ))}
        </div>
        <a
          className="font-medium text-blue-700"
          href={project.details.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Live Url
        </a>
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
        <h4 className="text-sm font-semibold text-slate-900 mb-2">
          About This Project
        </h4>
        <p className="text-slate-700 leading-relaxed">
          {project.fullDescription}
        </p>
      </div>

      {/* Additional Gallery (if available) */}
      {project.gallery && project.gallery.length > 1 && (
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Gallery</h4>
          <div className="grid grid-cols-2 gap-3">
            {project.gallery.slice(1).map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-video rounded-md overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`${project.title} - Image ${idx + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
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
