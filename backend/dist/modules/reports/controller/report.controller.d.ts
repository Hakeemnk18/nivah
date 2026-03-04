import type { Request, Response } from "express";
import type { IRevenueReportUseCase } from "../use-cases/interfaces/get.revenue.report.use-case.interface.js";
import type { IReportController } from "./report.controller.interface.js";
export declare class ReportController implements IReportController {
    private _reportUseCase;
    constructor(_reportUseCase: IRevenueReportUseCase);
    getRevenueReport(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=report.controller.d.ts.map