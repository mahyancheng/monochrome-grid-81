import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import img1 from "@/Archive/Services/07aor-min.jpg";
import img2 from "@/Archive/Services/08aor-min.png";
import img3 from "@/Archive/Projects/courtyard-house_01.jpg";
import img4 from "@/Archive/Projects/emw_01-min.jpg";
import { getServicesSchema } from "@/lib/schema";
import ContactSection from "@/components/ContactSection";

const services = [
  {
    id: 1,
    num: "01",
    title: "Architectural Design",
    shortDesc:
      "Comprehensive architectural solutions from concept to completion, blending form and function.",
    description:
      "Comprehensive architectural solutions from concept to completion, blending form and function with a rigorous attention to how a building breathes, sits, and ages within its context.",
    imageUrl: img1,
    href: "/services/architectural-design/",
  },
  {
    id: 2,
    num: "02",
    title: "Interior Design",
    shortDesc:
      "Crafting refined interiors that reflect your lifestyle with meticulous attention to detail.",
    description:
      "Crafting refined interiors that reflect your lifestyle — with meticulous attention to materials, light, proportion, and the quiet details that make a space feel genuinely yours.",
    imageUrl: img2,
    href: "/services/interior-design/",
  },
  {
    id: 3,
    num: "03",
    title: "Authority Submissions",
    shortDesc:
      "Professional handling of all regulatory submissions and approvals for seamless project delivery.",
    description:
      "Professional handling of all regulatory submissions and approvals for seamless project delivery — navigating complexity so your project moves forward without unnecessary delay.",
    imageUrl: img3,
    href: "/services/authority-submissions/",
  },
  {
    id: 4,
    num: "04",
    title: "Passionate Craftsmanship",
    shortDesc:
      "Every element is carefully selected and crafted to achieve absolute perfection.",
    description:
      "Every element is carefully selected and crafted to achieve absolute perfection. We believe the quality of execution is inseparable from the integrity of design.",
    imageUrl: img4,
    href: "/services/craftsmanship/",
  },
];

