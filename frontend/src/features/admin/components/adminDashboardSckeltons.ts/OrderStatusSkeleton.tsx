import { motion } from "framer-motion";

const shimmer = {
  animate: { opacity: [0.4, 1, 0.4] },
  transition: {
    duration: 1,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
};

const OrderStatusSkeleton = () => {
  return (
    <div
      className="relative rounded-2xl p-5 sm:p-6
                 bg-gradient-to-br from-[#1f223f] to-[#2a2d55]
                 border border-white/10 shadow-md
                 h-full flex flex-col min-h-[400px]"
    >
      {/* Header */}
      <motion.div {...shimmer} className="h-5 w-28 bg-[#2c2e4a] rounded-md mb-4" />

      {/* Donut Chart Placeholder */}
      <div className="flex justify-center flex-1 items-center py-4">
        <div className="relative w-40 h-40 sm:w-44 sm:h-44">
          {/* Creating an empty donut shape using a thick border */}
          <motion.div
            {...shimmer}
            className="w-full h-full rounded-full border-[14px] border-[#2c2e4a] bg-transparent"
          />
          {/* Center Text Placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
            <motion.div {...shimmer} className="h-6 w-12 bg-[#2c2e4a] rounded" />
            <motion.div {...shimmer} className="h-3 w-16 bg-white/5 rounded" />
          </div>
        </div>
      </div>

      {/* List Items Placeholder */}
      <div className="mt-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div {...shimmer} className="w-3 h-3 rounded-full bg-[#2c2e4a] shrink-0" />
              <motion.div {...shimmer} className="h-4 w-24 bg-[#2c2e4a] rounded" />
            </div>
            <motion.div {...shimmer} className="h-4 w-8 bg-white/5 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusSkeleton;