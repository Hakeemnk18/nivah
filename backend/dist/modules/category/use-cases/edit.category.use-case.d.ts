import type { IEditCategoryUseCase } from "./interfaces/edit.category.use-case.interface.js";
import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
import type { CreateCategoryRequestDto } from "../dtos/create.category.dto.js";
export declare class EditCategoryUseCase implements IEditCategoryUseCase {
    private readonly _categoryRepository;
    constructor(_categoryRepository: ICategoryRepository);
    execute(id: string, dto: CreateCategoryRequestDto): Promise<void>;
}
//# sourceMappingURL=edit.category.use-case.d.ts.map