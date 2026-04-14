import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

interface HeaderProps {
  transparent?: boolean;
}

const navItems = [
  { label: "Projects", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const Header = ({ transparent = false }: HeaderProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const textClass = transparent ? "text-white" : "text-foreground";
  const mutedTextClass = transparent ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground";
  const activeTextClass = transparent ? "text-white" : "text-foreground";
  const underlineClass = transparent ? "bg-white" : "bg-foreground";

  return (
    <header className={`w-full relative z-20 ${transparent ? "" : "border-b border-border"}`}>
      <div className="flex items-center justify-between px-6 md:px-8 py-5 md:py-6">
        <Link to="/" className="flex items-center gap-4 md:gap-5 group">
          <span className="inline-flex shrink-0 items-center justify-center  px-3 py-2.5 md:px-4 md:py-3">
            <img
              src={logo}
              alt="HIDI LAU ARCHITECT"
              className="h-11 md:h-14 w-auto object-contain"
            />
          </span>
          <h1 className="font-fiona text-base md:text-lg lg:text-xl tracking-[0.28em] uppercase font-normal leading-tight text-white">
            HIDI LAU ARCHITECT
          </h1>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center font-futura">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="relative group"
              >
                <span
                  className={`font-bold text-xs tracking-[0.2em] uppercase transition-colors ${isActive
                    ? activeTextClass
                    : mutedTextClass
                    }`}
                >
                  {item.label}
                </span>
                <div
                  className={`absolute -bottom-1 left-0 h-px ${underlineClass} transition-all duration-500`}
                  style={{ width: isActive ? "100%" : "0%" }}
                />
                <div className={`absolute -bottom-1 left-0 h-px ${underlineClass} w-0 group-hover:w-full transition-all duration-500`} />
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden ${textClass}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-white">
          {/* White header bar with logo and close */}
          <div className="flex items-center justify-between px-6 py-5">
            <Link to="/" className="flex items-center gap-4 group" onClick={() => setMobileOpen(false)}>
              <span className="inline-flex shrink-0 items-center justify-center px-3 py-2.5">
                <img src={logo} alt="HIDI LAU ARCHITECT" className="h-11 w-auto object-contain" />
              </span>
              <span className="text-base tracking-[0.28em] uppercase font-light leading-tight">
                HIDI LAU ARCHITECT
              </span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="text-foreground">
              <X size={20} />
            </button>
          </div>
          {/* Dark body with nav links */}
          <div className="flex-1 bg-[#1a1a1a] px-6 pt-8 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block w-fit border border-white/70 px-5 py-2.5 font-futura font-bold text-xs tracking-[0.2em] uppercase text-white/70 hover:text-white hover:border-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
