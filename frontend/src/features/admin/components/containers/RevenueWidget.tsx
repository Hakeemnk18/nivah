import type { RevenueChartData } from "../../types/admin.type";
import RevenueChartSkeleton from "../adminDashboardSckeltons.ts/RevenueChartSkeleton";
import RevenueChartCard from "../RevanueChart";
import WidgetErrorFallback from "../WidgetErrorFallback";


type Props = {
  isLoading: boolean;
  isError: boolean;
  data: RevenueChartData | null;
  // This will be used later when we add actual state/API calls
  onRangeChange?: (range: string) => void; 
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