import { Link, useLocation } from "react-router-dom";
import {
  FaCompass,
  FaUserFriends,
  FaBell,
  FaHandshake,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const SideBar = () => {
  const location = useLocation();
  const acitiveTab = location.pathname;
  const { sidebar } = useSelector((store) => store.sideBar);
  const { theme } = useSelector((store) => store.theme);

  return (
    <div
      className={`fixed top-[64px] z-30 h-full shadow-lg md:static md:shadow-none transition-all ${
        sidebar ? "left-0" : "-left-[260px]"
      } ${
        theme == "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800"
      }`}
    >
    <aside className="w-64 h-full p-6 shadow-2xl flex flex-col justify-between">
      <nav className="space-y-4 flex-grow">
        <Link
          to={"/feed"}
          className={`flex items-center text-gray-400 hover:text-white text-lg p-4 hover:bg-gray-800 rounded-md ${
            acitiveTab == "/feed" && "bg-gray-800"
          }`}
        >
          <span className="mr-3">
            <FaCompass />
          </span>
          Explore
        </Link>

        <Link
          to={"/connection"}
          className={`flex items-center text-gray-400 hover:text-white text-lg p-4 hover:bg-gray-800 rounded-md ${
            acitiveTab == "/connection" && "bg-gray-800"
          }`}
        >
          <span className="mr-3">
            <FaUserFriends />
          </span>
          Connections
        </Link>

        <Link
          to={"/notification"}
          className={`flex items-center text-gray-400 hover:text-white text-lg p-4 hover:bg-gray-800 rounded-md ${
            acitiveTab == "/notification" && "bg-gray-800"
          } `}
        >
          <span className="mr-3">
            <FaBell />
          </span>
          Notifications
        </Link>

        {/* Requests */}
        <Link
          to={"/request"}
          className={`flex items-center text-gray-400 hover:text-white text-lg p-4 hover:bg-gray-800 rounded-md ${
            acitiveTab == "/request" && "bg-gray-800"
          }`}
        >
          <span className="mr-3">
            <FaHandshake />
          </span>
          Requests
        </Link>

        <Link
          to={"/message"}
          className={`flex items-center text-gray-400 hover:text-white text-lg p-4 hover:bg-gray-800 rounded-md ${
            acitiveTab == "/message" && "bg-gray-800"
          }`}
        >
          <span className="mr-3">
            <FaEnvelope />
          </span>
          Messages
        </Link>

        <Link
          to={"/profile"}
          className={`flex items-center text-gray-400 hover:text-white text-lg p-4 hover:bg-gray-800 rounded-md ${
            acitiveTab == "/profile" && "bg-gray-800"
          }`}
        >
          <span className="mr-3">
            <FaUser />
          </span>
          Profile
        </Link>
      </nav>
    </aside>
    </div>
  );
};

export default SideBar;
