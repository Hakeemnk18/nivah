import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError } from "../../../core/errors/custom.error.js";
import { Types } from "mongoose";

import type { IGetAllDocDB } from "../../../core/shared/interfaces/get.all.doc.interface.js";
import { Category } from "../entities/category.entity.js";
import { CategoryModel } from "../infrastructure/category.schema.js";
import type { ICategoryRepository } from "./category.repository.interface.js";
import { CategoryMapper } from "../mappers/category.mapper.js";
import type { IdName } from "../../../core/shared/types/id.name.type.js";

const { ObjectId } = Types;

export class CategoryRepository implements ICategoryRepository {
  async create(categoryEntity: Category): Promise<Category> {
    const persistenceData = CategoryMapper.toPersistence(categoryEntity);
    const created = await CategoryModel.create(persistenceData);

    const domainCategory = CategoryMapper.toDomain(created);
    if (!domainCategory) {
      throw new CustomError(
        ResponseMessages.FAILED_TO_MAP,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    return domainCategory;
  }

  async findById(id: string): Promise<Category | null> {
    const foundDocument = await CategoryModel.findOne({ _id: id }).lean();
    return CategoryMapper.toDomain(foundDocument);
  }

  async findByNameAndParent(
    name: string,
    parentId: string | null,
  ): Promise<Category | null> {
    const foundDocument = await CategoryModel.findOne({
      name,
      parentId: parentId ? new ObjectId(parentId) : null,
    }).lean();

    return CategoryMapper.toDomain(foundDocument);
  }

  async save(categoryEntity: Category): Promise<Category> {
    if (!categoryEntity.id) {
      throw new CustomError(
        ResponseMessages.ID_MISSING,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    const persistenceData = CategoryMapper.toPersistence(categoryEntity);

    const updatedDocument = await CategoryModel.findByIdAndUpdate(
      categoryEntity.id,
      { $set: persistenceData },
      { new: true },
    ).lean();

    if (!updatedDocument) {
      throw new CustomError(
        ResponseMessages.CATEGORY_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
      );
    }

    const domainCategory = CategoryMapper.toDomain(updatedDocument);
    if (!domainCategory) {
      throw new CustomError(
        ResponseMessages.FAILED_TO_MAP,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    return domainCategory;
  }

  async findAllForAdmin(allDoc: IGetAllDocDB): Promise<Category[]> {
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
      .filter((c): c is Category => c !== null);
  }

  // 🔹 MAIN CATEGORIES (USER)
  async findAllMainCategoriesForUser(): Promise<Category[]> {
    const documents = await CategoryModel.find({
      parentId: null,
      isActive: true,
    })
      .sort({ name: 1 })
      .lean();

    return documents
      .map(CategoryMapper.toDomain)
      .filter((c): c is Category => c !== null);
  }

  // 🔹 SUB CATEGORIES (USER)
  async findSubCategoriesForUser(parentId: string): Promise<Category[]> {
    const documents = await CategoryModel.find({
      parentId: new ObjectId(parentId),
      isActive: true,
    })
      .sort({ name: 1 })
      .lean();

    return documents
      .map(CategoryMapper.toDomain)
      .filter((c): c is Category => c !== null);
  }

  async findSubCategoriesForAdmin(parentId: string): Promise<Category[]> {
    const documents = await CategoryModel.find({
      parentId: new ObjectId(parentId),
    })
      .sort({ name: 1 })
      .lean();

    return documents
      .map(CategoryMapper.toDomain)
      .filter((c): c is Category => c !== null);
  }

  async countDocument(query: Record<string, any>): Promise<number> {
    return await CategoryModel.countDocuments(query);
  }

  async findAllSubCategories(query: Record<string, any>): Promise<IdName[]> {
    const documents = await CategoryModel.find(query)
      .sort({ name: 1 })
      .lean();

    return documents.map((item) => (
      {
        id: item._id.toString(),
        name: item.name
      }
    ))
  }
}
