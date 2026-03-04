import type { IImage } from "../types/product.type.js";
export type ProductVariant = {
    id?: string;
    size: string;
    stock: number;
    price: number;
    isActive?: boolean;
};
export type ProductProps = {
    id?: string | null;
    name: string;
    description: string;
    images: IImage[];
    category: string;
    variants: ProductVariant[];
    isActive?: boolean;
    isFeatured?: boolean;
};
export declare class Product {
    readonly id: string | null;
    readonly name: string;
    readonly description: string;
    readonly images: IImage[];
    readonly category: string;
    readonly variants: ProductVariant[];
    readonly isActive: boolean;
    readonly isFeatured: boolean;
    constructor(props: ProductProps);
    activate(): Product;
    deactivate(): Product;
    feature(): Product;
    unFeature(): Product;
    updateDetails(props: {
        name: string;
        description: string;
        images: {
            url: string;
            publicId: string;
        }[];
        categoryId: string;
        isFeatured: boolean;
    }): Product;
}
//# sourceMappingURL=product.entity.d.ts.map