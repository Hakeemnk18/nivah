import type { IGetAllDocDB } from "../../../core/shared/interfaces/get.all.doc.interface.js";
import { Order } from "../entities/order.entity.js";
import type {
  OrderListView,
  OrderSummaryView,
  AdminOrderListItem,
} from "../types/order.type.js";
import type { OrderStatus } from "../types/order.type.js";
import type { ClientSession } from "mongoose";

export interface IOrderRepository {
  create(orderEntity: Order): Promise<Order>;

  save(orderEntity: Order): Promise<Order>;

  changeStatus(
    orderId: string,
    status: OrderStatus,
    session?: ClientSession,
  ): Promise<Order | null>;

  findById(id: string, session?: ClientSession): Promise<Order | null>;
  getOrderStatus(orderId: string): Promise<OrderStatus>;
  findPendingOlderThan(date: Date): Promise<Order[]>;
  autoCancelOlderThan(orderIds: string[], session?: ClientSession): Promise<void>;
  confirmOrder(orderId: string, session?: ClientSession): Promise<void>;
  cancelOrder(orderId: string, session?: ClientSession): Promise<void>;
  getSummary(orderId: string, guestId: string): Promise<OrderSummaryView | null>;
  getAdminOrderList(allDoc: IGetAllDocDB): Promise<AdminOrderListItem[]>;
  countDocuments(query: Record<string, any>): Promise<number>;
  dispatchOrder(orderId: string, session?: ClientSession): Promise<void>;
  deliverOrder(orderId: string, session?: ClientSession): Promise<void>;
  acceptOrder(orderId: string, session?: ClientSession): Promise<void>;
}
