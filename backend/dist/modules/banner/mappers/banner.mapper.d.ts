import { Banner } from "../entities/banner.entity.js";
import type { BannerView, UserBannerView } from "../types/banner.type.js";
export declare class BannerMapper {
    static toDomain(bannerModelData: any): Banner | null;
    static toPersistence(bannerEntity: Banner): any;
    static toAdminView(bannerModelData: any): BannerView | null;
    static toUserView(bannerModelData: any): UserBannerView | null;
}
//# sourceMappingURL=banner.mapper.d.ts.map