import { ShoppingCart, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { getGuestId } from "../utils/guest";
import { useGetCartItemsCount } from "../../features/cart/hooks/use.get.cart.items.count";

type NavbarProps = {
  mode?: "landing" | "default";
};

export default function Navbar({ mode = "default" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const guestId = getGuestId();
  const { data: cartItemsCount } = useGetCartItemsCount(guestId);

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
            <Link to="/" className="cursor-pointer">Home</Link>
            <Link to="/products" className="cursor-pointer">Shop</Link>
            <Link to="/about" className="cursor-pointer">About</Link>
          </ul>

          <div
            className={`flex items-center gap-4 md:flex-1 md:justify-end ${mode === "landing"
                ? scrolled
                  ? "text-[var(--text)]"
                  : "text-white"
                : "text-[var(--text)]"
              }`}
          >
            {/* Cart Icon with Badge */}
            <div
              className="relative cursor-pointer flex items-center justify-center"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart size={20} />

              {/* Conditional rendering for count > 0 */}
              {(cartItemsCount ?? 0) > 0 && (
                <span className="absolute -top-2 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--text)] text-[var(--card)] text-[10px] font-bold shadow-sm">
                  {cartItemsCount}
                </span>
              )}
            </div>

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
                <Link
                  to={item === "Home" ? "/" : item === "Shop" ? "/products" : "/about"}
                  key={item}
                  className="tracking-wide hover:text-[var(--accent)] transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}