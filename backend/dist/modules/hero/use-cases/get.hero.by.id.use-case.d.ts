import type { IHeroRepository } from "../repositories/hero.repository.interface.js";
import type { HeroView } from "../types/hero.type.js";
import type { IGetHeroByIdUseCase } from "./interfaces/get.hero.by.id.use-case.interface.js";
export declare class GetHeroByIdUseCase implements IGetHeroByIdUseCase {
    private readonly _heroRepository;
    constructor(_heroRepository: IHeroRepository);
    execute(id: string): Promise<HeroView>;
}
//# sourceMappingURL=get.hero.by.id.use-case.d.ts.map