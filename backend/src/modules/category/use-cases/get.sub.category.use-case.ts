import { inject, injectable } from "tsyringe";
import { CustomError } from "../../../core/errors/custom.error.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";

import type { IGetSubCategoryUseCase } from "./interfaces/get.sub.category.use-case.interface.js";
import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
import type { IdName } from "../../../core/shared/types/id.name.type.js";

@injectable()
export class GetSubCategoryUseCase
  implements IGetSubCategoryUseCase
{
  constructor(
    @inject("ICategoryRepository")
    private readonly _categoryRepository: ICategoryRepository
  ) {}

  async execute(parentId: string): Promise<IdName[]> {
    const parent = await this._categoryRepository.findById(parentId);

    if (!parent || !parent.isActive) {
      throw new CustomError(
        ResponseMessages.CATEGORY_NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    const categories =
      await this._categoryRepository.findSubCategoriesForUser(parentId);

    return categories.map((category) => ({
      id: category.id!,
      name: category.name,
    }));
  }
}
