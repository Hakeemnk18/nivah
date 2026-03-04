import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
import type { IUnblockCategoryUseCase } from "./interfaces/unblock.category.use-case.interface.js";
export declare class UnblockCategoryUseCase implements IUnblockCategoryUseCase {
    private readonly _categoryRepository;
    constructor(_categoryRepository: ICategoryRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=unblock.category.use-case.d.ts.map