import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../store/userSlice";
import toast from "react-hot-toast";
import { FaSun, FaMoon, FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { toggleTheme } from "../store/themeSlice";
import { API_URL } from "../utils/constants";
import Logo from "../assets/Logo.png";
import { toggleSibeBar } from "../store/sidebarSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const { theme } = useSelector((store) => store.theme);
  const { sidebar } = useSelector((store) => store.sideBar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(removeUser());
        return navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`navbar bg-base-100 shadow-md z-100 ${
        theme == "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800"
      }}`}
    >
      <div className="flex-1">
        {user && (
          <div className="flex-none lg:hidden md:hidden">
            <button
              onClick={()=>dispatch(toggleSibeBar(!sidebar))}
              className="btn btn-ghost text-xl"
            >
              {!sidebar?<FaBars />:<FaTimes/>}
            </button>
          </div>
        )}
        <Link to="/" className="btn btn-ghost text-xl flex items-center">
          <img
            src={Logo}
            alt="DevTinder Logo"
            className="w-10 h-10 mr-2 bg-gray-900"
          />
          DevTinder
        </Link>
      </div>

      <div className="flex-none">
        {!user ? (
          <button>
            <Link to="/login">Login</Link>
          </button>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 h-10 rounded-full text-center">
                <div
                  tabIndex={0}
                  role="button"
                  className="bg-blue-500 text-white outline-none border-0 rounded-full w-full h-full flex items-center justify-center"
                >
                  {user?.firstName.charAt(0)}
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content shadow-md bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 ${
                theme == "dark"
                  ? "bg-gray-900 text-white"
                  : "bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800"
              }`}
            >
              <li>
                <Link to="/profile" className="flex items-center  w-full">
                  <FaUser />
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="flex items-center w-full text-left"
                >
                  {theme == "dark" ? (
                    <>
                      <FaSun />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <FaMoon /> Dark Mode
                    </>
                  )}
                </button>
              </li>
              <li onClick={handleLogout}>
                <button className="flex items-center  w-full text-left">
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
