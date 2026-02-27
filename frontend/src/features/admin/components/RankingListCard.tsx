import type { 
  TopAndLowSellingProductItem, 
  TopSellingCategoryItem 
} from "../types/admin.type";

// Accepts both product and category items!
type ValidItem = TopAndLowSellingProductItem | TopSellingCategoryItem;

type Props = {
  title: string;
  items: ValidItem[];
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const RankingListCard = ({ title, items }: Props) => {
  // Ensure exactly max 5 items are shown
  const displayItems = items.slice(0, 5);

  return (
    <div
      className="relative rounded-2xl p-5 sm:p-6
                 bg-gradient-to-br from-[#1f223f] to-[#2a2d55]
                 border border-white/10
                 shadow-md
                 flex flex-col h-full 
                 min-h-[440px]" // 👈 Prevents collapse even with 1 or 2 items
    >
      {/* Header */}
      <div className="mb-6 flex flex-col">
        <h3 className="text-base font-semibold text-gray-200">{title}</h3>
        <span className="text-xs text-emerald-400 mt-1 font-medium">
          Last 1 Year
        </span>
      </div>

      {/* List Container */}
      <div className="flex flex-col gap-5 flex-1">
        {displayItems.length > 0 ? (
          displayItems.map((item) => {
            // Intelligently extract the ID depending on the type
            const id = "productId" in item ? item.productId : item.categoryId;

            return (
              <div
                key={id}
                className="flex items-center justify-between group"
              >
                {/* Left: Icon & Details */}
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  
                  {/* Circular Image Wrapper */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0 flex items-center justify-center relative">
                    {item.iconUrl ? (
                      <img
                        src={item.iconUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/50x50/2c2f4a/ffffff?text=Img";
                        }}
                      />
                    ) : (
                      <span className="text-xs text-gray-500">N/A</span>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col flex-1 min-w-0 pr-2">
                    <span className="text-sm font-medium text-gray-200 truncate">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-400 mt-0.5">
                      Sale: {item.totalQuantitySold}
                    </span>
                  </div>
                </div>

                {/* Right: Revenue */}
                <div className="text-right shrink-0">
                  <span className="text-sm font-semibold text-white tracking-wide">
                    {formatCurrency(item.totalRevenue)}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-gray-400">
            No data available for the last year
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingListCard;