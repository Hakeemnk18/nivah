import type { IGetHeroUserUseCase } from "./interfaces/get.hero.user.use-case.interface.js";
import type { IHeroRepository } from "../repositories/hero.repository.interface.js";
import type { UserHeroView } from "../types/hero.type.js";
export declare class GetHeroUserUseCase implements IGetHeroUserUseCase {
    private readonly _heroRepository;
    constructor(_heroRepository: IHeroRepository);
    execute(): Promise<UserHeroView | null>;
}
//# sourceMappingURL=get.hero.user.use-case.d.ts.map