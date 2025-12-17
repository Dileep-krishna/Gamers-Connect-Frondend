import React, { useState } from 'react';

const AdminProfileEdit = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@gamehub.com',
    phone: '+1 (555) 123-4567',
    bio: 'Senior Administrator with full platform management privileges.',
    username: 'admin_user',
    role: 'Super Administrator',
    department: 'Platform Management',
    joinDate: '2023-01-15',
    twoFactorEnabled: true,
    lastPasswordChange: '2024-02-15',
    loginAlerts: true,
    emailNotifications: true,
    pushNotifications: false,
    language: 'english',
    timezone: 'UTC-5',
    theme: 'dark'
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
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

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Profile</h1>
          <button
            onClick={handleSaveProfile}
            className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg transition"
          >
            Save Changes
          </button>
        </header>

        <div className="flex gap-6">
          {/* Sidebar Tabs */}
          <nav className="flex flex-col w-56 space-y-3 bg-gray-800 rounded-lg p-5">
            {[
              { id: 'profile', label: 'Profile Info' },
              { id: 'account', label: 'Account Settings' },
              { id: 'security', label: 'Security' },
              { id: 'preferences', label: 'Preferences' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-4 py-2 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-purple-700 font-semibold'
                    : 'hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <section className="flex-grow bg-gray-800 rounded-lg p-6 space-y-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Profile Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="p-3 rounded bg-gray-700"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="p-3 rounded bg-gray-700"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="p-3 rounded bg-gray-700 md:col-span-2"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="p-3 rounded bg-gray-700 md:col-span-2"
                  />
                  <textarea
                    rows="3"
                    placeholder="Bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="p-3 rounded bg-gray-700 md:col-span-2 resize-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Username"
                    value={profileData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="p-3 rounded bg-gray-700"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={profileData.role}
                    disabled
                    className="p-3 rounded bg-gray-600 cursor-not-allowed text-gray-400"
                  />
                  <select
                    value={profileData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="p-3 rounded bg-gray-700 md:col-span-2"
                  >
                    <option>Platform Management</option>
                    <option>User Support</option>
                    <option>Content Moderation</option>
                    <option>Technical Operations</option>
                  </select>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleChangePassword}
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg"
                  >
                    Change Password
                  </button>
                  <p className="mt-2 text-gray-400">
                    Last changed: {profileData.lastPasswordChange}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={profileData.twoFactorEnabled}
                      onChange={e => handleInputChange('twoFactorEnabled', e.target.checked)}
                      className="form-checkbox"
                    />
                    Two-Factor Authentication
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={profileData.loginAlerts}
                      onChange={e => handleInputChange('loginAlerts', e.target.checked)}
                      className="form-checkbox"
                    />
                    Login Alerts
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Preferences</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={profileData.language}
                    onChange={e => handleInputChange('language', e.target.value)}
                    className="p-3 rounded bg-gray-700"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                  </select>

                  <select
                    value={profileData.timezone}
                    onChange={e => handleInputChange('timezone', e.target.value)}
                    className="p-3 rounded bg-gray-700"
                  >
                    <option value="UTC-5">UTC-5 (Eastern Time)</option>
                    <option value="UTC-8">UTC-8 (Pacific Time)</option>
                    <option value="UTC+0">UTC+0 (GMT)</option>
                    <option value="UTC+1">UTC+1 (Central European)</option>
                  </select>
                </div>

                <label className="flex items-center gap-3 mt-4">
                  <input
                    type="checkbox"
                    checked={profileData.emailNotifications}
                    onChange={e => handleInputChange('emailNotifications', e.target.checked)}
                    className="form-checkbox"
                  />
                  Email Notifications
                </label>

                <label className="flex items-center gap-3 mt-2">
                  <input
                    type="checkbox"
                    checked={profileData.pushNotifications}
                    onChange={e => handleInputChange('pushNotifications', e.target.checked)}
                    className="form-checkbox"
                  />
                  Push Notifications
                </label>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileEdit;
