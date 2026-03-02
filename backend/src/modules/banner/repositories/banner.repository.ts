import { injectable } from "tsyringe";
import type { IBannerRepository } from "./banner.repository.interface.js";
import { Banner } from "../entities/banner.entity.js";
import { BannerModel } from "../infrastructure/banner.schema.js";
import { BannerMapper } from "../mappers/banner.mapper.js";
import type { BannerView, UserBannerView } from "../types/banner.type.js";

@injectable()
export class BannerRepository implements IBannerRepository {
    async create(bannerEntity: Banner): Promise<Banner> {
        const persistenceData = BannerMapper.toPersistence(bannerEntity);
        const createdBanner = await BannerModel.create(persistenceData);
        return BannerMapper.toDomain(createdBanner)!;
    }

    async findById(id: string): Promise<Banner | null> {
        const banner = await BannerModel.findById(id).lean();
        if (!banner) return null;
        return BannerMapper.toDomain(banner);
    }

    async save(bannerEntity: Banner): Promise<Banner> {
        const { id } = bannerEntity;
        if (!id) {
            throw new Error("Cannot save banner without an ID");
        }

        const persistenceData = BannerMapper.toPersistence(bannerEntity);
        const updatedBanner = await BannerModel.findByIdAndUpdate(
            id,
            { $set: persistenceData },
            { new: true, runValidators: true }
        ).lean();

        if (!updatedBanner) {
            throw new Error("Banner not found for update");
        }

        return BannerMapper.toDomain(updatedBanner)!;
    }

    async getBannerUser(): Promise<UserBannerView | null> {
        const banner = await BannerModel.findOne({ isActive: true }).lean();

        return BannerMapper.toUserView(banner);
    }

    async getBannerAdmin(): Promise<BannerView | null> {
        const banner = await BannerModel.findOne().lean();
        return BannerMapper.toAdminView(banner);
    }

    async countDocuments(): Promise<number> {
        const count = await BannerModel.countDocuments();
        return count;
    }
}
