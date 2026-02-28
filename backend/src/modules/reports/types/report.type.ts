export type GetRevenueReportPayload = {
    startDate: Date | null, 
    endDate: Date | null, 
    page: number, 
    limit: number
}

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



export type RevenueReportSummary = {
    summary: RevenueSummary
    totalPages: number
    dailyData: DailyRevenueData[]
}