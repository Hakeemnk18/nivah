import type { OrderStatusDistribution } from "../types/admin.type";

type Props = {
  data: OrderStatusDistribution;
};

const COLORS = [
  "#3B82F6", // Blue (Info / Processing)
  "#22C55E", // Green (Success / Delivered)
  "#F59E0B", // Amber (Pending)
  "#8B5CF6", // Purple (Packed / Ready)
  "#06B6D4", // Cyan (Shipped / In transit)
  "#F43F5E", // Red (Cancelled / Failed)
];

const OrderStatusCard = ({ data }: Props) => {
  // Prevent division by zero just in case
  const total = data.totalOrders || 1;

  const radius = 70;
  const stroke = 14;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  let cumulativeLength = 0;

  return (
    <div
      className="relative rounded-2xl p-5 sm:p-6
                    bg-gradient-to-br from-[#1f223f] to-[#2a2d55]
                    border border-white/10
                    shadow-md
                    text-white
                    h-full flex flex-col"
    >
      {/* Header */}
      <h3 className="text-sm font-semibold text-gray-300 mb-4">
        Order Status
      </h3>

      {/* Donut Chart */}
      <div className="flex justify-center">
        <div className="relative w-40 h-40 sm:w-44 sm:h-44">
          <svg height="100%" width="100%" viewBox="0 0 160 160">
            {/* Background Circle */}
            <circle
              stroke="#2c2f4a"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="80"
              cy="80"
            />

            {/* Data Segments */}
            {data.statuses.map((s, index) => {
              const segmentLength = (s.count / total) * circumference;
              
              // Calculate the gap to hide the rest of the circle
              const gapLength = circumference - segmentLength;
              
              // Push this segment forward by the sum of all previous segment lengths
              const offset = -cumulativeLength;

              const circle = (
                <circle
                  key={s.status}
                  stroke={COLORS[index % COLORS.length]}
                  fill="transparent"
                  strokeWidth={stroke}
                  // Dasharray: [length of segment, length of gap]
                  strokeDasharray={`${segmentLength} ${gapLength}`}
                  strokeDashoffset={offset}
                  r={normalizedRadius}
                  cx="80"
                  cy="80"
                  transform="rotate(-90 80 80)"
                  className="transition-all duration-700 ease-in-out"
                />
              );

              // Add current segment length to cumulative for the next iteration
              cumulativeLength += segmentLength;
              return circle;
            })}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-semibold">{data.totalOrders}</p>
            <p className="text-xs text-gray-400">Total Orders</p>
          </div>
        </div>
      </div>

      {/* Status List */}
      <div className="mt-6 max-h-28 overflow-y-auto custom-scroll pr-2 space-y-3">
        {data.statuses.map((s, index) => {
          const percentage = ((s.count / total) * 100).toFixed(0);

          return (
            <div
              key={s.status}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-gray-300 capitalize">{s.status}</span>
              </div>

              <span className="text-gray-400">{percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusCard;