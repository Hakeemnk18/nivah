import type { LoginResponseDto } from "../../dtos/login.response.dto.js";
export interface IUserRefreshTokenUseCase {
    execute(refresh_Token: string): Promise<{
        userData: LoginResponseDto;
        accessToken: string;
        refreshToken: string;
    }>;
}
//# sourceMappingURL=user.refresh.token.use-case.interface.d.ts.map