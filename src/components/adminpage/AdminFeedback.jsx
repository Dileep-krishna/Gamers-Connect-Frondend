import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { getAllFeedbacksAPI, replyToFeedbackAPI } from "../../services/allAPI";

const AdminFeedback = () => {
  const [users, setUsers] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [activeEmail, setActiveEmail] = useState("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    const res = await getAllFeedbacksAPI();
    if (res.success) {
      setUsers(res.users);
    }
  };

  const handleReply = async (email) => {
    if (!replyText.trim()) {
      toast.warning("Enter reply message");
      return;
    }

    const res = await replyToFeedbackAPI({
      email,
      message: replyText
    });

    if (res.success) {
      toast.success("Reply sent");
      setReplyText("");
      setActiveEmail("");
    } else {
      toast.error("Failed to send reply");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">User Ban Feedbacks</h1>

      {users.length === 0 && (
        <p className="text-gray-400">No feedbacks yet</p>
      )}

      {users.map(user => (
        <div
          key={user._id}
          className="bg-gray-800 p-4 rounded mb-4"
        >
          <h3 className="font-semibold">{user.email}</h3>
          <p className="text-red-400">
            Ban Reason: {user.banReason}
          </p>

          {user.feedbacks.map((fb, idx) => (
            <div
              key={idx}
              className="bg-gray-700 p-2 mt-2 rounded"
            >
              <p>{fb.message}</p>
              <small className="text-gray-400">
                {new Date(fb.createdAt).toLocaleString()}
              </small>
            </div>
          ))}

          {/* Reply Section */}
          <textarea
            placeholder="Reply to user..."
            className="w-full mt-3 p-2 bg-gray-900 rounded"
            value={activeEmail === user.email ? replyText : ""}
            onChange={(e) => {
              setActiveEmail(user.email);
              setReplyText(e.target.value);
            }}
          />

          <button
            onClick={() => handleReply(user.email)}
            className="mt-2 bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
          >
            Send Reply
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminFeedback;
