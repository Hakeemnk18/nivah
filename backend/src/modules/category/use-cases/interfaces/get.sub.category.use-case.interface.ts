import type { IdName } from "../../../../core/shared/types/id.name.type.js";


export interface IGetSubCategoryUseCase {
  execute(parentId: string): Promise<IdName[]>;
}