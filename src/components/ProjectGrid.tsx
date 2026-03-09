import { useState } from "react";

// Cover images for each project - one representative image per project
import ritzCarlton from "@/Archive/Projects/1211.jpg";
import rabbitHole from "@/Archive/Projects/untitled-design.jpg";
import courtyardHouse from "@/Archive/Projects/courtyard-house_01.jpg";
import ecoSanctuary from "@/Archive/Projects/ecosanctuary1.jpeg";
import eastMeetsWest from "@/Archive/Projects/emw_01-min.jpg";
import iconicTerrace from "@/Archive/Projects/sd_01-min.jpg";
import suteraTerrace from "@/Archive/Projects/sutera_01-min.jpg";
import horizonHills from "@/Archive/Projects/7-horizon-hills--min.jpg";
import aorHouse from "@/Archive/Projects/01aor-min.jpg";
import langkawiKitchen from "@/Archive/Projects/langkawi-kitchen_01-min.jpg";
import beachGrill from "@/Archive/Projects/bg_01_11zon.jpg";
import winterPavillion from "@/Archive/Projects/01-min.jpg";
import indahPutra from "@/Archive/Projects/1-min.jpg";
import founders from "@/Archive/Projects/251035136_10159342373913405_2417157340936658523_n.jpg";
import chicha from "@/Archive/Projects/01(1).jpg";

const projects = [
  { id: 1, src: ritzCarlton, title: "The Ritz-Carlton Langkawi", category: "Hospitality" },
  { id: 2, src: rabbitHole, title: "The Rabbit Hole KL", category: "Commercial" },
  { id: 3, src: courtyardHouse, title: "The Courtyard House", category: "Residential" },
  { id: 4, src: ecoSanctuary, title: "Eco Sanctuary", category: "Residential" },
  { id: 5, src: eastMeetsWest, title: "The East Meets West", category: "Residential" },
  { id: 6, src: iconicTerrace, title: "The Iconic Terrace", category: "Residential" },
  { id: 7, src: suteraTerrace, title: "Sutera Terrace Corner", category: "Residential" },
  { id: 8, src: horizonHills, title: "Horizon Hills", category: "Residential" },
  { id: 9, src: aorHouse, title: "AOR House", category: "Residential" },
  { id: 10, src: langkawiKitchen, title: "Langkawi Kitchen", category: "Hospitality" },
  { id: 11, src: beachGrill, title: "Beach Grill Welcome Pavilion", category: "Hospitality" },
  { id: 12, src: winterPavillion, title: "Winter Pavillion", category: "Residential" },
  { id: 13, src: indahPutra, title: "Indah Putra Bungalow", category: "Residential" },
  { id: 14, src: founders, title: "Founders Penang", category: "Commercial" },
  { id: 15, src: chicha, title: "CHICHA San Chen Puchong", category: "Commercial" },
];

const categories = ["All", "Residential", "Commercial", "Hospitality"];

const ProjectGrid = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
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
            className={`text-xs tracking-[0.25em] uppercase transition-colors ${
              activeCategory === cat
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 w-full">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="relative aspect-square overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <img
              src={project.src}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500"
              style={{
                transform: hoveredId === project.id ? "scale(1.05)" : "scale(1)",
              }}
            />
            <div
              className="absolute inset-0 bg-primary/70 flex flex-col items-center justify-center transition-opacity duration-300"
              style={{
                opacity: hoveredId === project.id ? 1 : 0,
              }}
            >
              <span className="text-primary-foreground text-sm tracking-[0.3em] uppercase font-light text-center px-4">
                {project.title}
              </span>
              <span className="text-primary-foreground/60 text-xs tracking-[0.2em] mt-2">
                {project.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
