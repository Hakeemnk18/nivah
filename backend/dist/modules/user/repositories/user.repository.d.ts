import { User } from "../entities/user.entity.js";
import type { IUserRepository } from "./user.repository.interface.js";
export declare class UserRepository implements IUserRepository {
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    save(user: User): Promise<User>;
    getNewUsersCount(startDate: Date, endDate: Date): Promise<number>;
    getDailyNewUsers(startDate: Date, endDate: Date): Promise<{
        _id: string;
        count: number;
    }[]>;
}
//# sourceMappingURL=user.repository.d.ts.map