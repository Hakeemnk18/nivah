import type { ITestimonialRepository } from "./testimonial.repository.interface.js";
import { Testimonial } from "../entities/testimonial.entity.js";
import type { TestimonialView, UserTestimonialView } from "../types/testimonial.type.js";
export declare class TestimonialRepository implements ITestimonialRepository {
    create(testimonialEntity: Testimonial): Promise<Testimonial>;
    findById(id: string): Promise<Testimonial | null>;
    save(testimonialEntity: Testimonial): Promise<Testimonial>;
    getAllTestimonialsForUser(): Promise<UserTestimonialView[]>;
    getAllTestimonialsForAdmin(): Promise<TestimonialView[]>;
    countDocuments(): Promise<number>;
}
//# sourceMappingURL=testimonial.repository.d.ts.map