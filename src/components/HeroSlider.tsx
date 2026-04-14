import { useState, useEffect, useCallback, useRef } from "react";

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

interface HeroSliderProps {
  onBrightnessChange?: (isBright: boolean) => void;
}

const analyzeTopBrightness = (imgEl: HTMLImageElement): number => {
  const canvas = document.createElement("canvas");
  const sampleW = 300;
  const sampleH = 100;
  canvas.width = sampleW;
  canvas.height = sampleH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return 0;
  // Sample the top-left area where the logo sits
  const srcH = Math.floor(imgEl.naturalHeight * 0.15);
  const srcW = Math.floor(imgEl.naturalWidth * 0.5);
  ctx.drawImage(imgEl, 0, 0, srcW, srcH, 0, 0, sampleW, sampleH);
  const data = ctx.getImageData(0, 0, sampleW, sampleH).data;
  let total = 0;
  const pixels = data.length / 4;
  for (let i = 0; i < data.length; i += 4) {
    total += data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
  }
  return total / pixels; // 0-255
};

const HeroSlider = ({ onBrightnessChange }: HeroSliderProps) => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const brightnessCache = useRef<Map<number, number>>(new Map());
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const goTo = useCallback(
    (index: number) => {
      if (index === current || isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [current, isTransitioning]
  );

  // Analyze brightness when slide changes
  useEffect(() => {
    if (!onBrightnessChange) return;
    const cached = brightnessCache.current.get(current);
    if (cached !== undefined) {
      onBrightnessChange(cached > 120);
      return;
    }
    const img = imgRefs.current[current];
    if (img && img.complete && img.naturalWidth > 0) {
      const brightness = analyzeTopBrightness(img);
      brightnessCache.current.set(current, brightness);
      onBrightnessChange(brightness > 120);
    }
  }, [current, onBrightnessChange]);

  // Auto-advance every 5s
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [current]);

  const handleImageLoad = (index: number, img: HTMLImageElement) => {
    if (!brightnessCache.current.has(index)) {
      const brightness = analyzeTopBrightness(img);
      brightnessCache.current.set(index, brightness);
      if (index === current && onBrightnessChange) {
        onBrightnessChange(brightness > 160);
      }
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((src, i) => (
        <img
          key={i}
          ref={(el) => { imgRefs.current[i] = el; }}
          src={src}
          alt={`Project showcase ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
          loading={i === 0 ? "eager" : "lazy"}
          onLoad={(e) => handleImageLoad(i, e.currentTarget)}
          crossOrigin="anonymous"
        />
      ))}

      <div className="absolute inset-0 bg-foreground/5" />

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

      <span className="absolute bottom-6 right-6 text-[10px] tracking-[0.3em] text-background/60 z-10">
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </span>
    </div>
  );
};

export default HeroSlider;
