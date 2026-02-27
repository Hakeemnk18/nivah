import { inject, injectable } from "tsyringe";
import { GetRevenueQuerySchema, type GetRevenueQueryDto } from "../dto/get.revenue.dto.js";
import type { IAnalysisController } from "./analysis.controller.interface.js";
import type { Request, Response } from "express";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { handleError } from "../../../core/errors/custom.error.js";
import type { IGetRevenueChartUseCase } from "../use-cases/interfaces/get.revenue.use-case.interface.js";

@injectable()
export class AnalysisController implements IAnalysisController {
    constructor(
        @inject("IGetRevenueChartUseCase")
        private _getRevenueChartUseCase: IGetRevenueChartUseCase,
    ) {}
    
    async getRevenueChart(req: Request, res: Response): Promise<void> {
    try {

      const dto: GetRevenueQueryDto = GetRevenueQuerySchema.parse({
        range: req.query.range ?? "Month",
      });
      
      const data = await this._getRevenueChartUseCase.execute(dto);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: ResponseMessages.SUCCESS,
        data: data,
      });
    } catch (error) {
      handleError(res, error);
      console.log("error in get revenue chart controller ", error);
    }
  }
}