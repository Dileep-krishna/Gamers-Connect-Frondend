import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getMessagesAPI, sendMessageAPI } from "../../../services/allAPI";

function Chat() {
  const { userId } = useParams();
  const messagesEndRef = useRef(null);

  const currentUser = React.useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("existingUser"));
    } catch {
      return null;
    }
  }, []);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!userId) {
          setMessages([]);
          setLoading(false);
          return;
        }
        const msgs = await getMessagesAPI(userId);
        setMessages(msgs || []);
      } catch (err) {
        console.error("Failed to load messages", err);
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      const savedMessage = await sendMessageAPI(userId, text);
      setMessages((prev) => [...prev, savedMessage]);
      setText("");
    } catch (err) {
      console.error("Failed to send message", err);
      alert("Failed to send message");
    }
  };

  if (!currentUser) return <p className="text-center mt-10 text-gray-400">Please log in to chat.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col">
      {/* Gaming Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-purple-500/30 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎮</span>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold tracking-wider">GAME CHAT</h1>
              <p className="text-purple-300 text-sm">Level up your communication</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">ONLINE</span>
          </div>
        </div>
      </div>

      {/* Messages Container with Game UI */}
      <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-900/80 to-black/80">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-purple-300 text-lg">Loading chat data...</p>
              <p className="text-gray-400 text-sm">Connecting to game server</p>
            </div>
          ) : error ? (
            <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-6 text-center my-10">
              <span className="text-4xl mb-3">⚠️</span>
              <p className="text-red-300 text-xl mb-2">Connection Error</p>
              <p className="text-gray-400">{error}</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-block p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-2xl mb-6">
                <span className="text-6xl">💬</span>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">Chat Arena is Empty</h3>
              <p className="text-gray-400 mb-6">Send the first message to start your adventure!</p>
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 py-4">
              {messages.map((msg, i) => (
                <div
                  key={msg._id || i}
                  className={`flex ${msg.senderId === currentUser._id ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-md ${msg.senderId === currentUser._id ? "ml-auto" : "mr-auto"}`}>
                    {/* Sender name for received messages */}
                    {msg.senderId !== currentUser._id && (
                      <div className="flex items-center gap-2 mb-1 ml-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-400 text-xs font-medium">PLAYER</span>
                      </div>
                    )}
                    
                    {/* Message bubble */}
                    <div
                      className={`relative rounded-2xl px-5 py-3 shadow-lg ${
                        msg.senderId === currentUser._id
                          ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-br-none"
                          : "bg-gradient-to-r from-gray-800 to-gray-900 text-white border border-gray-700 rounded-bl-none"
                      }`}
                    >
                      <p className="text-white">{msg.message || msg.text}</p>
                      
                      {/* Timestamp */}
                      <div className={`text-xs mt-2 ${msg.senderId === currentUser._id ? "text-purple-200" : "text-gray-400"}`}>
                        {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    
                    {/* Decorative corner for message bubbles */}
                    <div
                      className={`w-4 h-4 ${msg.senderId === currentUser._id 
                        ? "ml-auto -mt-1 mr-1 bg-gradient-to-br from-purple-600 to-transparent" 
                        : "-mt-1 ml-1 bg-gradient-to-br from-gray-800 to-transparent border-l border-b border-gray-700"
                      }`}
                      style={{
                        clipPath: msg.senderId === currentUser._id 
                          ? 'polygon(100% 0, 0 0, 100% 100%)' 
                          : 'polygon(0 0, 0 100%, 100% 100%)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Game-style Input Area */}
      <div className="p-4 bg-gradient-to-t from-gray-900 to-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-center">
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl blur-sm"></div>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="relative w-full px-5 py-4 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-purple-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Type your message (Enter to send)..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
            </div>
            
            <button
              onClick={sendMessage}
              disabled={!text.trim()}
              className="relative px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold tracking-wider uppercase hover:from-purple-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed transition-all duration-200 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative flex items-center gap-2">
                <span className="text-lg">🚀</span>
                SEND
              </span>
            </button>
          </div>
          
          {/* Chat Stats */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Online Players: 1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Messages: {messages.length}</span>
              </div>
            </div>
            <div className="text-gray-500">
              Press <kbd className="px-2 py-1 bg-gray-800 rounded-md">ENTER</kbd> to send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;