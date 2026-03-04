import { Product } from "../entities/product.entity.js";
export class ProductMapper {
    static toDomain(productModelData) {
        if (!productModelData) {
            return null;
        }
        const idString = productModelData._id?.toString() || productModelData.id?.toString();
        if (!idString) {
            console.error("Product data from DB is missing an ID:", productModelData);
            return null;
        }
        return new Product({
            id: idString,
            name: productModelData.name,
            description: productModelData.description,
            images: productModelData.images,
            category: productModelData.category?.toString() ||
                productModelData.category ||
                null,
            variants: productModelData.variants?.map((variant) => ({
                id: variant._id?.toString() || variant.id?.toString(),
                size: variant.size,
                stock: variant.stock,
                price: variant.price,
                isAvailable: variant.isAvailable,
            })) ?? [],
            isActive: productModelData.isActive,
            isFeatured: productModelData.isFeatured,
        });
    }
    static toPersistence(productEntity) {
        return {
            name: productEntity.name,
            description: productEntity.description,
            images: productEntity.images,
            category: productEntity.category,
            variants: productEntity.variants.map((variant) => ({
                _id: variant.id,
                size: variant.size,
                stock: variant.stock,
                price: variant.price,
                isActive: variant.isActive,
            })),
            isActive: productEntity.isActive,
            isFeatured: productEntity.isFeatured,
        };
    }
    static toAdminView(productModelData) {
        if (!productModelData)
            return null;
        const id = productModelData._id?.toString() || productModelData.id?.toString();
        if (!id) {
            console.error("Product data missing ID:", productModelData);
            return null;
        }
        const category = productModelData.category;
        if (!category || !category._id || !category.name) {
            console.error("Product category not populated correctly:", productModelData);
            return null;
        }
        return {
            id,
            name: productModelData.name,
            description: productModelData.description,
            images: productModelData.images.map((item) => ({
                publicId: item.publicId,
                url: item.url,
            })),
            category: {
                id: category._id.toString(),
                name: category.name,
            },
            variants: productModelData.variants.map((variant) => ({
                id: variant._id.toString(),
                size: variant.size,
                stock: variant.stock,
                price: variant.price,
                isActive: variant.isActive,
            })),
            isActive: productModelData.isActive,
            isFeatured: productModelData.isFeatured,
        };
    }
    static toAdminListView(productModelData) {
        if (!productModelData)
            return null;
        const id = productModelData._id?.toString() || productModelData.id?.toString();
        if (!id) {
            console.error("Product data missing ID:", productModelData);
            return null;
        }
        const category = productModelData.category;
        if (!category || !category._id || !category.name) {
            console.error("Product category not populated correctly:", productModelData);
            return null;
        }
        return {
            id,
            name: productModelData.name,
            description: productModelData.description,
            price: productModelData.variants?.[0]?.price ?? 0,
            category: {
                id: category._id.toString(),
                name: category.name,
            },
            isActive: productModelData.isActive,
            isFeatured: productModelData.isFeatured,
        };
    }
    /* ================= USER DETAIL VIEW ================= */
    static toUserView(productModelData) {
        if (!productModelData)
            return null;
        const id = productModelData._id?.toString() || productModelData.id?.toString();
        if (!id) {
            console.error("Product data missing ID:", productModelData);
            return null;
        }
        return {
            id,
            name: productModelData.name,
            description: productModelData.description,
            images: productModelData.images.map((item) => ({
                url: item.url,
            })),
            categoryId: productModelData.category?.toString() ||
                productModelData.category ||
                "",
            variants: productModelData.variants.map((variant) => ({
                variantId: variant._id.toString(),
                size: variant.size,
                price: variant.price,
                stock: variant.stock,
            })),
        };
    }
    /* ================= USER LIST VIEW (INFINITE SCROLL) ================= */
    static toUserListView(productModelData) {
        if (!productModelData)
            return null;
        const id = productModelData._id?.toString() || productModelData.id?.toString();
        if (!id) {
            console.error("Product data missing ID:", productModelData);
            return null;
        }
        return {
            id,
            name: productModelData.name,
            price: productModelData.variants?.[0]?.price ?? 0,
            image: productModelData.images?.[0]?.url ?? "",
        };
    }
    static toVariantView(varinatData) {
        if (!varinatData)
            return null;
        const id = varinatData._id?.toString() || varinatData.id?.toString();
        if (!id) {
            console.error("Product data missing ID:", varinatData);
            return null;
        }
        return {
            variantId: id,
            size: varinatData.size,
            stock: varinatData.stock,
            price: varinatData.price,
            isActive: varinatData.isActive,
        };
    }
}
//# sourceMappingURL=product.mapper.js.map