import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ContactSection from "@/components/ContactSection";
import heroImg from "@/Archive/Services/07aor-min.jpg";
import img2 from "@/Archive/Projects/courtyard-house_01.jpg";
import img3 from "@/Archive/Projects/emw_01-min.jpg";
import { getArchitecturalDesignSchema } from "@/lib/schema";

const processItems = [
  "Site analysis and design feasibility",
  "Space planning and layout development",
  "Conceptual design direction",
  "Floor plans and elevations",
  "Design refinement based on client feedback",
  "Material and façade consideration",
  "Functional planning for daily use",
  "Coordination between design, structure, and authority requirements",
];

const otherServices = [
  { num: "02", title: "Interior Design", href: "/services/interior-design" },
  { num: "03", title: "Authority Submissions", href: "/services/authority-submissions" },
  { num: "04", title: "Passionate Craftsmanship", href: "/services/craftsmanship" },
];

const ArchitecturalDesign = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Architectural Design That Brings Your Ideas to Life | Hidi Lau Architect"
        description="Our architectural design service focuses on creating spaces that are functional, elegant, and deeply connected to the needs of each client."
        path="/services/architectural-design/"
        schema={getArchitecturalDesignSchema()}

      />
      <Header />

      <main className="flex-1">

        {/* ── Breadcrumb / back nav ───────────────────────────────── */}
        <div className="flex items-center justify-between px-6 md:px-10 py-4 md:py-5 border-b border-border">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft
              size={11}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            <span className="text-[9px] md:text-[10px] tracking-[0.35em] font-fiona uppercase font-light">
              Services
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-4 md:w-5 h-px bg-foreground/30" />
            <span className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.45em] font-fiona uppercase text-muted-foreground font-light">
              01 — Architectural Design
            </span>
            <div className="w-4 md:w-5 h-px bg-foreground/30" />
          </div>
        </div>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "clamp(320px, 46vw, 580px)" }}
        >
          <img
            src={heroImg}
            alt="Architectural Design"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.52)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 52%)" }}
          />
          <div className="absolute bottom-0 left-0 px-6 md:px-10 pb-8 md:pb-12">
            {/* Number */}
            <p className="text-[9px] md:text-[10px] tracking-[0.35em] font-fiona uppercase text-white/40 mb-2 md:mb-3 font-light">
              01
            </p>

            {/* Main heading */}
            <h1
              className="text-white font-fiona font-light leading-[1.1] mb-3 md:mb-5"
              style={{ fontSize: "clamp(38px, 6vw, 72px)", letterSpacing: "-0.01em" }}
            >
              Architectural
              <br />
              <em className="">Design</em>
            </h1>

            {/* Subtitle */}
            <p
              className="text-white/60 font-fiona font-light leading-relaxed"
              style={{
                fontSize: "clamp(10px, 1.1vw, 13px)",
                letterSpacing: "0.1em",
                maxWidth: "clamp(280px, 38vw, 500px)",
              }}
            >
              Architecture begins with a vision, but strong design turns that
              vision into a space that works beautifully in real life.
            </p>
          </div>
        </div>

        {/* ── Main content: intro + process ──────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">

          {/* Left: body copy */}
          <div className="px-6 md:px-10 py-10 md:py-16 border-b md:border-b-0 md:border-r border-border flex flex-col gap-5 md:gap-8">
            {/* Lead paragraph — larger on desktop */}
            <p className="text-[14px] md:text-[17px] lg:text-[19px] font-futura font-light leading-[1.85] md:leading-[1.9] text-foreground/80">
              Our architectural design service focuses on creating spaces that
              are functional, elegant, and deeply connected to the needs of each
              client. We study the site, surrounding environment, lifestyle
              requirements, spatial flow, natural lighting, ventilation,
              materials, and long-term usability before shaping the design
              direction.
            </p>

            <p className="text-[11px] md:text-[12px] lg:text-[13px] font-futura font-light tracking-[0.08em] md:tracking-[0.1em] leading-[1.85] md:leading-[1.9] text-muted-foreground">
              At Hidi Lau Architect, we do not believe in one-size-fits-all
              design. Every project is carefully developed to reflect the
              client's personality, purpose, and practical needs. Whether it is
              a private residence, renovation project, commercial property, or
              development concept, we aim to create architecture that feels
              refined, timeless, and purposeful.
            </p>

            <p className="text-[11px] md:text-[12px] lg:text-[13px] font-futura font-light tracking-[0.08em] md:tracking-[0.1em] leading-[1.85] md:leading-[1.9] text-muted-foreground">
              The goal is not only to design a building that looks impressive,
              but to create a space that feels right, functions smoothly, and
              continues to serve its users for years to come.
            </p>
          </div>

          {/* Right: process list */}
          <div className="px-6 md:px-10 py-10 md:py-16 flex flex-col">
            <p className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.45em] font-fiona uppercase text-muted-foreground/50 font-light mb-6 md:mb-8">
              Our Process
            </p>

            <ul className="flex flex-col">
              {processItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 md:gap-4 py-3.5 md:py-4 border-b border-border last:border-b-0 group"
                >
                  <span className="text-[8px] md:text-[9px] tracking-[0.2em] font-fiona text-muted-foreground/30 font-light tabular-nums mt-0.5 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-3 h-px bg-foreground/30 mt-[9px] flex-shrink-0 transition-all duration-500 group-hover:w-5 group-hover:bg-foreground/60" />
                  <span className="text-[10px] md:text-[11px] lg:text-[12px] font-fiona font-light tracking-[0.08em] md:tracking-[0.1em] leading-[1.7] text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Image pair ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
          <div className="overflow-hidden aspect-[4/3]">
            <img
              src={img2}
              alt="Architectural project"
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 hover:scale-[1.03] transition-all duration-700"
            />
          </div>
          <div className="overflow-hidden aspect-[4/3] border-t md:border-t-0 md:border-l border-border">
            <img
              src={img3}
              alt="Architectural detail"
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 hover:scale-[1.03] transition-all duration-700"
            />
          </div>
        </div>

        {/* ── Other services ─────────────────────────────────────── */}
        <div className="border-b border-border">
          <div className="px-6 md:px-10 py-6 md:py-8 border-b border-border">
            <p className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.45em] font-fiona uppercase text-muted-foreground/50 font-light">
              Other Services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {otherServices.map((s, i) => (
              <Link
                key={i}
                to={s.href}
                className="group flex items-center justify-between px-6 md:px-10 py-6 md:py-7 border-b md:border-b-0 border-r border-border last:border-r-0 hover:bg-muted/10 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="text-[8px] md:text-[9px] tracking-[0.25em] font-fiona text-muted-foreground/35 font-light">
                    {s.num}
                  </span>
                  <div className="w-3 h-px bg-foreground/40 transition-all duration-300 group-hover:w-5" />
                  <span className="text-[9px] md:text-[10px] lg:text-[11px] tracking-[0.28em] font-fiona uppercase text-foreground font-normal">
                    {s.title}
                  </span>
                </div>
                <ArrowUpRight
                  size={11}
                  className="text-muted-foreground/40 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            ))}
          </div>
        </div>

      </main>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default ArchitecturalDesign;