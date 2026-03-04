import type { UpdateVariantRequestDto } from "../../dtos/variant.dto.js";
export interface IEditProductVariantUseCase {
    execute(productId: string, variantId: string, dto: UpdateVariantRequestDto): Promise<void>;
}
//# sourceMappingURL=edit.product.variant.use-case.interface.d.ts.map