import type { CreateProductRequestDto } from "../../dtos/create.product.dto.js";
export interface ICreateProductUseCase {
    execute(dto: CreateProductRequestDto): Promise<void>;
}
//# sourceMappingURL=create.product.use-case.interface.d.ts.map