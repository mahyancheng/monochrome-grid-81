import bottomLogo from "@/Archive/HomePage/bottomlogo.jpg";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border px-6 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={bottomLogo} alt="Tectone Design" className="h-10 object-contain" />
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </a>
            <a href="#" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-6">
          <span className="text-xs tracking-[0.15em] text-muted-foreground">
            1, Jalan Biru 2, Taman Pelangi, 80400 Johor Bahru, Johor, Malaysia
          </span>
          <span className="text-xs tracking-[0.15em] text-muted-foreground">
            © 2026 Tectone Design Sdn Bhd
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
