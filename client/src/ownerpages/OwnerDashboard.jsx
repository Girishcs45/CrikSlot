import { useState } from 'react';
import Header from '../components/ownerDashboard/Header';
import Sidebar from '../components/ownerDashboard/Sidebar';
import DashboardHeader from '../components/ownerDashboard/DashboardHeader';
import TabContent from '../components/ownerDashboard/TabContent';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTurf, setSelectedTurf] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // ADD THIS LINE

  // Mock data - in real app, this would come from API
  const [dashboardData] = useState({
    overview: {
      totalRevenue: 45280,
      totalBookings: 324,
      activeTournaments: 8,
      turfOccupancy: 78,
      pendingBookings: 12,
      cancelledBookings: 5
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* PASS setIsMobileMenuOpen to Header */}
      <Header setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <div className="flex flex-col lg:flex-row">
        {/* PASS BOTH isMobileMenuOpen AND setIsMobileMenuOpen to Sidebar */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full">
          <div className="mb-6">
            <DashboardHeader
              dateRange={dateRange}
              setDateRange={setDateRange}
              selectedTurf={selectedTurf}
              setSelectedTurf={setSelectedTurf}
            />
          </div>

          <div className="w-full overflow-x-auto">
            <TabContent
              activeTab={activeTab}
              dashboardData={dashboardData}
              selectedTurf={selectedTurf}
              dateRange={dateRange}
            />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
      <div className="text-center md:text-left">
        © 2024 CrickSlot - All rights reserved
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        <a href="#" className="hover:text-[#326B0F] transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-[#326B0F] transition-colors">
          Terms of Service
        </a>
        <a href="#" className="hover:text-[#326B0F] transition-colors">
          Support
        </a>
        <a href="#" className="hover:text-[#326B0F] transition-colors">
          Contact
        </a>
      </div>
    </div>

    {/* Mobile-only quick links */}
    <div className="lg:hidden mt-6 pt-6 border-t border-gray-100">
      <div className="flex justify-around">
        <button className="flex flex-col items-center text-gray-600 hover:text-[#326B0F]">
          <i className="fas fa-home text-lg mb-1"></i>
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-[#326B0F]">
          <i className="fas fa-user text-lg mb-1"></i>
          <span className="text-xs">Profile</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-[#326B0F]">
          <i className="fas fa-question-circle text-lg mb-1"></i>
          <span className="text-xs">Help</span>
        </button>
      </div>
    </div>
  </footer>
);

export default OwnerDashboard;