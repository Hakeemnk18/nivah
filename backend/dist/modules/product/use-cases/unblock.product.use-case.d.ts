import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { IUnblockProductUseCase } from "./interfaces/unblock.product.use-case.interface.js";
export declare class UnblockProductUseCase implements IUnblockProductUseCase {
    private readonly _productRepository;
    constructor(_productRepository: IProductRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=unblock.product.use-case.d.ts.map