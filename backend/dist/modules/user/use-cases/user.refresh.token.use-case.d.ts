import type { IUserRefreshTokenUseCase } from "./interfaces/user.refresh.token.use-case.interface.js";
import type { ITokenService } from "../../../core/ports/token.service.interface.js";
import type { IUserRepository } from "../repositories/user.repository.interface.js";
import type { LoginResponseDto } from "../dtos/login.response.dto.js";
export declare class UserRefreshTokenUseCase implements IUserRefreshTokenUseCase {
    private readonly _tokenService;
    private readonly _userRepository;
    constructor(_tokenService: ITokenService, _userRepository: IUserRepository);
    execute(refresh_Token: string): Promise<{
        userData: LoginResponseDto;
        accessToken: string;
        refreshToken: string;
    }>;
}
//# sourceMappingURL=user.refresh.token.use-case.d.ts.map