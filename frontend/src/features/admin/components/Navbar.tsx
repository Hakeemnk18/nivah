import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaBox,
  FaList,
  FaUsers,
  FaShoppingCart,
  FaTachometerAlt,
} from "react-icons/fa";

import { logout } from "../../../shared/utils/logout";
import { useLogout } from "../../auth/hooks/useLogout";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: FaTachometerAlt },
  { label: "Categories", path: "/admin/categoryManagement", icon: FaList },
  { label: "Products", path: "/admin/productManagement", icon: FaBox },
  { label: "Orders", path: "/admin/orderManagement", icon: FaShoppingCart },
  { label: "Users", path: "/admin/users", icon: FaUsers },
];

const AdminNavbar = () => {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await mutateAsync();
    } finally {
      logout();
      toast.success("Logged out successfully");
      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0d1128] to-[#1d1e33] border-b border-[#2c2e4a]">
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        {/* Logo / Title */}
        <div className="text-lg font-semibold text-white">
          Admin Dashboard
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `hover:text-white transition ${isActive ? "text-white" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-500 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setOpen(true)}
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* ---------- MOBILE OVERLAY MENU ---------- */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              className="fixed top-0 right-0 h-full w-72 bg-[#0f132e] z-50 p-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-white font-semibold">Menu</span>
                <button onClick={() => setOpen(false)}>
                  <FaTimes className="text-gray-300" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 text-gray-300">
                {navItems.map(({ label, path, icon: Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive
                        ? "bg-[#232447] text-white"
                        : "hover:bg-[#232447]"
                      }`
                    }
                  >
                    <Icon size={14} />
                    {label}
                  </NavLink>
                ))}
              </nav>

              <button
                onClick={handleLogout}
                className="mt-auto flex items-center gap-3 text-red-400 hover:text-red-500 px-3 py-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default AdminNavbar;
