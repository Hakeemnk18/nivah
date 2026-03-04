import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { UserProductListView } from "../types/product.type.js";
import type { IGetFeaturedProductUseCase } from "./interfaces/get.fetured.product.use-case.interface.js";
export declare class GetFeaturedProductUseCase implements IGetFeaturedProductUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(): Promise<UserProductListView[]>;
}
//# sourceMappingURL=get.fetured.product.use-case.d.ts.map