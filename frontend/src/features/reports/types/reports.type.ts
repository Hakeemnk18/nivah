
export type ReportDateRangeOption =
  | "daily"        // Today/Daily
  | "this_week"    // This Week
  | "this_month"   // This Month
  | "last_6_months"// 6 Months
  | "this_year"    // This Year
  | "all_time"     // All Time
  | "custom";      // Custom Date Range

// 2. The state object you will use in your React component
export type RevenueFilterState = {
  option: ReportDateRangeOption;
  customStartDate?: string | null;
  customEndDate?: string | null;
};

// The 3 Top-Level Summary Cards
export type RevenueSummary = {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
};


export type DailyRevenueData = {
  date: string;
  revenue: number;
  orders: number;
};


export type RevenueReportResponseData = {
  summary: RevenueSummary;
  dailyData: DailyRevenueData[];
};



export const mockRevenueSummary: RevenueSummary = {
  totalRevenue: 1540000,
  totalOrders: 31,
  averageOrderValue: 49677,
};

// 2. Mock data for the Data Table / Chart
export const mockDailyRevenueData: DailyRevenueData[] = [
  {
    date: "2026-02-22",
    revenue: 120000,
    orders: 3,
  },
  {
    date: "2026-02-23",
    revenue: 250000,
    orders: 5,
  },
  {
    date: "2026-02-24",
    revenue: 85000,
    orders: 2,
  },
  {
    date: "2026-02-25",
    revenue: 190000,
    orders: 4,
  },
  {
    date: "2026-02-26",
    revenue: 310000,
    orders: 6,
  },

];

export type RevenueReportResponse = {
  message: string;
  success: boolean;
  data: {
    summary: RevenueSummary;
    dailyData: DailyRevenueData[];
  };
  totalPages: number;
  currentPage: number;
};

export const mockRevenueReportResponse = {
  message: "Revenue report fetched successfully",
  success: true,
  data: {
    summary: mockRevenueSummary,
    dailyData: mockDailyRevenueData,
  },
  totalPages: 5,
  currentPage: 1,
};