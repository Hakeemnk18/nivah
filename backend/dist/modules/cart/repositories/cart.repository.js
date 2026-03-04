import { Types } from "mongoose";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError } from "../../../core/errors/custom.error.js";
import { Cart } from "../entities/cart.entity.js";
import { CartModel } from "../infrastructure/cart.schema.js";
import { CartMapper } from "../mappers/cart.mapper.js";
const DELIVERY_CHARGE = Number(process.env.DELIVERY_CHARGE);
const { ObjectId } = Types;
export class CartRepository {
    async create(cartEntity) {
        const persistenceData = CartMapper.toPersistence(cartEntity);
        const created = await CartModel.create(persistenceData);
        const domainCart = CartMapper.toDomain(created);
        if (!domainCart) {
            throw new CustomError(ResponseMessages.FAILED_TO_MAP, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        return domainCart;
    }
    async findById(id) {
        if (!ObjectId.isValid(id))
            return null;
        const document = await CartModel.findById(id).lean();
        return CartMapper.toDomain(document);
    }
    async findByGuestId(guestId) {
        const document = await CartModel.findOne({
            guestId,
            isActive: true,
        }).lean();
        return CartMapper.toDomain(document);
    }
    async findByUserId(userId) {
        if (!ObjectId.isValid(userId))
            return null;
        const document = await CartModel.findOne({
            userId,
            isActive: true,
        }).lean();
        return CartMapper.toDomain(document);
    }
    async save(cartEntity) {
        if (!cartEntity.id) {
            throw new CustomError(ResponseMessages.ID_MISSING, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        const persistenceData = CartMapper.toPersistence(cartEntity);
        const updated = await CartModel.findByIdAndUpdate(cartEntity.id, { $set: persistenceData }, { new: true }).lean();
        if (!updated) {
            throw new CustomError(ResponseMessages.CART_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        const domainCart = CartMapper.toDomain(updated);
        if (!domainCart) {
            throw new CustomError(ResponseMessages.FAILED_TO_MAP, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        return domainCart;
    }
    async incrementItemQuantity(dto) {
        const { cartId, itemId, quantity, stock, guestId } = dto;
        if (!ObjectId.isValid(cartId))
            return false;
        const updated = await CartModel.findOneAndUpdate({
            _id: cartId,
            isActive: true,
            guestId,
            items: {
                $elemMatch: {
                    _id: itemId,
                    quantity: { $lte: stock - quantity },
                },
            },
        }, {
            $inc: {
                "items.$.quantity": quantity,
            },
        }, {
            new: false
        }).lean();
        return !!updated;
    }
    async pushNewItem(dto) {
        const { cartId, item, stock, guestId } = dto;
        if (!ObjectId.isValid(cartId))
            return false;
        const updated = await CartModel.findOneAndUpdate({
            _id: cartId,
            isActive: true,
            guestId,
            items: {
                $not: {
                    $elemMatch: {
                        productId: item.productId,
                        variantId: item.variantId,
                        quantity: { $lte: stock - item.quantity },
                    },
                },
            },
        }, {
            $push: {
                items: item,
            },
        }, { new: false }).lean();
        return !!updated;
    }
    async findSameItemInCart(dto) {
        const { cartId, itemId } = dto;
        if (!ObjectId.isValid(cartId))
            return false;
        const document = await CartModel.findOne({
            _id: cartId,
            isActive: true,
            items: {
                $elemMatch: {
                    _id: itemId,
                },
            },
        }).lean();
        return !!document;
    }
    async findCartForViewByGuestId(guestId) {
        const result = await CartModel.aggregate([
            {
                $match: { guestId, isActive: true }
            },
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "product"
                }
            },
            { $unwind: "$product" },
            // find selected variant
            {
                $addFields: {
                    selectedVariant: {
                        $first: {
                            $filter: {
                                input: "$product.variants",
                                as: "v",
                                cond: { $eq: ["$$v._id", "$items.variantId"] }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    cartId: "$_id",
                    guestId: 1,
                    itemId: "$items._id",
                    quantity: "$items.quantity",
                    variantId: {
                        id: "$items.variantId",
                        size: "$selectedVariant.size"
                    },
                    product: {
                        name: "$product.name",
                        image: { $arrayElemAt: ["$product.images.url", 0] },
                        price: "$selectedVariant.price"
                    }
                }
            },
            {
                $group: {
                    _id: "$cartId",
                    guestId: { $first: "$guestId" },
                    items: {
                        $push: {
                            id: "$itemId",
                            product: "$product",
                            variantId: "$variantId",
                            quantity: "$quantity"
                        }
                    },
                    totalItems: { $sum: "$quantity" },
                    totalPrice: {
                        $sum: {
                            $multiply: ["$quantity", "$product.price"]
                        }
                    }
                }
            }
        ]);
        if (!result.length)
            return null;
        return CartMapper.toView(result[0]);
    }
    async decrementItemQuantity(dto) {
        const { cartId, itemId, quantity, stock, guestId } = dto;
        if (!ObjectId.isValid(cartId))
            return false;
        const updated = await CartModel.findOneAndUpdate({
            _id: cartId,
            isActive: true,
            guestId,
            items: {
                $elemMatch: {
                    _id: itemId,
                    quantity: { $gt: 1 }
                },
            },
        }, {
            $inc: {
                "items.$.quantity": -quantity,
            },
        }, {
            new: false
        }).lean();
        return !!updated;
    }
    async removeItem(dto) {
        const { cartId, itemId, guestId } = dto;
        if (!ObjectId.isValid(cartId))
            return false;
        const updated = await CartModel.findOneAndUpdate({
            _id: cartId,
            isActive: true,
            guestId,
            items: {
                $elemMatch: {
                    _id: itemId,
                },
            },
        }, {
            $pull: {
                items: {
                    _id: itemId,
                },
            },
        }, {
            new: false
        }).lean();
        return !!updated;
    }
    async getCheckoutViewByGuestId(guestId) {
        const result = await CartModel.aggregate([
            {
                $match: { guestId, isActive: true }
            },
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "product"
                }
            },
            { $unwind: "$product" },
            // find selected variant
            {
                $addFields: {
                    selectedVariant: {
                        $first: {
                            $filter: {
                                input: "$product.variants",
                                as: "v",
                                cond: { $eq: ["$$v._id", "$items.variantId"] }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    cartId: "$_id",
                    quantity: "$items.quantity",
                    variantId: {
                        size: "$selectedVariant.size"
                    },
                    product: {
                        name: "$product.name",
                        image: { $arrayElemAt: ["$product.images.url", 0] },
                        price: "$selectedVariant.price"
                    }
                }
            },
            {
                $group: {
                    _id: "$cartId",
                    items: {
                        $push: {
                            product: "$product",
                            variantId: "$variantId",
                            quantity: "$quantity"
                        }
                    },
                    totalItems: { $sum: "$quantity" },
                    totalPrice: {
                        $sum: {
                            $multiply: ["$quantity", "$product.price"]
                        }
                    }
                }
            }
        ]);
        if (!result.length)
            return null;
        const raw = result[0];
        const subTotal = raw.totalPrice;
        const total = subTotal + DELIVERY_CHARGE;
        return CartMapper.toCheckoutView({
            ...raw,
            subTotal,
            deliveryCharge: DELIVERY_CHARGE,
            total
        });
    }
    async emptyCart(guestId, session) {
        const options = session
            ? { session }
            : {};
        await CartModel.updateOne({
            guestId,
            isActive: true,
        }, {
            $set: {
                items: [],
            },
        }, options);
    }
}
//# sourceMappingURL=cart.repository.js.map