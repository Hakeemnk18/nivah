

import { motion } from "framer-motion";
import Shimmer from "../../../shared/components/sckelton/Shimmer";

export function ProductDetailSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* LEFT COLUMN */}
            <div className="space-y-4 sm:space-y-6">

                {/* Big Image */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative aspect-square w-full rounded-2xl overflow-hidden border border-[var(--muted)] bg-[var(--muted)]/30"
                >
                    <Shimmer />
                </motion.div>

                {/* Thumbnails */}
                <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6 overflow-x-auto pb-2">
                    {[1, 2, 3].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="
                flex-shrink-0
                w-16 h-16
                sm:w-20 sm:h-20
                rounded-lg
                relative overflow-hidden
                border border-[var(--muted)]
                bg-[var(--muted)]/30
              "
                        >
                            <Shimmer />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col lg:sticky lg:top-24 self-start space-y-6 sm:space-y-8">

                {/* Title */}
                <motion.div className="h-8 sm:h-10 w-4/5 sm:w-3/4 rounded-md relative overflow-hidden bg-[var(--muted)]/40">
                    <Shimmer />
                </motion.div>

                {/* Price */}
                <motion.div className="h-6 sm:h-8 w-24 sm:w-32 rounded-md relative overflow-hidden bg-[var(--muted)]/40">
                    <Shimmer />
                </motion.div>

                {/* Divider */}
                <div className="h-[1px] bg-[var(--muted)] w-20 sm:w-24" />

                {/* Description */}
                <div className="space-y-2 sm:space-y-3">
                    <SkeletonLine />
                    <SkeletonLine />
                    <SkeletonLine width="w-2/3" />
                </div>

                {/* Size Selector */}
                <div className="space-y-3 pt-4 sm:pt-6">
                    <div className="h-5 sm:h-6 w-20 sm:w-24 rounded relative overflow-hidden bg-[var(--muted)]/40">
                        <Shimmer />
                    </div>

                    <div className="flex gap-2 sm:gap-3 flex-wrap">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div
                                key={i}
                                className="
                  h-9 w-12
                  sm:h-10 sm:w-14
                  rounded-lg
                  relative overflow-hidden
                  bg-[var(--muted)]/40
                "
                            >
                                <Shimmer />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stock */}
                <div className="h-4 sm:h-5 w-24 sm:w-28 rounded relative overflow-hidden bg-[var(--muted)]/40">
                    <Shimmer />
                </div>

                {/* Quantity */}
                <div className="h-10 sm:h-12 w-32 sm:w-40 rounded-lg relative overflow-hidden bg-[var(--muted)]/40">
                    <Shimmer />
                </div>

                {/* Buy Button */}
                <div className="h-12 sm:h-14 w-full rounded-xl relative overflow-hidden bg-[var(--muted)]/50">
                    <Shimmer />
                </div>
            </div>
        </div>
    );
}

function SkeletonLine({ width = "w-full" }: { width?: string }) {
    return (
        <div className={`h-4 ${width} rounded relative overflow-hidden bg-[var(--muted)]/40`}>
            <Shimmer />
        </div>
    );
}

