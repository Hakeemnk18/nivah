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
import { injectable, inject } from "tsyringe";
import { CustomError } from "../../../core/errors/custom.error.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { IHashingService } from "../../../core/ports/hashing.service.interface.js";
import { ITokenService } from "../../../core/ports/token.service.interface.js";
let AdminLoginUseCase = class AdminLoginUseCase {
    _userRepository;
    _hashService;
    _tokenService;
    constructor(_userRepository, _hashService, _tokenService) {
        this._userRepository = _userRepository;
        this._hashService = _hashService;
        this._tokenService = _tokenService;
    }
    async execute(dto) {
        const user = await this._userRepository.findByEmail(dto.email);
        if (!user) {
            throw new CustomError(ResponseMessages.INVALID_CREDENTIALS, HttpStatusCode.BAD_REQUEST);
        }
        const isValid = await this._hashService.compare(dto.password, user.password);
        if (!isValid) {
            throw new CustomError(ResponseMessages.INVALID_CREDENTIALS, HttpStatusCode.BAD_REQUEST);
        }
        if (!user.isVerified) {
            throw new CustomError(ResponseMessages.USER_NOT_VERIFIED, HttpStatusCode.BAD_REQUEST);
        }
        if (user.isBlocked) {
            throw new CustomError(ResponseMessages.ACCESS_DENIED, HttpStatusCode.BAD_REQUEST);
        }
        if (user.role !== 'admin') {
            throw new CustomError(ResponseMessages.UNAUTHORIZED, HttpStatusCode.BAD_REQUEST);
        }
        const tokenPayload = { id: user.id, role: user.role };
        const refreshTokenPlayLoad = { id: user.id, role: user.role, tokenVersion: user.tokenVersion };
        const accessToken = await this._tokenService.signAccessToken(tokenPayload);
        const refreshToken = await this._tokenService.signRefreshToken(refreshTokenPlayLoad);
        const responseData = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
        return { userData: responseData, accessToken, refreshToken };
    }
};
AdminLoginUseCase = __decorate([
    injectable(),
    __param(0, inject("IUserRepository")),
    __param(1, inject("IHashingService")),
    __param(2, inject('ITokenService')),
    __metadata("design:paramtypes", [Object, IHashingService,
        ITokenService])
], AdminLoginUseCase);
export { AdminLoginUseCase };
//# sourceMappingURL=admin.login.use-case.js.map