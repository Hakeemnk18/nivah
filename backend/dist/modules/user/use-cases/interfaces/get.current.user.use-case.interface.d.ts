import type { LoginResponseDto } from "../../dtos/login.response.dto.js";
export interface IGetCurrentUserUseCase {
    execute(id: string): Promise<LoginResponseDto>;
}
//# sourceMappingURL=get.current.user.use-case.interface.d.ts.map