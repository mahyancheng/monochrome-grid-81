import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface SpotlightProps {
  label?: string;
  title: string[];
  description: string;
  ctaText?: string;
  ctaHref?: string;
  imageSrc: string;
  imageAlt?: string;
  index?: string;
  reverse?: boolean;
}

export function FeaturedSpotlight({
  label = "Featured",
  title,
  description,
  ctaText = "Explore",
  ctaHref = "#",
  imageSrc,
  imageAlt = "",
  index = "01",
  reverse = false,
}: SpotlightProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative grid grid-cols-1 md:grid-cols-2 w-full overflow-hidden transition-all duration-700 ${
        reverse ? "md:direction-rtl" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Text Block */}
      <div
        className={`flex flex-col justify-center px-8 lg:px-16 py-16 md:py-0 md:aspect-square ${
          reverse ? "md:order-2" : "md:order-1"
        }`}
        style={{ direction: "ltr" }}
      >
        {/* Label with animated line */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="h-px bg-foreground transition-all duration-700 ease-out"
            style={{ width: isHovered ? "3rem" : "1.5rem" }}
          />
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            {label}
          </span>
        </div>

        {/* Title */}
        <div className="mb-6">
          {title.map((line, i) => (
            <h2
              key={i}
              className="text-2xl md:text-3xl lg:text-4xl tracking-[0.15em] uppercase font-light text-foreground leading-tight"
              style={{
                transform: isHovered
                  ? `translateX(${i * 8}px)`
                  : "translateX(0)",
                transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`,
              }}
            >
              {line}
            </h2>
          ))}
        </div>

        {/* Description */}
        <p className="text-xs leading-6 text-muted-foreground font-light max-w-sm mb-8">
          {description}
        </p>

        {/* CTA */}
        <a href={ctaHref} className="group flex items-center gap-3">
          <div className="w-8 h-8 border border-foreground flex items-center justify-center transition-colors duration-300 group-hover:bg-foreground">
            <ArrowUpRight
              size={14}
              className="text-foreground transition-colors duration-300 group-hover:text-background"
            />
          </div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-foreground">
            {ctaText}
          </span>
        </a>
      </div>

      {/* Image Block */}
      <div
        className={`relative aspect-square flex items-center justify-center ${
          reverse ? "md:order-1" : "md:order-2"
        }`}
        style={{ direction: "ltr" }}
      >
        {/* Frame outline */}
        <div
          className="absolute inset-6 md:inset-10 border border-border transition-all duration-700"
          style={{
            transform: isHovered ? "scale(1.02)" : "scale(1)",
            opacity: isHovered ? 0.5 : 0.3,
          }}
        />

        {/* Image container */}
        <div className="relative w-[85%] h-[85%] overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div
            className="absolute inset-0 bg-foreground/10 transition-opacity duration-700"
            style={{ opacity: isHovered ? 0 : 1 }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-foreground" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-foreground" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-foreground" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-foreground" />
        </div>

        {/* Index number */}
        <span className="absolute bottom-4 right-6 text-[10px] tracking-[0.3em] text-muted-foreground">
          {index}
        </span>
      </div>
    </div>
  );
}

/* Corner accent component for reuse */
export function CornerAccents({ className = "" }: { className?: string }) {
  return (
    <>
      <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l border-foreground ${className}`} />
      <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r border-foreground ${className}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l border-foreground ${className}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r border-foreground ${className}`} />
    </>
  );
}

/* Animated label line for reuse */
export function AnimatedLabel({
  text,
  isActive = false,
}: {
  text: string;
  isActive?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-px bg-foreground transition-all duration-700 ease-out"
        style={{ width: isActive ? "3rem" : "1.5rem" }}
      />
      <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        {text}
      </span>
    </div>
  );
}
