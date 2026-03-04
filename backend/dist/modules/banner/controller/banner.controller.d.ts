import type { Request, Response } from "express";
import type { IBannerController } from "./banner.controller.interface.js";
import type { ICreateBannerUseCase } from "../use-cases/interfaces/create.banner.use-case.interface.js";
import type { IEditBannerUseCase } from "../use-cases/interfaces/edit.banner.use-case.interface.js";
import type { IBlockBannerUseCase } from "../use-cases/interfaces/block.banner.use-case.interface.js";
import type { IUnblockBannerUseCase } from "../use-cases/interfaces/unblock.banner.use-case.interface.js";
import type { IGetBannerUserUseCase } from "../use-cases/interfaces/get.banner.user.use-case.interface.js";
import type { IGetBannerAdminUseCase } from "../use-cases/interfaces/get.banner.admin.use-case.interface.js";
import type { IGetBannerByIdUseCase } from "../use-cases/interfaces/get.banner.by.id.use-case.interface.js";
export declare class BannerController implements IBannerController {
    private readonly _createBannerUseCase;
    private readonly _editBannerUseCase;
    private readonly _blockBannerUseCase;
    private readonly _unblockBannerUseCase;
    private readonly _getBannerUserUseCase;
    private readonly _getBannerAdminUseCase;
    private readonly _getBannerByIdUseCase;
    constructor(_createBannerUseCase: ICreateBannerUseCase, _editBannerUseCase: IEditBannerUseCase, _blockBannerUseCase: IBlockBannerUseCase, _unblockBannerUseCase: IUnblockBannerUseCase, _getBannerUserUseCase: IGetBannerUserUseCase, _getBannerAdminUseCase: IGetBannerAdminUseCase, _getBannerByIdUseCase: IGetBannerByIdUseCase);
    createBanner(req: Request, res: Response): Promise<void>;
    editBanner(req: Request, res: Response): Promise<void>;
    blockBanner(req: Request, res: Response): Promise<void>;
    unblockBanner(req: Request, res: Response): Promise<void>;
    getBannerForAdmin(req: Request, res: Response): Promise<void>;
    getBannerForUser(req: Request, res: Response): Promise<void>;
    getBannerById(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=banner.controller.d.ts.map