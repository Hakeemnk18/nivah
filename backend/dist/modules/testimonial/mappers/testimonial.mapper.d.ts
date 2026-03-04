import { Testimonial } from "../entities/testimonial.entity.js";
import type { TestimonialView, UserTestimonialView } from "../types/testimonial.type.js";
export declare class TestimonialMapper {
    static toDomain(testimonialModelData: any): Testimonial | null;
    static toPersistence(testimonialEntity: Testimonial): any;
    static toAdminView(testimonialModelData: any): TestimonialView | null;
    static toUserView(testimonialModelData: any): UserTestimonialView | null;
}
//# sourceMappingURL=testimonial.mapper.d.ts.map