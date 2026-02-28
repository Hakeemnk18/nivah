import type { RevenueChartData, RevenueRange } from "../../types/admin.type";
import RevenueChartSkeleton from "../adminDashboardSckeltons.ts/RevenueChartSkeleton";
import RevenueChartCard from "../RevanueChart";
import WidgetErrorFallback from "../WidgetErrorFallback";


type Props = {
  isLoading: boolean;
  isError: boolean;
  data: RevenueChartData | null | undefined;
  onRangeChange?: (range: RevenueRange) => void; 
};

const RevenueWidget = ({ isLoading, isError, data, onRangeChange }: Props) => {
  if (isLoading) {
    return <RevenueChartSkeleton />;
  }

  if (isError || !data) {
    return <WidgetErrorFallback title="Revenue Chart" />;
  }

  return <RevenueChartCard data={data} onRangeChange={onRangeChange} />;
};

export default RevenueWidget;