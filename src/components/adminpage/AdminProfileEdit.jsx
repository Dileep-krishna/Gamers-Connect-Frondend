import React, { useState } from 'react';

const AdminProfileEdit = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@gamehub.com',
    phone: '+1 (555) 123-4567',
    bio: 'Senior Administrator with full platform management privileges. Responsible for user management, content moderation, and system maintenance.',
    
    // Account Settings
    username: 'admin_user',
    role: 'Super Administrator',
    department: 'Platform Management',
    joinDate: '2023-01-15',
    
    // Security
    twoFactorEnabled: true,
    lastPasswordChange: '2024-02-15',
    loginAlerts: true,
    
    // Preferences
    emailNotifications: true,
    pushNotifications: false,
    language: 'english',
    timezone: 'UTC-5',
    theme: 'dark'
  });

  const [securityLogs, ] = useState([
    { id: 1, action: 'Login', device: 'Chrome on Windows', location: 'New York, US', time: '2024-03-15 14:30', status: 'success' },
    { id: 2, action: 'Password Change', device: 'Safari on macOS', location: 'New York, US', time: '2024-02-15 10:15', status: 'success' },
    { id: 3, action: 'Failed Login', device: 'Firefox on Linux', location: 'Unknown', time: '2024-03-10 03:45', status: 'failed' },
    { id: 4, action: 'Settings Update', device: 'Chrome on Windows', location: 'New York, US', time: '2024-03-08 16:20', status: 'success' }
  ]);

  const handleInputChange = (section, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // In real app, this would make API call
    console.log('Saving profile:', profileData);
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    const newPassword = prompt('Enter new password:');
    if (newPassword && newPassword.length >= 8) {
      alert('Password changed successfully!');
    } else {
      alert('Password must be at least 8 characters long.');
    }
  };

  const getStatusColor = (status) => {
    return status === 'success' ? 'text-green-400' : 'text-red-400';
  };

  const getStatusIcon = (status) => {
    return status === 'success' ? '✅' : '❌';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Admin Profile
          </h2>
          <p className="text-gray-400 mt-2">Manage your administrator account settings</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSaveProfile}
            className="px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl transition-all duration-300 flex items-center gap-2 border border-green-500/30 hover:scale-105"
          >
            <span>💾</span> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="xl:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span>⚙️</span> Settings
            </h3>
            <nav className="space-y-2">
              {[
                { id: 'profile', icon: '👤', label: 'Profile Info' },
                { id: 'account', icon: '🔐', label: 'Account Settings' },
                { id: 'security', icon: '🛡️', label: 'Security' },
                { id: 'preferences', icon: '🎨', label: 'Preferences' },
                { id: 'activity', icon: '📊', label: 'Activity Log' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600/40 to-blue-600/40 text-white shadow-lg border border-purple-500/50'
                      : 'hover:bg-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30">
              <h4 className="font-semibold mb-3 text-white">Account Overview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Role:</span>
                  <span className="text-purple-300 font-medium">{profileData.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Member Since:</span>
                  <span className="text-gray-300">{profileData.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">2FA:</span>
                  <span className={profileData.twoFactorEnabled ? 'text-green-400' : 'text-red-400'}>
                    {profileData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="xl:col-span-3">
          {/* Profile Information */}
          {activeTab === 'profile' && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <span>👤</span> Profile Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('personal', 'bio', e.target.value)}
                    rows="4"
                    className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <span>🔐</span> Account Settings
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Username</label>
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => handleInputChange('account', 'username', e.target.value)}
                      className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Role</label>
                    <input
                      type="text"
                      value={profileData.role}
                      disabled
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2">Department</label>
                    <select
                      value={profileData.department}
                      onChange={(e) => handleInputChange('account', 'department', e.target.value)}
                      className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Platform Management">Platform Management</option>
                      <option value="User Support">User Support</option>
                      <option value="Content Moderation">Content Moderation</option>
                      <option value="Technical Operations">Technical Operations</option>
                    </select>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-lg font-semibold mb-4 text-white">Password</h4>
                  <button
                    onClick={handleChangePassword}
                    className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-300 flex items-center gap-2 border border-blue-500/30 hover:scale-105"
                  >
                    <span>🔑</span> Change Password
                  </button>
                  <p className="text-gray-400 text-sm mt-2">
                    Last changed: {profileData.lastPasswordChange}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <span>🛡️</span> Security Settings
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <p className="font-semibold text-white">Two-Factor Authentication</p>
                    <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.twoFactorEnabled}
                      onChange={(e) => handleInputChange('security', 'twoFactorEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <p className="font-semibold text-white">Login Alerts</p>
                    <p className="text-gray-400 text-sm">Get notified of new sign-ins</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.loginAlerts}
                      onChange={(e) => handleInputChange('security', 'loginAlerts', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Security Logs */}
                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-lg font-semibold mb-4 text-white">Recent Security Activity</h4>
                  <div className="space-y-3">
                    {securityLogs.map(log => (
                      <div key={log.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="flex items-center gap-3">
                          <span className={getStatusColor(log.status)}>{getStatusIcon(log.status)}</span>
                          <div>
                            <p className="font-medium text-white">{log.action}</p>
                            <p className="text-gray-400 text-xs">{log.device} • {log.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-sm">{log.time}</p>
                          <p className={`text-xs ${getStatusColor(log.status)}`}>
                            {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeTab === 'preferences' && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <span>🎨</span> Preferences
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Language</label>
                    <select
                      value={profileData.language}
                      onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                      className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Timezone</label>
                    <select
                      value={profileData.timezone}
                      onChange={(e) => handleInputChange('preferences', 'timezone', e.target.value)}
                      className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="UTC-5">UTC-5 (Eastern Time)</option>
                      <option value="UTC-8">UTC-8 (Pacific Time)</option>
                      <option value="UTC+0">UTC+0 (GMT)</option>
                      <option value="UTC+1">UTC+1 (Central European)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <p className="font-semibold text-white">Email Notifications</p>
                    <p className="text-gray-400 text-sm">Receive important updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.emailNotifications}
                      onChange={(e) => handleInputChange('preferences', 'emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <p className="font-semibold text-white">Push Notifications</p>
                    <p className="text-gray-400 text-sm">Receive browser notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.pushNotifications}
                      onChange={(e) => handleInputChange('preferences', 'pushNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Activity Log */}
          {activeTab === 'activity' && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <span>📊</span> Activity Log
              </h3>
              
              <div className="space-y-4">
                {securityLogs.map(log => (
                  <div key={log.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${
                        log.status === 'success' ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'
                      }`}>
                        <span className={log.status === 'success' ? 'text-green-400' : 'text-red-400'}>
                          {getStatusIcon(log.status)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-white">{log.action}</p>
                        <p className="text-gray-400 text-sm">{log.device}</p>
                        <p className="text-gray-500 text-xs">{log.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{log.time}</p>
                      <p className={`text-sm ${getStatusColor(log.status)}`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfileEdit;