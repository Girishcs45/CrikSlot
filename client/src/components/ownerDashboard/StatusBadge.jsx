// components/ownerDashboard/StatusBadge.jsx
import React from 'react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    confirmed: { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
    pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
    cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
    completed: { color: 'bg-blue-100 text-blue-800', label: 'Completed' },
    ongoing: { color: 'bg-purple-100 text-purple-800', label: 'Ongoing' },
    upcoming: { color: 'bg-indigo-100 text-indigo-800', label: 'Upcoming' },
    registration: { color: 'bg-pink-100 text-pink-800', label: 'Registration Open' }
  };

  const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;