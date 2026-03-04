import { Product } from "../entities/product.entity.js";
import type { IProductRepository } from "./product.repository.interface.js";
import type { IGetAllDocDB } from "../../../core/shared/interfaces/get.all.doc.interface.js";
import type { AddVariantProps, AdminVariantView, PaginatedUserProductList, ProductListView, ProductView, StockUpdateProps, UpdateVariantParams, UserProductListView, UserProductView } from "../types/product.type.js";
import type { ClientSession } from "mongoose";
export declare class ProductRepository implements IProductRepository {
    create(productEntity: Product): Promise<Product>;
    findById(id: string, session: ClientSession): Promise<Product | null>;
    save(productEntity: Product): Promise<Product>;
    findAllForAdmin(allDoc: IGetAllDocDB): Promise<ProductListView[]>;
    countDocument(query: Record<string, any>): Promise<number>;
    findProductForAdmin(id: string): Promise<ProductView | null>;
    findProductForUser(id: string): Promise<UserProductView | null>;
    addVariants(productId: string, variants: AddVariantProps[]): Promise<Product | null>;
    updateVariantById(params: UpdateVariantParams): Promise<Product | null>;
    findProductVariant(productId: string, variantId: string, isActive?: boolean): Promise<AdminVariantView | null>;
    findFeaturedProducts(): Promise<UserProductListView[]>;
    findAllForUser(allDoc: IGetAllDocDB): Promise<PaginatedUserProductList>;
    findRelatedProducts(categoryId: string): Promise<UserProductListView[]>;
    decrementStock(params: StockUpdateProps): Promise<void>;
    incrementStock(params: StockUpdateProps): Promise<void>;
}
//# sourceMappingURL=product.repository.d.ts.map