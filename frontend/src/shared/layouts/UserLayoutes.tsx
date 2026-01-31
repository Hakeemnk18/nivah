import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../style/theme.css'


export default function UserLayout() {
  return (
    <div className="user-theme">
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}