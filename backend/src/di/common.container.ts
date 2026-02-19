import { container } from "tsyringe";
import type { IHashingService } from "../core/ports/hashing.service.interface.js";
import { BcryptService } from "../infrastructure/services/bcrypt.service.js";
import type { ITokenService } from "../core/ports/token.service.interface.js";
import { JwtService } from "../infrastructure/services/jwt.service.js";
import type { IPaymentGateway } from "../core/ports/payment.service.interface.js";
import { RazorpayService } from "../infrastructure/services/payment.service.js";



export const registerCommonDependencies = () => {
    container.register<IHashingService>("IHashingService", {
        useClass: BcryptService,
    });


    container.register<ITokenService>("ITokenService", { useClass: JwtService });

    container.register<IPaymentGateway>("IPaymentGateway", {
        useClass: RazorpayService,
    });

};