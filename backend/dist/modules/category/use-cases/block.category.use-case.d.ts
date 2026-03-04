import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
import type { IBlockCategoryUseCase } from "./interfaces/block.category.use-case.interface.js";
export declare class BlockCategoryUseCase implements IBlockCategoryUseCase {
    private readonly _categoryRepository;
    constructor(_categoryRepository: ICategoryRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=block.category.use-case.d.ts.map