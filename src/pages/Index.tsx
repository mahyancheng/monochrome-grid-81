import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";
import { projects } from "@/data/projects";

import heroImg1 from "@/Archive/HomePage/courtyard-house_11-1.jpg";
import heroImg2 from "@/Archive/Projects/emw_01-min.jpg";
import heroImg3 from "@/Archive/Projects/langkawi-kitchen_01-min.jpg";

const heroSections = [
  {
    leftLabel: "Architecture",
    title: "Designed For Living",
    background: heroImg1,
  },
  {
    leftLabel: "Interior",
    title: "Attentive Craft",
    background: heroImg2,
  },
  {
    leftLabel: "Hospitality",
    title: "Enthralling Space",
    background: heroImg3,
  },
];

import ctaImg from "@/Archive/HomePage/01.jpg";

const Index = () => {
  const [ctaHovered, setCtaHovered] = useState(false);
  const apiRef = useRef<FullScreenFXAPI>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero — Full-screen scroll FX (left side only) */}
      <div className="relative">
        <FullScreenScrollFX
          sections={heroSections}
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-primary-foreground/50" />
                <span
                  className="text-primary-foreground/70"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Tectone Design
                </span>
              </div>
              <nav className="hidden md:flex gap-6">
                {[
                  { label: "Projects", href: "/" },
                  { label: "About", href: "/about" },
                  { label: "Services", href: "/services" },
                  { label: "Contact", href: "/contact" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                    className="text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          }
          footer={
            <a
              href="#projects"
              className="group inline-flex items-center gap-3"
            >
              <div
                className="w-8 h-8 border flex items-center justify-center transition-colors duration-300 group-hover:bg-primary-foreground"
                style={{ borderColor: "hsl(var(--primary-foreground) / 0.3)" }}
              >
                <ArrowUpRight
                  size={14}
                  className="text-primary-foreground transition-colors duration-300 group-hover:text-primary"
                />
              </div>
              <span
                className="text-primary-foreground/70"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                View Projects
              </span>
            </a>
          }
          showProgress
          durations={{ change: 0.7, snap: 800 }}
          apiRef={apiRef}
        />
      </div>

      {/* Sticky Header for rest of page */}
      <Header />

      {/* Section divider */}
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
      <main className="flex-1" id="projects">
        <ProjectGrid />

        {/* Bottom CTA */}
        <div
          className="relative grid grid-cols-1 md:grid-cols-2 w-full border-t border-border"
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
        >
          <div className="relative aspect-square overflow-hidden">
            <img
              src={ctaImg}
              alt="Connect with us"
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ transform: ctaHovered ? "scale(1.03)" : "scale(1)" }}
            />
            <div
              className="absolute inset-0 bg-foreground/10 transition-opacity duration-500"
              style={{ opacity: ctaHovered ? 0 : 1 }}
            />
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-background/50" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-background/50" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-background/50" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-background/50" />
          </div>
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 md:py-0 md:aspect-square">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="h-px bg-foreground transition-all duration-700"
                style={{ width: ctaHovered ? "3rem" : "1.5rem" }}
              />
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Connect
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl tracking-[0.15em] uppercase font-light text-foreground mb-2">
              Embrace Your
            </h2>
            <h2 className="text-2xl md:text-3xl tracking-[0.15em] uppercase font-light text-foreground mb-6">
              Dream
            </h2>
            <p className="text-xs leading-6 text-muted-foreground font-light max-w-sm mb-8">
              Speak to us today and let our architectural and interior design
              team help you visualize your house design, transforming ideas into
              a well-crafted living space.
            </p>
            <Link to="/about" className="group flex items-center gap-3">
              <div className="w-8 h-8 border border-foreground flex items-center justify-center transition-colors duration-300 group-hover:bg-foreground">
                <ArrowUpRight
                  size={14}
                  className="text-foreground transition-colors duration-300 group-hover:text-background"
                />
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-foreground">
                Get In Touch
              </span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
