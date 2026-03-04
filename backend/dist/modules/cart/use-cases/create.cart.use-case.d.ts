import type { ICreateCartUseCase } from "./interfaces/create.cart.use-case.interface.js";
import type { ICartRepository } from "../repositories/cart.repository.interface.js";
import type { IProductRepository } from "../../product/repositories/product.repository.interface.js";
import type { AddCartItemRequestDto } from "../dtos/create.cart.dto.js";
export declare class CreateCartUseCase implements ICreateCartUseCase {
    private readonly _cartRepository;
    private readonly _productRepository;
    constructor(_cartRepository: ICartRepository, _productRepository: IProductRepository);
    execute(dto: AddCartItemRequestDto): Promise<void>;
}
//# sourceMappingURL=create.cart.use-case.d.ts.map