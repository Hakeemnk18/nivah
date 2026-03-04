export declare abstract class IHashingService {
    abstract hash(plainText: string): Promise<string>;
    abstract compare(plainText: string, hash: string): Promise<boolean>;
}
//# sourceMappingURL=hashing.service.interface.d.ts.map