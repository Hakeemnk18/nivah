import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { DashboardMotivationSummary } from "../types/admin.type";

type Props = {
  data: DashboardMotivationSummary;
};

const DashboardMotivationCard = ({ data }: Props) => {
  return (
    <motion.div
      // Card Entrance Animation
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl p-6 h-full flex flex-col justify-between
                 bg-gradient-to-br from-[#271e45] to-[#3b2563] 
                 border border-purple-500/20
                 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 
                 transition-shadow duration-300"
    >
      {/* Decorative Floating Big Icon */}
      <motion.div
        className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 pointer-events-none"
        // Floating Trophy Animation
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          y: [0, -8, 0] // Moves up 8px and back down
        }}
        transition={{ 
          scale: { duration: 0.5, ease: "easeOut" },
          y: { repeat: Infinity, duration: 3, ease: "easeInOut" } 
        }}
      >
        <img
          src="/images/success-icon.png"
          alt="reward"
          className="w-28 sm:w-28 md:w-36 lg:w-40 h-auto drop-shadow-2xl"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white">
          {data.title}
        </h3>
        <p className="text-sm text-gray-300 mt-1 max-w-[70%]">
          {data.subtitle}
        </p>
      </div>

      <div className="relative z-10 mt-6">
        <p className="text-4xl font-bold text-white tracking-tight">
          {data.metric.formatted}
        </p>

        {data.target && (
          <p className="text-sm text-gray-300 mt-2">
            <span className="text-pink-400 font-semibold">
              {data.target.progressPercentage}%
            </span>{" "}
            of target achieved
          </p>
        )}
      </div>

      {data.cta && (
        <div className="relative z-10 mt-6">
          <Link
            to={data.cta.path}
            className="inline-block px-6 py-2.5 rounded-full text-sm font-medium
                       bg-gradient-to-r from-pink-500 to-purple-500
                       hover:from-pink-400 hover:to-purple-400
                       text-white shadow-md hover:shadow-lg hover:shadow-pink-500/25
                       transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {data.cta.label}
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardMotivationCard;