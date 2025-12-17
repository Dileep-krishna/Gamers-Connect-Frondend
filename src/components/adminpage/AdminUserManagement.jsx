import React, { useEffect, useState } from "react";
import { adminUsersAPI, deleteUserAPI } from "../../services/allAPI";
import SERVERURL from "../../services/serverURL";

const AdminUserManagement = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllUsers = async () => {
    try {
      const result = await adminUsersAPI();

      if (Array.isArray(result)) {
        // ❌ remove admin
        const filteredUsers = result.filter(
          (user) => user.email !== "admin@gmail.com"
        );
        setAllUsers(filteredUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 🗑 Delete user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const result = await deleteUserAPI(id);
      if (result?.success) {
        alert("User deleted successfully");
        getAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // 🔍 Search
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
                      ? `${SERVERURL}/uploads/${user.profile}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span>{user.username}</span>
              </div>

              {/* Email */}
              <div className="col-span-4 text-gray-300">
                {user.email}
              </div>

              {/* Status */}
              <div className="col-span-2 text-green-400">
                Active
              </div>

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
          <p className="text-center p-6 text-gray-400">
            No users found
          </p>
        )}
      </div>

      <p className="mt-4 text-gray-400">
        Total Users: {searchedUsers.length}
      </p>
    </div>
  );
};

export default AdminUserManagement;
