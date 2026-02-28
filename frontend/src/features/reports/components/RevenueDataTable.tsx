// src/features/reports/components/RevenueDataTable.tsx
import type { DailyRevenueData } from "../types/reports.type";

type Props = {
  dailyData: DailyRevenueData[];
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const RevenueDataTable = ({ dailyData }: Props) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#1f223f] to-[#2a2d55] border border-white/10 shadow-md flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">Daily Breakdown</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-sm text-gray-300">
              <th className="p-4 font-medium pl-6">Date</th>
              <th className="p-4 font-medium text-center">Orders</th>
              <th className="p-4 font-medium text-right pr-6">Revenue</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dailyData.length > 0 ? (
              dailyData.map((row, idx) => (
                <tr 
                  key={row.date} 
                  className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${idx === dailyData.length - 1 ? 'border-b-0' : ''}`}
                >
                  <td className="p-4 pl-6 text-gray-200 whitespace-nowrap">
                    {formatDate(row.date)}
                  </td>
                  <td className="p-4 text-center text-gray-300">
                    {row.orders}
                  </td>
                  <td className="p-4 pr-6 text-right font-medium text-emerald-400 whitespace-nowrap">
                    {formatCurrency(row.revenue)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-400">
                  No revenue data found for this period.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueDataTable;