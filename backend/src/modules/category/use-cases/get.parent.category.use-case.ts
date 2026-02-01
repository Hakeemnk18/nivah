import { inject, injectable } from "tsyringe";

import type { IGetParentCategoryUseCase } from "./interfaces/get.parent.category.use-case.interface.js";
import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
import type { IdName } from "../../../core/shared/types/id.name.type.js";


@injectable()
export class GetParentCategoryUseCase
  implements IGetParentCategoryUseCase
{
  constructor(
    @inject("ICategoryRepository")
    private readonly _categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<IdName[]> {
    const categories =
      await this._categoryRepository.findAllMainCategoriesForUser();

    return categories.map((category) => ({
      id: category.id!,
      name: category.name,
    }));
  }
}
