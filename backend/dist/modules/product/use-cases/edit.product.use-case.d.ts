import type { IEditProductUseCase } from "./interfaces/edit.product.use-case.interface.js";
import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { EditProductRequestDto } from "../dtos/edit.product.dto.js";
import type { ICategoryRepository } from "../../category/repositories/category.repository.interface.js";
export declare class EditProductUseCase implements IEditProductUseCase {
    private readonly _productRepository;
    private readonly _categoryRepository;
    constructor(_productRepository: IProductRepository, _categoryRepository: ICategoryRepository);
    execute(productId: string, dto: EditProductRequestDto): Promise<void>;
}
//# sourceMappingURL=edit.product.use-case.d.ts.map