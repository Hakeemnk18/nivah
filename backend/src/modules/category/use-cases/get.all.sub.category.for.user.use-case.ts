import { inject, injectable } from "tsyringe";
import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
import type { IdName } from "../../../core/shared/types/id.name.type.js";
import type { IGetAllSubCategoryForUserUseCase } from "./interfaces/get.all.sub.category.for.user.use-case.interface.js";

@injectable()
export class GetAllSubCategoryForUserUseCase implements IGetAllSubCategoryForUserUseCase {
    constructor(
        @inject("ICategoryRepository")
        private readonly _categoryRepository: ICategoryRepository
    ) { }

    async execute(): Promise<IdName[]> {
        return await this._categoryRepository.findAllSubCategories({ parentId: { $ne: null }, isActive: true })
    }
}