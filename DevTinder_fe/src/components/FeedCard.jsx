import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateFeed } from "../store/feedSlice";
import {
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import { API_URL } from "../utils/constants";

const FeedCard = ({ info }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((store) => store.theme);

  const handleSendRequest = async (status, _id) => {
    try {
      const response = await axios.post(
        `${API_URL}/request/` + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(response);
      toast.success(response?.data?.message);
      dispatch(updateFeed(_id));
    } catch (error) {
      console.log(error);
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % info?.photoURL.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? info?.photoURL.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {/* <div className="relative rounded-lg shadow-lg max-w-sm w-80 h-[450px] overflow-hidden">
          <img src={info?.photoURL} alt="User" className="w-full h-full object-cover" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-8">
              <button 
              onClick={() => handleSendRequest("ignored", info?._id)}
              className="bg-red-500 hover:bg-red-600 p-4 rounded-full shadow-lg">
                ✖️
              </button>
              <button 
              onClick={() => handleSendRequest("interested", info?._id)}
              className="bg-blue-500 hover:bg-blue-600 p-4 rounded-full shadow-lg">
                ❤️
              </button>
            </div>
          </div>

          <div className={`absolute bottom-0 left-0 right-0 ${theme=='dark'?'bg-gray-900':'bg-white'} bg-opacity-75 p-4 text-center`}>
            <h2 className="text-lg font-bold">{info?.firstName} {info?.lastName}</h2>
            {/* <p className="text-gray-400">{info.bio}</p> */}
      {/* <p className="mt-2 text-sm">Active a few hours ago</p> */}
      {/* </div> */}
      {/* </div> */}

      <div
        className={`relative w-96 h-[550px] rounded-2xl shadow-xl overflow-hidden flex flex-col items-center group ${
          theme == "dark" && "bg-gradient-to-r from-gray-800 to-gray-700"
        }`}
      >
        {/* Top Section */}
        <div className="relative w-full h-3/4">
          {/* Image */}
          <img
            src={info?.photoURL?.[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          {info?.photoURL.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <FaChevronRight size={20} />
              </button>
            </>
          )}

          {/* Progress Lines */}
          <div className="absolute top-2 left-4 right-4 flex justify-between items-center space-x-1">
            {info?.photoURL.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full ${
                  index === currentImageIndex ? "bg-gray-900" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Profile Details */}
        <div className="w-full flex flex-col items-start px-4 py-2">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold">
              {info?.firstName} {info?.lastName}
            </h2>
            <span className="text-gray-500">{info?.age}</span>
            <FaCheckCircle className="text-blue-500" />
          </div>
          <p className="text-gray-600">{info?.bio}</p>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 w-full flex justify-evenly px-4">
          <button
            onClick={() => handleSendRequest("ignored", info?._id)}
            className="w-12 h-12 flex items-center justify-center bg-red-500 text-white rounded-full shadow-lg"
          >
            <FaTimes size={20} />
          </button>
          <button
            onClick={() => handleSendRequest("interested", info?._id)}
            className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full shadow-lg"
          >
            <FaHeart size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default FeedCard;
