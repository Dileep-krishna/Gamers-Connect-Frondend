import React, { useState } from 'react';

const AdminUserManagement = () => {
  const [activeUserTab, setActiveUserTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Mock user data
  const users = [
    {
      id: 1,
      username: 'ProPlayer99',
      email: 'pro@email.com',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      status: 'active',
      level: 12,
      posts: 45,
      friends: 234,
      role: 'user',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFW6KEDHLirgS5Gyj1mzTzv-WXUI29I856vIteJNHnxZHxXZdVm0YT89WxmomvA_GpQ5314Y1grVHef74657rRmWi3CxmzgkEpaio_MfqOt33sQh4EKCO4wI-7K-w-mTVw_F3pNSxOf2TYmnSYFzqSoNyPqxav2CkWRBIDW8KvjzR2Gynw8TG_TS8rFNGKwgmCRdzel1jwF792HerV7wJa6lbSfSqCtdo7WNeEFx5TqIG2f8baWNvRuPnuadKbZiYXSuzkPO0QeDC1'
    },
    {
      id: 2,
      username: 'AceHunter',
      email: 'ace@email.com',
      joinDate: '2024-01-14',
      lastActive: '4 hours ago',
      status: 'active',
      level: 8,
      posts: 23,
      friends: 156,
      role: 'user',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMrjMtDQj-lANYcOPYEzZbmhLxNdrUCzNoHK_7G_ZLF8GUqktcYql1Al9_2jsclYlNQ8pWH0vT9rH1_tKKM6d4SX6_nfcFsA7LXpUPHXdbYAKw06WhzZ4dKct6XJVg3l1G_orHzx5DK0ik_R9LCagIq2qKErc2K708MTlNwJ_cDb6LZHWcnmDNehhg1x__mmSNYombHkmkgm-Jwi_HPpeFjaAdYyDf4Z3IX0LP2HBp1VVAIpW05IkoYtg1d0jGTJkKrTVlUlUe_5OH'
    },
    {
      id: 3,
      username: 'ShadowWolf',
      email: 'shadow@email.com',
      joinDate: '2024-01-13',
      lastActive: '1 day ago',
      status: 'banned',
      level: 15,
      posts: 67,
      friends: 289,
      role: 'user',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsxhDWbn1PYUcBXn5sRqjHtN7RNU-d-AdzY3dABS1_eHKrx498rN1mbwcCEfaFiZoROpP6da1oxJNxm_b9sX9qi-EqYi1gYNHlnVFvkO776yxRebrOZG4_z0U0PsP_F0TCwaMfT-wuMajGRRLPIeWrZfT1sxzopu1UrgIymf72XLvMf8RwVxedhXuMAGoFUfK-91EWwNVCraHM3GY6f1hcgE17HFoXo--fWzuxdpi04L5aDnRy3FfUMdzc3hfO1v51Vex8cXn8r2Kp'
    },
    {
      id: 4,
      username: 'NovaStar',
      email: 'nova@email.com',
      joinDate: '2024-01-12',
      lastActive: '30 minutes ago',
      status: 'active',
      level: 20,
      posts: 89,
      friends: 345,
      role: 'moderator',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ81XyOPSMVcMhs7hkzhh1OP3lVLAyiM4NedU0tkgo7gVZlTdJSB4Nz7Qg6yx9DHFLukoXnco_PNte1bWVxNDiH13YKLSf0VWxYwWc1W0foMWjmWf4Xkl2nr1NTSq18jrlfE7dswZdisfD63J8-noDA45sFDrneYfn0crrbIjIChlvAw-0mYhmRv_oO3Ll64RzjyEAMdFMchmrcinCnrG0nM-9tbi19Eaxb7F7mLe0Q6hymr86yQcw_l0DSDdvpjStbX2cCZkQYKlJ'
    },
    {
      id: 5,
      username: 'LunaRay',
      email: 'luna@email.com',
      joinDate: '2024-01-11',
      lastActive: '6 hours ago',
      status: 'inactive',
      level: 6,
      posts: 12,
      friends: 78,
      role: 'user',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIsweGKG2fBIIM_haiWr6dISPPlvlyZVSz8EGPPhUiu48IbBfixUY9cgbO5e8U6rTPtllkivPsQv0i_JA1E3Jf9FvjiCoCwyWJkbR-IgSsVKDOXMtpICRPga8rzHZaMrD9oM0vrLUe5KE1GqBFVbqRqKEWHizzVTCUYGmeW8quNQ3cOwBi3JhCJW_2y_nnTqEcI23E-V167ncZLbECLLMQjkK6I2JR45AIaj5cQPpF6Z_hruqE5pkvhF8ZqcLqBQhKIApoHCTgNDVZ'
    }
  ];

  const userStats = {
    total: 12543,
    active: 8421,
    newToday: 324,
    banned: 234,
    moderators: 45
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    setSelectedUsers(users.map(user => user.id));
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeUserTab === 'all' || user.status === activeUserTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div 
      className="min-h-screen p-6 space-y-6 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            User Management
          </h2>
          <div className="flex gap-3">
            <button className="px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl transition-all duration-300 flex items-center gap-2 border border-green-400/50 hover:scale-105 shadow-lg">
              <span>👤</span> Add New User
            </button>
            <button className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all duration-300 flex items-center gap-2 border border-blue-400/50 hover:scale-105 shadow-lg">
              <span>📥</span> Export Users
            </button>
          </div>
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { icon: '👥', label: 'Total Users', value: userStats.total, color: 'from-purple-500/80 to-purple-700/80', border: 'border-purple-400/50' },
            { icon: '🟢', label: 'Active Now', value: userStats.active, color: 'from-green-500/80 to-green-700/80', border: 'border-green-400/50' },
            { icon: '🆕', label: 'New Today', value: userStats.newToday, color: 'from-blue-500/80 to-blue-700/80', border: 'border-blue-400/50' },
            { icon: '🚫', label: 'Banned', value: userStats.banned, color: 'from-red-500/80 to-red-700/80', border: 'border-red-400/50' },
            { icon: '🛡️', label: 'Moderators', value: userStats.moderators, color: 'from-orange-500/80 to-orange-700/80', border: 'border-orange-400/50' }
          ].map((stat, index) => (
            <div 
              key={index} 
              className={`bg-gradient-to-br ${stat.color} backdrop-blur-md rounded-xl p-4 border ${stat.border} hover:scale-105 transition-all duration-300 shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/90 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value.toLocaleString()}</p>
                </div>
                <div className="text-2xl text-white/90">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls Bar */}
        <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-300">🔍</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Status Tabs */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'all', label: 'All Users', icon: '👥' },
                  { id: 'active', label: 'Active', icon: '🟢' },
                  { id: 'inactive', label: 'Inactive', icon: '⚫' },
                  { id: 'banned', label: 'Banned', icon: '🚫' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveUserTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeUserTab === tab.id
                        ? 'bg-purple-500/80 text-white border border-purple-400/50 shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 border border-white/20">
                <span className="text-white text-sm font-medium">
                  {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex gap-2">
                  <button className="px-3 py-2 bg-green-500/30 text-green-300 rounded-lg text-sm hover:bg-green-500/40 transition-colors border border-green-400/30">
                    Activate
                  </button>
                  <button className="px-3 py-2 bg-red-500/30 text-red-300 rounded-lg text-sm hover:bg-red-500/40 transition-colors border border-red-400/30">
                    Ban
                  </button>
                  <button className="px-3 py-2 bg-gray-500/30 text-gray-300 rounded-lg text-sm hover:bg-gray-500/40 transition-colors border border-gray-400/30">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/20 bg-white/10">
            <div className="col-span-1">
              <input
                type="checkbox"
                checked={selectedUsers.length === filteredUsers.length}
                onChange={selectedUsers.length === filteredUsers.length ? clearSelection : selectAllUsers}
                className="rounded border-white/30 bg-white/10 text-purple-400 focus:ring-purple-400"
              />
            </div>
            <div className="col-span-3 text-white font-medium text-sm">USER</div>
            <div className="col-span-2 text-white font-medium text-sm">STATUS</div>
            <div className="col-span-2 text-white font-medium text-sm">ROLE</div>
            <div className="col-span-2 text-white font-medium text-sm">LAST ACTIVE</div>
            <div className="col-span-2 text-white font-medium text-sm">ACTIONS</div>
          </div>

          {/* Users List */}
          <div className="divide-y divide-white/20">
            {filteredUsers.map(user => (
              <div key={user.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-white/10 transition-colors">
                {/* Checkbox */}
                <div className="col-span-1 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                    className="rounded border-white/30 bg-white/10 text-purple-400 focus:ring-purple-400"
                  />
                </div>

                {/* User Info */}
                <div className="col-span-3 flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full bg-cover border-2 border-purple-400/50 shadow-lg"
                    style={{ backgroundImage: `url('${user.avatar}')` }}
                  />
                  <div>
                    <p className="font-semibold text-white">{user.username}</p>
                    <p className="text-gray-300 text-sm">{user.email}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-2 flex items-center">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-500/30 text-green-300 border border-green-400/50' :
                    user.status === 'inactive' ? 'bg-gray-500/30 text-gray-300 border border-gray-400/50' :
                    'bg-red-500/30 text-red-300 border border-red-400/50'
                  }`}>
                    <span>{
                      user.status === 'active' ? '🟢' :
                      user.status === 'inactive' ? '⚫' : '🚫'
                    }</span>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </div>

                {/* Role */}
                <div className="col-span-2 flex items-center">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'moderator' ? 'bg-orange-500/30 text-orange-300 border border-orange-400/50' :
                    'bg-blue-500/30 text-blue-300 border border-blue-400/50'
                  }`}>
                    <span>{user.role === 'moderator' ? '🛡️' : '👤'}</span>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>

                {/* Last Active */}
                <div className="col-span-2 flex items-center text-gray-300 text-sm">
                  {user.lastActive}
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center gap-2">
                  <button className="p-2 text-blue-300 hover:bg-blue-500/30 rounded-lg transition-colors border border-transparent hover:border-blue-400/30" title="Edit">
                    ✏️
                  </button>
                  <button className="p-2 text-green-300 hover:bg-green-500/30 rounded-lg transition-colors border border-transparent hover:border-green-400/30" title="View Profile">
                    👁️
                  </button>
                  <button className="p-2 text-red-300 hover:bg-red-500/30 rounded-lg transition-colors border border-transparent hover:border-red-400/30" title="Ban User">
                    🚫
                  </button>
                  <button className="p-2 text-gray-300 hover:bg-gray-500/30 rounded-lg transition-colors border border-transparent hover:border-gray-400/30" title="More">
                    ⋮
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer */}
          <div className="p-4 border-t border-white/20 flex justify-between items-center bg-white/10">
            <div className="text-gray-300 text-sm">
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-colors border border-white/10">
                Previous
              </button>
              <button className="px-3 py-1 bg-purple-500/50 text-white rounded-lg text-sm hover:bg-purple-500/60 transition-colors border border-purple-400/30">
                1
              </button>
              <button className="px-3 py-1 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-colors border border-white/10">
                2
              </button>
              <button className="px-3 py-1 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-colors border border-white/10">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;