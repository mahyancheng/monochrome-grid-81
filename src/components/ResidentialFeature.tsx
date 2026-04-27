import { Link } from "react-router-dom";
import featureImg from "@/Archive/HomePage/Image Rotation/1.jpg";

const ResidentialFeature = () => {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="w-full">
          <img
            src={featureImg}
            alt="Architect crafted residential interior"
            className="w-full h-auto object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="font-futura font-light text-foreground leading-tight">
            <span className="block text-2xl md:text-3xl lg:text-4xl mb-2">
              Architect Crafted
            </span>
            <span className="block text-3xl md:text-5xl lg:text-6xl font-bold tracking-[0.04em] uppercase">
              Residential Designs
            </span>
          </h2>

          <div className="mt-8 space-y-5 font-futura text-sm md:text-base text-foreground/80 leading-relaxed max-w-xl">
            <p>
              Redefining living with architectural design precision and interior
              design craftmanship, delivering spaces that balance form, function,
              and timeless aesthetics.
            </p>
            <p>
              Each of our masterpieces is crafted by our award-winning architects,
              positioning us as a trusted design and build company that elevates
              every space to an entirely new level of living.
            </p>
          </div>

          <Link
            to="/contact"
            className="mt-10 inline-block w-fit border border-foreground px-7 py-3 font-futura font-bold text-xs tracking-[0.25em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Get Quote Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResidentialFeature;
