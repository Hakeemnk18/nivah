import type { ProductView } from "../../types/product.type.js";
export interface IGetProductDetailsForAdminUseCase {
    execute(id: string): Promise<ProductView>;
}
//# sourceMappingURL=get.product.admin.use-case.interface.d.ts.map