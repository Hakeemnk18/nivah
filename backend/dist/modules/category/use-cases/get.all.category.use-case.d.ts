import type { GetAllQueryDto } from "../../../core/shared/dtos/get.all.doc.dto.js";
import type { IGetAllCategoryUseCase } from "./interfaces/get.all.category.use-case.interface.js";
import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
import type { Category } from "../entities/category.entity.js";
export declare class GetAllCategoryUseCase implements IGetAllCategoryUseCase {
    private readonly _categoryRepository;
    constructor(_categoryRepository: ICategoryRepository);
    execute(dto: GetAllQueryDto, parentId: string | null): Promise<{
        data: Category[];
        total: number;
    }>;
}
//# sourceMappingURL=get.all.category.use-case.d.ts.map