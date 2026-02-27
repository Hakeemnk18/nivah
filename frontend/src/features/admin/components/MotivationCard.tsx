import type { DashboardMotivationSummary } from "../types/admin.type";


type Props = {
  data: DashboardMotivationSummary;
};

const DashboardMotivationCard = ({ data }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 h-full flex flex-col justify-between
                    bg-gradient-to-br from-[#1e1f3f] to-[#2a2c5a]
                    border border-white/10
                    shadow-lg hover:shadow-xl transition-all duration-300">

      {/* Decorative Big Icon */}
      <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4  pointer-events-none">
  <img
    src="/images/success-icon.png"
    alt="reward"
    className="w-28 sm:w-28 md:w-36 lg:w-40 h-auto"
  />
</div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white">
          {data.title}
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          {data.subtitle}
        </p>
      </div>

      <div className="relative z-10 mt-6">
        <p className="text-4xl font-bold text-white tracking-tight">
          {data.metric.formatted}
        </p>

        {data.target && (
          <p className="text-sm text-gray-400 mt-2">
            <span className="text-indigo-400 font-medium">
              {data.target.progressPercentage}%
            </span>{" "}
            of target achieved
          </p>
        )}
      </div>

      {data.cta && (
        <div className="relative z-10 mt-6">
          <button
            className="px-5 py-2.5 rounded-full text-sm font-medium
                       bg-gradient-to-r from-pink-500 to-purple-500
                       hover:from-pink-600 hover:to-purple-600
                       text-white shadow-md hover:shadow-lg
                       transition-all duration-300"
          >
            {data.cta.label}
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardMotivationCard;