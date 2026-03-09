import Header from "@/components/Header";
import Footer from "@/components/Footer";

import aboutHero from "@/Archive/AboutPage/002about.jpg";
import hidiPhoto from "@/Archive/AboutPage/untitled-design-1.png";
import weisingPhoto from "@/Archive/AboutPage/untitled-design-2.png";
import journeyImg from "@/Archive/AboutPage/01.jpg";
import spaceImg from "@/Archive/AboutPage/emw_17-1.jpg";
import awardImg1 from "@/Archive/AboutPage/t1.jpg";
import awardImg2 from "@/Archive/AboutPage/t12.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative w-full h-[60vh] overflow-hidden">
          <img src={aboutHero} alt="About Tectone Design" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/50 flex items-center justify-center">
            <h1 className="text-primary-foreground text-xs tracking-[0.5em] uppercase">About Us</h1>
          </div>
        </div>

        {/* Team Section */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          {/* Hidi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            <div className="aspect-[3/4] overflow-hidden">
              <img src={hidiPhoto} alt="Ar. Hidi Lau Wei Lin" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-sm tracking-[0.3em] uppercase font-light text-foreground mb-2">
                Ar. Hidi Lau Wei Lin
              </h2>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">
                Lead Architect & Lead Interior Designer
              </p>
              <p className="text-sm leading-7 text-muted-foreground font-light">
                Ar. Hidi Lau graduated with Master of Architecture from the University of Melbourne in 2014 and Bachelor of Environments from the University of Western Australia in 2011. Since then, she has worked at established architectural offices in Melbourne and Johor Bahru, handling a wide range of developments that include international resorts and hotels, residential and interior projects for more than 8 years. She has been involved in numerous Award-Winning projects as Project Architect and Design Architect.
              </p>

              {/* Awards */}
              <div className="mt-10 space-y-6 border-t border-border pt-10">
                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-foreground mb-2">Speaker of KLAF DATUM 2023</h3>
                  <p className="text-xs leading-6 text-muted-foreground font-light">
                    Invited by Pertubuhan Arkitek Malaysia (PAM) DATUM KLAF as the Speaker of KLAM DATUM 2023 Annual National Architectural Conference.
                  </p>
                </div>
                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-foreground mb-2">PAM Silver Award (Commercial Category)</h3>
                  <p className="text-xs leading-6 text-muted-foreground font-light">
                    Won PAM Silver Award 2019 under Low-Rise Commercial Category for The Langkawi Kitchen of the Ritz-Carlton Langkawi.
                  </p>
                </div>
                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-foreground mb-2">Jury For TV2 Architectural Competition</h3>
                  <p className="text-xs leading-6 text-muted-foreground font-light">
                    Invited by TV2 to be involved in an Architectural Education and Competition programme named 'Arkitek Junior' as judge and professor.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Award images */}
          <div className="grid grid-cols-2 gap-0 mb-24">
            <div className="aspect-video overflow-hidden">
              <img src={awardImg1} alt="Award" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-video overflow-hidden">
              <img src={awardImg2} alt="Award" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Wei Sing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            <div className="flex flex-col justify-center order-2 md:order-1">
              <h2 className="text-sm tracking-[0.3em] uppercase font-light text-foreground mb-2">
                Lau Wei Sing
              </h2>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">
                Studio Master & Design Director
              </p>
              <p className="text-sm leading-7 text-muted-foreground font-light">
                WeiSing is an Architectural Designer based in Hong Kong. He holds a Master degree from University College London (Bartlett) and bachelor degree from RMIT University Australia.
              </p>
              <p className="text-sm leading-7 text-muted-foreground font-light mt-4">
                In parallel with setting up Tectone design studio, Weising works for world renowned architecture practice Snøhetta on projects across Asia Pacific regions, specifically Resorts, Commercial Retail Development and Institution projects.
              </p>
              <p className="text-sm leading-7 text-muted-foreground font-light mt-4">
                Prior to Snøhetta, Weising also had professional experience working for Architects EAT in Melbourne and Collective Studio Hong Kong and Urban Agenda Design Kuala Lumpur — working on residential, hospitality and arts and cultural projects.
              </p>
              <p className="text-sm leading-7 text-muted-foreground font-light mt-4">
                Wei Sing is currently a seasonal tutor and guest critics at Universities in Hong Kong and UK.
              </p>
            </div>
            <div className="aspect-[3/4] overflow-hidden order-1 md:order-2">
              <img src={weisingPhoto} alt="Lau Wei Sing" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="aspect-square overflow-hidden">
            <img src={journeyImg} alt="Our Journey" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center px-12 py-16">
            <h2 className="text-xs tracking-[0.4em] uppercase text-foreground mb-8">Our Journey</h2>
            <p className="text-sm leading-7 text-muted-foreground font-light mb-6">
              Tectone Design Sdn Bhd is a multi-disciplinary architectural design studio established in 1989, delivering excellence for over three decades. Our studio is composed of passionate professionals dedicated to design and quality lifestyle, with expertise spanning interior design, architectural design, and product design.
            </p>
            <p className="text-sm leading-7 text-muted-foreground font-light">
              Led by multiple award-winning architects, our team brings unique perspectives into every crafted space. Our area of specialty lies in architecture-focused interior design, architectural design, and interior decoration, where form, function, and refined aesthetics come together seamlessly.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 px-6 max-w-3xl mx-auto">
          <h2 className="text-xs tracking-[0.4em] uppercase text-foreground mb-12 text-center">Our Values</h2>
          <div className="space-y-4">
            {[
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
            ].map((value, i) => (
              <p key={i} className="text-sm leading-7 text-muted-foreground font-light border-l border-border pl-6">
                {value}
              </p>
            ))}
          </div>
        </section>

        {/* A Space For Living */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="flex flex-col justify-center px-12 py-16">
            <h2 className="text-xs tracking-[0.4em] uppercase text-foreground mb-8">A Space For Living</h2>
            <p className="text-sm leading-7 text-muted-foreground font-light">
              Speak to us today and let our architectural and interior design team help you visualize your house design, transforming ideas into a well-crafted living space.
            </p>
          </div>
          <div className="aspect-square overflow-hidden">
            <img src={spaceImg} alt="A Space For Living" className="w-full h-full object-cover" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
