import { Order } from "../entities/order.entity.js";
import type { OrderListView } from "../types/order.type.js";


export class OrderMapper {
  /* ================= DOMAIN ================= */

  static toDomain(orderModelData: any): Order | null {
    if (!orderModelData) {
      return null;
    }

    const idString =
      orderModelData._id?.toString() ||
      orderModelData.id?.toString();

    if (!idString) {
      console.error("Order data missing ID:", orderModelData);
      return null;
    }

    return new Order({
      id: idString,
      orderNumber: orderModelData.orderNumber,
      userId:
        orderModelData.userId?.toString() ||
        orderModelData.userId,
      guestId: orderModelData.guestId,
      userSnapshot: {
        name: orderModelData.userSnapshot.name,
        email: orderModelData.userSnapshot.email,
        phone: orderModelData.userSnapshot.phone,
        addressLine1: orderModelData.userSnapshot.addressLine1,
        addressLine2: orderModelData.userSnapshot.addressLine2,
        city: orderModelData.userSnapshot.city,
        state: orderModelData.userSnapshot.state,
        pincode: orderModelData.userSnapshot.pincode,
      },

      subtotal: orderModelData.subtotal,
      shippingFee: orderModelData.shippingFee,
      totalAmount: orderModelData.totalAmount,

      orderStatus: orderModelData.orderStatus,

      paymentId:
        orderModelData.paymentId?.toString() || null,

      items:
        orderModelData.items?.map((item: any) => ({
          id: item._id?.toString() || item.id?.toString(),
          productId:
            item.productId?.toString() || item.productId,
          variantId: item.variantId?.toString() || item.variantId,
          size: item.size,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })) ?? [],

      createdAt: orderModelData.createdAt,
      confirmedAt: orderModelData.confirmedAt,
      acceptedAt: orderModelData.acceptedAt,
      dispatchedAt: orderModelData.dispatchedAt,
      cancelledAt: orderModelData.cancelledAt,
    });
  }

  /* ================= PERSISTENCE ================= */

  static toPersistence(orderEntity: Order): any {
    return {
      orderNumber: orderEntity.orderNumber,

      userId: orderEntity.userId,
      guestId: orderEntity.guestId,
      userSnapshot: {
        name: orderEntity.userSnapshot.name,
        email: orderEntity.userSnapshot.email,
        phone: orderEntity.userSnapshot.phone,
        addressLine1: orderEntity.userSnapshot.addressLine1,
        addressLine2: orderEntity.userSnapshot.addressLine2,
        city: orderEntity.userSnapshot.city,
        state: orderEntity.userSnapshot.state,
        pincode: orderEntity.userSnapshot.pincode,
      },

      subtotal: orderEntity.subtotal,
      shippingFee: orderEntity.shippingFee,
      totalAmount: orderEntity.totalAmount,

      orderStatus: orderEntity.orderStatus,

      paymentId: orderEntity.paymentId ?? null,

      items: orderEntity.items.map((item) => ({
        _id: item.id,
        productId: item.productId,
        variantId: item.variantId,
        size: item.size,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),

      confirmedAt: orderEntity.confirmedAt,
      acceptedAt: orderEntity.acceptedAt,
      dispatchedAt: orderEntity.dispatchedAt,
      cancelledAt: orderEntity.cancelledAt,
    };
  }

  /* ================= ADMIN DETAIL VIEW ================= */

  //   static toAdminView(orderModelData: any): OrderView | null {
  //     if (!orderModelData) return null;

  //     const id =
  //       orderModelData._id?.toString() ||
  //       orderModelData.id?.toString();

  //     if (!id) {
  //       console.error("Order data missing ID:", orderModelData);
  //       return null;
  //     }

  //     return {
  //       id,
  //       orderNumber: orderModelData.orderNumber,
  //       orderStatus: orderModelData.orderStatus,

  //       user: {
  //         id:
  //           orderModelData.userId?._id?.toString() ||
  //           orderModelData.userId?.toString(),
  //         name: orderModelData.userSnapshot.name,
  //         email: orderModelData.userSnapshot.email,
  //       },

  //       subtotal: orderModelData.subtotal,
  //       shippingFee: orderModelData.shippingFee,
  //       totalAmount: orderModelData.totalAmount,

  //       createdAt: orderModelData.createdAt,

  //       items: orderModelData.items.map((item: any) => ({
  //         itemId: item._id.toString(),
  //         productId:
  //           item.productId?._id?.toString() ||
  //           item.productId?.toString(),
  //         name: item.name,
  //         price: item.price,
  //         quantity: item.quantity,
  //       })),
  //     };
  //   }

  //   /* ================= ADMIN LIST VIEW ================= */

  static toAdminListView(
    orderModelData: any,
  ): OrderListView | null {
    if (!orderModelData) return null;

    const id =
      orderModelData._id?.toString() ||
      orderModelData.id?.toString();

    if (!id) {
      console.error("Order data missing ID:", orderModelData);
      return null;
    }

    return {
      id,
      orderNumber: orderModelData.orderNumber,
      customerName: orderModelData.userSnapshot.name,
      customerPhone: orderModelData.userSnapshot.phone,
      totalAmount: orderModelData.totalAmount,
      orderStatus: orderModelData.orderStatus,
      createdAt: orderModelData.createdAt,
    };
  }

  //   /* ================= USER DETAIL VIEW ================= */

  //   static toUserView(orderModelData: any): UserOrderView | null {
  //     if (!orderModelData) return null;

  //     const id =
  //       orderModelData._id?.toString() ||
  //       orderModelData.id?.toString();

  //     if (!id) {
  //       console.error("Order data missing ID:", orderModelData);
  //       return null;
  //     }

  //     return {
  //       id,
  //       orderNumber: orderModelData.orderNumber,
  //       orderStatus: orderModelData.orderStatus,
  //       totalAmount: orderModelData.totalAmount,
  //       createdAt: orderModelData.createdAt,

  //       items: orderModelData.items.map((item: any) => ({
  //         itemId: item._id.toString(),
  //         name: item.name,
  //         price: item.price,
  //         quantity: item.quantity,
  //       })),
  //     };
  //   }

  //   /* ================= USER LIST VIEW ================= */

  //   static toUserListView(
  //     orderModelData: any,
  //   ): UserOrderListView | null {
  //     if (!orderModelData) return null;

  //     const id =
  //       orderModelData._id?.toString() ||
  //       orderModelData.id?.toString();

  //     if (!id) {
  //       console.error("Order data missing ID:", orderModelData);
  //       return null;
  //     }

  //     return {
  //       id,
  //       orderNumber: orderModelData.orderNumber,
  //       totalAmount: orderModelData.totalAmount,
  //       orderStatus: orderModelData.orderStatus,
  //       createdAt: orderModelData.createdAt,
  //     };
  //   }
}
