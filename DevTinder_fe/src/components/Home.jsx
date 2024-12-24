import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Home = () => {
  
  return (
    <div className="flex h-full">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Home;
