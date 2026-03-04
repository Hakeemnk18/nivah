import type { IGetCategoryRankingsUseCase } from "./interfaces/get.category.rankings.use-case.interface.js";
import type { IOrderRepository } from "../../order/repositories/order.repository.interface.js";
import type { TopSellingCategoriesResponse } from "../types/analysis.type.js";
export declare class GetCategoryRankingsUseCase implements IGetCategoryRankingsUseCase {
    private readonly _orderRepository;
    constructor(_orderRepository: IOrderRepository);
    execute(): Promise<TopSellingCategoriesResponse>;
}
//# sourceMappingURL=get.category.rankings.use-case.d.ts.map