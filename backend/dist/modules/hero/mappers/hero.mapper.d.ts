import { Hero } from "../entities/hero.entity.js";
import type { HeroView, UserHeroView } from "../types/hero.type.js";
export declare class HeroMapper {
    static toDomain(heroModelData: any): Hero | null;
    static toPersistence(heroEntity: Hero): any;
    static toAdminView(heroModelData: any): HeroView | null;
    static toUserView(heroModelData: any): UserHeroView | null;
}
//# sourceMappingURL=hero.mapper.d.ts.map