import type { IEditHeroUseCase } from "./interfaces/edit.hero.use-case.interface.js";
import type { IHeroRepository } from "../repositories/hero.repository.interface.js";
import type { EditHeroRequestDto } from "../dtos/hero.dto.js";
export declare class EditHeroUseCase implements IEditHeroUseCase {
    private readonly _heroRepository;
    constructor(_heroRepository: IHeroRepository);
    execute(id: string, dto: EditHeroRequestDto): Promise<void>;
}
//# sourceMappingURL=edit.hero.use-case.d.ts.map