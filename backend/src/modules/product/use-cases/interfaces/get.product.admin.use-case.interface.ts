import type { ProductView } from "../../types/product.type.js";

export interface IGetProductForAdminUseCase {
  execute(id: string): Promise<ProductView>;
}