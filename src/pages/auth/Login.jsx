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
    <div className="min-h-screen text-white relative">
      {/* Gaming Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {/* Back Button */}
        <Link to="/home" className="absolute top-6 left-6 z-20">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800/90 text-gray-300 hover:text-white rounded-xl border border-gray-700/50 transition-colors">
            <span className="text-xl">←</span>
            Back to Home
          </button>
        </Link>

        <div className="w-full max-w-md bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-purple-500/30 p-8">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🎮</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Welcome Back, Player!
          </h1>

          <p className="text-center text-gray-400 mb-8 text-lg">
            Enter the virtual arena
          </p>

          <form className="space-y-6" onSubmit={handLogin}>
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <span className="text-xl">📧</span>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={login.email}
                  onChange={(e) => setLogin({ ...login, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <span className="text-xl">🔒</span>
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={login.password}
                  onChange={(e) => setLogin({ ...login, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 hover:from-purple-700 hover:via-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-500/30"
            >
              Enter Virtual World
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-500 mb-4">— OR —</p>
            <p className="text-gray-400">
              New to the arena?{" "}
              <Link to="/register" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
                Create your account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Ban Modal */}
      {showBanModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-2xl p-8 max-w-lg w-full text-white border border-red-500/30 shadow-2xl shadow-red-900/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                <span className="material-icons text-white text-2xl">
                  block
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-400">Account Restricted</h2>
                <p className="text-gray-400 text-sm">Access to Virtual World is currently limited</p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-red-900/20 rounded-xl border border-red-700/30">
              <p className="text-red-300 mb-2">
                <span className="font-semibold">Admin Message:</span>
              </p>
              <p className="text-gray-300 italic">
                "{banReason || "Your account has been temporarily restricted from accessing the platform."}"
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <label htmlFor="feedback" className="block text-gray-300 font-medium">
                Submit an appeal to admin:
              </label>
              <textarea
                id="feedback"
                rows={4}
                className="w-full p-4 rounded-xl bg-gray-800/60 backdrop-blur-sm text-white placeholder-gray-500 border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Please explain your situation and why you believe your account should be reinstated..."
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={() => setShowBanModal(false)}
                className="px-6 py-3 bg-gray-800/60 backdrop-blur-sm rounded-xl hover:bg-gray-700/80 border border-gray-700/50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleSendFeedback}
                disabled={sendingFeedback}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
              >
                {sendingFeedback ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Sending...
                  </span>
                ) : (
                  "Submit Appeal"
                )}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700/50 text-center">
              <p className="text-gray-500 text-sm">
                Your appeal will be reviewed by our admin team within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;