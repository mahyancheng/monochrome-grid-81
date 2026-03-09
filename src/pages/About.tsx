import Header from "@/components/Header";
import Footer from "@/components/Footer";

import hidiPhoto from "@/Archive/AboutPage/untitled-design-2.png";
import weisingPhoto from "@/Archive/AboutPage/untitled-design-1.png";
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
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Title */}
        <div className="py-10 border-b border-border">
          <h1 className="text-xs tracking-[0.5em] uppercase text-center text-foreground">About Us</h1>
        </div>

        {/* Team grid — tight, Instagram-style */}
        <div className="grid grid-cols-2 w-full">
          {/* Hidi */}
          <div className="aspect-square overflow-hidden">
            <img src={hidiPhoto} alt="Ar. Hidi Lau Wei Lin" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-square flex flex-col justify-center px-8 lg:px-16">
            <h2 className="text-sm tracking-[0.3em] uppercase font-light text-foreground mb-1">
              Ar. Hidi Lau Wei Lin
            </h2>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Lead Architect & Lead Interior Designer
            </p>
            <p className="text-xs leading-6 text-muted-foreground font-light">
              Ar. Hidi Lau graduated with Master of Architecture from the University of Melbourne in 2014 and Bachelor of Environments from the University of Western Australia in 2011. She has worked at established architectural offices in Melbourne and Johor Bahru, handling international resorts and hotels, residential and interior projects for more than 8 years.
            </p>
          </div>

          {/* Wei Sing */}
          <div className="aspect-square flex flex-col justify-center px-8 lg:px-16">
            <h2 className="text-sm tracking-[0.3em] uppercase font-light text-foreground mb-1">
              Lau Wei Sing
            </h2>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Studio Master & Design Director
            </p>
            <p className="text-xs leading-6 text-muted-foreground font-light">
              WeiSing is an Architectural Designer based in Hong Kong. He holds a Master degree from University College London (Bartlett) and bachelor degree from RMIT University Australia. He works for world renowned architecture practice Snøhetta on projects across Asia Pacific regions.
            </p>
          </div>
          <div className="aspect-square overflow-hidden">
            <img src={weisingPhoto} alt="Lau Wei Sing" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Awards — tight 2-col grid */}
        <div className="grid grid-cols-2 w-full">
          <div className="aspect-square overflow-hidden">
            <img src={awardImg1} alt="KLAF DATUM 2023" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-square overflow-hidden">
            <img src={awardImg2} alt="PAM Silver Award" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Awards text strip */}
        <div className="grid grid-cols-3 w-full border-y border-border">
          <div className="py-8 px-6">
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-foreground mb-2">Speaker of KLAF DATUM 2023</h3>
            <p className="text-[10px] leading-5 text-muted-foreground font-light">
              Invited by PAM as the Speaker of KLAM DATUM 2023 Annual National Architectural Conference.
            </p>
          </div>
          <div className="py-8 px-6 border-x border-border">
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-foreground mb-2">PAM Silver Award</h3>
            <p className="text-[10px] leading-5 text-muted-foreground font-light">
              Won PAM Silver Award 2019 under Low-Rise Commercial Category for The Langkawi Kitchen of the Ritz-Carlton Langkawi.
            </p>
          </div>
          <div className="py-8 px-6">
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-foreground mb-2">Jury — TV2 Arkitek Junior</h3>
            <p className="text-[10px] leading-5 text-muted-foreground font-light">
              Invited by TV2 as judge and professor for the Architectural Education and Competition programme 'Arkitek Junior'.
            </p>
          </div>
        </div>

        {/* Our Journey — tight grid */}
        <div className="grid grid-cols-2 w-full">
          <div className="aspect-square overflow-hidden">
            <img src={journeyImg} alt="Our Journey" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-square flex flex-col justify-center px-8 lg:px-16">
            <h2 className="text-xs tracking-[0.4em] uppercase text-foreground mb-6">Our Journey</h2>
            <p className="text-xs leading-6 text-muted-foreground font-light mb-4">
              Tectone Design Sdn Bhd is a multi-disciplinary architectural design studio established in 1989, delivering excellence for over three decades.
            </p>
            <p className="text-xs leading-6 text-muted-foreground font-light">
              Led by multiple award-winning architects, our team brings unique perspectives into every crafted space. Our specialty lies in architecture-focused interior design, architectural design, and interior decoration.
            </p>
          </div>
        </div>

        {/* Values — tight grid */}
        <div className="grid grid-cols-2 w-full">
          <div className="aspect-square flex flex-col justify-center px-8 lg:px-16 border-t border-border">
            <h2 className="text-xs tracking-[0.4em] uppercase text-foreground mb-8">Our Values</h2>
            <div className="space-y-3">
              {values.map((v, i) => (
                <p key={i} className="text-[10px] leading-5 text-muted-foreground font-light">
                  {v}
                </p>
              ))}
            </div>
          </div>
          <div className="aspect-square overflow-hidden border-t border-border">
            <img src={spaceImg} alt="A Space For Living" className="w-full h-full object-cover" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
