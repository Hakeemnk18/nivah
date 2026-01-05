import { User } from "../entities/user.entity.js";

export class UserMapper {
  static toDomain(userModelData: any): User | null {
    if (!userModelData) {
      return null;
    }
    const idString =
      userModelData._id?.toString() || userModelData.id?.toString();

    if (!idString) {
      console.error("User data from DB is missing an ID:", userModelData);
      return null;
    }
   
    return new User({
      id: idString,
      name: userModelData.name,
      email: userModelData.email,
      role: userModelData.role,
      password: userModelData.password,
      googleId: userModelData.googleId,
      isBlocked: userModelData.isBlocked,
      isVerified: userModelData.isVerified,
      tokenVersion: userModelData.tokenVersion,
    });
  }

  static toPersistence(userEntity: User): any {
    return {
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
      tokenVersion: userEntity.tokenVersion,
      isVerified: userEntity.isVerified,
      role: userEntity.role,
      googleId: userEntity.googleId,
      isBlocked: userEntity.isBlocked,
    };
  }
}
