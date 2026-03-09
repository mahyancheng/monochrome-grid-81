import React, {
  CSSProperties,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Section = {
  id?: string;
  background: string;
  leftLabel?: ReactNode;
  title: string | ReactNode;
  renderBackground?: (active: boolean, previous: boolean) => ReactNode;
};

export type FullScreenFXAPI = {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  getIndex: () => number;
  refresh: () => void;
};

export type FullScreenFXProps = {
  sections: Section[];
  className?: string;
  style?: CSSProperties;
  header?: ReactNode;
  footer?: ReactNode;
  showProgress?: boolean;
  durations?: Partial<{ change: number; snap: number }>;
  reduceMotion?: boolean;
  parallaxAmount?: number;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  initialIndex?: number;
  apiRef?: React.Ref<FullScreenFXAPI>;
  ariaLabel?: string;
};

const clamp = (n: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, n));

export const FullScreenScrollFX = forwardRef<HTMLDivElement, FullScreenFXProps>(
  (
    {
      sections,
      className,
      style,
      header,
      footer,
      showProgress = true,
      durations = { change: 0.7, snap: 800 },
      reduceMotion,
      parallaxAmount = 4,
      currentIndex,
      onIndexChange,
      initialIndex = 0,
      apiRef,
      ariaLabel = "Full screen scroll slideshow",
    },
    ref
  ) => {
    const total = sections.length;
    const [localIndex, setLocalIndex] = useState(
      clamp(initialIndex, 0, Math.max(0, total - 1))
    );
    const isControlled = typeof currentIndex === "number";
    const index = isControlled
      ? clamp(currentIndex!, 0, Math.max(0, total - 1))
      : localIndex;

    const rootRef = useRef<HTMLDivElement>(null);
    const fixedRef = useRef<HTMLDivElement>(null);
    const fixedSectionRef = useRef<HTMLDivElement>(null);

    const bgRefs = useRef<HTMLImageElement[]>([]);
    const wordRefs = useRef<HTMLElement[][]>([]);

    const leftTrackRef = useRef<HTMLDivElement>(null);
    const leftItemRefs = useRef<HTMLDivElement[]>([]);

    const progressFillRef = useRef<HTMLDivElement>(null);
    const currentNumberRef = useRef<HTMLSpanElement>(null);

    const stRef = useRef<ScrollTrigger | null>(null);
    const lastIndexRef = useRef(index);
    const isAnimatingRef = useRef(false);
    const isSnappingRef = useRef(false);
    const sectionTopRef = useRef<number[]>([]);

    const prefersReduced = useMemo(() => {
      if (typeof window === "undefined") return false;
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }, []);
    const motionOff = reduceMotion ?? prefersReduced;

    const tempWordBucket = useRef<HTMLElement[]>([]);
    const splitWords = (text: string) => {
      const words = text.split(/\s+/).filter(Boolean);
      return words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden" }}>
          <span
            ref={(el) => el && tempWordBucket.current.push(el)}
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ));
    };
    const WordsCollector = ({ onReady }: { onReady: () => void }) => {
      useEffect(() => onReady(), []);
      return null;
    };

    const computePositions = () => {
      const el = fixedSectionRef.current;
      if (!el) return;
      const top = el.offsetTop;
      const h = el.offsetHeight;
      const arr: number[] = [];
      for (let i = 0; i < total; i++) arr.push(top + (h * i) / total);
      sectionTopRef.current = arr;
    };

    const measureAndCenterLists = (toIndex = index, animate = true) => {
      const centerTrack = (
        container: HTMLDivElement | null,
        items: HTMLDivElement[],
        trackRef: React.RefObject<HTMLDivElement | null>
      ) => {
        if (!container || items.length === 0 || !trackRef.current) return;
        const first = items[0];
        const second = items[1];
        const contRect = container.getBoundingClientRect();
        let rowH = first.getBoundingClientRect().height;
        if (second) {
          rowH =
            second.getBoundingClientRect().top -
            first.getBoundingClientRect().top;
        }
        const targetY = contRect.height / 2 - rowH / 2 - toIndex * rowH;
        if (animate) {
          gsap.to(trackRef.current, {
            y: targetY,
            duration: (durations.change ?? 0.7) * 0.9,
            ease: "power3.out",
          });
        } else {
          gsap.set(trackRef.current, { y: targetY });
        }
      };
      const raf = (fn: () => void) =>
        requestAnimationFrame(() => requestAnimationFrame(fn));
      raf(() => {
        raf(() => {
          centerTrack(
            leftTrackRef.current?.parentElement as HTMLDivElement,
            leftItemRefs.current,
            leftTrackRef
          );
        });
      });
    };

    useLayoutEffect(() => {
      if (typeof window === "undefined") return;
      const fixed = fixedRef.current;
      const fs = fixedSectionRef.current;
      if (!fixed || !fs || total === 0) return;

      gsap.set(bgRefs.current, { opacity: 0, scale: 1.04, yPercent: 0 });
      if (bgRefs.current[0])
        gsap.set(bgRefs.current[0], { opacity: 1, scale: 1 });

      wordRefs.current.forEach((words, sIdx) => {
        words.forEach((w) => {
          gsap.set(w, {
            yPercent: sIdx === index ? 0 : 100,
            opacity: sIdx === index ? 1 : 0,
          });
        });
      });

      computePositions();
      measureAndCenterLists(index, false);

      const st = ScrollTrigger.create({
        trigger: fs,
        start: "top top",
        end: "bottom bottom",
        pin: fixed,
        pinSpacing: true,
        onUpdate: (self) => {
          if (motionOff || isSnappingRef.current) return;
          const prog = self.progress;
          const target = Math.min(total - 1, Math.floor(prog * total));
          if (target !== lastIndexRef.current && !isAnimatingRef.current) {
            const next =
              lastIndexRef.current +
              (target > lastIndexRef.current ? 1 : -1);
            goTo(next, false);
          }
          if (progressFillRef.current) {
            const p = (lastIndexRef.current / (total - 1 || 1)) * 100;
            progressFillRef.current.style.width = `${p}%`;
          }
        },
      });

      stRef.current = st;

      if (initialIndex && initialIndex > 0 && initialIndex < total) {
        requestAnimationFrame(() => goTo(initialIndex, false));
      }

      const ro = new ResizeObserver(() => {
        computePositions();
        measureAndCenterLists(lastIndexRef.current, false);
        ScrollTrigger.refresh();
      });
      ro.observe(fs);

      return () => {
        ro.disconnect();
        st.kill();
        stRef.current = null;
      };
    }, [total, initialIndex, motionOff, parallaxAmount]);

    const changeSection = (to: number) => {
      if (to === lastIndexRef.current || isAnimatingRef.current) return;
      const from = lastIndexRef.current;
      const down = to > from;
      isAnimatingRef.current = true;

      if (!isControlled) setLocalIndex(to);
      onIndexChange?.(to);

      if (currentNumberRef.current) {
        currentNumberRef.current.textContent = String(to + 1).padStart(2, "0");
      }
      if (progressFillRef.current) {
        const p = (to / (total - 1 || 1)) * 100;
        progressFillRef.current.style.width = `${p}%`;
      }

      const D = durations.change ?? 0.7;

      const outWords = wordRefs.current[from] || [];
      const inWords = wordRefs.current[to] || [];
      if (outWords.length) {
        gsap.to(outWords, {
          yPercent: down ? -100 : 100,
          opacity: 0,
          duration: D * 0.6,
          stagger: down ? 0.03 : -0.03,
          ease: "power3.out",
        });
      }
      if (inWords.length) {
        gsap.set(inWords, { yPercent: down ? 100 : -100, opacity: 0 });
        gsap.to(inWords, {
          yPercent: 0,
          opacity: 1,
          duration: D,
          stagger: down ? 0.05 : -0.05,
          ease: "power3.out",
        });
      }

      const prevBg = bgRefs.current[from];
      const newBg = bgRefs.current[to];
      if (newBg) {
        gsap.set(newBg, {
          opacity: 0,
          scale: 1.04,
          yPercent: down ? 1 : -1,
        });
        gsap.to(newBg, {
          opacity: 1,
          scale: 1,
          yPercent: 0,
          duration: D,
          ease: "power2.out",
        });
      }
      if (prevBg) {
        gsap.to(prevBg, {
          opacity: 0,
          yPercent: down ? -parallaxAmount : parallaxAmount,
          duration: D,
          ease: "power2.out",
        });
      }

      measureAndCenterLists(to, true);

      leftItemRefs.current.forEach((el, i) => {
        el.classList.toggle("active", i === to);
        gsap.to(el, {
          opacity: i === to ? 1 : 0.35,
          x: i === to ? 10 : 0,
          duration: D * 0.6,
          ease: "power3.out",
        });
      });

      gsap.delayedCall(D, () => {
        lastIndexRef.current = to;
        isAnimatingRef.current = false;
      });
    };

    const goTo = (to: number, withScroll = true) => {
      const clamped = clamp(to, 0, total - 1);
      isSnappingRef.current = true;
      changeSection(clamped);

      const pos = sectionTopRef.current[clamped];
      const snapMs = durations.snap ?? 800;

      if (withScroll && typeof window !== "undefined") {
        window.scrollTo({ top: pos, behavior: "smooth" });
        setTimeout(() => (isSnappingRef.current = false), snapMs);
      } else {
        setTimeout(() => (isSnappingRef.current = false), 10);
      }
    };

    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    useImperativeHandle(apiRef, () => ({
      next,
      prev,
      goTo,
      getIndex: () => index,
      refresh: () => ScrollTrigger.refresh(),
    }));

    const handleJump = (i: number) => goTo(i);

    useEffect(() => {
      leftItemRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: i === index ? 1 : 0.35,
            y: 0,
            duration: 0.5,
            delay: i * 0.06,
            ease: "power3.out",
          }
        );
      });
      measureAndCenterLists(index, false);
    }, []);

    return (
      <div
        ref={(node) => {
          (rootRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        className={["fx-root", className].filter(Boolean).join(" ")}
        style={style}
        aria-label={ariaLabel}
      >
        <div ref={fixedSectionRef} className="fx-scroll-area">
          <div ref={fixedRef} className="fx-viewport">
            <div className="fx-stage">
              {/* Backgrounds */}
              <div className="fx-bgs">
                {sections.map((s, i) => (
                  <div key={s.id ?? i} className="fx-bg-layer">
                    {s.renderBackground ? (
                      s.renderBackground(
                        index === i,
                        lastIndexRef.current === i
                      )
                    ) : (
                      <>
                        <img
                          ref={(el) => el && (bgRefs.current[i] = el)}
                          src={s.background}
                          alt=""
                          className="fx-bg-img"
                        />
                        <div className="fx-overlay" />
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Content grid — left aligned only */}
              <div className="fx-grid">
                {header && <div className="fx-header">{header}</div>}

                <div className="fx-content">
                  {/* Left list */}
                  <div className="fx-left">
                    <div ref={leftTrackRef} className="fx-track">
                      {sections.map((s, i) => (
                        <div
                          key={i}
                          ref={(el) => el && (leftItemRefs.current[i] = el)}
                          className="fx-item"
                          onClick={() => handleJump(i)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={i === index}
                        >
                          {s.leftLabel}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Center title */}
                  <div className="fx-center">
                    {sections.map((s, sIdx) => {
                      tempWordBucket.current = [];
                      const isString = typeof s.title === "string";
                      return (
                        <div key={sIdx} className="fx-title-layer">
                          <div className="fx-title-inner">
                            {isString
                              ? splitWords(s.title as string)
                              : s.title}
                          </div>
                          <WordsCollector
                            onReady={() => {
                              if (tempWordBucket.current.length) {
                                wordRefs.current[sIdx] = [
                                  ...tempWordBucket.current,
                                ];
                              }
                              tempWordBucket.current = [];
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer + progress */}
                <div className="fx-footer-area">
                  {footer && <div className="fx-footer">{footer}</div>}
                  {showProgress && (
                    <div className="fx-progress">
                      <div className="fx-progress-nums">
                        <span ref={currentNumberRef}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="fx-progress-total">
                          {String(total).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="fx-progress-bar">
                        <div
                          ref={progressFillRef}
                          className="fx-progress-fill"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="fx-end" />
        </div>

        <style>{`
          .fx-root { position: relative; }
          .fx-scroll-area { height: ${total * 100}vh; position: relative; }
          .fx-viewport { width: 100%; height: 100vh; position: relative; overflow: hidden; }
          .fx-stage { position: absolute; inset: 0; background: hsl(var(--primary)); }
          .fx-bgs { position: absolute; inset: 0; z-index: 0; }
          .fx-bg-layer { position: absolute; inset: 0; }
          .fx-bg-img {
            position: absolute; inset: 0;
            width: 100%; height: 100%;
            object-fit: cover;
            will-change: transform, opacity;
          }
          .fx-overlay {
            position: absolute; inset: 0;
            background: hsl(var(--primary) / 0.45);
          }
          .fx-grid {
            position: relative; z-index: 1;
            display: flex; flex-direction: column;
            height: 100%; width: 100%;
            padding: 2rem;
          }
          .fx-header { flex-shrink: 0; margin-bottom: 1rem; }
          .fx-content {
            flex: 1;
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 2rem;
            align-items: center;
          }
          .fx-left {
            height: 40vh;
            overflow: hidden;
            position: relative;
          }
          .fx-track {
            position: absolute;
            top: 0; left: 0;
            width: 100%;
            will-change: transform;
          }
          .fx-item {
            padding: 0.75rem 0;
            cursor: pointer;
            font-size: 11px;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            color: hsl(var(--primary-foreground));
            transition: opacity 0.3s;
            font-family: 'Space Grotesk', sans-serif;
          }
          .fx-item:hover { opacity: 1 !important; }
          .fx-item.active { opacity: 1; }
          .fx-center {
            position: relative;
            height: 20vh;
          }
          .fx-title-layer {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
          }
          .fx-title-inner {
            font-size: clamp(2rem, 5vw, 4rem);
            font-weight: 300;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: hsl(var(--primary-foreground));
            line-height: 1.1;
            font-family: 'Space Grotesk', sans-serif;
          }
          .fx-footer-area {
            flex-shrink: 0;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 2rem;
          }
          .fx-footer { flex: 1; }
          .fx-progress {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .fx-progress-nums {
            display: flex;
            gap: 0.5rem;
            font-size: 10px;
            letter-spacing: 0.3em;
            color: hsl(var(--primary-foreground) / 0.6);
            font-family: 'Space Grotesk', sans-serif;
          }
          .fx-progress-total { opacity: 0.4; }
          .fx-progress-total::before { content: '/'; margin-right: 0.5rem; }
          .fx-progress-bar {
            width: 80px;
            height: 1px;
            background: hsl(var(--primary-foreground) / 0.15);
            position: relative;
          }
          .fx-progress-fill {
            position: absolute;
            top: 0; left: 0;
            height: 100%;
            background: hsl(var(--primary-foreground) / 0.6);
            transition: width 0.5s ease-out;
          }
          .fx-end { height: 1px; }
          @media (max-width: 768px) {
            .fx-content {
              grid-template-columns: 1fr;
              row-gap: 2vh;
            }
            .fx-left { height: auto; }
            .fx-track { position: relative !important; transform: none !important; }
            .fx-center { height: auto; }
            .fx-grid { padding: 1.5rem; }
          }
        `}</style>
      </div>
    );
  }
);

FullScreenScrollFX.displayName = "FullScreenScrollFX";
