import type { Request, Response } from "express";
import type { ITestimonialController } from "./testimonial.controller.interface.js";
import type { ICreateTestimonialUseCase } from "../use-cases/interfaces/create.testimonial.use-case.interface.js";
import type { IEditTestimonialUseCase } from "../use-cases/interfaces/edit.testimonial.use-case.interface.js";
import type { IBlockTestimonialUseCase } from "../use-cases/interfaces/block.testimonial.use-case.interface.js";
import type { IUnblockTestimonialUseCase } from "../use-cases/interfaces/unblock.testimonial.use-case.interface.js";
import type { IGetTestimonialsForUserUseCase } from "../use-cases/interfaces/get.testimonials.for.user.use-case.interface.js";
import type { IGetTestimonialsForAdminUseCase } from "../use-cases/interfaces/get.testimonials.for.admin.use-case.interface.js";
import type { IGetTestimonialByIdUseCase } from "../use-cases/interfaces/get.testimonial.by.id.use-case.interface.js";
export declare class TestimonialController implements ITestimonialController {
    private readonly _createTestimonialUseCase;
    private readonly _editTestimonialUseCase;
    private readonly _blockTestimonialUseCase;
    private readonly _unblockTestimonialUseCase;
    private readonly _getTestimonialsForUserUseCase;
    private readonly _getTestimonialsForAdminUseCase;
    private readonly _getTestimonialByIdUseCase;
    constructor(_createTestimonialUseCase: ICreateTestimonialUseCase, _editTestimonialUseCase: IEditTestimonialUseCase, _blockTestimonialUseCase: IBlockTestimonialUseCase, _unblockTestimonialUseCase: IUnblockTestimonialUseCase, _getTestimonialsForUserUseCase: IGetTestimonialsForUserUseCase, _getTestimonialsForAdminUseCase: IGetTestimonialsForAdminUseCase, _getTestimonialByIdUseCase: IGetTestimonialByIdUseCase);
    createTestimonial(req: Request, res: Response): Promise<void>;
    editTestimonial(req: Request, res: Response): Promise<void>;
    blockTestimonial(req: Request, res: Response): Promise<void>;
    unblockTestimonial(req: Request, res: Response): Promise<void>;
    getTestimonialsForAdmin(req: Request, res: Response): Promise<void>;
    getTestimonialsForUser(req: Request, res: Response): Promise<void>;
    getTestimonialById(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=testimonial.controller.d.ts.map