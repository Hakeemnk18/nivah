import { User } from "../entities/user.entity.js"; 

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  save(user: User): Promise<User>
  getNewUsersCount(startDate: Date, endDate: Date): Promise<number>;
  getDailyNewUsers(startDate: Date, endDate: Date): Promise<{ _id: string, count: number }[]>;
}