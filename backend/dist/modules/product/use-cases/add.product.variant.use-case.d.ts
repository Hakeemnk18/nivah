import type { IAddProductVariantUseCase } from "./interfaces/add.product.variant.use-case.interface.js";
import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { AddVariantRequestDto } from "../dtos/variant.dto.js";
export declare class AddProductVariantUseCase implements IAddProductVariantUseCase {
    private readonly _productRepository;
    constructor(_productRepository: IProductRepository);
    execute(productId: string, dto: AddVariantRequestDto[]): Promise<void>;
}
//# sourceMappingURL=add.product.variant.use-case.d.ts.map