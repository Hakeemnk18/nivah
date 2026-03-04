import { container } from "tsyringe";
import { BcryptService } from "../infrastructure/services/bcrypt.service.js";
import { JwtService } from "../infrastructure/services/jwt.service.js";
import { RazorpayService } from "../infrastructure/services/payment.service.js";
import { InvoiceService } from "../infrastructure/services/Invoice.service.js";
import { WhatsAppNotificationService } from "../infrastructure/services/notification.service.js";
export const registerCommonDependencies = () => {
    container.register("IHashingService", {
        useClass: BcryptService,
    });
    container.register("ITokenService", { useClass: JwtService });
    container.register("IPaymentGateway", {
        useClass: RazorpayService,
    });
    container.register("IInvoiceService", {
        useClass: InvoiceService,
    });
    container.register("INotificationService", {
        useClass: WhatsAppNotificationService,
    });
};
//# sourceMappingURL=common.container.js.map