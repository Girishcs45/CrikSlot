// components/ownerDashboard/RecentBookings.jsx
import React from 'react';
import StatusBadge from './StatusBadge';

const RecentBookings = () => {
  const recentBookings = [
    { id: 1, user: 'John Doe', turf: 'Football Turf 1', date: '2024-01-15', time: '18:00-20:00', status: 'confirmed', amount: 1200 },
    { id: 2, user: 'Sarah Smith', turf: 'Cricket Ground', date: '2024-01-15', time: '14:00-17:00', status: 'confirmed', amount: 1800 },
    { id: 3, user: 'Mike Johnson', turf: 'Tennis Court', date: '2024-01-16', time: '09:00-10:00', status: 'pending', amount: 600 },
    { id: 4, user: 'Emma Wilson', turf: 'Badminton Court', date: '2024-01-16', time: '19:00-21:00', status: 'confirmed', amount: 800 },
    { id: 5, user: 'Alex Brown', turf: 'Multi-Sport Turf', date: '2024-01-17', time: '16:00-18:00', status: 'cancelled', amount: 0 }
  ];

  return (
    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Recent Bookings</h3>
        <button className="text-blue-600 hover:text-blue-800 font-medium">View All →</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Turf</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-medium">{booking.user.charAt(0)}</span>
                    </div>
                    <span className="font-medium">{booking.user}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{booking.turf}</td>
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium">{booking.date}</div>
                    <div className="text-sm text-gray-500">{booking.time}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="px-4 py-3 font-bold">₹{booking.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookings;