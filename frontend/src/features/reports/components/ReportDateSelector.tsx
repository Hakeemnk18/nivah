// src/features/reports/components/ReportDateSelector.tsx
import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, Check } from "lucide-react";
import type {
  ReportDateRangeOption,
  RevenueFilterState,
} from "../types/reports.type";

type Props = {
  setEnabled: (enabled: boolean) => void; // Control when the query should run
  filter: RevenueFilterState;
  setFilter: (newFilter: RevenueFilterState) => void;
};

const options: { value: ReportDateRangeOption; label: string }[] = [
  { value: "daily", label: "Today" },
  { value: "this_week", label: "This Week" },
  { value: "this_month", label: "This Month" },
  { value: "last_6_months", label: "Last 6 Months" },
  { value: "this_year", label: "This Year" },
  { value: "all_time", label: "All Time" },
  { value: "custom", label: "Custom Range" },
];

const ReportDateSelector = ({ filter, setFilter, setEnabled }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(""); // 👈 Local error state for validation
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionSelect = (optValue: ReportDateRangeOption) => {
    const newFilter = { ...filter, option: optValue };
    setFilter(newFilter);
    setIsOpen(false);
    setError("");
    if (optValue !== "custom") {
      setEnabled(true); // allow auto fetch
    } else {
      setEnabled(false); // block until apply
    }
  };

  const handleCustomApply = () => {
    // 🛡️ Validation: Check if both dates exist
    if (!filter.customStartDate || !filter.customEndDate) {
      setError("Please select both start and end dates.");
      return;
    }

    const start = new Date(filter.customStartDate);
    const end = new Date(filter.customEndDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError("Invalid date format.");
      return;
    }

    if (start.getTime() > end.getTime()) {
      setError("Start date cannot be greater than end date.");
      return;
    }

    // Clear error and trigger API
    setError("");
    setEnabled(true);
  };

  const selectedLabel =
    options.find((opt) => opt.value === filter.option)?.label || "Select Range";

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
      {/* Dropdown Container */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-between gap-3 px-4 py-2.5 
                     bg-[#15172b] hover:bg-[#1a1c35]
                     border border-white/10 rounded-xl 
                     transition-all duration-200 min-w-[150px] h-[42px]"
        >
          <div className="flex items-center gap-2 text-sm text-gray-200">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{selectedLabel}</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div
            className="absolute left-0 mt-2 w-full min-w-[160px]
                       bg-[#262a52] border border-white/10
                       rounded-xl shadow-xl overflow-hidden z-50
                       animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleOptionSelect(opt.value)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                  ${
                    filter.option === opt.value
                      ? "bg-blue-500/10 text-blue-400 font-medium"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Conditionally render Custom Date Inputs */}
      {filter.option === "custom" && (
        <div className="flex flex-col  gap-1 animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="date"
                value={filter.customStartDate || ""}
                onChange={(e) => {
                  setFilter({ ...filter, customStartDate: e.target.value });
                  setError(""); // Clear error when user starts typing/selecting
                }}
                // 👇 Red border if there is an error
                className={`bg-[#15172b] text-gray-300 text-sm rounded-xl px-3 py-2 h-[42px] focus:outline-none transition-colors [color-scheme:dark] border 
                ${error && !filter.customStartDate ? "border-red-500 ring-1 ring-red-500/50" : "border-white/10 focus:border-blue-500"}`}
              />
              <span className="text-gray-500 text-sm">to</span>
              <input
                type="date"
                value={filter.customEndDate || ""}
                onChange={(e) => {
                  setFilter({ ...filter, customEndDate: e.target.value });
                  setError(""); // Clear error
                }}
                // 👇 Red border if there is an error
                className={`flex-1 min-w-[130px] bg-[#15172b] text-gray-300 text-sm rounded-xl px-3 py-2 h-[42px] focus:outline-none transition-colors [color-scheme:dark] border 
                ${error && !filter.customEndDate ? "border-red-500 ring-1 ring-red-500/50" : "border-white/10 focus:border-blue-500"}`}
              />
            </div>

            {/* Apply Button */}
            <button
              onClick={handleCustomApply}
              className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 p-2.5 rounded-xl transition-colors h-[42px] flex items-center justify-center shrink-0 w-full sm:w-[42px] mt-1 sm:mt-0"
              title="Apply Dates"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>

          {/* Validation Error Message under the inputs */}
          {error && (
            <span className="text-red-400 text-xs pl-1 animate-in fade-in slide-in-from-top-1">
              {error}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportDateSelector;
