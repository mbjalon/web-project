import { Navbar } from "../components/common/Navbar.tsx";
import { Outlet } from "react-router-dom";
const Global = () => {
  return (
    <div className="w-full">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Global;
