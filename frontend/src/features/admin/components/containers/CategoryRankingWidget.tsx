import type { TopSellingCategoryItem } from "../../types/admin.type";
import RankingListSkeleton from "../adminDashboardSckeltons.ts/RankingListSkeleton";
import RankingListCard from "../RankingListCard";
import WidgetErrorFallback from "../WidgetErrorFallback";


type Props = {
  isLoading: boolean;
  isError: boolean;
  categories: TopSellingCategoryItem[] | null | undefined;
};

const CategoryRankingWidget = ({ isLoading, isError, categories }: Props) => {
  if (isLoading) {
    return <RankingListSkeleton />;
  }

  if (isError || !categories) {
    return (
      <div className="xl:col-span-1 h-full">
        <WidgetErrorFallback title="Category Rankings" />
      </div>
    );
  }

  return <RankingListCard title="Top Selling Categories" items={categories} />;
};

export default CategoryRankingWidget;