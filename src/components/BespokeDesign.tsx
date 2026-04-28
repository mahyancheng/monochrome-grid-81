import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import img2 from "@/Archive/Services/08aor-min.png";

const BespokeDesign = () => {
  return (
    <section className="w-full bg-background py-16 md:py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="w-full">
          <img
            src={img2}
            alt="Bespoke architectural interior design"
            className="w-full h-auto object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="font-futura font-light text-foreground leading-tight text-3xl md:text-4xl lg:text-5xl tracking-[0.02em]">
            Bespoke Design<br />Based On<br />Your Expectations
          </h2>
          <div className="mt-6 w-16 h-px bg-foreground/60" />
          <p className="mt-8 font-futura text-sm md:text-base text-foreground/70 leading-relaxed max-w-xl">
            Whatever your needs for a space may be, our team is ready to serve you with professional architectural design expertise and interior design solutions, thoughtfully tailored to meet — and exceed — your expectations.
          </p>
          <Link
            to="/services"
            className="mt-10 inline-flex items-center gap-3 font-futura font-bold text-xs tracking-[0.25em] uppercase text-foreground group"
          >
            More Services
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BespokeDesign;
