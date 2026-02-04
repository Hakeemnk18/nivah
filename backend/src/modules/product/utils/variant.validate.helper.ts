import type { AddVariantRequestDto } from "../dtos/variant.dto.js";
import type { AddVariantProps, IVariant } from "../types/product.type.js";

export const assertUniqueVariantSizes = (variants: AddVariantRequestDto[]): boolean => {
  console.log("inside validate function ")
  const normalizedSizes = variants.map((v) => v.size.trim().toLowerCase());
  const uniqueSizeCount = new Set(normalizedSizes).size;
  return uniqueSizeCount === normalizedSizes.length;
};
