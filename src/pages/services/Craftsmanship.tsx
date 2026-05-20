import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ContactSection from "@/components/ContactSection";
import heroImg from "@/Archive/Projects/emw_01-min.jpg";
import img2 from "@/Archive/Projects/courtyard-house_01.jpg";
import img3 from "@/Archive/Services/07aor-min.jpg";
import { getPassionateCraftsmanshipSchema } from "@/lib/schema";

const processItems = [
  "Careful attention to design details",
  "Material and finishing consideration",
  "Practical design solutions",
  "Coordination between design intent and site execution",
  "Refinement of proportions, lines, and spatial experience",
  "Quality-focused thinking throughout the project",
  "A strong sense of responsibility toward the final outcome",
];

const otherServices = [
  { num: "01", title: "Architectural Design", href: "/services/architectural-design" },
  { num: "02", title: "Interior Design", href: "/services/interior-design" },
  { num: "03", title: "Authority Submissions", href: "/services/authority-submissions" },
];

const PassionateCraftsmanship = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Detail Design Architecture That Brings Spaces to Life | Hidi Lau Architect"
        description="Our passionate craftsmanship approach reflects our commitment to quality, precision, and thoughtful execution across every project."
        path="/services/craftsmanship/"
        schema={getPassionateCraftsmanshipSchema()}
      />
      <Header />

      <main className="flex-1">

        {/* ── Breadcrumb / back nav ───────────────────────────────── */}
        <div className="flex items-center justify-between px-6 md:px-10 py-4 md:py-5 border-b border-border">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft size={11} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span className="text-[9px] md:text-[10px] tracking-[0.35em] font-fiona uppercase font-light">
              Services
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-4 md:w-5 h-px bg-foreground/30" />
            <span className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.45em] font-fiona uppercase text-muted-foreground font-light">
              04 — Passionate Craftsmanship
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
            alt="Passionate Craftsmanship"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.48)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 52%)" }}
          />
          <div className="absolute bottom-0 left-0 px-6 md:px-10 pb-8 md:pb-12">
            <p className="text-[9px] md:text-[10px] tracking-[0.35em] font-fiona uppercase text-white/40 mb-2 md:mb-3 font-light">
              04
            </p>
            <h1
              className="text-white font-fiona font-light leading-[1.1] mb-3 md:mb-5"
              style={{ fontSize: "clamp(38px, 6vw, 72px)", letterSpacing: "-0.01em" }}
            >
              Passionate
              <br />
              <em className="italic">Craftsmanship</em>
            </h1>
            <p
              className="text-white/60 font-fiona font-light leading-relaxed"
              style={{
                fontSize: "clamp(10px, 1.1vw, 13px)",
                letterSpacing: "0.1em",
                maxWidth: "clamp(280px, 38vw, 500px)",
              }}
            >
              Great design is found in the details.
            </p>
          </div>
        </div>

        {/* ── Manifesto strip ────────────────────────────────────── */}
        <div className="border-b border-border px-6 md:px-16 py-10 md:py-14 flex items-center justify-center">
          <p className="text-center font-fiona font-light leading-[1.5] md:leading-[1.55] tracking-[-0.005em] text-foreground/70 max-w-3xl"
            style={{ fontSize: "clamp(18px, 2.2vw, 28px)" }}
          >
            Craftsmanship is not just about construction. It is about{" "}
            <em className="italic">attitude</em> — the dedication to doing
            things properly, thoughtfully, and beautifully.
          </p>
        </div>

        {/* ── Main content: intro + process ──────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">

          {/* Left: body copy */}
          <div className="px-6 md:px-10 py-10 md:py-16 border-b md:border-b-0 md:border-r border-border flex flex-col gap-5 md:gap-7">
            <p className="text-[14px] md:text-[17px] lg:text-[19px] font-futura font-light leading-[1.85] md:leading-[1.9] text-foreground/80">
              Our passionate craftsmanship approach reflects our commitment to
              quality, precision, and thoughtful execution. Architecture is not
              only about drawings and concepts. It is about how each line,
              material, joint, finish, and proportion comes together to create a
              complete experience.
            </p>

            <p className="text-[11px] md:text-[12px] lg:text-[13px] font-futura font-light tracking-[0.08em] md:tracking-[0.1em] leading-[1.85] md:leading-[1.9] text-muted-foreground">
              At Hidi Lau Architect, we pay attention to the finer details that
              often define the final outcome of a project. From the way natural
              light enters a space, to the alignment of materials, the proportion
              of openings, the practicality of built-in features, and the overall
              finishing quality — we believe every detail matters.
            </p>

            {/* Three-pillar summary */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 border-t border-border pt-6 md:pt-7">
              {[
                { label: "Precision", desc: "Every line, joint, and finish resolved with care." },
                { label: "Intention", desc: "Design decisions made deliberately and purposefully." },
                { label: "Longevity", desc: "Spaces that remain comfortable and meaningful over time." },
              ].map((p) => (
                <div key={p.label}>
                  <p className="text-[9px] md:text-[10px] tracking-[0.4em] font-fiona uppercase text-foreground/60 font-light mb-1.5 md:mb-2">
                    {p.label}
                  </p>
                  <p className="text-[10px] md:text-[10.5px] lg:text-[11.5px] font-futura font-light tracking-[0.05em] md:tracking-[0.06em] leading-[1.75] md:leading-[1.8] text-muted-foreground">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[11px] md:text-[12px] lg:text-[13px] font-futura font-light tracking-[0.08em] md:tracking-[0.1em] leading-[1.85] md:leading-[1.9] text-muted-foreground border-t border-border pt-6 md:pt-7">
              Passionate craftsmanship means we care about how the design is
              translated from paper into reality. We aim for spaces that are not
              only visually pleasing but also carefully resolved, comfortable to
              use, and meaningful to the people who occupy them.
            </p>
          </div>

          {/* Right: approach list */}
          <div className="px-6 md:px-10 py-10 md:py-16 flex flex-col">
            <p className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.45em] font-fiona uppercase text-muted-foreground/50 font-light mb-6 md:mb-8">
              This Approach Includes
            </p>
            <ul className="flex flex-col">
              {processItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 md:gap-4 py-3.5 md:py-4 border-b border-border last:border-b-0 group">
                  <span className="text-[8px] md:text-[9px] tracking-[0.2em] text-muted-foreground/30 font-fiona font-light tabular-nums mt-0.5 flex-shrink-0">
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
            <img src={img2} alt="Craftsmanship project" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 hover:scale-[1.03] transition-all duration-700" />
          </div>
          <div className="overflow-hidden aspect-[4/3] border-t md:border-t-0 md:border-l border-border">
            <img src={img3} alt="Craftsmanship detail" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 hover:scale-[1.03] transition-all duration-700" />
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
                  <span className="text-[9px] md:text-[10px] lg:text-[11px] tracking-[0.28em] uppercase text-foreground font-fiona font-normal">
                    {s.title}
                  </span>
                </div>
                <ArrowUpRight size={11} className="text-muted-foreground/40 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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

export default PassionateCraftsmanship;