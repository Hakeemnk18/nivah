import type { IDownloadInvoiceUseCase } from "./interfaces/download.invoice.use-case.interface.ts";
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { IInvoiceService } from "../../../core/ports/invoice.service.interface.ts";
export declare class DownloadInvoiceUseCase implements IDownloadInvoiceUseCase {
    private readonly orderRepository;
    private readonly invoiceService;
    constructor(orderRepository: IOrderRepository, invoiceService: IInvoiceService);
    execute(orderId: string, guestId: string): Promise<Buffer>;
}
//# sourceMappingURL=download.invoice.use-case.d.ts.map