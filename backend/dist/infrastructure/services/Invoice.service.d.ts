import type { IInvoiceService } from "../../core/ports/invoice.service.interface.js";
import type { OrderSummaryView } from "../../modules/order/types/order.type.js";
export declare class InvoiceService implements IInvoiceService {
    generateInvoice(order: OrderSummaryView): Promise<Buffer>;
}
//# sourceMappingURL=Invoice.service.d.ts.map