import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { IInvoiceService } from "../../../core/ports/invoice.service.interface.ts";
import type { IAdminDownloadInvoiceUseCase } from "./interfaces/admin.dowload.invoice.use-case.interface.js";
export declare class AdminDownloadInvoiceUseCase implements IAdminDownloadInvoiceUseCase {
    private readonly orderRepository;
    private readonly invoiceService;
    constructor(orderRepository: IOrderRepository, invoiceService: IInvoiceService);
    execute(orderId: string): Promise<Buffer>;
}
//# sourceMappingURL=admin.dowload.invoice.use-case.d.ts.map