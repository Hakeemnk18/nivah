import { Document, Types } from "mongoose";
export interface ICategory extends Document {
    name: string;
    description?: string;
    parentId: Types.ObjectId | null;
    isActive: boolean;
}
export declare const CategoryModel: import("mongoose").Model<ICategory, {}, {}, {}, Document<unknown, {}, ICategory, {}, import("mongoose").DefaultSchemaOptions> & ICategory & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ICategory>;
//# sourceMappingURL=category.schema.d.ts.map