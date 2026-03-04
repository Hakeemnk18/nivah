import { container } from "tsyringe";
import { AdminLoginUseCase } from "../modules/user/use-cases/admin.login.use-case.js";
import { UserRepository } from "../modules/user/repositories/user.repository.js";
import { GetCurrentUserUseCase } from "../modules/user/use-cases/get.current.user.use-case.js";
import { UserRefreshTokenUseCase } from "../modules/user/use-cases/user.refresh.token.use-case.js";
export const registerUserDependencies = () => {
    container.register("IAdminLoginUseCase", {
        useClass: AdminLoginUseCase,
    });
    container.register("IUserRepository", {
        useClass: UserRepository,
    });
    container.register("IGetCurrentUserUseCase", {
        useClass: GetCurrentUserUseCase,
    });
    container.register("IUserRefreshTokenUseCase", {
        useClass: UserRefreshTokenUseCase
    });
};
//# sourceMappingURL=user.container.js.map