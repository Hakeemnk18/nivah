import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { UserProductListView } from "../types/product.type.js";
import type { IGetRelatedProductUseCase } from "./interfaces/get.related.product.use-case.interface.js";
export declare class GetRelatedProductUseCase implements IGetRelatedProductUseCase {
    private readonly _productRepository;
    constructor(_productRepository: IProductRepository);
    execute(categoryId: string): Promise<UserProductListView[]>;
}
//# sourceMappingURL=get.related.product.use-case.d.ts.map