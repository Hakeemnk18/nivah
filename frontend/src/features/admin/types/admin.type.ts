import type { ApiResponse } from "../../../shared/types/api.types";
import type { OrderStatus } from "../../order/types/order.type";

export type DashboardMotivationSummary = {
  title: string;
  subtitle: string;
  metric: {
    value: number;
    formatted: string;
    type?: "revenue" | "orders";
  };
  target?: {
    value: number;
    progressPercentage: number;
  };
  comparison?: {
    percentageChange: number;
    comparedTo: "last_24_hours" | "last_week";
  };
  cta?: {
    label: string;
    path: string;
  };
};

export type DashboardKpiCardType = {
  key: "orders" | "revenue" | "users" | "pending_orders";
  label: string;
  value: number;
  formattedValue: string;
  trend?: {
    percentageChange: number;
    direction: "up" | "down";
    comparedTo: "last_month" | "last_week";
  };
  sparkline?: number[];
  action?: {
    label: string;
    href: string;
  };
};

export type OrderStatusDistribution = {
  totalOrders: number;
  statuses: {
    status: OrderStatus;
    count: number;
    percentage: number;
  }[];
};

export type TopAndLowSellingProductItem = {
  iconUrl: string;
  productId: string;
  name: string;
  totalQuantitySold: number;
  totalRevenue: number;
};

export type TopAndLowSellingProducts = {
  range: "7d" | "30d" | "6m" | "1y";
  products: TopAndLowSellingProductItem[];
};

export type TopSellingCategoryItem = {
  iconUrl: string;
  categoryId: string;
  name: string;
  totalQuantitySold: number;
  totalRevenue: number;
};

export type TopSellingCategories = {
  range: "7d" | "30d" | "6m" | "1y";
  categories: TopSellingCategoryItem[];
};

export const mockMotivationSummary: DashboardMotivationSummary = {
  title: "Great momentum today 🚀",
  subtitle: "Revenue is growing steadily compared to yesterday",
  
  metric: {
    value: 476000,
    formatted: "₹4,76,000",
    type: "revenue", 
  },
  
  target: {
    value: 600000,
    progressPercentage: 79,
  },
  
  comparison: {
    percentageChange: 18,
    comparedTo: "last_24_hours", 
  },
  
  cta: {
    label: "View Reports",
    path: "/admin/reports",
  },
};

export const mockKpiCards: DashboardKpiCardType[] = [
  {
    key: "orders",
    label: "Total Orders",
    value: 248,
    formattedValue: "248",
    trend: {
      percentageChange: 100,
      direction: "up",
      comparedTo: "last_month",
    },
    sparkline: [20, 25, 18, 30, 22, 28, 35],
  },
  {
    key: "revenue",
    label: "Total Revenue",
    value: 476000,
    formattedValue: "₹4,76,000",
    trend: {
      percentageChange: 100,
      direction: "up",
      comparedTo: "last_month",
    },
    sparkline: [40000, 52000, 48000, 60000, 75000, 82000, 90000],
  },
  {
    key: "users",
    label: "New Users",
    value: 86,
    formattedValue: "86",
    trend: {
      percentageChange: 100,
      direction: "up",
      comparedTo: "last_month",
    },
    sparkline: [12, 18, 15, 22, 28, 35, 42],
  },
  {
    key: "pending_orders",
    label: "Pending Orders",
    value: 17,
    formattedValue: "17",
    action: {
      label: "Manage Orders",
      href: "/admin/orders", // Change this to your actual orders route
    },
  },
];

export const mockOrderStatusDistribution: OrderStatusDistribution = {
  totalOrders: 200,
  statuses: [
    { status: "created", count: 17, percentage: 17 },
    { status: "confirmed", count: 116, percentage: 58 },
    { status: "accepted", count: 30, percentage: 15 },
    { status: "dispatched", count: 10, percentage: 5 },
    { status: "delivered", count: 6, percentage: 3 },
    { status: "cancelled", count: 21, percentage: 10.5 },
  ],
};

