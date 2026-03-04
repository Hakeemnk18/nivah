import type { IRazorpayOrder, IRazorpayOrderOptions, IRazorpayPayment } from "../../modules/order/types/order.type.js";
import type { IPaymentGateway } from "../../core/ports/payment.service.interface.js";
export declare class RazorpayService implements IPaymentGateway {
    createOrder(options: IRazorpayOrderOptions): Promise<IRazorpayOrder>;
    fetchPayment(paymentId: string): Promise<IRazorpayPayment>;
}
//# sourceMappingURL=payment.service.d.ts.map