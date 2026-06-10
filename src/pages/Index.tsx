import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import HeroSlider from "@/components/HeroSlider";
import ResidentialFeature from "@/components/ResidentialFeature";
import BespokeDesign from "@/components/BespokeDesign";
import ConnectWithUs from "@/components/ConnectWithUs";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { getHomeSchema } from "@/lib/schema";
import ContactSection from "@/components/ContactSection";
import CredentialsBar from "@/components/CredentialsBar";
import IntentNav from "@/components/IntentNav";
import FAQSection from "@/components/FAQSection"; // <-- 导入刚刚创建的 FAQ 组件

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Interior Architect Malaysia | Design and Build Company | GET A QUOTE NOW"
        description="Multi-disciplinary architectural design studio in Johor Bahru, Malaysia. Architecture, interior design and passionate craftsmanship since 1989."
        path="/"
        schema={getHomeSchema()}
      />
      <main className="flex-1">
        <div className="relative">
          <HeroSlider />
          <div className="absolute top-0 left-0 w-full z-20">
            <Header transparent />
          </div>
        </div>
        <CredentialsBar />
        <IntentNav />

        <ResidentialFeature />

        <BespokeDesign />

        <div id="projects">
          <ProjectGrid />
        </div>

        {/* 插入 FAQ Section */}

        <ConnectWithUs />
        <FAQSection />

        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;