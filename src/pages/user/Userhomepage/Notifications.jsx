import React, { useState } from 'react';

const Notifications = ({ isSidebar = false, onClose }) => {
  const [notifications, setNotifications] = useState([
    // ... your existing notifications data ...
    {
      id: 1,
      type: 'friend_request',
      user: 'xShadow',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      time: '5 min ago',
      read: false,
      game: 'Valorant',
      level: 15
    },
    // ... rest of your notifications ...
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'friend_request': return 'person_add';
      case 'game_invite': return 'sports_esports';
      case 'achievement': return 'military_tech';
      case 'tournament': return 'trophy';
      case 'like': return 'favorite';
      case 'level_up': return 'trending_up';
      case 'friend_online': return 'online_prediction';
      default: return 'notifications';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'friend_request': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'game_invite': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'achievement': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'tournament': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'like': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'level_up': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'friend_online': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // If used as sidebar, return compact version
  if (isSidebar) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">Notifications</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Stats Summary for Sidebar */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Unread</span>
            <span className="text-purple-400 font-bold">{unreadCount}</span>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Mark All as Read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
              <span className="material-symbols-outlined text-4xl mb-2">notifications_off</span>
              <p className="text-sm text-center">No notifications</p>
              <p className="text-xs text-center mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="p-2">
              {notifications.slice(0, 10).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg mb-2 cursor-pointer transition-all duration-200 ${
                    notification.read 
                      ? 'bg-gray-800/50 hover:bg-gray-700/50' 
                      : 'bg-blue-500/10 hover:bg-blue-500/20 border-l-2 border-blue-500'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-gray-700/50 ${getNotificationColor(notification.type)}`}>
                      <span className="material-symbols-outlined text-lg">
                        {getNotificationIcon(notification.type)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        {notification.avatar && (
                          <img 
                            src={notification.avatar} 
                            alt={notification.user}
                            className="w-5 h-5 rounded-full flex-shrink-0"
                          />
                        )}
                        <p className="text-white text-xs font-medium flex-1">
                          {notification.type === 'friend_request' && (
                            <><span className="text-blue-400">{notification.user}</span> sent friend request</>
                          )}
                          {notification.type === 'game_invite' && (
                            <><span className="text-green-400">{notification.user}</span> invited to {notification.game}</>
                          )}
                          {notification.type === 'achievement' && (
                            <>Achievement: {notification.title}</>
                          )}
                          {notification.type === 'tournament' && (
                            <>{notification.title}</>
                          )}
                          {notification.type === 'like' && (
                            <><span className="text-red-400">{notification.user}</span> liked your post</>
                          )}
                          {notification.type === 'level_up' && (
                            <>Level {notification.newLevel} in {notification.game}</>
                          )}
                          {notification.type === 'friend_online' && (
                            <><span className="text-emerald-400">{notification.user}</span> is online</>
                          )}
                        </p>
                      </div>
                      <p className="text-gray-400 text-xs">{notification.time}</p>
                      
                      {/* Quick Actions for Sidebar */}
                      <div className="flex gap-1 mt-2">
                        {notification.type === 'friend_request' && (
                          <>
                            <button className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors">
                              Accept
                            </button>
                            <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors">
                              Decline
                            </button>
                          </>
                        )}
                        {notification.type === 'game_invite' && (
                          <button className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded transition-colors">
                            Join
                          </button>
                        )}
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={onClose}
            className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Original full page version remains the same for /notifications route
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ... your existing full page code ... */}
    </div>
  );
};

export default Notifications;