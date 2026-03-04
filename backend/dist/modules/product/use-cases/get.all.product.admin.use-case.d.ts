import type { IGetAllProductForAdminUseCase } from "./interfaces/get.all.product.admin.use-case.interface.js";
import type { GetAllQueryDto } from "../../../core/shared/dtos/get.all.doc.dto.js";
import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { ICategoryRepository } from "../../category/repositories/category.repository.interface.js";
import type { ProductListView } from "../types/product.type.js";
export declare class GetAllProductForAdminUseCase implements IGetAllProductForAdminUseCase {
    private readonly _productRepository;
    private readonly _categoryRepository;
    constructor(_productRepository: IProductRepository, _categoryRepository: ICategoryRepository);
    execute(dto: GetAllQueryDto): Promise<{
        data: ProductListView[];
        total: number;
    }>;
}
//# sourceMappingURL=get.all.product.admin.use-case.d.ts.map