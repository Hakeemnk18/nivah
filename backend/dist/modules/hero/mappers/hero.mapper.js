import { Hero } from "../entities/hero.entity.js";
export class HeroMapper {
    static toDomain(heroModelData) {
        if (!heroModelData) {
            return null;
        }
        const idString = heroModelData._id?.toString() || heroModelData.id?.toString();
        if (!idString) {
            console.error("Hero data from DB is missing an ID:", heroModelData);
            return null;
        }
        return new Hero({
            id: idString,
            title: heroModelData.title,
            subtitle: heroModelData.subtitle,
            image: {
                url: heroModelData.image?.url,
                publicId: heroModelData.image?.publicId,
            },
            isActive: heroModelData.isActive,
        });
    }
    static toPersistence(heroEntity) {
        return {
            title: heroEntity.title,
            subtitle: heroEntity.subtitle,
            image: {
                url: heroEntity.image.url,
                publicId: heroEntity.image.publicId,
            },
            isActive: heroEntity.isActive,
        };
    }
    static toAdminView(heroModelData) {
        if (!heroModelData)
            return null;
        const id = heroModelData._id?.toString() || heroModelData.id?.toString();
        if (!id) {
            console.error("Hero data missing ID:", heroModelData);
            return null;
        }
        return {
            id,
            title: heroModelData.title,
            subtitle: heroModelData.subtitle,
            image: {
                publicId: heroModelData.image?.publicId,
                url: heroModelData.image?.url,
            },
            isActive: heroModelData.isActive,
        };
    }
    static toUserView(heroModelData) {
        if (!heroModelData)
            return null;
        const id = heroModelData._id?.toString() || heroModelData.id?.toString();
        if (!id) {
            console.error("Hero data missing ID:", heroModelData);
            return null;
        }
        return {
            id,
            title: heroModelData.title,
            subtitle: heroModelData.subtitle,
            image: {
                url: heroModelData.image?.url,
            },
        };
    }
}
//# sourceMappingURL=hero.mapper.js.map