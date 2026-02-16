import SkeletonBox from "../../../shared/components/sckelton/SckeltonBox";
import SkeletonLine from "../../../shared/components/sckelton/SckeltonLine";


const CheckoutSkeleton = () => {
    return (
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* LEFT — FORM SKELETON */}
            <div className="bg-[var(--card)] border border-[var(--footer-border)] rounded-2xl p-6 md:p-8 space-y-8">

                {/* Billing */}
                <div className="space-y-4">
                    <SkeletonLine width="w-40" height="h-5" />

                    <div className="space-y-3">
                        <SkeletonBox className="h-10 rounded-lg" />
                        <SkeletonBox className="h-10 rounded-lg" />
                        <SkeletonBox className="h-10 rounded-lg" />
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                    <SkeletonLine width="w-44" height="h-5" />

                    <div className="space-y-3">
                        <SkeletonBox className="h-10 rounded-lg" />
                        <SkeletonBox className="h-10 rounded-lg" />
                        <SkeletonBox className="h-10 rounded-lg" />
                        <SkeletonBox className="h-10 rounded-lg" />
                    </div>
                </div>

                {/* Payment block */}
                <div className="rounded-xl border border-[var(--footer-border)] bg-[var(--bg-secondary)] p-4 space-y-3">
                    <SkeletonLine width="w-36" />
                    <SkeletonLine width="w-64" height="h-3" />
                    <SkeletonLine width="w-24" height="h-3" />
                </div>
            </div>

            {/* RIGHT — SUMMARY SKELETON */}
            <div className="bg-[var(--card)] border border-[var(--footer-border)] rounded-2xl p-5 flex flex-col h-[560px]">
                <SkeletonLine width="w-32" height="h-5" />

                {/* Items list */}
                <div className="flex-1 mt-4 space-y-3 overflow-hidden">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 rounded-xl bg-[var(--bg-secondary)] p-2"
                        >
                            <SkeletonBox className="w-14 h-14 rounded-lg" />

                            <div className="flex-1 space-y-2">
                                <SkeletonLine width="w-28" />
                                <SkeletonLine width="w-20" height="h-3" />
                            </div>

                            <SkeletonLine width="w-12" />
                        </div>
                    ))}
                </div>

                {/* Totals */}
                <div className="pt-4 border-t border-[var(--footer-border)] space-y-3 mt-4">
                    <SkeletonLine width="w-full" />
                    <SkeletonLine width="w-full" />
                    <SkeletonLine width="w-full" height="h-5" />

                    <SkeletonBox className="h-11 rounded-xl mt-2" />

                    <SkeletonLine width="w-32 mx-auto" height="h-3" />
                </div>
            </div>
        </div>
    );
};

export default CheckoutSkeleton;
