import { container } from "tsyringe";
import { ProductRepository } from "../modules/product/repositories/product.repository.js";
import { CreateProductUseCase } from "../modules/product/use-cases/create.product.use-case.js";
import { EditProductUseCase } from "../modules/product/use-cases/edit.product.use-case.js";
import { BlockProductUseCase } from "../modules/product/use-cases/block.product.use-case.js";
import { UnblockProductUseCase } from "../modules/product/use-cases/unblock.product.use-case.js";
import { GetAllProductForAdminUseCase } from "../modules/product/use-cases/get.all.product.admin.use-case.js";
import { GetProductDetailsForAdminUseCase } from "../modules/product/use-cases/get.product.admin.use-case.js";
import { GetProductForUserUseCase } from "../modules/product/use-cases/get.product.user.use-case.js";
import { AddProductVariantUseCase } from "../modules/product/use-cases/add.product.variant.use-case.js";
import { EditProductVariantUseCase } from "../modules/product/use-cases/edit.product.variant.use-case.js";
import { GetProductVariantForAdmin } from "../modules/product/use-cases/get.product.variant.for.admin.js";
import { GetFeaturedProductUseCase } from "../modules/product/use-cases/get.fetured.product.use-case.js";
import { GetAllProductForUserUseCase } from "../modules/product/use-cases/get.all.product.user.use-case.js";
import { GetRelatedProductUseCase } from "../modules/product/use-cases/get.related.product.use-case.js";
import { GetProductVariantForUserUseCase } from "../modules/product/use-cases/get.product.variant.for.user.use-case.js";
export const registerProductDependencies = () => {
    /* ---------- repository ---------- */
    container.register("IProductRepository", {
        useClass: ProductRepository,
    });
    /* ---------- use cases ---------- */
    container.register("ICreateProductUseCase", {
        useClass: CreateProductUseCase,
    });
    container.register("IEditProductUseCase", {
        useClass: EditProductUseCase,
    });
    container.register("IBlockProductUseCase", {
        useClass: BlockProductUseCase,
    });
    container.register("IUnblockProductUseCase", {
        useClass: UnblockProductUseCase,
    });
    container.register("IGetAllProductForAdminUseCase", {
        useClass: GetAllProductForAdminUseCase,
    });
    container.register("IGetProductDetailsForAdminUseCase", {
        useClass: GetProductDetailsForAdminUseCase,
    });
    container.register("IGetProductForUserUseCase", {
        useClass: GetProductForUserUseCase,
    });
    container.register("IAddProductVariantUseCase", { useClass: AddProductVariantUseCase });
    container.register("IEditProductVariantUseCase", { useClass: EditProductVariantUseCase });
    container.register("IGetProductVariantForAdmin", { useClass: GetProductVariantForAdmin });
    container.register("IGetFeaturedProductUseCase", { useClass: GetFeaturedProductUseCase });
    container.register("IGetAllProductForUserUseCase", { useClass: GetAllProductForUserUseCase });
    container.register("IGetProductVariantForUserUseCase", { useClass: GetProductVariantForUserUseCase });
    container.register("IGetRelatedProductUseCase", { useClass: GetRelatedProductUseCase });
};
//# sourceMappingURL=product.container.js.map