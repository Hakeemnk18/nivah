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
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
let UnblockHeroUseCase = class UnblockHeroUseCase {
    _heroRepository;
    constructor(_heroRepository) {
        this._heroRepository = _heroRepository;
    }
    async execute(id) {
        const hero = await this._heroRepository.findById(id);
        if (!hero) {
            throw new CustomError(ResponseMessages.HERO_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        if (hero.isActive) {
            throw new CustomError(ResponseMessages.HERO_ALREADY_ACTIVATED, HttpStatusCode.BAD_REQUEST);
        }
        const updatedHero = hero.activate();
        const saved = await this._heroRepository.save(updatedHero);
        if (!saved) {
            throw new CustomError(ResponseMessages.HERO_ACTIVATE_FAILED, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }
};
UnblockHeroUseCase = __decorate([
    injectable(),
    __param(0, inject("IHeroRepository")),
    __metadata("design:paramtypes", [Object])
], UnblockHeroUseCase);
export { UnblockHeroUseCase };
//# sourceMappingURL=unblock.hero.use-case.js.map