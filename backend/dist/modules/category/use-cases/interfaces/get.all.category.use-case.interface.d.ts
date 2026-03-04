import type { GetAllQueryDto } from "../../../../core/shared/dtos/get.all.doc.dto.js";
import type { Category } from "../../entities/category.entity.js";
export interface IGetAllCategoryUseCase {
    execute(dto: GetAllQueryDto, parentId: string | null): Promise<{
        data: Category[];
        total: number;
    }>;
}
//# sourceMappingURL=get.all.category.use-case.interface.d.ts.map