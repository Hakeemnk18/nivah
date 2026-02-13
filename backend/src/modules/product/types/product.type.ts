import { Types } from "mongoose";
import type { Product } from "../entities/product.entity.js";
import type { IdName } from "../../../core/shared/types/id.name.type.js";

export interface IVariant {
  _id: Types.ObjectId;
  size: string;
  stock: number;
  price: number;
  isActive: boolean;
}



export type AdminVariantView = {
  variantId: string;
  size: string;
  stock: number;
  price: number;
  isActive: boolean;
};

export type AddVariantProps = Omit<AdminVariantView, "variantId">;

export type UserVariantView = {
  variantId: string
  stock: number
  size: string;
  price: number;
};

export type EditVariantProps = {
  stock: number;
  price: number;
  isActive: boolean;
}

export type UpdateVariantParams = {
  productId: string;
  variantId: string;
  data: EditVariantProps;
};

export interface IImage {
  url: string;
  publicId: string;
}
export type UserImage = Pick<IImage, "url">;

export type UserProductView = {
  id: string;
  name: string;
  description: string;
  images: UserImage[];
  categoryId: string;
  variants: UserVariantView[];
};

export type ProductView = {
  id: string;
  name: string;
  description: string;
  images: IImage[];
  category: IdName;
  variants: AdminVariantView[];
  isActive: boolean;
  isFeatured: boolean;
};

export type UserProductListView = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type ProductListView = {
  id: string;
  name: string;
  price: number;
  category: IdName;
  isActive: boolean;
  description: string;
  isFeatured: boolean;
};

export type PaginatedUserProductList = {
  data: UserProductListView[];
  nextPage: number | null;
  hasMore: boolean;
};
