import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

export const RevenueChart = () => {
  const revenueData = [
    { name: 'Mon', revenue: 3200, bookings: 24 },
    { name: 'Tue', revenue: 4200, bookings: 31 },
    { name: 'Wed', revenue: 3800, bookings: 28 },
    { name: 'Thu', revenue: 5100, bookings: 36 },
    { name: 'Fri', revenue: 6800, bookings: 48 },
    { name: 'Sat', revenue: 8200, bookings: 62 },
    { name: 'Sun', revenue: 7500, bookings: 55 }
  ];

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">Revenue & Bookings Trend</h3>
        <select className="text-xs md:text-sm border border-gray-300 rounded-lg px-2 md:px-3 py-1">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
        </select>
      </div>
      
      {/* SIMPLE FIX: Use fixed width/height, NO ResponsiveContainer */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <LineChart
          width={800}
          height={300}
          data={revenueData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#326B0F" />
          <Line type="monotone" dataKey="bookings" stroke="#3B82F6" />
        </LineChart>
      </div>
    </div>
  );
};

export const TurfPerformanceChart = () => {
  const turfData = [
    { name: 'Football', occupancy: 85 },
    { name: 'Cricket', occupancy: 72 },
    { name: 'Tennis', occupancy: 65 },
    { name: 'Badminton', occupancy: 90 },
    { name: 'Multi-Sport', occupancy: 78 }
  ];

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">Turf Performance</h3>
        <select className="text-xs md:text-sm border border-gray-300 rounded-lg px-2 md:px-3 py-1">
          <option>By Occupancy</option>
          <option>By Revenue</option>
        </select>
      </div>
      
      {/* SIMPLE FIX: Use fixed width/height */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <BarChart
          width={800}
          height={300}
          data={turfData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="occupancy" fill="#326B0F" />
        </BarChart>
      </div>
    </div>
  );
};

export const BookingStatusChart = () => {
  const bookingStatusData = [
    { name: 'Confirmed', value: 65, color: '#10B981' },
    { name: 'Pending', value: 15, color: '#F59E0B' },
    { name: 'Cancelled', value: 8, color: '#EF4444' },
    { name: 'Completed', value: 12, color: '#3B82F6' }
  ];

  // Calculate responsive width
  const chartWidth = Math.min(400, window.innerWidth * 0.9);
  
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">Booking Status</h3>
      </div>
      
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="w-full flex justify-center">
          <PieChart
            width={chartWidth}
            height={250}
          >
            <Pie
              data={bookingStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              dataKey="value"
            >
              {bookingStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};