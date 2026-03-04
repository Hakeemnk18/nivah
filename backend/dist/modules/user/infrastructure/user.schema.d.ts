import { Document } from "mongoose";
export type UserRole = "admin" | "user";
export interface IUser extends Document {
    name: string;
    email: string;
    phone?: string;
    password?: string;
    role: UserRole;
    tokenVersion: number;
    isBlocked: boolean;
    isGuest: boolean;
    isVerified?: boolean;
    googleId?: string;
}
export declare const UserModel: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
//# sourceMappingURL=user.schema.d.ts.map