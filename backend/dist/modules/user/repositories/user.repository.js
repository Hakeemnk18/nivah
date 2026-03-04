import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { CustomError } from "../../../core/errors/custom.error.js";
import { User } from "../entities/user.entity.js";
import { UserModel } from "../infrastructure/user.schema.js";
import { UserMapper } from "../mappers/user.mapper.js";
export class UserRepository {
    async create(user) {
        const persistenceData = UserMapper.toPersistence(user);
        const created = await UserModel.create(persistenceData);
        const domainUser = UserMapper.toDomain(created);
        if (!domainUser) {
            throw new CustomError(ResponseMessages.FAILED_TO_MAP, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        return domainUser;
    }
    async findByEmail(email) {
        const foundDocument = await UserModel.findOne({
            email: email.toLowerCase(),
        }).lean();
        return UserMapper.toDomain(foundDocument);
    }
    async findById(id) {
        const foundDocument = await UserModel.findOne({ _id: id }).lean();
        return UserMapper.toDomain(foundDocument);
    }
    async save(user) {
        if (!user.id) {
            throw new CustomError(ResponseMessages.ID_MISSING, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        const persistenceData = UserMapper.toPersistence(user);
        const updatedDocument = await UserModel.findByIdAndUpdate(user.id, { $set: persistenceData }, { new: true }).lean();
        if (!updatedDocument) {
            throw new CustomError(ResponseMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }
        const domainUser = UserMapper.toDomain(updatedDocument);
        if (!domainUser) {
            throw new CustomError(ResponseMessages.FAILED_TO_MAP, HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        return domainUser;
    }
    async getNewUsersCount(startDate, endDate) {
        return await UserModel.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate },
        });
    }
    async getDailyNewUsers(startDate, endDate) {
        return await UserModel.aggregate([
            { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
    }
}
//# sourceMappingURL=user.repository.js.map