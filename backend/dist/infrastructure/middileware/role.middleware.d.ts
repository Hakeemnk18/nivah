import type { NextFunction, Response, Request } from "express";
export declare const authorizeRoles: (...allowedRoles: string[]) => (req: Request & {
    user?: any;
}, res: Response, next: NextFunction) => void;
//# sourceMappingURL=role.middleware.d.ts.map