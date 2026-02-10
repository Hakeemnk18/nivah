import type { IImage } from "../types/product.type.js";

export type ProductVariant = {
  id?: string;
  size: string; // string, not enum
  stock: number;
  price: number;
  isActive?: boolean;
};

export type ProductProps = {
  id?: string | null;
  name: string;
  description: string;
  images: IImage[];
  category: string; // sub-category ID
  variants: ProductVariant[];
  isActive?: boolean;
  isFeatured?: boolean;
};

export class Product {
  public readonly id: string | null;
  public readonly name: string;
  public readonly description: string;
  public readonly images: IImage[];
  public readonly category: string;
  public readonly variants: ProductVariant[];
  public readonly isActive: boolean;
  public readonly isFeatured: boolean;

  constructor(props: ProductProps) {
    const name = props.name.trim();

    if (!name) {
      throw new Error("Product name cannot be empty");
    }

    if (name.length < 2 || name.length > 150) {
      throw new Error("Product name must be between 2 and 150 characters");
    }

    if (!props.description?.trim()) {
      throw new Error("Product description is required");
    }

    if (props.description.trim().length > 1000) {
      throw new Error("Product description cannot exceed 1000 characters");
    }

    if (!props.images || props.images.length === 0) {
      throw new Error("At least one product image is required");
    }

    if (!props.category) {
      throw new Error("Product category is required");
    }

    if (!props.variants || props.variants.length === 0) {
      throw new Error("At least one product variant is required");
    }

    const seenSizes = new Set<string>();

    for (const variant of props.variants) {
      if (!variant.size || !variant.size.trim()) {
        throw new Error("Variant size is required");
      }

      if (seenSizes.has(variant.size)) {
        throw new Error(`Duplicate variant size: ${variant.size}`);
      }

      seenSizes.add(variant.size);

      if (variant.stock < 0) {
        throw new Error("Variant stock cannot be negative");
      }

      if (variant.price < 0) {
        throw new Error("Variant price cannot be negative");
      }
    }

    this.id = props.id ?? null;
    this.name = name;
    this.description = props.description.trim();
    this.images = props.images;
    this.category = props.category;
    this.variants = props.variants.map((v) => ({
      ...v,
      isActive: v.isActive ?? true,
    }));
    this.isActive = props.isActive ?? true;
    this.isFeatured = props.isFeatured ?? false;
  }

  activate(): Product {
    if (this.isActive) {
      throw new Error("Product already active");
    }

    return new Product({
      ...this,
      isActive: true,
    });
  }

  deactivate(): Product {
    if (!this.isActive) {
      throw new Error("Product already inactive");
    }

    return new Product({
      ...this,
      isActive: false,
    });
  }

  feature(): Product {
    if (this.isFeatured) {
      throw new Error("Product already featured");
    }

    return new Product({
      ...this,
      isFeatured: true,
    });
  }

  unFeature(): Product {
    if (!this.isFeatured) {
      throw new Error("Product is not featured");
    }

    return new Product({
      ...this,
      isFeatured: false,
    });
  }

  updateDetails(props: {
    name: string;
    description: string;
    images: { url: string; publicId: string }[];
    categoryId: string;
    isFeatured: boolean;
  }): Product {
    const name = props.name.trim();
    const description = props.description.trim();

    if (!name) {
      throw new Error("Product name cannot be empty");
    }

    if (name.length < 2 || name.length > 150) {
      throw new Error("Product name must be between 2 and 150 characters");
    }

    if (description.length < 10 || description.length > 1000) {
      throw new Error(
        "Product description must be between 10 and 1000 characters",
      );
    }

    if (!props.images || props.images.length < 1 || props.images.length > 3) {
      throw new Error("Product must have between 1 and 3 images");
    }

    if (!props.categoryId) {
      throw new Error("Product category is required");
    }

    return new Product({
      ...this,
      name,
      description,
      images: props.images,
      category: props.categoryId,
      isFeatured: props.isFeatured,
    });
  }
}
