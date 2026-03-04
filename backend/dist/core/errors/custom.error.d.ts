import type { Response } from "express";
export declare class CustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode?: number);
}
export declare const handleError: (res: Response, err: unknown) => void;
//# sourceMappingURL=custom.error.d.ts.map