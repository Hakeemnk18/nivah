import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin"; 
import { useForgotPassword } from "../hooks/useForgotPassword";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import GoogleLogin from "../components/GoogleLogin";
//import ForgotPasswordModal from "../components/EmailModal";

interface LoginPageProps {
  role: "user" | "admin";
}

const LoginPage = ({ role }: LoginPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [showPassword, setShowPassword] = useState(false);
//   const { mutateAsync: loginMutate } = useLogin();
//   const { mutateAsync: forgotPasswordMutate } = useForgotPassword();

  const [isForgotPsd, setIsForgotPsd] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    if (formData.password.trim().length < 6) {
      newErrors.password = "Min 6 characters";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      //await loginMutate({ data: formData, role });

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      const fieldErrors = handleApiError(err);
      if (fieldErrors) setErrors(fieldErrors);
    }
  };

  const handleForgotPassword = async (email: string) => {
    //await forgotPasswordMutate({ email });
    setIsForgotPsd(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
        <h1 className="text-xl font-semibold text-center mb-6">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-2.5 text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Forgot password */}
          {role === "user" && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setIsForgotPsd(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Google login */}
        {role === "user" && (
          <>
            <div className="mt-4">
              <GoogleLogin />
            </div>

            <p className="text-sm text-center mt-4">
              You are a new user?{" "}
              <RouterLink
                to="/signup"
                state={{ from }}
                className="text-blue-600 hover:underline"
              >
                Signup
              </RouterLink>
            </p>
          </>
        )}

        {/* Forgot password modal */}
        {/* {isForgotPsd && (
          <ForgotPasswordModal
            open={isForgotPsd}
            onClose={() => setIsForgotPsd(false)}
            onSubmit={handleForgotPassword}
          />
        )} */}
      </div>
    </div>
  );
};

export default LoginPage;
