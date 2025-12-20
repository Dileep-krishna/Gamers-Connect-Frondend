import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SERVERURL from '../services/serverURL';
import { updateUserProfileAPI } from '../services/allAPI';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [token, setTokenss] = useState("")
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    profile: "",
    bio: "",
    orginalname:""
  });

  const [existingProfile, setexistingProfile] = useState("")


  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Here you would typically upload to your backend
      console.log('Selected file:', file.name);
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

      setUserDetails({
        username: user.username || "",
        bio: user.bio || "",
        profile: user.profile || "",
        password: "",
        confirmPassword: "",
        orginalname:user.orginalname||""
      });

      setPreviewImage(
        user.profile
          ? `${SERVERURL}/imguploads/${user.profile}`
          : null
      );
    }
  }, []);
const handleUpdateProfile = async () => {
  const formData = new FormData();
  formData.append("username", userDetails.username);
  formData.append("bio", userDetails.bio);

  if (fileInputRef.current.files[0]) {
    formData.append("profile", fileInputRef.current.files[0]);
  }

  try {
    const result = await updateUserProfileAPI(formData);

    console.log("API RESULT:", result);

    if (result.success) {
      alert("Profile updated successfully");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">

      {/* Gaming Background Pattern */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1920')] bg-cover bg-center opacity-20"></div>

      {/* Animated Grid Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/60"></div>

      {/* Floating Gaming Icons */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl opacity-10 animate-bounce">🎮</div>
        <div className="absolute top-40 right-20 text-3xl opacity-10 animate-pulse">⚡</div>
        <div className="absolute bottom-32 left-1/4 text-4xl opacity-10 animate-ping">🏆</div>
      </div>

      {/* Header */}
      <div className="relative">
        <div className="px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>

            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                PROFILE EDIT
              </h1>
              <p className="text-gray-400 text-sm mt-1">Level up your gaming identity</p>
            </div>

            <div className="w-14"></div>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent max-w-4xl mx-auto"></div>
      </div>

      {/* Body */}
      <div className="relative max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Profile Picture & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                {/* Hidden File Input */}
                <input
                  type="file"
                  id="avatar-upload"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Profile Picture Preview */}
                <div className="relative group mb-4">
                  <div
                    className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-1 cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={handleProfilePictureClick}
                  >
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-gray-800 to-gray-900">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="relative">
                            <svg className="w-24 h-24 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Camera Icon Overlay */}
                  <div
                    className="absolute bottom-4 right-4 p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg"
                    onClick={handleProfilePictureClick}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 pointer-events-none">
                    <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      Tap to change photo
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 w-full">
                  <label
                    htmlFor="avatar-upload"
                    className="flex-1 cursor-pointer"
                  >
                    <div className="py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-purple-500/30 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        {previewImage ? 'Change' : 'Upload'}
                      </div>
                    </div>
                  </label>

                  {previewImage && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-medium transition-all duration-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Stats Section */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="text-yellow-400">🏆</span>
                  Profile Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                   <Link to={"/followers"} >
                    <div className="text-2xl font-bold text-cyan-400">27</div>
                    <div className="text-xs text-gray-400">Followers</div>
                    </Link>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                  <Link to={"/following"} >
                    <div className="text-2xl font-bold text-cyan-400">27</div>
                    <div className="text-xs text-gray-400 align-items-center d-flex justify-content-center">Following</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-xl rounded-2xl p-5 border border-cyan-500/30">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <span className="text-cyan-400">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-300">Pro Tip</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Use a clear gaming avatar that represents your playstyle!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Gamer Profile Settings</h2>
              </div>

              <form className="space-y-8">
                {/* Gamertag */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    <span className="flex items-center gap-2">
                      <span className="text-purple-400">🎯</span>
                      Gamertag *
                    </span>
                  </label>
                  <input value={userDetails.username}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, username: e.target.value })
                    }
                    type="text"
                    className="w-full px-5 py-4 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your gaming username"
                  />
                  <p className="text-sm text-gray-500">This is your display name in games</p>
                </div>

                {/* Display Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    <span className="flex items-center gap-2">
                      <span className="text-blue-400">👤</span>
                      Display Name
                    </span>
                  </label>
                  <input
                  value={userDetails.orginalname}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, orginalname:e.target.value })
                    }
                   
                    type="text"
                    className="w-full px-5 py-4 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your real name (optional)"
                  />
                </div>

                {/* Email */}
                {/* <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    <span className="flex items-center gap-2">
                      <span className="text-green-400">✉️</span>
                      Email Address *
                    </span>
                  </label>
                  <input value={userDetails.username}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, email: e.target.value })
                    }
                    type="email"
                    className="w-full px-5 py-4 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="gamer@email.com"
                  />
                </div> */}

                {/* Gaming Bio */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    <span className="flex items-center gap-2">
                      <span className="text-yellow-400">📝</span>
                      Gaming Bio
                    </span>
                  </label>
                  <textarea
                    value={userDetails.bio}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, bio: e.target.value })
                    }
                    rows="4"
                    className="w-full px-5 py-4 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Describe your gaming style, favorite games, achievements..."
                    maxLength="200"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tell us about your gaming journey</span>
                    <span className="text-gray-400">0/200</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-8 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-medium transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button onClick={handleUpdateProfile}
                    type="button"
                    className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-purple-500/30"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Update Profile
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;