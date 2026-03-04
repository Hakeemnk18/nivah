import type { Request } from "express";
export interface IParseResult {
    page: number;
    search: string;
    limit: number;
    sortValue: string;
    filters: Record<string, any>;
}
export declare function parseReq(req: Request, filtersArr: string[]): IParseResult;
//# sourceMappingURL=parse.query.helper.d.ts.map