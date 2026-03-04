import { Testimonial } from "../entities/testimonial.entity.js";
export class TestimonialMapper {
    static toDomain(testimonialModelData) {
        if (!testimonialModelData) {
            return null;
        }
        const idString = testimonialModelData._id?.toString() || testimonialModelData.id?.toString();
        if (!idString) {
            console.error("Testimonial data from DB is missing an ID:", testimonialModelData);
            return null;
        }
        return new Testimonial({
            id: idString,
            comment: testimonialModelData.comment,
            author: testimonialModelData.author,
            isActive: testimonialModelData.isActive,
        });
    }
    static toPersistence(testimonialEntity) {
        return {
            comment: testimonialEntity.comment,
            author: testimonialEntity.author,
            isActive: testimonialEntity.isActive,
        };
    }
    static toAdminView(testimonialModelData) {
        if (!testimonialModelData)
            return null;
        const id = testimonialModelData._id?.toString() || testimonialModelData.id?.toString();
        if (!id) {
            console.error("Testimonial data missing ID:", testimonialModelData);
            return null;
        }
        return {
            id,
            comment: testimonialModelData.comment,
            author: testimonialModelData.author,
            isActive: testimonialModelData.isActive,
        };
    }
    static toUserView(testimonialModelData) {
        if (!testimonialModelData)
            return null;
        const id = testimonialModelData._id?.toString() || testimonialModelData.id?.toString();
        if (!id) {
            console.error("Testimonial data missing ID:", testimonialModelData);
            return null;
        }
        return {
            id,
            comment: testimonialModelData.comment,
            author: testimonialModelData.author,
        };
    }
}
//# sourceMappingURL=testimonial.mapper.js.map