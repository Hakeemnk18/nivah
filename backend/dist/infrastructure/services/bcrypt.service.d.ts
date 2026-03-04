import { IHashingService } from '../../core/ports/hashing.service.interface.js';
export declare class BcryptService implements IHashingService {
    hash(plainText: string): Promise<string>;
    compare(plainText: string, hash: string): Promise<boolean>;
}
//# sourceMappingURL=bcrypt.service.d.ts.map