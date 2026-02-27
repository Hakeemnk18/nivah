import { motion } from "framer-motion";

const shimmer = {
  animate: { opacity: [0.4, 1, 0.4] },
  transition: {
    duration: 1,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
};

const RankingListSkeleton = () => {
  return (
    <div
      className="relative rounded-2xl p-5 sm:p-6
                 bg-gradient-to-br from-[#1f223f] to-[#2a2d55]
                 border border-white/10 shadow-md
                 flex flex-col h-full min-h-[440px]"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2">
        <motion.div {...shimmer} className="h-5 w-40 bg-[#2c2e4a] rounded-md" />
        <motion.div {...shimmer} className="h-3 w-20 bg-emerald-400/20 rounded-md" />
      </div>

      {/* List Container */}
      <div className="flex flex-col gap-5 flex-1 mt-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between">
            {/* Left: Icon & Details */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1">
              {/* Circular Avatar */}
              <motion.div
                {...shimmer}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2c2e4a] shrink-0"
              />
              {/* Text Lines */}
              <div className="flex flex-col gap-2 flex-1">
                <motion.div {...shimmer} className="h-4 w-3/4 bg-[#2c2e4a] rounded" />
                <motion.div {...shimmer} className="h-3 w-1/2 bg-white/5 rounded" />
              </div>
            </div>

            {/* Right: Revenue */}
            <div className="shrink-0">
              <motion.div {...shimmer} className="h-4 w-16 bg-[#2c2e4a] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingListSkeleton;