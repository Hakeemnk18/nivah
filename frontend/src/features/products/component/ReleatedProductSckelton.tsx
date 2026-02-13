import { motion } from "framer-motion";


export function RelatedProductsSkeleton() {
    return (
        <section className="mt-20">
            <div className="max-w-7xl mx-auto px-4">

                {/* Title Skeleton */}
                <div className="flex justify-center mb-12">
                    <div className="h-8 w-48 rounded-md bg-[var(--muted)]/40 relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* Grid Skeleton */}
                <div
                    className="
            grid
            gap-8
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
          "
                >
                    {[1, 2, 3, 4].map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
function ProductCardSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
        >
            {/* Image */}
            <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-[var(--muted)] bg-[var(--muted)]/30">
                <Shimmer />
            </div>

            {/* Title */}
            <div className="h-4 w-3/4 rounded bg-[var(--muted)]/40 relative overflow-hidden">
                <Shimmer />
            </div>

            {/* Price */}
            <div className="h-4 w-1/3 rounded bg-[var(--muted)]/40 relative overflow-hidden">
                <Shimmer />
            </div>
        </motion.div>
    );
}

function Shimmer() {
    return (
        <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--bg)]/60 to-transparent"
        />
    );
}
