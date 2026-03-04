import type { ICreateProductUseCase } from "./interfaces/create.product.use-case.interface.js";
import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { CreateProductRequestDto } from "../dtos/create.product.dto.js";
import type { ICategoryRepository } from "../../category/repositories/category.repository.interface.js";
export declare class CreateProductUseCase implements ICreateProductUseCase {
    private readonly _productRepository;
    private readonly _categoryRepository;
    constructor(_productRepository: IProductRepository, _categoryRepository: ICategoryRepository);
    execute(dto: CreateProductRequestDto): Promise<void>;
}
//# sourceMappingURL=create.product.use-case.d.ts.map