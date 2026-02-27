import type { Request, Response } from "express";

export interface IAnalysisController {
    getRevenueChart(req: Request, res: Response): Promise<void>;
    
}