import type { IEditTestimonialUseCase } from "./interfaces/edit.testimonial.use-case.interface.js";
import type { ITestimonialRepository } from "../repositories/testimonial.repository.interface.js";
import type { EditTestimonialRequestDto } from "../dtos/testimonial.dto.js";
export declare class EditTestimonialUseCase implements IEditTestimonialUseCase {
    private readonly _testimonialRepository;
    constructor(_testimonialRepository: ITestimonialRepository);
    execute(id: string, dto: EditTestimonialRequestDto): Promise<void>;
}
//# sourceMappingURL=edit.testimonial.use-case.d.ts.map