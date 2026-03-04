import type { IGetSignatureCategoryUseCase } from "./interfaces/get.signature.category.use-case.interface.js";
import type { CategorySignature } from "../types/category.type.js";
import type { ICategoryRepository } from "../repositories/category.repository.interface.js";
export declare class GetSignatureCategoryUseCase implements IGetSignatureCategoryUseCase {
    private readonly categoryRepository;
    constructor(categoryRepository: ICategoryRepository);
    execute(): Promise<CategorySignature[]>;
}
//# sourceMappingURL=get.signature.category.use-case.d.ts.map