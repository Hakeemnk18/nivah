// src/modules/report/report.usecase.ts
import { inject, injectable } from "tsyringe";
import type { IOrderRepository } from "../../order/repositories/order.repository.interface.js";
import type { RevenueReportQueryDto } from "../dto/request.revenue.data.dto.js";
import type { IRevenueReportUseCase } from "./interfaces/get.revenue.report.use-case.interface.js";
import type { RevenueReportSummary } from "../types/report.type.js";

@injectable()
export class RevenueReportUseCase implements IRevenueReportUseCase {
  constructor(
    @inject("IOrderRepository")
    private orderRepository: IOrderRepository,
  ) {}

  async execute(query: RevenueReportQueryDto): Promise<RevenueReportSummary> {
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    // 1. Calculate Date Ranges Based on Option
    switch (query.option) {
      case "daily":{
        const today = new Date();
        startDate = new Date(today.setHours(0, 0, 0, 0));
        endDate = new Date(today.setHours(23, 59, 59, 999));
        break;
      }
        
      case "this_week": {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 is Sunday
        const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        startDate = new Date(today.setDate(diff));
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date();
        break;
      }

      case "this_month": {
        const today = new Date();
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date();
        break;
      }
      case "last_6_months": {
        const today = new Date();
        startDate = new Date(
          today.getFullYear(),
          today.getMonth() - 5,
          1,
          0,
          0,
          0,
          0,
        );
        endDate = new Date();
        break;
      }
      case "this_year": {
        const today = new Date();
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date();
        break;
      }
      case "custom":
        startDate = new Date(query.customStartDate!);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(query.customEndDate!);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "all_time":
      default:
        break;
    }

    // 2. Fetch from Repository
    const reportData = await this.orderRepository.getRevenueReport({
      startDate,
      endDate,
      page: query.page,
      limit: query.limit,
    });

    return reportData;
  }
}
