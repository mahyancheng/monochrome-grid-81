import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Projects", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full border-b border-border relative">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="HIDI Lau Architect"
            className="h-10 object-contain mix-blend-multiply dark:invert"
          />
          <h1 className="text-sm tracking-[0.3em] uppercase font-light text-foreground">
            HIDI Lau Architect
          </h1>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="relative group"
              >
                <span
                  className={`text-xs tracking-[0.2em] uppercase transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </span>
                <div
                  className="absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-500"
                  style={{ width: isActive ? "100%" : "0%" }}
                />
                <div className="absolute -bottom-1 left-0 h-px bg-foreground w-0 group-hover:w-full transition-all duration-500" />
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block px-6 py-4 border-b border-border text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
