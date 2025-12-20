import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AdminUserManagement from "./AdminUserManagement";
import ContentModeration from "./ContentModeration";
import GroupManagement from "./GroupManagement";
import AdminProfileEdit from "./AdminProfileEdit";

import SERVERURL from "../../services/serverURL";
import {
  adminUsersAPI,
  getAllFeedbacksAPI,
  getAllPostsAPI,
  replyToFeedbackAPI,
} from "../../services/allAPI";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [adminDetails, setAdminDetails] = useState({
    username: "",
    orginalname: "",
    bio: "",
    email: "",
    profile: "",
  });
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  // Feedback states
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);
  const [replyOpenFor, setReplyOpenFor] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  // Load admin from session on mount
  useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem("existingUser"));
    if (!admin) {
      navigate("/login");
    } else {
      setAdminDetails(admin);
    }
  }, [navigate]);

  // Load users & posts once on mount
  useEffect(() => {
    async function loadUsersAndPosts() {
      try {
        const u = await adminUsersAPI();
        const p = await getAllPostsAPI();
        setUsers(Array.isArray(u) ? u : []);
        setPosts(Array.isArray(p) ? p : []);
      } catch (error) {
        console.error("Error loading users or posts:", error);
      }
    }
    loadUsersAndPosts();
  }, []);

  // Load feedbacks only when feedback tab is active
  useEffect(() => {
    if (activeTab === "feedback") {
      setLoadingFeedbacks(true);

      getAllFeedbacksAPI()
        .then((res) => {
          const flat = [];
          res.forEach((user) => {
            if (user.feedbacks && user.feedbacks.length > 0) {
              user.feedbacks.forEach((fb) => {
                flat.push({
                  feedbackId: fb._id,
                  email: user.email,
                  username: user.username,
                  message: fb.message,
                  createdAt: fb.createdAt,
                });
              });
            }
          });
          setFeedbacks(flat);
        })
        .catch((err) => {
          console.error("Error loading feedbacks:", err);
          setFeedbacks([]);
        })
        .finally(() => setLoadingFeedbacks(false));
    }
  }, [activeTab]);

  // Send reply to user feedback
  const handleSendReply = async (email) => {
    if (!replyMessage.trim()) {
      alert("Please enter a reply message");
      return;
    }

    setSendingReply(true);
    try {
      const res = await replyToFeedbackAPI({
        email,
        message: replyMessage,
      });

      if (res.success) {
        alert("Reply sent successfully");
        setReplyOpenFor(null);
        setReplyMessage("");
      } else {
        alert(res.message || "Failed to send reply");
      }
    } catch (error) {
      alert("Error sending reply");
      console.error(error);
    }
    setSendingReply(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const handleEditProfile = () => {
    setShowProfileMenu(false);
    setActiveTab("profile-edit");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Dashboard Overview</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl">
                <p className="text-gray-400">Total Users</p>
                <h3 className="text-3xl text-purple-400 font-bold">{users.length}</h3>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <p className="text-gray-400">Total Posts</p>
                <h3 className="text-3xl text-blue-400 font-bold">{posts.length}</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl">
                <p className="p-4 border-b border-gray-700 font-semibold">Recent Users</p>
                {users.slice(0, 5).map((u) => (
                  <div key={u._id} className="p-4 border-t border-gray-700">
                    <p className="font-medium">{u.username}</p>
                    <p className="text-xs text-gray-400">{u.email}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-800 rounded-xl">
                <p className="p-4 border-b border-gray-700 font-semibold">Recent Posts</p>
                {posts.slice(0, 5).map((p) => (
                  <div key={p._id} className="p-4 border-t border-gray-700">
                    <p className="text-sm line-clamp-2">{p.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "users":
        return <AdminUserManagement />;

      case "content":
        return <ContentModeration />;

      case "groups":
        return <GroupManagement />;

      case "profile-edit":
        return <AdminProfileEdit adminDetails={adminDetails} setAdminDetails={setAdminDetails} />;

      case "feedback":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">User Ban Feedbacks</h2>

            {loadingFeedbacks ? (
              <p>Loading feedbacks...</p>
            ) : feedbacks.length === 0 ? (
              <p>No feedbacks found</p>
            ) : (
              feedbacks.map((f, i) => (
                <div key={i} className="bg-gray-800 p-4 mb-4 rounded-xl">
                  <p><b>User:</b> {f.username}</p>
                  <p><b>Email:</b> {f.email}</p>
                  <p><b>Message:</b> {f.message}</p>
                  <p className="text-xs text-gray-400">{new Date(f.createdAt).toLocaleString()}</p>

                  {replyOpenFor === i ? (
                    <>
                      <textarea
                        className="w-full mt-3 p-2 bg-gray-700 rounded"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          className="bg-purple-600 px-4 py-2 rounded"
                          onClick={() => handleSendReply(f.email)}
                          disabled={sendingReply}
                        >
                          {sendingReply ? "Sending..." : "Send Reply"}
                        </button>
                        <button
                          className="bg-gray-600 px-4 py-2 rounded"
                          onClick={() => setReplyOpenFor(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      className="mt-3 bg-blue-600 px-4 py-2 rounded"
                      onClick={() => setReplyOpenFor(i)}
                    >
                      Reply
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        );

      default:
        return <h2 className="text-3xl font-bold">Welcome Admin 👑</h2>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700 relative">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-purple-500/30 group"
        >
          <img
            src={
              adminDetails.profile
                ? `${SERVERURL}/imguploads/${adminDetails.profile}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{adminDetails.username || "Admin"}</span>
        </button>

        {showProfileMenu && (
          <div className="absolute right-6 top-16 bg-gray-800 rounded-xl w-44 border border-gray-700 z-50">
            <button
              onClick={handleEditProfile}
              className="w-full p-3 hover:bg-gray-700 rounded-t-xl"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full p-3 text-red-400 hover:bg-red-500/20 rounded-b-xl"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* LAYOUT */}
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* SIDEBAR */}
        <aside className="w-72 bg-gray-800 p-6 space-y-6 border-r border-gray-700">
          {/* 🔥 SIDEBAR PROFILE CARD */}
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3">
              <img
                src={
                  adminDetails.profile
                    ? `${SERVERURL}/imguploads/${adminDetails.profile}`
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">{adminDetails.username || "Admin User"}</p>
                <p className="text-xs text-gray-400">
                  {adminDetails.bio || "Platform Administrator"}
                </p>
              </div>
            </div>
          </div>

          {/* NAV */}
          {[
            { id: "overview", label: "📊 Overview" },
            { id: "users", label: "👥 Users" },
            { id: "content", label: "📝 Content" },
            { id: "groups", label: "👪 Groups" },
            { id: "feedback", label: "💬 Feedback" },
            { id: "profile-edit", label: "⚙️ Profile" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full text-left p-3 rounded-xl ${
                activeTab === id ? "bg-purple-600" : "hover:bg-gray-700"
              }`}
            >
              {label}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="w-full mt-6 p-3 bg-red-600 rounded"
          >
            Logout
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 overflow-auto">{renderTabContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
