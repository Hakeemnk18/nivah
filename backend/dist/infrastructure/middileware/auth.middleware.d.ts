import type { Response, NextFunction } from "express";
import type { IAuthenticate } from "./auth.middleware.interface.js";
import type { ITokenService } from "../../core/ports/token.service.interface.js";
import type { IUserRepository } from "../../modules/user/repositories/user.repository.interface.js";
import type { AuthRequest } from "./auth.type.js";
export declare class Authenticate implements IAuthenticate {
    private readonly tokenService;
    private readonly userRepo;
    constructor(tokenService: ITokenService, userRepo: IUserRepository);
    authenticate: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=auth.middleware.d.ts.map