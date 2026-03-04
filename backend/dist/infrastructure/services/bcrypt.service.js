var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'tsyringe'; // If using NestJS
import * as bcrypt from 'bcrypt';
import { IHashingService } from '../../core/ports/hashing.service.interface.js';
let BcryptService = class BcryptService {
    async hash(plainText) {
        return bcrypt.hash(plainText, 10);
    }
    async compare(plainText, hash) {
        return bcrypt.compare(plainText, hash);
    }
};
BcryptService = __decorate([
    injectable()
], BcryptService);
export { BcryptService };
//# sourceMappingURL=bcrypt.service.js.map