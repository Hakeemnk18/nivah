import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { IGetProductVariantForUserUseCase } from "./interfaces/get.product.variant.for.user.use-case.interface.js";
import type { UserVariantView } from "../types/product.type.js";
export declare class GetProductVariantForUserUseCase implements IGetProductVariantForUserUseCase {
    private readonly _productRepository;
    constructor(_productRepository: IProductRepository);
    execute(productId: string, variantId: string): Promise<UserVariantView>;
}
//# sourceMappingURL=get.product.variant.for.user.use-case.d.ts.map