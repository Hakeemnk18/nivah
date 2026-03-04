import type { LoginRequestDto } from "../dtos/login.request.dto.js";
import type { IUserRepository } from "../repositories/user.repository.interface.js";
import type { LoginResponseDto } from "../dtos/login.response.dto.js";
import type { IAdminLoginUseCase } from "./interfaces/admin.login.use-case.interface.js";
import { IHashingService } from "../../../core/ports/hashing.service.interface.js";
import { ITokenService } from "../../../core/ports/token.service.interface.js";
export declare class AdminLoginUseCase implements IAdminLoginUseCase {
    private readonly _userRepository;
    private readonly _hashService;
    private readonly _tokenService;
    constructor(_userRepository: IUserRepository, _hashService: IHashingService, _tokenService: ITokenService);
    execute(dto: LoginRequestDto): Promise<{
        userData: LoginResponseDto;
        accessToken: string;
        refreshToken: string;
    }>;
}
//# sourceMappingURL=admin.login.use-case.d.ts.map