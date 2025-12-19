import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, sendBanFeedbackAPI } from "../../services/allAPI"; // Assume you created this API
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  // State for ban modal
  const [showBanModal, setShowBanModal] = useState(false);
  const [banReason, setBanReason] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [sendingFeedback, setSendingFeedback] = useState(false);

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

      // Handle banned user
      if (result?.banReason) {
        setBanReason(result.banReason);
        setShowBanModal(true);
        return;
      }

      if (result.success) {
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.existingUser)
        );
        sessionStorage.setItem("token", result.token);

        toast.success("Login successful");

        setLogin({ email: "", password: "" });

        // Admin / User redirect
        if (email === "admin@gmail.com" && password === "admin") {
          navigate("/admin");
        } else {
          navigate("/userhome");
        }
      } else {
        toast.error(result.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // Send feedback to admin
  const handleSendFeedback = async () => {
    if (!feedbackMessage.trim()) {
      toast.warning("Please enter a message");
      return;
    }
    setSendingFeedback(true);
    try {
      const payload = {
        email: login.email,
        message: feedbackMessage.trim()
      };
      const res = await sendBanFeedbackAPI(payload);
      if (res.success) {
        toast.success("Feedback sent to admin");
        setFeedbackMessage("");
        setShowBanModal(false);
      } else {
        toast.error(res.message || "Failed to send feedback");
      }
    } catch (err) {
      toast.error("Error sending feedback");
    }
    setSendingFeedback(false);
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

      {/* Ban Modal */}
      {showBanModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-lg w-full text-white shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-red-500">Account Banned</h2>
            <p className="mb-4">Admin message: <em>{banReason || "Your account has been banned."}</em></p>

            <label htmlFor="feedback" className="block mb-1 font-medium">
              Send feedback to admin:
            </label>
            <textarea
              id="feedback"
              rows={4}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
              placeholder="Explain why you think your account should be unbanned"
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
            />

            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={() => setShowBanModal(false)}
                className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
              >
                Close
              </button>
              <button
                onClick={handleSendFeedback}
                disabled={sendingFeedback}
                className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                {sendingFeedback ? "Sending..." : "Send Feedback"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Login;
