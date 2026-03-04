import type { IEditProductVariantUseCase } from "./interfaces/edit.product.variant.use-case.interface.js";
import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { UpdateVariantRequestDto } from "../dtos/variant.dto.js";
export declare class EditProductVariantUseCase implements IEditProductVariantUseCase {
    private readonly _productRepository;
    constructor(_productRepository: IProductRepository);
    execute(productId: string, variantId: string, dto: UpdateVariantRequestDto): Promise<void>;
}
//# sourceMappingURL=edit.product.variant.use-case.d.ts.map