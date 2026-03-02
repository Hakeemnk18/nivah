import { inject, injectable } from "tsyringe";
import { CustomError } from "../../../core/errors/custom.error.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";

import { Banner } from "../entities/banner.entity.js";
import type { ICreateBannerUseCase } from "./interfaces/create.banner.use-case.interface.js";
import type { IBannerRepository } from "../repositories/banner.repository.interface.js";
import type { CreateBannerRequestDto } from "../dtos/banner.dto.js";

@injectable()
export class CreateBannerUseCase implements ICreateBannerUseCase {
    constructor(
        @inject("IBannerRepository")
        private readonly _bannerRepository: IBannerRepository
    ) { }

    async execute(dto: CreateBannerRequestDto): Promise<void> {
        const documentCount = await this._bannerRepository.countDocuments();
        if (documentCount >= 1) {
            throw new CustomError(
                ResponseMessages.BANNER_ALREADY_EXISTS,
                HttpStatusCode.BAD_REQUEST
            );
        }

        const bannerEntity = new Banner({
            id: null,
            image: dto.image,
            isActive: true,
        });

        const banner = await this._bannerRepository.create(bannerEntity);

        if (!banner) {
            throw new CustomError(
                ResponseMessages.BANNER_CREATE_FAILED,
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    }
}