const Services = () => {
  // Default to index 2 (Authority Submissions) to match the screenshot
  const [activeIndex, setActiveIndex] = useState<number>(2);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Interior Design and Build Malaysia | Service | Hidi Lau Architect | GET A INSTANT QUOTE NOW"
        description="Architectural design, interior design, authority submissions and passionate craftsmanship. HIDI Lau Architect delivers excellence from concept to completion."
        path="/services/"
        schema={getServicesSchema()}
      />
      <Header />

      <main className="flex-1">

        {/* ── Page label ──────────────────────────────────────────── */}
        <div className="py-8 border-b border-border">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-foreground/40" />
            <h1
              className="text-[9px] tracking-[0.55em] font-fiona uppercase text-muted-foreground font-light"
            >
              Services
            </h1>
            <div className="w-8 h-px bg-foreground/40" />
          </div>
        </div>

        {/* ── Our Services intro text ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
          {/* Left: heading */}
          <div className="px-10 py-12 border-b md:border-b-0 md:border-r border-border flex flex-col justify-center">
            <p
              className="text-[12px] tracking-[0.45em] font-fiona uppercase text-muted-foreground/50 font-light mb-5"
            >
              Our Services
            </p>
            <h2
              className="text-[32px] md:text-[38px] font-fiona font-light leading-[1.2] tracking-[-0.01em] text-foreground"
            >
              A complete approach
              <br />
              to <em className="italic">architectural</em>
              <br />
              excellence
            </h2>
          </div>

          {/* Right: body copy */}
          <div className="px-10 py-12 flex flex-col justify-center gap-5">
            <p
              className="text-[14.5px] font-futura font-light leading-[1.85] text-foreground/75"
            >
              At Hidi Lau Architect, we believe good architecture is more than
              creating beautiful spaces. It is about understanding how people
              live, work, move, and feel within a building. Every project begins
              with careful listening, thoughtful planning, and a strong
              commitment to design that is both practical and meaningful.
            </p>
            <p
              className="text-[11px] font-futura font-light tracking-[0.1em] leading-[1.85] text-muted-foreground"
            >
              From concept development to interior planning, authority
              submissions, and detailed craftsmanship, our services are designed
              to guide clients through every stage of the architectural journey
              with clarity, creativity, and confidence. Whether you are planning
              a new home, renovating an existing property, designing a commercial
              space, or preparing for official approvals, Hidi Lau Architect
              provides a complete approach that balances aesthetics,
              functionality, compliance, and long-term value.
            </p>
          </div>
        </div>

        {/* ── Full-width image spotlight ───────────────────────────── */}
        <div
          className="flex w-full"
          style={{ height: "clamp(360px, 52vw, 540px)" }}
        >
          {services.map((s, i) => {
            const isActive = activeIndex === i;
            return (
              <Link
                key={s.id}
                to={s.href}
                onMouseEnter={() => setActiveIndex(i)}
                className="relative overflow-hidden cursor-pointer block"
                style={{
                  flex: isActive ? "4 1 0%" : "1 1 0%",
                  transition: "flex 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Background image */}
                <img
                  src={s.imageUrl}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    filter: isActive
                      ? "brightness(0.55)"
                      : "brightness(0.32) grayscale(0.25)",
                    transform: isActive ? "scale(1.04)" : "scale(1)",
                    transition:
                      "filter 0.7s ease, transform 0.9s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />

                {/* Bottom gradient for text legibility */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: isActive
                      ? "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)"
                      : "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 65%)",
                    transition: "background 0.5s ease",
                  }}
                />

                {/* Collapsed state: vertical rotated label */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    opacity: isActive ? 0 : 1,
                    transition: "opacity 0.4s ease",
                    pointerEvents: "none",
                  }}
                >
                  <span
                    className="text-white/75 font-light font-fiona tracking-[0.35em] uppercase whitespace-nowrap"
                    style={{
                      fontSize: "9px",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {s.title}
                  </span>
                </div>

                {/* Expanded state: bottom text block */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-8 pb-8"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(10px)",
                    transition: "opacity 0.45s ease 0.1s, transform 0.45s ease 0.1s",
                    pointerEvents: "none",
                  }}
                >
                  <p
                    className="text-white/45 font-light font-fiona tracking-[0.3em] uppercase mb-2.5"
                    style={{
                      fontSize: "9px",
                    }}
                  >
                    {s.num}
                  </p>
                  <h2
                    className="text-white tracking-[0.22em] font-fiona uppercase mb-3 font-light"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {s.title}
                  </h2>
                  <p
                    className="text-white/65 font-light font-fiona leading-relaxed"
                    style={{
                      fontSize: "10.5px",
                      letterSpacing: "0.06em",
                      maxWidth: "400px",
                    }}
                  >
                    {s.shortDesc}
                  </p>
                </div>

                {/* Panel divider */}
                {i < services.length - 1 && (
                  <div className="absolute top-0 right-0 w-px h-full bg-white/10" />
                )}
              </Link>
            );
          })}
        </div>

        {/* ── Services grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
          {services.map((s, i) => (
            <Link
              key={s.id}
              to={s.href}
              onMouseEnter={() => setActiveIndex(i)}
              className={`group py-8 px-6 border-r border-border transition-colors duration-300
                [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r
                md:last:border-r-0
                border-b md:border-b-0
                ${activeIndex === i ? "bg-muted/20" : "hover:bg-muted/10"}`}
            >
              {/* Number + bar + title row */}
              <div className="flex items-center gap-2.5 mb-3.5">
                <span
                  className="text-[8px] tracking-[0.25em] font-fiona text-muted-foreground/35 font-light tabular-nums"
                >
                  {s.num}
                </span>
                <div
                  className="h-px bg-foreground/60 transition-all duration-500"
                  style={{ width: activeIndex === i ? "24px" : "10px" }}
                />
                <span
                  className="text-[9px] font-fiona tracking-[0.28em] uppercase text-foreground font-normal"
                >
                  {s.title}
                </span>
              </div>

              <p
                className="text-[12px] leading-[1.75] font-futura text-muted-foreground font-light"
              >
                {s.shortDesc}
              </p>
            </Link>
          ))}
        </div>

      </main>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Services;