import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ServiceAccordion } from "@/components/ui/service-accordion";
import { FeaturedSpotlight, AnimatedLabel, CornerAccents } from "@/components/ui/feature-spotlight";

import SEO from "@/components/SEO";
import img1 from "@/Archive/Services/07aor-min.jpg";
import img2 from "@/Archive/Services/08aor-min.png";
import img3 from "@/Archive/Projects/courtyard-house_01.jpg";
import img4 from "@/Archive/Projects/emw_01-min.jpg";

const services = [
  {
    id: 1,
    title: "Architectural Design",
    description:
      "Comprehensive architectural solutions from concept to completion, blending form and function.",
    imageUrl: img1,
  },
  {
    id: 2,
    title: "Interior Design",
    description:
      "Crafting refined interiors that reflect your lifestyle with meticulous attention to detail.",
    imageUrl: img2,
  },
  {
    id: 3,
    title: "Authority Submissions",
    description:
      "Professional handling of all regulatory submissions and approvals for seamless project delivery.",
    imageUrl: img3,
  },
  {
    id: 4,
    title: "Passionate Craftsmanship",
    description:
      "Every element is carefully selected and crafted to achieve absolute perfection.",
    imageUrl: img4,
  },
];

const Services = () => {
  const [introHover, setIntroHover] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Interior Design and Build Malaysia | Service | HIDI LAU ARCHITECTURE | GET A INSTANT QUOTE NOW"
        description="Architectural design, interior design, authority submissions and passionate craftsmanship. HIDI Lau Architect delivers excellence from concept to completion."
        path="/services"
      />
      <Header />
      <main className="flex-1">
      <div className="py-10 border-b border-border">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-foreground" />
            <h1 className="text-xs tracking-[0.5em] uppercase text-foreground">
              Services
            </h1>
            <div className="w-8 h-px bg-foreground" />
          </div>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 w-full"
          onMouseEnter={() => setIntroHover(true)}
          onMouseLeave={() => setIntroHover(false)}
        >
        </div>

        {/* Interactive accordion */}
        <div className="border-t border-border">
          <ServiceAccordion items={services} />
        </div>

        {/* Services grid with spotlight design */}
        <div className="grid grid-cols-1 md:grid-cols-4 w-full border-y border-border">
          {services.map((s, i) => (
            <div
              key={s.id}
              className="group py-10 px-6 border-b md:border-b-0 md:border-r border-border last:border-r-0 last:border-b-0 relative"
            >
              <span className="text-[10px] text-muted-foreground/30 tracking-[0.2em] mb-3 block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-px bg-foreground transition-all duration-500 group-hover:w-6" />
                <h3 className="text-[10px] tracking-[0.25em] uppercase text-foreground">
                  {s.title}
                </h3>
              </div>
              <p className="text-[10px] leading-5 text-muted-foreground font-light pl-5">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
