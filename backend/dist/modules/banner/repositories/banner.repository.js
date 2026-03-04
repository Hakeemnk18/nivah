var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from "tsyringe";
import { Banner } from "../entities/banner.entity.js";
import { BannerModel } from "../infrastructure/banner.schema.js";
import { BannerMapper } from "../mappers/banner.mapper.js";
let BannerRepository = class BannerRepository {
    async create(bannerEntity) {
        const persistenceData = BannerMapper.toPersistence(bannerEntity);
        const createdBanner = await BannerModel.create(persistenceData);
        return BannerMapper.toDomain(createdBanner);
    }
    async findById(id) {
        const banner = await BannerModel.findById(id).lean();
        if (!banner)
            return null;
        return BannerMapper.toDomain(banner);
    }
    async save(bannerEntity) {
        const { id } = bannerEntity;
        if (!id) {
            throw new Error("Cannot save banner without an ID");
        }
        const persistenceData = BannerMapper.toPersistence(bannerEntity);
        const updatedBanner = await BannerModel.findByIdAndUpdate(id, { $set: persistenceData }, { new: true, runValidators: true }).lean();
        if (!updatedBanner) {
            throw new Error("Banner not found for update");
        }
        return BannerMapper.toDomain(updatedBanner);
    }
    async getBannerUser() {
        const banner = await BannerModel.findOne({ isActive: true }).lean();
        return BannerMapper.toUserView(banner);
    }
    async getBannerAdmin() {
        const banner = await BannerModel.findOne().lean();
        return BannerMapper.toAdminView(banner);
    }
    async countDocuments() {
        const count = await BannerModel.countDocuments();
        return count;
    }
};
BannerRepository = __decorate([
    injectable()
], BannerRepository);
export { BannerRepository };
//# sourceMappingURL=banner.repository.js.map