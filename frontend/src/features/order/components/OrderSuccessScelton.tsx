import SkeletonBox from "../../../shared/components/sckelton/SckeltonBox";
import SkeletonLine from "../../../shared/components/sckelton/SckeltonLine";


const OrderSuccessSkeleton = () => {
    return (
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">

            {/* LEFT SIDE */}
            <div className="space-y-6">

                {/* Items Card Skeleton */}
                <div className="bg-[var(--card)] border border-[var(--bg-secondary)] rounded-2xl p-5 space-y-4">
                    <SkeletonLine width="w-40" height="h-6" />

                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div
                                key={i}
                                className="flex justify-between border-b border-[var(--bg-secondary)] pb-4"
                            >
                                <div className="space-y-2 w-2/3">
                                    <SkeletonLine width="w-3/4" />
                                    <SkeletonLine width="w-1/2" height="h-3" />
                                    <SkeletonLine width="w-1/3" height="h-3" />
                                </div>

                                <SkeletonLine width="w-16" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Address Card Skeleton */}
                <div className="bg-[var(--card)] border border-[var(--bg-secondary)] rounded-2xl p-5 space-y-3">
                    <SkeletonLine width="w-40" height="h-6" />
                    <SkeletonLine width="w-1/2" />
                    <SkeletonLine width="w-2/3" />
                    <SkeletonLine width="w-3/4" />
                    <SkeletonLine width="w-1/3" />
                </div>
            </div>

            {/* RIGHT SIDE (Summary) */}
            <div className="bg-[var(--card)] border border-[var(--bg-secondary)] rounded-2xl p-5 space-y-4 h-fit lg:sticky lg:top-6">
                <SkeletonLine width="w-40" height="h-6" />
                <SkeletonLine width="w-32" height="h-4" />

                <div className="space-y-3 pt-3 border-t border-[var(--bg-secondary)]">
                    <SkeletonLine />
                    <SkeletonLine />
                    <SkeletonLine height="h-5" />
                </div>

                <SkeletonBox className="h-12 rounded-xl mt-4" />
            </div>

        </div>
    );
};

export default OrderSuccessSkeleton;