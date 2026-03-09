const Header = () => {
  return (
    <header className="w-full border-b border-border">
      <div className="flex items-center justify-between px-6 py-5">
        <h1 className="text-sm tracking-[0.4em] uppercase font-light text-foreground">
          Studio Atelier
        </h1>
        <nav className="flex gap-8">
          <a href="#" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </a>
          <a href="#" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            About
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
