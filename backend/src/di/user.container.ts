import { container } from "tsyringe";
import type { IAdminLoginUseCase } from "../modules/user/use-cases/interfaces/admin.login.use-case.interface.js";
import { AdminLoginUseCase } from "../modules/user/use-cases/admin.login.use-case.js";
import type { IUserRepository } from "../modules/user/repositories/user.repository.interface.js";
import { UserRepository } from "../modules/user/repositories/user.repository.js";

export const registerUserDependencies = () => {
  container.register<IAdminLoginUseCase>("IAdminLoginUseCase", {
    useClass: AdminLoginUseCase,
  });
  container.register<IUserRepository>("IUserRepository", {
    useClass: UserRepository,
  });
};
