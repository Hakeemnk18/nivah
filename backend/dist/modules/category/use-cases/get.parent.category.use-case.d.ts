import type { IGetParentCategoryUseCase } from "./interfaces/get.parent.category.use-case.interface.js";
import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
import type { IdName } from "../../../core/shared/types/id.name.type.js";
export declare class GetParentCategoryUseCase implements IGetParentCategoryUseCase {
    private readonly _categoryRepository;
    constructor(_categoryRepository: ICategoryRepository);
    execute(): Promise<IdName[]>;
}
//# sourceMappingURL=get.parent.category.use-case.d.ts.map