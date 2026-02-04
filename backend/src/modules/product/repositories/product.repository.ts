import { Types } from "mongoose";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError } from "../../../core/errors/custom.error.js";

import { Product } from "../entities/product.entity.js";
import { ProductModel } from "../infrastructure/product.schema.js";
import type { IProductRepository } from "./product.repository.interface.js";
import { ProductMapper } from "../mappers/product.mapper.js";
import type { IGetAllDocDB } from "../../../core/shared/interfaces/get.all.doc.interface.js";
import type {
  AddVariantProps,
  IVariant,
  ProductListView,
  ProductView,
  UpdateVariantParams,
  UserProductView,
} from "../types/product.type.js";
import type { AddVariantRequestDto } from "../dtos/variant.dto.js";

const { ObjectId } = Types;

export class ProductRepository implements IProductRepository {
  async create(productEntity: Product): Promise<Product> {
    const persistenceData = ProductMapper.toPersistence(productEntity);

    const created = await ProductModel.create(persistenceData);

    const domainProduct = ProductMapper.toDomain(created);
    if (!domainProduct) {
      throw new CustomError(
        ResponseMessages.FAILED_TO_MAP,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    return domainProduct;
  }

  async findById(id: string): Promise<Product | null> {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const foundDocument = await ProductModel.findOne({ _id: id }).lean();
    return ProductMapper.toDomain(foundDocument);
  }

  async save(productEntity: Product): Promise<Product> {
    if (!productEntity.id) {
      throw new CustomError(
        ResponseMessages.ID_MISSING,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    const persistenceData = ProductMapper.toPersistence(productEntity);

    const updatedDocument = await ProductModel.findByIdAndUpdate(
      productEntity.id,
      { $set: persistenceData },
      { new: true },
    ).lean();

    if (!updatedDocument) {
      throw new CustomError(
        ResponseMessages.PRODUCT_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
      );
    }

    const domainProduct = ProductMapper.toDomain(updatedDocument);
    if (!domainProduct) {
      throw new CustomError(
        ResponseMessages.FAILED_TO_MAP,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    return domainProduct;
  }

  async findAllForAdmin(allDoc: IGetAllDocDB): Promise<ProductListView[]> {
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
      .filter((p): p is ProductListView => p !== null);
  }

  async countDocument(query: Record<string, any>): Promise<number> {
    return ProductModel.countDocuments(query);
  }

  /* ================= ADMIN: FULL PRODUCT ================= */
  async findProductForAdmin(id: string): Promise<ProductView | null> {
    if (!ObjectId.isValid(id)) return null;

    const document = await ProductModel.findById(id)
      .populate("category", "name")
      .lean();

    return ProductMapper.toAdminView(document);
  }

  /* ================= USER: FULL PRODUCT ================= */
  async findProductForUser(id: string): Promise<UserProductView | null> {
    if (!ObjectId.isValid(id)) return null;

    const document = await ProductModel.findOne({
      _id: id,
      isActive: true,
    }).lean();

    return ProductMapper.toUserView(document);
  }

  async addVariants(
    productId: string,
    variants: AddVariantProps[],
  ): Promise<Product | null> {
    const updated = await ProductModel.findByIdAndUpdate(
      productId,
      {
        $push: {
          variants: {
            $each: variants.map((v) => ({
              size: v.size,
              stock: v.stock,
              price: v.price,
              isAvailable: v.isAvailable,
            })),
          },
        },
      },
      { new: true },
    ).lean();

    return ProductMapper.toDomain(updated);
  }

  async updateVariantById(
    params: UpdateVariantParams,
  ): Promise<Product | null> {
    const { productId, variantId, data } = params;

    return await ProductModel.findOneAndUpdate(
      { _id: productId },
      {
        $set: {
          "variants.$[variant].size": data.size,
          "variants.$[variant].stock": data.stock,
          "variants.$[variant].price": data.price,
          "variants.$[variant].isAvailable": data.isAvailable,
        },
      },
      {
        arrayFilters: [{ "variant._id": variantId }],
        new: true, 
        runValidators: true, 
      },
    );
  }
}
