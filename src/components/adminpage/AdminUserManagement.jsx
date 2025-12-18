import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";            // <-- Import SweetAlert2
import { adminUsersAPI, deleteUserAPI } from "../../services/allAPI";
import SERVERURL from "../../services/serverURL";

const AdminUserManagement = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  // 🗑 Delete user with SweetAlert2 confirmation
  const handleDelete = async (id) => {
    // Show SweetAlert confirmation dialog
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
          // Update state to remove deleted user
          setAllUsers((prev) => prev.filter((user) => user._id !== id));

          // Show success message
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } else {
          Swal.fire("Error", "Failed to delete user.", "error");
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "An error occurred.", "error");
      }
    }
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

      {/* Search */}
      <input
        type="text"
        placeholder="Search by username or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full md:w-1/3 px-4 py-3 rounded-xl bg-gray-900 border border-gray-700"
      />

      <div className="bg-gray-900 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 p-4 bg-gray-800 font-semibold">
          <div className="col-span-4">User</div>
          <div className="col-span-4">Email</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Action</div>
        </div>

        {/* Rows */}
        {searchedUsers.length > 0 ? (
          searchedUsers.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-12 p-4 border-t border-gray-700 hover:bg-gray-800"
            >
              {/* User profile */}
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

              {/* Email */}
              <div className="col-span-4 text-gray-300">{user.email}</div>

              {/* Status */}
              <div className="col-span-2 text-green-400">Active</div>

              {/* Delete */}
              <div className="col-span-2">
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
    </div>
  );
};

export default AdminUserManagement;
