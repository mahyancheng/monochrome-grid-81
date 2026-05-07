import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full">
      {/* Top thin black divider */}
      <div className="h-px w-full bg-foreground" />

      {/* Main footer content */}
      <div className="bg-background py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-start">
          {/* Logo / Brand */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src={logo}
              alt="Hidi Lau Architect logo"
              className="h-20 md:h-24 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
            <h2 className="mt-4 font-futura text-base md:text-lg tracking-[0.25em] uppercase text-foreground">
              Hidi Lau Architect
            </h2>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="font-futura font-bold text-sm md:text-base text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 font-futura text-sm md:text-base text-foreground/80">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/about/" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services/" className="hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog/" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact/" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Address */}
          <div className="flex flex-col font-futura text-sm md:text-base text-foreground/80">
            <p className="text-foreground">Address:</p>
            <p className="mt-1 leading-relaxed">
              1, Jalan b iru 2, taman pelangi, 80400, johor bahru, johor, malaysia
            </p>
            <p className="mt-6 text-foreground">
              Tel : <a href="tel:+60167442330" className="hover:underline">016 - 744 2330</a>
            </p>
            <p className="mt-1 text-foreground">
              Email : <a href="mailto:hidilin@gmail.com" className="hover:underline">hidilin@gmail.com</a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="py-6 text-center" style={{ backgroundColor: "#262626" }}>
        <span className="text-[10px] tracking-[0.15em] text-white">
          Hidi Lau Architect © 2026 All Rights Reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
