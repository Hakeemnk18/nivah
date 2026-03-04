import type { IGetTestimonialsForAdminUseCase } from "./interfaces/get.testimonials.for.admin.use-case.interface.js";
import type { ITestimonialRepository } from "../repositories/testimonial.repository.interface.js";
import type { TestimonialView } from "../types/testimonial.type.js";
export declare class GetTestimonialsForAdminUseCase implements IGetTestimonialsForAdminUseCase {
    private readonly _testimonialRepository;
    constructor(_testimonialRepository: ITestimonialRepository);
    execute(): Promise<TestimonialView[]>;
}
//# sourceMappingURL=get.testimonials.for.admin.use-case.d.ts.map