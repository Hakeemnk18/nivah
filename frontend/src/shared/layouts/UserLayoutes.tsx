import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../style/theme.css'
import Footer from "../components/Footer";


export default function UserLayout() {
  return (
    <div className="user-theme ">


      <main>
        <Outlet />
      </main>


    </div>
  );
}