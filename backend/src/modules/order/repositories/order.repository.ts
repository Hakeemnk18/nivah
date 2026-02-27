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
  AdminOrderFullView,
  AdminOrderListItem,
  AutoCancelPayload,
  IOrderLean,
  IPaymentLean,
  OrderListView,
  OrderSummaryView,
} from "../types/order.type.js";
import type { OrderStatus } from "../types/order.type.js";
import type { ClientSession } from "mongoose";
import { PaymentModel } from "../../payment/infrastructure/payment.schema.js";

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
    session?: ClientSession,
  ): Promise<Order | null> {
    if (!ObjectId.isValid(orderId)) return null;

    const updated = await OrderModel.findByIdAndUpdate(
      orderId,
      { $set: { orderStatus: status } },
      { new: true, session: session ?? null },
    ).lean();

    return OrderMapper.toDomain(updated);
  }

  /* ================= FIND BY ID ================= */

  async findById(id: string, session?: ClientSession): Promise<Order | null> {
    if (!ObjectId.isValid(id)) return null;

    const query = OrderModel.findById(id).lean();

    if (session) {
      query.session(session);
    }

    const document = await query;

    return OrderMapper.toDomain(document);
  }

  async getOrderStatus(orderId: string): Promise<OrderStatus> {
    const document = await OrderModel.findById(orderId).lean();
    return document?.orderStatus ?? "created";
  }

  async findPendingOlderThan(date: Date): Promise<Order[]> {
    const documents = await OrderModel.find({
      orderStatus: "created",
      createdAt: { $lt: date },
    }).lean();

    return documents
      .map(OrderMapper.toDomain)
      .filter((o): o is Order => o !== null);
  }

  async autoCancelOlderThan(
    orderIds: string[],
    session?: ClientSession,
  ): Promise<void> {
    const result = await OrderModel.updateMany(
      {
        orderStatus: "created",
        _id: { $in: orderIds },
      },
      {
        $set: {
          orderStatus: "cancelled",
          cancelledAt: new Date(),
          cancelReason: "Auto cancelled due to payment timeout",
        },
      },
      session ? { session } : {},
    );

    if (result.modifiedCount === 0) {
      throw new Error(ResponseMessages.ORDER_NOT_FOUND);
    }
  }

  // confirm order
  async confirmOrder(orderId: string, session?: ClientSession): Promise<void> {
    const result = await OrderModel.updateOne(
      { _id: orderId, orderStatus: "created" },
      { $set: { orderStatus: "confirmed", confirmedAt: new Date() } },
      session ? { session } : {},
    );

    if (result.modifiedCount === 0) {
      throw new Error(ResponseMessages.ORDER_NOT_FOUND);
    }
  }

  // cancel order
  async cancelOrder(orderId: string, session?: ClientSession): Promise<void> {
    const result = await OrderModel.updateOne(
      { _id: orderId, orderStatus: { $nin: ["cancelled", "delivered"] } },
      {
        $set: {
          orderStatus: "cancelled",
          cancelledAt: new Date(),
          cancelReason: "Payment failed",
        },
      },
      session ? { session } : {},
    );

    if (result.modifiedCount === 0) {
      throw new Error(ResponseMessages.ORDER_NOT_FOUND);
    }
  }

  // get order summary
  async getSummary(
    orderId: string,
    guestId: string,
  ): Promise<OrderSummaryView | null> {
    const document = await OrderModel.findOne({ _id: orderId, guestId }).lean();
    return OrderMapper.toSummaryView(document);
  }

  async getAdminOrderList(allDoc: IGetAllDocDB): Promise<AdminOrderListItem[]> {
    const { query, page, limit, sort } = allDoc;
    const skip = (page - 1) * limit;

    const documents = await OrderModel.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    return documents
      .map(OrderMapper.toAdminOrderListItem)
      .filter((o): o is AdminOrderListItem => o !== null);
  }

  async countDocuments(query: Record<string, any>): Promise<number> {
    return OrderModel.countDocuments(query);
  }

  // dispatch order
  async dispatchOrder(orderId: string, session?: ClientSession): Promise<void> {
    const result = await OrderModel.updateOne(
      { _id: orderId, orderStatus: "accepted" },
      { $set: { orderStatus: "dispatched", dispatchedAt: new Date() } },
      session ? { session } : {},
    );

    if (result.modifiedCount === 0) {
      throw new Error(ResponseMessages.ORDER_NOT_FOUND);
    }
  }

  // deliver order
  async deliverOrder(orderId: string, session?: ClientSession): Promise<void> {
    const result = await OrderModel.updateOne(
      { _id: orderId, orderStatus: "dispatched" },
      { $set: { orderStatus: "delivered", deliveredAt: new Date() } },
      session ? { session } : {},
    );

    if (result.modifiedCount === 0) {
      throw new Error(ResponseMessages.ORDER_NOT_FOUND);
    }
  }

  // accept order
  async acceptOrder(orderId: string, session?: ClientSession): Promise<void> {
    const result = await OrderModel.updateOne(
      { _id: orderId, orderStatus: "confirmed" },
      { $set: { orderStatus: "accepted", acceptedAt: new Date() } },
      session ? { session } : {},
    );

    if (result.modifiedCount === 0) {
      throw new Error(ResponseMessages.ORDER_NOT_FOUND);
    }
  }

  async getAdminOrderFullView(
    orderId: string,
  ): Promise<AdminOrderFullView | null> {
    const document = await OrderModel.findById(orderId).lean<IOrderLean>();
    if (!document) return null;
    const payment = await PaymentModel.findOne({
      orderId: document._id,
    }).lean<IPaymentLean>();
    return OrderMapper.toAdminOrderFullView(document, payment);
  }

  async getAdminSummery(orderId: string): Promise<OrderSummaryView | null> {
    const document = await OrderModel.findOne({ _id: orderId }).lean();
    return OrderMapper.toSummaryView(document);
  }

  async getOrdersForRevenue(
    startDate: Date,
    endDate: Date,
  ): Promise<{ createdAt: Date; totalAmount: number }[]> {
    const documents = await OrderModel.find({
      createdAt: { $gte: startDate, $lte: endDate },
      orderStatus: { $in: ["confirmed", "accepted", "dispatched"] },
    },{ createdAt: 1, totalAmount: 1, _id: 0 })
    .lean<{ createdAt: Date; totalAmount: number }[]>();

    return documents.map((doc) => ({
      createdAt: doc.createdAt!,
      totalAmount: doc.totalAmount,
    }));
  }
}
