import { Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--footer-bg)] text-[var(--text)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Brand */}
        <div className="mb-16 text-center">
          <h2 className="font-serif text-3xl tracking-wide text-[var(--accent)]">
            NIVAH
          </h2>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Timeless designs for every occasion.
          </p>
          <p className="text-xs text-[var(--muted)]">
            Crafted to complement modern style.
          </p>
        </div>

        {/* Links */}
        <div
          className="
    grid
    grid-cols-2
    gap-x-8
    gap-y-12
    sm:grid-cols-2
    lg:grid-cols-4
    text-center
  "
        >
          <FooterColumn
            title="Shop"
            links={["Necklaces", "Earrings", "Rings", "All Collections"]}
          />

          <FooterColumn
            title="Company"
            links={["About Us", "Contact", "FAQs"]}
          />

          <FooterColumn
            title="Help"
            links={[
              "Shipping & Delivery",
              "Returns & Exchanges",
              "Privacy Policy",
              "Terms & Conditions",
            ]}
          />

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-[var(--accent)]">
              CONNECT
            </h3>
            <ul className="space-y-3 text-sm text-[var(--muted)]">
              <li className="hover:text-[var(--text)] transition">Instagram</li>
              <li className="hover:text-[var(--text)] transition">WhatsApp</li>
              <li className="hover:text-[var(--text)] transition">Email</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-[var(--footer-border)] pt-6 text-center text-xs text-[var(--muted)]">
          <p>© 2025 NIVAH. All rights reserved.</p>
          <p className="mt-1">
            NIVAH offers fashion ornaments designed for style and comfort.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold tracking-widest text-[var(--accent)]">
        {title.toUpperCase()}
      </h3>
      <ul className="space-y-2 text-sm text-[var(--muted)]">
        {links.map((link) => (
          <li
            key={link}
            className="transition hover:text-[var(--text)] cursor-pointer"
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  );
}
