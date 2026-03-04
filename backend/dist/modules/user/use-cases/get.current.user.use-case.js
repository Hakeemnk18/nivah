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
let GetCurrentUserUseCase = class GetCurrentUserUseCase {
    _userRepository;
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async execute(id) {
        const user = await this._userRepository.findById(id);
        if (!user) {
            throw new CustomError(ResponseMessages.INVALID_CREDENTIALS, HttpStatusCode.FORBIDDEN);
        }
        const userData = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
        return userData;
    }
};
GetCurrentUserUseCase = __decorate([
    injectable(),
    __param(0, inject("IUserRepository")),
    __metadata("design:paramtypes", [Object])
], GetCurrentUserUseCase);
export { GetCurrentUserUseCase };
//# sourceMappingURL=get.current.user.use-case.js.map