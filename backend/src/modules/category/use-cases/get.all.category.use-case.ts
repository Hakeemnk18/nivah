import { inject, injectable } from "tsyringe";
import type { GetAllQueryDto } from "../../../core/shared/dtos/get.all.doc.dto.js";
import type { IGetAllDocDB } from "../../../core/shared/interfaces/get.all.doc.interface.js";

import type { IGetAllCategoryUseCase } from "./interfaces/get.all.category.use-case.interface.js";
import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
import type { Category } from "../entities/category.entity.js";

@injectable()
export class GetAllCategoryUseCase implements IGetAllCategoryUseCase {
  constructor(
    @inject("ICategoryRepository")
    private readonly _categoryRepository: ICategoryRepository
  ) {}

  async execute(
    dto: GetAllQueryDto,
    parentId: string | null
  ): Promise<{ data: Category[]; total: number }> {
    const { page, search, limit, sortValue, filters } = dto;

    let query: Record<string, any> = {
      parentId: parentId,
    };
    let sort: Record<string, any> = {
      createdAt: -1,
    };

    /* ---------- sorting ---------- */
    if (sortValue && sortValue.trim() !== "" && sortValue === "oldest") {
      sort = { createdAt: 1 };
    } else if (sortValue && sortValue.trim() !== "" && sortValue === "newest") {
      sort = { createdAt: -1 };
    }

    /* ---------- search (name + description) ---------- */
    if (search && search.trim() !== "") {
      const escapedSearch = search
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      query.$or = [
        { name: { $regex: escapedSearch, $options: "i" } },
        { description: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    ///* ---------- filters ---------- */
    if (filters && Object.keys(filters).length > 0) {
      const { isActive } = filters;
      if (isActive !== undefined && isActive !== null) {
        query.isActive = isActive;
      }
    }

    const allDoc: IGetAllDocDB = {
      page,
      limit,
      query,
      sort,
    };

    const [data, total] = await Promise.all([
      this._categoryRepository.findAllForAdmin(allDoc),
      this._categoryRepository.countDocument(query),
    ]);

    return { data, total };
  }
}
