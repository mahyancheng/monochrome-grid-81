import { useState, useEffect, useCallback, useMemo } from "react";

import img1 from "@/Archive/HomePage/Image Rotation/1.jpg";
import img2 from "@/Archive/HomePage/Image Rotation/2.jpg";
import img3 from "@/Archive/HomePage/Image Rotation/3.jpg";
import img4 from "@/Archive/HomePage/Image Rotation/4.jpg";
import img5 from "@/Archive/HomePage/Image Rotation/5.jpg";
import img6 from "@/Archive/HomePage/Image Rotation/6.jpg";
import img7 from "@/Archive/HomePage/Image Rotation/7.jpg";
import img8 from "@/Archive/HomePage/Image Rotation/8.jpg";
import img9 from "@/Archive/HomePage/Image Rotation/9.jpg";
import img10 from "@/Archive/HomePage/Image Rotation/10.jpg";
import img11 from "@/Archive/HomePage/Image Rotation/11.jpg";

const slides = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Track which slides have ever been mounted so we don't re-fetch when cycling back
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0, 1]));

  const goTo = useCallback(
    (index: number) => {
      if (index === current || isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [current, isTransitioning]
  );

  // Auto-advance every 5s
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Lazily mark current + next as mounted (so they render & start downloading)
  useEffect(() => {
    setMounted((prev) => {
      const next = new Set(prev);
      next.add(current);
      next.add((current + 1) % slides.length);
      return next;
    });
  }, [current]);

  const indicators = useMemo(() => slides.map((_, i) => i), []);

  return (
    <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-screen overflow-hidden bg-muted">
      {slides.map((src, i) => {
        // Only render images that have been mounted — cuts initial payload from ~17MB to ~1MB
        if (!mounted.has(i)) return null;
        return (
          <img
            key={i}
            src={src}
            alt={`Project showcase ${i + 1}`}
            className="absolute inset-0 w-full h-full object-contain md:object-cover transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={i === 0 ? "high" : "low"}
          />
        );
      })}

      <div className="absolute inset-0 bg-foreground/5" />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {indicators.map((i) => (
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

      <span className="absolute bottom-6 right-6 text-[10px] tracking-[0.3em] text-background/60 z-10">
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </span>
    </div>
  );
};

export default HeroSlider;
