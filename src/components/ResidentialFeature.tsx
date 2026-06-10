import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const featureImg = "/images/hero.jpg";
const ResidentialFeature = () => {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="w-full">
          <img
            src={featureImg}
            alt="Architectural Design"
            className="w-full h-auto object-cover"
            fetchPriority="high"
            decoding="async"
            width="901"
            height="507"
          />
        </div>

        <div className="flex flex-col">
          {/* 将 font-fiona 替换为 font-['Helvetica']，并加上 font-light 来匹配图片中的 Helvetica-Light */}
          <h2 className="font-fiona font-extralight text-foreground/80 leading-tight">
            <span className="block text-2xl md:text-3xl lg:text-[33px] mb-1">
              Architect Crafted
            </span>
            {/* 将 font-futura 替换为 font-['Helvetica']。这里保留了 font-bold 使标题醒目 */}
            <span className="font-['Helvetica'] whitespace-nowrap block text-3xl md:text-4xl lg:text-[42px] font-normal tracking-[0.04em] uppercase">
              Residential Designs
            </span>
          </h2>

          {/* 将 font-futura 替换为 font-['Helvetica']，加上 font-light 使正文呈现细体 */}
          <div className="mt-8 space-y-5 font-['Helvetica'] font-extralight text-sm md:text-base text-foreground/60 leading-relaxed max-w-xl">
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
            to="/contact/"
            className="mt-10 inline-flex items-center gap-3 font-futura font-bold text-xs tracking-[0.25em] uppercase text-foreground group"
          >
            Get Quote Now
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResidentialFeature;