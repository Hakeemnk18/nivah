import { ShoppingCart, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "./Logo";
import { useEffect, useState } from "react";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur bg-[var(--bg)] border-b" : "bg-transparent"
      }`}
      style={{
        borderColor: scrolled ? "var(--card)" : "transparent",
        color: "var(--text)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <button className="md:hidden text-white">
          <Menu size={22} />
        </button>

        <div className="md:flex-1 flex justify-center md:justify-start">
          <Logo />
        </div>

        <ul className="hidden md:flex gap-8 text-sm font-medium text-white">
          <li>Home</li>
          <li>Shop</li>
          <li>About</li>
        </ul>

        <div className="flex items-center gap-4 md:flex-1 md:justify-end text-white">
          
          <ShoppingCart size={20} />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}