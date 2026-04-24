import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const intervalMs = 3000 + (index % 5) * 400;

  // IntersectionObserver: 只在 viewport 内才轮播
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (tileRef.current) observer.observe(tileRef.current);
    return () => observer.disconnect();
  }, []);

  // 当 currentImg 变化时，先把 strip 瞬间跳到新位置（无动画），
  // 再用 requestAnimationFrame 触发 CSS transition 滑回 0
  useLayoutEffect(() => {
    const strip = stripRef.current;
    if (!strip || currentImg === 0) return;

    // 1. 关闭 transition，瞬间跳到右边（新图在右侧外）
    strip.style.transition = "none";
    strip.style.transform = "translateX(100%)";

    // 2. 强制浏览器重新计算 layout（flush），让上面的位置生效
    strip.getBoundingClientRect();

    // 3. 开启 transition，滑动到 0（滑入）
    strip.style.transition = "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)";
    strip.style.transform = "translateX(0)";
  }, [currentImg]);

  useEffect(() => {
    if (!isVisible || images.length <= 1) return;
    const id = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [isVisible, images.length, intervalMs]);

  const nextImg = (currentImg + 1) % images.length;

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
        {/* 当前图：绑 stripRef，由 useLayoutEffect 控制滑动 */}
        <img
          ref={stripRef as React.RefObject<HTMLImageElement>}
          src={images[currentImg]}
          alt={project.title}
          width={600}
          height={400}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 2,
            transform: isHovered ? "scale(1.05)" : undefined,
            transition: isHovered ? "transform 0.7s ease" : undefined,
          }}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
        />

        {/* 下一张静默预加载，完全不显示 */}
        <img
          src={images[nextImg]}
          alt=""
          aria-hidden
          width={600}
          height={400}
          style={{ display: "none" }}
          loading="lazy"
          decoding="async"
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