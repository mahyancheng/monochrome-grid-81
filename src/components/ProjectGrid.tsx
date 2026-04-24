import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const categories = ["All", "Residential", "Commercial", "Hospitality"];

// Detect coarse pointer (mobile/tablet) once at module level
const isCoarsePointer =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(pointer: coarse)").matches;

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
  const [isVisible, setIsVisible] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);
  // Slower intervals on mobile to reduce decode/network churn
  const intervalMs = (isCoarsePointer ? 6000 : 3000) + (index % 5) * 400;

  // Only animate / preload when tile is in (or near) viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "200px" }
    );
    if (tileRef.current) observer.observe(tileRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || images.length <= 1) return;
    const id = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [isVisible, images.length, intervalMs]);

  return (
    <Link
      to={`/project/${project.id}`}
      className="block group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        ref={tileRef}
        className="relative aspect-[3/2] overflow-hidden bg-muted"
      >
        <img
          src={images[currentImg]}
          alt={project.title}
          width={600}
          height={400}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : undefined,
            transition: isHovered
              ? "transform 0.7s ease, opacity 0.5s ease"
              : "opacity 0.5s ease",
          }}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={index < 3 ? "high" : "low"}
        />
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

  const handleHover = useCallback((id: string) => () => setHoveredId(id), []);
  const handleLeave = useCallback(() => setHoveredId(null), []);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      <div className="flex justify-start md:justify-center gap-6 md:gap-8 py-6 px-4 md:px-0 border-b border-border overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="relative group"
          >
            <span
              className={`text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase transition-colors whitespace-nowrap ${
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 px-4 md:px-16 py-6 md:py-10">
        {filtered.map((project, i) => (
          <ProjectTile
            key={project.id}
            project={project}
            index={i}
            isHovered={hoveredId === project.id}
            onHover={handleHover(project.id)}
            onLeave={handleLeave}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;