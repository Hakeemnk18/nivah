import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import type { ITokenPayload, IRefreshTokenPayload } from "../../core/ports/token.service.interface.js";
import { ITokenService } from "../../core/ports/token.service.interface.js";
import { CustomError } from "../../core/errors/custom.error.js";
import { ResponseMessages } from "../../core/constants/response.message.js";
import { HttpStatusCode } from "../../core/constants/http.status.codes.js";

const sign = jwt.sign.bind(jwt);
const verify = jwt.verify.bind(jwt);


@injectable()
export class JwtService implements ITokenService {
  private readonly accessSecret = process.env.JWT_ACCESS_SECRET;

  private readonly refreshSecret = process.env.JWT_REFRESH_SECRET;

  constructor() {
    if (!this.accessSecret || !this.refreshSecret) {
      console.error("JWT environment variables are not set!");
      throw new CustomError(
        ResponseMessages.JWT_ENV_NOT_SET,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async signAccessToken(payload: ITokenPayload): Promise<string> {
    return sign(payload, this.accessSecret!, { expiresIn: "2m" });
  }

  async signRefreshToken(payload: IRefreshTokenPayload): Promise<string> {
    return sign(payload, this.refreshSecret!, { expiresIn: "4m" });
  }

  async verifyAccessToken(token: string): Promise<ITokenPayload> {
    return verify(token, this.accessSecret!) as ITokenPayload;
  }

  async verifyRefreshToken(token: string): Promise<IRefreshTokenPayload> {
    return verify(token, this.refreshSecret!) as IRefreshTokenPayload;
  }
}
