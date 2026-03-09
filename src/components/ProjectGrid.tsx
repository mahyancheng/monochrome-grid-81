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
  const images = [project.cover, ...project.images];
  const [currentImg, setCurrentImg] = useState(0);
  const [prevImg, setPrevImg] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const intervalMs = 3000 + (index % 5) * 400;

  useEffect(() => {
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setPrevImg((prev) => {
        // prev is the old currentImg before we update
        return currentImg;
      });
      setIsTransitioning(true);
      setCurrentImg((prev) => (prev + 1) % images.length);

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
        setPrevImg(null);
      }, 800);
    }, intervalMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length, intervalMs, currentImg]);

  return (
    <Link
      to={`/project/${project.id}`}
      className="relative aspect-square overflow-hidden cursor-pointer block group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Outgoing image — slides left and out */}
      {prevImg !== null && (
        <img
          src={images[prevImg]}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          style={{
            transform: isTransitioning ? "translateX(-100%)" : "translateX(0)",
            transition: "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)",
          }}
          loading="lazy"
        />
      )}

      {/* Incoming image — slides in from right */}
      <img
        src={images[currentImg]}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover z-[1]"
        style={{
          transform:
            isTransitioning && prevImg !== null
              ? "translateX(0)"
              : prevImg !== null
              ? "translateX(100%)"
              : "translateX(0)",
          transition:
            isTransitioning
              ? "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)"
              : "none",
          ...(isHovered ? { scale: "1.05" } : {}),
        }}
        loading="lazy"
      />
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
