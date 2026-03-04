import { z } from "zod";
import { ObjectIdSchema } from "../../../core/utils/object.id.validation.js";
export const CreateCategorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Category name must be at least 2 characters")
        .max(100, "Category name must not exceed 100 characters"),
    description: z
        .string()
        .trim()
        .min(5, "Category description must be at least 5 characters")
        .max(200, "Category description must not exceed 200 characters"),
    parentId: ObjectIdSchema
        .trim()
        .nullable(),
});
//# sourceMappingURL=create.category.dto.js.map