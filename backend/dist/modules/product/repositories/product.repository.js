import { Types } from "mongoose";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError } from "../../../core/errors/custom.error.js";
import { Product } from "../entities/product.entity.js";
import { ProductModel } from "../infrastructure/product.schema.js";
import { ProductMapper } from "../mappers/product.mapper.js";
const { ObjectId } = Types;
export class ProductRepository {
    async create(productEntity) {
        const persistenceData = ProductMapper.toPersistence(productEntity);
        const created = await ProductModel.create(persistenceData);
        const domainProduct = ProductMapper.toDomain(created);
        if (!domainProduct) {
            throw new CustomError(ResponseMessages.FAILED_TO_MAP, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        return domainProduct;
    }
    async findById(id, session) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        const query = ProductModel.findById(id).lean();
        if (session) {
            query.session(session);
        }
        const foundDocument = await query;
        return ProductMapper.toDomain(foundDocument);
    }
    async save(productEntity) {
        if (!productEntity.id) {
            throw new CustomError(ResponseMessages.ID_MISSING, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        const persistenceData = ProductMapper.toPersistence(productEntity);
        const updatedDocument = await ProductModel.findByIdAndUpdate(productEntity.id, { $set: persistenceData }, { new: true }).lean();
        if (!updatedDocument) {
            throw new CustomError(ResponseMessages.PRODUCT_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        const domainProduct = ProductMapper.toDomain(updatedDocument);
        if (!domainProduct) {
            throw new CustomError(ResponseMessages.FAILED_TO_MAP, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        return domainProduct;
    }
    async findAllForAdmin(allDoc) {
        const { query, page, limit, sort } = allDoc;
        const skip = (page - 1) * limit;
        const documents = await ProductModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .populate("category", "name")
            .lean();
        return documents
            .map(ProductMapper.toAdminListView)
            .filter((p) => p !== null);
    }
    async countDocument(query) {
        return ProductModel.countDocuments(query);
    }
    /* ================= ADMIN: FULL PRODUCT ================= */
    async findProductForAdmin(id) {
        if (!ObjectId.isValid(id))
            return null;
        const document = await ProductModel.findById(id)
            .populate("category", "name")
            .lean();
        return ProductMapper.toAdminView(document);
    }
    async findProductForUser(id) {
        if (!ObjectId.isValid(id))
            return null;
        const document = await ProductModel.findOne({
            _id: id,
            isActive: true,
        }).lean();
        return ProductMapper.toUserView(document);
    }
    async addVariants(productId, variants) {
        const updated = await ProductModel.findByIdAndUpdate(productId, {
            $push: {
                variants: {
                    $each: variants.map((v) => ({
                        size: v.size,
                        stock: v.stock,
                        price: v.price,
                    })),
                },
            },
        }, { new: true }).lean();
        return ProductMapper.toDomain(updated);
    }
    async updateVariantById(params) {
        const { productId, variantId, data } = params;
        return await ProductModel.findOneAndUpdate({ _id: productId }, {
            $set: {
                "variants.$[variant].stock": data.stock,
                "variants.$[variant].price": data.price,
                "variants.$[variant].isActive": data.isActive,
            },
        }, {
            arrayFilters: [{ "variant._id": variantId }],
            new: true,
            runValidators: true,
        });
    }
    async findProductVariant(productId, variantId, isActive) {
        const query = {
            _id: new Types.ObjectId(productId),
        };
        if (isActive !== undefined) {
            query.isActive = isActive;
        }
        const document = await ProductModel.aggregate([
            { $match: query },
            { $unwind: "$variants" },
            { $match: { "variants._id": new Types.ObjectId(variantId) } },
            {
                $project: {
                    _id: 0,
                    variant: "$variants",
                },
            },
        ]);
        const data = document?.[0]?.variant;
        if (!data)
            return null;
        return ProductMapper.toVariantView(data);
    }
    async findFeaturedProducts() {
        const documents = await ProductModel.find({
            isActive: true,
            isFeatured: true,
        })
            .sort({ createdAt: -1 })
            .limit(4)
            .lean();
        return documents
            .map(ProductMapper.toUserListView)
            .filter((p) => p !== null);
    }
    async findAllForUser(allDoc) {
        const { query, limit, sort, page } = allDoc;
        const skip = (page - 1) * limit;
        const documents = await ProductModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .populate("category", "name")
            .lean();
        const totalCount = await ProductModel.countDocuments(query);
        const hasMore = skip + documents.length < totalCount;
        const data = documents
            .map(ProductMapper.toUserListView)
            .filter((p) => p !== null);
        return {
            data,
            nextPage: hasMore ? page + 1 : null,
            hasMore
        };
    }
    async findRelatedProducts(categoryId) {
        const documents = await ProductModel.find({
            isActive: true,
            category: categoryId,
        })
            .sort({ createdAt: -1 })
            .limit(4)
            .lean();
        return documents
            .map(ProductMapper.toUserListView)
            .filter((p) => p !== null);
    }
    async decrementStock(params) {
        const { productId, variantId, quantity, session } = params;
        await ProductModel.updateOne({
            _id: new Types.ObjectId(productId),
        }, {
            $inc: {
                "variants.$[variant].stock": -quantity,
            },
        }, {
            arrayFilters: [{ "variant._id": new Types.ObjectId(variantId) }],
            ...(session && { session }),
        });
    }
    async incrementStock(params) {
        const { productId, variantId, quantity, session } = params;
        await ProductModel.updateOne({
            _id: new Types.ObjectId(productId),
        }, {
            $inc: {
                "variants.$[variant].stock": quantity,
            },
        }, {
            arrayFilters: [
                { "variant._id": new Types.ObjectId(variantId) },
            ],
            ...(session && { session }),
        });
    }
}
//# sourceMappingURL=product.repository.js.map