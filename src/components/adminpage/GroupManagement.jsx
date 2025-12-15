import React, { useState } from 'react';

const GroupManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroups, setSelectedGroups] = useState([]);

  // Mock group data
  const groups = [
    {
      id: 1,
      name: 'Valorant Elite',
      description: 'Competitive Valorant players community',
      game: 'Valorant',
      members: 1250,
      maxMembers: 5000,
      owner: 'ProPlayer99',
      status: 'active',
      type: 'public',
      created: '2024-01-15',
      lastActive: '2 hours ago',
      posts: 342,
      events: 15,
      reports: 2,
      tags: ['competitive', 'esports', 'fps'],
      avatar: '🎯',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 2,
      name: 'CS2 Legends',
      description: 'CS2 enthusiasts and tournament players',
      game: 'Counter-Strike 2',
      members: 892,
      maxMembers: 2000,
      owner: 'AceHunter',
      status: 'active',
      type: 'public',
      created: '2024-01-14',
      lastActive: '30 minutes ago',
      posts: 156,
      events: 8,
      reports: 0,
      tags: ['tactical', 'fps', 'competitive'],
      avatar: '🔫',
      color: 'from-brown-500 to-yellow-500'
    },
    {
      id: 3,
      name: 'Fortnite Builders',
      description: 'Creative Fortnite builders and architects',
      game: 'Fortnite',
      members: 2345,
      maxMembers: 5000,
      owner: 'NovaStar',
      status: 'active',
      type: 'public',
      created: '2024-01-13',
      lastActive: '5 minutes ago',
      posts: 567,
      events: 23,
      reports: 5,
      tags: ['creative', 'building', 'battle-royale'],
      avatar: '🏰',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      name: 'LoL Strategy Masters',
      description: 'Advanced League of Legends strategy discussions',
      game: 'League of Legends',
      members: 1789,
      maxMembers: 3000,
      owner: 'ShadowWolf',
      status: 'restricted',
      type: 'private',
      created: '2024-01-12',
      lastActive: '1 hour ago',
      posts: 234,
      events: 12,
      reports: 3,
      tags: ['moba', 'strategy', 'competitive'],
      avatar: '⚔️',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 5,
      name: 'Apex Predators',
      description: 'Apex Legends competitive squad',
      game: 'Apex Legends',
      members: 645,
      maxMembers: 1000,
      owner: 'RogueKnight',
      status: 'suspended',
      type: 'private',
      created: '2024-01-11',
      lastActive: '3 days ago',
      posts: 89,
      events: 4,
      reports: 12,
      tags: ['battle-royale', 'squad', 'competitive'],
      avatar: '🚀',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 6,
      name: 'Rocket League Pros',
      description: 'Professional Rocket League community',
      game: 'Rocket League',
      members: 456,
      maxMembers: 1000,
      owner: 'LunaRay',
      status: 'active',
      type: 'public',
      created: '2024-01-10',
      lastActive: '15 minutes ago',
      posts: 123,
      events: 6,
      reports: 1,
      tags: ['sports', 'cars', 'competitive'],
      avatar: '🚗',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const groupStats = {
    total: 892,
    active: 756,
    suspended: 45,
    restricted: 91,
    totalMembers: 125430,
    averageSize: 140,
    newToday: 23,
    reported: 34
  };

  const toggleGroupSelection = (groupId) => {
    setSelectedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const selectAllGroups = () => {
    setSelectedGroups(groups.map(group => group.id));
  };

  const clearSelection = () => {
    setSelectedGroups([]);
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || group.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'from-green-500 to-emerald-500';
      case 'suspended': return 'from-red-500 to-orange-500';
      case 'restricted': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return '🟢';
      case 'suspended': return '🚫';
      case 'restricted': return '⚠️';
      default: return '⚫';
    }
  };

  const getTypeColor = (type) => {
    return type === 'public' 
      ? 'from-blue-500 to-cyan-500' 
      : 'from-purple-500 to-pink-500';
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Groups Management
          </h2>
          <p className="text-gray-400 mt-2">Manage gaming communities and groups</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl transition-all duration-300 flex items-center gap-2 border border-green-500/30 hover:scale-105">
            <span>👨‍👩‍👧‍👦</span> Create Group
          </button>
          <button className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-300 flex items-center gap-2 border border-blue-500/30 hover:scale-105">
            <span>📊</span> Analytics
          </button>
        </div>
      </div>

      {/* Group Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: '👨‍👩‍👧‍👦', label: 'Total Groups', value: groupStats.total, color: 'from-purple-600/20 to-purple-800/20', border: 'border-purple-500/30' },
          { icon: '🟢', label: 'Active Groups', value: groupStats.active, color: 'from-green-600/20 to-green-800/20', border: 'border-green-500/30' },
          { icon: '👥', label: 'Total Members', value: groupStats.totalMembers.toLocaleString(), color: 'from-blue-600/20 to-blue-800/20', border: 'border-blue-500/30' },
          { icon: '⚠️', label: 'Reported Groups', value: groupStats.reported, color: 'from-red-600/20 to-red-800/20', border: 'border-red-500/30' }
        ].map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-xl p-4 border ${stat.border} hover:scale-105 transition-transform duration-300`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className="text-2xl opacity-80">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Tabs */}
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'all', label: 'All Groups', icon: '👨‍👩‍👧‍👦' },
                { id: 'active', label: 'Active', icon: '🟢' },
                { id: 'suspended', label: 'Suspended', icon: '🚫' },
                { id: 'restricted', label: 'Restricted', icon: '⚠️' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-purple-500/30 text-white border border-purple-500/50'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedGroups.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">
                {selectedGroups.length} group{selectedGroups.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors border border-green-500/30">
                  Activate
                </button>
                <button className="px-3 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm hover:bg-yellow-500/30 transition-colors border border-yellow-500/30">
                  Restrict
                </button>
                <button className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors border border-red-500/30">
                  Suspend
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Groups Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-gray-800/50">
          <div className="col-span-1">
            <input
              type="checkbox"
              checked={selectedGroups.length === filteredGroups.length}
              onChange={selectedGroups.length === filteredGroups.length ? clearSelection : selectAllGroups}
              className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="col-span-3 text-gray-400 font-medium text-sm">GROUP</div>
          <div className="col-span-1 text-gray-400 font-medium text-sm">GAME</div>
          <div className="col-span-1 text-gray-400 font-medium text-sm">MEMBERS</div>
          <div className="col-span-1 text-gray-400 font-medium text-sm">STATUS</div>
          <div className="col-span-2 text-gray-400 font-medium text-sm">OWNER</div>
          <div className="col-span-1 text-gray-400 font-medium text-sm">TYPE</div>
          <div className="col-span-2 text-gray-400 font-medium text-sm">ACTIONS</div>
        </div>

        {/* Groups List */}
        <div className="divide-y divide-white/10">
          {filteredGroups.map(group => (
            <div key={group.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-white/5 transition-colors group">
              {/* Checkbox */}
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedGroups.includes(group.id)}
                  onChange={() => toggleGroupSelection(group.id)}
                  className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                />
              </div>

              {/* Group Info */}
              <div className="col-span-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-white font-bold text-lg`}>
                    {group.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{group.name}</p>
                    <p className="text-gray-400 text-sm line-clamp-1">{group.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-500 text-xs">📝 {group.posts} posts</span>
                      <span className="text-gray-500 text-xs">🎯 {group.events} events</span>
                      {group.reports > 0 && (
                        <span className="text-red-400 text-xs">🚩 {group.reports} reports</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Game */}
              <div className="col-span-1 flex items-center">
                <span className="text-gray-300 text-sm font-medium">{group.game}</span>
              </div>

              {/* Members */}
              <div className="col-span-1 flex items-center">
                <div className="text-center">
                  <p className="text-white font-semibold">{group.members}</p>
                  <p className="text-gray-400 text-xs">/{group.maxMembers}</p>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-1 flex items-center">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(group.status)} text-white border border-white/20`}>
                  <span>{getStatusIcon(group.status)}</span>
                  {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                </span>
              </div>

              {/* Owner */}
              <div className="col-span-2 flex items-center">
                <span className="text-gray-300 text-sm">{group.owner}</span>
              </div>

              {/* Type */}
              <div className="col-span-1 flex items-center">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getTypeColor(group.type)} text-white border border-white/20`}>
                  {group.type === 'public' ? '🌐' : '🔒'}
                  {group.type.charAt(0).toUpperCase() + group.type.slice(1)}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center gap-2">
                <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors" title="Edit">
                  ✏️
                </button>
                <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors" title="View">
                  👁️
                </button>
                <button className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-colors" title="Restrict">
                  ⚠️
                </button>
                <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors" title="Suspend">
                  🚫
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-white/10 flex justify-between items-center">
          <div className="text-gray-400 text-sm">
            Showing {filteredGroups.length} of {groups.length} groups
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-sm hover:bg-gray-600/50 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 bg-purple-500/30 text-white rounded-lg text-sm hover:bg-purple-500/40 transition-colors">
              1
            </button>
            <button className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-sm hover:bg-gray-600/50 transition-colors">
              2
            </button>
            <button className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-sm hover:bg-gray-600/50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Group Activity */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span>📈</span> Group Activity Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🆕', label: 'New Today', value: groupStats.newToday, color: 'from-green-500/20 to-emerald-500/20' },
              { icon: '📊', label: 'Avg Size', value: groupStats.averageSize, color: 'from-blue-500/20 to-cyan-500/20' },
              { icon: '📝', label: 'Total Posts', value: '12.5K', color: 'from-purple-500/20 to-pink-500/20' },
              { icon: '🎯', label: 'Active Events', value: '156', color: 'from-orange-500/20 to-red-500/20' }
            ].map((stat, index) => (
              <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 border border-white/10`}>
                <div className="text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <p className="text-white font-bold text-lg">{stat.value}</p>
                  <p className="text-gray-400 text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span>⚡</span> Quick Actions
          </h3>
          <div className="space-y-3">
            {[
              { icon: '🔍', label: 'Review Reports', color: 'from-red-500 to-orange-500' },
              { icon: '📢', label: 'Mass Announcement', color: 'from-blue-500 to-cyan-500' },
              { icon: '🎯', label: 'Featured Groups', color: 'from-yellow-500 to-orange-500' },
              { icon: '📋', label: 'Export Data', color: 'from-green-500 to-emerald-500' }
            ].map((action, index) => (
              <button
                key={index}
                className={`w-full p-3 rounded-xl bg-gradient-to-r ${action.color} text-white flex items-center gap-3 hover:scale-105 transition-all duration-300 border border-white/20`}
              >
                <span className="text-xl">{action.icon}</span>
                <span className="font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupManagement;