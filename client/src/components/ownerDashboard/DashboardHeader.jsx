import React from 'react';

const DashboardHeader = ({ dateRange, setDateRange, selectedTurf, setSelectedTurf }) => {

  const getCurrentSlot = () => {
    const now = new Date();

    const hours = now.getHours();

    const slotSize = 1; 
    const startHour = Math.floor(hours / slotSize) * slotSize;
    const endHour = startHour + slotSize;

    const format = (h) => {
      const period = h >= 12 ? "PM" : "AM";
      const hour12 = h % 12 || 12;
      return `${hour12}:00 ${period}`;
    };

    return `${format(startHour)} - ${format(endHour)}`;
  };
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-4">
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
            <span className="hidden sm:inline">Welcome back, Owner! 👋</span>
            <span className="sm:hidden">Dashboard 👋</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            <span className="hidden sm:inline">Here's what's happening with your turf business today.</span>
            <span className="sm:hidden">Today's overview</span>
          </p>
        </div>

        {/* <div className="w-full md:w-auto">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <div className="lg:hidden">
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#326B0F] focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            
            <div className="hidden lg:block">
              <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
            </div>
            
            <select 
              value={selectedTurf}
              onChange={(e) => setSelectedTurf(e.target.value)}
              className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#326B0F] focus:border-transparent"
            >
              <option value="all">All Turfs</option>
              <option value="football">Football Turf</option>
              <option value="cricket">Cricket Ground</option>
              <option value="tennis">Tennis Court</option>
              <option value="badminton">Badminton Court</option>
            </select>
            
            <button className="lg:hidden sm:hidden w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 flex items-center justify-center">
              <i className="fas fa-filter text-gray-600 mr-2"></i>
              Filters
            </button>
          </div>
        </div> */}
      </div>

      {/* Info Bar */}
      <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-gray-600">
        <div className="flex items-center">
          <i className="fas fa-clock text-gray-400 mr-2 text-xs"></i>
          <span className="font-medium">Current Slot:</span>
          <span className="ml-1">{getCurrentSlot()}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;