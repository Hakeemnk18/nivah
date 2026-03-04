export class Category {
    id;
    name;
    description;
    parentId;
    isActive;
    constructor(props) {
        const name = props.name.trim();
        if (!name) {
            throw new Error("Category name cannot be empty");
        }
        if (name.length < 2 || name.length > 100) {
            throw new Error("Category name must be between 2 and 100 characters");
        }
        if (props.description && props.description.trim().length > 200) {
            throw new Error("Category description cannot exceed 200 characters");
        }
        // parentId can be null (main category) or a valid string
        if (props.parentId !== null && !props.parentId) {
            throw new Error("Invalid parent category");
        }
        this.id = props.id;
        this.name = name;
        this.description = props.description?.trim();
        this.parentId = props.parentId;
        this.isActive = props.isActive ?? true;
    }
    deactivate() {
        if (!this.isActive) {
            throw new Error("Category already inactive");
        }
        return new Category({
            ...this,
            isActive: false,
        });
    }
    activate() {
        if (this.isActive) {
            throw new Error("Category already active");
        }
        return new Category({
            ...this,
            isActive: true,
        });
    }
}
//# sourceMappingURL=category.entity.js.map