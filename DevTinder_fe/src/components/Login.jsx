import { Link, useNavigate } from "react-router-dom";
import swipe from "../assets/swipe.gif";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { API_URL } from "../utils/constants";
import { loginValidation } from "../utils/validation";

const Login = () => {
  const inputData = {
    emailId: "",
    password: "",
  };

  const [user, setUser] = useState(inputData);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/profile/view`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");

      // Validate user input
      const isValid = loginValidation(user, setError);
      if (!isValid) {
        return; // Stop form submission if validation fails
      }

      const response = await axios.post(`${API_URL}/login`, user, {
        withCredentials: true,
      });

      if (response?.data?.error) {
        setError(response?.data?.message);
      }

      if (response?.data?.success) {
        toast.success(response?.data?.message);

        const userData = await fetchUserData();
        dispatch(addUser(userData));

        setUser(user);
        return navigate("/profile");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="max-w-md w-full shadow-lg p-4 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-4">
            Welcome 🙌, DevTinder
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Welcome back, please enter your details.
          </p>
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="emailId"
                value={user.emailId}
                onChange={handleInputData}
                className="mt-1 w-full p-3 border rounded text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInputData}
                className="mt-1 w-full p-3 border rounded text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            {"Don't have an account?"}
            <Link to={"/signup"} className="text-blue-500 underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      <div className="flex-1 bg-pink-200 flex justify-center items-center">
        <img
          src={swipe}
          alt="Login Illustration"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Login;
