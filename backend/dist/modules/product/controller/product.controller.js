var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "tsyringe";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { handleError } from "../../../core/errors/custom.error.js";
import { CreateProductSchema, } from "../dtos/create.product.dto.js";
import { GetAllQuerySchema } from "../../../core/shared/dtos/get.all.doc.dto.js";
import { validateObjectId } from "../../../core/utils/validate.object.id.helper.js";
import { parseReq } from "../../../core/utils/parse.query.helper.js";
import { UpdateVariantSchema, VariantArraySchema, VariantSchema } from "../dtos/variant.dto.js";
import { EditProductSchema } from "../dtos/edit.product.dto.js";
import console from "console";
let ProductController = class ProductController {
    _createProductUseCase;
    _editProductUseCase;
    _blockProductUseCase;
    _unblockProductUseCase;
    _getAllProductForAdminUseCase;
    _addProductVariantUseCase;
    _editProductVariantUseCase;
    _getProductDetailsForAdminUseCase;
    _getProductVariantForAdminUseCase;
    _getFeaturedProductUseCase;
    _getAllProductForUserUseCase;
    _getProductForUserUseCase;
    _getRelatedProductUseCase;
    _getProductVariantForUserUseCase;
    constructor(_createProductUseCase, _editProductUseCase, _blockProductUseCase, _unblockProductUseCase, _getAllProductForAdminUseCase, _addProductVariantUseCase, _editProductVariantUseCase, _getProductDetailsForAdminUseCase, _getProductVariantForAdminUseCase, _getFeaturedProductUseCase, _getAllProductForUserUseCase, _getProductForUserUseCase, _getRelatedProductUseCase, _getProductVariantForUserUseCase) {
        this._createProductUseCase = _createProductUseCase;
        this._editProductUseCase = _editProductUseCase;
        this._blockProductUseCase = _blockProductUseCase;
        this._unblockProductUseCase = _unblockProductUseCase;
        this._getAllProductForAdminUseCase = _getAllProductForAdminUseCase;
        this._addProductVariantUseCase = _addProductVariantUseCase;
        this._editProductVariantUseCase = _editProductVariantUseCase;
        this._getProductDetailsForAdminUseCase = _getProductDetailsForAdminUseCase;
        this._getProductVariantForAdminUseCase = _getProductVariantForAdminUseCase;
        this._getFeaturedProductUseCase = _getFeaturedProductUseCase;
        this._getAllProductForUserUseCase = _getAllProductForUserUseCase;
        this._getProductForUserUseCase = _getProductForUserUseCase;
        this._getRelatedProductUseCase = _getRelatedProductUseCase;
        this._getProductVariantForUserUseCase = _getProductVariantForUserUseCase;
    }
    async createProduct(req, res) {
        try {
            const dto = CreateProductSchema.parse(req.body);
            await this._createProductUseCase.execute(dto);
            res.status(HttpStatusCode.CREATED).json({
                success: true,
                message: ResponseMessages.PRODUCT_CREATED_SUCCESS,
            });
        }
        catch (error) {
            console.log("Error in createProduct:", error);
            handleError(res, error);
        }
    }
    async editProduct(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            const dto = EditProductSchema.parse(req.body);
            await this._editProductUseCase.execute(id, dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.PRODUCT_UPDATED_SUCCESS,
            });
        }
        catch (error) {
            console.log("Error in editProduct:", error);
            handleError(res, error);
        }
    }
    async blockProduct(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            await this._blockProductUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.PRODUCT_STATUS_UPDATED_SUCCESS,
            });
        }
        catch (error) {
            console.log("Error in blockProduct:", error);
            handleError(res, error);
        }
    }
    async unblockProduct(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            await this._unblockProductUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.PRODUCT_STATUS_UPDATED_SUCCESS,
            });
        }
        catch (error) {
            console.log("Error in unblockProduct:", error);
            handleError(res, error);
        }
    }
    async getAllProductForAdmin(req, res) {
        try {
            const dto = GetAllQuerySchema.parse(parseReq(req, ["isActive", "childCategoryId", "parentCategoryId"]));
            const { data, total } = await this._getAllProductForAdminUseCase.execute(dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data,
                totalPages: Math.ceil(total / dto.limit),
            });
        }
        catch (error) {
            console.log("Error in get products for admin:", error);
            handleError(res, error);
        }
    }
    async addVariant(req, res) {
        try {
            const { productId } = req.params;
            validateObjectId(productId);
            const dto = VariantArraySchema.parse(req.body);
            await this._addProductVariantUseCase.execute(productId, dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.VARIANT_ADD_SUCCESS
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in add variant controller ", error);
        }
    }
    async editVariant(req, res) {
        try {
            const { productId, variantId } = req.params;
            validateObjectId(variantId);
            validateObjectId(productId);
            const dto = UpdateVariantSchema.parse(req.body);
            await this._editProductVariantUseCase.execute(productId, variantId, dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.VARIANT_EDIT_SUCCESS
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in variant controller ", error);
        }
    }
    async getProductDetailsForAdmin(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            const data = await this._getProductDetailsForAdminUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get product details for admin controller ", error);
        }
    }
    async getAdminProductVariant(req, res) {
        try {
            const { productId, variantId } = req.params;
            validateObjectId(variantId);
            validateObjectId(productId);
            const data = await this._getProductVariantForAdminUseCase.execute(productId, variantId);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get product variant for admin controller ", error);
        }
    }
    async getFeaturedProducts(req, res) {
        try {
            const data = await this._getFeaturedProductUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get featured products controller ", error);
        }
    }
    async getAllProductForUser(req, res) {
        try {
            const dto = GetAllQuerySchema.parse(parseReq(req, ["childCategoryId", "parentCategoryId"]));
            const result = await this._getAllProductForUserUseCase.execute(dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                ...result,
            });
        }
        catch (error) {
            console.log("Error in get products for user:", error);
            handleError(res, error);
        }
    }
    async getProductDetailsForUser(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            const data = await this._getProductForUserUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get product details for user controller ", error);
        }
    }
    async getRelatedProducts(req, res) {
        try {
            const { categoryId } = req.params;
            validateObjectId(categoryId);
            const data = await this._getRelatedProductUseCase.execute(categoryId);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get related products controller ", error);
        }
    }
    async getProductVariantForUser(req, res) {
        try {
            const { productId, variantId } = req.params;
            validateObjectId(variantId);
            validateObjectId(productId);
            const data = await this._getProductVariantForUserUseCase.execute(productId, variantId);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data,
            });
        }
        catch (error) {
            handleError(res, error);
            console.log("error in get product variant for user controller ", error);
        }
    }
};
ProductController = __decorate([
    injectable(),
    __param(0, inject("ICreateProductUseCase")),
    __param(1, inject("IEditProductUseCase")),
    __param(2, inject("IBlockProductUseCase")),
    __param(3, inject("IUnblockProductUseCase")),
    __param(4, inject("IGetAllProductForAdminUseCase")),
    __param(5, inject("IAddProductVariantUseCase")),
    __param(6, inject("IEditProductVariantUseCase")),
    __param(7, inject("IGetProductDetailsForAdminUseCase")),
    __param(8, inject("IGetProductVariantForAdmin")),
    __param(9, inject("IGetFeaturedProductUseCase")),
    __param(10, inject("IGetAllProductForUserUseCase")),
    __param(11, inject("IGetProductForUserUseCase")),
    __param(12, inject("IGetRelatedProductUseCase")),
    __param(13, inject("IGetProductVariantForUserUseCase")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], ProductController);
export { ProductController };
//# sourceMappingURL=product.controller.js.map