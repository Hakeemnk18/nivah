import type { IGetProductRankingsUseCase } from "./interfaces/get.product.rankings.use-case.interface.js";
import type { IOrderRepository } from "../../order/repositories/order.repository.interface.js";
import type { TopAndLowSellingProducts } from "../types/analysis.type.js";
export declare class GetProductRankingsUseCase implements IGetProductRankingsUseCase {
    private readonly _orderRepository;
    constructor(_orderRepository: IOrderRepository);
    execute(): Promise<{
        topSelling: TopAndLowSellingProducts;
        lowSelling: TopAndLowSellingProducts;
    }>;
}
//# sourceMappingURL=get.product.rankings.use-case.d.ts.map