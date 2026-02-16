import { ShoppingCart, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  mode?: "landing" | "default";
};

export default function Navbar({ mode = "default" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${mode === "landing"
            ? scrolled
              ? "backdrop-blur bg-black/30"
              : "bg-transparent"
            : "bg-[var(--card)]"
          }`}
        style={{
          borderColor: scrolled ? "var(--card)" : "transparent",
          color: "var(--text)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            className={`md:hidden 
              ${mode === "landing"
                ? scrolled
                  ? "text-[var(--text)]"
                  : "text-white"
                : "text-[var(--text)]"
              }`}
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>

          <div className="md:flex-1 flex justify-center md:justify-start">
            <Logo />
          </div>

          {/* Desktop nav */}
          <ul
            className={`hidden md:flex gap-8 text-sm font-medium
               ${mode === "landing"
                ? scrolled
                  ? "text-[var(--text)]"
                  : "text-white"
                : "text-[var(--text)]"
              }`}
          >
            <li>Home</li>
            <li>Shop</li>
            <li>About</li>
          </ul>

          <div
            className={`flex items-center gap-4 md:flex-1 md:justify-end ${mode === "landing"
                ? scrolled
                  ? "text-[var(--text)]"
                  : "text-white"
                : "text-[var(--text)]"
              }`}
          >
            <ShoppingCart
              onClick={() => navigate("/cart")}
              size={20} />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              fixed top-[0px] left-0 right-0 z-60
              bg-[var(--footer-bg)]
              border-t border-white/10
              md:hidden
            "
          >
            <div className="flex justify-star px-4 pt-4">
              <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                <X size={22} className="text-white" />
              </button>
            </div>
            <ul className="flex flex-col gap-6 px-6 py-8 text-sm text-white">
              {["Home", "Shop", "About"].map((item) => (
                <li
                  key={item}
                  className="tracking-wide hover:text-[var(--accent)] transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
