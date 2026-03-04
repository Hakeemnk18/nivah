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
import { handleError } from "../../../core/errors/custom.error.js";
import { validateObjectId } from "../../../core/utils/validate.object.id.helper.js";
import { CreateHeroSchema, EditHeroSchema, } from "../dtos/hero.dto.js";
import { HeroMapper } from "../mappers/hero.mapper.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
let HeroController = class HeroController {
    _createHeroUseCase;
    _editHeroUseCase;
    _blockHeroUseCase;
    _unblockHeroUseCase;
    _getHeroUserUseCase;
    _getHeroAdminUseCase;
    _getHeroByIdUseCase;
    constructor(_createHeroUseCase, _editHeroUseCase, _blockHeroUseCase, _unblockHeroUseCase, _getHeroUserUseCase, _getHeroAdminUseCase, _getHeroByIdUseCase) {
        this._createHeroUseCase = _createHeroUseCase;
        this._editHeroUseCase = _editHeroUseCase;
        this._blockHeroUseCase = _blockHeroUseCase;
        this._unblockHeroUseCase = _unblockHeroUseCase;
        this._getHeroUserUseCase = _getHeroUserUseCase;
        this._getHeroAdminUseCase = _getHeroAdminUseCase;
        this._getHeroByIdUseCase = _getHeroByIdUseCase;
    }
    async createHero(req, res) {
        try {
            const dto = CreateHeroSchema.parse(req.body);
            await this._createHeroUseCase.execute(dto);
            res.status(HttpStatusCode.CREATED).json({
                success: true,
                message: ResponseMessages.HERO_CREATED,
            });
        }
        catch (error) {
            console.log("Error in createHero:", error);
            handleError(res, error);
        }
    }
    async editHero(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            const dto = EditHeroSchema.parse(req.body);
            await this._editHeroUseCase.execute(id, dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.HERO_UPDATED,
            });
        }
        catch (error) {
            console.log("Error in editHero:", error);
            handleError(res, error);
        }
    }
    async blockHero(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            await this._blockHeroUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.HERO_DEACTIVATED_SUCCESSFULLY,
            });
        }
        catch (error) {
            console.log("Error in blockHero:", error);
            handleError(res, error);
        }
    }
    async unblockHero(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            await this._unblockHeroUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.HERO_ACTIVATED_SUCCESSFULLY,
            });
        }
        catch (error) {
            console.log("Error in unblockHero:", error);
            handleError(res, error);
        }
    }
    async getHeroForAdmin(req, res) {
        try {
            const data = await this._getHeroAdminUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.HERO_FETCHED_SUCCESSFULLY,
                data: data ? [data] : null,
            });
        }
        catch (error) {
            console.log("Error in getHeroForAdmin:", error);
            handleError(res, error);
        }
    }
    async getHeroForUser(req, res) {
        try {
            const data = await this._getHeroUserUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: data,
            });
        }
        catch (error) {
            console.log("Error in getHeroForUser:", error);
            handleError(res, error);
        }
    }
    async getHeroById(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            const data = await this._getHeroByIdUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.HERO_FETCHED_SUCCESSFULLY,
                data: data,
            });
        }
        catch (error) {
            console.log("Error in getHeroById:", error);
            handleError(res, error);
        }
    }
};
HeroController = __decorate([
    injectable(),
    __param(0, inject("ICreateHeroUseCase")),
    __param(1, inject("IEditHeroUseCase")),
    __param(2, inject("IBlockHeroUseCase")),
    __param(3, inject("IUnblockHeroUseCase")),
    __param(4, inject("IGetHeroUserUseCase")),
    __param(5, inject("IGetHeroAdminUseCase")),
    __param(6, inject("IGetHeroByIdUseCase")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], HeroController);
export { HeroController };
//# sourceMappingURL=hero.controller.js.map