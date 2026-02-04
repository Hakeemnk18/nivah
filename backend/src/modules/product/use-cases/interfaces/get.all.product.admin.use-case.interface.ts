import type { GetAllQueryDto } from "../../../../core/shared/dtos/get.all.doc.dto.js";

import type { ProductListView, ProductView } from "../../types/product.type.js";

export interface IGetAllProductForAdminUseCase {
  execute(
    dto: GetAllQueryDto
  ): Promise<{ data: ProductListView[]; total: number }>;
}