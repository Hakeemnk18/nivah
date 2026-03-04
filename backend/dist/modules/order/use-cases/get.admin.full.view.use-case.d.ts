import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { AdminOrderFullView } from "../types/order.type.js";
import type { IGetAdminFullViewUseCase } from "./interfaces/get.admin.full.view.use-case.interface.js";
export declare class GetAdminFullViewUseCase implements IGetAdminFullViewUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(orderId: string): Promise<AdminOrderFullView>;
}
//# sourceMappingURL=get.admin.full.view.use-case.d.ts.map