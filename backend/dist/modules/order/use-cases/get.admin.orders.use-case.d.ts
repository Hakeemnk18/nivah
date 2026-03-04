import type { IGetAdminOrdersUseCase } from "./interfaces/get.admin.orders.use-case.interface.js";
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { AdminOrderListItem } from "../types/order.type.js";
import type { GetAllQueryDto } from "../../../core/shared/dtos/get.all.doc.dto.js";
export declare class GetAdminOrdersUseCase implements IGetAdminOrdersUseCase {
    private readonly _orderRepository;
    constructor(_orderRepository: IOrderRepository);
    execute(dto: GetAllQueryDto): Promise<{
        data: AdminOrderListItem[];
        total: number;
    }>;
}
//# sourceMappingURL=get.admin.orders.use-case.d.ts.map