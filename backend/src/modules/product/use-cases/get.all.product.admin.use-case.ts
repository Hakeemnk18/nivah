import { inject, injectable } from "tsyringe";
import type { IGetAllProductForAdminUseCase } from "./interfaces/get.all.product.admin.use-case.interface.js";
import type { GetAllQueryDto } from "../../../core/shared/dtos/get.all.doc.dto.js";
import type { IGetAllDocDB } from "../../../core/shared/interfaces/get.all.doc.interface.js";
import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { ICategoryRepository } from "../../category/repositories/category.repository.interface.js";
import type { ProductListView, ProductView } from "../types/product.type.js";

@injectable()
export class GetAllProductForAdminUseCase implements IGetAllProductForAdminUseCase {
  constructor(
    @inject("IProductRepository")
    private readonly _productRepository: IProductRepository,

    @inject("ICategoryRepository")
    private readonly _categoryRepository: ICategoryRepository,
  ) {}

  async execute(
    dto: GetAllQueryDto,
  ): Promise<{ data: ProductListView[]; total: number }> {
    const { page, search, limit, sortValue, filters } = dto;

    let query: Record<string, any> = {};
    let sort: Record<string, any> = { createdAt: -1 };

    if (filters.parentCategoryId) {
      const { parentCategoryId } = filters;
      const childCategories =
        await this._categoryRepository.findSubCategoriesForAdmin(
          filters.parentCategoryId,
        );

      const childCategoryIds = childCategories.map((category) => category.id);

      query.category = { $in: childCategoryIds };
    }

    /* ---------- sorting ---------- */
    if (sortValue === "oldest") {
      sort = { createdAt: 1 };
    } else if (sortValue === "newest") {
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

    /* ---------- filters ---------- */
    if (filters) {
      if (filters.isActive !== undefined) {
        query.isActive = filters.isActive;
      }

      if (filters.childCategoryId) {
        query.category = filters.childCategoryId;
      }
    }

    const allDoc: IGetAllDocDB = {
      page,
      limit,
      query,
      sort,
    };

    const [data, total] = await Promise.all([
      this._productRepository.findAllForAdmin(allDoc),
      this._productRepository.countDocument(query),
    ]);

    return { data, total };
  }
}
