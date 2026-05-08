// components/ownerDashboard/TabContent.jsx
import React from 'react';
import * as Tabs from './tabs';

const TabContent = ({ activeTab, dashboardData, selectedTurf, dateRange }) => {
  const tabProps = { dashboardData, selectedTurf, dateRange };

  const tabComponents = {
    'overview': <Tabs.OverviewTab {...tabProps} />,
    'bookings': <Tabs.BookingsTab {...tabProps} />,
    'tournaments': <Tabs.TournamentsTab {...tabProps} />,
    'finances': <Tabs.FinancesTab {...tabProps} />,
    'users': <Tabs.UsersTab {...tabProps} />,
    'turf': <Tabs.TurfTab {...tabProps} />,
    'settings': <Tabs.SettingsTab {...tabProps} />
  };

  return tabComponents[activeTab] || null;
};

export default TabContent;