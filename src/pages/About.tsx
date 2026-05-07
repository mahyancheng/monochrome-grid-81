import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FeaturedSpotlight, CornerAccents, AnimatedLabel } from "@/components/ui/feature-spotlight";

import hidiPhoto from "@/Archive/AboutPage/IMG_0520.jpg";

import SEO from "@/components/SEO";
import journeyImg from "@/Archive/AboutPage/01.jpg";
import spaceImg from "@/Archive/AboutPage/emw_17-1.jpg";
import { getAboutSchema } from "@/lib/schema";

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
      <SEO
        title="Top Architecture Firms in Malaysia | About Us | Hidi Lau Architect"
        description="Meet Ar. Hidi Lau Wei Lir, principal architect at Hidi Lau Architect. Award-winning architectural and interior design studio established in 1989 in Johor Bahru."
        path="/about/"
        schema={getAboutSchema()} // 2. 这里传入动态生成的 Schema
      />
      <Header />
      <main className="flex-1">

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
              className="w-full h-full object-cover transition-transform duration-700 grayscale"
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
          <div className="aspect-square flex flex-col justify-center px-8 lg:px-16 font-futura">
            <AnimatedLabel text="Principal" isActive={hidiHover} />
            <h2 className="text-xl md:text-2xl tracking-[0.15em] uppercase font-light text-foreground mt-6 mb-1">
              Ar. Hidi Lau Wei Lin
            </h2>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
              A/L 465 · Principal · LAM Registered Architect
            </p>
            <p className="text-[10px] tracking-[0.15em] text-muted-foreground mb-1">
              B. Env. Design (UWA) · M. Arch (Univ. Melb) · Corporate Member of PAM
            </p>
            <p className="text-[10px] tracking-[0.15em] text-muted-foreground mb-6">
              10+ Years Experience · PAM Silver Award Winner (2019)
            </p>
            <p className="text-xs leading-6 text-muted-foreground font-light max-w-lg">
              Ar. Hidi Lau Wei Lin is a practicing Architect registered with Lembaga Arkitek Malaysia (LAM) —Board of Architects Malaysia. She is a corporate member of the Pertubuhan Akitek Malaysia (PAM) — Malaysian Institute of Architects.
              Hidi Lau Architect is a design-focused architectural firm in Johor Bahru, Malaysia known for creating well-crafted contemporary homes and spaces suited for tropical and modern living. The practice was established by Ar. Hidi Lau Wei Lin, who graduated with Master of Architecture from the University of Melbourne in 2014 and Bachelor of Environments from the University of Western Australia in 2011. She has worked at established architectural offices in Melbourne and Johor Bahru, handling international resorts and hotels, residential and interior projects for more than 10 years before starting her practice. Ar. Hidi Lau has extensive experience in both the architecture and interior design on residential landed house and exclusively in contemporary luxury homes, tropical luxury resort, commercial spaces and more.
              Over the years, Ar. Hidi Lau has been involved in numerous award-winning projects and the projects have been featured in prominent publications such as Architecture Malaysia (AM), published by PAM (Pertubuhan Akitek Malaysia). She has also been heavily involved in the Ritz Carlton Langkawi, which has been awarded PAM Silver Award project under Commercial Low Rise Category in 2019.
            </p>
          </div>
        </div>
      </main>
     <Footer />
    </div>
  );
};

export default About;
