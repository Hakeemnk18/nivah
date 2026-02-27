export type RevenueRange = "Year" | "Month" | "Week" | "Daily";

export type RevenueChartData = {
    range: RevenueRange;
    currency: "INR" | "USD";
    series: {
        label: string;
        data: number[];
    };
    categories: string[];
};
