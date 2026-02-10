import type { IGetAllDocDB } from "../../../core/shared/interfaces/get.all.doc.interface.js";
import { Product } from "../entities/product.entity.js";
import type {
  AddVariantProps,
  AdminVariantView,
  ProductListView,
  ProductView,
  UpdateVariantParams,
  UserProductView,
} from "../types/product.type.js";

export interface IProductRepository {
  create(productEntity: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  save(productEntity: Product): Promise<Product>;
  findAllForAdmin(allDoc: IGetAllDocDB): Promise<ProductListView[]>;
  countDocument(query: Record<string, any>): Promise<number>;
  findProductForAdmin(id: string): Promise<ProductView | null>;
  findProductForUser(id: string): Promise<UserProductView | null>;
  findProductVariant(productId: string, variantId: string, isActive?: boolean): Promise<AdminVariantView | null>;
  addVariants(
    productId: string,
    dto: AddVariantProps[]
  ): Promise<Product | null>;

  updateVariantById(
    params: UpdateVariantParams,
  ): Promise<Product | null>
}
