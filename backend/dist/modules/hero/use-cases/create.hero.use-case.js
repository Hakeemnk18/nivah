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
import { Hero } from "../entities/hero.entity.js";
let CreateHeroUseCase = class CreateHeroUseCase {
    _heroRepository;
    constructor(_heroRepository) {
        this._heroRepository = _heroRepository;
    }
    async execute(dto) {
        const documentCount = await this._heroRepository.countDocuments();
        if (documentCount >= 1) {
            throw new CustomError(ResponseMessages.HERO_ALREADY_EXISTS, HttpStatusCode.BAD_REQUEST);
        }
        const heroEntity = new Hero({
            id: null,
            title: dto.title,
            subtitle: dto.subtitle,
            image: dto.image,
            isActive: true,
        });
        const hero = await this._heroRepository.create(heroEntity);
        if (!hero) {
            throw new CustomError(ResponseMessages.HERO_CREATE_FAILED, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }
};
CreateHeroUseCase = __decorate([
    injectable(),
    __param(0, inject("IHeroRepository")),
    __metadata("design:paramtypes", [Object])
], CreateHeroUseCase);
export { CreateHeroUseCase };
//# sourceMappingURL=create.hero.use-case.js.map