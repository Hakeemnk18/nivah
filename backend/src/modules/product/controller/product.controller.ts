import type { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { handleError } from "../../../core/errors/custom.error.js";

import type { IProductController } from "./product.controller.interface.js";

import type { ICreateProductUseCase } from "../use-cases/interfaces/create.product.use-case.interface.js";
import type { IBlockProductUseCase } from "../use-cases/interfaces/block.product.use-case.interface.js";
import type { IUnblockProductUseCase } from "../use-cases/interfaces/unblock.product.use-case.interface.js";

import {
  CreateProductSchema,
  type CreateProductRequestDto,
} from "../dtos/create.product.dto.js";

import { GetAllQuerySchema } from "../../../core/shared/dtos/get.all.doc.dto.js";
import { validateObjectId } from "../../../core/utils/validate.object.id.helper.js";
import { parseReq } from "../../../core/utils/parse.query.helper.js";
import type { IEditProductUseCase } from "../use-cases/interfaces/edit.product.use-case.interface.js";
import type { IGetAllProductForAdminUseCase } from "../use-cases/interfaces/get.all.product.admin.use-case.interface.js";
import { VariantArraySchema, VariantSchema } from "../dtos/variant.dto.js";
import type { IAddProductVariantUseCase } from "../use-cases/interfaces/add.product.variant.use-case.interface.js";
import type { IEditProductVariantUseCase } from "../use-cases/interfaces/edit.product.variant.use-case.interface.js";
import { EditProductSchema, type EditProductRequestDto } from "../dtos/edit.product.dto.js";

@injectable()
export class ProductController implements IProductController {
  constructor(
    @inject("ICreateProductUseCase")
    private readonly _createProductUseCase: ICreateProductUseCase,

    @inject("IEditProductUseCase")
    private readonly _editProductUseCase: IEditProductUseCase,

    @inject("IBlockProductUseCase")
    private readonly _blockProductUseCase: IBlockProductUseCase,

    @inject("IUnblockProductUseCase")
    private readonly _unblockProductUseCase: IUnblockProductUseCase,

    @inject("IGetAllProductForAdminUseCase")
    private readonly _getAllProductForAdminUseCase: IGetAllProductForAdminUseCase,

    @inject("IAddProductVariantUseCase")
    private readonly _addProductVariantUseCase: IAddProductVariantUseCase,

    @inject("IEditProductVariantUseCase")
    private readonly _editProductVariantUseCase: IEditProductVariantUseCase


  ) {}

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreateProductRequestDto =
        CreateProductSchema.parse(req.body);

      await this._createProductUseCase.execute(dto);

      res.status(HttpStatusCode.CREATED).json({
        success: true,
        message: ResponseMessages.PRODUCT_CREATED_SUCCESS,
      });
    } catch (error) {
      console.log("Error in createProduct:", error);
      handleError(res, error);
    }
  }

  async editProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      validateObjectId(id);

      const dto: EditProductRequestDto =
        EditProductSchema.parse(req.body);

      await this._editProductUseCase.execute(id!, dto);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.PRODUCT_UPDATED_SUCCESS,
      });
    } catch (error) {
      console.log("Error in editProduct:", error);
      handleError(res, error);
    }
  }

  

  async blockProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      validateObjectId(id);

      await this._blockProductUseCase.execute(id!);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.PRODUCT_STATUS_UPDATED_SUCCESS,
      });
    } catch (error) {
      console.log("Error in blockProduct:", error);
      handleError(res, error);
    }
  }

  async unblockProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      validateObjectId(id);

      await this._unblockProductUseCase.execute(id!);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.PRODUCT_STATUS_UPDATED_SUCCESS,
      });
    } catch (error) {
      console.log("Error in unblockProduct:", error);
      handleError(res, error);
    }
  }

  async getAllProductForAdmin(req: Request, res: Response): Promise<void> {
    try {
      const dto = GetAllQuerySchema.parse(parseReq(req, ["isActive", "childCategoryId", "parentCategoryId"]));
      console.log("inside get all ",dto)
      const { data, total } =
        await this._getAllProductForAdminUseCase.execute(dto);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.SUCCESS,
        data,
        totalPages: Math.ceil(total / dto.limit),
      });
    } catch (error) {
      console.log("Error in get products for admin:", error);
      handleError(res, error);
    }
  }

  async addVariant(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params
      validateObjectId(productId)
      const dto = VariantArraySchema.parse(req.body)
      console.log("inside add variant controller ",dto)
      await this._addProductVariantUseCase.execute(productId!, dto)

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.VARIANT_ADD_SUCCESS
      });
    } catch (error) {
      handleError(res, error)
      console.log("error in add variant controller ",error)
    }
  }

  async editVariant(req: Request, res: Response): Promise<void> {
     try {
      const { productId, variantId } = req.params
      validateObjectId(variantId)
      validateObjectId(productId)
      const dto = VariantSchema.parse(req.body)
      await this._editProductVariantUseCase.execute(productId!, variantId!, dto)

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.VARIANT_EDIT_SUCCESS
      });
    } catch (error) {
      handleError(res, error)
      console.log("error in add variant controller ",error)
    }
  }

  async getProductDetailsForAdmin(req: Request, res: Response): Promise<void> {
    try {
      
    } catch (error) {
      
    }
  }
  
}
