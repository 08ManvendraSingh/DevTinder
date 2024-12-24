import { Link, useNavigate } from "react-router-dom";
import Chat from "../assets/Chat.gif";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../utils/constants";
import { signupValidation } from "../utils/validation";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const inputData = {
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  };

  const [user, setUser] = useState(inputData);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      setError("");
      e.preventDefault();

      const isValid = signupValidation({ user, setError, error });
      if (!isValid) {
        return; // Stop form submission if validation fails
      }

      const response = await axios.post(`${API_URL}/signup`, user, {
        withCredentials: true,
      });
      if (response?.data?.error) {
        setError(response?.data?.message);
      }

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setUser(user);
        return navigate("/login");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <main className="flex-grow flex flex-col lg:flex-row items-center justify-center">
      <div className="lg:w-1/2 w-full p-6 lg:px-12 flex flex-col justify-center shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        <p className="text-gray-400 mb-6">
          Welcome back, please enter your details.
        </p>

        <form className="space-y-4 text-gray-900" onSubmit={handleSubmitForm}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={user.firstName}
              onChange={handleInputData}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={user.lastName}
              onChange={handleInputData}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            name="emailId"
            value={user.emailId}
            onChange={handleInputData}
            className="border rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleInputData}
              className="border rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm mt-4">
          Existing User?{" "}
          <Link to={"/login"} className="text-blue-400 hover:underline">
            Login Here
          </Link>
        </p>
      </div>

      <div className="lg:w-1/2 w-full flex justify-center items-center mt-8 lg:mt-0">
        <img
          src={Chat}
          alt="Illustration"
          className="w-full lg:w-4/5 rounded-lg"
        />
      </div>
    </main>
  );
};

export default Signup;
