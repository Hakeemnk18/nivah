import { container } from "tsyringe";
import { CategoryRepository } from "../modules/category/repositories/category.repository.js";
import { CreateCategoryUseCase } from "../modules/category/use-cases/create.category.use-case.js";
import { EditCategoryUseCase } from "../modules/category/use-cases/edit.category.use-case.js";
import { BlockCategoryUseCase } from "../modules/category/use-cases/block.category.use-case.js";
import { UnblockCategoryUseCase } from "../modules/category/use-cases/unblock.category.use-case.js";
import { GetAllCategoryUseCase } from "../modules/category/use-cases/get.all.category.use-case.js";
import { GetCategoryByIdUseCase } from "../modules/category/use-cases/get.category.by-id.use-case.js";
import { GetParentCategoryUseCase } from "../modules/category/use-cases/get.parent.category.use-case.js";
import { GetSubCategoryUseCase } from "../modules/category/use-cases/get.sub.category.use-case.js";
import { GetAllSubCategoriesForAdminUseCase } from "../modules/category/use-cases/get.all.sub.categories.for.admin.use-case.js";
import { GetAllSubCategoryForUserUseCase } from "../modules/category/use-cases/get.all.sub.category.for.user.use-case.js";
import { GetSignatureCategoryUseCase } from "../modules/category/use-cases/get.signature.category.use-case.js";
export const registerCategoryDependencies = () => {
    /* ---------- repository ---------- */
    container.register("ICategoryRepository", {
        useClass: CategoryRepository,
    });
    /* ---------- use cases ---------- */
    container.register("ICreateCategoryUseCase", {
        useClass: CreateCategoryUseCase,
    });
    container.register("IEditCategoryUseCase", {
        useClass: EditCategoryUseCase,
    });
    container.register("IBlockCategoryUseCase", {
        useClass: BlockCategoryUseCase,
    });
    container.register("IUnblockCategoryUseCase", {
        useClass: UnblockCategoryUseCase,
    });
    container.register("IGetAllCategoryUseCase", {
        useClass: GetAllCategoryUseCase,
    });
    container.register("IGetCategoryByIdUseCase", {
        useClass: GetCategoryByIdUseCase,
    });
    container.register("IGetParentCategoryUseCase", {
        useClass: GetParentCategoryUseCase,
    });
    container.register("IGetSubCategoryUseCase", {
        useClass: GetSubCategoryUseCase,
    });
    container.register("IGetAllSubCategoriesForAdminUseCase", {
        useClass: GetAllSubCategoriesForAdminUseCase,
    });
    container.register("IGetAllSubCategoryForUserUseCase", {
        useClass: GetAllSubCategoryForUserUseCase,
    });
    container.register("IGetSignatureCategoryUseCase", {
        useClass: GetSignatureCategoryUseCase,
    });
};
//# sourceMappingURL=category.container.js.map