import { container } from "tsyringe";
import { TestimonialRepository } from "../modules/testimonial/repositories/testimonial.repository.js";
import { CreateTestimonialUseCase } from "../modules/testimonial/use-cases/create.testimonial.use-case.js";
import { EditTestimonialUseCase } from "../modules/testimonial/use-cases/edit.testimonial.use-case.js";
import { BlockTestimonialUseCase } from "../modules/testimonial/use-cases/block.testimonial.use-case.js";
import { UnblockTestimonialUseCase } from "../modules/testimonial/use-cases/unblock.testimonial.use-case.js";
import { GetTestimonialsForUserUseCase } from "../modules/testimonial/use-cases/get.testimonials.for.user.use-case.js";
import { GetTestimonialsForAdminUseCase } from "../modules/testimonial/use-cases/get.testimonials.for.admin.use-case.js";
import { GetTestimonialByIdUseCase } from "../modules/testimonial/use-cases/get.testimonial.by.id.use-case.js";
export const registerTestimonialDependencies = () => {
    container.register("ITestimonialRepository", {
        useClass: TestimonialRepository,
    });
    container.register("ICreateTestimonialUseCase", {
        useClass: CreateTestimonialUseCase,
    });
    container.register("IEditTestimonialUseCase", {
        useClass: EditTestimonialUseCase,
    });
    container.register("IBlockTestimonialUseCase", {
        useClass: BlockTestimonialUseCase,
    });
    container.register("IUnblockTestimonialUseCase", {
        useClass: UnblockTestimonialUseCase,
    });
    container.register("IGetTestimonialsForUserUseCase", {
        useClass: GetTestimonialsForUserUseCase,
    });
    container.register("IGetTestimonialsForAdminUseCase", {
        useClass: GetTestimonialsForAdminUseCase,
    });
    container.register("IGetTestimonialByIdUseCase", {
        useClass: GetTestimonialByIdUseCase,
    });
};
//# sourceMappingURL=testimonial.container.js.map