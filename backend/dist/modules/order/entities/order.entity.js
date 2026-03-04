import { Types } from "mongoose";
/* ---------- ENTITY ---------- */
export class Order {
    id;
    orderNumber;
    userId;
    guestId;
    userSnapshot;
    subtotal;
    shippingFee;
    totalAmount;
    orderStatus;
    cancelReason;
    items;
    createdAt;
    confirmedAt;
    acceptedAt;
    dispatchedAt;
    deliveredAt;
    cancelledAt;
    constructor(props) {
        if (!props.orderNumber?.trim()) {
            throw new Error("Order number is required");
        }
        if (!props.userId && !props.guestId) {
            throw new Error("User ID or Guest ID is required");
        }
        if (!props.items || props.items.length === 0) {
            throw new Error("Order must contain at least one item");
        }
        if (props.subtotal < 0) {
            throw new Error("Subtotal cannot be negative");
        }
        if (props.shippingFee < 0) {
            throw new Error("Shipping fee cannot be negative");
        }
        if (props.totalAmount < 0) {
            throw new Error("Total amount cannot be negative");
        }
        if (props.totalAmount !== props.subtotal + props.shippingFee) {
            throw new Error("Invalid order total amount");
        }
        /* ---------- validate user snapshot ---------- */
        if (!props.userSnapshot.name.trim()) {
            throw new Error("User name is required");
        }
        if (!props.userSnapshot.phone.trim()) {
            throw new Error("Phone is required");
        }
        if (!props.userSnapshot.addressLine1.trim()) {
            throw new Error("Address line 1 is required");
        }
        /* ---------- validate items ---------- */
        for (const item of props.items) {
            if (!item.productId) {
                throw new Error("Item product ID required");
            }
            if (!item.name.trim()) {
                throw new Error("Item name required");
            }
            if (item.price < 0) {
                throw new Error("Item price cannot be negative");
            }
            if (item.quantity < 1) {
                throw new Error("Item quantity must be at least 1");
            }
        }
        this.id = props.id ?? null;
        this.orderNumber = props.orderNumber.trim();
        this.userId = props.userId;
        this.guestId = props.guestId;
        this.userSnapshot = props.userSnapshot;
        this.subtotal = props.subtotal;
        this.shippingFee = props.shippingFee;
        this.totalAmount = props.totalAmount;
        this.orderStatus = props.orderStatus ?? "created";
        this.cancelReason = props.cancelReason ?? undefined;
        this.items = props.items;
        this.createdAt = props.createdAt;
        this.confirmedAt = props.confirmedAt;
        this.acceptedAt = props.acceptedAt;
        this.dispatchedAt = props.dispatchedAt;
        this.cancelledAt = props.cancelledAt;
        this.deliveredAt = props.deliveredAt;
    }
    /* ---------- DOMAIN METHODS ---------- */
    confirm() {
        if (this.orderStatus !== "created") {
            throw new Error("Only created orders can be confirmed");
        }
        return new Order({
            ...this,
            orderStatus: "confirmed",
            confirmedAt: new Date(),
        });
    }
    accept() {
        if (this.orderStatus !== "confirmed") {
            throw new Error("Only confirmed orders can be accepted");
        }
        return new Order({
            ...this,
            orderStatus: "accepted",
            acceptedAt: new Date(),
        });
    }
    dispatch() {
        if (this.orderStatus !== "accepted") {
            throw new Error("Only accepted orders can be dispatched");
        }
        return new Order({
            ...this,
            orderStatus: "dispatched",
            dispatchedAt: new Date(),
        });
    }
    cancel() {
        if (this.orderStatus === "dispatched") {
            throw new Error("Dispatched order cannot be cancelled");
        }
        if (this.orderStatus === "cancelled") {
            throw new Error("Order already cancelled");
        }
        return new Order({
            ...this,
            orderStatus: "cancelled",
            cancelledAt: new Date(),
        });
    }
}
//# sourceMappingURL=order.entity.js.map