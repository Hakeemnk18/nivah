import { motion } from "framer-motion";
import SkeletonBox from "../../../shared/components/sckelton/SckeltonBox";
import SkeletonLine from "../../../shared/components/sckelton/SckeltonLine";


const CartItemSkeleton = () => {
    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-[var(--card)] border border-[var(--bg-secondary)] p-4 sm:p-5"
        >
            <div className="flex gap-4">
                {/* Image */}
                <SkeletonBox className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl shrink-0" />

                {/* Content */}
                <div className="flex-1 space-y-3">
                    <SkeletonLine width="w-2/3" height="h-5" />
                    <SkeletonLine width="w-1/3" height="h-4" />
                    <SkeletonLine width="w-24" height="h-5" />

                    {/* Controls */}
                    <div className="flex items-center justify-between pt-2">
                        <SkeletonBox className="h-9 w-28 rounded-xl" />
                        <SkeletonLine width="w-16" height="h-4" />
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

export default CartItemSkeleton;
