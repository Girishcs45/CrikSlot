import {toast} from "react-toastify" 
import { OwnerTurfs } from '../../../services/turf.services';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TurfTab = () => {
  const navigate = useNavigate();
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const id = JSON.parse(localStorage.getItem("Owner"));
  
  const getTurfs = async (id) => {
    try {
      setLoading(true);
      const res = await OwnerTurfs(id);
      const turfs = res?.ownedTurfs || [];
      setTurfs(turfs);
    } catch (err) {
      if(!id){
        toast.error("Unauthorized access");
      }
      console.log(err.response?.data?.message);
      toast.error("Failed to load turfs");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getTurfs(id);
  }, [id]);

  const stats = {
    totalTurfs: turfs.length,
    activeTurfs: turfs.filter(t => t.status === 'active').length,
    pendingTurfs: turfs.filter(t => t.status === 'pending').length,
    totalBookings: turfs.reduce((sum, t) => sum + (t.totalBookings || 0), 0),
    totalRevenue: '₹6,72,000'
  };

  const handleAddTurf = () => {
    navigate("/turfregistration");
  };

  const handleViewDetails = (turfId) => {
    navigate(`/owner/turf/${turfId}`);
  };

  const handleViewBookings = (turfId, e) => {
    e.stopPropagation();
    navigate(`/owner/bookings?turf=${turfId}`);
  };

  const handleAnalytics = (turfId, e) => {
    e.stopPropagation();
    navigate(`/owner/analytics?turf=${turfId}`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Turfs</h1>
              <p className="text-gray-600">Manage all your sports facilities</p>
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="p-4 bg-gray-100 rounded-xl animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
        
        {[1,2,3].map(i => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 h-48 md:h-auto bg-gray-200"></div>
              <div className="md:w-2/4 p-5 border-r border-gray-100">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="flex space-x-6">
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
              <div className="md:w-1/4 p-5">
                <div className="h-8 bg-gray-200 rounded w-24 mb-4 ml-auto"></div>
                <div className="flex space-x-3 mt-4">
                  <div className="h-10 bg-gray-200 rounded flex-1"></div>
                  <div className="h-10 bg-gray-200 rounded flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Turfs</h1>
            <p className="text-gray-600">Manage all your sports facilities</p>
          </div>
          <button 
            className="bg-[#326B0F] hover:bg-[#1F3D25] text-white px-6 py-3 rounded-xl font-semibold flex items-center transition-colors" 
            aria-label="Add a new turf" 
            onClick={handleAddTurf}
          >
            <i className="fas fa-plus mr-2" aria-hidden="true"></i> Add New Turf
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-[#DEFFE0] rounded-xl">
            <div className="text-sm text-[#326B0F] font-medium">Total Turfs</div>
            <div className="text-2xl font-bold mt-1">{stats.totalTurfs}</div>
          </div>
          <div className="p-4 bg-[#ECF9E3] rounded-xl">
            <div className="text-sm text-[#326B0F] font-medium">Active</div>
            <div className="text-2xl font-bold mt-1">{stats.activeTurfs}</div>
          </div>
          <div className="p-4 bg-[#DEFFE0] rounded-xl">
            <div className="text-sm text-[#326B0F] font-medium">Pending</div>
            <div className="text-2xl font-bold mt-1">{stats.pendingTurfs}</div>
          </div>
          <div className="p-4 bg-[#ECF9E3] rounded-xl">
            <div className="text-sm text-[#326B0F] font-medium">Total Bookings</div>
            <div className="text-2xl font-bold mt-1">{stats.totalBookings.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Turf Horizontal Bars */}
      <div className="space-y-4">
        {turfs.map((turf) => (
          <div
            key={turf._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 cursor-pointer hover:border-[#326B0F]/30 overflow-hidden"
            onClick={() => handleViewDetails(turf._id)}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left - Image & Basic Info */}
              <div className="md:w-1/4 h-48 md:h-auto relative">
                <div className="relative h-full">
                  {turf.images && turf.images.length > 0 ? (
                    <img
                      src={turf.images[0]}
                      alt={turf.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-[#DEFFE0] to-[#ECF9E3] flex items-center justify-center">
                      <i className="fas fa-futbol text-[#326B0F] text-4xl"></i>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      turf.status === 'active' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : turf.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}>
                      {turf.status === 'active' ? '🟢 Active' : 
                       turf.status === 'pending' ? '🟡 Pending' : 
                       '⚪ Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle - Details */}
              <div className="md:w-2/4 p-5 border-r border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{turf.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                      {turf.area}, {turf.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <i className="fas fa-clock text-gray-400 mr-2"></i>
                      <span>{turf.openingTime || '06:00'} - {turf.closingTime || '24:00'}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-400 mr-1"></i>
                    <span className="font-semibold">{turf.rating || 'N/A'}</span>
                  </div>
                </div>

                {/* Facilities */}
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Facilities:</div>
                  <div className="flex flex-wrap gap-2">
                    {(turf.facilities || []).slice(0, 3).map((facility, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {facility}
                      </span>
                    ))}
                    {(turf.facilities || []).length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{(turf.facilities || []).length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">
                      ₹{turf.rates?.standard || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-500">Standard Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#326B0F]">
                      {turf.totalBookings || 0}
                    </div>
                    <div className="text-xs text-gray-500">Total Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {turf.rates?.weekend || turf.rates?.standard || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-500">Weekend Rate</div>
                  </div>
                </div>
              </div>

              {/* Right - Actions */}
              <div className="md:w-1/4 p-5 flex flex-col justify-between">
                <div className="text-right mb-4">
                  <span className="text-[#326B0F] text-sm font-medium inline-flex items-center gap-2 hover:underline">
                    View Full Details <i className="fas fa-arrow-right text-xs"></i>
                  </span>
                </div>

                <div className="flex space-x-3">
                  <button
                    className="flex-1 bg-[#DEFFE0] hover:bg-[#ECF9E3] text-[#326B0F] py-2 rounded-lg text-sm font-medium transition-colors"
                    onClick={(e) => handleViewBookings(turf._id, e)}
                  >
                    <i className="fas fa-calendar-alt mr-1"></i> Bookings
                  </button>
                  <button
                    className="flex-1 bg-[#326B0F] hover:bg-[#1F3D25] text-white py-2 rounded-lg text-sm font-medium transition-colors"
                    onClick={(e) => handleAnalytics(turf._id, e)}
                  >
                    <i className="fas fa-chart-bar mr-1"></i> Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Turf Bar */}
      <div
        className="bg-white rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#326B0F] hover:bg-[#DEFFE0] transition-all duration-300 cursor-pointer p-6 text-center"
        onClick={handleAddTurf}
      >
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 bg-[#ECF9E3] rounded-full flex items-center justify-center mr-4">
            <i className="fas fa-plus text-[#326B0F] text-xl"></i>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Add Another Turf</h3>
            <p className="text-gray-500 text-sm">Expand your business by adding more sports facilities</p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {turfs.length === 0 && !loading && (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <div className="w-24 h-24 bg-[#DEFFE0] rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-futbol text-[#326B0F] text-4xl"></i>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">No Turfs Found</h3>
          <p className="text-gray-500 mb-2 max-w-md mx-auto">
            You haven't added any turfs yet. Start by registering your first sports facility to manage bookings, revenue, and more.
          </p>
          <button 
            className="mt-6 bg-[#326B0F] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1F3D25] transition-colors inline-flex items-center"
            onClick={handleAddTurf}
          >
            <i className="fas fa-plus mr-2"></i> Register Your First Turf
          </button>
        </div>
      )}
    </div>
  );
};

export default TurfTab;