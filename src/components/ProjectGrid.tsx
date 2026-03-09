import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const categories = ["All", "Residential", "Commercial", "Hospitality"];

/** A single grid tile that auto-cycles through gallery images */
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
  const images = [project.cover, ...project.gallery];
  const [currentImg, setCurrentImg] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Each tile gets a different interval offset so they don't all change at once
  const intervalMs = 3000 + (index % 5) * 400;

  useEffect(() => {
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length, intervalMs]);

  return (
    <Link
      to={`/project/${project.id}`}
      className="relative aspect-square overflow-hidden cursor-pointer block group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Stacked images with crossfade */}
      {images.map((img, imgIdx) => (
        <img
          key={imgIdx}
          src={img}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
          style={{
            opacity: imgIdx === currentImg ? 1 : 0,
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
          loading="lazy"
        />
      ))}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 bg-primary/70 flex flex-col items-center justify-center transition-opacity duration-500 z-10"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-primary-foreground/50" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-primary-foreground/50" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-primary-foreground/50" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-primary-foreground/50" />

        <span className="text-primary-foreground text-sm tracking-[0.3em] uppercase font-light text-center px-4">
          {project.title}
        </span>
        <span className="text-primary-foreground/60 text-xs tracking-[0.2em] mt-2">
          {project.category}
        </span>
        <span className="text-primary-foreground/30 text-[10px] tracking-[0.3em] absolute bottom-4 right-6">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
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
      <div className="grid grid-cols-2 md:grid-cols-3 w-full">
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
