import type { DashboardMotivationSummary } from "../../types/admin.type";
import MotivationSkeleton from "../adminDashboardSckeltons.ts/MotivationSkeleton";
import DashboardMotivationCard from "../MotivationCard";
import WidgetErrorFallback from "../WidgetErrorFallback";


type Props = {
  isLoading: boolean;
  isError: boolean;
  data: DashboardMotivationSummary | null | undefined;
  // onRetry?: () => void; // Un-comment when you add React Query refetch
};

const MotivationWidget = ({ isLoading, isError, data }: Props) => {
  if (isLoading) {
    return <MotivationSkeleton />;
  }

  if (isError || !data) {
    return <WidgetErrorFallback title="Motivation Tracker" />;
  }

  return <DashboardMotivationCard data={data} />;
};

export default MotivationWidget;