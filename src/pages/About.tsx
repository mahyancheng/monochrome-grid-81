import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FeaturedSpotlight, CornerAccents, AnimatedLabel } from "@/components/ui/feature-spotlight";

import hidiPhoto from "@/Archive/AboutPage/untitled-design-2.png";

import journeyImg from "@/Archive/AboutPage/01.jpg";
import spaceImg from "@/Archive/AboutPage/emw_17-1.jpg";
import awardImg1 from "@/Archive/AboutPage/t1.jpg";
import awardImg2 from "@/Archive/AboutPage/t12.jpg";

const values = [
  "We are committed and passionate about our work.",
  "We are sensitive to the needs of our clients and the context within which we build.",
  "We care and respect the people who help us realize our ideas.",
  "We think it is fundamental to understand the building process.",
  "We believe in the craft of design.",
  "We believe in making things with our hands.",
  "We believe God is in the details.",
  "We believe that architecture is organic and the aging process is natural, inevitable and unavoidable, hence through good design even the spaces we use and live in can shape and age gracefully with us.",
  "We don't like to take things too seriously to preserve sanity, good judgment and humor.",
  "We have fun.",
];

const About = () => {
  const [hidiHover, setHidiHover] = useState(false);
  const [journeyHover, setJourneyHover] = useState(false);
  const [valuesHover, setValuesHover] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Title */}
        <div className="py-10 border-b border-border">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-foreground" />
            <h1 className="text-xs tracking-[0.5em] uppercase text-foreground">
              About Us
            </h1>
            <div className="w-8 h-px bg-foreground" />
          </div>
        </div>

        {/* Hidi section */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 w-full"
          onMouseEnter={() => setHidiHover(true)}
          onMouseLeave={() => setHidiHover(false)}
        >
          <div className="relative aspect-square overflow-hidden">
            <img
              src={hidiPhoto}
              alt="Ar. Hidi Lau Wei Lin"
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ transform: hidiHover ? "scale(1.03)" : "scale(1)" }}
            />
            <div
              className="absolute inset-0 bg-foreground/5 transition-opacity duration-500"
              style={{ opacity: hidiHover ? 0 : 1 }}
            />
            <CornerAccents className="opacity-40" />
            <span className="absolute bottom-4 right-6 text-[10px] tracking-[0.3em] text-background/60">
              01
            </span>
          </div>
          <div className="aspect-square flex flex-col justify-center px-8 lg:px-16">
            <AnimatedLabel text="Lead Architect" isActive={hidiHover} />
            <h2 className="text-xl md:text-2xl tracking-[0.15em] uppercase font-light text-foreground mt-6 mb-1">
              Ar. Hidi Lau
            </h2>
            <h2 className="text-xl md:text-2xl tracking-[0.15em] uppercase font-light text-foreground mb-2">
              Wei Lin
            </h2>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Lead Architect & Lead Interior Designer
            </p>
            <p className="text-xs leading-6 text-muted-foreground font-light max-w-sm">
              Ar. Hidi Lau graduated with Master of Architecture from the
              University of Melbourne in 2014 and Bachelor of Environments from
              the University of Western Australia in 2011. She has worked at
              established architectural offices in Melbourne and Johor Bahru,
              handling international resorts and hotels, residential and interior
              projects for more than 8 years.
            </p>
          </div>
        </div>


        {/* Awards images with corner accents */}
        <div className="grid grid-cols-2 w-full border-t border-border">
          <div className="relative aspect-square overflow-hidden group">
            <img
              src={awardImg1}
              alt="KLAF DATUM 2023"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-all duration-500" />
            <CornerAccents className="opacity-30 group-hover:opacity-60 transition-opacity" />
          </div>
          <div className="relative aspect-square overflow-hidden group">
            <img
              src={awardImg2}
              alt="PAM Silver Award"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-all duration-500" />
            <CornerAccents className="opacity-30 group-hover:opacity-60 transition-opacity" />
          </div>
        </div>

        {/* Awards text strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 w-full border-y border-border">
          {[
            {
              title: "Speaker of KLAF DATUM 2023",
              desc: "Invited by PAM as the Speaker of KLAM DATUM 2023 Annual National Architectural Conference.",
            },
            {
              title: "PAM Silver Award",
              desc: "Won PAM Silver Award 2019 under Low-Rise Commercial Category for The Langkawi Kitchen of the Ritz-Carlton Langkawi.",
            },
            {
              title: "Jury — TV2 Arkitek Junior",
              desc: "Invited by TV2 as judge and professor for the Architectural Education and Competition programme 'Arkitek Junior'.",
            },
          ].map((award, i) => (
            <div
              key={i}
              className={`py-8 px-6 ${i < 2 ? "md:border-r border-b md:border-b-0 border-border" : ""}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-px bg-foreground" />
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-foreground">
                  {award.title}
                </h3>
              </div>
              <p className="text-[10px] leading-5 text-muted-foreground font-light pl-5">
                {award.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Our Journey — Spotlight style */}
        <FeaturedSpotlight
          label="Since 1989"
          title={["Our", "Journey"]}
          description="Tectone Design Sdn Bhd is a multi-disciplinary architectural design studio established in 1989, delivering excellence for over three decades. Led by multiple award-winning architects, our team brings unique perspectives into every crafted space."
          ctaText="Our Services"
          ctaHref="/services"
          imageSrc={journeyImg}
          imageAlt="Our Journey"
          index="03"
        />

        {/* Values section */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 w-full border-t border-border"
          onMouseEnter={() => setValuesHover(true)}
          onMouseLeave={() => setValuesHover(false)}
        >
          <div className="aspect-auto md:aspect-square flex flex-col justify-center px-8 lg:px-16 py-12">
            <AnimatedLabel text="Philosophy" isActive={valuesHover} />
            <h2 className="text-xl md:text-2xl tracking-[0.15em] uppercase font-light text-foreground mt-6 mb-8">
              Our Values
            </h2>
            <div className="space-y-3">
              {values.map((v, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-[10px] text-muted-foreground/40 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[10px] leading-5 text-muted-foreground font-light">
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden">
            <img
              src={spaceImg}
              alt="A Space For Living"
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ transform: valuesHover ? "scale(1.03)" : "scale(1)" }}
            />
            <div
              className="absolute inset-0 bg-foreground/10 transition-opacity duration-500"
              style={{ opacity: valuesHover ? 0 : 1 }}
            />
            <CornerAccents className="opacity-40" />
            <span className="absolute bottom-4 right-6 text-[10px] tracking-[0.3em] text-background/60">
              04
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
