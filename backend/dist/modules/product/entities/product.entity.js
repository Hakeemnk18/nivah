export class Product {
    id;
    name;
    description;
    images;
    category;
    variants;
    isActive;
    isFeatured;
    constructor(props) {
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
        const seenSizes = new Set();
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
    activate() {
        if (this.isActive) {
            throw new Error("Product already active");
        }
        return new Product({
            ...this,
            isActive: true,
        });
    }
    deactivate() {
        if (!this.isActive) {
            throw new Error("Product already inactive");
        }
        return new Product({
            ...this,
            isActive: false,
        });
    }
    feature() {
        if (this.isFeatured) {
            throw new Error("Product already featured");
        }
        return new Product({
            ...this,
            isFeatured: true,
        });
    }
    unFeature() {
        if (!this.isFeatured) {
            throw new Error("Product is not featured");
        }
        return new Product({
            ...this,
            isFeatured: false,
        });
    }
    updateDetails(props) {
        const name = props.name.trim();
        const description = props.description.trim();
        if (!name) {
            throw new Error("Product name cannot be empty");
        }
        if (name.length < 2 || name.length > 150) {
            throw new Error("Product name must be between 2 and 150 characters");
        }
        if (description.length < 10 || description.length > 1000) {
            throw new Error("Product description must be between 10 and 1000 characters");
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
//# sourceMappingURL=product.entity.js.map