import { inject, injectable } from "tsyringe";
import type { IAutoCancelOrderUseCase } from "./interfaces/auto.cancel-order.use-case.js";
import type { IOrderRepository } from "../repositories/order.repository.interface.js";
import mongoose from "mongoose";
import type { IProductRepository } from "../../product/repositories/product.repository.interface.js";
import type { ICartRepository } from "../../cart/repositories/cart.repository.interface.js";
import type { IPaymentRepository } from "../../payment/repositories/payment.repository.interface.js";

@injectable()
export class AutoCancelOrderUseCase implements IAutoCancelOrderUseCase {
  constructor(
    @inject("IOrderRepository")
    private _orderRepository: IOrderRepository,

    @inject("IProductRepository")
    private _productRepository: IProductRepository,

    @inject("IPaymentRepository")
    private _paymentRepository: IPaymentRepository,
  ) { }

  async execute(): Promise<void> {
    // 10 minutes ago
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    // Find pending orders older than 10 minutes
    const orders = await this._orderRepository.findPendingOlderThan(
      tenMinutesAgo
    );

    if (!orders.length) return;

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      let orderIds: string[] = [];

      for (const order of orders) {
        orderIds.push(order.id!);

        for (const item of order.items) {

          const product = await this._productRepository.findById(
            item.productId,
            session
          );

          if (product) {
            const variant = product.variants.find(
              (v) => v.id === item.variantId
            );

            if (variant) {
              await this._productRepository.incrementStock({
                productId: product.id!,
                variantId: variant.id!,
                quantity: item.quantity,
                session,
              });
            }
          }
        }
      }
      await this._paymentRepository.autoCancelPayment(orderIds, session);
      await this._orderRepository.autoCancelOlderThan(orderIds, session);
      console.log("auto cancel completed")

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}