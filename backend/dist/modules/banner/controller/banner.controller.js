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
import { validateObjectId } from "../../../core/utils/validate.object.id.helper.js";
import { CreateBannerSchema, EditBannerSchema, } from "../dtos/banner.dto.js";
import { BannerMapper } from "../mappers/banner.mapper.js";
let BannerController = class BannerController {
    _createBannerUseCase;
    _editBannerUseCase;
    _blockBannerUseCase;
    _unblockBannerUseCase;
    _getBannerUserUseCase;
    _getBannerAdminUseCase;
    _getBannerByIdUseCase;
    constructor(_createBannerUseCase, _editBannerUseCase, _blockBannerUseCase, _unblockBannerUseCase, _getBannerUserUseCase, _getBannerAdminUseCase, _getBannerByIdUseCase) {
        this._createBannerUseCase = _createBannerUseCase;
        this._editBannerUseCase = _editBannerUseCase;
        this._blockBannerUseCase = _blockBannerUseCase;
        this._unblockBannerUseCase = _unblockBannerUseCase;
        this._getBannerUserUseCase = _getBannerUserUseCase;
        this._getBannerAdminUseCase = _getBannerAdminUseCase;
        this._getBannerByIdUseCase = _getBannerByIdUseCase;
    }
    async createBanner(req, res) {
        try {
            const dto = CreateBannerSchema.parse(req.body);
            await this._createBannerUseCase.execute(dto);
            res.status(HttpStatusCode.CREATED).json({
                success: true,
                message: ResponseMessages.BANNER_CREATED,
            });
        }
        catch (error) {
            console.log("Error in createBanner:", error);
            handleError(res, error);
        }
    }
    async editBanner(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            const dto = EditBannerSchema.parse(req.body);
            await this._editBannerUseCase.execute(id, dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.BANNER_UPDATED,
            });
        }
        catch (error) {
            console.log("Error in editBanner:", error);
            handleError(res, error);
        }
    }
    async blockBanner(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            await this._blockBannerUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.BANNER_DEACTIVATED_SUCCESSFULLY,
            });
        }
        catch (error) {
            console.log("Error in blockBanner:", error);
            handleError(res, error);
        }
    }
    async unblockBanner(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            await this._unblockBannerUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.BANNER_ACTIVATED_SUCCESSFULLY,
            });
        }
        catch (error) {
            console.log("Error in unblockBanner:", error);
            handleError(res, error);
        }
    }
    async getBannerForAdmin(req, res) {
        try {
            const data = await this._getBannerAdminUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: data ? [data] : null,
            });
        }
        catch (error) {
            console.log("Error in getBannerForAdmin:", error);
            handleError(res, error);
        }
    }
    async getBannerForUser(req, res) {
        try {
            const data = await this._getBannerUserUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: data,
            });
        }
        catch (error) {
            console.log("Error in getBannerForUser:", error);
            handleError(res, error);
        }
    }
    async getBannerById(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            const data = await this._getBannerByIdUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: data,
            });
        }
        catch (error) {
            console.log("Error in getBannerById:", error);
            handleError(res, error);
        }
    }
};
BannerController = __decorate([
    injectable(),
    __param(0, inject("ICreateBannerUseCase")),
    __param(1, inject("IEditBannerUseCase")),
    __param(2, inject("IBlockBannerUseCase")),
    __param(3, inject("IUnblockBannerUseCase")),
    __param(4, inject("IGetBannerUserUseCase")),
    __param(5, inject("IGetBannerAdminUseCase")),
    __param(6, inject("IGetBannerByIdUseCase")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], BannerController);
export { BannerController };
//# sourceMappingURL=banner.controller.js.map