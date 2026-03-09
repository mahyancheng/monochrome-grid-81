import logo from "@/Archive/HomePage/headermenu002.jpg";

const Header = () => {
  return (
    <header className="w-full border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Tectone Design" className="h-8 object-contain" />
          <h1 className="text-sm tracking-[0.3em] uppercase font-light text-foreground">
            Tectone Design
          </h1>
        </div>
        <nav className="flex gap-8">
          <a href="/" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </a>
          <a href="/about" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="/services" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            Services
          </a>
          <a href="#" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
