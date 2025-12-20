import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SERVERURL from '../services/serverURL';
import { updateUserProfileAPI } from '../services/allAPI';

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

      {/* Header */}
      <div className="px-6 py-4 max-w-4xl mx-auto flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-xl"
        >
          ←
        </button>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          PROFILE EDIT
        </h1>

        <div className="w-10"></div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-gray-900/60 rounded-2xl p-6 border border-white/10">

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div
              className="w-48 h-48 mx-auto rounded-xl overflow-hidden cursor-pointer"
              onClick={handleProfilePictureClick}
            >
              {previewImage ? (
                <img src={previewImage} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                  Upload Photo
                </div>
              )}
            </div>

            {previewImage && (
              <button
                onClick={handleRemovePhoto}
                className="mt-3 w-full py-2 bg-white/10 rounded-lg"
              >
                Remove Photo
              </button>
            )}

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <Link to="/followers">
                <div className="bg-white/5 p-3 rounded-xl">
                  <h3 className="text-xl font-bold">27</h3>
                  <p className="text-sm text-gray-400">Followers</p>
                </div>
              </Link>
              <Link to="/following">
                <div className="bg-white/5 p-3 rounded-xl">
                  <h3 className="text-xl font-bold">27</h3>
                  <p className="text-sm text-gray-400">Following</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-2xl p-5 border border-cyan-500/30">
            <h4 className="font-semibold text-cyan-300 mb-1">💡 Pro Tip</h4>
            <p className="text-sm text-gray-300">
              Use a clear gaming avatar that represents your playstyle!
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 bg-gray-900/60 rounded-2xl p-8 border border-white/10">

          <div className="space-y-6">
            <input
              type="text"
              placeholder="Gamertag"
              value={userDetails.username}
              onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
              className="w-full p-4 bg-white/5 rounded-xl"
            />

            <input
              type="text"
              placeholder="Display Name"
              value={userDetails.orginalname}
              onChange={(e) => setUserDetails({ ...userDetails, orginalname: e.target.value })}
              className="w-full p-4 bg-white/5 rounded-xl"
            />

            <textarea
              rows="4"
              placeholder="Gaming Bio"
              value={userDetails.bio}
              onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
              className="w-full p-4 bg-white/5 rounded-xl"
            />

            <div className="flex gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 py-3 bg-white/10 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateProfile}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"
              >
                Update Profile
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
