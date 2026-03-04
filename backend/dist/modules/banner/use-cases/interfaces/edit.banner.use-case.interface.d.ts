import type { EditBannerRequestDto } from "../../dtos/banner.dto.js";
export interface IEditBannerUseCase {
    execute(id: string, dto: EditBannerRequestDto): Promise<void>;
}
//# sourceMappingURL=edit.banner.use-case.interface.d.ts.map