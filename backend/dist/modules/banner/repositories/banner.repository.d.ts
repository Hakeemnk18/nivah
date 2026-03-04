import type { IBannerRepository } from "./banner.repository.interface.js";
import { Banner } from "../entities/banner.entity.js";
import type { BannerView, UserBannerView } from "../types/banner.type.js";
export declare class BannerRepository implements IBannerRepository {
    create(bannerEntity: Banner): Promise<Banner>;
    findById(id: string): Promise<Banner | null>;
    save(bannerEntity: Banner): Promise<Banner>;
    getBannerUser(): Promise<UserBannerView | null>;
    getBannerAdmin(): Promise<BannerView | null>;
    countDocuments(): Promise<number>;
}
//# sourceMappingURL=banner.repository.d.ts.map