import { useState } from "react";
import { logout } from "../../../shared/utils/logout";
import { useLogout } from "../../auth/hooks/useLogout";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";

const AdminNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useLogout()
  const navigate = useNavigate()

  const handleLogout = async () => {
  try {
    await mutateAsync();   // kill session
  } finally {
    logout();            
    toast("logout successfully") 
    navigate("/admin/login", { replace: true });
  }
};

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">

        {/* Left: Dashboard title */}
        <div className="text-lg font-semibold text-gray-800">
          Admin Dashboard
        </div>

        {/* Right: Desktop menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <button className="hover:text-black">About</button>
          <button className="hover:text-black">Profile</button>
          <button className="text-red-600 hover:text-red-700" onClick={handleLogout}>
            Logout
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-200 px-4 py-3 space-y-3 text-sm text-gray-700">
          <button className="block w-full text-left">Notifications</button>
          <button className="block w-full text-left">Profile</button>
          <button className="block w-full text-left text-red-600">
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default AdminNavbar;
