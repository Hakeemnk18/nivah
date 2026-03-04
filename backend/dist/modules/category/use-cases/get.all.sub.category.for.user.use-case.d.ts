import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
import type { IdName } from "../../../core/shared/types/id.name.type.js";
import type { IGetAllSubCategoryForUserUseCase } from "./interfaces/get.all.sub.category.for.user.use-case.interface.js";
export declare class GetAllSubCategoryForUserUseCase implements IGetAllSubCategoryForUserUseCase {
    private readonly _categoryRepository;
    constructor(_categoryRepository: ICategoryRepository);
    execute(): Promise<IdName[]>;
}
//# sourceMappingURL=get.all.sub.category.for.user.use-case.d.ts.map