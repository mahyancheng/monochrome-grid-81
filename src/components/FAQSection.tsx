import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    question: "Do You need an Architect or Interior Designer?",
    answer: "An architect handles the overall structural layout, building envelope, spatial planning, and authority compliance, while an interior designer focuses on internal aesthetics, custom joinery, and fit-outs. At Hidi Lau Architect, we bridge both worlds, offering comprehensive design that integrates architectural form seamlessly with bespoke interior spaces."
  },
  {
    question: "Can HIDI LAU Architect help with Authority Submissions?",
    answer: "Yes, Ar. Hidi Lau is a LAM Registered Architect. We handle the entire professional authority submission process to local municipal councils (such as MBJB, MBPJ, etc.) for new builds, structural extensions, and building modifications."
  },
  {
    question: "Do Hidi Lau do landed House Renovation?",
    answer: "Yes. We specialize in comprehensive structural renovations, architectural additions, and interior transformations for luxury landed residential properties, including custom bungalows, semi-detached homes, and link houses."
  },
  {
    question: "Do Hidi Lau Architect work outside Johor Bahru?",
    answer: "While our main design practice is based in Johor Bahru, we accept selected, high-end residential, hospitality, and commercial architectural projects across Malaysia (including Kuala Lumpur, Selangor, and Penang) depending on the scope of work."
  },
  {
    question: "What should I prepare before a consultation?",
    answer: "To maximize our initial consultation session, it is ideal to prepare your property floor plans/site layout, a realistic estimate of your project budget, and a brief mood board or reference images showcasing your preferred style and functional requirements."
  },
  {
    question: "What types of projects are completed by Hidi Lau Architect?",
    answer: "Our portfolio spans bespoke modern luxury bungalows, tropical commercial resorts, contemporary residential renovations, and exclusive interior spaces. You can explore a curated showcase of our built works in the 'Projects' section featured above."
  }
];

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="w-full bg-background border-t border-border mb-12">
      {/* 1. 顶部 H2 标题部分 */}
      <div className="max-w-7xl px-6 md:px-16 pt-20 pb-12">
        <div className="flex flex-col items-start gap-4">
          <div className="w-12 h-px bg-foreground" />
          <h2 className="font-futura text-2xl md:text-3xl tracking-[0.05em] uppercase text-foreground">
            Frequently Asked Questions
          </h2>
        </div>
      </div>

      {/* 2. FAQ 列表部分 */}
      <div className="border-t border-border">
        {faqData.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div 
              key={idx} 
              className="border-b border-border hover:bg-foreground/[0.01] transition-colors duration-300"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex justify-between items-center text-left px-6 md:px-16 py-6 md:py-8 group"
              >
                {/* 字体调大：从 text-xs md:text-sm 提升到 text-sm md:text-base */}
                <span className="font-futura text-sm md:text-base tracking-[0.15em] uppercase text-foreground group-hover:text-muted-foreground transition-colors leading-relaxed">
                  {faq.question}
                </span>
                <span className="text-muted-foreground flex-shrink-0 ml-4">
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              
              <div
                className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "grid-rows-[1fr] opacity-100 mb-6 md:mb-8" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden px-6 md:px-16">
                  {/* 字体调大：从 text-xs 提升到 text-sm */}
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground font-light max-w-4xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;