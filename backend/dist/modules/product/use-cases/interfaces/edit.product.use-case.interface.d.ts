import type { EditProductRequestDto } from "../../dtos/edit.product.dto.js";
export interface IEditProductUseCase {
    execute(productId: string, dto: EditProductRequestDto): Promise<void>;
}
//# sourceMappingURL=edit.product.use-case.interface.d.ts.map