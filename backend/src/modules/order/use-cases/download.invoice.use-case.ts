import type { IDownloadInvoiceUseCase } from "./interfaces/download.invoice.use-case.interface.ts";
import { inject, injectable } from "tsyringe";
import type { Response } from "express";
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import type { IInvoiceService } from "../../../core/ports/invoice.service.interface.ts";


@injectable()
export class DownloadInvoiceUseCase implements IDownloadInvoiceUseCase {
    constructor(
        @inject("IOrderRepository") private readonly orderRepository: IOrderRepository,
        @inject("IInvoiceService") private readonly invoiceService: IInvoiceService,
    ) { }
    async execute(orderId: string, guestId: string): Promise<Buffer> {
        const order = await this.orderRepository.getSummary(orderId, guestId);
        if (!order) {
            throw new Error("Order not found");
        }
        const pdfBuffer = await this.invoiceService.generateInvoice(order);

        return pdfBuffer;
    }
}