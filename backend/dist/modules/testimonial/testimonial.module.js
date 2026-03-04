import testimonialRoutes from './routes/testimonial.routes.js';
export default function registerTestimonialModule(app) {
    app.use("/api/v1/testimonials", testimonialRoutes);
}
//# sourceMappingURL=testimonial.module.js.map