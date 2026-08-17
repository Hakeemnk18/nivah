import type { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { handleError } from "../../../core/errors/custom.error.js";
import { validateObjectId } from "../../../core/utils/validate.object.id.helper.js";

import type { ICampaignController } from "./campaign.controller.interface.js";
import type { ICreateCampaignUseCase } from "../use-cases/interfaces/create.campaign.use-case.interface.js";
import type { IEditCampaignUseCase } from "../use-cases/interfaces/edit.campaign.use-case.interface.js";
import type { IBlockCampaignUseCase } from "../use-cases/interfaces/block.campaign.use-case.interface.js";
import type { IUnblockCampaignUseCase } from "../use-cases/interfaces/unblock.campaign.use-case.interface.js";
import type { IGetAllCampaignAdminUseCase } from "../use-cases/interfaces/get.all.campaign.admin.use-case.interface.js";
import type { IGetCampaignBySlugUseCase } from "../use-cases/interfaces/get.campaign.by.slug.use-case.interface.js";
import type { IGetCampaignByIdUseCase } from "../use-cases/interfaces/get.campaign.by.id.use-case.interface.js";

import {
    CreateCampaignSchema,
    EditCampaignSchema,
    type CreateCampaignRequestDto,
    type EditCampaignRequestDto,
} from "../dtos/campaign.dto.js";

import { ResponseMessages } from "../../../core/constants/response.message.js";

@injectable()
export class CampaignController implements ICampaignController {
    constructor(
        @inject("ICreateCampaignUseCase")
        private readonly _createCampaignUseCase: ICreateCampaignUseCase,

        @inject("IEditCampaignUseCase")
        private readonly _editCampaignUseCase: IEditCampaignUseCase,

        @inject("IBlockCampaignUseCase")
        private readonly _blockCampaignUseCase: IBlockCampaignUseCase,

        @inject("IUnblockCampaignUseCase")
        private readonly _unblockCampaignUseCase: IUnblockCampaignUseCase,

        @inject("IGetAllCampaignAdminUseCase")
        private readonly _getAllCampaignAdminUseCase: IGetAllCampaignAdminUseCase,

        @inject("IGetCampaignBySlugUseCase")
        private readonly _getCampaignBySlugUseCase: IGetCampaignBySlugUseCase,

        @inject("IGetCampaignByIdUseCase")
        private readonly _getCampaignByIdUseCase: IGetCampaignByIdUseCase
    ) { }

    async createCampaign(req: Request, res: Response): Promise<void> {
        try {
            const dto: CreateCampaignRequestDto = CreateCampaignSchema.parse(req.body);

            await this._createCampaignUseCase.execute(dto);

            res.status(HttpStatusCode.CREATED).json({
                success: true,
                message: ResponseMessages.CAMPAIGN_CREATED,
            });
        } catch (error) {
            console.log("Error in createCampaign:", error);
            handleError(res, error);
        }
    }

    async editCampaign(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            validateObjectId(id);

            const dto: EditCampaignRequestDto = EditCampaignSchema.parse(req.body);

            await this._editCampaignUseCase.execute(id!, dto);

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.CAMPAIGN_UPDATED,
            });
        } catch (error) {
            console.log("Error in editCampaign:", error);
            handleError(res, error);
        }
    }

    async blockCampaign(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            validateObjectId(id);

            await this._blockCampaignUseCase.execute(id!);

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.CAMPAIGN_DEACTIVATED_SUCCESSFULLY,
            });
        } catch (error) {
            console.log("Error in blockCampaign:", error);
            handleError(res, error);
        }
    }

    async unblockCampaign(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            validateObjectId(id);

            await this._unblockCampaignUseCase.execute(id!);

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.CAMPAIGN_ACTIVATED_SUCCESSFULLY,
            });
        } catch (error) {
            console.log("Error in unblockCampaign:", error);
            handleError(res, error);
        }
    }

    async getAllCampaignsForAdmin(req: Request, res: Response): Promise<void> {
        try {
            const data = await this._getAllCampaignAdminUseCase.execute();
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.CAMPAIGN_FETCHED_SUCCESSFULLY,
                data,
            });
        } catch (error) {
            console.log("Error in getAllCampaignsForAdmin:", error);
            handleError(res, error);
        }
    }

    async getCampaignBySlugForUser(req: Request, res: Response): Promise<void> {
        try {
            const { slug } = req.params;

            const data = await this._getCampaignBySlugUseCase.execute(slug!);
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.SUCCESS,
                data,
            });
        } catch (error) {
            console.log("Error in getCampaignBySlugForUser:", error);
            handleError(res, error);
        }
    }

    async getCampaignById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            validateObjectId(id);

            const data = await this._getCampaignByIdUseCase.execute(id!);

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: ResponseMessages.CAMPAIGN_FETCHED_SUCCESSFULLY,
                data,
            });
        } catch (error) {
            console.log("Error in getCampaignById:", error);
            handleError(res, error);
        }
    }
}
