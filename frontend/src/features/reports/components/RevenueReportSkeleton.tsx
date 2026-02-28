// src/features/reports/components/RevenueReportSkeleton.tsx
import { motion } from "framer-motion";

const shimmer = {
  animate: { opacity: [0.4, 1, 0.4] },
  transition: { duration: 1, repeat: Infinity, repeatType: "reverse" as const },
};

const RevenueReportSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* 3 Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl p-6 bg-gradient-to-br from-[#1f223f] to-[#2a2d55] border border-white/10 shadow-md h-32"
          >
            <motion.div {...shimmer} className="h-4 w-24 bg-[#2c2e4a] rounded mb-4" />
            <motion.div {...shimmer} className="h-8 w-32 bg-[#2c2e4a] rounded" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="rounded-2xl p-6 bg-gradient-to-br from-[#1f223f] to-[#2a2d55] border border-white/10 shadow-md h-96 flex flex-col gap-4">
        <motion.div {...shimmer} className="h-6 w-48 bg-[#2c2e4a] rounded mb-2" />
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div key={i} {...shimmer} className="h-10 w-full bg-[#2c2e4a]/50 rounded" />
        ))}
      </div>
    </div>
  );
};

export default RevenueReportSkeleton;