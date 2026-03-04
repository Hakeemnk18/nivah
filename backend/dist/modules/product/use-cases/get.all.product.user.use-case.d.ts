import type { IGetAllProductForUserUseCase } from "./interfaces/get.all.product.user.use-case.interface.js";
import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { ICategoryRepository } from "../../category/repositories/category.repository.interface.js";
import type { PaginatedUserProductList } from "../types/product.type.js";
import type { GetAllQueryDto } from "../../../core/shared/dtos/get.all.doc.dto.js";
export declare class GetAllProductForUserUseCase implements IGetAllProductForUserUseCase {
    private readonly _productRepository;
    private readonly _categoryRepository;
    constructor(_productRepository: IProductRepository, _categoryRepository: ICategoryRepository);
    execute(dto: GetAllQueryDto): Promise<PaginatedUserProductList>;
}
//# sourceMappingURL=get.all.product.user.use-case.d.ts.map