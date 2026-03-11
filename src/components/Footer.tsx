import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import bottomLogo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Logo & tagline */}
        <div className="px-6 py-10 md:border-r border-b md:border-b-0 border-border">
          <img
            src={bottomLogo}
            alt="HIDI Lau Architect"
            className="h-12 object-contain mb-6 mix-blend-multiply dark:invert"
          />
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground leading-5">
            Architecture · Interior · Design
          </p>
        </div>

        {/* Quick Links */}
        <div className="px-6 py-10 md:border-r border-b md:border-b-0 border-border">
          <h3 className="text-[10px] tracking-[0.3em] uppercase text-foreground mb-6 flex items-center gap-2">
            <div className="w-4 h-px bg-foreground" />
            Quick Links
          </h3>
          <div className="space-y-3">
            {[
              { label: "About Us", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Projects", href: "/" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group flex items-center gap-2 text-xs tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowUpRight
                  size={10}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="px-6 py-10">
          <h3 className="text-[10px] tracking-[0.3em] uppercase text-foreground mb-6 flex items-center gap-2">
            <div className="w-4 h-px bg-foreground" />
            Contact
          </h3>
          <div className="space-y-3">
            <p className="text-xs leading-5 text-muted-foreground">
              1, Jalan Biru 2, Taman Pelangi,
              <br />
              80400 Johor Bahru, Johor, Malaysia.
            </p>
            <p className="text-xs text-muted-foreground">
              Tel : +607-339 1199
            </p>
            <p className="text-xs text-muted-foreground">
              Email : admin@tectonedesign.com
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 py-4 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.15em] text-muted-foreground">
          © 2026 HIDI Lau Architect
        </span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 border border-foreground" />
          <div className="w-2 h-2 border border-foreground rotate-45" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
