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
import { injectable, inject } from 'tsyringe';
import { LoginUserSchema } from "../dtos/login.request.dto.js";
import { setAccessTokenCookie, setRefreshTokenCookie } from "../../../core/utils/auth.helpers.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { handleError } from "../../../core/errors/custom.error.js";
let AdminController = class AdminController {
    adminLoginUseCase;
    constructor(adminLoginUseCase) {
        this.adminLoginUseCase = adminLoginUseCase;
    }
    async loginAdminController(req, res) {
        try {
            const dto = LoginUserSchema.parse(req.body);
            const { userData, accessToken, refreshToken } = await this.adminLoginUseCase.execute(dto);
            setAccessTokenCookie(res, accessToken);
            setRefreshTokenCookie(res, refreshToken);
            res.status(HttpStatusCode.OK).json({
                data: userData,
                success: true,
                message: ResponseMessages.LOGIN_SUCCESS
            });
        }
        catch (error) {
            console.log("error in admin login ", error);
            handleError(res, error);
        }
    }
};
AdminController = __decorate([
    injectable(),
    __param(0, inject('IAdminLoginUseCase')),
    __metadata("design:paramtypes", [Object])
], AdminController);
export { AdminController };
//# sourceMappingURL=admin.auth.controller.js.map