// components/ownerDashboard/tabs/OverviewTab.jsx
import React from 'react';
import StatCards from '../StatCards';
import { RevenueChart, TurfPerformanceChart, BookingStatusChart } from '../Charts';
import RecentBookings from '../RecentBookings';

const OverviewTab = ({ dashboardData }) => {
  return (
    <div className="space-y-6">
      <StatCards dashboardData={dashboardData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <TurfPerformanceChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BookingStatusChart />
        <RecentBookings />
      </div>
    </div>
  );
};

export default OverviewTab;