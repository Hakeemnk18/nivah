import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import AdminLoader from "../../admin/components/AdminLoader";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import type { CreateTestimonialPayload } from "../type/testimonial.type";
import { useGetAdminTestimonialById } from "../hooks/use.get.testimonial.by.id";
import { useEditTestimonial } from "../hooks/use.edit.testimonial";
import { useCreateTestimonial } from "../hooks/use.create.testimonial";

type FormState = {
    author: string;
    comment: string;
};

type FormErrors = {
    author?: string;
    comment?: string;
};

const CreateTestimonialForm = () => {
    const [searchParams] = useSearchParams();
    const testimonialId = searchParams.get("testimonialId");
    const { data: testimonial } = useGetAdminTestimonialById(testimonialId);
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const { mutateAsync: createTestimonial } = useCreateTestimonial();
    const { mutateAsync: updateTestimonial } = useEditTestimonial();

    const [formData, setFormData] = useState<FormState>({
        author: "",
        comment: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (testimonial?.data) {
            setFormData({
                author: testimonial.data.author,
                comment: testimonial.data.comment,
            });
        }
    }, [testimonial]);

    /* ---------- handlers ---------- */

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: FormErrors = {};

        // Validation
        if (!formData.author.trim() || formData.author.length < 2)
            newErrors.author = "Minimum 2 characters";

        if (!formData.comment.trim() || formData.comment.length < 5)
            newErrors.comment = "Minimum 5 characters";

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        try {
            setSubmitting(true);
            const payload: CreateTestimonialPayload = {
                author: formData.author,
                comment: formData.comment,
            };
            if (testimonialId) {
                await updateTestimonial({ id: testimonialId, data: payload });
            } else {
                await createTestimonial(payload);
            }
            setSubmitting(false);
            toast.success("Testimonial created successfully");
            navigate("/admin/testimonialManagement");
        } catch (err) {
            const fieldErrors = handleApiError(err);
            if (fieldErrors) setErrors(fieldErrors);
            setSubmitting(false);
        }
    };

    return (
        <>
            {submitting && <AdminLoader fullScreen label={testimonialId ? "Editing testimonial..." : "Creating testimonial..."} />}
            <div className="pb-20">
                <div className="max-w-3xl mx-auto bg-[#1d1e33] p-6 rounded-xl text-white mt-4">
                    <h2 className="text-xl font-semibold mb-6">{testimonialId ? "Edit Testimonial" : "Create Testimonial"}</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <input
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Author Name"
                                className="w-full px-4 py-2 rounded-lg bg-[#232447] focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.author && (
                                <p className="text-red-400 text-sm mt-1">{errors.author}</p>
                            )}
                        </div>

                        {/* Subtitle */}
                        <div>
                            <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Comment"
                                className="w-full px-4 py-2 rounded-lg bg-[#232447] focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.comment && (
                                <p className="text-red-400 text-sm mt-1">{errors.comment}</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-[#2c2e4a]">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 bg-[#2c2e4a] rounded-lg hover:bg-[#3e3f5c] transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                            >
                                {(testimonialId) ? "Editing" : "Creating"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateTestimonialForm;