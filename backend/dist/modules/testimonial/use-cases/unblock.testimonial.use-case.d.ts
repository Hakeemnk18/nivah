import type { IUnblockTestimonialUseCase } from "./interfaces/unblock.testimonial.use-case.interface.js";
import type { ITestimonialRepository } from "../repositories/testimonial.repository.interface.js";
export declare class UnblockTestimonialUseCase implements IUnblockTestimonialUseCase {
    private readonly _testimonialRepository;
    constructor(_testimonialRepository: ITestimonialRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=unblock.testimonial.use-case.d.ts.map