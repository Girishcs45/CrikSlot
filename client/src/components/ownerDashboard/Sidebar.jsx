import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navigate = useNavigate();
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fas fa-chart-bar' },
    { id: 'bookings', label: 'Bookings', icon: 'fas fa-calendar-alt' },
    // { id: 'tournaments', label: 'Tournaments', icon: 'fas fa-trophy' },
    { id: 'finances', label: 'Finances', icon: 'fas fa-rupee-sign' },
    { id: 'users', label: 'Users', icon: 'fas fa-users' },
    { id: 'turf', label: 'Turf Management', icon: 'fas fa-futbol' },
    // { id: 'settings', label: 'Settings', icon: 'fas fa-cog' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-emerald-100 bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 lg:w-72 bg-white shadow-xl lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* ✅ FIXED: CLOSE Button (X icon) */}
        <div className="flex justify-end border-b border-gray-100">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
          >
            <i className="fas fa-times text-2xl"></i> {/* Changed from fa to fas */}
          </button>
        </div>

        <nav className="p-4 lg:p-6">
          {/* Logo/Header */}
          <div className="mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div>
                <h2 className="font-bold text-gray-800">Owner Dashboard</h2>
                <p className="text-xs text-gray-500">Manage your sports facilities</p>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="mb-8">
            <div className="text-xs text-gray-500 font-medium mb-3 px-2 tracking-wider">
              MAIN MENU
            </div>
            <ul className="space-y-1">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (window.innerWidth < 1024) {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${activeTab === tab.id
                      ? 'bg-[#DEFFE0] text-[#326B0F] border-l-3 border-[#326B0F] font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <i className={`${tab.icon} ${activeTab === tab.id ? 'text-[#326B0F]' : 'text-gray-400'} text-base`}></i>
                    <span className="text-sm lg:text-base">{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="text-xs text-gray-500 font-medium mb-3 px-2 tracking-wider">
              QUICK ACTIONS
            </div>
            <div className="space-y-3">
              <button className="w-full bg-[#326B0F] hover:bg-[#1F3D25] text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center" onClick={() => navigate("/turfregistration")}>
                <i className="fas fa-plus mr-2"></i> Add Turf
              </button>
              {/* <button className="w-full bg-gradient-to-r from-[#326B0F] to-[#4CAF50] text-white py-3 rounded-xl font-medium hover:opacity-90 transition flex items-center justify-center">
                <i className="fas fa-trophy mr-2"></i> Create Tournament
              </button> */}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-3 text-gray-600 hover:text-[#326B0F] cursor-pointer">
              <i className="fas fa-question-circle"></i>
              <span className="text-sm">Help & Support</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600 hover:text-[#326B0F] cursor-pointer mt-3">
              <i className="fas fa-sign-out-alt"></i>
              <span className="text-sm">Logout</span>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;