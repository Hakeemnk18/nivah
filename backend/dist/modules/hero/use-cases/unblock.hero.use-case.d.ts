import type { IUnblockHeroUseCase } from "./interfaces/unblock.hero.use-case.interface.js";
import type { IHeroRepository } from "../repositories/hero.repository.interface.js";
export declare class UnblockHeroUseCase implements IUnblockHeroUseCase {
    private readonly _heroRepository;
    constructor(_heroRepository: IHeroRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=unblock.hero.use-case.d.ts.map