import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addrequest, removeRequest } from "../store/requestSlice";
import no_data from "../assets/no_data.gif";
import toast from "react-hot-toast";
import { API_URL } from "../utils/constants";
import ShimmerCard from "./Shimmer";


const Requests = () => {
  const request = useSelector((store) => store.request);
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  const fetchrequests = async () => {
    // if (request) return;
    try {
      const response = await axios.get(`${API_URL}/user/requests`, {
        withCredentials: true,
      });
      dispatch(addrequest(response.data.data));
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchrequests();
  }, []);

  const handleReviewRequest = async (status, _id) => {
    try {
      const response = await axios.post(
        `${API_URL}/review/` + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      toast.success(response?.data?.message);
      dispatch(removeRequest(_id));
    } catch (error) {
    }
  };

  if (!request) return <ShimmerCard/>;

  return (
    <div className="flex-1 overflow-y-auto p-8">
    <div className="flex flex-col items-center space-y-7 p-4 mt-5">
      {request.length > 0 ? (
        <div className="flex flex-wrap justify-center space-y-7 rounded-r-lg">
          {request &&
            request.map((info) => (
              <div
                key={info?._id}
                className={`relative w-full sm:w-[520px] p-6 rounded-l-full ${
                  theme == "dark" &&
                  "bg-gradient-to-r from-gray-800 to-gray-700"
                } rounded-r-lg shadow-lg flex items-center space-x-4 sm:max-w-md`}
              >
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-200 rounded-full shadow-inner-md overflow-hidden">
                  <img
                    src={info?.fromUserId?.photoURL[0]}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 pl-16">
                  <h2 className="text-lg font-bold">
                    {info?.fromUserId?.firstName} {info?.fromUserId?.lastName}
                  </h2>
                  {/* <p className="text-gray-400 text-sm">{info?.fromUserId.bio}</p> */}
                </div>

                <button
                  onClick={() => handleReviewRequest("accepted", info?._id)}
                  className="px-4 py-1 bg-[#E0E5EC] rounded-full from-[#80FF72] to-[#7EE8FA] shadow-[6px_6px_10px_#babecc,-6px_-6px_10px_#800080] text-gray-800 hover:shadow-[inset_6px_6px_10px_#babecc,inset_-6px_-6px_10px_#ffffff] transition"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleReviewRequest("rejectee", info?._id)}
                  className="px-4 py-1 bg-[#E0E5EC] rounded-full from-[#80FF72] to-[#7EE8FA] shadow-[6px_6px_10px_#babecc,-6px_-6px_10px_#800080] text-gray-800 hover:shadow-[inset_6px_6px_10px_#babecc,inset_-6px_-6px_10px_#ffffff] transition"
                >
                  Reject
                </button>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 p-10">
          <div className="mt-8">
            <img
              src={no_data}
              alt="404 Illustration"
              className="w-64 md:w-80 lg:w-96 rounded-lg shadow-lg"
            />
          </div>
          <h2 className="text-lg font-bold">No Request Present</h2>
        </div>
      )}
    </div>
    </div>
  );
};

export default Requests;
