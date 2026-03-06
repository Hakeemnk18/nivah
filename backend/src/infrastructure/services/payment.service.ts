import { injectable } from "tsyringe";
import type { IRazorpayOrder, IRazorpayOrderOptions, IRazorpayPayment, IRazorpayPaymentCollection } from "../../modules/order/types/order.type.js";
import type { IPaymentGateway } from "../../core/ports/payment.service.interface.js";
import { razorpay } from "../../config/razorpay.js";

@injectable()
export class RazorpayService implements IPaymentGateway {

    async createOrder(options: IRazorpayOrderOptions): Promise<IRazorpayOrder> {
        const order = await razorpay.orders.create(options);

        return {
            id: order.id,
            entity: order.entity,
            amount: Number(order.amount),
            amount_paid: Number(order.amount_paid),
            amount_due: Number(order.amount_due),
            currency: order.currency,
            receipt: order.receipt!,
            status: order.status,
            attempts: order.attempts,
            notes: order.notes ?? {},
            created_at: order.created_at,
        };
    }

    async fetchPayment(paymentId: string): Promise<IRazorpayPayment> {
        const payment = await razorpay.payments.fetch(paymentId);

        return {
            id: payment.id,
            entity: payment.entity,
            amount: Number(payment.amount),
            currency: payment.currency,
            status: payment.status,
            order_id: payment.order_id ?? undefined,
            invoice_id: payment.invoice_id ?? undefined,
            international: Boolean(payment.international),
            method: payment.method,
            amount_refunded: Number(payment.amount_refunded ?? 0),
            refund_status: payment.refund_status ?? null,
            captured: Boolean(payment.captured),
            description: payment.description ?? undefined,
            card_id: payment.card_id ?? undefined,
            bank: payment.bank ?? undefined,
            wallet: payment.wallet ?? undefined,
            vpa: payment.vpa ?? undefined,
            email: payment.email ?? "",
            contact: payment.contact?.toString() ?? "",
            notes: payment.notes ?? {},
            fee: payment.fee ? Number(payment.fee) : undefined,
            tax: payment.tax ? Number(payment.tax) : undefined,
            error_code: payment.error_code ?? undefined,
            error_description: payment.error_description ?? undefined,
            created_at: payment.created_at,
        };
    }

    async fetchPaymentsByOrderId(orderId: string): Promise<IRazorpayPaymentCollection> {

        const payments = await razorpay.orders.fetchPayments(orderId) as IRazorpayPaymentCollection;

        return payments;
    }
}
