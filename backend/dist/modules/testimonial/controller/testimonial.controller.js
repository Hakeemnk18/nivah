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
import { CreateTestimonialSchema, EditTestimonialSchema, } from "../dtos/testimonial.dto.js";
import { TestimonialMapper } from "../mappers/testimonial.mapper.js";
let TestimonialController = class TestimonialController {
    _createTestimonialUseCase;
    _editTestimonialUseCase;
    _blockTestimonialUseCase;
    _unblockTestimonialUseCase;
    _getTestimonialsForUserUseCase;
    _getTestimonialsForAdminUseCase;
    _getTestimonialByIdUseCase;
    constructor(_createTestimonialUseCase, _editTestimonialUseCase, _blockTestimonialUseCase, _unblockTestimonialUseCase, _getTestimonialsForUserUseCase, _getTestimonialsForAdminUseCase, _getTestimonialByIdUseCase) {
        this._createTestimonialUseCase = _createTestimonialUseCase;
        this._editTestimonialUseCase = _editTestimonialUseCase;
        this._blockTestimonialUseCase = _blockTestimonialUseCase;
        this._unblockTestimonialUseCase = _unblockTestimonialUseCase;
        this._getTestimonialsForUserUseCase = _getTestimonialsForUserUseCase;
        this._getTestimonialsForAdminUseCase = _getTestimonialsForAdminUseCase;
        this._getTestimonialByIdUseCase = _getTestimonialByIdUseCase;
    }
    async createTestimonial(req, res) {
        try {
            const dto = CreateTestimonialSchema.parse(req.body);
            await this._createTestimonialUseCase.execute(dto);
            res.status(HttpStatusCode.CREATED).json({
                success: true,
                message: ResponseMessages.TESTIMONIAL_CREATED,
            });
        }
        catch (error) {
            console.log("Error in createTestimonial:", error);
            handleError(res, error);
        }
    }
    async editTestimonial(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            const dto = EditTestimonialSchema.parse(req.body);
            await this._editTestimonialUseCase.execute(id, dto);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.TESTIMONIAL_UPDATED,
            });
        }
        catch (error) {
            console.log("Error in editTestimonial:", error);
            handleError(res, error);
        }
    }
    async blockTestimonial(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            await this._blockTestimonialUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.TESTIMONIAL_DEACTIVATED_SUCCESSFULLY,
            });
        }
        catch (error) {
            console.log("Error in blockTestimonial:", error);
            handleError(res, error);
        }
    }
    async unblockTestimonial(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            await this._unblockTestimonialUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.TESTIMONIAL_ACTIVATED_SUCCESSFULLY,
            });
        }
        catch (error) {
            console.log("Error in unblockTestimonial:", error);
            handleError(res, error);
        }
    }
    async getTestimonialsForAdmin(req, res) {
        try {
            const data = await this._getTestimonialsForAdminUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: data,
            });
        }
        catch (error) {
            console.log("Error in getTestimonialsForAdmin:", error);
            handleError(res, error);
        }
    }
    async getTestimonialsForUser(req, res) {
        try {
            const data = await this._getTestimonialsForUserUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data,
            });
        }
        catch (error) {
            console.log("Error in getTestimonialsForUser:", error);
            handleError(res, error);
        }
    }
    async getTestimonialById(req, res) {
        try {
            const { id } = req.params;
            validateObjectId(id);
            const data = await this._getTestimonialByIdUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data: data,
            });
        }
        catch (error) {
            console.log("Error in getTestimonialById:", error);
            handleError(res, error);
        }
    }
};
TestimonialController = __decorate([
    injectable(),
    __param(0, inject("ICreateTestimonialUseCase")),
    __param(1, inject("IEditTestimonialUseCase")),
    __param(2, inject("IBlockTestimonialUseCase")),
    __param(3, inject("IUnblockTestimonialUseCase")),
    __param(4, inject("IGetTestimonialsForUserUseCase")),
    __param(5, inject("IGetTestimonialsForAdminUseCase")),
    __param(6, inject("IGetTestimonialByIdUseCase")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], TestimonialController);
export { TestimonialController };
//# sourceMappingURL=testimonial.controller.js.map