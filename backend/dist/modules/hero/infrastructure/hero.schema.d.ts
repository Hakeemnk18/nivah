import { Document } from "mongoose";
export interface IHero extends Document {
    title: string;
    subtitle: string;
    image: {
        url: string;
        publicId: string;
    };
    isActive: boolean;
}
export declare const HeroModel: import("mongoose").Model<IHero, {}, {}, {}, Document<unknown, {}, IHero, {}, import("mongoose").DefaultSchemaOptions> & IHero & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IHero>;
//# sourceMappingURL=hero.schema.d.ts.map