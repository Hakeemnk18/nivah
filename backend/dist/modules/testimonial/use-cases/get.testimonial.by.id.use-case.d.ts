import type { ITestimonialRepository } from "../repositories/testimonial.repository.interface.js";
import type { IGetTestimonialByIdUseCase } from "./interfaces/get.testimonial.by.id.use-case.interface.js";
import type { TestimonialView } from "../types/testimonial.type.js";
export declare class GetTestimonialByIdUseCase implements IGetTestimonialByIdUseCase {
    private readonly _testimonialRepository;
    constructor(_testimonialRepository: ITestimonialRepository);
    execute(id: string): Promise<TestimonialView>;
}
//# sourceMappingURL=get.testimonial.by.id.use-case.d.ts.map