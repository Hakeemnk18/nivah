import { Types } from "mongoose";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError } from "../../../core/errors/custom.error.js";

import { Cart } from "../entities/cart.entity.js";
import { CartModel } from "../infrastructure/cart.schema.js";
import { CartMapper } from "../mappers/cart.mapper.js";
import type { ICartRepository } from "./cart.repository.interface.js";
import type { AddCartItemPayload, CartView, FindSameItemInCartPayload, PushNewItemPayload } from "../types/cart.type.js";

const { ObjectId } = Types;


export class CartRepository implements ICartRepository {
  async create(cartEntity: Cart): Promise<Cart> {
    const persistenceData = CartMapper.toPersistence(cartEntity);

    const created = await CartModel.create(persistenceData);

    const domainCart = CartMapper.toDomain(created);
    if (!domainCart) {
      throw new CustomError(
        ResponseMessages.FAILED_TO_MAP,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }

    return domainCart;
  }

  async findById(id: string): Promise<Cart | null> {
    if (!ObjectId.isValid(id)) return null;

    const document = await CartModel.findById(id).lean();
    return CartMapper.toDomain(document);
  }

  async findByGuestId(guestId: string): Promise<Cart | null> {
    const document = await CartModel.findOne({
      guestId,
      isActive: true,
    }).lean();

    return CartMapper.toDomain(document);
  }

  async findByUserId(userId: string): Promise<Cart | null> {
    if (!ObjectId.isValid(userId)) return null;

    const document = await CartModel.findOne({
      userId,
      isActive: true,
    }).lean();

    return CartMapper.toDomain(document);
  }

  async save(cartEntity: Cart): Promise<Cart> {
    if (!cartEntity.id) {
      throw new CustomError(
        ResponseMessages.ID_MISSING,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }

    const persistenceData = CartMapper.toPersistence(cartEntity);

    const updated = await CartModel.findByIdAndUpdate(
      cartEntity.id,
      { $set: persistenceData },
      { new: true }
    ).lean();

    if (!updated) {
      throw new CustomError(
        ResponseMessages.CART_NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    const domainCart = CartMapper.toDomain(updated);

    if (!domainCart) {
      throw new CustomError(
        ResponseMessages.FAILED_TO_MAP,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }

    return domainCart;
  }

  async findCartForViewByGuestId(
    guestId: string
  ): Promise<CartView | null> {
    const document = await CartModel.findOne({
      guestId,
      isActive: true,
    }).lean();

    return CartMapper.toView(document);
  }

  async findCartForViewByUserId(
    userId: string
  ): Promise<CartView | null> {
    if (!ObjectId.isValid(userId)) return null;

    const document = await CartModel.findOne({
      userId,
      isActive: true,
    }).lean();

    return CartMapper.toView(document);
  }

  async incrementItemQuantity(
    dto: AddCartItemPayload
  ): Promise<boolean> {
    const { cartId, productId, variantId, quantity } = dto;

    if (!ObjectId.isValid(cartId)) return false;

    const updated = await CartModel.findOneAndUpdate(
      {
        _id: cartId,
        isActive: true,
        items: {
          $elemMatch: {
            productId,
            variantId,
          },
        },
      },
      {
        $inc: {
          "items.$.quantity": quantity,
        },
      },
      {
        new: false
      }
    ).lean();

    return !!updated;
  }

  async pushNewItem(
    dto: PushNewItemPayload
  ): Promise<boolean> {
    const { cartId, item, stock } = dto;
    if (!ObjectId.isValid(cartId)) return false;

    const updated = await CartModel.findOneAndUpdate(
      {
        _id: cartId,
        isActive: true,
        items: {
          $not: {
            $elemMatch: {
              productId: item.productId,
              variantId: item.variantId,
              quantity: { $lte: stock - item.quantity },
            },
          },
        },
      },
      {
        $push: {
          items: item,
        },
      },
      { new: false }
    ).lean();

    return !!updated;
  }

  async findSameItemInCart(
    dto: FindSameItemInCartPayload
  ): Promise<boolean> {
    const { cartId, productId, variantId } = dto;

    if (!ObjectId.isValid(cartId)) return false;

    const document = await CartModel.findOne({
      _id: cartId,
      isActive: true,
      items: {
        $elemMatch: {
          productId,
          variantId,
        },
      },
    }).lean();

    return !!document;
  }
}
