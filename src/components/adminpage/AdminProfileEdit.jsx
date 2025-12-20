import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SERVERURL from '../../services/serverURL';
import { updateAdminProfileAPI } from '../../services/allAPI';

const AdminProfileEdit = ({ adminDetails, setAdminDetails }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(
    adminDetails.profile ? `${SERVERURL}/imguploads/${adminDetails.profile}` : null
  );

  // Sync previewImage if adminDetails.profile changes (e.g. after save)
  useEffect(() => {
    setPreviewImage(
      adminDetails.profile ? `${SERVERURL}/imguploads/${adminDetails.profile}` : null
    );
  }, [adminDetails.profile]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleRemovePhoto = () => {
    setPreviewImage(null);
    fileInputRef.current.value = '';
    // Also clear profile in adminDetails (optional)
    setAdminDetails({ ...adminDetails, profile: '' });
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append('username', adminDetails.username);
    formData.append('orginalname', adminDetails.orginalname);
    formData.append('bio', adminDetails.bio);

    if (fileInputRef.current.files[0]) {
      formData.append('profile', fileInputRef.current.files[0]);
    }

    try {
      const result = await updateAdminProfileAPI(formData);

      if (result && result.success) {
        alert('Admin profile updated');

        // Update session storage with new admin data
        sessionStorage.setItem('existingUser', JSON.stringify(result.admin));

        // Update adminDetails in parent Dashboard state
        setAdminDetails(result.admin);

        // Navigate back to dashboard overview or stay on edit page
        navigate('/admin');
      } else {
        alert('Profile update failed');
      }
    } catch (err) {
      alert('Profile update failed due to error');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
      {/* HEADER */}
      <div className="px-6 py-4 max-w-4xl mx-auto flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-3 bg-white/10 rounded-xl">
          ⬅
        </button>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          ADMIN PROFILE
        </h1>

        <div className="w-10"></div>
      </div>

      {/* BODY */}
      <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT : IMAGE */}
        <div className="bg-gray-800/60 rounded-2xl p-6 text-center">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileSelect}
          />

          <div
            onClick={handleImageClick}
            className="w-48 h-48 mx-auto rounded-2xl border-4 border-purple-600 overflow-hidden cursor-pointer"
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Admin"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-700">
                Upload
              </div>
            )}
          </div>

          {previewImage && (
            <button
              onClick={handleRemovePhoto}
              className="mt-4 bg-red-500 px-4 py-2 rounded-lg"
            >
              Remove Photo
            </button>
          )}
        </div>

        {/* RIGHT : FORM */}
        <div className="lg:col-span-2 bg-gray-800/60 rounded-2xl p-8 space-y-6">
          {/* Username */}
          <div>
            <label className="text-gray-400 text-sm">Username</label>
            <input
              type="text"
              value={adminDetails.username}
              onChange={(e) =>
                setAdminDetails({ ...adminDetails, username: e.target.value })
              }
              className="w-full p-4 bg-gray-700 rounded-xl"
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-gray-400 text-sm">Name</label>
            <input
              type="text"
              value={adminDetails.orginalname}
              onChange={(e) =>
                setAdminDetails({ ...adminDetails, orginalname: e.target.value })
              }
              className="w-full p-4 bg-gray-700 rounded-xl"
            />
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              value={adminDetails.email}
              disabled
              className="w-full p-4 bg-gray-600 rounded-xl cursor-not-allowed"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-gray-400 text-sm">Bio</label>
            <textarea
              rows="4"
              value={adminDetails.bio}
              onChange={(e) =>
                setAdminDetails({ ...adminDetails, bio: e.target.value })
              }
              className="w-full p-4 bg-gray-700 rounded-xl resize-none"
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="bg-gray-600 px-6 py-3 rounded-xl hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateProfile}
              className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition text-white"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileEdit;
