import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ContactSection from "@/components/ContactSection";
import heroImg from "@/Archive/Projects/courtyard-house_01.jpg";
import img2 from "@/Archive/Services/07aor-min.jpg";
import img3 from "@/Archive/Services/08aor-min.png";
import { getAuthoritySubmissionsSchema } from "@/lib/schema";

const processItems = [
  "Preparation of submission drawings",
  "Coordination with relevant consultants",
  "Building plan submission support",
  "Liaison with local authorities where required",
  "Compliance review based on project requirements",
  "Documentation for approval processes",
  "Guidance on regulatory requirements",
  "Follow-up and revision support when needed",
];

const otherServices = [
  { num: "01", title: "Architectural Design", href: "/services/architectural-design" },
  { num: "02", title: "Interior Design", href: "/services/interior-design" },
  { num: "04", title: "Passionate Craftsmanship", href: "/services/craftsmanship" },
];

const AuthoritySubmissions = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title=" Simplifying Interior Architecture and Approval Processes | Hidi Lau Architect"
        description="Our authority submission service helps clients manage the technical and administrative side of architectural projects with professionalism and accuracy."
        path="/services/authority-submissions/"
        schema={getAuthoritySubmissionsSchema()}

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
              03 — Authority Submissions
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
            alt="Authority Submissions"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.48)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 52%)" }}
          />
          <div className="absolute bottom-0 left-0 px-6 md:px-10 pb-8 md:pb-12">
            <p className="text-[9px] md:text-[10px] tracking-[0.35em] font-fiona uppercase text-white/40 mb-2 md:mb-3 font-light">
              03
            </p>
            <h1
              className="text-white font-fiona font-light leading-[1.1] mb-3 md:mb-5"
              style={{ fontSize: "clamp(38px, 6vw, 72px)", letterSpacing: "-0.01em" }}
            >
              Authority
              <br />
              <em className="">Submissions</em>
            </h1>
            <p
              className="text-white/60 font-fiona font-light leading-relaxed"
              style={{
                fontSize: "clamp(10px, 1.1vw, 13px)",
                letterSpacing: "0.1em",
                maxWidth: "clamp(280px, 38vw, 500px)",
              }}
            >
              A successful project is not only about good design. It also needs
              to comply with the necessary regulations and approval processes.
            </p>
          </div>
        </div>

        {/* ── Main content: intro + process ──────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">

          {/* Left: body copy */}
          <div className="px-6 md:px-10 py-10 md:py-16 border-b md:border-b-0 md:border-r border-border flex flex-col gap-5 md:gap-7">
            <p className="text-[14px] md:text-[17px] lg:text-[19px] font-fiona font-light leading-[1.85] md:leading-[1.9] text-foreground/80">
              Our authority submission service helps clients manage the technical
              and administrative side of architectural projects. This includes
              preparing the required drawings, documents, and coordination needed
              for submission to the relevant local authorities.
            </p>

            {/* Highlight callout */}
            <div className="border-l-[1.5px] border-foreground/20 pl-5 md:pl-6 py-1">
              <p className="text-[12px] md:text-[13px] lg:text-[14px] font-futura font-light leading-[1.8] md:leading-[1.85] text-foreground/60 italic">
                Authority submissions can often feel complicated for property
                owners — especially when dealing with renovation approvals, new
                building plans, change of use, compliance requirements, or local
                council procedures.
              </p>
            </div>

            <p className="text-[11px] md:text-[12px] lg:text-[13px] font-futura font-light tracking-[0.08em] md:tracking-[0.1em] leading-[1.85] md:leading-[1.9] text-muted-foreground">
              Hidi Lau Architect helps simplify this process by guiding clients
              through the necessary steps with professionalism and accuracy. By
              handling authority submissions carefully, we help reduce unnecessary
              delays, avoid costly mistakes, and ensure the project has a stronger
              foundation before moving forward.
            </p>

            <p className="text-[11px] md:text-[12px] lg:text-[13px] font-futura font-light tracking-[0.08em] md:tracking-[0.1em] leading-[1.85] md:leading-[1.9] text-muted-foreground">
              Our role is to bridge the gap between creative design and regulatory
              compliance — making sure the project is not only beautiful but also
              properly documented and professionally submitted.
            </p>
          </div>

          {/* Right: process list */}
          <div className="px-6 md:px-10 py-10 md:py-16 flex flex-col">
            <p className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.45em] font-fiona uppercase text-muted-foreground/50 font-light mb-6 md:mb-8">
              What We Handle
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
            <img src={img2} alt="Authority submission project" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 hover:scale-[1.03] transition-all duration-700" />
          </div>
          <div className="overflow-hidden aspect-[4/3] border-t md:border-t-0 md:border-l border-border">
            <img src={img3} alt="Authority submission detail" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 hover:scale-[1.03] transition-all duration-700" />
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

export default AuthoritySubmissions;