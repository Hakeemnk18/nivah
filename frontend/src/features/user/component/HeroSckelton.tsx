import SkeletonBox from "../../../shared/components/sckelton/SckeltonBox";
import SkeletonLine from "../../../shared/components/sckelton/SckeltonLine";

export default function HeroSkeleton() {
    return (
        <section className="relative w-full h-[55vh] sm:h-[60vh] md:h-[80vh] overflow-hidden">

            {/* background image skeleton */}
            <SkeletonBox className="absolute inset-0 w-full h-full" />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* content */}
            <div className="relative z-10 mx-auto max-w-7xl h-full px-5 sm:px-6 flex items-end pb-10 sm:pb-14 md:pb-20">
                <div className="w-full max-w-xl space-y-3 sm:space-y-4">

                    {/* title skeleton */}
                    <SkeletonLine
                        height="h-8 sm:h-9 md:h-10"
                        width="w-[70%] sm:w-[60%] md:w-[55%]"
                    />

                    <SkeletonLine
                        height="h-8 sm:h-9 md:h-10"
                        width="w-[55%] sm:w-[45%] md:w-[40%]"
                    />

                    {/* subtitle skeleton */}
                    <SkeletonLine
                        height="h-3 sm:h-4"
                        width="w-[80%] sm:w-[70%] md:w-[65%]"
                    />

                    {/* button skeleton */}
                    <SkeletonBox className="h-8 sm:h-9 w-28 sm:w-32 md:w-36 rounded-sm mt-2" />

                </div>
            </div>
        </section>
    );
}