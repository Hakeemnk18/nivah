import { Document } from "mongoose";
export interface IBanner extends Document {
    image: {
        url: string;
        publicId: string;
    };
    isActive: boolean;
}
export declare const BannerModel: import("mongoose").Model<IBanner, {}, {}, {}, Document<unknown, {}, IBanner, {}, import("mongoose").DefaultSchemaOptions> & IBanner & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IBanner>;
//# sourceMappingURL=banner.schema.d.ts.map