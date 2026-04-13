import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimatedLabel, CornerAccents } from "@/components/ui/feature-spotlight";
import SEO from "@/components/SEO";
import { projects } from "@/data/projects";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "Residential": return "Residential Architect Malaysia";
    case "Commercial": return "Commercial Interior Design";
    case "Hospitality": return "Hospitality Interior Design";
    default: return category;
  }
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [headerHover, setHeaderHover] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Combined images for lightbox: carousel images first, then gallery images
  const allImages = [
    ...(project?.carouselImages || []),
    ...(project?.images || []),
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (!project?.carouselImages || project.carouselImages.length <= 1) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % project.carouselImages!.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [project?.carouselImages]);
  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Project not found
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={`${getCategoryLabel(project.category)} | Project | HIDI LAU ARCHITECTURE`}
        description={project.description || `${project.title} — ${project.category} project by HIDI Lau Architect, Johor Bahru.`}
        path={`/project/${project.id}`}
      />
      <Header />
      <main className="flex-1">
        {/* Title bar with spotlight styling */}
        <div
          className="border-b border-border py-10 px-6"
          onMouseEnter={() => setHeaderHover(true)}
          onMouseLeave={() => setHeaderHover(false)}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <AnimatedLabel text={project.category} isActive={headerHover} />
              <h1 className="text-xl md:text-2xl tracking-[0.15em] uppercase font-light text-foreground mt-3">
                {project.title}
              </h1>
            </div>
            <Link
              to="/"
              className="group flex items-center gap-2"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                All Projects
              </span>
              <div className="w-6 h-6 border border-border flex items-center justify-center transition-colors duration-300 group-hover:border-foreground">
                <ArrowUpRight
                  size={10}
                  className="text-muted-foreground group-hover:text-foreground transition-colors rotate-180"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Project info — spotlight layout */}
        {(project.description || project.client) && (
          <div className="border-b border-border py-10 px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
              {project.description && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-px bg-foreground" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                      Overview
                    </span>
                  </div>
                  <p className="text-xs leading-6 text-muted-foreground font-light pl-6">
                    {project.description}
                  </p>
                </div>
              )}
              <div className="space-y-3">
                {[
                  { label: "Client", value: project.client },
                  { label: "Location", value: project.location },
                  { label: "Duration", value: project.duration },
                  { label: "Architect", value: project.leadArchitect },
                ]
                  .filter((item) => item.value)
                  .map((item, i) => (
                    <div key={i} className="flex gap-4 items-baseline">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-foreground w-24 shrink-0 flex items-center gap-2">
                        <span className="text-muted-foreground/30">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </span>
                      <span className="text-[10px] tracking-[0.15em] text-muted-foreground">
                        {item.value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Hero carousel — only for projects with carouselImages */}
        {project.carouselImages && project.carouselImages.length > 1 && (
          <div className="py-12 md:py-16">
            <div className="relative overflow-hidden" style={{ height: "55vh" }}>
              <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
              >
                {project.carouselImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="min-w-full h-full flex items-center justify-center cursor-pointer"
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <img
                      src={img}
                      alt={`${project.title} ${idx + 1}`}
                      className="max-w-[85%] md:max-w-[70%] h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {project.carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    idx === carouselIndex
                      ? "w-6 bg-primary"
                      : "w-4 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Image gallery — alternating 1-up / 2-up rows */}
        <div className="flex flex-col gap-4 md:gap-6 px-6 md:px-10 py-8">
          {(() => {
            const rows: React.ReactNode[] = [];
            let i = 0;
            let rowIdx = 0;
            const carouselOffset = project.carouselImages?.length || 0;
            while (i < project.images.length) {
              const isWideRow = rowIdx % 2 === 0;
              if (isWideRow) {
                const img = project.images[i];
                const imgIndex = i;
                rows.push(
                  <div
                    key={i}
                    className="relative w-full aspect-[16/9] overflow-hidden group cursor-pointer"
                    onClick={() => setLightboxIndex(carouselOffset + imgIndex)}
                  >
                    <img src={img} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                );
                i += 1;
              } else {
                const imgs = project.images.slice(i, i + 2);
                const startI = i;
                rows.push(
                  <div key={i} className="grid grid-cols-2 gap-4 md:gap-6">
                    {imgs.map((img, j) => (
                      <div
                        key={startI + j}
                        className="relative aspect-[4/5] overflow-hidden group cursor-pointer"
                        onClick={() => setLightboxIndex(carouselOffset + startI + j)}
                      >
                        <img src={img} alt={`${project.title} ${startI + j + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                    ))}
                  </div>
                );
                i += imgs.length;
              }
              rowIdx++;
            }
            return rows;
          })()}
        </div>

        {/* Lightbox */}
        <Dialog open={lightboxIndex !== null} onOpenChange={() => setLightboxIndex(null)}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-none bg-black/95 flex items-center justify-center">
            {lightboxIndex !== null && (
              <>
                <img
                  src={allImages[lightboxIndex]}
                  alt={`${project.title} ${lightboxIndex + 1}`}
                  className="max-w-full max-h-[90vh] object-contain"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex((lightboxIndex + 1) % allImages.length);
                      }}
                      className="absolute right-12 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] text-white/50">
                  {String(lightboxIndex + 1).padStart(2, "0")} / {String(allImages.length).padStart(2, "0")}
                </span>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
