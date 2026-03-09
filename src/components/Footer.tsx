const Footer = () => {
  return (
    <footer className="w-full border-t border-border px-6 py-8">
      <div className="flex items-center justify-between">
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
          © 2024 Studio Atelier
        </span>
        <div className="flex gap-6">
          <a href="#" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            Instagram
          </a>
          <a href="#" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
