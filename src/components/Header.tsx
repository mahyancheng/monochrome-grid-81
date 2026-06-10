import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

interface HeaderProps {
  transparent?: boolean;
}

const navItems = [
  { label: "Projects", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Contact", href: "/contact/" },
];

const Header = ({ transparent = false }: HeaderProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const useWhiteText = transparent;

  const textClass = useWhiteText ? "text-white" : "text-foreground";
  const mutedTextClass = useWhiteText ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground";
  const activeTextClass = useWhiteText ? "text-white" : "text-foreground";
  const underlineClass = useWhiteText ? "bg-white" : "bg-foreground";

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
          <h1 className={`font-futura text-base md:text-lg lg:text-xl tracking-[0.28em] uppercase font-normal leading-tight transition-colors duration-500 ${transparent ? "text-white" : "text-foreground"}`}>
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
      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-[#0a0a0a]">
          {/* 顶部栏：保持整洁 */}
          <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-[#e0e0e0]">
            <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <img src={logo} alt="Logo" className="h-9 w-auto" />
            </Link>
            <button onClick={() => setMobileOpen(false)} className="text-black p-1">
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* 菜单主体：建筑设计感的排版 */}
          <div className="flex-1 px-8 pt-16 flex flex-col gap-8">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group flex items-center gap-6"
                  onClick={() => setMobileOpen(false)}
                >
                  {/* 数字索引装饰 */}
                  <span className="font-futura text-[10px] text-white/20 tracking-[0.2em]">
                    0{index + 1}
                  </span>

                  {/* 文字标签，带动态 hover 线条 */}
                  <div className="relative">
                    <span className={`font-futura text-lg tracking-[0.3em] uppercase transition-all duration-500 ${isActive ? "text-white font-bold" : "text-white/60 group-hover:text-white"
                      }`}>
                      {item.label}
                    </span>
                    <div className={`h-[1px] bg-white transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* 底部装饰性元素：加入简洁的地址或联系方式提示 */}
          <div className="px-8 pb-12 font-futura">
            <div className="w-10 h-[1px] bg-white/20 mb-6" />
            <p className="text-[9px] tracking-[0.2em] uppercase text-white/40">
              Hidi Lau Architect <br /> Johor Bahru, Malaysia
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
