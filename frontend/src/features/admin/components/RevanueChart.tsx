import type { RevenueChartData } from "../types/admin.type";
import { useEffect, useMemo, useState } from "react";

type Props = {
  data: RevenueChartData;
  onRangeChange?: (range: string) => void;
};

const ranges = ["Year", "Month", "Week", "Daily"];

// 👇 Added: Helper to format Y-axis values cleanly (e.g., 240k, 1.5M)
const formatYAxis = (value: number) => {
  if (value === 0) return "0";
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
  return value.toString();
};

const RevenueChartCard = ({ data, onRangeChange }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Limit to max 10 bars */
  const chartData = useMemo(() => {
    return data.series.data.slice(0, 10);
  }, [data]);

  const categories = useMemo(() => {
    return data.categories.slice(0, 10);
  }, [data]);

  const hasData =
    chartData.length > 0 &&
    chartData.some((value) => typeof value === "number" && value > 0);

  const max = hasData ? Math.max(...chartData) : 0;

  // 👇 Added: Generate 5 standard Y-axis ticks (100%, 75%, 50%, 25%, 0%)
  const yAxisTicks = useMemo(() => {
    return [1, 0.75, 0.5, 0.25, 0].map((percent) => max * percent);
  }, [max]);

  return (
    <div
      className="relative rounded-2xl p-5 sm:p-6
                 bg-gradient-to-br from-[#1f223f] to-[#2a2d55]
                 border border-white/10
                 shadow-md
                 min-h-[260px] sm:min-h-[300px]
                 flex flex-col h-full"
    >
      {/* Header + Dropdown */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-gray-300">
          Revenue ({data.range})
        </h3>

        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="px-4 py-2 text-xs sm:text-sm
                       bg-white/5 hover:bg-white/10
                       border border-white/10
                       rounded-xl
                       text-gray-300
                       backdrop-blur-md
                       transition-all duration-200"
          >
            {data.range}
          </button>

          {open && (
            <div
              className="absolute right-0 mt-2 w-32
                         bg-[#262a52]
                         border border-white/10
                         rounded-xl
                         shadow-xl
                         overflow-hidden
                         z-20"
            >
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    onRangeChange?.(r);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2
                             text-xs sm:text-sm
                             text-gray-300
                             hover:bg-white/10
                             transition"
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* No Data State */}
      {!hasData ? (
        <div className="flex flex-1 items-center justify-center">
          <span className="text-sm text-gray-400 font-medium">
            No revenue data available
          </span>
        </div>
      ) : (
        <div className="flex flex-col flex-1 w-full mt-4">
          
          {/* 👇 Top Area: Y-Axis + Grid Lines + Bars */}
          <div className="relative flex flex-1 w-full pl-8 sm:pl-12">
            
            {/* 1. Y-Axis Labels */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-10 flex flex-col justify-between items-end pr-2 z-10">
              {yAxisTicks.map((tick, i) => (
                <span
                  key={i}
                  // translate-y-[-50%] perfectly vertically centers the text on the grid line
                  className="text-[9px] sm:text-[11px] text-gray-400 font-medium translate-y-[-50%]"
                >
                  {formatYAxis(tick)}
                </span>
              ))}
            </div>

            {/* 2. Background Grid Lines */}
            <div className="absolute left-8 sm:left-12 right-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none z-0">
              {yAxisTicks.map((_, i) => (
                <div key={i} className="w-full border-t border-white/5" />
              ))}
            </div>

            {/* 3. Bars Container */}
            <div className="flex flex-1 justify-center gap-2 sm:gap-5 w-full z-10 pt-0">
              {chartData.map((value, index) => {
                const heightPercent = max > 0 ? (value / max) * 100 : 0;
                return (
                  <div
                    key={index}
                    className={`relative w-full flex-1 flex items-end max-w-[2.5rem] min-w-0 ${
                      index >= 7 ? "hidden sm:flex" : ""
                    }`}
                  >
                    <div
                      className="w-full rounded-t-xl
                                 bg-gradient-to-t from-orange-500 to-yellow-400
                                 shadow-lg transition-all duration-700 ease-out"
                      style={{
                        height: mounted ? `${heightPercent}%` : "0%",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 👇 Bottom Area: X-Axis Labels (Separated to preserve perfect grid alignment above) */}
          <div className="flex justify-center gap-2 sm:gap-5 w-full pl-8 sm:pl-12 mt-4 z-10">
            {chartData.map((_, index) => (
              <div
                key={index}
                className={`flex-1 max-w-[2.5rem] min-w-0 ${
                  index >= 7 ? "hidden sm:flex" : "flex"
                } justify-center`}
              >
                <span className="text-[8px] sm:text-xs text-gray-400 text-center shrink-0 w-full whitespace-nowrap truncate">
                  {categories[index]}
                </span>
              </div>
            ))}
          </div>
          
        </div>
      )}
    </div>
  );
};

export default RevenueChartCard;