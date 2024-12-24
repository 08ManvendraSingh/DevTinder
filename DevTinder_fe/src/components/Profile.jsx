import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { API_URL } from "../utils/constants";
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(null);
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(user?.photoURL);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        age: user?.age || "",
        gender: user?.gender || "",
        bio: user?.bio || "",
      });
    }
  }, [user]);

  const handleInputData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    setError("");
    try {
      e.preventDefault();
      const filteredData = Object.keys(userData).reduce((acc, key) => {
        if (userData[key]) {
          acc[key] = userData[key];
        }
        return acc;
      }, {});

      const response = await axios.put(
        `${API_URL}/profile/updateProfile`,
        filteredData,
        { withCredentials: true }
      );
      if (response?.data?.error) {
        setError(response?.data?.message);
      }

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(addUser(response?.data?.data));
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const files = e.target.files; // Get all selected files
    if (files.length > 0) {
      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append("photoURL", file); // Append each file to the FormData object
      });

      try {
        const response = await axios.post(
          `${API_URL}/profile/uploadProfileImg`, // Endpoint should support multiple file uploads
          formData,
          { withCredentials: true }
        );
        if (response?.data?.success) {
          toast.success("Profile images uploaded successfully!");
          setProfileImage(response?.data?.data?.photoURL);
        }
      } catch (error) {
        toast.error("Error in uploading images");
      }
    }
  };

  return (
    user && (
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="flex-1 p-6 rounded-lg shadow-lg mb-6 lg:mb-0">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <form className="space-y-4" onSubmit={handleSubmitForm}>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData?.firstName}
                  onChange={handleInputData}
                  className="mt-1 w-full p-3 border border-gray-300 rounded bg-transparent"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData?.lastName}
                  onChange={handleInputData}
                  className="mt-1 w-full p-3 border border-gray-300 rounded bg-transparent"
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={userData?.age}
                  onChange={handleInputData}
                  className="mt-1 w-full p-3 border border-gray-300 rounded bg-transparent"
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={userData?.gender || ""}
                  onChange={handleInputData}
                  className="mt-1 w-full p-3 border border-gray-300 rounded bg-transparent"
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option className="bg-white text-gray-800" value="Male">
                    Male
                  </option>
                  <option className="bg-white text-gray-800" value="Female">
                    Female
                  </option>
                  <option className="bg-white text-gray-800" value="Others">
                    Others
                  </option>
                </select>
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows="4"
                  name="bio"
                  value={userData?.bio}
                  onChange={handleInputData}
                  className="mt-1 w-full p-3 border border-gray-300 rounded bg-transparent"
                  placeholder="Write about yourself"
                ></textarea>
              </div>
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 rounded text-white font-medium hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>

          <div className={`flex-1 p-6 flex justify-center items-start `}>
            <div
              className={`rounded-lg shadow-lg p-6 w-full max-w-sm text-center ${
                theme == "dark" && "bg-gradient-to-r from-gray-800 to-gray-700"
              }`}
            >
              <div className="relative group">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                <img
                  src={profileImage || user?.photoURL[0]}
                  alt="User Profile"
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                />
                <div
                  className="absolute top-[10%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-500"
                  onClick={handleImageClick}
                >
                  <FaCamera className="text-lg" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">
                {user?.firstName} {user?.lastName}
              </h3>
              {user?.bio && <p className="text-sm mb-4">{user?.bio}</p>}
              <div className="text-sm space-y-2">
                <p>
                  <strong>Email:</strong> {user?.emailId}
                </p>
                {user?.gender && (
                  <p>
                    <strong>Gender:</strong> {user?.gender}
                  </p>
                )}
                {user?.age && (
                  <p>
                    <strong>Age:</strong> {user?.age}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
