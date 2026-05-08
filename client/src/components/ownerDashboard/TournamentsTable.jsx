// components/ownerDashboard/TournamentsTable.jsx
import React from 'react';
import StatusBadge from './StatusBadge';

const TournamentsTable = () => {
  const activeTournaments = [
    { id: 1, name: 'Weekend Football League', sport: 'Football', teams: 8, status: 'ongoing', prize: 50000 },
    { id: 2, name: 'Corporate Cricket Cup', sport: 'Cricket', teams: 6, status: 'upcoming', prize: 25000 },
    { id: 3, name: 'Tennis Championship', sport: 'Tennis', players: 16, status: 'registration', prize: 15000 },
    { id: 4, name: 'Badminton Doubles', sport: 'Badminton', teams: 12, status: 'ongoing', prize: 20000 }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tournament</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sport</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teams/Players</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prize Pool</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {activeTournaments.map((tournament) => (
            <tr key={tournament.id} className="hover:bg-gray-50">
              <td className="px-4 py-4">
                <div className="font-bold">{tournament.name}</div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <div className={`h-8 w-8 rounded-full ${
                    tournament.sport === 'Football' ? 'bg-green-100' :
                    tournament.sport === 'Cricket' ? 'bg-blue-100' :
                    tournament.sport === 'Tennis' ? 'bg-purple-100' :
                    'bg-red-100'
                  } flex items-center justify-center mr-3`}>
                    <span className={`${
                      tournament.sport === 'Football' ? 'text-green-600' :
                      tournament.sport === 'Cricket' ? 'text-blue-600' :
                      tournament.sport === 'Tennis' ? 'text-purple-600' :
                      'text-red-600'
                    } font-bold`}>{tournament.sport.charAt(0)}</span>
                  </div>
                  {tournament.sport}
                </div>
              </td>
              <td className="px-4 py-4">
                {tournament.teams || tournament.players} {tournament.teams ? 'Teams' : 'Players'}
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={tournament.status} />
              </td>
              <td className="px-4 py-4 font-bold">₹{tournament.prize.toLocaleString()}</td>
              <td className="px-4 py-4">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    <i className="fas fa-chart-bar"></i>
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TournamentsTable;