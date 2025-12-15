import React, { useState } from 'react';

const TournamentManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTournaments, setSelectedTournaments] = useState([]);

  // Mock tournament data
  const tournaments = [
    {
      id: 1,
      name: 'Valorant Champions 2024',
      game: 'Valorant',
      organizer: 'Riot Games',
      status: 'live',
      participants: 256,
      maxParticipants: 256,
      prizePool: 50000,
      entryFee: 50,
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      registrationEnd: '2024-03-14',
      type: 'premium',
      views: 12500,
      likes: 3421,
      platform: 'PC',
      region: 'Global',
      rules: 'Standard ESL rules apply',
      featured: true,
      tags: ['esports', 'premium', 'fps']
    },
    {
      id: 2,
      name: 'CS2 Community Cup',
      game: 'Counter-Strike 2',
      organizer: 'Community Esports',
      status: 'upcoming',
      participants: 128,
      maxParticipants: 128,
      prizePool: 15000,
      entryFee: 25,
      startDate: '2024-03-25',
      endDate: '2024-03-27',
      registrationEnd: '2024-03-24',
      type: 'standard',
      views: 8400,
      likes: 2156,
      platform: 'PC',
      region: 'Europe',
      rules: 'Community rules with admin oversight',
      featured: false,
      tags: ['community', 'fps']
    },
    {
      id: 3,
      name: 'Fortnite Solo Showdown',
      game: 'Fortnite',
      organizer: 'Epic Games',
      status: 'completed',
      participants: 512,
      maxParticipants: 512,
      prizePool: 75000,
      entryFee: 0,
      startDate: '2024-03-01',
      endDate: '2024-03-03',
      registrationEnd: '2024-02-28',
      type: 'free',
      views: 28900,
      likes: 8921,
      platform: 'Crossplay',
      region: 'Global',
      rules: 'Official Fortnite competitive rules',
      featured: true,
      tags: ['battle-royale', 'free', 'featured']
    },
    {
      id: 4,
      name: 'League of Legends Clash',
      game: 'League of Legends',
      organizer: 'Riot Games',
      status: 'registration',
      participants: 64,
      maxParticipants: 128,
      prizePool: 10000,
      entryFee: 10,
      startDate: '2024-03-18',
      endDate: '2024-03-18',
      registrationEnd: '2024-03-17',
      type: 'standard',
      views: 15600,
      likes: 4231,
      platform: 'PC',
      region: 'North America',
      rules: 'Team-based 5v5 tournament',
      featured: false,
      tags: ['moba', 'team']
    },
    {
      id: 5,
      name: 'Apex Legends Global Series',
      game: 'Apex Legends',
      organizer: 'EA Sports',
      status: 'cancelled',
      participants: 0,
      maxParticipants: 120,
      prizePool: 30000,
      entryFee: 30,
      startDate: '2024-03-22',
      endDate: '2024-03-24',
      registrationEnd: '2024-03-21',
      type: 'premium',
      views: 9200,
      likes: 2890,
      platform: 'Crossplay',
      region: 'Global',
      rules: 'ALGS official ruleset',
      featured: true,
      tags: ['battle-royale', 'premium']
    },
    {
      id: 6,
      name: 'Rocket League Championship',
      game: 'Rocket League',
      organizer: 'Psyonix',
      status: 'live',
      participants: 96,
      maxParticipants: 96,
      prizePool: 25000,
      entryFee: 15,
      startDate: '2024-03-16',
      endDate: '2024-03-17',
      registrationEnd: '2024-03-15',
      type: 'standard',
      views: 11200,
      likes: 3345,
      platform: 'Crossplay',
      region: 'Global',
      rules: '3v3 standard rules',
      featured: true,
      tags: ['sports', 'featured']
    }
  ];

  const tournamentStats = {
    total: 156,
    live: 12,
    upcoming: 45,
    completed: 89,
    cancelled: 10,
    totalPrizePool: 1250000,
    totalParticipants: 45231,
    averageEntryFee: 28,
    featured: 23
  };

  const games = [
    { id: 'valorant', name: 'Valorant', icon: '🔫', color: 'from-red-500 to-orange-500' },
    { id: 'cs2', name: 'Counter-Strike 2', icon: '🎯', color: 'from-brown-500 to-yellow-500' },
    { id: 'fortnite', name: 'Fortnite', icon: '🏰', color: 'from-purple-500 to-pink-500' },
    { id: 'lol', name: 'League of Legends', icon: '⚔️', color: 'from-blue-500 to-cyan-500' },
    { id: 'apex', name: 'Apex Legends', icon: '🚀', color: 'from-green-500 to-emerald-500' },
    { id: 'rocketleague', name: 'Rocket League', icon: '🚗', color: 'from-orange-500 to-red-500' }
  ];

  const toggleTournamentSelection = (tournamentId) => {
    setSelectedTournaments(prev =>
      prev.includes(tournamentId)
        ? prev.filter(id => id !== tournamentId)
        : [...prev, tournamentId]
    );
  };

  const selectAllTournaments = () => {
    setSelectedTournaments(tournaments.map(tournament => tournament.id));
  };

  const clearSelection = () => {
    setSelectedTournaments([]);
  };

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || tournament.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'from-green-500 to-emerald-500';
      case 'upcoming': return 'from-blue-500 to-cyan-500';
      case 'registration': return 'from-purple-500 to-pink-500';
      case 'completed': return 'from-gray-500 to-gray-600';
      case 'cancelled': return 'from-red-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'live': return '🔴';
      case 'upcoming': return '⏰';
      case 'registration': return '📝';
      case 'completed': return '✅';
      case 'cancelled': return '❌';
      default: return '⚫';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'premium': return 'from-yellow-500 to-orange-500';
      case 'standard': return 'from-blue-500 to-cyan-500';
      case 'free': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Tournament Management
          </h2>
          <p className="text-gray-400 mt-2">Manage and monitor all platform tournaments</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl transition-all duration-300 flex items-center gap-2 border border-green-500/30 hover:scale-105">
            <span>🏆</span> Create Tournament
          </button>
          <button className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-300 flex items-center gap-2 border border-blue-500/30 hover:scale-105">
            <span>📥</span> Export Data
          </button>
        </div>
      </div>

      {/* Tournament Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: '🏆', label: 'Total Tournaments', value: tournamentStats.total, color: 'from-purple-600/20 to-purple-800/20', border: 'border-purple-500/30' },
          { icon: '🔴', label: 'Live Now', value: tournamentStats.live, color: 'from-green-600/20 to-green-800/20', border: 'border-green-500/30' },
          { icon: '💰', label: 'Total Prize Pool', value: `$${tournamentStats.totalPrizePool.toLocaleString()}`, color: 'from-yellow-600/20 to-yellow-800/20', border: 'border-yellow-500/30' },
          { icon: '👥', label: 'Total Participants', value: tournamentStats.totalParticipants.toLocaleString(), color: 'from-blue-600/20 to-blue-800/20', border: 'border-blue-500/30' }
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

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '⏰', label: 'Upcoming', value: tournamentStats.upcoming, color: 'from-blue-500/20 to-blue-600/20' },
          { icon: '✅', label: 'Completed', value: tournamentStats.completed, color: 'from-gray-500/20 to-gray-600/20' },
          { icon: '⭐', label: 'Featured', value: tournamentStats.featured, color: 'from-yellow-500/20 to-yellow-600/20' },
          { icon: '💰', label: 'Avg Entry Fee', value: `$${tournamentStats.averageEntryFee}`, color: 'from-green-500/20 to-green-600/20' }
        ].map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-lg p-3 border border-white/10`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs">{stat.label}</p>
                <p className="text-lg font-bold text-white">{stat.value}</p>
              </div>
              <div className="text-xl opacity-80">{stat.icon}</div>
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
                  placeholder="Search tournaments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Tabs */}
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'all', label: 'All', icon: '🏆' },
                { id: 'live', label: 'Live', icon: '🔴' },
                { id: 'upcoming', label: 'Upcoming', icon: '⏰' },
                { id: 'registration', label: 'Registration', icon: '📝' },
                { id: 'completed', label: 'Completed', icon: '✅' },
                { id: 'cancelled', label: 'Cancelled', icon: '❌' }
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
          {selectedTournaments.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">
                {selectedTournaments.length} tournament{selectedTournaments.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors border border-green-500/30">
                  Feature
                </button>
                <button className="px-3 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm hover:bg-yellow-500/30 transition-colors border border-yellow-500/30">
                  Promote
                </button>
                <button className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors border border-red-500/30">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tournaments Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-gray-800/50">
          <div className="col-span-1">
            <input
              type="checkbox"
              checked={selectedTournaments.length === filteredTournaments.length}
              onChange={selectedTournaments.length === filteredTournaments.length ? clearSelection : selectAllTournaments}
              className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="col-span-3 text-gray-400 font-medium text-sm">TOURNAMENT</div>
          <div className="col-span-1 text-gray-400 font-medium text-sm">GAME</div>
          <div className="col-span-1 text-gray-400 font-medium text-sm">STATUS</div>
          <div className="col-span-1 text-gray-400 font-medium text-sm">PARTICIPANTS</div>
          <div className="col-span-2 text-gray-400 font-medium text-sm">PRIZE POOL</div>
          <div className="col-span-1 text-gray-400 font-medium text-sm">TYPE</div>
          <div className="col-span-2 text-gray-400 font-medium text-sm">ACTIONS</div>
        </div>

        {/* Tournaments List */}
        <div className="divide-y divide-white/10">
          {filteredTournaments.map(tournament => (
            <div key={tournament.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-white/5 transition-colors group">
              {/* Checkbox */}
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTournaments.includes(tournament.id)}
                  onChange={() => toggleTournamentSelection(tournament.id)}
                  className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                />
              </div>

              {/* Tournament Info */}
              <div className="col-span-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStatusColor(tournament.status)} flex items-center justify-center text-white font-bold text-lg`}>
                    {tournament.game.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white">{tournament.name}</p>
                      {tournament.featured && (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs border border-yellow-500/30">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{tournament.organizer}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-500 text-xs">👁️ {tournament.views.toLocaleString()}</span>
                      <span className="text-gray-500 text-xs">❤️ {tournament.likes.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Game */}
              <div className="col-span-1 flex items-center">
                <span className="text-gray-300 text-sm font-medium">{tournament.game}</span>
              </div>

              {/* Status */}
              <div className="col-span-1 flex items-center">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(tournament.status)} text-white border border-white/20`}>
                  <span>{getStatusIcon(tournament.status)}</span>
                  {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                </span>
              </div>

              {/* Participants */}
              <div className="col-span-1 flex items-center">
                <div className="text-center">
                  <p className="text-white font-semibold">{tournament.participants}/{tournament.maxParticipants}</p>
                  <p className="text-gray-400 text-xs">{Math.round((tournament.participants / tournament.maxParticipants) * 100)}% full</p>
                </div>
              </div>

              {/* Prize Pool */}
              <div className="col-span-2 flex items-center">
                <div>
                  <p className="text-white font-semibold">${tournament.prizePool.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs">Entry: ${tournament.entryFee}</p>
                </div>
              </div>

              {/* Type */}
              <div className="col-span-1 flex items-center">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getTypeColor(tournament.type)} text-white border border-white/20`}>
                  {tournament.type === 'premium' ? '⭐' : tournament.type === 'free' ? '🎁' : '🔹'}
                  {tournament.type.charAt(0).toUpperCase() + tournament.type.slice(1)}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center gap-2">
                <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors" title="Edit">
                  ✏️
                </button>
                <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors" title="View Details">
                  👁️
                </button>
                <button className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-colors" title="Feature">
                  ⭐
                </button>
                <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors" title="Cancel">
                  🚫
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-white/10 flex justify-between items-center">
          <div className="text-gray-400 text-sm">
            Showing {filteredTournaments.length} of {tournaments.length} tournaments
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

      {/* Quick Actions & Popular Games */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span>⚡</span> Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🚀', label: 'Launch Tournament', color: 'from-green-500 to-emerald-500' },
              { icon: '📊', label: 'View Analytics', color: 'from-blue-500 to-cyan-500' },
              { icon: '📢', label: 'Promote', color: 'from-purple-500 to-pink-500' },
              { icon: '🔄', label: 'Refresh Data', color: 'from-orange-500 to-red-500' },
              { icon: '📋', label: 'Generate Report', color: 'from-yellow-500 to-orange-500' },
              { icon: '👥', label: 'Manage Teams', color: 'from-indigo-500 to-purple-500' },
              { icon: '💰', label: 'Prize Distribution', color: 'from-green-500 to-teal-500' },
              { icon: '⚙️', label: 'Settings', color: 'from-gray-500 to-gray-600' }
            ].map((action, index) => (
              <button
                key={index}
                className={`p-4 rounded-xl bg-gradient-to-br ${action.color} backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300 group`}
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
                <p className="text-white text-sm font-medium">{action.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Popular Games */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span>🎮</span> Popular Games
          </h3>
          <div className="space-y-3">
            {games.map(game => (
              <div key={game.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all group">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${game.color} flex items-center justify-center text-white font-bold`}>
                    {game.icon}
                  </div>
                  <span className="font-medium text-white">{game.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">
                    {tournaments.filter(t => t.game === game.name).length}
                  </p>
                  <p className="text-gray-400 text-xs">tournaments</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentManagement;