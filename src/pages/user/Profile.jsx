import React, { useState } from "react";
import Navbar from "../../assets/components/common/Navbar";
import Footer from "../../assets/components/common/Footer";
// ✅ fixed path

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Dileep",
    email: "dileep@example.com",
    role: "Gamer",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated profile:", profile); // design-only
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
     
     
      <div className="max-w-2xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">🎮 Your Profile</h2>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              <input
                type="text"
                name="role"
                value={profile.role}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your role"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p>
                <span className="font-semibold">Name:</span> {profile.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {profile.email}
              </p>
              <p>
                <span className="font-semibold">Role:</span> {profile.role}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded font-semibold"
              >
                Edit Profile
              </button>
            </div>
          )}
   

        </div>
      </div>
    </div>
  );
};

export default Profile;
