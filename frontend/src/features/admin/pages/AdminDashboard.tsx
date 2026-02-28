import { useState } from "react";
import AdminErrorState from "../../admin/components/AdminErrorState";
import DashboardSkeleton from "../components/DashboardSkelton";
import {
  mockMotivationSummary,
  mockOrderStatusDistribution,
  mockTopSellingCategories,
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
import { useProductsRanking } from "../hooks/use.products.ranking";
import { useTopSellingCategories } from "../hooks/use.top.selling.categories";
import { useMotivationSummary } from "../hooks/use.motivation.summery";
import { useOrderStatusDistribution } from "../hooks/use.order.status.distribution";


const AdminDashboardPage = () => {

  //revenue chart
  const [chartRange, setChartRange] = useState<RevenueRange>("Month");
  const {data: revenueChart, isLoading: revenueChartIsLoading, isError: revenueChartIsError} = useRevenueChart(chartRange);
  // kpi cards
  const {data: kpiCards, isLoading: dashboardKpisIsLoading, isError: dashboardKpisIsError} = useKpiCards();
  //products ranking
  const {data: topProducts, isLoading: topProductsIsLoading, isError: topProductsIsError} = useProductsRanking()
  //top selling categories
  const {data: categories, isLoading: categoriesIsLoading, isError: categoriesIsError} = useTopSellingCategories()
  //motivation summary
  const {data: motivationSummary, isLoading: motivationSummaryIsLoading, isError: motivationSummaryIsError} = useMotivationSummary()
  //order status distribution 
  const {data: orderStatusDistribution, isLoading: orderStatusIsLoading, isError: orderStatusIsError} = useOrderStatusDistribution();
  

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
              isLoading={motivationSummaryIsLoading}
              isError={motivationSummaryIsError}
              data={motivationSummary}
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
              data={orderStatusDistribution}
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
            isLoading={topProductsIsLoading}
            isError={topProductsIsError}
            topProducts={topProducts?.topSelling?.products}
            lowProducts={topProducts?.lowSelling?.products}
          />
          
          {/* Handles Categories (1 column) */}
          <CategoryRankingWidget
            isLoading={categoriesIsLoading}
            isError={categoriesIsError}
            categories={categories?.categories}
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
