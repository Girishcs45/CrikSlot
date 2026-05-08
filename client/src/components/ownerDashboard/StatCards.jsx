
import PropTypes from 'prop-types';

const StatCards = ({ dashboardData }) => {
  const statCards = [
    { 
      title: 'Total Revenue', 
      value: `₹${dashboardData.overview.totalRevenue.toLocaleString()}`, 
      icon: '💰', 
      change: '+12.5%', 
      color: 'bg-gradient-to-r from-green-500 to-emerald-600' 
    },
    { 
      title: 'Total Bookings', 
      value: dashboardData.overview.totalBookings, 
      icon: '📅', 
      change: '+8.2%', 
      color: 'bg-gradient-to-r from-blue-500 to-cyan-600' 
    },
    { 
      title: 'Active Tournaments', 
      value: dashboardData.overview.activeTournaments, 
      icon: '🏆', 
      change: '+3', 
      color: 'bg-gradient-to-r from-purple-500 to-pink-600' 
    },
    { 
      title: 'Turf Occupancy', 
      value: `${dashboardData.overview.turfOccupancy}%`, 
      icon: '⚽', 
      change: '+5.3%', 
      color: 'bg-gradient-to-r from-orange-500 to-red-600' 
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {statCards.map((card, index) => (
        <div 
          key={index} 
          className={`${card.color} rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 text-white shadow-sm lg:shadow-lg`}
        >
          <div className="flex flex-col sm:flex-row lg:block justify-between">
            {/* Left side - Content */}
            <div className="flex-1">
              <p className="text-xs sm:text-sm opacity-90 truncate">{card.title}</p>
              <p className="text-lg sm:text-xl lg:text-3xl font-bold mt-1 sm:mt-2 truncate">
                {card.value}
              </p>
              <p className="text-xs sm:text-sm mt-1 sm:mt-2 opacity-90 truncate">
                {card.change} from last week
              </p>
            </div>
            
            {/* Right side - Icon */}
            <div className="mt-2 sm:mt-0 lg:mt-4 text-right sm:text-left lg:text-right">
              <div className="text-2xl sm:text-2xl lg:text-3xl inline-block">
                {card.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

StatCards.propTypes = {
  dashboardData: PropTypes.shape({
    overview: PropTypes.shape({
      totalRevenue: PropTypes.number.isRequired,
      totalBookings: PropTypes.number.isRequired,
      activeTournaments: PropTypes.number.isRequired,
      turfOccupancy: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default StatCards;