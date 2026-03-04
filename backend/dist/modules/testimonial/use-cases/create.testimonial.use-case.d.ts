import type { ICreateTestimonialUseCase } from "./interfaces/create.testimonial.use-case.interface.js";
import type { ITestimonialRepository } from "../repositories/testimonial.repository.interface.js";
import type { CreateTestimonialRequestDto } from "../dtos/testimonial.dto.js";
export declare class CreateTestimonialUseCase implements ICreateTestimonialUseCase {
    private readonly _testimonialRepository;
    constructor(_testimonialRepository: ITestimonialRepository);
    execute(dto: CreateTestimonialRequestDto): Promise<void>;
}
//# sourceMappingURL=create.testimonial.use-case.d.ts.map