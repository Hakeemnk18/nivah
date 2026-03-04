import type { TestimonialProps } from "../types/testimonial.type.js";
export declare class Testimonial {
    readonly id: string | null;
    readonly comment: string;
    readonly author: string;
    readonly isActive: boolean;
    constructor(props: TestimonialProps);
    activate(): Testimonial;
    deactivate(): Testimonial;
    updateDetails(props: {
        comment: string;
        author: string;
    }): Testimonial;
}
//# sourceMappingURL=testimonial.entity.d.ts.map