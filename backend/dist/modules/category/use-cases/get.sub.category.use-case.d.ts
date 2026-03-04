import type { IGetSubCategoryUseCase } from "./interfaces/get.sub.category.use-case.interface.js";
import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
import type { IdName } from "../../../core/shared/types/id.name.type.js";
export declare class GetSubCategoryUseCase implements IGetSubCategoryUseCase {
    private readonly _categoryRepository;
    constructor(_categoryRepository: ICategoryRepository);
    execute(parentId: string): Promise<IdName[]>;
}
//# sourceMappingURL=get.sub.category.use-case.d.ts.map