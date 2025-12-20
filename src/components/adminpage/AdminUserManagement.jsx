import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { adminUsersAPI, deleteUserAPI, toggleBanUserAPI } from "../../services/allAPI";
import SERVERURL from "../../services/serverURL";

const AdminUserManagement = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal state for ban reason
  const [showBanModal, setShowBanModal] = useState(false);
  const [banReason, setBanReason] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const getAllUsers = async () => {
    try {
      const result = await adminUsersAPI();

      if (Array.isArray(result)) {
        const filteredUsers = result.filter(
          (user) => user.email !== "admin@gmail.com"
        );
        setAllUsers(filteredUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE USER
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this user? This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteUserAPI(id);

        if (response?.success) {
          setAllUsers((prev) => prev.filter((user) => user._id !== id));
          await Swal.fire("Deleted!", "User has been deleted.", "success");
        } else {
          await Swal.fire("Error", response.message || "Failed to delete user.", "error");
        }
      } catch (error) {
        await Swal.fire("Error", "An unexpected error occurred.", "error");
      }
    }
  };

  // BAN / UNBAN USER
  // For Ban, open modal to get reason
  // For Unban, confirm immediately
  const handleBanToggle = async (id, isBanned) => {
    if (isBanned) {
      // Unban flow: confirm immediately
      const result = await Swal.fire({
        title: "Unban user?",
        text: "This user will be allowed to login again.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#16a34a",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, unban",
      });

      if (result.isConfirmed) {
        try {
          const response = await toggleBanUserAPI(id, ""); // empty reason on unban

          if (response?.success) {
            setAllUsers((prev) =>
              prev.map((user) =>
                user._id === id ? { ...user, isBanned: response.isBanned, banReason: "" } : user
              )
            );

            await Swal.fire("Success", "User unbanned successfully. Welcome back!", "success");
          }
        } catch (error) {
          await Swal.fire("Error", "Failed to update ban status", error);
        }
      }
    } else {
      // Ban flow: open modal to enter reason
      setSelectedUserId(id);
      setBanReason("");
      setShowBanModal(true);
    }
  };

  // Submit ban reason modal
  const submitBanReason = async () => {
    if (!banReason.trim()) {
      Swal.fire("Error", "Please enter a reason to ban the user.", "error");
      return;
    }
    try {
      const response = await toggleBanUserAPI(selectedUserId, banReason);
      if (response?.success) {
        setAllUsers((prev) =>
          prev.map((user) =>
            user._id === selectedUserId ? { ...user, isBanned: true, banReason } : user
          )
        );
        Swal.fire("Success", "User banned successfully", "success");
        setShowBanModal(false);
        setSelectedUserId(null);
        setBanReason("");
      } else {
        Swal.fire("Error", response.message || "Failed to ban user", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to ban user", "error");
    }
  };

  // Close modal
  const closeBanModal = () => {
    setShowBanModal(false);
    setSelectedUserId(null);
    setBanReason("");
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const searchedUsers = allUsers.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <h2 className="text-3xl font-bold mb-6">User Management</h2>

      <input
        type="text"
        placeholder="Search by username or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full md:w-1/3 px-4 py-3 rounded-xl bg-gray-900 border border-gray-700"
      />

      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 p-4 bg-gray-800 font-semibold">
          <div className="col-span-4">User</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Action</div>
        </div>

        {searchedUsers.length > 0 ? (
          searchedUsers.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-12 p-4 border-t border-gray-700 hover:bg-gray-800"
            >
              <div className="col-span-4 flex items-center gap-4">
                <img
                  src={
                    user.profile
                      ? `${SERVERURL}/imguploads/${user.profile}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span>{user.username}</span>
              </div>

              <div className="col-span-3 text-gray-300">{user.email}</div>

              <div
                className={`col-span-2 font-semibold ${
                  user.isBanned ? "text-red-400" : "text-green-400"
                }`}
                title={user.isBanned && user.banReason ? `Reason: ${user.banReason}` : ""}
              >
                {user.isBanned ? "Banned" : "Active"}
              </div>

              <div className="col-span-3 flex gap-4">
                <button
                  onClick={() => handleBanToggle(user._id, user.isBanned)}
                  className={`${
                    user.isBanned
                      ? "text-green-400 hover:text-green-600"
                      : "text-yellow-400 hover:text-yellow-600"
                  } font-semibold`}
                >
                  {user.isBanned ? "Unban" : "Ban"}
                </button>

                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-400 hover:text-red-600"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center p-6 text-gray-400">No users found</p>
        )}
      </div>

      <p className="mt-4 text-gray-400">Total Users: {searchedUsers.length}</p>

      {/* Ban Reason Modal */}
      {showBanModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={closeBanModal}
        >
          <div
            className="bg-gray-900 p-6 rounded-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Ban User - Enter Reason</h3>
            <textarea
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              placeholder="Type ban reason here..."
              className="w-full p-3 rounded-lg bg-gray-800 text-white resize-none"
              rows={4}
            ></textarea>

            <div className="flex justify-end mt-4 gap-4">
              <button
                onClick={closeBanModal}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={submitBanReason}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                Ban User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
