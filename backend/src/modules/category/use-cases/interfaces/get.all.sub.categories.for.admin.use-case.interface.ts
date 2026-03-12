import type { SubCategoryForAdmin } from "../../types/category.type.js";

export interface IGetAllSubCategoriesForAdminUseCase {
  execute(): Promise<SubCategoryForAdmin[]>;
}