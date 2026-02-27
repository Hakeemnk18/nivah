import type { TopAndLowSellingProductItem } from "../../types/admin.type";
import RankingListSkeleton from "../adminDashboardSckeltons.ts/RankingListSkeleton";
import RankingListCard from "../RankingListCard";
import WidgetErrorFallback from "../WidgetErrorFallback";


type Props = {
  isLoading: boolean;
  isError: boolean;
  topProducts: TopAndLowSellingProductItem[] | null;
  lowProducts: TopAndLowSellingProductItem[] | null;
};

const ProductRankingsWidget = ({ isLoading, isError, topProducts, lowProducts }: Props) => {
  if (isLoading) {
    return (
      <>
        <RankingListSkeleton />
        <RankingListSkeleton />
      </>
    );
  }

  if (isError || !topProducts || !lowProducts) {
    return (
      <div className="xl:col-span-2">
        <WidgetErrorFallback title="Product Rankings" />
      </div>
    );
  }

  return (
    <>
      <RankingListCard title="Top Selling Products" items={topProducts} />
      <RankingListCard title="Low Selling Products" items={lowProducts} />
    </>
  );
};

export default ProductRankingsWidget;