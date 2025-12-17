import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../services/allAPI";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handLogin = async (e) => {
    e.preventDefault();

    const { email, password } = login;

    if (!email || !password) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      const result = await loginAPI(login);
      console.log("LOGIN RESPONSE:", result);

      if (result.success) {
        // ✅ STORE USER & TOKEN
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.existingUser)
        );
        sessionStorage.setItem("token", result.token);

        toast.success("Login successful");

        setLogin({ email: "", password: "" });

        // 🔥 FRONTEND ADMIN CHECK
        if (email === "admin@gmail.com" && password === "admin") {
          navigate("/admin");        // 👑 ADMIN PAGE
        } else {
          navigate("/userhome");     // 👤 USER PAGE
        }

      } else {
        toast.error(result.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">

      {/* Back Button */}
      <Link to="/home" className="absolute top-6 left-6">
        <button className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg border border-gray-700">
          ⬅ Back
        </button>
      </Link>

      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/40 p-8">

        <h1 className="text-3xl font-bold text-center text-purple-400 mb-2">
          Login
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Welcome back! Please log in to continue.
        </p>

        <form className="space-y-6" onSubmit={handLogin}>

          <input
            type="email"
            placeholder="Enter your email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-2xl text-white"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-2xl text-white"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
