import type { TopAndLowSellingProducts } from "../../types/analysis.type.js";
export interface IGetProductRankingsUseCase {
    execute(): Promise<{
        topSelling: TopAndLowSellingProducts;
        lowSelling: TopAndLowSellingProducts;
    }>;
}
//# sourceMappingURL=get.product.rankings.use-case.interface.d.ts.map