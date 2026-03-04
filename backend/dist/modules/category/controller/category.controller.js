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
import { CreateCategorySchema, } from "../dtos/create.category.dto.js";
import { GetAllQuerySchema } from "../../../core/shared/dtos/get.all.doc.dto.js";
import { validateObjectId } from "../../../core/utils/validate.object.id.helper.js";
import { parseReq } from "../../../core/utils/parse.query.helper.js";
let CategoryController = class CategoryController {
    _createCategoryUseCase;
    _editCategoryUseCase;
    _blockCategoryUseCase;
    _unblockCategoryUseCase;
    _getAllCategoryUseCase;
    _getParentCategoryUseCase;
    _getSubCategoryUseCase;
    _getCategoryByIdUseCase;
    _getAllSubCategoriesForAdminUseCase;
    _getAllSubCategoryForUserUseCase;
    _getSignatureCategoryUseCase;
    constructor(_createCategoryUseCase, _editCategoryUseCase, _blockCategoryUseCase, _unblockCategoryUseCase, _getAllCategoryUseCase, _getParentCategoryUseCase, _getSubCategoryUseCase, _getCategoryByIdUseCase, _getAllSubCategoriesForAdminUseCase, _getAllSubCategoryForUserUseCase, _getSignatureCategoryUseCase) {
        this._createCategoryUseCase = _createCategoryUseCase;
        this._editCategoryUseCase = _editCategoryUseCase;
        this._blockCategoryUseCase = _blockCategoryUseCase;
        this._unblockCategoryUseCase = _unblockCategoryUseCase;
        this._getAllCategoryUseCase = _getAllCategoryUseCase;
        this._getParentCategoryUseCase = _getParentCategoryUseCase;
        this._getSubCategoryUseCase = _getSubCategoryUseCase;
        this._getCategoryByIdUseCase = _getCategoryByIdUseCase;
        this._getAllSubCategoriesForAdminUseCase = _getAllSubCategoriesForAdminUseCase;
        this._getAllSubCategoryForUserUseCase = _getAllSubCategoryForUserUseCase;
        this._getSignatureCategoryUseCase = _getSignatureCategoryUseCase;
    }
    async createCategory(req, res) {
        try {
            const dto = CreateCategorySchema.parse(req.body);
            await this._createCategoryUseCase.execute(dto);
            res.status(HttpStatusCode.CREATED).json({
                success: true,
                message: ResponseMessages.CATEGORY_CREATED_SUCCESS,
            });
        }
        catch (error) {
            console.log("Error in createCategory:", error);
            handleError(res, error);
        }
    }
    async editCategory(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            const dto = CreateCategorySchema.parse(req.body);
            await this._editCategoryUseCase.execute(id, dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.CATEGORY_UPDATED_SUCCESS,
            });
        }
        catch (error) {
            console.log("Error in editCategory:", error);
            handleError(res, error);
        }
    }
    async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            const category = await this._getCategoryByIdUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: category,
            });
        }
        catch (error) {
            console.log("Error in getCategoryById:", error);
            handleError(res, error);
        }
    }
    async blockCategory(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            await this._blockCategoryUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.CATEGORY_STATUS_UPDATED_SUCCESS,
            });
        }
        catch (error) {
            console.log("Error in blockCategory:", error);
            handleError(res, error);
        }
    }
    async unblockCategory(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            await this._unblockCategoryUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.CATEGORY_STATUS_UPDATED_SUCCESS,
            });
        }
        catch (error) {
            console.log("Error in unblockCategory:", error);
            handleError(res, error);
        }
    }
    async getAllParentCategoryForAdmin(req, res) {
        try {
            const dto = GetAllQuerySchema.parse(parseReq(req, ["isActive"]));
            const { data, total } = await this._getAllCategoryUseCase.execute(dto, null);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data,
                totalPages: Math.ceil(total / dto.limit),
            });
        }
        catch (error) {
            console.log("Error in get categories for admin:", error);
            handleError(res, error);
        }
    }
    async getAllSubCategoryForAdminById(req, res) {
        try {
            const { parentId } = req.params;
            validateObjectId(parentId);
            const dto = GetAllQuerySchema.parse(parseReq(req, ["isActive"]));
            const { data, total } = await this._getAllCategoryUseCase.execute(dto, parentId);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data,
                totalPages: Math.ceil(total / dto.limit),
            });
        }
        catch (error) {
            console.log("Error in get categories for admin:", error);
            handleError(res, error);
        }
    }
    async getParentCategories(req, res) {
        try {
            const categories = await this._getParentCategoryUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: categories,
            });
        }
        catch (error) {
            console.log("Error in get parent categories:", error);
            handleError(res, error);
        }
    }
    async getSubCategories(req, res) {
        try {
            const { parentId } = req.params;
            validateObjectId(parentId);
            const categories = await this._getSubCategoryUseCase.execute(parentId);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: categories,
            });
        }
        catch (error) {
            console.log("Error in get sub categories:", error);
            handleError(res, error);
        }
    }
    async getAllSubCategoryForAdmin(req, res) {
        try {
            const data = await this._getAllSubCategoriesForAdminUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data,
            });
        }
        catch (error) {
            console.log("Error in get sub categories for admin:", error);
            handleError(res, error);
        }
    }
    async getAllSubCategoryForUser(req, res) {
        try {
            const data = await this._getAllSubCategoryForUserUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data,
            });
        }
        catch (error) {
            console.log("Error in get sub categories for user:", error);
            handleError(res, error);
        }
    }
    async getSignatureCategories(req, res) {
        try {
            const data = await this._getSignatureCategoryUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data,
            });
        }
        catch (error) {
            console.log("Error in get signature categories:", error);
            handleError(res, error);
        }
    }
};
CategoryController = __decorate([
    injectable(),
    __param(0, inject("ICreateCategoryUseCase")),
    __param(1, inject("IEditCategoryUseCase")),
    __param(2, inject("IBlockCategoryUseCase")),
    __param(3, inject("IUnblockCategoryUseCase")),
    __param(4, inject("IGetAllCategoryUseCase")),
    __param(5, inject("IGetParentCategoryUseCase")),
    __param(6, inject("IGetSubCategoryUseCase")),
    __param(7, inject("IGetCategoryByIdUseCase")),
    __param(8, inject("IGetAllSubCategoriesForAdminUseCase")),
    __param(9, inject("IGetAllSubCategoryForUserUseCase")),
    __param(10, inject("IGetSignatureCategoryUseCase")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], CategoryController);
export { CategoryController };
//# sourceMappingURL=category.controller.js.map