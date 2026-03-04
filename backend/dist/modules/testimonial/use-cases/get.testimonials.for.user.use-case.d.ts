import type { IGetTestimonialsForUserUseCase } from "./interfaces/get.testimonials.for.user.use-case.interface.js";
import type { ITestimonialRepository } from "../repositories/testimonial.repository.interface.js";
import type { UserTestimonialView } from "../types/testimonial.type.js";
export declare class GetTestimonialsForUserUseCase implements IGetTestimonialsForUserUseCase {
    private readonly _testimonialRepository;
    constructor(_testimonialRepository: ITestimonialRepository);
    execute(): Promise<UserTestimonialView[]>;
}
//# sourceMappingURL=get.testimonials.for.user.use-case.d.ts.map