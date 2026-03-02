import { inject, injectable } from "tsyringe";
import { CustomError } from "../../../core/errors/custom.error.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { Hero } from "../entities/hero.entity.js";
import type { ICreateHeroUseCase } from "./interfaces/create.hero.use-case.interface.js";
import type { IHeroRepository } from "../repositories/hero.repository.interface.js";
import type { CreateHeroRequestDto } from "../dtos/hero.dto.js";

@injectable()
export class CreateHeroUseCase implements ICreateHeroUseCase {
    constructor(
        @inject("IHeroRepository")
        private readonly _heroRepository: IHeroRepository
    ) { }

    async execute(dto: CreateHeroRequestDto): Promise<void> {
        const documentCount = await this._heroRepository.countDocuments();
        if (documentCount >= 1) {
            throw new CustomError(
                ResponseMessages.HERO_ALREADY_EXISTS,
                HttpStatusCode.BAD_REQUEST
            );
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
            throw new CustomError(
                ResponseMessages.HERO_CREATE_FAILED,
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }
}
