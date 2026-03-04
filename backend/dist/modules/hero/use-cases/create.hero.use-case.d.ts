import type { ICreateHeroUseCase } from "./interfaces/create.hero.use-case.interface.js";
import type { IHeroRepository } from "../repositories/hero.repository.interface.js";
import type { CreateHeroRequestDto } from "../dtos/hero.dto.js";
export declare class CreateHeroUseCase implements ICreateHeroUseCase {
    private readonly _heroRepository;
    constructor(_heroRepository: IHeroRepository);
    execute(dto: CreateHeroRequestDto): Promise<void>;
}
//# sourceMappingURL=create.hero.use-case.d.ts.map