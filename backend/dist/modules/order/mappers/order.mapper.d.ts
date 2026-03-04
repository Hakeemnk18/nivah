import type { TopAndLowSellingProductItem, TopSellingCategoryItem } from "../../analysis/types/analysis.type.js";
import { Order } from "../entities/order.entity.js";
import type { AdminOrderFullView, AdminOrderListItem, IOrderLean, IPaymentLean, OrderSummaryView } from "../types/order.type.js";
export declare class OrderMapper {
    static toDomain(orderModelData: any): Order | null;
    static toPersistence(orderEntity: Order): any;
    static toSummaryView(orderModelData: any): OrderSummaryView | null;
    static toAdminOrderListItem(orderModelData: any): AdminOrderListItem | null;
    static toTopAndLowSellingProductItem(data: any): TopAndLowSellingProductItem | null;
    static toTopSellingCategoryItem(data: any): TopSellingCategoryItem | null;
    static toAdminOrderFullView(order: IOrderLean, payment?: IPaymentLean | null): AdminOrderFullView;
}
//# sourceMappingURL=order.mapper.d.ts.map