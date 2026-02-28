import type { DashboardKpiCardType } from "../../types/admin.type";
import KpiSkeleton from "../adminDashboardSckeltons.ts/KpiSkeleton";
import DashboardKpiCard from "../KPICard";
import WidgetErrorFallback from "../WidgetErrorFallback";


type Props = {
  isLoading: boolean;
  isError: boolean;
  data: DashboardKpiCardType[] | null | undefined;
};

const KpiWidget = ({ isLoading, isError, data }: Props) => {
  if (isLoading) {
    return (
      <>
        {/* Render 4 skeletons to mimic the 4 KPI cards loading */}
        {Array.from({ length: 4 }).map((_, index) => (
          <KpiSkeleton key={index} />
        ))}
      </>
    );
  }

  if (isError || !data) {
    return (
      // Spans the remaining 4 columns in the large grid
      <div className="lg:col-span-4">
        <WidgetErrorFallback title="Key Metrics" />
      </div>
    );
  }

  return (
    <>
      {data.map((card) => (
        <DashboardKpiCard key={card.key} data={card} />
      ))}
    </>
  );
};

export default KpiWidget;