import type { ITokenPayload, IRefreshTokenPayload } from "../../core/ports/token.service.interface.js";
import { ITokenService } from "../../core/ports/token.service.interface.js";
export declare class JwtService implements ITokenService {
    private readonly accessSecret;
    private readonly refreshSecret;
    constructor();
    signAccessToken(payload: ITokenPayload): Promise<string>;
    signRefreshToken(payload: IRefreshTokenPayload): Promise<string>;
    verifyAccessToken(token: string): Promise<ITokenPayload>;
    verifyRefreshToken(token: string): Promise<IRefreshTokenPayload>;
}
//# sourceMappingURL=jwt.service.d.ts.map