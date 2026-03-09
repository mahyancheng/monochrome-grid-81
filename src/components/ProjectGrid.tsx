import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const categories = ["All", "Residential", "Commercial", "Hospitality"];

const ProjectGrid = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex justify-center gap-8 py-6 border-b border-border">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs tracking-[0.25em] uppercase transition-colors ${
              activeCategory === cat
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 w-full">
        {filtered.map((project) => (
          <Link
            key={project.id}
            to={`/project/${project.id}`}
            className="relative aspect-square overflow-hidden cursor-pointer block"
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <img
              src={project.cover}
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
              <span className="text-primary-foreground text-sm tracking-[0.3em] uppercase font-light text-center px-4">
                {project.title}
              </span>
              <span className="text-primary-foreground/60 text-xs tracking-[0.2em] mt-2">
                {project.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
