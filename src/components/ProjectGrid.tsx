import { useState } from "react";

import arch1 from "@/assets/arch-1.jpg";
import arch2 from "@/assets/arch-2.jpg";
import arch3 from "@/assets/arch-3.jpg";
import arch4 from "@/assets/arch-4.jpg";
import arch5 from "@/assets/arch-5.jpg";
import arch6 from "@/assets/arch-6.jpg";
import arch7 from "@/assets/arch-7.jpg";
import arch8 from "@/assets/arch-8.jpg";
import arch9 from "@/assets/arch-9.jpg";

const projects = [
  { id: 1, src: arch1, title: "Concrete Volumes", year: "2024" },
  { id: 2, src: arch2, title: "Light & Space", year: "2024" },
  { id: 3, src: arch3, title: "Angular Forms", year: "2023" },
  { id: 4, src: arch4, title: "Ascending", year: "2023" },
  { id: 5, src: arch5, title: "Museum Hall", year: "2023" },
  { id: 6, src: arch6, title: "Facade Study", year: "2022" },
  { id: 7, src: arch7, title: "Glass & Concrete", year: "2022" },
  { id: 8, src: arch8, title: "Passage", year: "2022" },
  { id: 9, src: arch9, title: "Material Junction", year: "2021" },
];

const ProjectGrid = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-3 w-full">
      {projects.map((project) => (
        <div
          key={project.id}
          className="relative aspect-square overflow-hidden cursor-pointer"
          onMouseEnter={() => setHoveredId(project.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <img
            src={project.src}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: hoveredId === project.id ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div
            className="absolute inset-0 bg-primary/70 flex flex-col items-center justify-center transition-opacity duration-300"
            style={{
              opacity: hoveredId === project.id ? 1 : 0,
            }}
          >
            <span className="text-primary-foreground text-sm tracking-[0.3em] uppercase font-light">
              {project.title}
            </span>
            <span className="text-primary-foreground/60 text-xs tracking-[0.2em] mt-2">
              {project.year}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
