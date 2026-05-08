import React from 'react';
import { motion } from 'framer-motion';
import {
  FaListAlt,
  FaPlus,
  FaTimes,
  FaCheck,
  FaLightbulb,
  FaClock,
  FaUsers,
  FaShieldAlt,
  FaCouch,
  FaParking,
  FaTint,
  FaWifi,
  FaFirstAid,
  FaUtensils
} from 'react-icons/fa';

const DetailsStep = ({ formData, updateFormData, updateArrayField }) => {

  // Predefined facility options
  const facilityOptions = [
    { id: 'flood_lights', label: 'Flood Lights', icon: <FaLightbulb className="text-yellow-500" />, popular: true },
    { id: 'parking', label: 'Parking', icon: <FaParking className="text-blue-500" />, popular: true },
    { id: 'changing_rooms', label: 'Changing Rooms', icon: <FaCouch className="text-green-500" />, popular: true },
    { id: 'drinking_water', label: 'Drinking Water', icon: <FaTint className="text-cyan-500" /> },
    { id: 'wifi', label: 'Wi-Fi', icon: <FaWifi className="text-purple-500" /> },
    { id: 'first_aid', label: 'First Aid Kit', icon: <FaFirstAid className="text-red-500" /> },
    { id: 'cafeteria', label: 'Cafeteria/Snacks', icon: <FaUtensils className="text-orange-500" /> },
    { id: 'equipment_rental', label: 'Equipment Rental', icon: <FaUsers className="text-indigo-500" /> },
    { id: 'security', label: 'Security', icon: <FaShieldAlt className="text-gray-600" /> },
    { id: '24x7', label: '24/7 Access', icon: <FaClock className="text-emerald-500" /> },
  ];

  // Handle facility selection - REMOVE EVENT PARAMETER
  const handleFacilitySelect = (facilityLabel) => {
    const facilities = [...formData.facilities];
    if (!facilities.includes(facilityLabel)) {
      facilities.push(facilityLabel);
      updateArrayField('facilities', facilities);
    }
  };

  // Remove facility
  const removeFacility = (index) => {
    const newFacilities = formData.facilities.filter((_, i) => i !== index);
    updateArrayField('facilities', newFacilities);
  };

  // Add custom facility
  const addCustomFacility = () => {
    const newFacilities = [...formData.facilities, ''];
    updateArrayField('facilities', newFacilities);
  };

  // Calculate completion percentage
  const calculateCompletion = () => {
    const facilityCount = formData.facilities.filter(f => f.trim()).length;
    return Math.min(facilityCount * 20, 100);
  };

  const completionScore = calculateCompletion();
  const facilityCount = formData.facilities.filter(f => f.trim()).length;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-8"
    >
      {/* Header with Progress */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Add Facilities</h3>
            <p className="text-gray-600">Select amenities available at your turf</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">{completionScore}%</div>
            <div className="text-xs text-gray-500">Completion</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionScore}%` }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2.5 rounded-full"
          />
        </div>
        <p className="text-xs text-gray-500">
          {completionScore >= 80
            ? 'Excellent! Your turf has great facilities.'
            : completionScore >= 50
              ? 'Good start! Add more facilities to attract players.'
              : 'Add facilities to improve your listing.'}
        </p>
      </div>

      {/* Facilities Section */}
      <div className="space-y-6">
        {/* Popular Facilities */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-800 text-lg flex items-center">
              <FaListAlt className="mr-2 text-green-600" />
              Select Facilities
            </h4>
            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
              {facilityCount} selected
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            Choose from popular options or add custom facilities
          </p>

          {/* Facility Options Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {facilityOptions.map((facility) => (
              <motion.button
                key={facility.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => handleFacilitySelect(facility.label)}
                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${formData.facilities.includes(facility.label)
                    ? 'border-green-500 bg-green-50 shadow-sm'
                    : 'border-gray-200 bg-gray-50 hover:border-green-300 hover:bg-green-50/50'
                  }`}
              >
                <div className="text-2xl mb-2">{facility.icon}</div>
                <span className="text-sm text-gray-700 text-center font-medium">{facility.label}</span>
                {facility.popular && (
                  <span className="text-xs text-yellow-600 mt-2 bg-yellow-50 px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
                {formData.facilities.includes(facility.label) && (
                  <div className="mt-2">
                    <FaCheck className="text-green-600" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Custom Facilities */}
        <div>
          <h4 className="font-bold text-gray-800 mb-3">Custom Facilities</h4>
          <p className="text-gray-600 text-sm mb-4">
            Add any other facilities not listed above
          </p>

          <div className="space-y-3 mb-4">
            {formData.facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={facility}
                  onChange={(e) => {
                    const newFacilities = [...formData.facilities];
                    newFacilities[index] = e.target.value;
                    updateArrayField('facilities', newFacilities);
                  }}
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter facility name (e.g., AC Lounge, Swimming Pool)"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFacility(index);
                  }}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <FaTimes />
                </button>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addCustomFacility();
            }}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-green-600 hover:border-green-400 transition-all flex items-center justify-center bg-gray-50 hover:bg-green-50"
          >
            <FaPlus className="mr-2" />
            Add Custom Facility
          </motion.button>
        </div>

        {/* Facilities Tips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200"
        >
          <h5 className="font-bold text-green-800 mb-3 flex items-center">
            💡 Facilities Tips
          </h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-green-700 mb-2">🎯 Must-Have Facilities:</p>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• Flood Lights (for evening bookings)</li>
                <li>• Parking Space (convenience factor)</li>
                <li>• Changing Rooms (basic expectation)</li>
                <li>• Drinking Water (essential amenity)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-green-700 mb-2">⭐ Premium Facilities:</p>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• Wi-Fi Connectivity</li>
                <li>• Equipment Rental</li>
                <li>• First Aid Facilities</li>
                <li>• 24/7 Access</li>
              </ul>
            </div>
          </div>
          <p className="text-green-700 text-sm mt-3">
            <strong>Pro Tip:</strong> Turfs with 5+ facilities get 60% more bookings!
          </p>
        </motion.div>
      </div>

      {/* Summary Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-2xl"
      >
        <h4 className="text-xl font-bold mb-4 flex items-center">
          <FaCheck className="mr-3 text-green-400" />
          Facilities Preview
        </h4>

        <div className="mb-4">
          <h5 className="text-green-300 font-semibold mb-3">Selected Facilities:</h5>
          <div className="flex flex-wrap gap-2">
            {facilityCount > 0 ? (
              formData.facilities.filter(f => f.trim()).map((facility, index) => (
                <span
                  key={index}
                  className="bg-gray-700 px-3 py-2 rounded-xl text-sm flex items-center"
                >
                  {facility}
                  {facilityOptions.some(opt => opt.label === facility) && (
                    <span className="ml-2 text-green-400">✓</span>
                  )}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No facilities selected yet</p>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-300">Total Facilities</p>
              <p className="text-2xl font-bold">{facilityCount}</p>
            </div>
            <div>
              <p className="text-gray-300">Popular Choices</p>
              <p className="text-2xl font-bold">
                {formData.facilities.filter(f =>
                  facilityOptions.filter(opt => opt.popular).some(opt => opt.label === f)
                ).length}
              </p>
            </div>
            <div>
              <p className="text-gray-300">Custom Added</p>
              <p className="text-2xl font-bold">
                {facilityCount - formData.facilities.filter(f =>
                  facilityOptions.some(opt => opt.label === f)
                ).length}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Completion Status */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center space-x-8">
          <div className="text-center p-4 bg-green-50 rounded-2xl border border-green-200 min-w-[120px]">
            <div className="text-3xl font-bold text-green-700">{facilityCount}</div>
            <div className="text-sm text-green-600 font-medium">Facilities</div>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-2xl border border-blue-200 min-w-[120px]">
            <div className="text-3xl font-bold text-blue-700">{completionScore}%</div>
            <div className="text-sm text-blue-600 font-medium">Completion</div>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-2xl border border-purple-200 min-w-[120px]">
            <div className="text-3xl font-bold text-purple-700">
              {facilityCount >= 5 ? 'A+' : facilityCount >= 3 ? 'B+' : 'C+'}
            </div>
            <div className="text-sm text-purple-600 font-medium">Rating</div>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          {facilityCount >= 5
            ? '🎉 Excellent! Your turf is well-equipped and will attract premium players.'
            : facilityCount >= 3
              ? '👍 Good! Add 2 more facilities to reach the recommended minimum.'
              : '📝 Add more facilities to make your turf more appealing to players.'}
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="pt-4 mt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-green-600">Step 4 of 4</span> • Facilities
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-xs text-gray-500">
              {facilityCount === 0
                ? 'Start adding facilities'
                : `${facilityCount} facility${facilityCount !== 1 ? 's' : ''} added`}
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="w-12 h-1 bg-green-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailsStep;