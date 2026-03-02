import { injectable } from "tsyringe";
import type { IHeroRepository } from "./hero.repository.interface.js";
import { Hero } from "../entities/hero.entity.js";
import { HeroModel } from "../infrastructure/hero.schema.js";
import { HeroMapper } from "../mappers/hero.mapper.js";
import type { HeroView, UserHeroView } from "../types/hero.type.js";

@injectable()
export class HeroRepository implements IHeroRepository {
    async create(heroEntity: Hero): Promise<Hero> {
        const persistenceData = HeroMapper.toPersistence(heroEntity);
        const createdHero = await HeroModel.create(persistenceData);
        return HeroMapper.toDomain(createdHero)!;
    }

    async findById(id: string): Promise<Hero | null> {
        const hero = await HeroModel.findById(id).lean();
        if (!hero) return null;
        return HeroMapper.toDomain(hero);
    }

    async save(heroEntity: Hero): Promise<Hero> {
        const { id } = heroEntity;
        if (!id) {
            throw new Error("Cannot save hero without an ID");
        }

        const persistenceData = HeroMapper.toPersistence(heroEntity);
        const updatedHero = await HeroModel.findByIdAndUpdate(
            id,
            { $set: persistenceData },
            { new: true, runValidators: true }
        ).lean();

        if (!updatedHero) {
            throw new Error("Hero not found for update");
        }

        return HeroMapper.toDomain(updatedHero)!;
    }

    async getHeroBannerForUser(): Promise<UserHeroView | null> {
        const hero = await HeroModel.findOne({ isActive: true }).lean();
        return HeroMapper.toUserView(hero);
    }

    async getHeroBannerForAdmin(): Promise<HeroView | null> {
        const hero = await HeroModel.findOne().lean();
        return HeroMapper.toAdminView(hero);
    }

    async countDocuments(): Promise<number> {
        const count = await HeroModel.countDocuments();
        return count;
    }
}
