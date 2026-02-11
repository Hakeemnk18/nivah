import type { Request } from "express";
import { buildFilters } from "./make.filter.helper.js";



export interface IParseResult {
  page: number;
  search: string;
  limit: number;
  sortValue: string;
  filters: Record<string, any>;
}

export function parseReq(req: Request, filtersArr: string[]): IParseResult {
  const filters = buildFilters(filtersArr, req.query);
  return {
    page: req.query.page as any,
    search: req.query.search as any,
    limit: req.query.limit as any,
    sortValue: req.query.sort as any,
    filters,
  };
}

export interface IUserParseResult {
  search: string;
  limit: number;
  sortValue: string;
  cursor?: string;
  filters: Record<string, any>;
}

export function parseUserReq(
  req: Request,
  filtersArr: string[],
): IUserParseResult {
  const filters = buildFilters(filtersArr, req.query);

  return {
    search: req.query.search as any,
    limit: req.query.limit as any,
    sortValue: req.query.sort as any,
    cursor: req.query.cursor as any,
    filters,
  };
}
