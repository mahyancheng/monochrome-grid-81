import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import img1 from "@/Archive/HomePage/Dining_Room-min_600x600.jpg";
import img2 from "@/Archive/HomePage/Living_Room.jpg";

const ConnectWithUs = () => {
  return (
    <section className="w-full bg-background py-16 md:py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left: copy */}
        <div className="flex flex-col">
          <h2 className="font-futura font-light text-foreground leading-tight text-3xl md:text-4xl lg:text-5xl tracking-[0.02em]">
            Connect With Us
          </h2>
          <div className="mt-6 w-16 h-px bg-foreground/60" />
          <p className="mt-8 font-futura text-sm md:text-base text-foreground/70 leading-relaxed max-w-xl">
            Speak to us today to have your house design visualized by our professional architectural and interior design team, bringing your ideas to life with clarity and precision.
          </p>
          <Link
            to="/contact/"
            className="mt-10 inline-flex items-center gap-3 font-futura font-bold text-xs tracking-[0.25em] uppercase text-foreground group"
          >
            Get In Touch
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Right: two images */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <img
            src={img1}
            alt="Architectural dining space"
            className="w-full h-full object-cover aspect-[3/4]"
            loading="lazy"
            decoding="async"
            width="600"
              height="800"
          />
          <img
            src={img2}
            alt="Designed living interior"
            className="w-full h-full object-cover aspect-[3/4]"
            loading="lazy"
            decoding="async"
            width="600"
            height="800"
          />
        </div>
      </div>
    </section>
  );
};

export default ConnectWithUs;
