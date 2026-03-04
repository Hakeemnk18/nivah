import { Instagram, Mail, Facebook, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[var(--footer-bg)] text-[var(--text)]">
      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* Brand Section */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl tracking-wide text-[var(--accent)]">
            NIVAH
          </h2>

          <p className="mt-3 text-sm text-[var(--muted)]">
            Timeless designs for every occasion.
          </p>

          <p className="mt-2 text-xs tracking-wide text-[var(--accent)]">
            Free Delivery Across India 🇮🇳
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-16 text-center md:grid-cols-3 w-full max-w-4xl mx-auto">

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-xs font-semibold tracking-widest text-[var(--accent)]">
              QUICK LINKS
            </h3>

            <ul className="space-y-3 text-sm text-[var(--muted)]">
              <Link to="/products" className="hover:text-[var(--text)] transition cursor-pointer block">
                Shop
              </Link>
              <Link to="/about" className="hover:text-[var(--text)] transition cursor-pointer block">
                About
              </Link>
              <Link to="/privacy-policy"
                className="hover:text-[var(--text)] transition cursor-pointer block">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions"
                className="hover:text-[var(--text)] transition cursor-pointer block">
                Terms & Conditions
              </Link>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="mb-6 text-xs font-semibold tracking-widest text-[var(--accent)]">
              CONNECT
            </h3>

            <div className="flex justify-center  gap-5 mb-6 text-[var(--muted)]">
              <a
                href="https://www.instagram.com/nivahfsn?igsh=YmtlNmlmbXNuZnJz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[var(--text)] transition "
              >
                <Instagram className="w-5 h-5 hover:text-[var(--text)] transition cursor-pointer" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=Nivahfsn@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send Email"
              >
                <Mail className="w-5 h-5 hover:text-[var(--text)] transition cursor-pointer" />
              </a>
              <a
                href="https://www.facebook.com/share/1HazckAdUQ/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[var(--text)] transition "
              >
                <Facebook className="w-5 h-5 hover:text-[var(--text)] transition cursor-pointer" />
              </a>


            </div>

            <p className="text-sm text-[var(--muted)] mb-4">
              Need help choosing the perfect piece?
            </p>

            {/* WhatsApp Button */}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://wa.me/919037577599">
              <button
                className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-6 py-2 text-sm font-medium text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-black cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                Contact Us on WhatsApp
              </button>
            </a>
          </div>

          {/* Trust Section */}
          <div>
            <h3 className="mb-6 text-xs font-semibold tracking-widest text-[var(--accent)]">
              TRUST
            </h3>

            <ul className="space-y-3 text-sm text-[var(--muted)]">
              <li>Free Shipping Nationwide</li>
              <li>Secure Payments</li>
              <li>Easy Support</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-[var(--footer-border)] pt-8 text-center text-xs text-[var(--muted)]">
          <p>© 2026 NIVAH. All rights reserved.</p>
          <p className="mt-2">
            Handcrafted fashion jewelry for modern elegance.
          </p>
        </div>

      </div>
    </footer>
  );
}