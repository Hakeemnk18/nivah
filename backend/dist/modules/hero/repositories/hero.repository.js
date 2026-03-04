var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from "tsyringe";
import { Hero } from "../entities/hero.entity.js";
import { HeroModel } from "../infrastructure/hero.schema.js";
import { HeroMapper } from "../mappers/hero.mapper.js";
let HeroRepository = class HeroRepository {
    async create(heroEntity) {
        const persistenceData = HeroMapper.toPersistence(heroEntity);
        const createdHero = await HeroModel.create(persistenceData);
        return HeroMapper.toDomain(createdHero);
    }
    async findById(id) {
        const hero = await HeroModel.findById(id).lean();
        if (!hero)
            return null;
        return HeroMapper.toDomain(hero);
    }
    async save(heroEntity) {
        const { id } = heroEntity;
        if (!id) {
            throw new Error("Cannot save hero without an ID");
        }
        const persistenceData = HeroMapper.toPersistence(heroEntity);
        const updatedHero = await HeroModel.findByIdAndUpdate(id, { $set: persistenceData }, { new: true, runValidators: true }).lean();
        if (!updatedHero) {
            throw new Error("Hero not found for update");
        }
        return HeroMapper.toDomain(updatedHero);
    }
    async getHeroBannerForUser() {
        const hero = await HeroModel.findOne({ isActive: true }).lean();
        return HeroMapper.toUserView(hero);
    }
    async getHeroBannerForAdmin() {
        const hero = await HeroModel.findOne().lean();
        return HeroMapper.toAdminView(hero);
    }
    async countDocuments() {
        const count = await HeroModel.countDocuments();
        return count;
    }
};
HeroRepository = __decorate([
    injectable()
], HeroRepository);
export { HeroRepository };
//# sourceMappingURL=hero.repository.js.map