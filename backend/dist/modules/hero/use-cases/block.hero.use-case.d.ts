import type { IBlockHeroUseCase } from "./interfaces/block.hero.use-case.interface.js";
import type { IHeroRepository } from "../repositories/hero.repository.interface.js";
export declare class BlockHeroUseCase implements IBlockHeroUseCase {
    private readonly _heroRepository;
    constructor(_heroRepository: IHeroRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=block.hero.use-case.d.ts.map