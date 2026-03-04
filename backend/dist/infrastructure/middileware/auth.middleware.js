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
import { HttpStatusCode } from "../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../core/constants/response.message.js";
let Authenticate = class Authenticate {
    tokenService;
    userRepo;
    constructor(tokenService, userRepo) {
        this.tokenService = tokenService;
        this.userRepo = userRepo;
    }
    authenticate = async (req, res, next) => {
        const accessToken = req.cookies.access_token;
        if (!accessToken) {
            res
                .status(HttpStatusCode.UNAUTHORIZED)
                .json({ message: ResponseMessages.UNAUTHORIZED });
            return;
        }
        try {
            const decoded = (await this.tokenService.verifyAccessToken(accessToken));
            const user = await this.userRepo.findById(decoded.id);
            if (!user) {
                res
                    .status(HttpStatusCode.FORBIDDEN)
                    .json({ message: ResponseMessages.UNAUTHORIZED });
                return;
            }
            if (user.isBlocked) {
                res
                    .status(HttpStatusCode.FORBIDDEN)
                    .json({ message: ResponseMessages.ACCESS_DENIED });
                return;
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            console.log("inside catch ", error);
            res
                .status(HttpStatusCode.UNAUTHORIZED)
                .json({ message: ResponseMessages.UNAUTHORIZED });
            return;
        }
    };
};
Authenticate = __decorate([
    injectable(),
    __param(0, inject("ITokenService")),
    __param(1, inject("IUserRepository")),
    __metadata("design:paramtypes", [Function, Object])
], Authenticate);
export { Authenticate };
//# sourceMappingURL=auth.middleware.js.map