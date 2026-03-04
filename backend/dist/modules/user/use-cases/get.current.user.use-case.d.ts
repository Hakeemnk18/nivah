import type { IGetCurrentUserUseCase } from "./interfaces/get.current.user.use-case.interface.js";
import type { IUserRepository } from "../repositories/user.repository.interface.js";
import type { LoginResponseDto } from "../dtos/login.response.dto.js";
export declare class GetCurrentUserUseCase implements IGetCurrentUserUseCase {
    private readonly _userRepository;
    constructor(_userRepository: IUserRepository);
    execute(id: string): Promise<LoginResponseDto>;
}
//# sourceMappingURL=get.current.user.use-case.d.ts.map