// components/ownerDashboard/tabs/TournamentsTab.jsx
import React from 'react';
import TournamentsTable from '../TournamentsTable';

// Move TournamentStats here or create separate component
const TournamentStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
      <div className="text-purple-600 text-sm font-medium">Total Tournaments</div>
      <div className="text-3xl font-bold mt-2">24</div>
    </div>
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
      <div className="text-blue-600 text-sm font-medium">Active Now</div>
      <div className="text-3xl font-bold mt-2">8</div>
    </div>
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
      <div className="text-green-600 text-sm font-medium">Total Teams</div>
      <div className="text-3xl font-bold mt-2">96</div>
    </div>
    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
      <div className="text-orange-600 text-sm font-medium">Total Prize</div>
      <div className="text-3xl font-bold mt-2">₹2,45,000</div>
    </div>
  </div>
);

const TournamentsTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tournaments Management</h2>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center">
            <i className="fas fa-plus mr-2"></i> Create Tournament
          </button>
        </div>
        
        <TournamentStats />
        <TournamentsTable />
      </div>
    </div>
  );
};

export default TournamentsTab;