import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { getProjectListSchema } from "@/lib/schema";
import SEO from "./SEO";

const categories = ["All", "Residential", "Commercial", "Hospitality"];

const isCoarsePointer =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(pointer: coarse)").matches;

const ProjectTile = ({
  project, index, isHovered, onHover, onLeave,
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

  // 两个 img ref，交替充当"current"和"incoming"
  const slotA = useRef<HTMLImageElement>(null);
  const slotB = useRef<HTMLImageElement>(null);
  const activeSlot = useRef<"a" | "b">("a"); // 哪个 slot 是当前显示的

  const intervalMs = (isCoarsePointer ? 6000 : 3000) + (index % 5) * 400;

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

  // currentImg 变化时，用 DOM 直接做滑动，不依赖 React re-render timing
  useLayoutEffect(() => {
    const current = activeSlot.current === "a" ? slotA.current : slotB.current;
    const incoming = activeSlot.current === "a" ? slotB.current : slotA.current;
    if (!current || !incoming) return;

    // 首张图：直接显示，不做动画
    if (currentImg === 0 && activeSlot.current === "a") {
      current.src = images[0];
      current.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:2;transform:translateX(0);transition:none;";
      incoming.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;transform:translateX(100%);transition:none;";
      return;
    }

    // 1. incoming 图片换成新的，瞬间放到右侧（无 transition）
    incoming.src = images[currentImg];
    incoming.style.transition = "none";
    incoming.style.zIndex = "2";
    incoming.style.transform = "translateX(100%)";

    // 2. 强制 flush layout，让浏览器认可上面的起始位置
    incoming.getBoundingClientRect();

    // 3. 开启 transition，两张图同时滑动
    const ease = "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)";
    incoming.style.transition = ease;
    incoming.style.transform = "translateX(0)";

    current.style.transition = ease;
    current.style.zIndex = "1";
    current.style.transform = "translateX(-100%)";

    // 4. 动画结束后，旧图退到右侧待机（为下一次做准备）
    const t = setTimeout(() => {
      current.style.transition = "none";
      current.style.transform = "translateX(100%)";
      current.style.zIndex = "1";
    }, 850);

    // 5. 切换 active slot
    activeSlot.current = activeSlot.current === "a" ? "b" : "a";

    return () => clearTimeout(t);
  }, [currentImg]);

  return (
    <Link
      to={`/project/${project.id}/`}
      className="block group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        ref={tileRef}
        className="relative aspect-[3/2] overflow-hidden bg-muted"
        style={{
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.7s ease",
        }}
      >
        {/* Slot A */}
        <img
          ref={slotA}
          src={images[0]}
          alt={project.title}
          width={600}
          height={400}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={index < 3 ? "high" : "low"}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", zIndex: 2, transform: "translateX(0)",
          }}
        />
        {/* Slot B — 待机在右侧，看不见 */}
        <img
          ref={slotB}
          src={images[1] ?? images[0]}
          alt=""
          aria-hidden
          width={600}
          height={400}
          loading="lazy"
          decoding="async"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", zIndex: 1, transform: "translateX(100%)",
          }}
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
      <SEO 
        title="Architect Firm | Interior Architect Malaysia | Hidi Lau Architect"
        description="Explore our portfolio of award-winning residential, commercial and hospitality projects."
        path="/projects" // 或者根据你路由的实际情况
        schema={getProjectListSchema(projects)} // 自动生成包含所有项目的列表索引
      />
      <div className="flex justify-start md:justify-center gap-6 md:gap-8 py-6 px-4 md:px-0 border-b border-border overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className="relative group">
            <span className={`text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase transition-colors whitespace-nowrap ${
              activeCategory === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}>{cat}</span>
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