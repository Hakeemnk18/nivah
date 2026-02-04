import type { AddVariantRequestDto } from "../../dtos/variant.dto.js";

export interface IEditProductVariantUseCase {
  execute(
    productId: string,
    variantId: string,
    dto: AddVariantRequestDto
  ): Promise<void>;
}