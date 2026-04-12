import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const categories = ["All", "Residential", "Commercial", "Hospitality"];

const ProjectTile = ({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  project: (typeof projects)[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const images = [project.cover, ...project.images];
  const [currentImg, setCurrentImg] = useState(0);
  const intervalMs = 3000 + (index % 5) * 400;

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <Link
      to={`/project/${project.id}`}
      className="block group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        {/* Sliding strip of images */}
        <div
          className="absolute inset-0 flex h-full"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${(currentImg * 100) / images.length}%)`,
            transition: "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)",
          }}
        >
          {images.map((img, imgIdx) => (
            <img
              key={imgIdx}
              src={img}
              alt={project.title}
              className="h-full object-cover transition-transform duration-700"
              style={{
                width: `${100 / images.length}%`,
                flexShrink: 0,
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
              loading="lazy"
            />
          ))}
        </div>
      </div>
      <p className="text-xs tracking-[0.15em] text-muted-foreground mt-3 text-center">
        {project.title}
      </p>
    </Link>
  );
};

const ProjectGrid = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
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
            className="relative group"
          >
            <span
              className={`text-xs tracking-[0.25em] uppercase transition-colors ${
                activeCategory === cat
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </span>
            <div
              className="absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300"
              style={{ width: activeCategory === cat ? "100%" : "0%" }}
            />
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 px-8 md:px-16 py-10">
        {filtered.map((project, i) => (
          <ProjectTile
            key={project.id}
            project={project}
            index={i}
            isHovered={hoveredId === project.id}
            onHover={() => setHoveredId(project.id)}
            onLeave={() => setHoveredId(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
