import type { IBlockTestimonialUseCase } from "./interfaces/block.testimonial.use-case.interface.js";
import type { ITestimonialRepository } from "../repositories/testimonial.repository.interface.js";
export declare class BlockTestimonialUseCase implements IBlockTestimonialUseCase {
    private readonly _testimonialRepository;
    constructor(_testimonialRepository: ITestimonialRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=block.testimonial.use-case.d.ts.map