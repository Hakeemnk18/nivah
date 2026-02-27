import { motion } from "framer-motion";

const shimmer = {
  animate: { opacity: [0.4, 1, 0.4] },
  transition: {
    duration: 1,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
};

const MotivationSkeleton = () => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 h-full flex flex-col justify-between
                 bg-gradient-to-br from-[#1e1f3f] to-[#2a2c5a]
                 border border-white/10
                 shadow-lg min-h-[250px]"
    >
      {/* Decorative Big Icon Placeholder */}
      <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 pointer-events-none">
        <motion.div
          {...shimmer}
          className="w-28 h-28 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-white/5 rounded-full"
        />
      </div>

      {/* Header Content */}
      <div className="relative z-10 space-y-3">
        <motion.div {...shimmer} className="h-6 w-48 bg-[#2c2e4a] rounded-md" />
        <motion.div {...shimmer} className="h-4 w-64 bg-[#232447] rounded-md" />
      </div>

      {/* Big Metric Content */}
      <div className="relative z-10 mt-6 space-y-4">
        <motion.div {...shimmer} className="h-10 w-32 bg-[#2c2e4a] rounded-lg" />
        <motion.div {...shimmer} className="h-4 w-40 bg-[#232447] rounded-md" />
      </div>

      {/* Button Placeholder */}
      <div className="relative z-10 mt-6">
        <motion.div {...shimmer} className="h-10 w-32 bg-white/10 rounded-full" />
      </div>
    </div>
  );
};

export default MotivationSkeleton;