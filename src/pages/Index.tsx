import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import HeroSlider from "@/components/HeroSlider";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Interior Architect Malaysia | Design and Build Company | GET A QUOTE NOW"
        description="Multi-disciplinary architectural design studio in Johor Bahru, Malaysia. Architecture, interior design and passionate craftsmanship since 1989."
        path="/"
      />
      <main className="flex-1">
        <div className="relative">
          <HeroSlider />
          <div className="absolute top-0 left-0 w-full z-20">
            <Header transparent />
          </div>
        </div>

        <div id="projects">
          <ProjectGrid />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Index;
