import { useState, useEffect, useCallback, useMemo } from "react";

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
  }, [slides.length]);

  useEffect(() => {
    setMounted((prev) => {
      const next = new Set(prev);
      next.add(current);
      next.add((current + 1) % slides.length);
      return next;
    });
  }, [current, slides.length]);

  const indicators = useMemo(() => slides.map((_, i) => i), [slides]);

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

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* 标题部分：恢复你原本的设计逻辑 */}
      <div
        className="absolute z-10 left-5 right-5 md:right-auto top-1/2 -translate-y-1/2 md:left-24 lg:left-32 xl:left-48 max-w-full md:max-w-3xl font-futura"
      >
        <p
          className="text-sm sm:text-lg md:text-2xl lg:text-4xl mb-1 md:mb-2"
          style={{ fontWeight: 150, color: "#ffffff", lineHeight: 1.2, letterSpacing: "0.02em", textShadow: "1px 2px 5px rgba(0,0,0,0.25)" }}
        >
          Premier
        </p>

        {/* RESIDENTIAL ARCHITECT & */}
        {/* RESIDENTIAL ARCHITECT & */}
        <h1
          className="text-[5vw] sm:text-[4.5vw] md:text-[3.5vw] lg:text-6xl xl:text-7xl 2xl:text-[5.5rem] whitespace-nowrap"
          style={{
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "0.01em",
            lineHeight: 1.1,
            WebkitTextStroke: "0.5px white",
            textShadow: "1px 2px 6px rgba(0,0,0,0.3)"
          }}
        >
          RESIDENTIAL ARCHITECT &
        </h1>

        {/* INTERIOR DESIGN */}
        <h1
          className="text-[5vw] sm:text-[4.5vw] md:text-[3.5vw] lg:text-6xl xl:text-7xl 2xl:text-[5.5rem] whitespace-nowrap"
          style={{
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "0.01em",
            lineHeight: 1.1,
            WebkitTextStroke: "0.5px white",
            textShadow: "1px 2px 6px rgba(0,0,0,0.3)"
          }}
        >
          INTERIOR DESIGN
        </h1>

        <p
          className="text-sm sm:text-lg md:text-2xl lg:text-4xl mt-1 md:mt-2"
          style={{ fontWeight: 200, color: "#ffffff", letterSpacing: "0.02em", lineHeight: 1.2, textShadow: "1px 2px 5px rgba(0,0,0,0.25)" }}
        >
          in Johor Bahru
        </p>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-0 right-0 z-10 flex items-center justify-center px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          {indicators.map((i) => (
            <button key={i} onClick={() => goTo(i)} className="group relative flex items-center justify-center">
              <span className={`block rounded-full border transition-all duration-300 ${i === current ? "w-3 h-3 bg-background border-background" : "w-2.5 h-2.5 bg-background/40 border-background/60 hover:bg-background/70"}`} />
            </button>
          ))}
          <span className="ml-2 text-[10px] tracking-[0.25em] text-background/70 whitespace-nowrap">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;