import { useState } from "react";
import AdminErrorState from "../../admin/components/AdminErrorState";
import DashboardSkeleton from "../components/DashboardSkelton";
import {
  mockLowSellingProducts,
  mockMotivationSummary,
  mockOrderStatusDistribution,
  mockTopSellingCategories,
  mockTopSellingProducts,
  type RevenueRange,
} from "../types/admin.type";
import MotivationWidget from "../components/containers/MotivationWidget";
import KpiWidget from "../components/containers/KpiWidget";
import OrderStatusWidget from "../components/containers/OrderStatusWidget";
import RevenueWidget from "../components/containers/RevenueWidget";
import CategoryRankingWidget from "../components/containers/CategoryRankingWidget";
import ProductRankingsWidget from "../components/containers/ProductRankingsWidget";
import { useRevenueChart } from "../hooks/use.revenue.chart";
import { useKpiCards } from "../hooks/use.kpi.cards";


const AdminDashboardPage = () => {

  //revenue chart
  const [chartRange, setChartRange] = useState<RevenueRange>("Month");
  const {data: revenueChartData, isLoading: revenueChartIsLoading, isError: revenueChartIsError} = useRevenueChart(chartRange);
  const revenueChart = revenueChartData?.data || null

  // kpi cards
  const {data: kpiCardsData, isLoading: dashboardKpisIsLoading, isError: dashboardKpisIsError} = useKpiCards();
  const kpiCards = kpiCardsData?.data || null;

  const dashboardMotivationIsLoading = false;
  const dashboardMotivationIsError = false;
  const orderStatusIsLoading = false;
  const orderStatusIsError = false;
  const productsIsLoading = false;
  const productsIsError = false;
  const categoriesIsLoading = false;
  const categoriesIsError = false;
  const [isLoading] = useState(false);
  const [isError] = useState(false);

  let content;

  if (isLoading) {
    content = <DashboardSkeleton />;
  } else if (isError) {
    content = <AdminErrorState />;
  } else {
    content = (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <div className="lg:col-span-2">
            <MotivationWidget
              isLoading={dashboardMotivationIsLoading}
              isError={dashboardMotivationIsError}
              data={mockMotivationSummary}
            />
          </div>

          <KpiWidget
            isLoading={dashboardKpisIsLoading}
            isError={dashboardKpisIsError}
            data={kpiCards}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 ">
          <div className="xl:col-span-1 ">
            <OrderStatusWidget
              isLoading={orderStatusIsLoading}
              isError={orderStatusIsError}
              data={mockOrderStatusDistribution}
            />
          </div>

          <div className="xl:col-span-2">
            <RevenueWidget
              isLoading={revenueChartIsLoading}
              isError={revenueChartIsError}
              data={revenueChart}
              onRangeChange={(r: RevenueRange)=> setChartRange(r)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <ProductRankingsWidget
            isLoading={productsIsLoading}
            isError={productsIsError}
            topProducts={mockTopSellingProducts.products}
            lowProducts={mockLowSellingProducts.products}
          />
          
          {/* Handles Categories (1 column) */}
          <CategoryRankingWidget
            isLoading={categoriesIsLoading}
            isError={categoriesIsError}
            categories={mockTopSellingCategories.categories}
          />
        </div>
      </>
    );
  }

  return (
    <div className="pb-16 px-4">
      <div className="p-6 rounded-xl text-white w-full max-w-7xl mx-auto space-y-8">
        {content}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
