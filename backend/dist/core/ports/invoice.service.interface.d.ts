import type { OrderSummaryView } from "../../modules/order/types/order.type.js";
export interface IInvoiceService {
    generateInvoice(order: OrderSummaryView): Promise<Buffer>;
}
//# sourceMappingURL=invoice.service.interface.d.ts.map