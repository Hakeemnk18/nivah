import { useNavigate, useLocation } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#181a2a] px-4">
      <div className="w-full max-w-md text-center bg-[#1d1e33] rounded-xl p-6">
        <h1 className="text-4xl font-semibold text-white">404</h1>

        <p className="mt-2 text-sm text-gray-400">
          The page you’re looking for doesn’t exist.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg text-sm bg-[#232447] text-white hover:bg-[#2c2e4a] transition"
          >
            Go back
          </button>

          <button
            onClick={() => navigate(isAdmin ? "/admin" : "/")}
            className="px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white transition"
          >
            {isAdmin ? "Admin dashboard" : "Home"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
