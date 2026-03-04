import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { IBlockProductUseCase } from "./interfaces/block.product.use-case.interface.js";
export declare class BlockProductUseCase implements IBlockProductUseCase {
    private readonly _productRepository;
    constructor(_productRepository: IProductRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=block.product.use-case.d.ts.map