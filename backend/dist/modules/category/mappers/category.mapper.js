import { Category } from "../entities/category.entity.js";
export class CategoryMapper {
    static toDomain(categoryModelData) {
        if (!categoryModelData) {
            return null;
        }
        const idString = categoryModelData._id?.toString() || categoryModelData.id?.toString();
        if (!idString) {
            console.error("Category data from DB is missing an ID:", categoryModelData);
            return null;
        }
        return new Category({
            id: idString,
            name: categoryModelData.name,
            description: categoryModelData.description,
            parentId: categoryModelData.parentId?.toString() ||
                categoryModelData.parentId ||
                null,
            isActive: categoryModelData.isActive,
        });
    }
    static toPersistence(categoryEntity) {
        return {
            name: categoryEntity.name,
            description: categoryEntity.description,
            parentId: categoryEntity.parentId,
            isActive: categoryEntity.isActive,
        };
    }
}
//# sourceMappingURL=category.mapper.js.map