import type { IRazorpayOrder, IRazorpayOrderOptions, IRazorpayPayment } from "../../modules/order/types/order.type.js";

export interface IPaymentGateway {
    createOrder(options: IRazorpayOrderOptions): Promise<IRazorpayOrder>;
    fetchPayment(paymentId: string): Promise<IRazorpayPayment>;
}