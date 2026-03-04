var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import { ITokenService } from "../../core/ports/token.service.interface.js";
import { CustomError } from "../../core/errors/custom.error.js";
import { ResponseMessages } from "../../core/constants/response.message.js";
import { HttpStatusCode } from "../../core/constants/http.status.codes.js";
const sign = jwt.sign.bind(jwt);
const verify = jwt.verify.bind(jwt);
let JwtService = class JwtService {
    accessSecret = process.env.JWT_ACCESS_SECRET;
    refreshSecret = process.env.JWT_REFRESH_SECRET;
    constructor() {
        if (!this.accessSecret || !this.refreshSecret) {
            console.error("JWT environment variables are not set!");
            throw new CustomError(ResponseMessages.JWT_ENV_NOT_SET, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }
    async signAccessToken(payload) {
        return sign(payload, this.accessSecret, { expiresIn: "1m" });
    }
    async signRefreshToken(payload) {
        return sign(payload, this.refreshSecret, { expiresIn: "5m" });
    }
    async verifyAccessToken(token) {
        return verify(token, this.accessSecret);
    }
    async verifyRefreshToken(token) {
        return verify(token, this.refreshSecret);
    }
};
JwtService = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], JwtService);
export { JwtService };
//# sourceMappingURL=jwt.service.js.map