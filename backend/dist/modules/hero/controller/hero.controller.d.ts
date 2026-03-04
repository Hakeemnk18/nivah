import type { Request, Response } from "express";
import type { IHeroController } from "./hero.controller.interface.js";
import type { ICreateHeroUseCase } from "../use-cases/interfaces/create.hero.use-case.interface.js";
import type { IEditHeroUseCase } from "../use-cases/interfaces/edit.hero.use-case.interface.js";
import type { IBlockHeroUseCase } from "../use-cases/interfaces/block.hero.use-case.interface.js";
import type { IUnblockHeroUseCase } from "../use-cases/interfaces/unblock.hero.use-case.interface.js";
import type { IGetHeroUserUseCase } from "../use-cases/interfaces/get.hero.user.use-case.interface.js";
import type { IGetHeroAdminUseCase } from "../use-cases/interfaces/get.hero.admin.use-case.interface.js";
import type { IGetHeroByIdUseCase } from "../use-cases/interfaces/get.hero.by.id.use-case.interface.js";
export declare class HeroController implements IHeroController {
    private readonly _createHeroUseCase;
    private readonly _editHeroUseCase;
    private readonly _blockHeroUseCase;
    private readonly _unblockHeroUseCase;
    private readonly _getHeroUserUseCase;
    private readonly _getHeroAdminUseCase;
    private readonly _getHeroByIdUseCase;
    constructor(_createHeroUseCase: ICreateHeroUseCase, _editHeroUseCase: IEditHeroUseCase, _blockHeroUseCase: IBlockHeroUseCase, _unblockHeroUseCase: IUnblockHeroUseCase, _getHeroUserUseCase: IGetHeroUserUseCase, _getHeroAdminUseCase: IGetHeroAdminUseCase, _getHeroByIdUseCase: IGetHeroByIdUseCase);
    createHero(req: Request, res: Response): Promise<void>;
    editHero(req: Request, res: Response): Promise<void>;
    blockHero(req: Request, res: Response): Promise<void>;
    unblockHero(req: Request, res: Response): Promise<void>;
    getHeroForAdmin(req: Request, res: Response): Promise<void>;
    getHeroForUser(req: Request, res: Response): Promise<void>;
    getHeroById(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=hero.controller.d.ts.map