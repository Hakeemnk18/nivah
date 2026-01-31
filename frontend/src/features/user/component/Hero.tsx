import { motion } from "framer-motion";

export default function Hero() {
  return (
     <section className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden">
      <img
        src="/images/hero-ring.png"
        alt="Elegant gold ring"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto max-w-7xl h-full px-6 flex items-center">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-serif leading-tight text-white">
            <span className="gold-shimmer">
              Timeless Elegance
            </span>{" "}
            in <br /> Every Ornament
          </h1>

          <p className="mt-4 text-sm md:text-base text-[#9ca3af]">
            Crafted to shine for every moment.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 inline-block border border-[var(--accent)] px-6 py-2 text-sm tracking-wide text-white hover:bg-[var(--accent)] hover:text-black transition"
          >
            Shop Collection
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}