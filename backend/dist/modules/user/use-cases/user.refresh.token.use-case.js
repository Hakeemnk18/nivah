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
import { CustomError } from "../../../core/errors/custom.error.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
let UserRefreshTokenUseCase = class UserRefreshTokenUseCase {
    _tokenService;
    _userRepository;
    constructor(_tokenService, _userRepository) {
        this._tokenService = _tokenService;
        this._userRepository = _userRepository;
    }
    async execute(refresh_Token) {
        if (!refresh_Token) {
            console.log("no refresh token");
            throw new CustomError(ResponseMessages.REFRESH_TOKEN_REQUIRED, HttpStatusCode.BAD_REQUEST);
        }
        const decoded = (await this._tokenService.verifyRefreshToken(refresh_Token));
        const user = await this._userRepository.findById(decoded.id);
        if (!user) {
            throw new CustomError(ResponseMessages.USER_NOT_FOUND, HttpStatusCode.FORBIDDEN);
        }
        if (user.tokenVersion !== decoded.tokenVersion) {
            throw new CustomError(ResponseMessages.REFRESH_TOKEN_INVALID, HttpStatusCode.FORBIDDEN);
        }
        if (user.isBlocked) {
            throw new CustomError(ResponseMessages.USER_NOT_VERIFIED, HttpStatusCode.FORBIDDEN);
        }
        const updateUser = user.incrementTokenVersion();
        const newUser = await this._userRepository.save(updateUser);
        const tokenPayload = { id: newUser.id, role: newUser.role };
        const refreshTokenPlayLoad = { id: newUser.id, role: newUser.role, tokenVersion: newUser.tokenVersion };
        const accessToken = await this._tokenService.signAccessToken(tokenPayload);
        const refreshToken = await this._tokenService.signRefreshToken(refreshTokenPlayLoad);
        const responseData = {
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        };
        return { userData: responseData, accessToken, refreshToken };
    }
};
UserRefreshTokenUseCase = __decorate([
    injectable(),
    __param(0, inject("ITokenService")),
    __param(1, inject("IUserRepository")),
    __metadata("design:paramtypes", [Function, Object])
], UserRefreshTokenUseCase);
export { UserRefreshTokenUseCase };
//# sourceMappingURL=user.refresh.token.use-case.js.map