import { Types } from "mongoose";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError } from "../../../core/errors/custom.error.js";

import { Order } from "../entities/order.entity.js";
import { OrderModel } from "../infrastructure/order.schema.js";
import { OrderMapper } from "../mappers/order.mapper.js";
import type { IOrderRepository } from "./order.repository.interface.js";

import type { IGetAllDocDB } from "../../../core/shared/interfaces/get.all.doc.interface.js";
import type {
  OrderListView,
} from "../types/order.type.js";
import type { OrderStatus } from "../types/order.type.js";

const { ObjectId } = Types;

export class OrderRepository implements IOrderRepository {

  /* ================= CREATE ================= */

  async create(orderEntity: Order): Promise<Order> {
    const persistenceData = OrderMapper.toPersistence(orderEntity);

    const created = await OrderModel.create(persistenceData);

    const domainOrder = OrderMapper.toDomain(created);

    if (!domainOrder) {
      throw new CustomError(
        ResponseMessages.FAILED_TO_MAP,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    return domainOrder;
  }

  /* ================= SAVE ================= */

  async save(orderEntity: Order): Promise<Order> {
    if (!orderEntity.id) {
      throw new CustomError(
        ResponseMessages.ID_MISSING,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    const persistenceData = OrderMapper.toPersistence(orderEntity);

    const updated = await OrderModel.findByIdAndUpdate(
      orderEntity.id,
      { $set: persistenceData },
      { new: true },
    ).lean();

    if (!updated) {
      throw new CustomError(
        ResponseMessages.ORDER_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
      );
    }

    const domainOrder = OrderMapper.toDomain(updated);

    if (!domainOrder) {
      throw new CustomError(
        ResponseMessages.FAILED_TO_MAP,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    return domainOrder;
  }

  /* ================= CHANGE STATUS ================= */

  async changeStatus(
    orderId: string,
    status: OrderStatus,
  ): Promise<Order | null> {
    if (!ObjectId.isValid(orderId)) return null;

    const updated = await OrderModel.findByIdAndUpdate(
      orderId,
      { $set: { orderStatus: status } },
      { new: true },
    ).lean();

    return OrderMapper.toDomain(updated);
  }

  /* ================= FIND BY ID ================= */

  async findById(id: string): Promise<Order | null> {
    if (!ObjectId.isValid(id)) return null;

    const document = await OrderModel.findById(id).lean();

    return OrderMapper.toDomain(document);
  }

  /* ================= ADMIN LIST ================= */

  async findAllForAdmin(
    allDoc: IGetAllDocDB,
  ): Promise<OrderListView[]> {
    const { query, page, limit, sort } = allDoc;
    const skip = (page - 1) * limit;

    const documents = await OrderModel.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    return documents
      .map(OrderMapper.toAdminListView)
      .filter((o): o is OrderListView => o !== null);
  }
}
