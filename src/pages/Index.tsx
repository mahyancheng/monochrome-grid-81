import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import HeroSlider from "@/components/HeroSlider";
import { projects } from "@/data/projects";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Interior Architect Malaysia | Design and Build Company | GET A QUOTE NOW"
        description="Multi-disciplinary architectural design studio in Johor Bahru, Malaysia. Architecture, interior design and passionate craftsmanship since 1989."
        path="/"
      />
      <main className="flex-1">
        {/* Hero with overlaid header */}
        <div className="relative">
          <HeroSlider />
          <div className="absolute top-0 left-0 w-full z-20">
            <Header transparent />
          </div>
        </div>

        {/* Section divider with text */}
        <div className="border-y border-border py-6 px-6">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-foreground" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Our Project Gallery
              </span>
            </div>
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground">
              {projects.length} Projects
            </span>
          </div>
        </div>

        {/* Project Grid */}
        <div id="projects">
          <ProjectGrid />
        </div>

        {/* Footer */}
        <div className="border-t border-border py-8 text-center">
          <span className="text-[10px] tracking-[0.15em] text-muted-foreground">
            HIDI LAU ARCHITECT © 2026 All Rights Reserved
          </span>
        </div>
      </main>
    </div>
  );
};

export default Index;
