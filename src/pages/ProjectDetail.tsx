import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimatedLabel, CornerAccents } from "@/components/ui/feature-spotlight";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [headerHover, setHeaderHover] = useState(false);

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

        {/* Image grid with corner accents */}
        <div className="grid grid-cols-2 md:grid-cols-3 w-full">
          {project.images.map((img, i) => (
            <div key={i} className="relative aspect-square overflow-hidden group">
              <img
                src={img}
                alt={`${project.title} ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/5 group-hover:bg-transparent transition-all duration-500" />
              {/* Corner accents on hover */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-foreground/0 group-hover:border-foreground/30 transition-all duration-500" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-foreground/0 group-hover:border-foreground/30 transition-all duration-500" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-foreground/0 group-hover:border-foreground/30 transition-all duration-500" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-foreground/0 group-hover:border-foreground/30 transition-all duration-500" />
              <span className="absolute bottom-3 right-4 text-[9px] tracking-[0.2em] text-foreground/0 group-hover:text-foreground/30 transition-all duration-500">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