export const mockRevenueChart: RevenueChartData = {
  range: "Month",
  currency: "INR",
  categories: [
    "Week 1",
    "Week 2",
    "Week 3",
    "Week 4",
    "Week 5",
    "Week 6",
    "Week 7",
    "Week 8",
    "Week 9",
    "Week 10",
  ],
  series: {
    label: "Revenue",
    data: [
      95000, 120000, 110000, 171000, 155000, 182000, 21500, 240000, 195000,
      210000,
    ],
  },
};
export const mockTopSellingProducts: TopAndLowSellingProducts = {
  range: "1y",
  products: [
    {
      iconUrl:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80",
      productId: "p1",
      name: "Apple Watch Series 9",
      totalQuantitySold: 859,
      totalRevenue: 34360000,
    },
    {
      iconUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80",
      productId: "p2",
      name: "Nike Air Max Pro",
      totalQuantitySold: 642,
      totalRevenue: 5136000,
    },
    {
      iconUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80",
      productId: "p3",
      name: "Sony Wireless Headphones",
      totalQuantitySold: 512,
      totalRevenue: 10240000,
    },
    {
      iconUrl:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=100&q=80",
      productId: "p4",
      name: "Urban Explorer Backpack",
      totalQuantitySold: 428,
      totalRevenue: 1284000,
    },
    {
      iconUrl:
        "https://images.unsplash.com/photo-1523293115678-efa3012921dc?auto=format&fit=crop&w=100&q=80",
      productId: "p5",
      name: "Luxury Oud Perfume",
      totalQuantitySold: 320,
      totalRevenue: 2560000,
    },
  ],
};

export const mockLowSellingProducts: TopAndLowSellingProducts = {
  range: "1y",
  products: [
    {
      iconUrl:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=100&q=80",
      productId: "p6",
      name: "Ceramic Coffee Mug",
      totalQuantitySold: 12,
      totalRevenue: 6000,
    },
    {
      iconUrl:
        "https://images.unsplash.com/photo-1531346878377-a541e4a0ecce?auto=format&fit=crop&w=100&q=80",
      productId: "p7",
      name: "Minimalist Notebook",
      totalQuantitySold: 18,
      totalRevenue: 5400,
    },
    {
      iconUrl:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=100&q=80",
      productId: "p8",
      name: "Desk Succulent Plant",
      totalQuantitySold: 21,
      totalRevenue: 10500,
    },
    {
      iconUrl:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=100&q=80",
      productId: "p9",
      name: "Retro Sunglasses",
      totalQuantitySold: 25,
      totalRevenue: 37500,
    },
    {
      iconUrl:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=100&q=80",
      productId: "p10",
      name: "Vintage Film Camera",
      totalQuantitySold: 28,
      totalRevenue: 140000,
    },
  ],
};

export const mockTopSellingCategories: TopSellingCategories = {
  range: "1y",
  categories: [
    {
      iconUrl:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=100&q=80",
      categoryId: "c1",
      name: "Electronics & Gadgets",
      totalQuantitySold: 1450,
      totalRevenue: 48500000,
    },
    {
      iconUrl:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=100&q=80",
      categoryId: "c2",
      name: "Men's Apparel",
      totalQuantitySold: 1120,
      totalRevenue: 8960000,
    },
    {
      iconUrl:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=100&q=80",
      categoryId: "c3",
      name: "Footwear",
      totalQuantitySold: 980,
      totalRevenue: 7840000,
    },
    {
      iconUrl:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=100&q=80",
      categoryId: "c4",
      name: "Luxury Accessories",
      totalQuantitySold: 750,
      totalRevenue: 15000000,
    },
    {
      iconUrl:
        "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&w=100&q=80",
      categoryId: "c5",
      name: "Beauty & Fragrances",
      totalQuantitySold: 640,
      totalRevenue: 5120000,
    },
  ],
};

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

export type ProductRankingItems = {
  topSelling: TopAndLowSellingProducts;
  lowSelling: TopAndLowSellingProducts;
};

export type RevenueChartResponse = ApiResponse<RevenueChartData>;
export type KpiCardsResponse = ApiResponse<DashboardKpiCardType[]>;
export type OrderStatusDistributionResponse = ApiResponse<
  OrderStatusDistribution
>;
export type ProductRankingsResponse = ApiResponse<ProductRankingItems>;
export type CategoryRankingsResponse = ApiResponse<TopSellingCategories>;
export type MotivationSummaryResponse = ApiResponse<DashboardMotivationSummary>;
