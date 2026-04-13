import { useState, useEffect, useCallback } from "react";

import img1 from "@/Archive/HomePage/Image Rotation/1.jpg";
import img2 from "@/Archive/HomePage/Image Rotation/2.jpg";
import img3 from "@/Archive/HomePage/Image Rotation/3.jpg";
import img4 from "@/Archive/HomePage/Image Rotation/4.jpg";
import img5 from "@/Archive/HomePage/Image Rotation/5.jpg";
import img6 from "@/Archive/HomePage/Image Rotation/6.jpg";
import img7 from "@/Archive/HomePage/Image Rotation/7.jpg";

const slides = [img1, img2, img3, img4, img5, img6, img7];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (index === current || isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [current, isTransitioning]
  );

  // Auto-advance every 5s, reset on manual navigation
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [current]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Images */}
      {slides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Project showcase ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-foreground/5" />

      {/* Circle dot navigation at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="group relative flex items-center justify-center"
          >
            <span
              className={`block rounded-full border transition-all duration-300 ${
                i === current
                  ? "w-3 h-3 bg-background border-background"
                  : "w-2.5 h-2.5 bg-background/40 border-background/60 hover:bg-background/70"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <span className="absolute bottom-6 right-6 text-[10px] tracking-[0.3em] text-background/60 z-10">
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </span>
    </div>
  );
};

export default HeroSlider;
