import { motion } from "framer-motion";

const shimmer = {
  animate: { opacity: [0.4, 1, 0.4] },
  transition: {
    duration: 1,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
};

const RevenueChartSkeleton = () => {
  // Hardcoded varying heights to make the skeleton look like a real chart
  const dummyHeights = ["45%", "65%", "35%", "80%", "55%", "90%", "20%", "75%", "60%", "85%"];

  return (
    <div
      className="relative rounded-2xl p-5 sm:p-6
                 bg-gradient-to-br from-[#1f223f] to-[#2a2d55]
                 border border-white/10 shadow-md
                 min-h-[260px] sm:min-h-[300px]
                 flex flex-col h-full"
    >
      {/* Header + Dropdown Placeholder */}
      <div className="flex items-center justify-between mb-6">
        <motion.div {...shimmer} className="h-5 w-32 bg-[#2c2e4a] rounded-md" />
        <motion.div {...shimmer} className="h-8 w-20 bg-white/5 rounded-xl" />
      </div>

      <div className="flex flex-col flex-1 w-full mt-4">
        
        {/* Top Area: Y-Axis + Grid Lines + Bars */}
        <div className="relative flex flex-1 w-full pl-8 sm:pl-12">
          
          {/* Y-Axis Labels Placeholder */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-10 flex flex-col justify-between items-end pr-2 z-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                {...shimmer}
                className="h-2 w-6 bg-[#2c2e4a] rounded translate-y-[-50%]"
              />
            ))}
          </div>

          {/* Background Grid Lines */}
          <div className="absolute left-8 sm:left-12 right-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none z-0">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-full border-t border-white/5" />
            ))}
          </div>

          {/* Bars Container Placeholder */}
          <div className="flex flex-1 justify-center gap-2 sm:gap-5 w-full z-10 pt-0">
            {dummyHeights.map((height, index) => (
              <div
                key={index}
                className={`relative w-full flex-1 flex items-end max-w-[2.5rem] min-w-0 ${
                  index >= 7 ? "hidden sm:flex" : ""
                }`}
              >
                <motion.div
                  {...shimmer}
                  className="w-full rounded-t-xl bg-[#2c2e4a]"
                  style={{ height }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Area: X-Axis Labels Placeholder */}
        <div className="flex justify-center gap-2 sm:gap-5 w-full pl-8 sm:pl-12 mt-4 z-10">
          {dummyHeights.map((_, index) => (
            <div
              key={index}
              className={`flex-1 max-w-[2.5rem] min-w-0 ${
                index >= 7 ? "hidden sm:flex" : "flex"
              } justify-center`}
            >
              <motion.div {...shimmer} className="h-2 w-full max-w-[20px] bg-[#2c2e4a] rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueChartSkeleton;