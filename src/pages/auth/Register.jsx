import React, { useState } from "react";
import { registerAPI } from "../../services/allAPI";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const RegisterDesignOnly = () => {
  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(userDetails);

  //register
  //first create state to collect user data 
const handleRegister = async () => {
  const { username, email, password } = userDetails;

  if (!username || !email || !password) {
    toast.warning("Please fill the form completely");
    return;
  }

  try {
    const result = await registerAPI(userDetails);
    console.log("REGISTER RESPONSE:", result);

    if (result._id) {
      toast.success("Successfully registered");
      setUserDetails({ username: "", email: "", password: "" });
      navigate("/login");
    }
  } catch (error) {
    console.error(error);

    // Check backend response status & message
    if (error.response?.status === 404) {
      toast.warning(error.response.data || "User already exists");
    } else {
      toast.error("Something went wrong");
    }
  }
};






  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text mb-3">
          Create Account
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Join our virtual world today!
        </p>

        {/* Form */}
        <div className="space-y-6">

          {/* Username */}
          <div className="space-y-1">
            <label className="text-gray-200 text-sm">Username</label>
            <input value={userDetails?.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
              type="text"
              placeholder="Enter username"
              className="w-full px-4 py-3 bg-white/10 text-white border border-white/20 rounded-xl placeholder-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-gray-200 text-sm">Email</label >
            <input required value={userDetails?.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 bg-white/10 text-white border border-white/20 rounded-xl placeholder-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-gray-200 text-sm">Password</label>
            <input value={userDetails?.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              type="password"
              placeholder="Create password"
              className="w-full px-4 py-3 bg-white/10 text-white border border-white/20 rounded-xl placeholder-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2 text-sm">
            <input type="checkbox" className="w-4 h-4" />
            <p className="text-gray-300">
              I agree to the{" "}
              <span className="text-pink-400 hover:underline cursor-pointer">
                Terms & Conditions
              </span>
            </p>
          </div>

          {/* Button */}
          <button onClick={handleRegister} className="w-full py-3 text-lg font-semibold text-white rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg">
            Sign Up
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-white/20"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-1 border-t border-white/20"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="py-2.5 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition">
            Google
          </button>
          <button className="py-2.5 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition">
            Twitter
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Already have an account?{" "}
         <Link to={"/login"}>
            <span className="text-blue-400 cursor-pointer hover:underline">
              Login
            </span>
         </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterDesignOnly;
