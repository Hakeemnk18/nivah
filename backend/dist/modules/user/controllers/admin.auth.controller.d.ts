import type { Request, Response } from "express";
import type { IAdminController } from "./interfaces/admin.auth.controller.interface.js";
import type { IAdminLoginUseCase } from "../use-cases/interfaces/admin.login.use-case.interface.js";
export declare class AdminController implements IAdminController {
    private readonly adminLoginUseCase;
    constructor(adminLoginUseCase: IAdminLoginUseCase);
    loginAdminController(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=admin.auth.controller.d.ts.map