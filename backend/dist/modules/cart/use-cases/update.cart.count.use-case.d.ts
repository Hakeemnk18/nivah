import type { ICartRepository } from "../repositories/cart.repository.interface.js";
import type { UpdateCartItemQuantityRequestDto } from "../dtos/update.cart.dto.js";
import type { IUpdateCartCountUseCase } from "./interfaces/update.cart.count.use-case.interface.js";
import type { IProductRepository } from "../../product/repositories/product.repository.interface.js";
export declare class UpdateCartCountUseCase implements IUpdateCartCountUseCase {
    private readonly _cartRepository;
    private readonly _productRepository;
    constructor(_cartRepository: ICartRepository, _productRepository: IProductRepository);
    execute(dto: UpdateCartItemQuantityRequestDto): Promise<void>;
}
//# sourceMappingURL=update.cart.count.use-case.d.ts.map