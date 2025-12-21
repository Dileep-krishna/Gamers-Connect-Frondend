import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SERVERURL from '../services/serverURL';
import { updateUserProfileAPI } from '../services/allAPI';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [previewImage, setPreviewImage] = useState(null);
  const [token, setTokenss] = useState("");

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    profile: "",
    bio: "",
    orginalname: ""
  });

  // Followers and following counts states
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  // Store userId here
  const [userId, setUserId] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleRemovePhoto = () => {
    setPreviewImage(null);
    fileInputRef.current.value = '';
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("existingUser"));

    if (token && user) {
      setTokenss(token);
      setUserId(user._id || "");

      setUserDetails({
        username: user.username || "",
        bio: user.bio || "",
        profile: user.profile || "",
        password: "",
        confirmPassword: "",
        orginalname: user.orginalname || ""
      });

      setPreviewImage(
        user.profile ? `${SERVERURL}/imguploads/${user.profile}` : null
      );

      setFollowersCount(user.followers?.length || 0);
      setFollowingCount(user.following?.length || 0);
    }
  }, []);

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("username", userDetails.username);
    formData.append("bio", userDetails.bio);
    formData.append("orginalname", userDetails.orginalname);

    if (fileInputRef.current.files[0]) {
      formData.append("profile", fileInputRef.current.files[0]);
    }

    try {
      const result = await updateUserProfileAPI(formData);

      if (result.success) {
        toast.success("Profile updated successfully");

        // Get old existingUser from sessionStorage
        const oldUser = JSON.parse(sessionStorage.getItem("existingUser"));

        // Update only username, bio, orginalname, and profile (if updated)
        const updatedUser = {
          ...oldUser,
          username: userDetails.username,
          bio: userDetails.bio,
          orginalname: userDetails.orginalname,
          profile: result.updatedProfile || oldUser.profile,
          // Keep followers and following as they were in oldUser
          followers: oldUser.followers,
          following: oldUser.following,
        };

        sessionStorage.setItem("existingUser", JSON.stringify(updatedUser));

        // Update counts state from updatedUser
        setFollowersCount(updatedUser.followers?.length || 0);
        setFollowingCount(updatedUser.following?.length || 0);

        navigate("/userhome");
      } else {
        alert("Profile update failed");
      }
    } catch (err) {
      console.log(err);
      alert("Profile update failed");
    }
  };

  return (
    <div className="min-h-screen text-white relative">
      {/* Gaming Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900/90 to-purple-900/70 backdrop-blur-xl border-b border-purple-500/30">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">←</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">Edit Gaming Profile</h1>
                    <p className="text-gray-300 text-sm">Customize your virtual identity</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Picture & Stats */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-900/90 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-8 shadow-2xl">
                {/* File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Profile Picture */}
                <div className="relative mx-auto mb-6">
                  <div 
                    onClick={handleProfilePictureClick}
                    className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden cursor-pointer group border-4 border-purple-500/50 hover:border-purple-400 transition-all duration-300"
                  >
                    {previewImage ? (
                      <img 
                        src={previewImage} 
                        alt="profile" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <span className="text-4xl mb-2">📷</span>
                        <span className="text-gray-400">Upload Photo</span>
                        <span className="text-gray-500 text-sm mt-1">Click to add profile picture</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="text-white text-lg font-semibold">Change Photo</span>
                    </div>
                  </div>
                  
                  {/* Remove Photo Button */}
                  {previewImage && (
                    <button
                      onClick={handleRemovePhoto}
                      className="mt-4 w-full py-3 bg-gradient-to-r from-red-600/20 to-red-600/10 backdrop-blur-sm rounded-xl text-red-300 hover:text-red-200 hover:bg-red-600/30 transition-all duration-300 border border-red-500/30 hover:border-red-400/50"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>🗑️</span>
                        Remove Photo
                      </span>
                    </button>
                  )}
                </div>

                {/* Stats */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-white mb-4 text-center">Gaming Network</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Link to={`/following/${userId}`}>
                      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-xl p-5 border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                        <div className="text-3xl font-bold text-pink-400 text-center">{followersCount}</div>
                        <div className="text-gray-300 text-center text-sm mt-2">Followers</div>
                        <div className="text-gray-500 text-xs text-center mt-1">View all</div>
                      </div>
                    </Link>

                    <Link to={`/following/${userId}`}>
                      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-xl p-5 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                        <div className="text-3xl font-bold text-blue-400 text-center">{followingCount}</div>
                        <div className="text-gray-300 text-center text-sm mt-2">Following</div>
                        <div className="text-gray-500 text-xs text-center mt-1">View all</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Edit Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-900/90 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-8 shadow-2xl">
                <div className="space-y-6">
                  {/* Gamertag */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <span className="flex items-center gap-2">
                        <span>🎮</span>
                        Gamertag
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your gaming username"
                      value={userDetails.username}
                      onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* Display Name */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <span className="flex items-center gap-2">
                        <span>👤</span>
                        Display Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your display name"
                      value={userDetails.orginalname}
                      onChange={(e) => setUserDetails({ ...userDetails, orginalname: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Gaming Bio */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <span className="flex items-center gap-2">
                        <span>📝</span>
                        Gaming Bio
                      </span>
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Tell us about your gaming journey, favorite games, or achievements..."
                      value={userDetails.bio}
                      onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6">
                    <button
                      onClick={() => navigate(-1)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl text-gray-300 hover:text-white hover:bg-gray-700/80 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/70"
                    >
                      <span>←</span>
                      Cancel
                    </button>

                    <button
                      onClick={handleUpdateProfile}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-500/30"
                    >
                      <span>💾</span>
                      Update Profile
                    </button>
                  </div>

                  {/* Note */}
                  <div className="mt-6 pt-6 border-t border-gray-700/50">
                    <p className="text-gray-500 text-sm text-center">
                      Your profile will be visible to other players in the gaming community
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;