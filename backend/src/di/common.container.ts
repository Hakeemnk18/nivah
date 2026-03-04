import { container } from "tsyringe";
import type { IHashingService } from "../core/ports/hashing.service.interface.js";
import { BcryptService } from "../infrastructure/services/bcrypt.service.js";
import type { ITokenService } from "../core/ports/token.service.interface.js";
import { JwtService } from "../infrastructure/services/jwt.service.js";
import type { IPaymentGateway } from "../core/ports/payment.service.interface.js";
import { RazorpayService } from "../infrastructure/services/payment.service.js";
import type { IInvoiceService } from "../core/ports/invoice.service.interface.js";
import { InvoiceService } from "../infrastructure/services/Invoice.service.js";
import type { INotificationService } from "../core/ports/notification.service.interface.js";
import { WhatsAppNotificationService } from "../infrastructure/services/notification.service.js";



export const registerCommonDependencies = () => {
    container.register<IHashingService>("IHashingService", {
        useClass: BcryptService,
    });


    container.register<ITokenService>("ITokenService", { useClass: JwtService });

    container.register<IPaymentGateway>("IPaymentGateway", {
        useClass: RazorpayService,
    });

    container.register<IInvoiceService>("IInvoiceService", {
        useClass: InvoiceService,
    });

    container.register<INotificationService>("INotificationService", {
        useClass: WhatsAppNotificationService,
    });

};