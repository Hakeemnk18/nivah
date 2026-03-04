import { Outlet } from "react-router-dom";
import '../style/theme.css'


export default function UserLayout() {
  return (
    <div className="user-theme ">


      <main>
        <Outlet />
      </main>


    </div>
  );
}