import type { IGetProductForUserUseCase } from "./interfaces/get.product.user.use-case.interface.js";
import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { UserProductView } from "../types/product.type.js";
export declare class GetProductForUserUseCase implements IGetProductForUserUseCase {
    private readonly _productRepository;
    constructor(_productRepository: IProductRepository);
    execute(id: string): Promise<UserProductView>;
}
//# sourceMappingURL=get.product.user.use-case.d.ts.map