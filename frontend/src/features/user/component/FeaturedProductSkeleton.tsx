import { motion } from "framer-motion";

export default function FeaturedProductSkeleton() {
    return (
        <div className="flex flex-col items-center w-full">
            {/* WRAPPER to match the max-width of real product */}
            <motion.div
                className="w-full max-w-[220px]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* IMAGE PLACEHOLDER */}
                {/* Matches rounded-xl and h-[220px] */}
                <div className="h-[220px] w-full rounded-xl bg-white/10 " />

                {/* TEXT CONTAINER */}
                <div className="mt-4 flex flex-col items-center gap-2">

                    <div className="h-4 w-3/4 rounded bg-white/10" />


                    <div className="h-4 w-1/2 rounded bg-white/10" />
                </div>
            </motion.div>
        </div>
    );
}