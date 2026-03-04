import type { IGetProductDetailsForAdminUseCase } from "./interfaces/get.product.admin.use-case.interface.js";
import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { ProductView } from "../types/product.type.js";
export declare class GetProductDetailsForAdminUseCase implements IGetProductDetailsForAdminUseCase {
    private readonly _productRepository;
    constructor(_productRepository: IProductRepository);
    execute(id: string): Promise<ProductView>;
}
//# sourceMappingURL=get.product.admin.use-case.d.ts.map