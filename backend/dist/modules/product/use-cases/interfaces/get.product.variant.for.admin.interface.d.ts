import type { AdminVariantView } from "../../types/product.type.js";
export interface IGetProductVariantForAdmin {
    execute(productId: string, variantId: string): Promise<AdminVariantView>;
}
//# sourceMappingURL=get.product.variant.for.admin.interface.d.ts.map