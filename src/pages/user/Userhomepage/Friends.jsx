import React, { useEffect, useState } from "react";
import SERVERURL from "../../../services/serverURL"; // adjust path

function Friends() {
  const [allUsers, setAllUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parse user inside component render, so it's fresh
  const existingUser = React.useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("existingUser"));
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!existingUser || !Array.isArray(existingUser.following) || existingUser.following.length === 0) {
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        const res = await fetch(`${SERVERURL}/get-allUsers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();

        const usersList = data?.data?.users || data?.users || data;
        if (!Array.isArray(usersList)) {
          throw new Error("Invalid users data");
        }
        setAllUsers(usersList);

        const followingUsers = usersList.filter((user) =>
          existingUser.following.some((fid) => fid.toString() === user._id.toString())
        );
        setFriends(followingUsers);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [existingUser]);

  if (loading) {
    return (
      <p className="text-gray-400 text-center mt-10">Loading friends...</p>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center mt-10">
        Error loading friends: {error}
      </p>
    );
  }

  if (!existingUser) {
    return (
      <p className="text-gray-400 text-center mt-10">No user session found. Please login.</p>
    );
  }

  if (existingUser.following.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-10">You are not following anyone.</p>
    );
  }

  const filteredFriends = friends.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f0f1a] p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Friends</h2>

      <input
        type="text"
        placeholder="Search friends..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-[#1a1a2e] text-white px-4 py-2 rounded-lg border border-purple-500/30 focus:outline-none w-full md:w-64 mb-6"
      />

      {filteredFriends.length === 0 ? (
        <p className="text-gray-400 text-center">No friends match your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFriends.map((friend) => (
            <div
              key={friend._id}
              className="bg-[#1a1a2e] p-4 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    friend.profile
                      ? `${SERVERURL}/imguploads/${friend.profile}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt={friend.username}
                  className="w-12 h-12 rounded-full border border-purple-500 object-cover"
                />
                <div>
                  <p className="text-white font-semibold">{friend.username}</p>
                </div>
              </div>
              <span className="text-purple-400 text-sm">Message</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Friends;
