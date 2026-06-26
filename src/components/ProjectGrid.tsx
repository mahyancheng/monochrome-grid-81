import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { Link, useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";

const categories = ["All", "Landed", "Bungalow", "Hospitality"];
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
  const activeSlot = useRef<"a" | "b">("a");

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

  useLayoutEffect(() => {
    const current = activeSlot.current === "a" ? slotA.current : slotB.current;
    const incoming = activeSlot.current === "a" ? slotB.current : slotA.current;
    if (!current || !incoming) return;

    if (currentImg === 0 && activeSlot.current === "a") {
      current.src = images[0];
      current.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:2;transform:translateX(0);transition:none;";
      incoming.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;transform:translateX(100%);transition:none;";
      return;
    }

    incoming.src = images[currentImg];
    incoming.style.transition = "none";
    incoming.style.zIndex = "2";
    incoming.style.transform = "translateX(100%)";

    incoming.getBoundingClientRect();

    const ease = "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)";
    incoming.style.transition = ease;
    incoming.style.transform = "translateX(0)";

    current.style.transition = ease;
    current.style.zIndex = "1";
    current.style.transform = "translateX(-100%)";

    const t = setTimeout(() => {
      current.style.transition = "none";
      current.style.transform = "translateX(100%)";
      current.style.zIndex = "1";
    }, 850);

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

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const urlCategory = searchParams.get("category");
  const initialCategory = urlCategory && categories.includes(urlCategory) ? urlCategory : "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    if (urlCategory && categories.includes(urlCategory)) {
      setActiveCategory(urlCategory);
    } else if (!urlCategory) {
      setActiveCategory("All");
    }

    if (location.hash === "#projects") {
      const el = document.getElementById("projects");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });

          const currentParams = searchParams.toString();
          const newUrl = currentParams ? `${location.pathname}?${currentParams}` : location.pathname;
          navigate(newUrl, { replace: true });
        }, 150);
      }
    }
  }, [urlCategory, location.hash, location.pathname, searchParams, navigate]);

  const handleHover = useCallback((id: string) => () => setHoveredId(id), []);
  const handleLeave = useCallback(() => setHoveredId(null), []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);

    const newParams = new URLSearchParams(searchParams);
    if (cat === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", cat);
    }
    setSearchParams(newParams, { replace: true, preventScrollReset: true });
  };

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* 调整分类栏布局 */}
      <div className="flex justify-start md:justify-center gap-6 md:gap-12 py-6 px-6 md:px-16 border-b border-border overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className="relative group shrink-0" // 增加 shrink-0 确保手机端文字不被压缩
          >
            <span className={`text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase transition-colors whitespace-nowrap ${activeCategory === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}>
              {cat}
            </span>
            <div
              className="absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300"
              style={{ width: activeCategory === cat ? "100%" : "0%" }}
            />
          </button>
        ))}
      </div>

      {/* Grid 布局：确保在手机、iPad、桌面端均整齐排列 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 px-6 md:px-16 py-10 md:py-16">
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
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-6">
          <span className="font-futura text-sm tracking-[0.2em] uppercase text-foreground">
            Projects coming soon
          </span>
          <p className="text-xs text-muted-foreground mt-4 tracking-[0.1em] text-center max-w-sm">
            We are currently updating our portfolio for this category. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;