import { motion } from "framer-motion";
const Shimmer = () => {
    return (
        <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--bg)]/60 to-transparent"
        />
    );
}

export default Shimmer;