import type { ICartRepository } from "../repositories/cart.repository.interface.js";
import type { RemoveCartItemRequestDto } from "../dtos/remove.cart.dto.js";
import type { IRemoveCartItemUseCase } from "./interfaces/remove.cart.item.use-case.interface.js";
export declare class RemoveCartItemUseCase implements IRemoveCartItemUseCase {
    private readonly _cartRepository;
    constructor(_cartRepository: ICartRepository);
    execute(dto: RemoveCartItemRequestDto): Promise<void>;
}
//# sourceMappingURL=remove.cart.item.use-case.d.ts.map