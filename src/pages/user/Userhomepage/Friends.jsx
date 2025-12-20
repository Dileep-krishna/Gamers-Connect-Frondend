import React, { useEffect, useState } from "react";
import { adminUsersAPI, followUserAPI } from "../../../services/allAPI";
import SERVERURL from "../../../services/serverURL";

function Friends() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const existingUserJSON = sessionStorage.getItem("existingUser");
  const loggedInUserId = existingUserJSON ? JSON.parse(existingUserJSON)._id : null;

  // Fetch all users from backend
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const result = await adminUsersAPI();
      if (Array.isArray(result)) {
        setUsers(result);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Optimistically toggle follow/unfollow
  const handleFollowToggle = async (targetUserId, event) => {
    event.preventDefault();

    if (!loggedInUserId) {
      console.warn("No logged in user ID found. Please login first.");
      return;
    }
    if (targetUserId === loggedInUserId) {
      console.warn("You can't follow yourself.");
      return;
    }

    // Find the target user in the users array
    const targetUser = users.find((u) => u._id === targetUserId);
    if (!targetUser) return;

    const isCurrentlyFollowing = (targetUser.followers || []).some(
      (followerId) => followerId === loggedInUserId
    );

    // Optimistically update UI: add/remove loggedInUserId in targetUser's followers
    setUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u._id === targetUserId) {
          let updatedFollowers;
          if (isCurrentlyFollowing) {
            // unfollow: remove loggedInUserId
            updatedFollowers = (u.followers || []).filter((id) => id !== loggedInUserId);
          } else {
            // follow: add loggedInUserId
            updatedFollowers = [...(u.followers || []), loggedInUserId];
          }
          return { ...u, followers: updatedFollowers };
        }
        return u;
      })
    );

    try {
      // Call backend API to toggle follow/unfollow
      await followUserAPI(targetUserId);
    } catch (err) {
      console.error("Follow API error, reverting UI", err);
      // On error, revert back the optimistic update
      setUsers((prevUsers) =>
        prevUsers.map((u) => {
          if (u._id === targetUserId) {
            return { ...u, followers: targetUser.followers || [] }; // revert to original
          }
          return u;
        })
      );
      alert("Failed to update follow status. Please try again.");
    }
  };

  // Filter users based on search input
  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <h1 className="text-3xl font-bold text-white mb-4 text-center">
        Discover Gamers
      </h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search gamers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-purple-500"
        />
      </div>

      {loading && <p className="text-center text-gray-300">Loading gamers...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => {
          if (user._id === loggedInUserId) return null;

          const isFollowing = (user.followers || []).some(
            (followerId) => followerId === loggedInUserId
          );

          return (
            <div
              key={user._id}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 hover:scale-105 transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    user.profile
                      ? `${SERVERURL}/Imguploads/${user.profile}`
                      : "https://i.pravatar.cc/150"
                  }
                  alt="profile"
                  className="w-14 h-14 rounded-full border-2 border-purple-500 object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{user.username}</h3>
                  <p className="text-sm text-gray-300">{user.bio || "Gamer"}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-300 text-sm">
                  {(user.followers || []).length} Followers
                </span>

                <button
                  type="button"
                  onClick={(e) => handleFollowToggle(user._id, e)}
                  className={`px-4 py-1 rounded-full text-white transition ${
                    isFollowing
                      ? "bg-gray-700 hover:bg-red-600"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Friends;
