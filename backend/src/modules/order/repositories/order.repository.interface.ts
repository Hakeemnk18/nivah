import type { IGetAllDocDB } from "../../../core/shared/interfaces/get.all.doc.interface.js";
import { Order } from "../entities/order.entity.js";
import type {
  OrderListView,
  OrderView,
} from "../types/order.type.js";
import type { OrderStatus } from "../types/order.type.js";

export interface IOrderRepository {
  create(orderEntity: Order): Promise<Order>;

  save(orderEntity: Order): Promise<Order>;

  changeStatus(
    orderId: string,
    status: OrderStatus,
  ): Promise<Order | null>;

  findById(id: string): Promise<Order | null>;

  findAllForAdmin(
    allDoc: IGetAllDocDB,
  ): Promise<OrderListView[]>;
}
