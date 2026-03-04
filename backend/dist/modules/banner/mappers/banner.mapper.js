import { Banner } from "../entities/banner.entity.js";
export class BannerMapper {
    static toDomain(bannerModelData) {
        if (!bannerModelData) {
            return null;
        }
        const idString = bannerModelData._id?.toString() || bannerModelData.id?.toString();
        if (!idString) {
            console.error("Banner data from DB is missing an ID:", bannerModelData);
            return null;
        }
        return new Banner({
            id: idString,
            image: {
                url: bannerModelData.image?.url,
                publicId: bannerModelData.image?.publicId,
            },
            isActive: bannerModelData.isActive,
        });
    }
    static toPersistence(bannerEntity) {
        return {
            image: {
                url: bannerEntity.image.url,
                publicId: bannerEntity.image.publicId,
            },
            isActive: bannerEntity.isActive,
        };
    }
    static toAdminView(bannerModelData) {
        if (!bannerModelData)
            return null;
        const id = bannerModelData._id?.toString() || bannerModelData.id?.toString();
        if (!id) {
            console.error("Banner data missing ID:", bannerModelData);
            return null;
        }
        return {
            id,
            image: {
                publicId: bannerModelData.image?.publicId,
                url: bannerModelData.image?.url,
            },
            isActive: bannerModelData.isActive,
        };
    }
    static toUserView(bannerModelData) {
        if (!bannerModelData)
            return null;
        const id = bannerModelData._id?.toString() || bannerModelData.id?.toString();
        if (!id) {
            console.error("Banner data missing ID:", bannerModelData);
            return null;
        }
        return {
            id,
            image: {
                url: bannerModelData.image?.url,
            },
        };
    }
}
//# sourceMappingURL=banner.mapper.js.map