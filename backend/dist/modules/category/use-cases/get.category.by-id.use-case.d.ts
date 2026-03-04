import type { IGetCategoryByIdUseCase } from "./interfaces/get.category.by-id.use-case.interface.js";
import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
import type { Category } from "../entities/category.entity.js";
export declare class GetCategoryByIdUseCase implements IGetCategoryByIdUseCase {
    private readonly _categoryRepository;
    constructor(_categoryRepository: ICategoryRepository);
    execute(id: string): Promise<Category>;
}
//# sourceMappingURL=get.category.by-id.use-case.d.ts.map