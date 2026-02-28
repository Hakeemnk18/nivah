// src/features/reports/pages/RevenueReportPage.tsx
import { useState } from "react";
import { Download } from "lucide-react";
import AdminErrorState from "../../admin/components/AdminErrorState";
import RevenueReportSkeleton from "../components/RevenueReportSkeleton";
import RevenueSummaryCards from "../components/RevenueSummaryCards";
import RevenueDataTable from "../components/RevenueDataTable";
import type { RevenueFilterState } from "../types/reports.type";
import ReportDateSelector from "../components/ReportDateSelector";
import Pagination from "../../admin/components/table/Pagination";
import { useRevenueReport } from "../hooks/use.revenue.report";

const RevenueReportPage = () => {
  console.log("revenue page mounted")
  const [currentPage, setCurrentPage] = useState(1);


  // Local State
  const [filter, setFilter] = useState<RevenueFilterState>({
    option: "this_week",
    customStartDate: null,
    customEndDate: null,
  });
  const [customApplied, setCustomApplied] = useState(false);
  const enabled =
    filter.option !== "custom" ||
    (filter.option === "custom" && customApplied);


  // Data Fetching custom hook

  const { data, isLoading, isError } = useRevenueReport(
    currentPage,
    filter,
    enabled,
  );

  // Mimicking API Data
  const reportData = data?.data;

  // Handlers
  const handleDownloadCSV = () => {
    if (!reportData?.dailyData || reportData.dailyData.length === 0) {
      console.warn("No data available to download.");
      return;
    }

    const headers = ["Date", "Revenue", "Orders"];

    // 1. Add "\uFEFF" (Byte Order Mark) to ensure Excel reads UTF-8 characters correctly
    const csvRows = ["\uFEFF" + headers.join(",")];

    for (const row of reportData.dailyData) {
      // 2. Wrap all values in double quotes to prevent commas in data from breaking the columns
      csvRows.push(`"${row.date}","${row.revenue}","${row.orders}"`);
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    // Added a fallback just in case filter.option is undefined
    link.setAttribute("download", `revenue_report_${filter?.option || 'export'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };



  // 3. Render logic
  let content;
  if (isLoading) {
    content = <RevenueReportSkeleton />;
  } else if (isError) {
    content = <AdminErrorState />;
  } else {
    content = (
      <div className="space-y-6">
        <RevenueSummaryCards summary={reportData?.summary!} />
        <RevenueDataTable dailyData={reportData?.dailyData!} />
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={data?.totalPages || 0}
        />
      </div>
    );
  }

  return (
    <div className="pb-16 px-4">
      <div className="w-full max-w-7xl mx-auto space-y-8 mt-6">
        {/* Page Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-br from-[#1f223f] to-[#2a2d55] p-5 rounded-2xl border border-white/10 shadow-md">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Revenue Report
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Analyze your sales and earnings over time.
            </p>
          </div>

          {/* Action Buttons: Filter & Download */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Custom Styled Select Dropdown */}
            <ReportDateSelector
              setEnabled={setCustomApplied} // Pass the control function to the selector
              filter={filter}
              setFilter={setFilter}
            />

            {/* Download Button */}
            <button
              onClick={handleDownloadCSV}
              disabled={isLoading || isError}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 px-5 rounded-xl transition-colors shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4 " />
              <span className="sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {content}
      </div>
    </div>
  );
};

export default RevenueReportPage;
