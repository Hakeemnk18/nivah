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
import { deleteCloudinaryImage } from "../../../core/utils/delete.image.helper.js";
let EditBannerUseCase = class EditBannerUseCase {
    _bannerRepository;
    constructor(_bannerRepository) {
        this._bannerRepository = _bannerRepository;
    }
    async execute(id, dto) {
        const banner = await this._bannerRepository.findById(id);
        if (!banner) {
            throw new CustomError(ResponseMessages.BANNER_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        if (banner.image.publicId !== dto.image.publicId) {
            await deleteCloudinaryImage(banner.image.publicId);
        }
        const updatedBanner = banner.updateDetails({
            image: dto.image,
        });
        const saved = await this._bannerRepository.save(updatedBanner);
        if (!saved) {
            throw new CustomError(ResponseMessages.BANNER_UPDATE_FAILED, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }
};
EditBannerUseCase = __decorate([
    injectable(),
    __param(0, inject("IBannerRepository")),
    __metadata("design:paramtypes", [Object])
], EditBannerUseCase);
export { EditBannerUseCase };
//# sourceMappingURL=edit.banner.use-case.js.map