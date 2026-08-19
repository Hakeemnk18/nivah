import type { Request, Response } from "express";

export interface ICampaignController {
    createCampaign(req: Request, res: Response): Promise<void>;
    editCampaign(req: Request, res: Response): Promise<void>;
    blockCampaign(req: Request, res: Response): Promise<void>;
    unblockCampaign(req: Request, res: Response): Promise<void>;
    getAllCampaignsForAdmin(req: Request, res: Response): Promise<void>;
    getCampaignBySlugForUser(req: Request, res: Response): Promise<void>;
    getCampaignById(req: Request, res: Response): Promise<void>;
}
