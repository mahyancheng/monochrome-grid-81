import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ServiceAccordion } from "@/components/ui/service-accordion";
import { FeaturedSpotlight, AnimatedLabel, CornerAccents } from "@/components/ui/feature-spotlight";

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
      <Header />
      <main className="flex-1">
        {/* Title */}
        <div className="py-10 border-b border-border">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-foreground" />
            <h1 className="text-xs tracking-[0.5em] uppercase text-foreground">
              Services
            </h1>
            <div className="w-8 h-px bg-foreground" />
          </div>
        </div>

        {/* Intro — Spotlight style */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 w-full"
          onMouseEnter={() => setIntroHover(true)}
          onMouseLeave={() => setIntroHover(false)}
        >
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 md:py-0 md:aspect-square">
            <AnimatedLabel text="Our Expertise" isActive={introHover} />
            <h2 className="text-xl md:text-2xl tracking-[0.15em] uppercase font-light text-foreground mt-6 mb-2">
              With Passion
            </h2>
            <h2 className="text-xl md:text-2xl tracking-[0.15em] uppercase font-light text-foreground mb-6">
              And Dedication
            </h2>
            <p className="text-xs leading-6 text-muted-foreground font-light max-w-sm mb-8">
              HIDI Lau Architect believes that a comfortable living
              environment is key to happiness. Guided by our knowledge and
              experience in architectural design and interior design services, we
              are committed to designing and crafting a home that truly reflects
              your lifestyle and personality.
            </p>
            <a href="/contact" className="group flex items-center gap-3">
              <div className="w-8 h-8 border border-foreground flex items-center justify-center transition-colors duration-300 group-hover:bg-foreground">
                <ArrowUpRight
                  size={14}
                  className="text-foreground transition-colors duration-300 group-hover:text-background"
                />
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-foreground">
                Get A Quote
              </span>
            </a>
          </div>
          <div className="relative aspect-square overflow-hidden">
            <img
              src={img1}
              alt="Our Expertise"
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ transform: introHover ? "scale(1.05)" : "scale(1)" }}
            />
            <div
              className="absolute inset-0 bg-foreground/10 transition-opacity duration-500"
              style={{ opacity: introHover ? 0 : 1 }}
            />
            <CornerAccents className="opacity-40" />
            <span className="absolute bottom-4 right-6 text-[10px] tracking-[0.3em] text-background/60">
              01
            </span>
          </div>
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

        {/* CTA section */}
        <div className="py-16 px-6 text-center relative">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-6 h-px bg-foreground" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              For Your Better Lifestyle
            </span>
            <div className="w-6 h-px bg-foreground" />
          </div>
          <p className="text-xs leading-6 text-muted-foreground font-light max-w-lg mx-auto mb-8">
            Speak to us today and let our architectural and interior design team
            help you visualize your house design, transforming ideas into a
            well-crafted living space.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 mx-auto"
          >
            <div className="w-8 h-8 border border-foreground flex items-center justify-center transition-colors duration-300 group-hover:bg-foreground">
              <ArrowUpRight
                size={14}
                className="text-foreground transition-colors duration-300 group-hover:text-background"
              />
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-foreground">
              Contact Us
            </span>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
