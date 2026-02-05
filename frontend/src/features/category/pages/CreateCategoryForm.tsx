import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParentCategories } from "../hooks/use.parent.categories";
import { useCreateCategory } from "../hooks/use.create.category";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import toast from "react-hot-toast";
import { useCategoryById } from "../hooks/use.category.by.id";
import { useEditCategory } from "../hooks/use.edit.category";

type FormState = {
  name: string;
  description: string;
  parentId: string | "";
};

type FormErrors = {
  name?: string;
  description?: string;
  parentId?: string;
};

const CreateCategoryForm = () => {
  const [searchParams] = useSearchParams();
  let categoryId = searchParams.get("categoryId");
  const { data: categoryData } = useCategoryById(categoryId);
  const { mutateAsync: editMutate } = useEditCategory(categoryId as string);

  const navigate = useNavigate();

  const { data, isLoading } = useParentCategories();

  const { mutateAsync, isPending } = useCreateCategory();

  const parentCategories = data?.data ?? [];

  const [formData, setFormData] = useState<FormState>({
    name: "",
    description: "",
    parentId: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  

  useEffect(() => {
    if (categoryData?.data) {
      setFormData({
        name: categoryData.data.name || "",
        description: categoryData.data.description || "",
        parentId: categoryData.data.parentId || "",
      });
    }
  }, [categoryData]);

  /* ---------- handlers ---------- */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (formData.name.length < 3) {
      newErrors.name = "Minimum 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (formData.description.length > 60) {
      newErrors.description = "Max 60 characters";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      if (categoryId) {
        await editMutate({
          name: formData.name.trim(),
          description: formData.description.trim(),
          parentId: formData.parentId || null,
        });
        toast.success("Category updated successfully");
      } else {
        await mutateAsync({
          name: formData.name.trim(),
          description: formData.description.trim(),
          parentId: formData.parentId || null,
        });
        toast.success("Category created successfully");
      }
      
      navigate("/admin/categoryManagement");
    } catch (err: any) {
      const fieldErrors = handleApiError(err);
      if (fieldErrors) setErrors(fieldErrors);
    }
  };

  return (
    <div className="pb-20">
      <div className="max-w-xl mx-auto bg-[#1d1e33] p-6 rounded-xl text-white">
        <h2 className="text-xl font-semibold mb-6">
          {categoryId ? "Edit Category" : "Create Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Category name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-[#232447] border focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "border-transparent focus:ring-blue-400"
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-400 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              name="description"
              placeholder="Description (optional)"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full px-4 py-2 rounded-lg bg-[#232447] border resize-none focus:outline-none focus:ring-2 ${
                errors.description
                  ? "border-red-500 focus:ring-red-400"
                  : "border-transparent focus:ring-blue-400"
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-400 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Parent Category */}
          <div>
            <select
              name="parentId"
              value={formData.parentId}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#232447] border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">No parent category</option>

              {!isLoading &&
                parentCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg bg-[#2c2e4a] hover:bg-[#353762]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition disabled:opacity-60"
            >
              {categoryId ? "Edit " : "Create "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryForm;
