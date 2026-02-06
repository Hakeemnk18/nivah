import { inject, injectable } from "tsyringe";
import type { IGetAllSubCategoriesForAdminUseCase } from "./interfaces/get.all.sub.categories.for.admin.use-case.interface.js";
import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
import type { IdName } from "../../../core/shared/types/id.name.type.js";

@injectable()
export class GetAllSubCategoriesForAdminUseCase
  implements IGetAllSubCategoriesForAdminUseCase {
  constructor(
    @inject("ICategoryRepository")
    private readonly _categoryRepository: ICategoryRepository
  ) { }

  async execute(): Promise<IdName[]> {
    return this._categoryRepository.findAllSubCategories({ parentId: { $ne: null } })
  }
}
