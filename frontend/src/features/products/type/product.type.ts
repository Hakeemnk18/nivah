import type { ApiResponse, GetAllDocResponse } from "../../../shared/types/api.types";

/* ----------------------------------
 * Payloads
 * ---------------------------------- */

export type CreateProductPayload = {
  name: string;
  description: string;
  categoryId: string;
  isFeatured: boolean;
  images: AdminProductImage[]
  variants: IVariant[]
};

export type UpdateProductPayload = {
  name: string;
  description: string;
  categoryId: string;
  isFeatured: boolean;
  images: AdminProductImage[]
};

export type UpdateProductParams = {
  id: string;
  data: UpdateProductPayload;
};

export type IVariant = {
  size: string;
  stock: number;
  price: number;
}

/* ----------------------------------
 * Variants (Admin)
 * ---------------------------------- */

export type AdminVariantItem = IVariant & {
  id: string;
  isActive: boolean;
};

export type AddVariantPayload = Omit<AdminVariantItem, "id" | "isActive">
export type UpdateVariantPayload = Omit<AdminVariantItem, "id">


export type UpdateVariantParams = {
  productId: string;
  variantId: string;
  data: UpdateVariantPayload;
};

/* ----------------------------------
 * Images
 * ---------------------------------- */

export type AdminProductImage = {
  url: string;
  publicId: string;
};

export type UserProductImage = {
  url: string;
};

/* ----------------------------------
 * Product Views
 * ---------------------------------- */

export type ProductDetails = {
  id: string;
  name: string;
  description: string;
  images: AdminProductImage[];
  category: {
    id: string;
    name: string;
  };
  variants: AdminVariantItem[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
};

export type ProductListItem = {
  id: string;
  name: string;
  price: number;
  category: {
    id: string;
    name: string;
  };
  description: string;
  isActive: boolean;
  isFeatured: boolean;
};

/* ----------------------------------
 * User Views
 * ---------------------------------- */

export type UserVariantView = {
  size: string;
  price: number;
};

export type AddVariantParams = {
  productId: string;
  data: AddVariantPayload;
};

export type VariantResponse = ApiResponse<AdminVariantItem>;



export type UserProductDetails = {
  id: string;
  name: string;
  description: string;
  images: UserProductImage[];
  categoryId: string;
  variants: UserVariantView[];
};

export type UserProductListItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

/* ----------------------------------
 * API Responses
 * ---------------------------------- */

export type GetProductListResponse =
  GetAllDocResponse<ProductListItem[]>;

export type GetProductDetailsResponse =
  ApiResponse<ProductDetails>;

/* ----------------------------------
 * React Query Keys (Admin)
 * ---------------------------------- */

export type AdminProductQueryKey = [
  "admin-products",
  {
    currentPage: number;
    search: string;
    sort: string;
    filters: Record<string, any>;
  }
];
