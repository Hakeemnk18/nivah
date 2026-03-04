import type { IGetAllDocDB } from "../../../core/shared/interfaces/get.all.doc.interface.js";
import { Category } from "../entities/category.entity.js";
import type { ICategoryRepository } from "./category.repository.interface.js";
import type { IdName } from "../../../core/shared/types/id.name.type.js";
import type { CategorySignature } from "../types/category.type.js";
export declare class CategoryRepository implements ICategoryRepository {
    create(categoryEntity: Category): Promise<Category>;
    findById(id: string): Promise<Category | null>;
    findByNameAndParent(name: string, parentId: string | null): Promise<Category | null>;
    save(categoryEntity: Category): Promise<Category>;
    findAllForAdmin(allDoc: IGetAllDocDB): Promise<Category[]>;
    findAllMainCategoriesForUser(): Promise<Category[]>;
    findSubCategoriesForUser(parentId: string): Promise<Category[]>;
    findSubCategoriesForAdmin(parentId: string): Promise<Category[]>;
    countDocument(query: Record<string, any>): Promise<number>;
    findAllSubCategories(query: Record<string, any>): Promise<IdName[]>;
    findSignatureCategories(): Promise<CategorySignature[]>;
}
//# sourceMappingURL=category.repository.d.ts.map