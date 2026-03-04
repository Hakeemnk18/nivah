import { Types } from "mongoose";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError } from "../../../core/errors/custom.error.js";
import { Order } from "../entities/order.entity.js";
import { OrderModel } from "../infrastructure/order.schema.js";
import { OrderMapper } from "../mappers/order.mapper.js";
import { PaymentModel } from "../../payment/infrastructure/payment.schema.js";
const { ObjectId } = Types;
export class OrderRepository {
    /* ================= CREATE ================= */
    async create(orderEntity) {
        const persistenceData = OrderMapper.toPersistence(orderEntity);
        const created = await OrderModel.create(persistenceData);
        const domainOrder = OrderMapper.toDomain(created);
        if (!domainOrder) {
            throw new CustomError(ResponseMessages.FAILED_TO_MAP, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        return domainOrder;
    }
    /* ================= SAVE ================= */
    async save(orderEntity) {
        if (!orderEntity.id) {
            throw new CustomError(ResponseMessages.ID_MISSING, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        const persistenceData = OrderMapper.toPersistence(orderEntity);
        const updated = await OrderModel.findByIdAndUpdate(orderEntity.id, { $set: persistenceData }, { new: true }).lean();
        if (!updated) {
            throw new CustomError(ResponseMessages.ORDER_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        const domainOrder = OrderMapper.toDomain(updated);
        if (!domainOrder) {
            throw new CustomError(ResponseMessages.FAILED_TO_MAP, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        return domainOrder;
    }
    /* ================= CHANGE STATUS ================= */
    async changeStatus(orderId, status, session) {
        if (!ObjectId.isValid(orderId))
            return null;
        const updated = await OrderModel.findByIdAndUpdate(orderId, { $set: { orderStatus: status } }, { new: true, session: session ?? null }).lean();
        return OrderMapper.toDomain(updated);
    }
    /* ================= FIND BY ID ================= */
    async findById(id, session) {
        if (!ObjectId.isValid(id))
            return null;
        const query = OrderModel.findById(id).lean();
        if (session) {
            query.session(session);
        }
        const document = await query;
        return OrderMapper.toDomain(document);
    }
    async getOrderStatus(orderId) {
        const document = await OrderModel.findById(orderId).lean();
        return document?.orderStatus ?? "created";
    }
    async findPendingOlderThan(date) {
        const documents = await OrderModel.find({
            orderStatus: "created",
            createdAt: { $lt: date },
        }).lean();
        return documents
            .map(OrderMapper.toDomain)
            .filter((o) => o !== null);
    }
    async autoCancelOlderThan(orderIds, session) {
        const result = await OrderModel.updateMany({
            orderStatus: "created",
            _id: { $in: orderIds },
        }, {
            $set: {
                orderStatus: "cancelled",
                cancelledAt: new Date(),
                cancelReason: "Auto cancelled due to payment timeout",
            },
        }, session ? { session } : {});
        if (result.modifiedCount === 0) {
            throw new Error(ResponseMessages.ORDER_NOT_FOUND);
        }
    }
    // confirm order
    async confirmOrder(orderId, session) {
        const result = await OrderModel.updateOne({ _id: orderId, orderStatus: "created" }, { $set: { orderStatus: "confirmed", confirmedAt: new Date() } }, session ? { session } : {});
        if (result.modifiedCount === 0) {
            throw new Error(ResponseMessages.ORDER_NOT_FOUND);
        }
    }
    // cancel order
    async cancelOrder(orderId, session) {
        const result = await OrderModel.updateOne({ _id: orderId, orderStatus: { $nin: ["cancelled", "delivered"] } }, {
            $set: {
                orderStatus: "cancelled",
                cancelledAt: new Date(),
                cancelReason: "Payment failed",
            },
        }, session ? { session } : {});
        if (result.modifiedCount === 0) {
            throw new Error(ResponseMessages.ORDER_NOT_FOUND);
        }
    }
    // get order summary
    async getSummary(orderId, guestId) {
        const document = await OrderModel.findOne({ _id: orderId, guestId }).lean();
        return OrderMapper.toSummaryView(document);
    }
    async getAdminOrderList(allDoc) {
        const { query, page, limit, sort } = allDoc;
        const skip = (page - 1) * limit;
        const documents = await OrderModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean();
        return documents
            .map(OrderMapper.toAdminOrderListItem)
            .filter((o) => o !== null);
    }
    async countDocuments(query) {
        return OrderModel.countDocuments(query);
    }
    // dispatch order
    async dispatchOrder(orderId, session) {
        const result = await OrderModel.updateOne({ _id: orderId, orderStatus: "accepted" }, { $set: { orderStatus: "dispatched", dispatchedAt: new Date() } }, session ? { session } : {});
        if (result.modifiedCount === 0) {
            throw new Error(ResponseMessages.ORDER_NOT_FOUND);
        }
    }
    // deliver order
    async deliverOrder(orderId, session) {
        const result = await OrderModel.updateOne({ _id: orderId, orderStatus: "dispatched" }, { $set: { orderStatus: "delivered", deliveredAt: new Date() } }, session ? { session } : {});
        if (result.modifiedCount === 0) {
            throw new Error(ResponseMessages.ORDER_NOT_FOUND);
        }
    }
    // accept order
    async acceptOrder(orderId, session) {
        const result = await OrderModel.updateOne({ _id: orderId, orderStatus: "confirmed" }, { $set: { orderStatus: "accepted", acceptedAt: new Date() } }, session ? { session } : {});
        if (result.modifiedCount === 0) {
            throw new Error(ResponseMessages.ORDER_NOT_FOUND);
        }
    }
    async getAdminOrderFullView(orderId) {
        const document = await OrderModel.findById(orderId).lean();
        if (!document)
            return null;
        const payment = await PaymentModel.findOne({
            orderId: document._id,
        }).lean();
        return OrderMapper.toAdminOrderFullView(document, payment);
    }
    async getAdminSummery(orderId) {
        const document = await OrderModel.findOne({ _id: orderId }).lean();
        return OrderMapper.toSummaryView(document);
    }
    async getOrdersForRevenue(startDate, endDate) {
        const documents = await OrderModel.find({
            createdAt: { $gte: startDate, $lte: endDate },
            orderStatus: { $in: ["confirmed", "accepted", "dispatched"] },
        }, { createdAt: 1, totalAmount: 1, _id: 0 }).lean();
        return documents.map((doc) => ({
            createdAt: doc.createdAt,
            totalAmount: doc.totalAmount,
        }));
    }
    async getAggregateKpiStats(startDate, endDate) {
        const result = await OrderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    orderStatus: { $in: ["confirmed", "accepted", "dispatched"] }, // Only valid orders
                },
            },
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: "$totalAmount" },
                },
            },
        ]);
        return result[0] || { totalOrders: 0, totalRevenue: 0 };
    }
    async getDailyKpiStats(startDate, endDate) {
        return await OrderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    orderStatus: { $in: ["confirmed", "accepted", "dispatched"] },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    orders: { $sum: 1 },
                    revenue: { $sum: "$totalAmount" },
                },
            },
            { $sort: { _id: 1 } }, // Sort by date ascending
        ]);
    }
    async getPendingOrdersCount() {
        return await OrderModel.countDocuments({ orderStatus: "created" });
    }
    async getNewUsersCount(startDate, endDate) {
        const result = await OrderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                },
            },
            {
                $group: {
                    _id: "$guestId",
                },
            },
            {
                $count: "totalUniqueUsers",
            },
        ]);
        return result[0]?.totalUniqueUsers || 0;
    }
    async getDailyNewUsers(startDate, endDate) {
        return await OrderModel.aggregate([
            // 1️⃣ Create unified user key
            {
                $addFields: {
                    customerId: {
                        $ifNull: ["$userId", "$guestId"],
                    },
                },
            },
            // 2️⃣ Find each user's FIRST order ever
            {
                $group: {
                    _id: "$customerId",
                    firstOrderDate: { $min: "$createdAt" },
                },
            },
            // 3️⃣ Keep only users whose first order falls inside range
            {
                $match: {
                    firstOrderDate: { $gte: startDate, $lte: endDate },
                },
            },
            // 4️⃣ Group by day
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$firstOrderDate",
                        },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
    }
    async getProductRankings(startDate, endDate, sortDirection, limit) {
        const raw = await OrderModel.aggregate([
            // 1. Match valid orders within the date range
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    orderStatus: {
                        $in: ["confirmed", "accepted", "dispatched", "delivered"],
                    },
                },
            },
            // 2. Unwind the items array so we can group by individual products
            { $unwind: "$items" },
            // 3. Group by productId and sum up quantity and revenue
            {
                $group: {
                    _id: "$items.productId",
                    name: { $first: "$items.name" },
                    totalQuantitySold: { $sum: "$items.quantity" },
                    totalRevenue: {
                        $sum: { $multiply: ["$items.quantity", "$items.price"] },
                    },
                },
            },
            // 4. Sort based on direction (1 for low-to-high, -1 for high-to-low)
            { $sort: { totalQuantitySold: sortDirection } },
            // 5. Limit to top 5 (or however many requested)
            { $limit: limit },
            // 6. Lookup the product to get the image
            {
                $lookup: {
                    from: "products", // Ensure this exactly matches your MongoDB collection name for products
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDoc",
                },
            },
            // 7. Flatten the product lookup array
            { $unwind: { path: "$productDoc", preserveNullAndEmptyArrays: true } },
            // 8. Format the final output to exactly match the type
            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    name: 1,
                    totalQuantitySold: 1,
                    totalRevenue: 1,
                    // Grab the first image from the product's images array
                    iconUrl: { $arrayElemAt: ["$productDoc.images.url", 0] },
                },
            },
        ]);
        return raw
            .map((item) => OrderMapper.toTopAndLowSellingProductItem(item))
            .filter((o) => o !== null);
    }
    async getTopSellingCategories(startDate, endDate, limit) {
        const raw = await OrderModel.aggregate([
            // 1. Match valid orders from the last year
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    orderStatus: {
                        $in: ["confirmed", "accepted", "dispatched", "delivered"],
                    },
                },
            },
            // 2. Break apart the order items
            { $unwind: "$items" },
            // 3. Group by Product first (Optimizes the lookup)
            {
                $group: {
                    _id: "$items.productId",
                    totalQuantitySold: { $sum: "$items.quantity" },
                    totalRevenue: {
                        $sum: { $multiply: ["$items.quantity", "$items.price"] },
                    },
                },
            },
            // 4. Lookup the Product to get its sub-category and image
            {
                $lookup: {
                    from: "products", // Must match your MongoDB collection name exactly
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDoc",
                },
            },
            { $unwind: { path: "$productDoc", preserveNullAndEmptyArrays: false } },
            // 5. Group by Category (Sub-Category from Product)
            {
                $group: {
                    _id: "$productDoc.category",
                    totalQuantitySold: { $sum: "$totalQuantitySold" },
                    totalRevenue: { $sum: "$totalRevenue" },
                    // Grab the first product's first image to represent this category
                    iconUrl: { $first: { $arrayElemAt: ["$productDoc.images.url", 0] } },
                },
            },
            // 6. Sort by highest quantity sold
            { $sort: { totalQuantitySold: -1 } },
            // 7. Limit to top 5
            { $limit: limit },
            // 8. Lookup the Category to get its actual name
            {
                $lookup: {
                    from: "categories", // Must match your MongoDB collection name exactly
                    localField: "_id",
                    foreignField: "_id",
                    as: "categoryDoc",
                },
            },
            { $unwind: { path: "$categoryDoc", preserveNullAndEmptyArrays: true } },
            // 9. Format output to match TopSellingCategoryItem exactly
            {
                $project: {
                    _id: 0,
                    categoryId: "$_id",
                    name: { $ifNull: ["$categoryDoc.name", "Unknown Category"] },
                    totalQuantitySold: 1,
                    totalRevenue: 1,
                    iconUrl: 1,
                },
            },
        ]);
        return raw
            .map((item) => OrderMapper.toTopSellingCategoryItem(item))
            .filter((o) => o !== null);
    }
    async getOrderStatusCounts() {
        return await OrderModel.aggregate([
            {
                $group: {
                    _id: "$orderStatus",
                    count: { $sum: 1 },
                },
            },
        ]);
    }
    async getRevenueReport(payload) {
        const { startDate, endDate, limit, page } = payload;
        // 1. Filter out cancelled orders and apply date ranges
        const matchStage = {
            orderStatus: { $ne: "cancelled" }, // Only count successful/pending orders
        };
        if (startDate || endDate) {
            matchStage.createdAt = {};
            if (startDate)
                matchStage.createdAt.$gte = startDate;
            if (endDate)
                matchStage.createdAt.$lte = endDate;
        }
        // 2. The Aggregation Pipeline
        const result = await OrderModel.aggregate([
            { $match: matchStage },
            {
                $facet: {
                    // Facet A: Calculate the overall summary for the top cards
                    summary: [
                        {
                            $group: {
                                _id: null,
                                totalRevenue: { $sum: "$totalAmount" },
                                totalOrders: { $sum: 1 },
                            },
                        },
                    ],
                    // Facet B: Calculate the total number of unique days (for totalPages math)
                    totalDaysCount: [
                        {
                            $group: {
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                            },
                        },
                        { $count: "count" },
                    ],
                    // Facet C: Calculate the daily revenue, sort it, and paginate it for the table
                    dailyData: [
                        {
                            $group: {
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                                revenue: { $sum: "$totalAmount" },
                                orders: { $sum: 1 },
                            },
                        },
                        { $sort: { _id: -1 } }, // Newest dates first
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                    ],
                },
            },
        ]);
        const facetData = result[0];
        // Extract Summary (handle case where no orders exist)
        const summaryData = facetData.summary[0] || { totalRevenue: 0, totalOrders: 0 };
        const totalRevenue = summaryData.totalRevenue;
        const totalOrders = summaryData.totalOrders;
        const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
        // Extract Pagination Data
        const totalDays = facetData.totalDaysCount[0]?.count || 0;
        const totalPages = Math.ceil(totalDays / limit);
        // Format Daily Data array
        const dailyData = facetData.dailyData.map((day) => ({
            date: day._id,
            revenue: day.revenue,
            orders: day.orders,
        }));
        const revenueSummery = {
            summary: { totalRevenue, totalOrders, averageOrderValue },
            totalPages: totalPages === 0 ? 1 : totalPages,
            dailyData
        };
        return revenueSummery;
    }
}
//# sourceMappingURL=order.repository.js.map