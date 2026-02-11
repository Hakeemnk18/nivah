import { inject, injectable } from "tsyringe";
import type { IGetAllProductForUserUseCase } from "./interfaces/get.all.product.user.use-case.interface.js";
import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { ICategoryRepository } from "../../category/repositories/category.repository.interface.js";
import type { GetAllQueryDtoCursor } from "../../../core/shared/dtos/get.all.doc.dto.js";
import type { UserProductListView } from "../types/product.type.js";

@injectable()
export class GetAllProductForUserUseCase
    implements IGetAllProductForUserUseCase {
    constructor(
        @inject("IProductRepository")
        private readonly _productRepository: IProductRepository,

        @inject("ICategoryRepository")
        private readonly _categoryRepository: ICategoryRepository,
    ) { }

    async execute(dto: GetAllQueryDtoCursor): Promise<{
        data: UserProductListView[];
        nextCursor: string | null;
        hasMore: boolean;
    }> {
        const { search, limit, sortValue, filters, cursor } = dto;

        let query: Record<string, any> = {
            isActive: true,
        };

        let sort: Record<string, any> = { _id: -1 };

        /* ---------- category filter ---------- */
        if (filters.parentCategoryId) {
            const childCategories =
                await this._categoryRepository.findSubCategoriesForUser(
                    filters.parentCategoryId,
                );

            query.category = {
                $in: childCategories.map((c) => c.id),
            };
        }

        if (filters.childCategoryId) {
            query.category = filters.childCategoryId;
        }

        /* ---------- sorting ---------- */
        if (sortValue === "oldest") {
            sort = { _id: 1 };
        } else if (sortValue === "newest") {
            sort = { _id: -1 };
        } else if (sortValue === "price_low_high") {
            sort = { "variants.0.price": 1, _id: 1 };
        } else if (sortValue === "price_high_low") {
            sort = { "variants.0.price": -1, _id: -1 };
        }

        /* ---------- search ---------- */
        if (search && search.trim() !== "") {
            const escapedSearch = search
                .trim()
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            query.$or = [
                { name: { $regex: escapedSearch, $options: "i" } },
                { description: { $regex: escapedSearch, $options: "i" } },
            ];
        }

        return this._productRepository.findAllForUser({
            query,
            limit,
            sort,
            cursor,
        });
    }
}