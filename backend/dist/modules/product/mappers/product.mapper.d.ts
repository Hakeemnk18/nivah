import { Product } from "../entities/product.entity.js";
import type { AdminVariantView, ProductListView, ProductView, UserProductListView, UserProductView } from "../types/product.type.js";
export declare class ProductMapper {
    static toDomain(productModelData: any): Product | null;
    static toPersistence(productEntity: Product): any;
    static toAdminView(productModelData: any): ProductView | null;
    static toAdminListView(productModelData: any): ProductListView | null;
    static toUserView(productModelData: any): UserProductView | null;
    static toUserListView(productModelData: any): UserProductListView | null;
    static toVariantView(varinatData: any): AdminVariantView | null;
}
//# sourceMappingURL=product.mapper.d.ts.map