import { container } from "tsyringe";

/* ---------- repository ---------- */
import type { IProductRepository } from "../modules/product/repositories/product.repository.interface.js";
import { ProductRepository } from "../modules/product/repositories/product.repository.js";

/* ---------- use cases ---------- */
import type { ICreateProductUseCase } from "../modules/product/use-cases/interfaces/create.product.use-case.interface.js";
import { CreateProductUseCase } from "../modules/product/use-cases/create.product.use-case.js";

import type { IEditProductUseCase } from "../modules/product/use-cases/interfaces/edit.product.use-case.interface.js";
import { EditProductUseCase } from "../modules/product/use-cases/edit.product.use-case.js";

import type { IBlockProductUseCase } from "../modules/product/use-cases/interfaces/block.product.use-case.interface.js";
import { BlockProductUseCase } from "../modules/product/use-cases/block.product.use-case.js";

import type { IUnblockProductUseCase } from "../modules/product/use-cases/interfaces/unblock.product.use-case.interface.js";
import { UnblockProductUseCase } from "../modules/product/use-cases/unblock.product.use-case.js";

import type { IGetAllProductForAdminUseCase } from "../modules/product/use-cases/interfaces/get.all.product.admin.use-case.interface.js";
import { GetAllProductForAdminUseCase } from "../modules/product/use-cases/get.all.product.admin.use-case.js";

import type { IGetProductForAdminUseCase } from "../modules/product/use-cases/interfaces/get.product.admin.use-case.interface.js";
import { GetProductForAdminUseCase } from "../modules/product/use-cases/get.product.admin.use-case.js";

import type { IGetProductForUserUseCase } from "../modules/product/use-cases/interfaces/get.product.user.use-case.interface.js";
import { GetProductForUserUseCase } from "../modules/product/use-cases/get.product.user.use-case.js";
import type { IAddProductVariantUseCase } from "../modules/product/use-cases/interfaces/add.product.variant.use-case.interface.js";
import { AddProductVariantUseCase } from "../modules/product/use-cases/add.product.variant.use-case.js";
import type { IEditProductVariantUseCase } from "../modules/product/use-cases/interfaces/edit.product.variant.use-case.interface.js";
import { EditProductVariantUseCase } from "../modules/product/use-cases/edit.product.variant.use-case.js";

export const registerProductDependencies = () => {
  /* ---------- repository ---------- */
  container.register<IProductRepository>("IProductRepository", {
    useClass: ProductRepository,
  });

  /* ---------- use cases ---------- */
  container.register<ICreateProductUseCase>("ICreateProductUseCase", {
    useClass: CreateProductUseCase,
  });

  container.register<IEditProductUseCase>("IEditProductUseCase", {
    useClass: EditProductUseCase,
  });

  container.register<IBlockProductUseCase>("IBlockProductUseCase", {
    useClass: BlockProductUseCase,
  });

  container.register<IUnblockProductUseCase>("IUnblockProductUseCase", {
    useClass: UnblockProductUseCase,
  });

  container.register<IGetAllProductForAdminUseCase>(
    "IGetAllProductForAdminUseCase",
    {
      useClass: GetAllProductForAdminUseCase,
    }
  );

  container.register<IGetProductForAdminUseCase>(
    "IGetProductForAdminUseCase",
    {
      useClass: GetProductForAdminUseCase,
    }
  );

  container.register<IGetProductForUserUseCase>(
    "IGetProductForUserUseCase",
    {
      useClass: GetProductForUserUseCase,
    }
  );

  container.register<IAddProductVariantUseCase>(
    "IAddProductVariantUseCase", { useClass: AddProductVariantUseCase }
  )

  container.register<IEditProductVariantUseCase>(
    "IEditProductVariantUseCase", { useClass: EditProductVariantUseCase }
  )
};
