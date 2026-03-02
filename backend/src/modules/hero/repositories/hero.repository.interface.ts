import { Hero } from "../entities/hero.entity.js";
import type { HeroView, UserHeroView } from "../types/hero.type.js";

export interface IHeroRepository {
    create(heroEntity: Hero): Promise<Hero>;
    findById(id: string): Promise<Hero | null>;
    save(heroEntity: Hero): Promise<Hero>;
    getHeroBannerForUser(): Promise<UserHeroView | null>;
    getHeroBannerForAdmin(): Promise<HeroView | null>;
    countDocuments(): Promise<number>;
}
