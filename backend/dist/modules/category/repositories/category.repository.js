import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError } from "../../../core/errors/custom.error.js";
import { Types } from "mongoose";
import { Category } from "../entities/category.entity.js";
import { CategoryModel } from "../infrastructure/category.schema.js";
import { CategoryMapper } from "../mappers/category.mapper.js";
const { ObjectId } = Types;
export class CategoryRepository {
    async create(categoryEntity) {
        const persistenceData = CategoryMapper.toPersistence(categoryEntity);
        const created = await CategoryModel.create(persistenceData);
        const domainCategory = CategoryMapper.toDomain(created);
        if (!domainCategory) {
            throw new CustomError(ResponseMessages.FAILED_TO_MAP, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        return domainCategory;
    }
    async findById(id) {
        const foundDocument = await CategoryModel.findOne({ _id: id }).lean();
        return CategoryMapper.toDomain(foundDocument);
    }
    async findByNameAndParent(name, parentId) {
        const foundDocument = await CategoryModel.findOne({
            name,
            parentId: parentId ? new ObjectId(parentId) : null,
        }).lean();
        return CategoryMapper.toDomain(foundDocument);
    }
    async save(categoryEntity) {
        if (!categoryEntity.id) {
            throw new CustomError(ResponseMessages.ID_MISSING, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        const persistenceData = CategoryMapper.toPersistence(categoryEntity);
        const updatedDocument = await CategoryModel.findByIdAndUpdate(categoryEntity.id, { $set: persistenceData }, { new: true }).lean();
        if (!updatedDocument) {
            throw new CustomError(ResponseMessages.CATEGORY_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        const domainCategory = CategoryMapper.toDomain(updatedDocument);
        if (!domainCategory) {
            throw new CustomError(ResponseMessages.FAILED_TO_MAP, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        return domainCategory;
    }
    async findAllForAdmin(allDoc) {
        const { query, page, limit, sort } = allDoc;
        const skip = (page - 1) * limit;
        const documents = await CategoryModel.find(query)
            .sort(sort)
            .collation({ locale: "en", strength: 1 })
            .skip(skip)
            .limit(limit)
            .lean();
        return documents
            .map(CategoryMapper.toDomain)
            .filter((c) => c !== null);
    }
    // 🔹 MAIN CATEGORIES (USER)
    async findAllMainCategoriesForUser() {
        const documents = await CategoryModel.find({
            parentId: null,
            isActive: true,
        })
            .sort({ name: 1 })
            .lean();
        return documents
            .map(CategoryMapper.toDomain)
            .filter((c) => c !== null);
    }
    // 🔹 SUB CATEGORIES (USER)
    async findSubCategoriesForUser(parentId) {
        const documents = await CategoryModel.find({
            parentId: new ObjectId(parentId),
            isActive: true,
        })
            .sort({ name: 1 })
            .lean();
        return documents
            .map(CategoryMapper.toDomain)
            .filter((c) => c !== null);
    }
    async findSubCategoriesForAdmin(parentId) {
        const documents = await CategoryModel.find({
            parentId: new ObjectId(parentId),
        })
            .sort({ name: 1 })
            .lean();
        return documents
            .map(CategoryMapper.toDomain)
            .filter((c) => c !== null);
    }
    async countDocument(query) {
        return await CategoryModel.countDocuments(query);
    }
    async findAllSubCategories(query) {
        const documents = await CategoryModel.find(query)
            .sort({ name: 1 })
            .lean();
        return documents.map((item) => ({
            id: item._id.toString(),
            name: item.name
        }));
    }
    async findSignatureCategories() {
        const signatureCategories = await CategoryModel.aggregate([
            // 1. Main categories only
            {
                $match: {
                    parentId: null,
                    isActive: true,
                },
            },
            // 2. Get subcategories
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "parentId",
                    as: "subCategories",
                },
            },
            // 3. Flatten subcategories
            { $unwind: "$subCategories" },
            // 4. Join products using subcategory ID
            {
                $lookup: {
                    from: "products",
                    let: { subCategoryId: "$subCategories._id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$category", "$$subCategoryId"] },
                                        { $eq: ["$isActive", true] },
                                    ],
                                },
                            },
                        },
                        // { $sort: { createdAt: -1 } }, // stable
                        { $limit: 1 },
                        {
                            $project: {
                                images: 1,
                            },
                        },
                    ],
                    as: "product",
                },
            },
            // 5. Keep only categories that actually have products
            {
                $match: {
                    product: { $ne: [] },
                },
            },
            // // 6. Group back to main category (VERY IMPORTANT)
            {
                $group: {
                    _id: "$_id",
                    categoryName: { $first: "$name" },
                    productImage: {
                        $first: { $arrayElemAt: ["$product.images", 0] },
                    },
                },
            },
            // // 7. Shape response
            {
                $project: {
                    _id: 0,
                    categoryId: "$_id",
                    categoryName: 1,
                    productImage: 1,
                },
            },
            // // 8. Limit to 4
            { $limit: 4 },
        ]);
        return signatureCategories.map((item) => ({
            id: item.categoryId.toString(),
            name: item.categoryName,
            image: item.productImage[0].url
        }));
    }
}
//# sourceMappingURL=category.repository.js.map