import type { IGetAllDocDB } from "../../../core/shared/interfaces/get.all.doc.interface.js";
import { Order } from "../entities/order.entity.js";
import type {
  AutoCancelPayload,
  OrderListView,
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

  findAllForAdmin(
    allDoc: IGetAllDocDB,
  ): Promise<OrderListView[]>;
  getOrderStatus(orderId: string): Promise<OrderStatus>;
  findPendingOlderThan(date: Date): Promise<Order[]>;
  autoCancelOlderThan(orderIds: string[], session?: ClientSession): Promise<void>;
}
