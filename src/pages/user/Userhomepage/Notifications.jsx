import React, { useEffect, useState } from "react";
import axios from "axios";
import SERVERURL from "../../../services/serverURL";

const Notifications = ({ isSidebar = false, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Count unread notifications dynamically
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Debug logs to check notifications and unread count
  useEffect(() => {
    console.log("Notifications:", notifications);
    console.log("Unread count:", unreadCount);
  }, [notifications]);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(`${SERVERURL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        // Make sure read field is boolean
        const sanitized = res.data.notifications.map(n => ({
          ...n,
          read: !!n.read,  // force boolean
        }));
        setNotifications(sanitized);
      } else {
        setError("Failed to load notifications");
      }
    } catch (err) {
      setError("Error fetching notifications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Mark a single notification as read
  const markAsRead = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.post(
        `${SERVERURL}/notifications/mark-read/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.post(
        `${SERVERURL}/notifications/mark-all-read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  // Helper to render notification message based on type
  const renderNotificationMessage = (notif) => {
    switch (notif.type) {
      case "follow":
        return (
          <>
            <strong>{notif.fromUserId?.username || "Someone"}</strong> started
            following you
          </>
        );
      case "like":
        return (
          <>
            <strong>{notif.fromUserId?.username || "Someone"}</strong> liked
            your post
          </>
        );
      case "comment":
        return (
          <>
            <strong>{notif.fromUserId?.username || "Someone"}</strong> commented
            on your post
          </>
        );
      // Add more cases as needed for your notification types
      default:
        return notif.message;
    }
  };

  if (isSidebar) {
    return (
      <div className="flex flex-col h-full bg-gray-900 text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-xl font-bold">Notifications</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg"
            aria-label="Close notifications sidebar"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Unread count and Mark all button */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Unread</span>
            <span className="text-purple-400 font-bold">{unreadCount}</span>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="w-full py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white text-sm font-medium"
            >
              Mark All as Read
            </button>
          )}
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto p-2">
          {loading ? (
            <p className="text-center text-gray-400 mt-4">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500 mt-4">{error}</p>
          ) : notifications.length === 0 ? (
            <p className="text-center text-gray-400 mt-4">No notifications</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif._id}
                className={`p-3 rounded-lg mb-2 cursor-pointer transition-all duration-200 ${
                  notif.read
                    ? "bg-gray-800/50 hover:bg-gray-700/50"
                    : "bg-purple-600/20 hover:bg-purple-600/40 border-l-4 border-purple-500"
                }`}
                onClick={() => !notif.read && markAsRead(notif._id)}
                title={new Date(notif.createdAt).toLocaleString()}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-purple-500/20 text-purple-400">
                    <span className="material-symbols-outlined text-lg">
                      notifications
                    </span>
                  </div>
                  <div className="flex-1 text-xs">{renderNotificationMessage(notif)}</div>
                  {!notif.read && (
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Full page version (you can expand or style similarly)
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="mb-4">
        <button
          onClick={markAllAsRead}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold"
          disabled={unreadCount === 0}
        >
          Mark All as Read
        </button>
      </div>

      {loading ? (
        <p>Loading notifications...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className={`p-4 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors ${
                notif.read ? "" : "border-l-4 border-purple-500"
              }`}
              onClick={() => !notif.read && markAsRead(notif._id)}
              title={new Date(notif.createdAt).toLocaleString()}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-500/20 text-purple-400">
                  <span className="material-symbols-outlined text-2xl">
                    notifications
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">
                    {renderNotificationMessage(notif)}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
