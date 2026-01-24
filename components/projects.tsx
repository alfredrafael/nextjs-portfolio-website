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
  location: string;
  imageUrl: string;
  imageAlt?: string;
  // Extended data for modal
  fullDescription: string;
  details: {
    year?: string;
    size?: string;
    type?: string;
    status?: string;
  };
  gallery?: string[]; // Additional images
};

// Your project data
const projectsData: Project[] = [
  {
    id: "barndominium",
    title: "N. Ave. Barndominium",
    description: "Ligonier, Pennsylvania",
    location: "Ligonier, Pennsylvania",
    imageUrl:
      "https://www.alfredorafael.com/wp-content/uploads/2024/02/CodeSample1.png",
    fullDescription:
      "A modern barndominium combining rustic charm with contemporary design. This project features open-concept living spaces, high ceilings, and sustainable building practices.",
    details: {
      year: "2025",
      size: "3,500 sq ft",
      type: "Residential",
      status: "Completed",
    },
    gallery: [
      "https://dacarch.com/wp-content/uploads/2026/01/project-rendering.png",
      // Add more images as needed
    ],
  },
  {
    id: "crispy-cones",
    title: "Crispy Cones",
    description: "Clearwater, Florida",
    location: "Clearwater, Florida",
    imageUrl:
      "https://dacarch.com/wp-content/uploads/2026/01/Crispy-Cone-Project-1-scaled.jpg",
    fullDescription:
      "A vibrant commercial space designed for a specialty dessert shop. The design emphasizes customer flow, brand identity, and an inviting atmosphere.",
    details: {
      year: "2024",
      size: "1,200 sq ft",
      type: "Commercial",
      status: "Completed",
    },
    gallery: [
      "https://dacarch.com/wp-content/uploads/2026/01/Crispy-Cone-Project-1-scaled.jpg",
    ],
  },
  {
    id: "wright-residence",
    title: "Wright Residence",
    description: "Dunedin, Florida",
    location: "Dunedin, Florida",
    imageUrl:
      "https://dacarch.com/wp-content/uploads/2026/01/Front-render-.jpeg",
    fullDescription:
      "A coastal residence featuring clean lines, natural light, and indoor-outdoor living spaces perfect for the Florida climate.",
    details: {
      year: "2025",
      size: "2,800 sq ft",
      type: "Residential",
      status: "In Progress",
    },
    gallery: [
      "https://dacarch.com/wp-content/uploads/2026/01/Front-render-.jpeg",
    ],
  },
];

function ProjectCard({
  title,
  description,
  imageUrl,
  imageAlt = title,
  onClick,
}: {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  onClick?: () => void;
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Overlay text */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-foreground">
        <h3 className="mb-2 text-xl font-bold leading-tight text-white">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-white text-pretty">
          {description}
        </p>
      </div>
    </div>
  );
}

function ProjectModalContent({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.imageAlt || project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-200">
        {project.details.year && (
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Year
            </div>
            <div className="font-medium">{project.details.year}</div>
          </div>
        )}
        {project.details.size && (
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Size
            </div>
            <div className="font-medium">{project.details.size}</div>
          </div>
        )}
        {project.details.type && (
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Type
            </div>
            <div className="font-medium">{project.details.type}</div>
          </div>
        )}
        {project.details.status && (
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Status
            </div>
            <div className="font-medium">{project.details.status}</div>
          </div>
        )}
      </div>

      {/* Location */}
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-1">Location</h4>
        <p className="text-slate-700">{project.location}</p>
      </div>

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
    <Section className="px-6 lg:px-28 2xl:px-48 xl:px-36 mb-18" id="projects">
      <Prose className="pb-8">
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
