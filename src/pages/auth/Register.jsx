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
    <div className="min-h-screen text-white relative">
      {/* Gaming Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
        }}
      />
      
      {/* Dark Overlay for better readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900/95 via-purple-900/80 to-black/95 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-2xl border border-purple-500/30 rounded-3xl shadow-2xl p-8">
          
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <span className="text-4xl">🎮</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text mb-3">
            Join Virtual World
          </h1>
          <p className="text-center text-gray-300 mb-8 text-lg">
            Create your gaming identity
          </p>

          {/* Form */}
          <div className="space-y-6">

            {/* Username */}
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Username</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <span className="text-xl">👤</span>
                </div>
                <input 
                  value={userDetails?.username} 
                  onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                  type="text"
                  placeholder="Enter your gamer tag"
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Email</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <span className="text-xl">📧</span>
                </div>
                <input 
                  required 
                  value={userDetails?.email} 
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <span className="text-xl">🔒</span>
                </div>
                <input 
                  value={userDetails?.password} 
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                  type="password"
                  placeholder="Create secure password"
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center space-x-3 p-4 bg-gray-800/40 rounded-xl border border-gray-700/30">
              <input type="checkbox" className="w-5 h-5 bg-gray-700 rounded border-gray-600 text-purple-500 focus:ring-purple-500" />
              <p className="text-gray-300 text-sm">
                I agree to the{" "}
                <span className="text-pink-400 hover:underline cursor-pointer">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-blue-400 hover:underline cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* Button */}
            <button 
              onClick={handleRegister} 
              className="w-full py-4 text-lg font-bold text-white rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-500/30"
            >
              Create Account
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-700/50"></div>
            <span className="px-4 text-gray-500 text-sm">OR CONTINUE WITH</span>
            <div className="flex-1 border-t border-gray-700/50"></div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-3 py-3.5 bg-gray-800/60 backdrop-blur-sm text-white border border-gray-700/50 rounded-xl hover:bg-gray-700/80 transition-all duration-300 hover:scale-[1.02]">
              <span className="text-xl">🔵</span>
              <span className="font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3.5 bg-gray-800/60 backdrop-blur-sm text-white border border-gray-700/50 rounded-xl hover:bg-gray-700/80 transition-all duration-300 hover:scale-[1.02]">
              <span className="text-xl">🐦</span>
              <span className="font-medium">Twitter</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center p-4 bg-gray-900/40 rounded-xl border border-gray-700/30">
            <p className="text-gray-300">
              Already have an account?{" "}
              <Link to={"/login"}>
                <span className="text-blue-400 font-semibold hover:text-blue-300 hover:underline cursor-pointer transition-colors">
                  Login Now
                </span>
              </Link>
            </p>
          </div>

          {/* Footer Note */}
          <p className="text-center text-gray-600 text-xs mt-6">
            By joining Virtual World, you agree to our community guidelines
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterDesignOnly;