import type { UserProductView } from "../../types/product.type.js";
export interface IGetProductForUserUseCase {
    execute(id: string): Promise<UserProductView>;
}
//# sourceMappingURL=get.product.user.use-case.interface.d.ts.map