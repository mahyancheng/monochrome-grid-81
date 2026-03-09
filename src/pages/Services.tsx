import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ServiceAccordion } from "@/components/ui/service-accordion";

import img1 from "@/Archive/Services/07aor-min.jpg";
import img2 from "@/Archive/Services/08aor-min.png";
import img3 from "@/Archive/Projects/courtyard-house_01.jpg";
import img4 from "@/Archive/Projects/emw_01-min.jpg";

const services = [
  {
    id: 1,
    title: "Architectural Design",
    description: "Comprehensive architectural solutions from concept to completion, blending form and function.",
    imageUrl: img1,
  },
  {
    id: 2,
    title: "Interior Design",
    description: "Crafting refined interiors that reflect your lifestyle with meticulous attention to detail.",
    imageUrl: img2,
  },
  {
    id: 3,
    title: "Authority Submissions",
    description: "Professional handling of all regulatory submissions and approvals for seamless project delivery.",
    imageUrl: img3,
  },
  {
    id: 4,
    title: "Passionate Craftsmanship",
    description: "Every element is carefully selected and crafted to achieve absolute perfection.",
    imageUrl: img4,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Title */}
        <div className="py-10 border-b border-border">
          <h1 className="text-xs tracking-[0.5em] uppercase text-center text-foreground">
            Services
          </h1>
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          <div className="aspect-square flex flex-col justify-center px-8 lg:px-16">
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Our Expertise
            </p>
            <h2 className="text-sm tracking-[0.3em] uppercase font-light text-foreground mb-6">
              With Passion And Dedication
            </h2>
            <p className="text-xs leading-6 text-muted-foreground font-light">
              Tectone Design Sdn. Bhd believes that a comfortable living environment is key to happiness. Guided by our knowledge and experience in architectural design and interior design services, we are committed to designing and crafting a home that truly reflects your lifestyle and personality.
            </p>
          </div>
          <div className="aspect-square overflow-hidden">
            <img src={img1} alt="Our Expertise" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Interactive accordion */}
        <ServiceAccordion items={services} />

        {/* Services list */}
        <div className="grid grid-cols-4 w-full border-y border-border">
          {services.map((s) => (
            <div key={s.id} className="py-10 px-6 border-r border-border last:border-r-0">
              <h3 className="text-[10px] tracking-[0.25em] uppercase text-foreground mb-3">
                {s.title}
              </h3>
              <p className="text-[10px] leading-5 text-muted-foreground font-light">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="py-16 px-6 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
            For Your Better Lifestyle
          </p>
          <p className="text-xs leading-6 text-muted-foreground font-light max-w-lg mx-auto">
            Speak to us today and let our architectural and interior design team help you visualize your house design, transforming ideas into a well-crafted living space.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
