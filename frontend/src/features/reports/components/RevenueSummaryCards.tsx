// src/features/reports/components/RevenueSummaryCards.tsx
import type { RevenueSummary } from "../types/reports.type";
import { IndianRupee, ShoppingBag, Receipt } from "lucide-react";

type Props = {
  summary: RevenueSummary;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const RevenueSummaryCards = ({ summary }: Props) => {
  const cards = [
    {
      label: "Total Revenue",
      value: formatCurrency(summary.totalRevenue),
      icon: <IndianRupee className="w-6 h-6 text-green-400" />,
      bg: "bg-green-500/15",
    },
    {
      label: "Total Orders",
      value: summary.totalOrders.toLocaleString("en-IN"),
      icon: <ShoppingBag className="w-6 h-6 text-blue-400" />,
      bg: "bg-blue-500/15",
    },
    {
      label: "Average Order Value",
      value: formatCurrency(summary.averageOrderValue),
      icon: <Receipt className="w-6 h-6 text-purple-400" />,
      bg: "bg-purple-500/15",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-2xl p-6
                     bg-gradient-to-br from-[#1f223f] to-[#2a2d55]
                     border border-white/10 shadow-md hover:shadow-xl
                     transition-all duration-300 flex items-center gap-5"
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${card.bg}`}>
            {card.icon}
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">{card.label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RevenueSummaryCards;