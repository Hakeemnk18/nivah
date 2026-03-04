import type { IAuthController } from "./interfaces/auth.controller.interface.js";
import type { IGetCurrentUserUseCase } from "../use-cases/interfaces/get.current.user.use-case.interface.js";
import type { AuthRequest } from "../../../infrastructure/middileware/auth.type.js";
import type { Response, Request } from "express";
import type { IUserRefreshTokenUseCase } from "../use-cases/interfaces/user.refresh.token.use-case.interface.js";
export declare class AuthController implements IAuthController {
    private readonly _getCurrentUserUseCase;
    private readonly _userRefreshTokenUseCase;
    constructor(_getCurrentUserUseCase: IGetCurrentUserUseCase, _userRefreshTokenUseCase: IUserRefreshTokenUseCase);
    getCurrentUser(req: AuthRequest, res: Response): Promise<void>;
    logoutUserController(req: Request, res: Response): Promise<void>;
    getRefreshToken(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=auth.controller.d.ts.map