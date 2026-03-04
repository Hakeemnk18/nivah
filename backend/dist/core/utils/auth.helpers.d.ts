import type { Response } from 'express';
export declare const cookieOptions: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "none" | "lax";
};
export declare const setAccessTokenCookie: (res: Response, token: string) => void;
export declare const setRefreshTokenCookie: (res: Response, token: string) => void;
//# sourceMappingURL=auth.helpers.d.ts.map