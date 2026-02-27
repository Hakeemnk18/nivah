import { Link } from "react-router-dom";
import type { DashboardKpiCardType } from "../types/admin.type";
import { TrendingUp, TrendingDown, ShoppingCart, ArrowRight } from "lucide-react";

type Props = {
  data: DashboardKpiCardType;
};

const DashboardKpiCard = ({ data }: Props) => {
  const isUp = data.trend?.direction === "up";

  const generateSparklinePath = (points: number[]) => {
    if (!points || points.length === 0) return "";

    const max = Math.max(...points);
    const min = Math.min(...points);
    
    const width = 120;
    const height = 40;
    const strokeWidth = 2;
    const padding = strokeWidth; 
    const usableHeight = height - padding * 2;

    const normalized = points.map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = padding + usableHeight - ((p - min) / (max - min || 1)) * usableHeight;
      return `${x},${y}`;
    });

    return "M" + normalized.join(" L");
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5 sm:p-6
                 bg-gradient-to-br from-[#1f223f] to-[#2a2d55]
                 border border-white/10
                 shadow-md hover:shadow-xl
                 transition-all duration-300
                 flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12
                       rounded-full
                       bg-blue-500/15
                       flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
          </div>

          <span className="text-sm text-gray-100">{data.label}</span>
        </div>

        {data.trend && (
          <div
            className={`flex items-center gap-1 text-xs sm:text-sm font-medium
              ${isUp ? "text-green-400" : "text-red-400"}`}
          >
            {isUp ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {data.trend.percentageChange}%
          </div>
        )}
      </div>

      <p className="text-2xl sm:text-3xl font-semibold mt-6 tracking-tight">
        {data.formattedValue}
      </p>

      {/* 👇 Conditionally render Sparkline OR an Action Button */}
      {data.sparkline ? (
        <div className="mt-4">
          <svg
            viewBox="0 0 120 40"
            className="w-full h-10 sm:h-12"
            fill="none"
          >
            <path
              d={generateSparklinePath(data.sparkline)}
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : data.action ? (
        <div className="mt-4 h-10 sm:h-12 flex items-end">
          {/* Note: If you are using Next.js or React Router, change this <a> to a <Link> */}
          <Link
            to={data.action.href}
            className="w-full py-2 px-4 rounded-xl
                       bg-blue-500/10 border border-blue-500/20
                       text-blue-400 text-xs sm:text-sm font-medium 
                       flex items-center justify-center gap-2 
                       hover:bg-blue-500/20 hover:text-blue-300
                       transition-all duration-200"
          >
            {data.action.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default DashboardKpiCard;