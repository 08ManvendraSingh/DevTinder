import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/connectionSlice";
import { API_URL } from "../utils/constants";
import ShimmerCard from "./Shimmer";

const Connections = () => {
  const connection = useSelector((store) => store.connection);
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    // if (connection) return;
    try {
      const response = await axios.get(`${API_URL}/user/connection`, {
        withCredentials: true,
      });
      dispatch(addConnection(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connection) return <ShimmerCard/>;

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex flex-col items-center space-y-7 p-4 ">
        {connection.length > 0 ? (
          <div className="flex flex-col flex-wrap justify-center space-y-7">
            {connection &&
              connection.map((info) => (
                <div
                  key={info?._id}
                  className={`w-full sm:w-[520px] rounded-2xl shadow-lg p-4 flex items-center  ${
                    theme == "dark" &&
                    "bg-gradient-to-r from-gray-800 to-gray-700"
                  } relative`}
                >
                  {/* Image Section */}
                  <div className="w-32 h-32 rounded-lg overflow-hidden shadow-md flex-shrink-0 -ml-8">
                    <img
                      src={info?.photoURL[0] || ""}
                      alt="Blog"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="ml-6 flex-1">
                    {/* Name */}
                    <p className="text-lg mb-1 font-bold">
                      {info?.firstName} {info?.lastName}
                    </p>

                    {/* Gender */}
                    <h3 className="text-sm mb-2">{info?.gender}</h3>

                    {/* Bio */}
                    <p className="text-sm mb-3 leading-relaxed">{info?.bio}</p>

                    <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-4 py-1.5 rounded-full hover:shadow-lg transition">
                      Message
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <h2>No data found</h2>
        )}
      </div>
    </div>
  );
};

export default Connections;
