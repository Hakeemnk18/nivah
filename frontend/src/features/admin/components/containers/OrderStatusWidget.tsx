import type { OrderStatusDistribution } from "../../types/admin.type";
import OrderStatusSkeleton from "../adminDashboardSckeltons.ts/OrderStatusSkeleton";
import OrderStatusCard from "../OrderStatusCard";
import WidgetErrorFallback from "../WidgetErrorFallback";


type Props = {
  isLoading: boolean;
  isError: boolean;
  data: OrderStatusDistribution | null | undefined;
};

const OrderStatusWidget = ({ isLoading, isError, data }: Props) => {
  if (isLoading) {
    return <OrderStatusSkeleton />;
  }

  if (isError || !data) {
    return <WidgetErrorFallback title="Order Status" />;
  }

  return <OrderStatusCard data={data} />;
};

export default OrderStatusWidget;