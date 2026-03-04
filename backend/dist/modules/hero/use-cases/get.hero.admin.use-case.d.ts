import type { IGetHeroAdminUseCase } from "./interfaces/get.hero.admin.use-case.interface.js";
import type { IHeroRepository } from "../repositories/hero.repository.interface.js";
import type { HeroView } from "../types/hero.type.js";
export declare class GetHeroAdminUseCase implements IGetHeroAdminUseCase {
    private readonly _heroRepository;
    constructor(_heroRepository: IHeroRepository);
    execute(): Promise<HeroView | null>;
}
//# sourceMappingURL=get.hero.admin.use-case.d.ts.map