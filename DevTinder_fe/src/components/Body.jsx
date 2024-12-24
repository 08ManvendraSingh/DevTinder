import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { API_URL } from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const { theme } = useSelector((store) => store.theme);

  const fetchUserData = async () => {
    if (user) return;
    try {
      const response = await axios.get(`${API_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(response.data.data));
      // navigate('/feed');
    } catch (error) {
      navigate("/");
      // const status = error.response?.status;
      // if (status === 401) {
      //   navigate("/"); // Unauthorized, navigate to login
      // } else {
      //   navigate("/error"); // Other errors, navigate to error page
      // }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div
      className={`font-sans h-screen flex flex-col ${
        theme == "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800"
      }`}
    >
      <Navbar/>
      <div className="flex-1 overflow-y-auto">
        <Outlet/>
      </div>
      <Toaster />
    </div>
  );
};

export default Body;
