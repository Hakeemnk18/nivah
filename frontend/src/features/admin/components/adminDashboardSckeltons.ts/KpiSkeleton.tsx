import { motion } from "framer-motion";

const shimmer = {
  animate: { opacity: [0.4, 1, 0.4] },
  transition: {
    duration: 1,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
};

const KpiSkeleton = () => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5 sm:p-6
                 bg-gradient-to-br from-[#1f223f] to-[#2a2d55]
                 border border-white/10 shadow-md
                 flex flex-col justify-between min-h-[180px]"
    >
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {/* Icon Placeholder */}
          <motion.div
            {...shimmer}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2c2e4a]"
          />
          {/* Label Placeholder */}
          <motion.div {...shimmer} className="h-4 w-20 bg-[#2c2e4a] rounded-md" />
        </div>

        {/* Trend Placeholder */}
        <motion.div {...shimmer} className="h-4 w-12 bg-white/5 rounded-md" />
      </div>

      {/* Value Placeholder */}
      <motion.div {...shimmer} className="h-8 w-24 bg-[#2c2e4a] rounded-lg mt-6" />

      {/* Sparkline / Button Placeholder */}
      <div className="mt-4">
        <motion.div {...shimmer} className="h-10 sm:h-12 w-full bg-white/5 rounded-xl" />
      </div>
    </div>
  );
};

export default KpiSkeleton;