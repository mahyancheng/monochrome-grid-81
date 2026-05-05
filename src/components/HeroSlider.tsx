import { useState, useEffect, useCallback, useMemo } from "react";

const slides = Array.from({ length: 11 }, (_, i) => `/images/hero/${i + 1}.jpg`);

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0, 1]));
  const slides = Array.from({ length: 11 }, (_, i) => `/images/hero/${i + 1}.webp`);
  const goTo = useCallback(
    (index: number) => {
      if (index === current || isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [current, isTransitioning]
  );

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

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
        if (!mounted.has(i)) return null;
        return (
          <img
            key={i}
            src={src}
            alt={`Project showcase ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
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