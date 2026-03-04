import type { CategoryProps } from "../types/category.type.js";
export declare class Category {
    readonly id: string | null;
    readonly name: string;
    readonly description: string;
    readonly parentId: string | null;
    readonly isActive: boolean;
    constructor(props: CategoryProps);
    deactivate(): Category;
    activate(): Category;
}
//# sourceMappingURL=category.entity.d.ts.map