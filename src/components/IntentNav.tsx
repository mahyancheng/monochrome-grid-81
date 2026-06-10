import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const intents = [
  {
    number: "01",
    question: "Planning a new landed house?",
    cta: "View Landed Projects",
    href: "/?category=Landed#projects",
    filter: "Landed",
  },
  {
    number: "02",
    question: "Renovating a bungalow?",
    cta: "View Bungalow Projects",
    href: "/?category=Bungalow#projects",
    filter: "Bungalow",
  },
  {
    number: "03",
    question: "Designing a commercial or hospitality space?",
    cta: "View Hospitality Projects",
    href: "/?category=Hospitality#projects",
    filter: "Hospitality",
  },
  {
    number: "04",
    question: "Need an interior architect?",
    cta: "About Us",
    href: "/about/",
    filter: null,
  },

];

const IntentNav = () => {
  return (
    <section className="w-full bg-background border-t border-border">
      {/* Section header: 修改为左对齐 */}
      <div className="max-w-7xl  px-6 md:px-16 pt-20 pb-12">
        <div className="flex flex-col items-start gap-4"> {/* items-center 改为 items-start */}
          <div className="w-12 h-px bg-foreground" />
          <h2 className="font-futura text-2xl md:text-3xl tracking-[0.05em] uppercase text-foreground">
            What Are You Planning?
          </h2>
        </div>
      </div>

      {/* Cards 保持不变 */}
      <div className="border-t border-border">
        {intents.map((item, i) => (
          <Link
            key={i}
            to={item.href}
            className="group flex items-center justify-between px-6 md:px-16 py-6 md:py-8 border-b border-border hover:bg-foreground/[0.02] transition-colors duration-300"
          >
            {/* ... 卡片内容保持不变 ... */}
            <div className="flex items-baseline gap-5 md:gap-8">
              <span className="font-futura text-[10px] tracking-[0.2em] text-muted-foreground/40 shrink-0 w-6">
                {item.number}
              </span>
              <span className="font-futura text-xs md:text-sm tracking-[0.15em] uppercase text-foreground group-hover:text-foreground transition-colors leading-relaxed">
                {item.question}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-3 shrink-0 ml-8">
              <span className="font-futura text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {item.cta}
              </span>
              <div className="w-6 h-6 border border-border flex items-center justify-center transition-all duration-300 group-hover:border-foreground group-hover:bg-foreground">
                <ArrowUpRight size={10} className="text-muted-foreground group-hover:text-background transition-colors" />
              </div>
            </div>

            <div className="flex md:hidden w-6 h-6 border border-border items-center justify-center shrink-0 ml-4 transition-all duration-300 group-hover:border-foreground group-hover:bg-foreground">
              <ArrowUpRight size={10} className="text-muted-foreground group-hover:text-background transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default IntentNav;