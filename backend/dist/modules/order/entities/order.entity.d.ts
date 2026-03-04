import type { OrderStatus } from "../types/order.type.js";
export type OrderItem = {
    id?: string;
    productId: string;
    variantId: string;
    size: string;
    name: string;
    price: number;
    quantity: number;
};
export type UserSnapshot = {
    name: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string | undefined;
    city: string;
    state: string;
    pincode: string;
};
export type OrderProps = {
    id?: string | null;
    orderNumber: string;
    userId: string | null;
    guestId: string | null;
    userSnapshot: UserSnapshot;
    subtotal: number;
    shippingFee: number;
    totalAmount: number;
    orderStatus?: OrderStatus;
    cancelReason?: string | undefined;
    items: OrderItem[];
    createdAt?: Date | undefined;
    confirmedAt?: Date | undefined;
    acceptedAt?: Date | undefined;
    dispatchedAt?: Date | undefined;
    deliveredAt?: Date | undefined;
    cancelledAt?: Date | undefined;
};
export declare class Order {
    readonly id: string | null;
    readonly orderNumber: string;
    readonly userId: string | null;
    readonly guestId: string | null;
    readonly userSnapshot: UserSnapshot;
    readonly subtotal: number;
    readonly shippingFee: number;
    readonly totalAmount: number;
    readonly orderStatus: OrderStatus;
    readonly cancelReason?: string | undefined;
    readonly items: OrderItem[];
    readonly createdAt?: Date | undefined;
    readonly confirmedAt?: Date | undefined;
    readonly acceptedAt?: Date | undefined;
    readonly dispatchedAt?: Date | undefined;
    readonly deliveredAt?: Date | undefined;
    readonly cancelledAt?: Date | undefined;
    constructor(props: OrderProps);
    confirm(): Order;
    accept(): Order;
    dispatch(): Order;
    cancel(): Order;
}
//# sourceMappingURL=order.entity.d.ts.map