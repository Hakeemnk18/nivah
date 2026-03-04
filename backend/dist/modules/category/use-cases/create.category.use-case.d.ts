import type { ICreateCategoryUseCase } from "./interfaces/create.category.use-case.interface.js";
import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
import type { CreateCategoryRequestDto } from "../dtos/create.category.dto.js";
export declare class CreateCategoryUseCase implements ICreateCategoryUseCase {
    private readonly _categoryRepository;
    constructor(_categoryRepository: ICategoryRepository);
    execute(dto: CreateCategoryRequestDto): Promise<void>;
}
//# sourceMappingURL=create.category.use-case.d.ts.map