import type { IEmailService } from "../../../core/ports/email.service.interface.js";
import type { Order } from "../entities/order.entity.js";

export function notifyOrderConfirmed(
  emailService: IEmailService,
  order: Order
): void {
  console.log(`Sending order confirmation email for #${order.orderNumber} to ${order.userSnapshot.email}`);
  emailService
    .sendOrderConfirmation({
      to: order.userSnapshot.email,
      orderNumber: order.orderNumber,
      customerName: order.userSnapshot.name,
      items: order.items.map((item) => ({
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal: order.subtotal,
      shippingFee: order.shippingFee,
      totalAmount: order.totalAmount,
      address: {
        addressLine1: order.userSnapshot.addressLine1,
        addressLine2: order.userSnapshot.addressLine2,
        city: order.userSnapshot.city,
        state: order.userSnapshot.state,
        pincode: order.userSnapshot.pincode,
      },
    })
    .catch((error) =>
      console.error(`Failed to send order confirmation email for #${order.orderNumber}:`, error)
    );

  emailService
    .sendAdminOrderNotification({
      orderNumber: order.orderNumber,
      customerName: order.userSnapshot.name,
      customerEmail: order.userSnapshot.email,
      customerPhone: order.userSnapshot.phone,
      totalAmount: order.totalAmount,
      itemCount: order.items.length,
    })
    .catch((error) =>
      console.error(`Failed to send admin order notification email for #${order.orderNumber}:`, error)
    );
}
