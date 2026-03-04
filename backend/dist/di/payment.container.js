import { container } from "tsyringe";
import { PaymentRepository } from "../modules/payment/repositories/payment.repository.js";
export const registerPaymentDependencies = () => {
    container.register("IPaymentRepository", {
        useClass: PaymentRepository,
    });
};
//# sourceMappingURL=payment.container.js.map