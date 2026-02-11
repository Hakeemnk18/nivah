import type { GetAllQueryDtoCursor } from "../../../../core/shared/dtos/get.all.doc.dto.js";
import type { UserProductListView } from "../../types/product.type.js";

export interface IGetAllProductForUserUseCase {
    execute(dto: GetAllQueryDtoCursor): Promise<{
        data: UserProductListView[];
        nextCursor: string | null;
        hasMore: boolean;
    }>;
}