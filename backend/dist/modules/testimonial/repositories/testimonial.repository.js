var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from "tsyringe";
import { Testimonial } from "../entities/testimonial.entity.js";
import { TestimonialModel } from "../infrastructure/testimonial.schema.js";
import { TestimonialMapper } from "../mappers/testimonial.mapper.js";
let TestimonialRepository = class TestimonialRepository {
    async create(testimonialEntity) {
        const persistenceData = TestimonialMapper.toPersistence(testimonialEntity);
        const createdTestimonial = await TestimonialModel.create(persistenceData);
        return TestimonialMapper.toDomain(createdTestimonial);
    }
    async findById(id) {
        const testimonial = await TestimonialModel.findById(id).lean();
        if (!testimonial)
            return null;
        return TestimonialMapper.toDomain(testimonial);
    }
    async save(testimonialEntity) {
        const { id } = testimonialEntity;
        if (!id) {
            throw new Error("Cannot save testimonial without an ID");
        }
        const persistenceData = TestimonialMapper.toPersistence(testimonialEntity);
        const updatedTestimonial = await TestimonialModel.findByIdAndUpdate(id, { $set: persistenceData }, { new: true, runValidators: true }).lean();
        if (!updatedTestimonial) {
            throw new Error("Testimonial not found for update");
        }
        return TestimonialMapper.toDomain(updatedTestimonial);
    }
    async getAllTestimonialsForUser() {
        const testimonials = await TestimonialModel.find({ isActive: true }).lean();
        return testimonials.map((testimonial) => TestimonialMapper.toUserView(testimonial));
    }
    async getAllTestimonialsForAdmin() {
        const testimonials = await TestimonialModel.find().lean();
        return testimonials.map((testimonial) => TestimonialMapper.toAdminView(testimonial));
    }
    async countDocuments() {
        const count = await TestimonialModel.countDocuments();
        return count;
    }
};
TestimonialRepository = __decorate([
    injectable()
], TestimonialRepository);
export { TestimonialRepository };
//# sourceMappingURL=testimonial.repository.js.map