import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-900 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <span className="text-xl">←</span>
        Back
      </button>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      {/* Account Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Account</h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <span className="text-gray-700">Edit Profile</span>
            <span className="text-gray-400">→</span>
          </div>

          <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <span className="text-gray-700">Change Password</span>
            <span className="text-gray-400">→</span>
          </div>

          <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <span className="text-gray-700">Privacy Settings</span>
            <span className="text-gray-400">→</span>
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">App Settings</h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-gray-700">Dark Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <span className="text-gray-700">Notifications</span>
            <span className="text-gray-400">→</span>
          </div>

          <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <span className="text-gray-700">Language</span>
            <span className="text-gray-400">→</span>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Support</h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <span className="text-gray-700">Help & FAQ</span>
            <span className="text-gray-400">→</span>
          </div>

          <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <span className="text-gray-700">Report a Problem</span>
            <span className="text-gray-400">→</span>
          </div>

          <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <span className="text-gray-700">About Us</span>
            <span className="text-gray-400">→</span>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-colors mt-8">
        Logout
      </button>
    </div>
  );
};

export default Settings;