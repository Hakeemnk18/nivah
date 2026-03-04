import type { IGetAllSubCategoriesForAdminUseCase } from "./interfaces/get.all.sub.categories.for.admin.use-case.interface.js";
import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
import type { IdName } from "../../../core/shared/types/id.name.type.js";
export declare class GetAllSubCategoriesForAdminUseCase implements IGetAllSubCategoriesForAdminUseCase {
    private readonly _categoryRepository;
    constructor(_categoryRepository: ICategoryRepository);
    execute(): Promise<IdName[]>;
}
//# sourceMappingURL=get.all.sub.categories.for.admin.use-case.d.ts.map