import type { IGetProductVariantForAdmin } from "./interfaces/get.product.variant.for.admin.interface.js";
import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { AdminVariantView } from "../types/product.type.js";
export declare class GetProductVariantForAdmin implements IGetProductVariantForAdmin {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(productId: string, variantId: string): Promise<AdminVariantView>;
}
//# sourceMappingURL=get.product.variant.for.admin.d.ts.map